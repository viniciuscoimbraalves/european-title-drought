import { createFileRoute, Link } from "@tanstack/react-router";
import { teams, COMPETITIONS } from "@/data/teams";
import { slugify } from "@/lib/slug";
import { BiggestDroughts } from "@/components/BiggestDroughts";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "European Title Drought — How long since your club last won" },
      { name: "description", content: "Track how long since Europe's biggest clubs last won the Champions League." },
    ],
  }),
});

function Index() {
  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name, "en"));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mx-auto mb-12 max-w-3xl animate-fade-in-up text-center">
        <h1 className="text-4xl font-black sm:text-5xl leading-tight text-foreground">
          How long since your club last won?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Track the Champions League title drought for Europe's biggest clubs in real time
        </p>
      </div>

      <div className="mx-auto mb-14 max-w-5xl">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 justify-center">
          {sorted.map((t, idx) => (
            <Link
              key={t.name}
              to="/team/$slug"
              params={{ slug: slugify(t.name) }}
              className="animate-fade-in-up group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-2 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-hover"
              style={{
                boxShadow: "var(--shadow-card)",
                animationDelay: `${idx * 0.05}s`
              }}
              aria-label={t.name}
              title={t.name}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <img
                src={t.crest}
                alt={`${t.name} crest`}
                className="relative max-h-full max-w-full object-contain drop-shadow-md"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>

      <BiggestDroughts />
    </div>
  );
}
