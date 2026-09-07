import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listInquiries, updateInquiryStatus } from "@/lib/admin.functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({
  component: Inquiries,
});

const STATUSES = ["new", "contacted", "completed", "cancelled"] as const;

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleDateString() : "—";
}

function Inquiries() {
  const queryClient = useQueryClient();
  const list = useServerFn(listInquiries);
  const update = useServerFn(updateInquiryStatus);
  const [busy, setBusy] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: () => list({}),
  });

  async function setStatus(id: string, status: (typeof STATUSES)[number]) {
    setBusy(id);
    try {
      await update({ data: { id, status } });
      await queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    } finally {
      setBusy(null);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error) return <p className="text-sm text-destructive">Could not load inquiries.</p>;

  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Trip inquiries</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((q) => (
            <div key={q.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{q.name || "No name"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {q.city} · {q.guests} guests · submitted {fmt(q.created_at)}
                  </p>
                </div>
                <div className="w-40">
                  <Select
                    value={q.status}
                    disabled={busy === q.id}
                    onValueChange={(v) => setStatus(q.id, v as (typeof STATUSES)[number])}
                  >
                    <SelectTrigger aria-label="Inquiry status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div><dt className="text-muted-foreground">Check-in</dt><dd>{fmt(q.check_in)}</dd></div>
                <div><dt className="text-muted-foreground">Check-out</dt><dd>{fmt(q.check_out)}</dd></div>
                <div><dt className="text-muted-foreground">Stay</dt><dd>{q.stay || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Budget</dt><dd>{q.budget || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd className="break-all">{q.email}</dd></div>
                <div><dt className="text-muted-foreground">WhatsApp</dt><dd>{q.whatsapp}</dd></div>
                <div><dt className="text-muted-foreground">Activities</dt><dd>{q.activities.length ? q.activities.join(", ") : "—"}</dd></div>
                <div><dt className="text-muted-foreground">Transport</dt><dd>{q.transport.length ? q.transport.join(", ") : "—"}</dd></div>
              </dl>
              {q.message ? (
                <p className="mt-3 whitespace-pre-wrap text-sm">{q.message}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
