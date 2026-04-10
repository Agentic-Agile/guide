interface GitHubCalloutProps {
  href: string;
}

export function GitHubCallout({ href }: GitHubCalloutProps) {
  return (
    <div className="mt-12 border border-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Open Draft</p>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Something here doesn&apos;t match your experience? This guide is maintained in the open —
          proposals and challenges are welcome.
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 font-mono text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-4 py-2.5 transition-colors whitespace-nowrap"
      >
        DISCUSS ON GITHUB →
      </a>
    </div>
  );
}
