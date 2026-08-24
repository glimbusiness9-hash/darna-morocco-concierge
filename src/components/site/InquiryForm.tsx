import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import { cn } from "@/lib/utils";

const CITY_OPTIONS = [
  "Tangier",
  "Tetouan",
  "Chefchaouen",
  "Tangier & Tetouan",
  "Tangier & Chefchaouen",
  "Tetouan & Chefchaouen",
  "Multiple cities",
  "Other",
];

const ACTIVITY_OPTIONS = [
  "Scuba Diving",
  "Boat Trip",
  "Jet Ski",
  "Surf",
  "Quad & Buggy",
  "Home Massage",
  "Escape Room",
  "Tennis & Padel",
  "Golf",
  "Guided Tour",
  "Hiking",
  "Family Activities",
  "Adventure Activities",
  "Other",
];

const STAY_TYPES = ["Apartment", "Villa", "Riad", "House", "Hotel", "No preference"];

const TRANSPORT_OPTIONS = [
  "Airport Transfer",
  "City-to-City",
  "Transportation Activities",
  "Excursions",
  "Car Rental",
  "No transport needed",
];

const schema = z.object({
  city: z.string().trim().min(1, "Please choose a city."),
  people: z.coerce.number().int().min(1, "At least 1 person.").max(60),
  arrival: z.string().trim().min(1, "Please add your arrival date."),
  departure: z.string().trim().min(1, "Please add your departure date."),
  budget: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  whatsapp: z.string().trim().min(6, "Please enter your WhatsApp number.").max(32),
  message: z.string().trim().max(1000).optional(),
});

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

export function InquiryForm() {
  const [activities, setActivities] = useState<string[]>([]);
  const [transports, setTransports] = useState<string[]>([]);
  const [wantsStay, setWantsStay] = useState<"No" | "Yes">("No");
  const [stayType, setStayType] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

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
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <section id="inquiry" className="section-pad bg-cream">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-terracotta">Inquiry</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
            Tell us what you need
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Give us a few details and we'll get back to you.
          </p>
        </Reveal>

        {sent ? (
          <div className="mt-12 border border-border bg-card p-10 text-center shadow-soft sm:p-16">
            <h3 className="font-display text-4xl text-deep">
              Thank you! Your request has been received.
            </h3>
            <p className="mt-4 text-muted-foreground">We'll contact you shortly.</p>
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
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-12 space-y-8 border border-border bg-card p-7 shadow-soft sm:p-12"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">City *</Label>
                <select
                  id="city"
                  name="city"
                  defaultValue=""
                  className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground"
                >
                  <option value="">Choose...</option>
                  {CITY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="mt-2 text-xs text-destructive">{errors.city}</p>}
              </div>

              <div>
                <Label htmlFor="people">People *</Label>
                <Input
                  id="people"
                  name="people"
                  type="number"
                  min={1}
                  max={60}
                  defaultValue={2}
                  className="mt-2 h-11"
                />
                {errors.people && <p className="mt-2 text-xs text-destructive">{errors.people}</p>}
              </div>

              <div>
                <Label htmlFor="arrival">Arrival date *</Label>
                <Input id="arrival" name="arrival" type="date" className="mt-2 h-11" />
                {errors.arrival && (
                  <p className="mt-2 text-xs text-destructive">{errors.arrival}</p>
                )}
              </div>

              <div>
                <Label htmlFor="departure">Departure date *</Label>
                <Input id="departure" name="departure" type="date" className="mt-2 h-11" />
                {errors.departure && (
                  <p className="mt-2 text-xs text-destructive">{errors.departure}</p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="text-sm text-deep">Desired activities</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ACTIVITY_OPTIONS.map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    active={activities.includes(a)}
                    onClick={() => toggle(activities, setActivities, a)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm text-deep">Accommodation desired?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["No", "Yes"] as const).map((v) => (
                  <Chip
                    key={v}
                    label={v}
                    active={wantsStay === v}
                    onClick={() => setWantsStay(v)}
                  />
                ))}
              </div>
              {wantsStay === "Yes" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {STAY_TYPES.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      active={stayType === t}
                      onClick={() => setStayType(t)}
                    />
                  ))}
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-sm text-deep">Transport desired</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRANSPORT_OPTIONS.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    active={transports.includes(t)}
                    onClick={() => toggle(transports, setTransports, t)}
                  />
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="budget">Indicative budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  maxLength={120}
                  placeholder="e.g. 800 € for 4 nights"
                  className="mt-2 h-11"
                />
              </div>
              <div>
                <Label htmlFor="email">Email address *</Label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-2 h-11" />
                {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="whatsapp">WhatsApp number *</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  maxLength={32}
                  className="mt-2 h-11"
                />
                {errors.whatsapp && (
                  <p className="mt-2 text-xs text-destructive">{errors.whatsapp}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="message">Additional message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                placeholder="Tell us anything else that would help us find the right options for you…"
                className="mt-2"
              />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto">
              Send my request
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
