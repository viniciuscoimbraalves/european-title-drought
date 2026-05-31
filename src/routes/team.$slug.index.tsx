import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { teams, COMPETITIONS } from "@/data/teams";
import { calculateDrought, formatDroughtFull } from "@/lib/drought";
import { slugify } from "@/lib/slug";
import { formatDate } from "@/lib/utils";
import { ShareButtons } from "@/components/ShareButtons";

export const Route = createFileRoute("/team/$slug/")({
  component: TeamPage,
});

function TeamPage() {
  const { slug } = Route.useParams();
  const team = teams.find((t) => slugify(t.name) === slug);

  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const competitions = useMemo(() => {
    if (!team) return [];
    const ref = now ?? new Date();
    return Object.entries(team.titles)
      .filter(([, date]) => {
        if (!date) return false;
        const year = parseInt(date.slice(0, 4), 10);
        return year > 1900;
      })
      .map(([comp, date]) => ({ comp, date: date!, j: calculateDrought(date!, ref) }))
      .sort((a, b) => b.j.totalDays - a.j.totalDays);
  }, [team, now]);

  if (!team) {
    return (
      <div className="mx-auto max-w-3xl sm:px-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Team not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm underline">Back</Link>
      </div>
    );
  }

  const mounted = now !== null;
  const biggest = competitions.length > 0 ? competitions[0] : null;

  const shareText = useMemo(() => {
    if (!biggest || !team || !mounted) return "";
    const compDisplay = COMPETITIONS.find((c) => c.slug === biggest.comp)?.displayName ?? biggest.comp;
    return `${team.name} haven't won a title in ${formatDroughtFull(biggest.j)}. The biggest drought is in the ${compDisplay}.`;
  }, [biggest, team, mounted]);

  return (
    <div className="mx-auto max-w-5xl sm:px-4 px-6 sm:py-6 py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2.5 text-sm font-semibold transition-all hover:bg-accent/60 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div
        className="mb-6 overflow-hidden rounded-3xl border-2 border-border bg-card/60 sm:p-6 p-8"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex sm:h-16 sm:w-16 h-20 w-20 shrink-0 items-center justify-center sm:p-1 p-1.5">
            <img src={team.crest} alt={`${team.name} crest`} className="h-full w-full object-contain drop-shadow-md" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-black sm:text-4xl">{team.name}</h1>
            <p className="sm:mt-1 mt-2 text-sm text-muted-foreground">
              Founded {formatDate(team.founded)} &middot; {team.city}, {team.country}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-1.5 gap-3">
        {competitions.map((l) => {
          const compDisplay = COMPETITIONS.find((c) => c.slug === l.comp)?.displayName ?? l.comp;
          return (
            <Link
              key={l.comp}
              to="/team/$slug/$competition"
              params={{ slug, competition: l.comp }}
              className="group relative block overflow-hidden rounded-2xl border-2 border-border bg-card sm:p-4 p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-hover"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ backgroundColor: team.color }}
              />
              <div className="flex items-start justify-between sm:gap-2 gap-3">
                <div>
                  <h3 className="text-2xl font-black sm:text-2xl">{compDisplay}</h3>
                  <div className="sm:mt-0.5 mt-1 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    Last title: {formatDate(l.date)}
                  </div>
                </div>
                <span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: team.color }}
                >
                  <span className="hidden sm:inline">Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              {mounted && l.j.totalDays > 0 && (
                <>
                  <div className="sm:mt-2 mt-4 grid grid-cols-6 sm:gap-0 gap-0.5" suppressHydrationWarning>
                    {[
                      [l.j.years === 1 ? "Year" : "Years", l.j.years],
                      [l.j.months === 1 ? "Month" : "Months", l.j.months],
                      [l.j.days === 1 ? "Day" : "Days", l.j.days],
                      [l.j.hours === 1 ? "Hr" : "Hrs", l.j.hours],
                      ["Min", l.j.minutes],
                      ["Seg", l.j.seconds],
                    ].map(([label, val]) => (
                      <div
                        key={label as string}
                        className="rounded-lg border-2 border-border/30 bg-muted sm:px-0.5 sm:py-1.5 px-1 py-2 text-center"
                      >
                        <div className="font-timer sm:text-[1.95rem] text-[1.5rem] font-black tabular-nums text-foreground leading-none">
                          {String(val)}
                        </div>
                        <div className="sm:text-[9px] text-[8px] uppercase tracking-widest text-muted-foreground sm:mt-0 mt-0.5">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Link>
          );
        })}
      </div>

      {shareText && <ShareButtons text={shareText} />}
    </div>
  );
}
