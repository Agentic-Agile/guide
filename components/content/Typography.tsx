import React from "react";

// --- Rulebook voice components (Module 0) ---

export const Rule = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <aside role="note" className="border-l-2 border-zinc-500 pl-4 my-4">
    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Rule {n}</span>
    <p className="text-zinc-200 mt-1">{children}</p>
  </aside>
);

export const RH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white mt-10 mb-3">{children}</h2>
);

export const RP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-300 leading-relaxed mb-4">{children}</p>
);

// --- Module voice components (Modules 1+) ---

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-semibold text-white mt-12 mb-4">{children}</h2>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-zinc-200 mt-8 mb-3">{children}</h3>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-300 leading-relaxed mb-5 text-base sm:text-[1.05rem]">{children}</p>
);

export const Pullquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-2 border-zinc-400 pl-5 my-8 text-zinc-200 text-lg leading-relaxed italic">
    {children}
  </blockquote>
);

// --- Shared components ---

export const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <figure className="overflow-x-auto my-6">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="text-left text-zinc-400 font-mono text-xs uppercase tracking-widest pb-2 pr-8 border-b border-zinc-700">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-zinc-900">
            {row.map((cell, j) => (
              <td key={j} className="py-3 pr-8 text-zinc-300 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </figure>
);

export const Loop = () => (
  <figure className="flex items-center gap-3 my-8 flex-wrap">
    {["Spec", "Build", "Review"].map((step, i, arr) => (
      <React.Fragment key={step}>
        <div className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded text-zinc-200 font-mono text-sm">
          {step}
        </div>
        {i < arr.length - 1 && <span className="text-zinc-500">→</span>}
      </React.Fragment>
    ))}
  </figure>
);
