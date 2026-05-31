import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, Home, Users, ListChecks, Shield } from "lucide-react";
import { Logo } from "./Logo";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("european-title-drought-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("european-title-drought-theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Users },
  { to: "/criteria", label: "Criteria", icon: ListChecks },
  { to: "/privacy", label: "Privacy", icon: Shield },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground transition-colors"
      style={{ backgroundImage: "var(--gradient-pitch)" }}
    >
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 transition-all hover:scale-105 hover:bg-accent hover:shadow-md"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Logo className="h-10 sm:h-12" />

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 transition-all hover:scale-105 hover:bg-accent hover:shadow-md"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo className="h-9" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-accent text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                    active ? "text-foreground" : ""
                  }`}
                />
                {label}
                {active && (
                  <span
                    className="ml-auto h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--gradient-hero)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main>{children}</main>

      <footer className="mt-8 border-t border-border/60 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8">
          <Logo className="h-10 sm:h-12" />
        </div>
      </footer>
    </div>
  );
}
