import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "./Reveal";
import { approvedPropertiesQuery } from "@/lib/propertyQueries";

export function PropertyListings() {
  const { data, isLoading } = useQuery(approvedPropertiesQuery);
  const properties = data ?? [];

  if (isLoading) return null;

  if (properties.length === 0) {
    return (
      <Reveal delay={80} className="mt-14">
        <div className="border border-border bg-card px-7 py-12 text-center sm:px-12 sm:py-16">
          <p className="eyebrow text-terracotta">Darna stays</p>
          <h3 className="mt-4 font-display text-3xl leading-tight text-deep sm:text-4xl">
            Our first verified homes are on their way
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            We're personally visiting and verifying each property before it appears here. In the
            meantime, tell us what you need and we'll find it for you.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="mt-14">
      <Reveal>
        <p className="eyebrow text-terracotta">Darna stays</p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-deep sm:text-4xl">
          Verified homes available now
        </h3>
      </Reveal>

      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p, i) => (
          <Reveal as="article" key={p.id} delay={i * 90} className="group">
            <Link to="/stays/$id" params={{ id: p.id }} className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted shadow-soft">
                {p.photoUrls[0] ? (
                  <img
                    src={p.photoUrls[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Photo coming soon
                  </div>
                )}
                <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-deep">
                  Darna verified
                </span>
              </div>
              <div className="mt-4">
                <h4 className="font-display text-2xl text-deep">{p.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.property_type} · {p.city}
                </p>
                <p className="mt-2 text-sm text-deep/80">
                  {p.guests} guests · {p.bedrooms} bedrooms · {p.bathrooms} bathrooms
                </p>
                <p className="mt-3 text-sm font-medium text-deep">
                  {p.price_per_night.toLocaleString()} MAD{" "}
                  <span className="text-muted-foreground">/ night</span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
