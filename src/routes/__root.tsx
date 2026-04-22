import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/mockAuth";
import { RomanticBackground } from "@/components/RomanticBackground";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-card border-rose-gold rounded-2xl border p-10 text-center shadow-romantic max-w-md">
        <h1 className="font-display text-7xl text-maroon">404</h1>
        <p className="mt-3 text-muted-foreground">This page drifted away like a petal.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-deep-rose">
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rosé — Romantic Luxury Auth" },
      { name: "description", content: "An elegant, romantic authentication experience." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <RomanticBackground />
      <Outlet />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
