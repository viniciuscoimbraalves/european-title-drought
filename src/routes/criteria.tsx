import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/criteria")({
  component: Criteria,
  head: () => ({
    meta: [
      { title: "Criteria — European Title Drought" },
      { name: "description", content: "Learn how we calculate title droughts." },
    ],
  }),
});

function Criteria() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-black text-foreground">Criteria</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          We track the date each club last won the UEFA Champions League (formerly European Cup).
          The drought is calculated from that date to the current moment, updating every second.
        </p>
        <p>
          Only the most recent title win is considered for each club — historical wins before the
          most recent one are not factored into the drought calculation.
        </p>
        <p>
          Clubs included are European teams that have won the Champions League / European Cup at least once.
          </p>
      </div>
    </div>
  );
}
