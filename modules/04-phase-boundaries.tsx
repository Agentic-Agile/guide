import React from "react";
import { H2, H3, P, Pullquote, Table } from "../components/content/Typography";
import JiraTicketMock from "../components/mocks/JiraTicketMock";

export default function Module4Content() {
  return (
    <div>
      <P>
        A phase isn&apos;t a new idea. Any competent developer working through a complex ticket
        already does this mentally — they break it into pieces, get one piece working, then
        move to the next. The difference is that with a human developer, that decomposition
        can stay informal. It lives in their head, or in a quick Slack message, or in the
        way they structure their commits. The person doing the work is also the person
        holding the context, so it doesn&apos;t need to be written down.
      </P>
      <P>
        With an agent, the informality breaks. The agent doesn&apos;t hold context between
        sessions, doesn&apos;t infer intent from the surrounding situation, and doesn&apos;t catch
        its own scope drift. The mental decomposition that an experienced developer does
        naturally has to become explicit — written down, with a testable endpoint, before
        the session opens. That&apos;s what a phase is. The same instinct, made legible.
      </P>

      <H2>Ticket sizing comes first</H2>
      <P>
        This was true before agents. Agile always worked better with small, well-scoped
        tickets — the kind where the developer could start without three clarifying
        conversations and finish without three scope changes. Teams that wrote good tickets
        had better sprints. Teams that let tickets grow vague and large had bad ones.
      </P>
      <P>
        With agents, the same principle applies with less tolerance for sloppiness. A
        vague ticket handed to a human developer results in a conversation. The same ticket
        handed to an agent results in the agent guessing — and then building confidently on
        those guesses for the rest of the session. By the time you look at the output, the
        drift has already happened.
      </P>
      <Pullquote>
        Every ambiguity in a ticket is a decision the agent makes on your behalf.
      </Pullquote>
      <P>
        The right size for a ticket is whatever a developer and agent can complete in one
        session with a clear, verifiable outcome. If a ticket is too large for that, it gets
        broken into smaller tickets at refinement — not decomposed informally into phases
        during the session. The decomposition happens before the work starts, not inside it.
      </P>

      <H2>Phases within a session</H2>
      <P>
        A single session can include multiple phases. A developer and agent might work
        through three distinct checkpoints in one sitting — building something, reviewing it,
        building the next thing, reviewing that. Each checkpoint closes a segment of work and
        opens a new one. The ticket moves forward continuously.
      </P>
      <P>
        What phases are not is a pre-planned breakdown that lives in the ticket system.
        They&apos;re the natural rhythm of the session: build to a verifiable point, pause and
        review, continue. The checkpoint is what defines the phase boundary — and knowing
        when to call one is a judgment call, not a rule.
      </P>

      <H2>When to call a checkpoint</H2>
      <Table
        headers={["Signal", "What it means"]}
        rows={[
          ["You can write one sentence that says the work is done", "Good place for a checkpoint. The criterion is clear enough to verify."],
          ["The next step is meaningfully different from the last", "Natural boundary. The Review closes one concern before a different one opens."],
          ["Something unexpected surfaced during Build", "Stop and review before continuing. The agent should not absorb the surprise silently."],
          ["The agent is about to touch something high-risk", "Call a checkpoint first. Review what was built so far before the stakes rise."],
          ["You can't explain what was just built", "The checkpoint is overdue. Stop now rather than continuing without understanding."],
        ]}
      />
      <P>
        The wrong time to call a checkpoint is on a rigid schedule regardless of what just
        happened. The right time is when there&apos;s something worth verifying — when the
        question &quot;do I understand this?&quot; has a meaningful answer.
      </P>

      <H2>Where scope decisions belong</H2>
      <P>
        The agent session is not where scope decisions happen. If something unexpected
        comes up during Build — a dependency you didn&apos;t account for, a requirement that
        turns out to be more complex — that&apos;s a conversation with the Spec Owner, not a
        prompt to the agent. The scope holds. New work goes into the ticket system as a
        new ticket or a refinement conversation.
      </P>
      <P>
        The temptation is to just ask the agent to handle it while you&apos;re already in the
        session. Resist. Every time you expand scope mid-session, you&apos;re creating work with
        no criterion, no Review, and no record. Exactly the kind of invisible work the
        methodology exists to prevent.
      </P>

      <H2>In practice</H2>
      <P>
        Here&apos;s a ticket in progress. Two checkpoints have run — the first closed cleanly,
        the second surfaced a question that needed escalating.
      </P>

      <JiraTicketMock
        ticket={{
          id: "PROJ-67",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Add structured logging to API layer",
          sprint: "Sprint 5",
          assignee: "@developer",
          summary: "Replace ad-hoc console.log calls with structured JSON logging across all API routes.",
          status: "in-progress",
          criteria: [
            "All console.log calls replaced with structured pino logger",
            "Every request logs method, path, status code, and duration as JSON",
            "Unhandled errors log stack trace and request ID; no sensitive fields",
            "Each request carries a UUID that propagates through all log lines",
          ],
        }}
        comments={[
          { type: "review-record", body: "Logger configured; console.log calls removed from all route handlers." },
          { type: "escalation", body: "Should request bodies be logged? Could contain PII depending on the endpoint — escalated to Product Owner." },
        ]}
      />

      <H3>What to notice</H3>
      <P>
        The first checkpoint closed cleanly — the developer could explain everything. The
        second surfaced a real policy question the developer couldn&apos;t answer alone. The work
        continued; the question is in the Escalation queue. It didn&apos;t block and it didn&apos;t
        disappear. Both outcomes are visible directly on the ticket.
      </P>
      <P>
        Keeping the scope small enough to call a checkpoint is what made the question
        surfaceable. A single &quot;add logging&quot; session would have buried it — or forced the
        agent to guess.
      </P>
    </div>
  );
}
