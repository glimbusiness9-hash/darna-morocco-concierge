import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const SAFE_COLUMNS =
  "id, name, city, property_type, description, guests, bedrooms, beds, bathrooms, price_per_night, amenities, nearby, photos, created_at";

export type PublicProperty = {
  id: string;
  name: string;
  city: string;
  property_type: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price_per_night: number;
  amenities: string[];
  nearby: string | null;
  photoUrls: string[];
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Photos live in a private bucket; mint short-lived signed URLs server-side. */
async function signPhotos(paths: string[]): Promise<string[]> {
  if (paths.length === 0) return [];
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.storage
    .from("property-photos")
    .createSignedUrls(paths, 60 * 60 * 12);
  if (error || !data) return [];
  return data.map((d) => d.signedUrl).filter((u): u is string => Boolean(u));
}

type Row = {
  id: string;
  name: string;
  city: string;
  property_type: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price_per_night: number | string;
  amenities: string[] | null;
  nearby: string | null;
  photos: string[] | null;
};

async function toPublic(row: Row): Promise<PublicProperty> {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    property_type: row.property_type,
    description: row.description,
    guests: row.guests,
    bedrooms: row.bedrooms,
    beds: row.beds,
    bathrooms: row.bathrooms,
    price_per_night: Number(row.price_per_night),
    amenities: row.amenities ?? [],
    nearby: row.nearby,
    photoUrls: await signPhotos(row.photos ?? []),
  };
}

export const listApprovedProperties = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicProperty[]> => {
    const { data, error } = await publicClient()
      .from("host_submissions")
      .select(SAFE_COLUMNS)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) {
      console.error("public properties read failed", error.message);
      return [];
    }
    return Promise.all(((data ?? []) as unknown as Row[]).map(toPublic));
  }
);

export const getApprovedProperty = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }): Promise<PublicProperty | null> => {
    const { data: row, error } = await publicClient()
      .from("host_submissions")
      .select(SAFE_COLUMNS)
      .eq("status", "approved")
      .eq("id", data.id)
      .maybeSingle();
    if (error || !row) return null;
    return toPublic(row as unknown as Row);
  });
