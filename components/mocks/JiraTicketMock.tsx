"use client";

import React from "react";
import MockWindow from "./MockWindow";

export interface TicketComment {
  type: "review-record" | "escalation" | "decision";
  body: string;
}

export interface TicketData {
  id: string;
  feature?: { id: string; name: string };
  title: string;
  sprint: string;
  assignee: string;
  summary: string;
  criteria?: string[];
  status?: "todo" | "in-progress" | "done";
}

interface JiraTicketMockProps {
  ticket: TicketData;
  comments?: TicketComment[];
}

const COMMENT_CONFIG: Record<TicketComment["type"], { label: string; color: string; bg: string; dot: string }> = {
  "review-record": { label: "Review record", color: "#006644", bg: "#e3fcef", dot: "#00875a" },
  "escalation":    { label: "Escalation",    color: "#974f0c", bg: "#fff7d6", dot: "#f79009" },
  "decision":      { label: "Decision",      color: "#0052cc", bg: "#deebff", dot: "#0065ff" },
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  "todo":        { label: "To Do",       bg: "#f4f5f7", color: "#42526e", dot: "#97a0af" },
  "in-progress": { label: "In Progress", bg: "#deebff", color: "#0052cc", dot: "#0065ff" },
  "done":        { label: "Done",        bg: "#e3fcef", color: "#006644", dot: "#00875a" },
};

export default function JiraTicketMock({ ticket, comments = [] }: JiraTicketMockProps) {
  const url = `proj.internal/browse/${ticket.id}`;
  const statusKey = ticket.status ?? "todo";
  const status = STATUS_CONFIG[statusKey];

  return (
    <MockWindow title={`${ticket.id}: ${ticket.title} – PROJ`} app="browser" url={url}>
      <div className="flex" style={{ minHeight: "260px", backgroundColor: "#f4f5f7" }}>

        {/* Left sidebar */}
        <aside
          className="flex-shrink-0 flex flex-col"
          style={{ width: "44px", backgroundColor: "#2c3e50" }}
        >
          <div className="flex items-center justify-center h-10">
            <span className="text-white font-bold text-sm" style={{ opacity: 0.8 }}>P</span>
          </div>
          {["⊞", "◫", "☰", "◉"].map((icon, i) => (
            <div key={i} className="flex items-center justify-center h-9 text-white opacity-40 text-sm">
              {icon}
            </div>
          ))}
        </aside>

        {/* Project sidebar */}
        <aside
          className="hidden sm:flex flex-shrink-0 flex-col py-3 gap-1"
          style={{ width: "168px", backgroundColor: "#ffffff", borderRight: "1px solid #dfe1e6" }}
        >
          <div className="px-3 pb-2 flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: "#2c3e50" }}
            >
              P
            </span>
            <span className="text-xs font-semibold text-gray-700 truncate">PROJ</span>
          </div>
          <hr style={{ borderColor: "#dfe1e6" }} />
          {["Board", "Backlog", "Active sprint", "Releases", "Reports"].map((item, i) => (
            <div
              key={i}
              className={`px-3 py-1.5 text-xs cursor-default ${item === "Board" ? "font-semibold" : "text-gray-500"}`}
              style={item === "Board" ? { backgroundColor: "#eef0f3", color: "#2c3e50", borderRight: "2px solid #2c3e50" } : {}}
            >
              {item}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-white">
          {/* Breadcrumb */}
          <div className="px-6 pt-4 pb-1 flex items-center gap-1.5 text-xs flex-wrap" style={{ color: "#6b778c" }}>
            <span>Projects</span><span>/</span>
            <span>PROJ</span>
            {ticket.feature && (
              <>
                <span>/</span>
                <span className="font-medium" style={{ color: "#2c3e50" }}>{ticket.feature.id} — {ticket.feature.name}</span>
              </>
            )}
            <span>/</span>
            <span style={{ color: "#172b4d" }}>{ticket.id}</span>
          </div>

          <div className="px-6 py-3">
            <h1 className="text-lg font-semibold mb-3" style={{ color: "#172b4d" }}>
              {ticket.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: status.bg, color: status.color }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.dot }} />
                {status.label}
              </span>
              <span className="text-xs" style={{ color: "#6b778c" }}>{ticket.sprint}</span>
              <span className="text-xs" style={{ color: "#6b778c" }}>
                Assignee: <strong style={{ color: "#172b4d" }}>{ticket.assignee}</strong>
              </span>
            </div>

            <hr className="mb-4" style={{ borderColor: "#dfe1e6" }} />

            {/* Description */}
            <section className="mb-5">
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6b778c" }}>
                Description
              </h2>
              <p className="text-sm" style={{ color: "#172b4d" }}>{ticket.summary}</p>
            </section>

            {/* Acceptance criteria */}
            {ticket.criteria && ticket.criteria.length > 0 && (
              <section className="mb-5">
                <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6b778c" }}>
                  Acceptance criteria
                </h2>
                <ul className="flex flex-col gap-1.5">
                  {ticket.criteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#172b4d" }}>
                      <span className="flex-shrink-0 mt-0.5 text-xs" style={{ color: "#97a0af" }}>—</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Activity / comments */}
            {comments.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6b778c" }}>
                  Activity
                </h2>
                <div className="flex flex-col gap-2">
                  {comments.map((comment, i) => {
                    const cfg = COMMENT_CONFIG[comment.type];
                    return (
                      <div
                        key={i}
                        className="rounded border px-3 py-2.5 flex flex-col gap-1"
                        style={{ borderColor: "#dfe1e6", backgroundColor: "#fafbfc" }}
                      >
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-medium self-start px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                          {cfg.label}
                        </span>
                        <p className="text-sm" style={{ color: "#172b4d" }}>{comment.body}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
