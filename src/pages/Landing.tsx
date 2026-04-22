import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/mockAuth";
import { toast } from "sonner";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    document.title = "Welcome — Rosé";
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  const onLogout = () => {
    logout();
    toast.success("Signed out — see you soon 🌹");
    navigate("/login");
  };

  if (!user) return null;
  const firstName = user.fullName.split(" ")[0];

  return (
    <main className="relative min-h-screen">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="font-display text-2xl font-bold text-maroon">Rosé</div>
        <button onClick={onLogout}
          className="flex items-center gap-2 rounded-full border border-rose-gold bg-white/70 px-4 py-2 text-sm font-medium text-maroon backdrop-blur transition-all hover:bg-maroon hover:text-white">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </header>

      <section className="flex min-h-[calc(100vh-100px)] items-center justify-center px-6 py-12">
        <div className="animate-fade-up max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-gold bg-white/70 px-4 py-1.5 text-xs uppercase tracking-widest text-maroon backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome to your sanctuary
          </div>

          <h1 className="font-display text-5xl leading-tight text-maroon sm:text-7xl">
            Welcome back,<br />
            <span className="italic" style={{ color: "#8B1A2A" }}>{firstName}</span> <span className="not-italic">👋</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            A quiet moment of elegance, just for you. Let every detail bloom in its own time.
          </p>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-rose-gold" />
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#7B1D2A">
              <path d="M10 2 C7 5, 7 9, 10 12 C13 9, 13 5, 10 2 Z" opacity="0.7"/>
              <circle cx="10" cy="14" r="2" opacity="0.5"/>
            </svg>
            <span className="h-px w-12 bg-rose-gold" />
          </div>

          <p className="mt-6 font-display text-sm italic text-muted-foreground">
            "She wore her heart in colors of dusk and rose."
          </p>
        </div>
      </section>
    </main>
  );
}
