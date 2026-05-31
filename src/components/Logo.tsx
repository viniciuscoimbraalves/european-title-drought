export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      className={`inline-flex items-center gap-3 transition-all duration-300 hover:opacity-80 ${className}`}
      aria-label="European Title Drought"
    >
      <svg
        viewBox="0 0 28 28"
        className="h-full w-auto max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Trophy / Star icon */}
        <path
          d="M14 2l2.5 5.1 5.5.8-4 3.9.9 5.6L14 14.5l-4.9 2.9.9-5.6-4-3.9 5.5-.8L14 2z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M14 6l1.2 2.5 2.7.4-2 1.9.5 2.7L14 12l-2.4 1.5.5-2.7-2-1.9 2.7-.4L14 6z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <span className="text-xl font-black tracking-tight">
        European <span style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Title Drought</span>
      </span>
    </a>
  );
}
