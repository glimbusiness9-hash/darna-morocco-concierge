import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStatus } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/properties", label: "Property Submissions", exact: false },
  { to: "/admin/inquiries", label: "Trip Inquiries", exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const status = useServerFn(getAdminStatus);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-status"],
    queryFn: () => status({}),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading) {
    return <p className="p-8 text-sm text-muted-foreground">Loading…</p>;
  }

  if (!data?.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-xl font-semibold text-foreground">No access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is not allowed in the Darna admin area.
          </p>
          <Button className="mt-6" variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-semibold text-foreground">Darna admin</span>
            <Button variant="outline" size="sm" className="sm:hidden" onClick={signOut}>
              Sign out
            </Button>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={signOut}>
              Sign out
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
