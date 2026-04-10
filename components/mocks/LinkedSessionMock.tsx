"use client";

import { useState, useCallback, useRef } from "react";
import JiraTicketMock, { TicketComment, TicketData } from "./JiraTicketMock";
import AgentSessionMock from "./AgentSessionMock";
import InteractiveHint from "./InteractiveHint";

interface TicketUpdate {
  afterStep: number;
  status?: TicketData["status"];
  comment?: TicketComment;
}

interface CodeStep {
  afterStep: number;
  lines: string[];
  added?: number[];
}

interface LinkedSessionMockProps {
  // Jira ticket
  ticket: TicketData;
  ticketUpdates?: TicketUpdate[];

  // Agent session
  sessionTitle: string;
  filename: string;
  codeLines: string[];
  codeSteps?: CodeStep[];
  messages: Array<{ role: "agent" | "user"; content: string }>;
  panelTitle?: string;

  hint?: string;
  hintArrowAt?: number;
}

export default function LinkedSessionMock({
  ticket,
  ticketUpdates = [],
  sessionTitle,
  filename,
  codeLines,
  codeSteps,
  messages,
  panelTitle,
  hint = "step through the session",
  hintArrowAt = 95,
}: LinkedSessionMockProps) {
  const [ticketStatus, setTicketStatus] = useState<TicketData["status"]>(ticket.status ?? "todo");
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleStep = useCallback((step: number) => {
    const updates = ticketUpdates.filter((u) => u.afterStep === step);
    if (updates.length === 0) return;

    const logEntries: string[] = [];

    for (const update of updates) {
      if (update.status) {
        setTicketStatus(update.status);
        const labels: Record<string, string> = {
          "todo": "To Do", "in-progress": "In Progress", "done": "Done",
        };
        logEntries.push(`${ticket.id}: → ${labels[update.status]}`);
      }
      if (update.comment) {
        setComments((prev) => [...prev, update.comment!]);
        const labels: Record<TicketComment["type"], string> = {
          "review-record": "review record added",
          "escalation": "question escalated",
          "decision": "decision recorded",
        };
        logEntries.push(`${ticket.id}: ${labels[update.comment.type]}`);
      }
    }

    if (logEntries.length > 0) {
      setLog((prev) => [...prev, ...logEntries]);
    }
  }, [ticketUpdates, ticket.id]);

  function scrollToTicket() {
    ticketRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="flex flex-col gap-4 my-8">
      <div ref={ticketRef}>
        <JiraTicketMock ticket={{ ...ticket, status: ticketStatus }} comments={comments} />
      </div>
      <InteractiveHint hint={hint} arrowAt={hintArrowAt}>
        <AgentSessionMock
          title={sessionTitle}
          filename={filename}
          codeLines={codeLines}
          codeSteps={codeSteps}
          messages={messages}
          panelTitle={panelTitle}
          onStep={handleStep}
        />
      </InteractiveHint>
      {log.length > 0 && (
        <div className="border border-zinc-800 bg-zinc-950">
          <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Activity</span>
            <button
              onClick={scrollToTicket}
              className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              ↑ scroll to ticket
            </button>
          </div>
          <ol className="flex flex-col">
            {log.map((entry, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-2.5 border-b border-zinc-900 last:border-0">
                <span className="font-mono text-xs text-zinc-700 shrink-0 pt-px">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-xs text-zinc-400">{entry}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
