import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — European Title Drought" },
      { name: "description", content: "Learn more about the European Title Drought tracker." },
    ],
  }),
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-black text-foreground">About</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        European Title Drought tracks how long it has been since Europe's biggest clubs last won a major competition.
        Currently focused on the UEFA Champions League, with more competitions coming soon.
      </p>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        The counter updates in real time — every second — so you can see exactly how long the drought has lasted.
      </p>
    </div>
  );
}
