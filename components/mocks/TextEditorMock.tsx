"use client";

import React, { useMemo } from "react";
import MockWindow from "./MockWindow";

interface TextEditorMockProps {
  title: string;
  filename: string;
  content: string;
  showLineNumbers?: boolean;
  showCursor?: boolean;
}

// Minimal markdown token types
type Token =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "hr" }
  | { type: "blockquote"; text: string }
  | { type: "list"; text: string }
  | { type: "table-row"; cells: string[]; isHeader: boolean }
  | { type: "blank" }
  | { type: "plain"; parts: InlinePart[] };

type InlinePart =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "code"; value: string }
  | { kind: "key"; value: string }; // **Key:** style label

function parseInline(raw: string): InlinePart[] {
  const parts: InlinePart[] = [];
  // Tokenise bold, italic, inline code
  const re = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) parts.push({ kind: "text", value: raw.slice(last, m.index) });
    const tok = m[0];
    if (tok.startsWith("`")) {
      parts.push({ kind: "code", value: tok.slice(1, -1) });
    } else if (tok.startsWith("**")) {
      const inner = tok.slice(2, -2);
      // Treat **Word:** as a label (key:value pattern common in spec files)
      parts.push(inner.endsWith(":") ? { kind: "key", value: inner } : { kind: "bold", value: inner });
    } else {
      parts.push({ kind: "italic", value: tok.slice(1, -1) });
    }
    last = m.index + tok.length;
  }
  if (last < raw.length) parts.push({ kind: "text", value: raw.slice(last) });
  return parts;
}

