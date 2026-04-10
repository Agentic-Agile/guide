import React from "react";
import { H2, H3, P, Pullquote, Table } from "../components/content/Typography";
import Module1Hero from "../components/diagrams/Module1Hero";
import MermaidDiagram from "../components/content/MermaidDiagram";
import LinkedSessionMock from "../components/mocks/LinkedSessionMock";
import HandoffMock from "../components/mocks/HandoffMock";
import TextEditorMock from "../components/mocks/TextEditorMock";

export default function Module1Content() {
  return (
    <div>
      <Module1Hero />
      <P>
        A developer asks an agent to implement a feature. Working code ships the same
        afternoon. Six weeks later, nobody on the team can explain why it works the way it
        does — including the developer who shipped it. The agent did exactly what it was
        asked. The process had no point where understanding was required before moving on.
      </P>
      <P>
        That&apos;s not a tool problem. It&apos;s a process one. And it compounds.
      </P>

      <H2>Three things break</H2>

      <H3>Comprehension doesn&apos;t keep up with output</H3>
      <P>
        One feature shipped without full understanding is manageable. The pattern becomes a
        problem — the codebase grows, the number of people who can confidently touch any
        given part of it shrinks, and the cost of change rises while the metrics say
        everything is going well.
      </P>
      <Pullquote>
        Velocity went up. Comprehension didn&apos;t. Nothing in the process caught that.
      </Pullquote>
      <P>
        This is the core accountability gap. Agentic Agile closes it with a structured Review
        at the end of every unit of work — questions the agent asks the developer about what
        was just built. Not optional. Not a quiz. A checkpoint that can&apos;t be skipped.
      </P>

      <P>
        It doesn&apos;t appear in velocity charts. It appears in post-mortems, in estimates that
        keep coming in higher than expected, and in the conversations about why a
        &quot;simple&quot; change took three weeks.
      </P>

      <H3>The process is running on a broken assumption</H3>
      <P>
        Standard Agile was built around one thing: the person who writes the code understands
        the code. The ceremonies — planning, review, retrospective — all assume that. They
        were designed to coordinate humans who had that understanding.
      </P>
      <P>
        When an agent writes the code, that assumption is gone. The ceremonies still run.
        The tickets still move. But the accountability the process was designed to produce
        isn&apos;t there — because nobody changed what &quot;done&quot; means when AI is doing the execution.
      </P>

      <H2>Where each ceremony breaks</H2>
      <P>
        Every Agile ceremony was designed around one assumption: the people building the
        thing understand it. AI breaks that assumption silently. The ceremonies still run,
        the tickets still move — but the accountability they were designed to produce is no
        longer guaranteed.
      </P>
      <P>Here&apos;s where it shows up in practice.</P>

      <div className="grid grid-cols-1 gap-4 my-8">
        {[
          {
            label: "Sprint planning",
            body: "Story points measured effort. With an agent, effort collapses — a three-point story takes twenty minutes. Planning poker becomes a conversation about comprehension, not build time, but nobody has changed the format to reflect that. Teams over-commit because the work looks small. The sprint fills with phases that need careful human oversight at every step, and nobody planned for that oversight.",
          },
          {
            label: "Backlog refinement",
            body: "Tickets written for humans don't work for agents. \"Add pagination\" is fine for a developer who infers defaults and conventions. An agent will make different assumptions each time. Refinement still produces a Jira ticket — not an agent-ready phase definition. The gap between the two is nobody's job to close.",
          },
          {
            label: "Daily standup",
            body: "\"What did you do?\" has no good answer when the agent did most of it. Blockers have changed character — context window limits, scope drift, checkpoint gaps — but the standup format has no vocabulary for them. If the agent ran overnight and completed three phases, the morning standup is describing history, not coordinating work.",
          },
          {
            label: "Sprint review",
            body: "The demo shows working software. What it doesn't show is whether the developer understands what was built. An agent can produce correct code that nobody on the team can explain. The review passes. The knowledge gap doesn't surface until something breaks six weeks later. Velocity numbers spike, stakeholders raise expectations, and the team is now committed to a pace that depends on AI working perfectly — which it won't.",
          },
          {
            label: "Sprint retrospective",
            body: "Retrospectives are human-driven and remain unchanged. The team reflects on what happened, what worked, and what to improve — none of that changes with AI doing the execution. The retro is one ceremony Agentic Agile leaves alone.",
          },
          {
            label: "Code review",
            body: "Traditional code review looks for errors in the diff — logic mistakes, edge cases the author missed. AI-generated code rarely has those. The real failure modes are spec divergence and comprehension gaps, neither of which is visible in a diff. Agentic Agile addresses those directly: the spec is set before Build, and the Review verifies understanding before the phase closes. Line-by-line review of AI output is looking in the wrong place.",
          },
          {
            label: "Definition of done",
            body: "The DoD was written for humans. \"Code reviewed,\" \"tests written,\" \"deployed to staging\" — none of these criteria address AI-specific failure modes. There's no criterion for \"the developer can explain what was built and why.\" That was assumed to be automatic when humans wrote the code. It isn't when an agent did.",
          },
        ].map(({ label, body }) => (
          <div key={label} className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">{label}</p>
            <p className="text-zinc-300 leading-relaxed text-[1.05rem]">{body}</p>
          </div>
        ))}
      </div>

      <Table
        headers={["Ceremony", "What it was solving for", "What breaks with AI"]}
        rows={[
          ["Sprint planning", "Estimating human effort", "Effort collapses; comprehension cost is invisible"],
          ["Backlog refinement", "Tickets clear enough for a developer", "Tickets not precise enough for an agent"],
          ["Daily standup", "Coordinating human work in progress", "No vocabulary for AI-specific blockers"],
          ["Sprint review", "Demonstrating working software", "Working software ≠ understood software"],
          ["Retrospective", "Learning from what happened", "Unchanged — human-driven, no Agentic Agile modifications"],
          ["Code review", "Catching errors before merge", "AI code is rarely wrong line-by-line; the real risks are spec divergence and context gaps — addressed by the spec and Review before merge"],
          ["Definition of done", "Shared quality bar", "No criterion for ownership or understanding"],
        ]}
      />

      <H2>Patching doesn&apos;t work</H2>
      <P>
        The instinct is to bolt AI onto the existing process. Let developers use the tools
        during sprints. Add an AI review step to the PR checklist. Keep everything else the same.
      </P>
      <P>
        This fails because the existing process was built around a constraint that no longer
        exists — humans as the execution bottleneck. Every ceremony assumes that. Remove the
        constraint and the ceremonies are solving for the wrong problem.
      </P>
      <P>
        The bottleneck now is understanding and scope discipline: ensuring the work was
        built to spec, and that the people who shipped it can explain what they built. No
        standard Agile ceremony is designed to enforce either of those things.
      </P>

      <H2>What you&apos;re actually doing</H2>
      <MermaidDiagram
        caption="The phase loop — spec defines it, build executes it, review closes it"
        code={`flowchart LR
    SF["Spec File\nentry"] --> B["Build"]
    B --> R["Review"]
    R -.->|next phase| SF`}
      />
      <P>
        You decompose a ticket into phases — each one small enough that you can specify the
        outcome before the agent starts and verify it afterwards. That&apos;s the entire mechanism.
        The agent builds within those boundaries. Then it stops and leads a Review: questions
        about what was just built, surfacing anything you can&apos;t explain. Gaps get logged. Work
        doesn&apos;t block.
      </P>
      <P>
        This works regardless of what&apos;s underneath. A 200,000-line legacy codebase doesn&apos;t
        change what a phase is — it changes how carefully you scope one. The checkpoints exist
        precisely because the agent can confidently produce something plausible that breaks
        things you didn&apos;t know were coupled.
      </P>
      <H3>The spec entry</H3>
      <P>
        The team has an objective: users need to be able to log in. That becomes a ticket —
        PROJ-42, broken into three phases. Phase 1 gets a spec entry before any Build
        begins: scope narrowed to one testable outcome, Product Owner approved.
      </P>
      <P>
        Phase 1 gets a spec entry before Build begins. The scope is narrowed from the
        ticket&apos;s full intent to one testable outcome. The Product Owner approves it.
        The agent doesn&apos;t start until this exists.
      </P>

      <HandoffMock
        ticket={{
          id: "PROJ-42",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Add user authentication",
          summary: "Users need to be able to log in. Implement the full authentication flow.",
          criteria: [
            "POST /auth/login returns a signed JWT on valid credentials",
            "Returns 401 on invalid credentials",
            "Token payload contains user ID only — no email or sensitive fields",
          ],
        }}
        spec={{
          heading: "Phase 1: POST /auth/login endpoint",
          ticket: "PROJ-42",
          criterion: "POST /auth/login returns a signed JWT on valid credentials and 401 on invalid.",
          constraints: [
            "Token payload: user ID only — no email or sensitive fields",
            "JWT_SECRET from environment — do not hardcode",
            "Route handler lives in src/routes/auth.ts",
          ],
          status: "Spec",
        }}
      />

      <H3>The command</H3>
      <P>
        The Developer writes the Command — the file that tells the agent its role, its
        scope, and where to stop. If the Command is hard to write, the spec entry needs
        more work.
      </P>

      <TextEditorMock
        title=".agent/commands/build-phase.md"
        filename="build-phase.md"
        content={`# Build Command — PROJ-42 Phase 1

You are a developer on this team. Your job is to build Phase 1 of PROJ-42.

Phase:  POST /auth/login endpoint
Spec:   SPEC.md § Phase 1
Ticket: PROJ-42

Criterion:
POST /auth/login returns a signed JWT on valid credentials and 401 on invalid.

Constraints:
- Token payload: user ID only — no email or sensitive fields
- JWT_SECRET from environment — do not hardcode
- Route handler lives in src/routes/auth.ts

When the criterion is met:
1. Update SPEC.md Phase 1 status to 'In Review'
2. Stop. Do not begin Phase 2.
3. Lead the Review.`}
      />

      <H3>The session</H3>
      <P>
        The Command runs. The agent builds within the defined scope, then leads the
        Review. Watch the spec file and ticket update as the phase progresses.
      </P>

      <LinkedSessionMock
        ticket={{
          id: "PROJ-42",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Add user authentication",
          sprint: "Sprint 3",
          assignee: "@developer",
          summary: "Users need to be able to log in. Implement the full authentication flow.",
          status: "in-progress",
          criteria: [
            "POST /auth/login returns a signed JWT on valid credentials; 401 on invalid",
            "POST /auth/refresh returns a new token given a valid, non-expired token",
            "POST /auth/logout invalidates the token server-side",
          ],
        }}
        ticketUpdates={[
          {
            afterStep: 6,
            comment: { type: "review-record", body: "JWT payload: user ID only — email excluded. Token expiry: 24h via exp claim, enforced server-side." },
          },
        ]}
        sessionTitle="auth-service"
        filename="SPEC.md"
        panelTitle="PROJ-42 — Build & Review"
        codeLines={[
          "## PROJ-42: Add user authentication",
          "",
          "Criterion: POST /auth/login returns a signed JWT",
          "           on valid credentials; 401 on invalid.",
          "Status:    In Progress",
        ]}
        codeSteps={[
          {
            afterStep: 1,
            lines: [
              "## PROJ-42: Add user authentication",
              "",
              "Criterion: POST /auth/login returns a signed JWT",
              "           on valid credentials; 401 on invalid.",
              "Status:    In Review",
            ],
            added: [4],
          },
          {
            afterStep: 6,
            lines: [
              "## PROJ-42: Add user authentication",
              "",
              "Criterion: POST /auth/login returns a signed JWT",
              "           on valid credentials; 401 on invalid.",
              "Status:    Closed",
              "",
              "### Review Record",
              "- JWT payload: user ID only — email excluded",
              "- Token expiry: 24h via exp claim, enforced server-side",
            ],
            added: [4, 6, 7, 8],
          },
        ]}
        messages={[
          { role: "agent", content: "Loaded PROJ-42. Building POST /auth/login in src/routes/auth.ts." },
          { role: "agent", content: "Done. The endpoint returns a signed JWT on valid credentials and 401 on invalid — criterion met. SPEC.md updated to 'In Review'. Starting the Review." },
          { role: "agent", content: "Walk me through what's in the JWT payload." },
          { role: "user", content: "Just the user ID. Email felt like unnecessary exposure in a token that might end up in logs — the ID is enough to look up the user." },
          { role: "agent", content: "Good call. One more: where is token expiry enforced, and what's the window?" },
          { role: "user", content: "Server-side via the exp claim in the payload. 24 hours. The client just presents the token — it doesn't manage expiry." },
          { role: "agent", content: "Both questions answered. Review closed — no gaps. Review Record added to SPEC.md. Ready for the next phase when you are." },
        ]}
        hint="step through the session"
        hintArrowAt={95}
      />

      <P>
        The rest of this guide walks through each part in detail. But the shape is always
        the same: a ticket becomes a spec entry, a spec entry becomes a Command, a Command
        runs a Build, and a Build closes with a Review.
      </P>
    </div>
  );
}
