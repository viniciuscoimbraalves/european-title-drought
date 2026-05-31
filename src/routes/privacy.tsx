import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy — European Title Drought" },
      { name: "description", content: "Privacy policy for European Title Drought." },
    ],
  }),
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-black text-foreground">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          This site does not collect, store, or share any personal data. We do not use cookies,
          analytics, or tracking scripts.
        </p>
        <p>
          The theme preference (light/dark) is stored locally in your browser via localStorage
          and is never transmitted to any server.
        </p>
        <p>
          This is a static site deployed on Vercel. Vercel may collect standard server logs
          (IP address, browser user agent, requested pages) as part of their hosting service.
          We do not have access to or use this data.
        </p>
      </div>
    </div>
  );
}