function parseLine(line: string, prevIsHeader: boolean): Token {
  if (/^#{3}\s/.test(line)) return { type: "h3", text: line.replace(/^###\s/, "") };
  if (/^#{2}\s/.test(line)) return { type: "h2", text: line.replace(/^##\s/, "") };
  if (/^#\s/.test(line)) return { type: "h1", text: line.replace(/^#\s/, "") };
  if (/^---+$/.test(line.trim())) return { type: "hr" };
  if (/^>\s/.test(line)) return { type: "blockquote", text: line.replace(/^>\s/, "") };
  if (/^[-*]\s/.test(line)) return { type: "list", text: line.replace(/^[-*]\s/, "") };
  if (/^\s*$/.test(line)) return { type: "blank" };
  // Table row
  if (line.startsWith("|")) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    // Separator row (|---|---|)
    if (cells.every((c) => /^:?-+:?$/.test(c))) return { type: "blank" };
    return { type: "table-row", cells, isHeader: prevIsHeader };
  }
  return { type: "plain", parts: parseInline(line) };
}

function tokenize(content: string): Token[] {
  const lines = content.split("\n");
  const tokens: Token[] = [];
  for (let i = 0; i < lines.length; i++) {
    const prev = tokens[tokens.length - 1];
    const prevIsTableHeader =
      prev?.type === "table-row" && (prev as { isHeader: boolean }).isHeader;
    tokens.push(parseLine(lines[i], prevIsTableHeader));
  }
  return tokens;
}

function InlineParts({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((p, i) => {
        if (p.kind === "code")
          return (
            <code
              key={i}
              className="font-mono text-[11px] px-1 py-0.5 rounded"
              style={{ backgroundColor: "#2d2d2d", color: "#ce9178" }}
            >
              {p.value}
            </code>
          );
        if (p.kind === "bold")
          return (
            <strong key={i} style={{ color: "#e8e8e8", fontWeight: 600 }}>
              {p.value}
            </strong>
          );
        if (p.kind === "italic")
          return (
            <em key={i} style={{ color: "#c0c0c0", fontStyle: "italic" }}>
              {p.value}
            </em>
          );
        if (p.kind === "key")
          return (
            <strong key={i} style={{ color: "#9cdcfe", fontWeight: 600 }}>
              {p.value}
            </strong>
          );
        return (
          <span key={i} style={{ color: "#cccccc" }}>
            {p.value}
          </span>
        );
      })}
    </>
  );
}

function RenderToken({ token }: { token: Token }) {
  switch (token.type) {
    case "h1":
      return (
        <p className="text-sm font-semibold leading-snug mb-0.5" style={{ color: "#e2e2e2" }}>
          {token.text}
        </p>
      );
    case "h2":
      return (
        <p className="text-xs font-semibold leading-snug mb-0.5" style={{ color: "#d4d4d4" }}>
          {token.text}
        </p>
      );
    case "h3":
      return (
        <p className="text-xs font-medium leading-snug mb-0.5" style={{ color: "#c8c8c8" }}>
          {token.text}
        </p>
      );
    case "hr":
      return <hr className="my-2 border-none h-px" style={{ backgroundColor: "#3a3a3a" }} />;
    case "blockquote":
      return (
        <p
          className="text-xs leading-relaxed pl-3 my-0.5 border-l-2"
          style={{ color: "#a0a0a0", borderColor: "#555" }}
        >
          {token.text}
        </p>
      );
    case "list":
      return (
        <p className="text-xs leading-relaxed" style={{ color: "#cccccc" }}>
          <span style={{ color: "#7986cb" }} className="mr-1.5 select-none">
            –
          </span>
          <InlineParts parts={parseInline(token.text)} />
        </p>
      );
    case "table-row":
      return (
        <div className="flex gap-0 text-xs font-mono leading-relaxed">
          {token.cells.map((cell, i) => (
            <span
              key={i}
              className="flex-1 pr-3 py-0.5"
              style={{ color: token.isHeader ? "#9cdcfe" : "#cccccc" }}
            >
              {cell}
            </span>
          ))}
        </div>
      );
    case "blank":
      return <div className="h-2" />;
    case "plain":
      return (
        <p className="text-xs leading-relaxed" style={{ color: "#cccccc" }}>
          <InlineParts parts={token.parts} />
        </p>
      );
  }
}

export default function TextEditorMock({
  title,
  filename,
  content,
  showLineNumbers = false,
  showCursor = false,
}: TextEditorMockProps) {
  const tokens = useMemo(() => tokenize(content), [content]);
  const lines = content.split("\n");
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <MockWindow title={title} app="editor">
      <div className="flex flex-col" style={{ height: "420px" }}>
        {/* Tab bar */}
        <div
          className="flex items-center flex-shrink-0 px-2 gap-1"
          style={{ backgroundColor: "#252526", borderBottom: "1px solid #3a3a3a", height: "34px" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-t"
            style={{ backgroundColor: "#1c1c1e", color: "#d4d4d4", borderBottom: "1px solid #1c1c1e" }}
          >
            <span style={{ color: "#a8c4e0" }}>✦</span>
            {filename}
          </div>
        </div>

        {/* Editor body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Line numbers */}
          {showLineNumbers && (
            <aside
              className="flex-shrink-0 py-4 pr-3 pl-3 select-none text-right text-xs font-mono leading-relaxed"
              style={{ backgroundColor: "#1c1c1e", color: "#4a4a4a", borderRight: "1px solid #2a2a2a", minWidth: "2.5rem" }}
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </aside>
          )}

          {/* Content */}
          <div
            className="flex-1 overflow-auto py-5 px-8"
            style={{ backgroundColor: "#1c1c1e" }}
          >
            <div className="max-w-prose mx-auto">
              {tokens.map((token, i) => {
                const isLast = i === tokens.length - 1;
                return (
                  <div key={i} className="relative">
                    <RenderToken token={token} />
                    {isLast && showCursor && (
                      <span
                        className="inline-block w-0.5 h-[1em] ml-0.5 -translate-y-[1px] align-middle animate-pulse"
                        style={{ backgroundColor: "#7986cb" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <footer
          className="flex-shrink-0 flex items-center justify-between px-4 text-xs font-mono"
          style={{ backgroundColor: "#007acc", height: "22px", color: "#ffffff" }}
        >
          <span className="opacity-90">{filename}</span>
          <div className="flex items-center gap-4 opacity-80">
            <span>{wordCount} words</span>
            <span>Markdown</span>
            <span>UTF-8</span>
          </div>
        </footer>
      </div>
    </MockWindow>
  );
}
