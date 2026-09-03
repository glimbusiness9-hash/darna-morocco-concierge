import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = ["Apartment", "Villa", "House", "Riad"] as const;

const AMENITIES = [
  "Wi-Fi",
  "Air conditioning",
  "Parking",
  "Kitchen",
  "TV",
  "Washing machine",
  "Pool",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please add the property name.").max(120),
  city: z.string().trim().min(2, "Please add the city.").max(80),
  description: z.string().trim().min(20, "Please add at least 20 characters.").max(2000),
  guests: z.coerce.number().int().min(1, "At least 1 guest.").max(50),
  bedrooms: z.coerce.number().int().min(0).max(30),
  beds: z.coerce.number().int().min(1, "At least 1 bed.").max(50),
  bathrooms: z.coerce.number().int().min(0).max(30),
  price: z.coerce.number().min(1, "Please add a price per night.").max(1000000),
  address: z.string().trim().min(4, "Please add the location or address.").max(255),
  nearby: z.string().trim().max(500).optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
        active
          ? "border-deep bg-deep text-deep-foreground"
          : "border-border bg-card text-deep/70 hover:border-deep/40",
      )}
    >
      {label}
    </button>
  );
}

export function HostForm() {
  const [type, setType] = useState<string>(PROPERTY_TYPES[0]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{ url: string; name: string }[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    return () => photos.forEach((p) => URL.revokeObjectURL(p.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setPhotos((prev) => [...prev, ...next]);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next as FieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-border bg-card p-10 text-center shadow-soft sm:p-16">
        <h3 className="font-display text-4xl text-deep">Thank you! Your property was received.</h3>
        <p className="mt-4 text-muted-foreground">
          Our team will review the details and get back to you shortly.
        </p>
        <a
          href={waLink(MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-terracotta transition-colors hover:text-deep"
        >
          <WhatsAppIcon />
          Chat with darna on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-8 border border-border bg-card p-7 shadow-soft sm:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Property name *</Label>
          <Input id="name" name="name" maxLength={120} className="mt-2 h-11" />
          {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input id="city" name="city" maxLength={80} className="mt-2 h-11" />
          {errors.city && <p className="mt-2 text-xs text-destructive">{errors.city}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="text-sm text-deep">Property type *</legend>
        <input type="hidden" name="type" value={type} />
        <div className="mt-3 flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <Chip key={t} label={t} active={type === t} onClick={() => setType(t)} />
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          maxLength={2000}
          placeholder="Describe your property, the atmosphere and what makes it special."
          className="mt-2"
        />
        {errors.description && (
          <p className="mt-2 text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label htmlFor="guests">Guests *</Label>
          <Input id="guests" name="guests" type="number" min={1} max={50} defaultValue={2} className="mt-2 h-11" />
          {errors.guests && <p className="mt-2 text-xs text-destructive">{errors.guests}</p>}
        </div>
        <div>
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input id="bedrooms" name="bedrooms" type="number" min={0} max={30} defaultValue={1} className="mt-2 h-11" />
          {errors.bedrooms && <p className="mt-2 text-xs text-destructive">{errors.bedrooms}</p>}
        </div>
        <div>
          <Label htmlFor="beds">Beds *</Label>
          <Input id="beds" name="beds" type="number" min={1} max={50} defaultValue={1} className="mt-2 h-11" />
          {errors.beds && <p className="mt-2 text-xs text-destructive">{errors.beds}</p>}
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input id="bathrooms" name="bathrooms" type="number" min={0} max={30} defaultValue={1} className="mt-2 h-11" />
          {errors.bathrooms && <p className="mt-2 text-xs text-destructive">{errors.bathrooms}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="price">Price per night (MAD) *</Label>
        <Input id="price" name="price" type="number" min={1} className="mt-2 h-11 sm:max-w-xs" />
        {errors.price && <p className="mt-2 text-xs text-destructive">{errors.price}</p>}
      </div>

      <fieldset>
        <legend className="text-sm text-deep">Amenities</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <Chip
              key={a}
              label={a}
              active={amenities.includes(a)}
              onClick={() =>
                setAmenities((prev) =>
                  prev.includes(a) ? prev.filter((v) => v !== a) : [...prev, a],
                )
              }
            />
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="address">Location / address *</Label>
          <Input id="address" name="address" maxLength={255} className="mt-2 h-11" />
          {errors.address && <p className="mt-2 text-xs text-destructive">{errors.address}</p>}
        </div>
        <div>
          <Label htmlFor="nearby">Nearby places</Label>
          <Input
            id="nearby"
            name="nearby"
            maxLength={500}
            placeholder="Beach, medina, restaurants..."
            className="mt-2 h-11"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="photos">Property photos</Label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          className="mt-2 block w-full border border-input bg-background px-3 py-2.5 text-sm text-foreground file:mr-4 file:border-0 file:bg-transparent file:text-sm file:text-deep"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          You can select several images. They stay on your device until you submit.
        </p>

        {photos.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {photos.map((p, i) => (
              <div key={`${p.name}-${i}`} className="group relative aspect-[4/3] overflow-hidden border border-border">
                <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove ${p.name}`}
                  className="absolute right-1.5 top-1.5 bg-deep/80 px-2 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-deep-foreground"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto">
        Submit Property
      </Button>
    </form>
  );
}
