import { useEffect, useState } from "react";
import { Instagram, MessageCircle, Copy, Check } from "lucide-react";

interface Props {
  text: string;
  centered?: boolean;
}

export function ShareButtons({ text, centered }: Props) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const homeUrl = "https://www.european-title-drought.vercel.app";
  const message = `${text}\n\nCheck other droughts at ${homeUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* noop */
    }
  };

  const buttons = (
    <div className="flex flex-wrap justify-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-[#25D366] p-3 text-white transition-transform hover:-translate-y-0.5"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={copyToClipboard}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-3 text-white transition-transform hover:-translate-y-0.5"
        title="Copy text to paste on Instagram"
      >
        {copied ? <Check className="h-5 w-5" /> : <Instagram className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={copyToClipboard}
        className="inline-flex items-center justify-center rounded-full border border-border bg-background p-3 transition-colors hover:bg-accent"
        aria-label="Copy text"
      >
        <Copy className="h-5 w-5" />
      </button>
    </div>
  );

  if (centered) {
    return (
      <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        {buttons}
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Share</p>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-5 text-center sm:flex-row sm:justify-between sm:text-left" style={{ boxShadow: "var(--shadow-card)" }}>
      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Share</p>
      {buttons}
    </div>
  );
}
