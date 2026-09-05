import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function serverClient() {
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

const hostSchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact_name: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80),
  property_type: z.enum(["Apartment", "Villa", "House", "Riad"]),
  description: z.string().trim().min(20).max(2000),
  guests: z.number().int().min(1).max(50),
  bedrooms: z.number().int().min(0).max(30),
  beds: z.number().int().min(1).max(50),
  bathrooms: z.number().int().min(0).max(30),
  price_per_night: z.number().min(1).max(1000000),
  amenities: z.array(z.string().max(60)).max(20).default([]),
  address: z.string().trim().min(4).max(255),
  nearby: z.string().trim().max(500).optional().or(z.literal("")),
  photos: z.array(z.string().max(500)).max(20).default([]),
});

export const submitHostApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => hostSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await serverClient()
      .from("host_submissions")
      .insert({
        ...data,
        contact_name: data.contact_name || null,
        phone: data.phone || null,
        email: data.email || null,
        nearby: data.nearby || null,
        status: "pending",
      });
    if (error) {
      console.error("host submission failed", error.message);
      throw new Error("Could not save your property. Please try again.");
    }
    return { ok: true as const };
  });

const inquirySchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().min(1).max(120),
  check_in: z.string().trim().min(1),
  check_out: z.string().trim().min(1),
  guests: z.number().int().min(1).max(60),
  activities: z.array(z.string().max(60)).max(30).default([]),
  stay: z.string().trim().max(120).optional().or(z.literal("")),
  transport: z.array(z.string().max(60)).max(30).default([]),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(6).max(32),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await serverClient()
      .from("inquiries")
      .insert({
        ...data,
        name: data.name || null,
        stay: data.stay || null,
        budget: data.budget || null,
        message: data.message || null,
        status: "new",
      });
    if (error) {
      console.error("inquiry failed", error.message);
      throw new Error("Could not send your request. Please try again.");
    }
    return { ok: true as const };
  });
