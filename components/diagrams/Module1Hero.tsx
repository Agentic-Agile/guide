export default function Module1Hero() {
  const sx = 130;        // track start x
  const agentX = 290;    // agent track end (short — fast execution)
  const processX = 620;  // process track end (long — sprint pace)
  const agentY = 58;
  const processY = 112;
  const tH = 28;

  // Gap bracket sits below both tracks
  const bracketY = 152;
  const tickH = 8;

  const problems = [
    { x: 355, label: "Ownership erodes" },
    { x: 460, label: "Artifacts become noise" },
    { x: 565, label: "Planning breaks down" },
  ];

  const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

  return (
    <figure className="my-8">
      <div className="border border-zinc-800 overflow-hidden bg-[#0d0d0d]">
        <svg viewBox="0 0 700 215" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="215" fill="#0d0d0d" />

          {/* Track labels */}
          <text x="16" y={agentY + 5} fontFamily={mono} fontSize="9.5" fill="#4b4b55" letterSpacing="2">
            EXECUTION
          </text>
          <text x="16" y={processY + 5} fontFamily={mono} fontSize="9.5" fill="#4b4b55" letterSpacing="2">
            PROCESS
          </text>

          {/* Agent track */}
          <rect x={sx} y={agentY - tH / 2} width={agentX - sx} height={tH} fill="#141414" stroke="#2a2a2a" strokeWidth="1" />
          <text x={sx + 14} y={agentY + 5} fontFamily={mono} fontSize="13" fill="#d4d4d8">Agent execution</text>
          <text x={agentX + 10} y={agentY + 5} fontFamily={mono} fontSize="11" fill="#4ade80">✓</text>
          <text x={agentX + 23} y={agentY + 5} fontFamily={mono} fontSize="10.5" fill="#4ade80">minutes</text>

          {/* Process track */}
          <rect x={sx} y={processY - tH / 2} width={processX - sx} height={tH} fill="#141414" stroke="#2a2a2a" strokeWidth="1" />
          <text x={sx + 14} y={processY + 5} fontFamily={mono} fontSize="13" fill="#52525b">Sprint ceremonies</text>
          <text x={processX + 10} y={processY + 5} fontFamily={mono} fontSize="10.5" fill="#3f3f46">14 days</text>

          {/* Vertical connector from agent end down to bracket */}
          <line
            x1={agentX} y1={agentY + tH / 2}
            x2={agentX} y2={bracketY}
            stroke="#78350f" strokeWidth="0.75" strokeDasharray="3,2"
          />

          {/* Gap bracket — horizontal span from agent end to process end */}
          {/* Left tick */}
          <line x1={agentX} y1={bracketY - tickH / 2} x2={agentX} y2={bracketY + tickH / 2} stroke="#78350f" strokeWidth="1.5" />
          {/* Bracket line */}
          <line x1={agentX} y1={bracketY} x2={processX} y2={bracketY} stroke="#78350f" strokeWidth="0.75" />
          {/* Right tick */}
          <line x1={processX} y1={bracketY - tickH / 2} x2={processX} y2={bracketY + tickH / 2} stroke="#78350f" strokeWidth="1.5" />
          {/* THE GAP label */}
          <text
            x={(agentX + processX) / 2}
            y={bracketY - 6}
            textAnchor="middle"
            fontFamily={mono}
            fontSize="10"
            fill="#92400e"
            letterSpacing="2"
          >
            THE GAP
          </text>

          {/* Problem annotations */}
          {problems.map(({ x, label }) => (
            <g key={label}>
              <line
                x1={x} y1={bracketY + tickH / 2}
                x2={x} y2={182}
                stroke="#2a2a2a" strokeWidth="0.75" strokeDasharray="3,2"
              />
              <text
                x={x} y={196}
                textAnchor="middle"
                fontFamily={mono}
                fontSize="8.5"
                fill="#52525b"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">
        Why traditional Agile breaks with agents
      </figcaption>
    </figure>
  );
}
