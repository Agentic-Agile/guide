"use client";
import { ReactNode } from "react";

export default function InteractiveHint({
  hint,
  children,
  arrowAt = 50,
}: {
  hint: string;
  children: ReactNode;
  /** Percentage from top of the component where the arrow points */
  arrowAt?: number;
}) {
  return (
    <aside className="relative my-8">
      {/* Floating hint — right margin, visible on screens wider than the content column */}
      <div
        className="absolute left-full z-10 pl-3 hidden lg:flex items-center pointer-events-none select-none"
        style={{ top: `${arrowAt}%`, transform: "translateY(-50%)" }}
      >
        {/* Left-pointing arrowhead */}
        <div
          className="shrink-0 w-0 h-0"
          style={{
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderRight: "5px solid #52525b",
          }}
        />
        {/* Connector line */}
        <div className="w-5 shrink-0" style={{ height: "1px", background: "#3f3f46" }} />
        {/* Hint box */}
        <div
          className="border border-dashed border-zinc-600 px-2.5 py-1.5 font-mono text-[10px] text-zinc-500 whitespace-nowrap"
          style={{ background: "#0a0a0a" }}
        >
          {hint}
        </div>
      </div>
      {children}
    </aside>
  );
}
