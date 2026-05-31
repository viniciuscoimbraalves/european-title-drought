import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import { teams, COMPETITIONS } from "@/data/teams";
import { calculateDrought } from "@/lib/drought";
import { slugify } from "@/lib/slug";

export function BiggestDroughts() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const list = useMemo(() => {
    const ref = now ?? new Date();
    const byComp = new Map<string, { team: typeof teams[number]; comp: string; date: string; j: ReturnType<typeof calculateDrought> }>();
    for (const t of teams) {
      for (const [comp, d] of Object.entries(t.titles)) {
        if (!d || parseInt(d.slice(0, 4), 10) <= 1900) continue;
        const j = calculateDrought(d, ref);
        if (j.totalDays <= 0) continue;
        const current = byComp.get(comp);
        if (!current || j.totalDays > current.j.totalDays) {
          byComp.set(comp, { team: t, comp, date: d, j });
        }
      }
    }
    return Array.from(byComp.values())
      .sort((a, b) => b.j.totalDays - a.j.totalDays)
      .map((x) => ({ team: x.team, biggest: { comp: x.comp, date: x.date, j: x.j } }));
  }, [now]);

  if (!now) return null;

  return (
    <section className="mt-20">
      <div className="mb-8 animate-fade-in-up space-y-2">
        <h2 className="text-3xl font-black sm:text-4xl text-foreground">
          Biggest Droughts
        </h2>
        <p className="text-lg text-muted-foreground">
          The longest drought for each competition, updated in real time
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map(({ team, biggest }, idx) => {
          const compDisplay = COMPETITIONS.find((c) => c.slug === biggest.comp)?.displayName ?? biggest.comp;
          return (
            <Link
              key={biggest.comp}
              to="/team/$slug/$competition"
              params={{ slug: slugify(team.name), competition: biggest.comp }}
              className="animate-fade-in-up group relative block overflow-hidden rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:shadow-hover"
              style={{ boxShadow: "var(--shadow-card)", animationDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center p-1">
                  <img src={team.crest} alt={team.name} className="h-full w-full object-contain drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xl font-black text-foreground">
                    <span className="sm:truncate">{compDisplay}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                    {team.name}
                  </h4>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-6 gap-1" suppressHydrationWarning>
                {[
                  [biggest.j.years === 1 ? "Year" : "Years", biggest.j.years],
                  [biggest.j.months === 1 ? "Month" : "Months", biggest.j.months],
                  [biggest.j.days === 1 ? "Day" : "Days", biggest.j.days],
                  [biggest.j.hours === 1 ? "Hr" : "Hrs", biggest.j.hours],
                  ["Min", biggest.j.minutes],
                  ["Seg", biggest.j.seconds],
                ].map(([label, val]) => (
                  <div key={label as string} className="rounded-lg bg-gradient-to-b from-muted/80 to-muted/40 px-1.5 py-2.5 text-center border-2 border-border/40 transition-all duration-300 group-hover:border-primary/40">
                    <div className="font-timer text-[1.5rem] font-black tabular-nums text-foreground leading-none">
                      {String(val)}
                    </div>
                    <div className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
