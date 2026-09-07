import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  listSubmissions,
  updateSubmissionStatus,
  getSubmissionPhotos,
} from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin/properties")({
  component: Properties,
});

type Submission = Awaited<ReturnType<typeof listSubmissions>>[number];

const STATUS_CLASS: Record<string, string> = {
  pending: "bg-muted text-foreground",
  approved: "bg-primary/15 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_CLASS[status] ?? "bg-muted"}`}
    >
      {status}
    </span>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString();
}

function Properties() {
  const queryClient = useQueryClient();
  const list = useServerFn(listSubmissions);
  const update = useServerFn(updateSubmissionStatus);
  const photosFn = useServerFn(getSubmissionPhotos);
  const [open, setOpen] = useState<Submission | null>(null);
  const [busy, setBusy] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: () => list({}),
  });

  const photos = useQuery({
    queryKey: ["admin-photos", open?.id],
    enabled: Boolean(open),
    queryFn: () => photosFn({ data: { paths: open?.photos ?? [] } }),
  });

  async function setStatus(id: string, status: "pending" | "approved" | "rejected") {
    setBusy(true);
    try {
      await update({ data: { id, status } });
      await queryClient.invalidateQueries({ queryKey: ["admin-submissions"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      setOpen((cur) => (cur && cur.id === id ? { ...cur, status } : cur));
    } finally {
      setBusy(false);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error) return <p className="text-sm text-destructive">Could not load submissions.</p>;

  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Property submissions</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No properties submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{p.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {p.city} · {p.property_type} · {p.price_per_night} MAD / night
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div><dt className="text-muted-foreground">Host</dt><dd>{p.contact_name || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Phone / WhatsApp</dt><dd>{p.phone || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd className="break-all">{p.email || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Guests</dt><dd>{p.guests}</dd></div>
                <div><dt className="text-muted-foreground">Bedrooms</dt><dd>{p.bedrooms}</dd></div>
                <div><dt className="text-muted-foreground">Bathrooms</dt><dd>{p.bathrooms}</dd></div>
                <div><dt className="text-muted-foreground">Submitted</dt><dd>{fmt(p.created_at)}</dd></div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setOpen(p)}>
                  View full submission
                </Button>
                <Button size="sm" disabled={busy || p.status === "approved"} onClick={() => setStatus(p.id, "approved")}>
                  Approve
                </Button>
                <Button size="sm" variant="destructive" disabled={busy || p.status === "rejected"} onClick={() => setStatus(p.id, "rejected")}>
                  Reject
                </Button>
                <Button size="sm" variant="outline" disabled={busy || p.status === "pending"} onClick={() => setStatus(p.id, "pending")}>
                  Back to pending
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {open ? (
            <>
              <DialogHeader>
                <DialogTitle>{open.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <StatusBadge status={open.status} />
                <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  <div><dt className="text-muted-foreground">Host</dt><dd>{open.contact_name || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Phone / WhatsApp</dt><dd>{open.phone || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Email</dt><dd className="break-all">{open.email || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">City</dt><dd>{open.city}</dd></div>
                  <div><dt className="text-muted-foreground">Type</dt><dd>{open.property_type}</dd></div>
                  <div><dt className="text-muted-foreground">Price / night</dt><dd>{open.price_per_night} MAD</dd></div>
                  <div><dt className="text-muted-foreground">Guests</dt><dd>{open.guests}</dd></div>
                  <div><dt className="text-muted-foreground">Bedrooms</dt><dd>{open.bedrooms}</dd></div>
                  <div><dt className="text-muted-foreground">Beds</dt><dd>{open.beds}</dd></div>
                  <div><dt className="text-muted-foreground">Bathrooms</dt><dd>{open.bathrooms}</dd></div>
                  <div><dt className="text-muted-foreground">Address</dt><dd>{open.address}</dd></div>
                  <div><dt className="text-muted-foreground">Nearby</dt><dd>{open.nearby || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Submitted</dt><dd>{fmt(open.created_at)}</dd></div>
                </dl>
                <div>
                  <p className="text-muted-foreground">Description</p>
                  <p className="mt-1 whitespace-pre-wrap">{open.description}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amenities</p>
                  <p className="mt-1">{open.amenities.length ? open.amenities.join(", ") : "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Photos</p>
                  {open.photos.length === 0 ? (
                    <p className="mt-1">No photos uploaded.</p>
                  ) : photos.isLoading ? (
                    <p className="mt-1">Loading photos…</p>
                  ) : (
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {(photos.data ?? []).map((url) => (
                        <img
                          key={url}
                          src={url}
                          alt={`Photo of ${open.name}`}
                          loading="lazy"
                          className="h-32 w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" disabled={busy} onClick={() => setStatus(open.id, "approved")}>Approve</Button>
                  <Button size="sm" variant="destructive" disabled={busy} onClick={() => setStatus(open.id, "rejected")}>Reject</Button>
                  <Button size="sm" variant="outline" disabled={busy} onClick={() => setStatus(open.id, "pending")}>Back to pending</Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
