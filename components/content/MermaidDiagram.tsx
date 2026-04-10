"use client";

import { useEffect, useState } from "react";
import type Mermaid from "mermaid";

let mermaidModule: typeof Mermaid | null = null;
let initialised = false;

async function getMermaid() {
  if (!mermaidModule) {
    mermaidModule = (await import("mermaid")).default;
  }
  if (!initialised) {
    mermaidModule.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        background: "#0d0d0d",
        primaryColor: "#18181b",
        primaryBorderColor: "#3f3f46",
        primaryTextColor: "#d4d4d8",
        secondaryColor: "#1c1917",
        tertiaryColor: "#111",
        lineColor: "#52525b",
        textColor: "#a1a1aa",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "13px",
        edgeLabelBackground: "#0d0d0d",
        clusterBkg: "#111",
        clusterBorder: "#3f3f46",
        titleColor: "#e4e4e7",
        nodeBorder: "#3f3f46",
        mainBkg: "#18181b",
        labelBackground: "#18181b",
        attributeBackgroundColorEven: "#18181b",
        attributeBackgroundColorOdd: "#1c1c1c",
      },
    });
    initialised = true;
  }
  return mermaidModule;
}

let idCounter = 0;

export default function MermaidDiagram({ code, caption }: { code: string; caption?: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${++idCounter}`;
    (async () => {
      try {
        const m = await getMermaid();
        const { svg } = await m.render(id, code);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <div className="my-8 border border-zinc-800 p-4 font-mono text-xs text-red-400">
        Diagram error: {error}
      </div>
    );
  }

  return (
    <figure className="my-8">
      {svg ? (
        <div
          className="border border-zinc-800 bg-[#0d0d0d] p-6 overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full [&_.label]:font-mono [&_text]:font-mono"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="border border-zinc-800 bg-[#0d0d0d] h-24 flex items-center justify-center font-mono text-xs text-zinc-600">
          loading diagram…
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
