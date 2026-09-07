import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getOverview } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Overview() {
  const fn = useServerFn(getOverview);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fn({}),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error || !data) return <p className="text-sm text-destructive">Could not load statistics.</p>;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <h2 className="mt-6 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Properties
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Stat label="Pending" value={data.properties.pending} />
          <Stat label="Approved" value={data.properties.approved} />
          <Stat label="Rejected" value={data.properties.rejected} />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Inquiries
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Stat label="New" value={data.inquiries.new} />
          <Stat label="Contacted" value={data.inquiries.contacted} />
          <Stat label="Completed" value={data.inquiries.completed} />
        </div>
      </section>
    </div>
  );
}
