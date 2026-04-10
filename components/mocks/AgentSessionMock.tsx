"use client";

import React, { useState, useEffect, useRef } from "react";
import MockWindow from "./MockWindow";

interface Message {
  role: "agent" | "user";
  content: string;
}

interface CodeStep {
  afterStep: number;
  lines: string[];
  added?: number[]; // line indices to highlight as new/changed
}

interface AgentSessionMockProps {
  title: string;
  filename: string;
  codeLines: string[];
  codeSteps?: CodeStep[];
  messages: Message[];
  panelTitle?: string;
  onStep?: (step: number) => void;
}

const TYPING_SPEED_MS = 8;

export default function AgentSessionMock({
  title,
  filename,
  codeLines,
  codeSteps,
  messages,
  panelTitle,
  onStep,
}: AgentSessionMockProps) {
  const [step, setStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [codeFlash, setCodeFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatScrollRef = useRef<HTMLElement>(null);

  // Find the most recent code step that applies at the current step
  const activeCodeStep = codeSteps
    ? [...codeSteps].reverse().find((cs) => cs.afterStep <= step) ?? null
    : null;
  const activeLines = activeCodeStep?.lines ?? codeLines;
  const addedLines = new Set(activeCodeStep?.added ?? []);

  const currentMessage = step > 0 ? messages[step - 1] : null;
  const nextMessage = messages[step] as Message | undefined;
  const isTyping = !!currentMessage && currentMessage.role === "agent" && typedChars < currentMessage.content.length;
  const visibleMessages = messages.slice(0, step);
  const allShown = step >= messages.length;
  const nextIsUser = !allShown && nextMessage?.role === "user";

  // Flash the code panel when the active code step changes
  const prevCodeStepRef = useRef<CodeStep | null>(null);
  useEffect(() => {
    if (activeCodeStep && activeCodeStep !== prevCodeStepRef.current) {
      prevCodeStepRef.current = activeCodeStep;
      setCodeFlash(true);
      const t = setTimeout(() => setCodeFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [activeCodeStep]);

  useEffect(() => {
    if (step === 0) return;
    setTypedChars(0);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= messages[step - 1].content.length) {
        clearInterval(timerRef.current!);
      }
    }, TYPING_SPEED_MS);
    return () => clearInterval(timerRef.current!);
  }, [step]);

  useEffect(() => {
    if (step === 0 || !chatScrollRef.current) return;
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [step, typedChars]);

  // After a user message is submitted, auto-advance to start the agent response
  useEffect(() => {
    if (!currentMessage || currentMessage.role !== "user" || step >= messages.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 500);
    return () => clearTimeout(t);
  }, [step]);

  // Notify parent when step changes
  useEffect(() => {
    onStep?.(step);
  }, [step]);

  return (
    <MockWindow title={title} app="vscode">
      <div className="flex" style={{ height: "clamp(340px, 50vw, 420px)" }}>
        {/* File explorer sidebar — hidden on mobile */}
        <aside
          className="hidden sm:flex flex-shrink-0 flex-col gap-2 px-2 py-3"
          style={{
            width: "110px",
            backgroundColor: "#252526",
            borderRight: "1px solid #454545",
          }}
        >
          <span className="text-zinc-500 text-xs uppercase tracking-widest font-mono px-1">
            Explorer
          </span>
          <div
            className="flex items-center gap-1.5 px-1 py-0.5 rounded text-xs font-mono"
            style={{ backgroundColor: "#094771", color: "#cccccc" }}
          >
            <span className="text-zinc-400">📄</span>
            <span className="truncate">{filename}</span>
          </div>
        </aside>

        {/* Right pane: code + chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code area (~35%) */}
          <div
            className="overflow-auto px-4 py-3 transition-colors duration-300"
            style={{
              flex: "0 0 35%",
              backgroundColor: codeFlash ? "#1a2a1a" : "#1e1e1e",
              borderBottom: "1px solid #454545",
            }}
          >
            <pre className="w-full">
              <code>
                {activeLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex transition-colors duration-300"
                    style={addedLines.has(i) ? { backgroundColor: "rgba(0,200,80,0.08)" } : {}}
                  >
                    <span
                      className="text-right pr-4 select-none text-xs font-mono align-top flex-shrink-0"
                      style={{ color: addedLines.has(i) ? "#4a7" : "#555", minWidth: "2rem" }}
                    >
                      {addedLines.has(i) ? "+" : i + 1}
                    </span>
                    <span
                      className="text-xs font-mono whitespace-pre align-top"
                      style={{ color: addedLines.has(i) ? "#8ec89a" : "#9cdcfe" }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Chat panel (~65%) */}
          <div
            className="flex flex-col overflow-hidden"
            style={{ flex: "1 1 65%", backgroundColor: "#1e1e1e" }}
          >
            {/* Panel header */}
            <div
              className="flex-shrink-0 px-4 py-2"
              style={{ backgroundColor: "#252526", borderBottom: "1px solid #454545" }}
            >
              <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
                {panelTitle ?? "Agent Review"}
              </span>
            </div>

            {/* Messages */}
            <section ref={chatScrollRef} className="flex-1 overflow-auto px-4 py-3">
              <ol className="flex flex-col gap-3">
                {visibleMessages.map((msg, i) => {
                  const isLatest = i === step - 1;
                  const displayText = isLatest
                    ? msg.content.slice(0, typedChars)
                    : msg.content;
                  return (
                    <li key={i} className="flex flex-col gap-0.5">
                      <span
                        className={`text-xs font-mono uppercase tracking-widest ${
                          msg.role === "agent" ? "text-zinc-500" : "text-zinc-400"
                        }`}
                      >
                        {msg.role === "agent" ? "agent" : "you"}
                      </span>
                      <span className="text-zinc-300 text-xs font-mono leading-relaxed">
                        {displayText}
                        {isLatest && isTyping && (
                          <span className="inline-block w-1.5 h-3 bg-zinc-500 ml-0.5 animate-pulse align-middle" />
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Input / continue area */}
            <div
              className="flex-shrink-0 flex flex-col gap-2 px-4 py-2"
              style={{ borderTop: "1px solid #454545" }}
            >
              {nextIsUser && !isTyping && (
                <div
                  className="text-xs font-mono px-3 py-2 rounded text-zinc-400"
                  style={{ backgroundColor: "#2d2d2d", border: "1px solid #454545" }}
                >
                  {nextMessage!.content}
                  <span className="inline-block w-0.5 h-[1em] bg-zinc-600 ml-0.5 -translate-y-[1px] align-middle animate-pulse" />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                    allShown || isTyping
                      ? "text-zinc-600 cursor-default"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-700 cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: allShown ? "transparent" : "#2d2d2d",
                    border: "1px solid #454545",
                  }}
                  onClick={() => !allShown && !isTyping && setStep((s) => s + 1)}
                  disabled={allShown || isTyping}
                >
                  {allShown ? "Done" : nextIsUser ? "Send ↵" : "Continue →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
