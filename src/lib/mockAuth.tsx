import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MockUser = { id: string; fullName: string; email: string };
type StoredUser = MockUser & { password: string };

type AuthCtx = {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const USERS_KEY = "rose_users";
const SESSION_KEY = "rose_session";

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function writeUsers(u: StoredUser[]) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setUser(JSON.parse(s));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await wait();
    const users = readUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const session: MockUser = { id: found.id, fullName: found.fullName, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const register = async (fullName: string, email: string, password: string) => {
    await wait();
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists");
    }
    const newUser: StoredUser = { id: crypto.randomUUID(), fullName, email, password };
    writeUsers([...users, newUser]);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
