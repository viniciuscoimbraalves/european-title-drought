import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { teams, COMPETITIONS } from "@/data/teams";
import { calculateDrought, formatDroughtFull } from "@/lib/drought";
import { slugify } from "@/lib/slug";
import { formatDate } from "@/lib/utils";
import { ShareButtons } from "@/components/ShareButtons";

export const Route = createFileRoute("/team/$slug/$competition")({
  component: DetailPage,
});

function DetailPage() {
  const { slug, competition } = Route.useParams();
  const compSlug = decodeURIComponent(competition);
  const team = teams.find((t) => slugify(t.name) === slug);
  const titleDate = team?.titles[compSlug];

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!team || !titleDate) {
    return (
      <div className="mx-auto max-w-3xl sm:px-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Title not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm underline">Back</Link>
      </div>
    );
  }

  const j = calculateDrought(titleDate, now);
  const compDisplay = COMPETITIONS.find((c) => c.slug === compSlug)?.displayName ?? compSlug;
  const dateFormatted = formatDate(titleDate);

  return (
    <div className="mx-auto max-w-3xl sm:px-4 px-6 sm:py-6 py-10">
      <Link
        to="/team/$slug"
        params={{ slug }}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2.5 text-sm font-semibold transition-all hover:bg-accent/60 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {team.name}
      </Link>

      <div
        className="mb-6 overflow-hidden rounded-3xl border-2 border-border bg-card/60 sm:p-6 p-8"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex sm:h-12 sm:w-12 h-16 w-16 shrink-0 items-center justify-center sm:p-0.5 p-1">
            <img src={team.crest} alt={`${team.name} crest`} className="h-full w-full object-contain drop-shadow-md" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Drought</p>
            <h1 className="text-3xl font-black sm:text-3xl">{compDisplay}</h1>
            <p className="sm:mt-0.5 mt-1 text-sm text-muted-foreground">
              {team.name} &middot; last title on {dateFormatted}
            </p>
          </div>
        </div>

        <div className="sm:mt-5 mt-8 grid grid-cols-3 sm:gap-0.5 gap-1 sm:grid-cols-6">
          {[
            [j.years === 1 ? "Year" : "Years", j.years],
            [j.months === 1 ? "Month" : "Months", j.months],
            [j.days === 1 ? "Day" : "Days", j.days],
            [j.hours === 1 ? "Hour" : "Hours", j.hours],
            ["Min", j.minutes],
            ["Seg", j.seconds],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-xl border-2 border-border/30 bg-muted sm:px-2 sm:py-2 px-3 py-3 text-center">
              <div className="font-timer text-[1.8rem] font-black tabular-nums sm:text-[2.9rem] text-foreground leading-none">
                {String(val)}
              </div>
              <div className="sm:mt-0.5 mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <ShareButtons
        text={`${team.name} haven't won the ${compDisplay} in ${formatDroughtFull(j)}.`}
        centered
      />

      <div className="mb-6">
        <h2 className="text-2xl font-black sm:text-3xl">
          When {team.name} last won the {compDisplay}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(titleDate).getFullYear()} &middot; The last time {team.name} lifted the trophy
        </p>
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-8 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="text-lg text-muted-foreground">
          Historical facts about this title will be available soon.
        </p>
      </div>
    </div>
  );
}
