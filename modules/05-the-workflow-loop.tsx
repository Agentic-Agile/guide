import React from "react";
import { H2, H3, P, Pullquote, Loop } from "../components/content/Typography";
import LinkedSessionMock from "../components/mocks/LinkedSessionMock";
import MermaidDiagram from "../components/content/MermaidDiagram";

export default function Module5Content() {
  return (
    <div>
      <P>
        The loop is three steps. The first step determines the quality of everything that
        follows. That&apos;s the part most teams skip.
      </P>
      <Loop />

      <H2>Spec</H2>
      <P>
        The Spec stage is where the phase is defined. The Spec Owner writes the phase entry
        — what&apos;s in scope, what done looks like — and the Product Owner signs off. Then the
        Developer writes the Command: the file that encodes that intent in a form
        the agent can act on.
      </P>
      <P>
        In our experience, nothing should start without both. Starting without a spec entry
        and a Command tends to mean the agent infers scope rather than acts on it.
        &quot;I&apos;ll write it up after&quot; and &quot;we talked about it&quot; are the two most common ways
        a phase loses its trace before it even starts.
      </P>
      <Pullquote>
        The Command is the moment you find out if the ticket is actually clear.
      </Pullquote>
      <P>
        If you can&apos;t write a Command that encodes the intent precisely, the ticket isn&apos;t
        ready. The friction you feel writing the Command is friction the agent would have
        felt trying to interpret an ambiguous scope. Better to hit it now.
      </P>

      <H2>Build</H2>
      <P>
        The Developer executes the Command. The agent builds within the scope defined in
        the Spec File. The Developer is in the session — not just to watch, but because
        they&apos;re accountable for everything the agent produces. If the agent goes out of scope,
        the Developer stops it. If something unexpected comes up that changes the scope, the
        Developer stops the session and updates the Spec File before continuing.
      </P>
      <P>
        External agents may run during Build — test runners, spec divergence checkers,
        scaffolding scripts. These run autonomously. No human presence required. They report
        back into the session when they&apos;re done.
      </P>
      <P>
        Build ends when the completeness criterion is met — that&apos;s the point of writing it
        down. &quot;Feels about right&quot; is harder to hand off.
      </P>
      <P>
        After a phase closes with a clean Review, the Developer can immediately run the next
        phase&apos;s Command in the same session. A ticket with three phases can complete in one
        continuous sitting — the loop repeats until the ticket is done. The phase boundary
        exists to create a verifiable checkpoint, not to force a session break.
      </P>

      <H2>Review</H2>
      <P>
        The agent leads the Review. The Developer doesn&apos;t present what was built — the agent
        asks about it. That&apos;s a meaningful distinction. A presentation lets the developer
        cover what they know. Questions surface what they don&apos;t.
      </P>
      <P>
        The agent asks until it has a clear picture of what the Developer understands and
        what they don&apos;t. For anything the Developer can&apos;t answer, the agent logs it as
        unresolved. The phase can still close — gaps don&apos;t block indefinitely. They get
        escalated.
      </P>

      <H3>What the agent checks</H3>
      <P>
        The Review has three purposes. First: verify the Developer understands what was
        built. Second: check for divergences between what was built and what the Spec File
        said would be built. Third: record both the understanding and the gaps as a Review
        Record in the Spec File.
      </P>
      <P>
        The phase is not done until the Review Record is written. The Review Record is
        what closes the loop.
      </P>

      <MermaidDiagram
        caption="One full loop — Spec defines scope, Build executes, Review closes and feeds the next"
        code={`flowchart LR
    SE["Spec entry\n+ Command written"] --> B["Build\n(agent executes)"]
    B --> R["Review\n(agent leads)"]
    R --> RR["Review Record\nadded to Spec File"]
    RR -.->|next phase| SE`}
      />

      <H2>In practice</H2>
      <P>
        Here&apos;s a complete Review — the agent checking the Developer&apos;s understanding,
        surfacing a gap, and closing the phase.
      </P>

      <LinkedSessionMock
        ticket={{
          id: "PROJ-71",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Webhook signature verification",
          sprint: "Sprint 5",
          assignee: "@developer",
          summary: "Verify all incoming webhooks against an HMAC-SHA256 signature before processing.",
          status: "in-progress",
          criteria: [
            "All incoming webhook requests are verified against an HMAC-SHA256 signature before processing",
            "Invalid signatures return 400; signature failures are logged with source and timestamp",
            "Valid requests pass through to existing handlers unchanged",
          ],
        }}
        ticketUpdates={[
          {
            afterStep: 5,
            status: "done",
            comment: { type: "review-record", body: "400 on bad signature; logs source + timestamp, not payload. WEBHOOK_SECRET shared across sources — known limitation, documented." },
          },
        ]}
        sessionTitle="payments-service"
        filename="SPEC.md"
        panelTitle="Agent Review — PROJ-71 Phase 1"
        codeLines={[
          "## Phase 1: Webhook signature verification",
          "",
          "Criteria: All incoming webhooks verified against",
          "          HMAC-SHA256 signature before processing.",
          "Status:   In Review",
          "Ticket:   PROJ-71",
        ]}
        codeSteps={[
          {
            afterStep: 5,
            lines: [
              "## Phase 1: Webhook signature verification",
              "",
              "Criteria: All incoming webhooks verified against",
              "          HMAC-SHA256 signature before processing.",
              "Status:   Closed",
              "Ticket:   PROJ-71",
              "",
              "### Review Record",
              "- 400 on bad signature; logs source + timestamp, not payload",
              "- WEBHOOK_SECRET shared (1 source) — known limitation documented",
            ],
            added: [4, 7, 8, 9],
          },
        ]}
        messages={[
          { role: "agent", content: "Phase complete. Incoming webhooks are verified against the HMAC-SHA256 signature before processing — criteria met. Let's close the Review." },
          { role: "agent", content: "Walk me through what happens if the signature check fails. What does the endpoint return and what gets logged?" },
          { role: "user", content: "Returns 400 with a generic 'invalid signature' message. We log the failure with the webhook source and timestamp but not the payload — didn't want to log potentially sensitive data." },
          { role: "agent", content: "Good call on the payload. One more: the secret used for verification comes from WEBHOOK_SECRET in the environment. Is that secret shared across all webhook sources, or per-source?" },
          { role: "user", content: "Shared right now. We only have one source. I know that'll need to change if we add more." },
          { role: "agent", content: "Logging that as a known limitation against PROJ-71 Phase 1 — not unresolved, just documented. Phase closed. Review Record added to Spec File." },
        ]}
        hint="step through the review"
        hintArrowAt={95}
      />

      <P>
        The agent didn&apos;t surface any gaps the Developer couldn&apos;t answer. The known limitation
        was documented rather than escalated — the Developer understood it and could explain
        it. That&apos;s a clean close.
      </P>
      <P>
        Not every Review is that clean. When gaps do surface, they get logged. The mechanism
        that handles them is the Escalation Ceremony — covered in Module 2.
      </P>
    </div>
  );
}
