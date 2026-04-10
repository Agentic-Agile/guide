interface HandoffMockProps {
  ticket: {
    id: string;
    feature: { id: string; name: string };
    title: string;
    summary: string;
    criteria: string[];
  };
  spec: {
    heading: string;
    ticket: string;
    criterion: string;
    constraints?: string[];
    status?: string;
  };
}

export default function HandoffMock({ ticket, spec }: HandoffMockProps) {
  return (
    <div className="my-8 border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex items-center gap-2">
        <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Ticket</span>
        <span className="font-mono text-xs text-zinc-700">→</span>
        <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Spec entry</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">

        {/* Left: ticket (light) */}
        <div className="p-6" style={{ backgroundColor: "#f4f5f7" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs mb-3 flex-wrap" style={{ color: "#6b778c" }}>
            <span>Projects / PROJ</span>
            <span>/</span>
            <span className="font-medium" style={{ color: "#0052cc" }}>
              {ticket.feature.id} — {ticket.feature.name}
            </span>
            <span>/</span>
            <span style={{ color: "#172b4d" }}>{ticket.id}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold mb-2 leading-snug" style={{ color: "#172b4d" }}>
            {ticket.title}
          </h3>

          {/* Summary */}
          <p className="text-xs mb-4 leading-relaxed" style={{ color: "#5e6c84" }}>
            {ticket.summary}
          </p>

          {/* Acceptance criteria */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6b778c" }}>
              Acceptance criteria
            </p>
            <ul className="flex flex-col gap-1.5">
              {ticket.criteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#172b4d" }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "#00875a" }}>✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Spec entry (dark) */}
        <div className="p-6 bg-zinc-950 font-mono text-xs leading-relaxed">
          <p className="text-zinc-600 mb-4">SPEC.md</p>

          <p className="text-indigo-400 mb-3">## {spec.heading}</p>

          <p className="text-zinc-500 mb-0.5">
            <span className="text-zinc-600">Ticket: </span>{spec.ticket}
          </p>
          <p className="text-zinc-500 mb-4">
            <span className="text-zinc-600">Status: </span>{spec.status ?? "Spec"}
          </p>

          <p className="text-zinc-600 mb-1">Criterion:</p>
          <p className="text-zinc-200 mb-4 leading-relaxed">{spec.criterion}</p>

          {spec.constraints && spec.constraints.length > 0 && (
            <>
              <p className="text-zinc-600 mb-1">Constraints:</p>
              {spec.constraints.map((c, i) => (
                <p key={i} className="text-zinc-400 mb-0.5">- {c}</p>
              ))}
            </>
          )}

          <span className="inline-block w-0.5 h-[1em] bg-zinc-600 ml-0.5 -translate-y-[1px] align-middle animate-pulse mt-3" />
        </div>

      </div>
    </div>
  );
}
