import React from "react";
import { H2, H3, P, Pullquote, Table } from "../components/content/Typography";
import AgentSessionMock from "../components/mocks/AgentSessionMock";
import InteractiveHint from "../components/mocks/InteractiveHint";

export default function Module8Content() {
  return (
    <div>
      <P>
        The loop works the same on a team as it does solo. Spec, Build, Review — that doesn&apos;t
        change. What changes is accountability. On a team, the roles separate out. The person
        setting phase boundaries is not always the person running the session. The person who
        can answer a Review question is not always the Developer who ran the Build.
      </P>
      <P>
        That separation is the methodology working correctly. It&apos;s also where most teams
        find the friction.
      </P>

      <H2>The Spec File is shared</H2>
      <P>
        On a solo project, you are the Spec File. You wrote it, you know it, you update it.
        On a team, the Spec File is a document everyone reads from and only the Product Owner
        has sign-off authority on. That distinction matters the moment two Developers are
        running phases in parallel.
      </P>
      <P>
        Parallel phases are fine. The Spec File handles them — each phase has its own entry,
        each entry has its own status, and the Review Records don&apos;t interfere. What the Spec
        File doesn&apos;t handle is two Developers writing to the same section of it simultaneously.
        Keep phase boundaries clean and that won&apos;t happen.
      </P>
      <Pullquote>
        A shared Spec File only works if it&apos;s treated as the source of truth by everyone on the team.
      </Pullquote>

      <H2>Product Owner sign-off in practice</H2>
      <P>
        On a solo project, you sign off on your own phases. On a team, the Product Owner
        approves phase entries before Build begins. In practice that doesn&apos;t mean a synchronous
        meeting for every phase — it means the PO reviews the spec entry asynchronously and
        indicates approval before the Developer runs the Command.
      </P>
      <P>
        What the PO is checking: is the scope right, is the completeness criterion testable,
        and does this phase match the ticket&apos;s intent. Not the implementation — the outcome.
        A PO who&apos;s approving implementation details is doing the wrong job.
      </P>

      <H2>The Escalation Ceremony at scale</H2>
      <P>
        In a solo project, an unresolved Review question is a reminder you carry yourself.
        On a team, unresolved questions accumulate across multiple Developers&apos; Reviews and
        someone has to route them. That&apos;s the Scrum Master.
      </P>
      <P>
        The Escalation Ceremony isn&apos;t a new meeting. It&apos;s the Scrum Master inspecting
        the accumulated unresolved questions from the sprint&apos;s Reviews and deciding how each
        one gets resolved — Three Amigos, a PO decision, a domain expert conversation,
        whatever fits. The SM doesn&apos;t resolve the questions. They route them.
      </P>

      <H3>What the ceremony produces</H3>
      <Table
        headers={["Question type", "Typical resolution path"]}
        rows={[
          ["Architectural decision (e.g. token rotation strategy)", "Three Amigos — Developer, tech lead, PO"],
          ["Product policy decision (e.g. return 200 or 404 for unknown email)", "Product Owner decision, written back into the Spec File"],
          ["Ops/infrastructure decision (e.g. alert vs. silent log on failure)", "Assigned to ops lead with context from the Review"],
          ["Security question (e.g. per-user vs. per-IP rate limiting)", "Security review — tagged with tradeoffs from the Review"],
        ]}
      />

      <H2>PRs across a team</H2>
      <P>
        The traditional PR review — line-by-line inspection for errors — is no longer where
        the risk lives. AI-generated code is rarely wrong in the ways that kind of review was
        designed to catch. The real failure modes are spec divergence and comprehension gaps,
        neither of which shows up in a diff.
      </P>
      <P>
        By the time a PR is opened in Agentic Agile, those risks have already been addressed:
        the spec was written before Build, and the Review verified understanding before the
        phase closed. The Review Record documents what was built and why. Merging becomes a
        check against that record — does the PR deliver what the spec said it would? — not a
        fresh inspection of the code itself.
      </P>

      <H2>The anchor file at team scale</H2>
      <P>
        On a solo project the anchor file is a convenience. On a team it becomes load-bearing.
        Multiple Developers running phases in parallel means multiple files being touched
        across multiple tickets simultaneously. Without the anchor file, the only way to know
        what a file is for is to find whoever last touched it.
      </P>
      <P>
        With the anchor file, any Developer can open any file and immediately see which ticket
        owns it, which phase it belongs to, who the assignee is, and what the acceptance
        criteria were. Editor tooling can surface this inline — no Jira, no spec file hunting,
        no asking someone. The context is attached to the code.
      </P>
      <P>
        The anchor file also makes the PR review faster. The reviewer doesn&apos;t need to reconstruct
        context from commit messages and ticket titles. The anchor entry for each file tells
        them exactly what was being built and why. The question &quot;does this deliver what the
        spec said?&quot; becomes answerable without leaving the editor.
      </P>

      <H2>Onboarding a Developer</H2>
      <P>
        You&apos;ve onboarded a new Developer to a Scrum team. They don&apos;t know the methodology.
        The fastest path isn&apos;t a training session — it&apos;s pairing them on a well-scoped phase
        with an experienced Agent Operator. They shadow the Command authoring, watch the
        Build, and participate in the Review. One phase is usually enough to make the loop
        concrete.
      </P>
      <P>
        What they need to understand before running a phase alone: how to write a spec
        entry, how to write a Command that constrains the agent, and what a good Review
        question looks like. The Guide covers all three. Reading it first is worth doing.
      </P>

      <H2>In practice</H2>
      <P>
        Here&apos;s a Scrum Master running the Escalation Ceremony — three unresolved questions
        from the sprint, each routed to the right person.
      </P>

      <InteractiveHint hint="step through the ceremony" arrowAt={95}>
        <AgentSessionMock
          title="sprint-6"
          filename="SPEC-sprint6.md"
          panelTitle="Escalation Ceremony — Sprint 6"
          codeLines={[
            "# Sprint 6 — Unresolved Review Questions",
            "",
            "PROJ-88 P2  Return 200 or 404 for unknown email in",
            "            forgot-password flow?",
            "PROJ-91 P1  Rate limit scope: per-user or per-IP?",
            "PROJ-85 P3  Alert on-call or log silently on 3rd",
            "            delivery retry failure?",
          ]}
          messages={[
            { role: "agent", content: "3 unresolved questions from Sprint 6 Reviews. Starting with PROJ-88 Phase 2: 'Should POST /auth/forgot-password return 200 or 404 when the email isn't in the system?'" },
            { role: "user", content: "Product decision — user enumeration risk makes this a security-adjacent call. Escalate to @po with context: returning 404 leaks whether an email is registered." },
            { role: "agent", content: "Escalated to PO with context. Next: PROJ-91 Phase 1: 'Rate limiting — per-user or per-IP?'" },
            { role: "user", content: "Architectural tradeoff. Per-IP is simpler but breaks on shared IPs; per-user is more accurate but requires auth context. Three Amigos: @developer, @tech-lead, @po." },
            { role: "agent", content: "Three Amigos assigned. Last: PROJ-85 Phase 3: 'Should max delivery retry failures alert on-call or log silently?'" },
            { role: "user", content: "Ops decision. Assign to @ops-lead — they own the alerting policy. Include the failure rate from Phase 3's load test results for context." },
            { role: "agent", content: "Assigned to ops lead with load test context attached. All 3 questions routed. Ceremony complete — Spec File updated with assignments and owners." },
          ]}
        />
      </InteractiveHint>

      <H2>What doesn&apos;t change</H2>
      <P>
        The Scrum ceremonies that exist for human coordination still exist. Sprint planning,
        sprint review, retrospective — these are not replaced by Agentic Agile. What changes
        is what they&apos;re evaluating. Sprint planning is phase scoping, not story pointing.
        Sprint review evaluates agent-built output against the Spec File. The retrospective
        is unchanged — it&apos;s human-driven, and Agentic Agile leaves it alone.
      </P>
      <P>
        The loop is the same at any scale. Spec, Build, Review. The roles separate out.
        The accountability stays intact.
      </P>
    </div>
  );
}
