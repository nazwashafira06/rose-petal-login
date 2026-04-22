import { Link } from "react-router-dom";

export default function NotFound() {
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
