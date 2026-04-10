import React from "react";
import { H2, P, Pullquote } from "../components/content/Typography";
import JiraTicketMock from "../components/mocks/JiraTicketMock";
import AgentSessionMock from "../components/mocks/AgentSessionMock";
import InteractiveHint from "../components/mocks/InteractiveHint";

export default function Module2Content() {
  return (
    <div>
      <P>
        Four of the five roles come straight from Scrum. The fifth — the Agent — is new, but
        it fits cleanly alongside the others. The bigger change isn&apos;t the org chart; it&apos;s what
        each role is now responsible for.
      </P>

      <H2>Product Owner</H2>
      <P>
        Same accountability as Scrum: owns the backlog, sets priorities, defines what gets
        built and why. The one addition is phase approval. Before Build begins on any phase,
        the PO signs off on the scope — not the implementation, but the &quot;what done looks like&quot;
        definition. A phase that starts without clear completion criteria is the PO&apos;s failure
        as much as the Developer&apos;s.
      </P>

      <H2>Scrum Master</H2>
      <P>
        Still the process guardian. In Agentic Agile they gain a concrete new ceremony: the
        Escalation Ceremony. When Reviews surface questions the Developer couldn&apos;t answer, those
        questions accumulate. The SM inspects them, judges the right resolution path, and
        assigns accordingly — Three Amigos, a domain expert, a PO decision, whatever fits.
        The SM doesn&apos;t resolve the questions themselves; they own the routing.
      </P>

      <H2>Developer</H2>
      <P>
        The role that changes most. The Developer is no longer primarily a code author — they&apos;re
        an execution director and an ownership enforcer. They decompose tickets into phases,
        direct the agent during Build, and — critically — must be able to explain everything
        that shipped before a phase closes. Velocity is no longer the measure. Ownership is.
      </P>
      <Pullquote>
        If the Developer can&apos;t explain it, the phase isn&apos;t done.
      </Pullquote>

      <H2>Stakeholder</H2>
      <P>
        Unchanged. Not in the day-to-day workflow, but present at sprint reviews. The
        difference is what sprint review now surfaces: agent-built output evaluated against
        a Spec File, with a record of every Review and every escalated question. Stakeholders
        get more visible signal on what was built and what gaps remain.
      </P>

      <H2>The Agent</H2>
      <P>
        A named collaborator with defined responsibilities. The Agent executes phases within
        the scope defined by the Developer. It leads Reviews — not the Developer. It asks the
        questions, surfaces the gaps, records the decisions. It flags divergences between
        completed work and the spec. It does not make scope decisions, and it does not close
        a Review without Developer sign-off.
      </P>
      <P>
        Treating the Agent as a collaborator rather than a tool changes what you expect from
        it. A tool executes. A collaborator is accountable for surfacing what it knows —
        including when the Developer doesn&apos;t understand what was just built.
      </P>

      <H2>In practice</H2>
      <P>
        Here&apos;s a ticket in progress — a question surfaced during a Review and escalated to
        the Scrum Master. The SM routes it in the Escalation Ceremony below.
      </P>

      <JiraTicketMock
        ticket={{ id: "PROJ-51", feature: { id: "FEAT-10", name: "User Account Security" }, title: "Email notification system", sprint: "Sprint 4", assignee: "@developer", summary: "Build transactional email notifications for user-facing events.", status: "in-progress", criteria: [
          "Transactional emails send successfully via configured SMTP credentials",
          "Welcome, password reset, and order confirmation templates render correctly",
          "Failed sends retry up to 3 times with exponential backoff; failures logged",
          "Users can unsubscribe via a one-click link; preference is persisted",
        ] }}
        comments={[
          { type: "escalation", body: "Should failed deliveries after max retries alert on-call or just log silently? — escalated to Scrum Master for routing." },
        ]}
      />

      <InteractiveHint hint="step through the ceremony" arrowAt={95}>
        <AgentSessionMock
          title="sprint-4"
          filename="PROJ-sprint4.md"
          panelTitle="Escalation Ceremony — Sprint 4"
          codeLines={[
            "# Sprint 4 — Unresolved Questions",
            "",
            "PROJ-42 P2  JWT rotation strategy on secret compromise",
            "PROJ-51 P3  Alert vs. silent log on max delivery retries",
            "PROJ-48 P1  Rate limiting scope: per-user or per-IP?",
          ]}
          messages={[
            { role: "agent", content: "3 unresolved questions from this sprint's Reviews. Starting with PROJ-42 Phase 2: 'What is the JWT rotation strategy if the secret is compromised?'" },
            { role: "user", content: "Security architecture question. Needs the security lead in the room. Assign Three Amigos — @developer, @security-lead, @po." },
            { role: "agent", content: "Assigned. Next: PROJ-51 Phase 3: 'Should failed deliveries after max retries alert on-call or just log silently?'" },
            { role: "user", content: "That's an ops decision. Assign to @ops-lead to decide and update the spec." },
            { role: "agent", content: "Assigned. Last: PROJ-48 Phase 1: 'Rate limiting scope — per-user or per-IP?'" },
            { role: "user", content: "Product decision. Escalate to @po with the tradeoffs — per-IP is simpler, per-user is more accurate for auth'd endpoints." },
            { role: "agent", content: "Escalated to PO with context. All 3 questions routed. Ceremony complete — I'll update the spec file with assignments." },
          ]}
        />
      </InteractiveHint>
    </div>
  );
}
