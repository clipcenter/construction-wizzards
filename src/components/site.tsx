import { Link } from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "learner" | "mentor";
const RoleCtx = createContext<{ role: Role; toggle: () => void }>({ role: "learner", toggle: () => {} });
export const useRole = () => useContext(RoleCtx);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("learner");
  return (
    <RoleCtx.Provider value={{ role, toggle: () => setRole((r) => (r === "learner" ? "mentor" : "learner")) }}>
      {children}
    </RoleCtx.Provider>
  );
}

const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/forum", label: "Forum" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/admin", label: "Admin" },
] as const;

export function Header() {
  const { role, toggle } = useRole();
  return (
    <header className="sticky top-0 z-40 bg-ink text-ink-foreground">
      <div className="hazard h-1.5" />
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3">
        <Link to="/" className="font-display text-lg">
          CONSTRUCTION<span className="text-primary">WIZZARDS</span>
        </Link>
        <nav className="hidden gap-5 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100" activeProps={{ className: "text-primary opacity-100" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button onClick={toggle} className="ml-auto flex items-center rounded-full border border-primary/50 p-1 text-xs font-semibold" aria-label="Switch role">
          <span className={`rounded-full px-3 py-1 ${role === "learner" ? "bg-primary text-primary-foreground" : ""}`}>Learner</span>
          <span className={`rounded-full px-3 py-1 ${role === "mentor" ? "bg-primary text-primary-foreground" : ""}`}>Mentor</span>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 text-sm">
        <div>
          <p className="font-display text-lg">CONSTRUCTION<span className="text-primary">WIZZARDS</span></p>
          <p className="mt-2 opacity-70">Learn, mentor and trade with the global construction community.</p>
        </div>
        {[["Learn", "Courses", "Live classes", "Certificates"], ["Community", "Forum", "Groups & events", "Marketplace"], ["Company", "Become a mentor", "Verification", "Support"]].map(([h, ...l]) => (
          <div key={h}><p className="font-semibold text-primary">{h}</p>{l.map((x) => <p key={x} className="mt-2 opacity-70">{x}</p>)}</div>
        ))}
      </div>
    </footer>
  );
}

export function PageHead({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{kicker}</p>
        <h1 className="mt-2 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl opacity-75">{sub}</p>
      </div>
    </section>
  );
}
