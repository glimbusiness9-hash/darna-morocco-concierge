import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { waLink } from "@/lib/darna";
import { propertyQuery } from "@/lib/propertyQueries";

export const Route = createFileRoute("/stays/$id")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(propertyQuery(params.id)),
  head: () => ({
    meta: [
      { title: "Stay in Northern Morocco — darna" },
      {
        name: "description",
        content:
          "A verified home selected by darna in Northern Morocco. See photos, capacity, amenities and message us on WhatsApp.",
      },
      { property: "og:title", content: "Stay in Northern Morocco — darna" },
      {
        property: "og:description",
        content: "A verified home selected by darna. Message us on WhatsApp to book your stay.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertyPage,
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-3xl px-6 py-32 text-center text-deep">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <NotAvailable />,
});

function NotAvailable() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-deep">This stay isn't available</h1>
      <p className="mt-4 text-muted-foreground">
        It may have been removed or is not published yet.
      </p>
      <Button asChild variant="hero" size="xl" className="mt-8">
        <Link to="/">Back to darna</Link>
      </Button>
    </div>
  );
}

const AMENITY_HIGHLIGHTS = ["Wi-Fi", "AC", "Air conditioning", "Parking", "Pool", "Sea view"];

function PropertyPage() {
  const { id } = Route.useParams();
  const { data: p } = useSuspenseQuery(propertyQuery(id));

  if (!p) {
    return (
      <>
        <Navbar />
        <main>
          <NotAvailable />
        </main>
        <Footer />
      </>
    );
  }

  const hero = p.photoUrls[0];
  const gallery = p.photoUrls.slice(1);
  const highlights = AMENITY_HIGHLIGHTS.filter((a) =>
    p.amenities.some((x) => x.toLowerCase().includes(a.toLowerCase()))
  );
  const wa = waLink(`Hello Darna, I'm interested in ${p.name}.`);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
          <Link to="/" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            ← Back to darna
          </Link>

          <div className="mt-6 aspect-[16/10] w-full overflow-hidden bg-muted shadow-soft sm:aspect-[16/8]">
            {hero ? (
              <img
                src={hero}
                alt={p.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                Photos coming soon
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.7fr_1fr]">
            <div>
              <span className="inline-block bg-deep/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-deep">
                Darna verified
              </span>
              <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] text-deep">
                {p.name}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {p.property_type} · {p.city}, Morocco
              </p>

              {highlights.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-deep/75"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-border py-7 sm:grid-cols-4">
                {[
                  ["Guests", p.guests],
                  ["Bedrooms", p.bedrooms],
                  ["Beds", p.beds],
                  ["Bathrooms", p.bathrooms],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-deep">{value}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 font-display text-2xl text-deep">About this home</h2>
              <p className="mt-3 whitespace-pre-line text-muted-foreground">{p.description}</p>

              {p.amenities.length > 0 && (
                <>
                  <h2 className="mt-10 font-display text-2xl text-deep">Amenities</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-2 text-deep/80 sm:grid-cols-2">
                    {p.amenities.map((a) => (
                      <li key={a} className="text-sm">
                        · {a}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {p.nearby && (
                <>
                  <h2 className="mt-10 font-display text-2xl text-deep">The area</h2>
                  <p className="mt-3 whitespace-pre-line text-muted-foreground">{p.nearby}</p>
                </>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-border bg-card p-7">
                <p className="font-display text-3xl text-deep">
                  {p.price_per_night.toLocaleString()} MAD
                  <span className="text-base text-muted-foreground"> / night</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Message darna and we'll confirm availability and arrange everything for you.
                </p>
                <Button asChild variant="hero" size="xl" className="mt-6 w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    WhatsApp darna
                  </a>
                </Button>
              </div>
            </aside>
          </div>

          {gallery.length > 0 && (
            <div className="mt-16 pb-24">
              <h2 className="font-display text-2xl text-deep">Photo gallery</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((url, i) => (
                  <div key={url} className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={url}
                      alt={`${p.name} photo ${i + 2}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {gallery.length === 0 && <div className="pb-24" />}
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
