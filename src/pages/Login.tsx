import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/mockAuth";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Sign in — Rosé";
    if (!loading && user) navigate("/landing");
  }, [user, loading, navigate]);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back ✨");
      navigate("/landing");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrors({ form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <h1 className="font-display text-5xl font-bold text-maroon">Rosé</h1>
          <p className="mt-2 text-sm tracking-wide" style={{ color: "#B66B7A" }}>
            Where elegance meets romance
          </p>
        </div>

        <div className="glass-card border-rose-gold shadow-romantic rounded-2xl border p-8 sm:p-10">
          <h2 className="font-display text-2xl text-maroon">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue your journey</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <Field
              icon={<Mail className="h-4 w-4" style={{ color: "#7B1D2A" }} />}
              label="Email" type="email" value={email} onChange={setEmail}
              placeholder="you@rose.com" error={errors.email} autoComplete="email"
            />
            <Field
              icon={<Lock className="h-4 w-4" style={{ color: "#7B1D2A" }} />}
              label="Password" type={showPw ? "text" : "password"} value={password} onChange={setPassword}
              placeholder="••••••••" error={errors.password} autoComplete="current-password"
              trailing={
                <button type="button" onClick={() => setShowPw((s) => !s)} className="text-muted-foreground hover:text-maroon transition-colors" aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm transition-colors hover:underline" style={{ color: "#B66B7A" }}>
                Forgot password?
              </a>
            </div>

            {errors.form && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {errors.form}
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="bg-maroon hover:bg-deep-rose flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium tracking-wide text-white shadow-petal transition-all duration-300 hover:shadow-romantic disabled:opacity-60">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Signing in…" : "Sign in"}
            </button>

            <div className="relative my-2 flex items-center">
              <div className="flex-1 border-t border-rose-gold" />
              <span className="px-3 text-xs uppercase tracking-widest text-muted-foreground">or</span>
              <div className="flex-1 border-t border-rose-gold" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-maroon hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ icon, label, type, value, onChange, placeholder, error, autoComplete, trailing }: {
  icon: React.ReactNode; label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string;
  autoComplete?: string; trailing?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5 transition-all focus-within:ring-2 ${error ? "border-destructive focus-within:ring-destructive/20" : "border-rose-gold focus-within:border-maroon focus-within:ring-[oklch(0.38_0.15_18/0.15)]"}`}>
        {icon}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60" />
        {trailing}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
