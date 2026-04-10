import React from "react";
import { H2, P, Pullquote, Table } from "../components/content/Typography";
import AgentSessionMock from "../components/mocks/AgentSessionMock";
import InteractiveHint from "../components/mocks/InteractiveHint";
import TextEditorMock from "../components/mocks/TextEditorMock";

export default function Module6Content() {
  return (
    <div>
      <P>
        A Command is not a prompt. A prompt asks the agent to do something. A Command tells
        the agent who it is — its role, its scope, and how it should engage with the work.
        That distinction changes what the agent produces.
      </P>

      <H2>The Command as contributor</H2>
      <P>
        When you write a Command for a phase, you&apos;re not writing instructions. You&apos;re
        instantiating a contributor: a named role with a defined way of working, checkpoint
        behaviour included.
      </P>

      <TextEditorMock
        title=".agent/commands/build-phase.md"
        filename="build-phase.md"
        content={`# Build Command — PROJ-88 Phase 1

You are a developer on this team. Your job is to build Phase 1 of PROJ-88.

Phase:  Generate and store reset token
Spec:   SPEC.md § Phase 1
Ticket: PROJ-88

Specialists available:
- run /specialist-auth before touching any authentication code

Constraints:
- Use crypto.randomBytes for token generation
- Store hashed token, not plaintext
- Expiry as timestamp stored alongside the hash
- User model lives in src/models/User.ts

When the criterion is met:
1. Update SPEC.md Phase 1 status to 'In Review'
2. Stop. Do not begin Phase 2.
3. Lead the Review.`}
      />

      <P>
        The persona line matters as much as the constraints. An agent told &quot;you are a
        developer on this team&quot; behaves differently from one that receives a list of
        instructions — it brings judgment to ambiguity rather than guessing at defaults.
        The checkpoint behaviour at the end isn&apos;t bolted on; it&apos;s part of what the
        contributor knows to do.
      </P>
      <Pullquote>
        A well-written Command doesn&apos;t tell the agent what to do. It tells the agent what kind of contributor to be.
      </Pullquote>

      <H2>Specialist Commands</H2>
      <P>
        Not every Command builds something. Some Commands exist only to understand something
        — a section of the codebase, a pattern, a constraint. These are Specialist Commands,
        and their job is to know, not to build.
      </P>
      <P>
        A Specialist reads, traces, and documents. &quot;Map how authentication is handled
        here.&quot; &quot;Understand what the data layer owns and what it delegates.&quot; &quot;Check what
        test patterns are in use before touching the test suite.&quot; The Specialist produces
        understanding that a build Command can act on — rather than the build Command
        having to rediscover context every session.
      </P>

      <TextEditorMock
        title=".agent/commands/specialist-auth.md"
        filename="specialist-auth.md"
        content={`# Specialist: Auth Layer

You are a code analyst. Do not write any code.

Your job: map how authentication is handled in this codebase.

Document:
- Where auth logic lives and what it owns
- Patterns in use (JWT, sessions, OAuth, etc.)
- What a developer should know before touching auth code
- Any constraints or invariants that apply to auth work

Return your findings as a structured summary.`}
      />

      <P>
        Specialist Commands are reusable. Once written, any build Command can delegate to
        them. They improve as the codebase evolves — a Specialist that was written for
        one ticket becomes a shared resource for the whole team.
      </P>

      <H2>The Orchestrator</H2>
      <P>
        The Orchestrator is a Command whose job is to brief other Commands. Before a build
        session opens, the Orchestrator runs — it knows which Specialist Commands exist,
        tells the build Command about them, and hands over. The build Command doesn&apos;t
        discover its tools. It arrives already briefed.
      </P>
      <P>
        You don&apos;t always need an Orchestrator. On a small project with a handful of Commands,
        the briefing can happen inline in the build Command itself. At team scale — multiple
        Contributors, multiple problem spaces, multiple Specialists — the Orchestrator is
        what keeps Commands from duplicating each other&apos;s understanding of the codebase.
      </P>

      <H2>The lifecycle: temporary to permanent</H2>
      <P>
        Commands start rough. A first-pass build Command is just enough to begin the work:
        the right role, the right scope, the right stop condition. That&apos;s the draft.
      </P>
      <P>
        Over time Commands get refined. Standing rules that had to be stated manually in
        every session get added. Scope edges that kept drifting get made explicit. The
        Command improves through use.
      </P>
      <P>
        Some Commands earn permanence. A Specialist that proved useful across three sprints
        becomes a team-wide tool. A build Command that reflects how the team actually works
        gets added to the shared library. Standing rules that belonged in every Command move
        into the AGENT.md file — the project-level instructions every session reads before
        any phase begins.
      </P>

      <Table
        headers={["Stage", "What it is", "What happens next"]}
        rows={[
          ["Draft", "Rough, phase-specific, written just before the session", "Used once, discarded or kept"],
          ["Active", "Refined through use, shared within the team", "Iterated on across multiple phases"],
          ["Promoted", "Proven enough to be a team standard", "Moves into AGENT.md or the shared command library"],
        ]}
      />

      <Pullquote>
        The Commands that survive are the ones that encode something the team actually learned.
      </Pullquote>

      <H2>The generator</H2>
      <P>
        Once the system is in place — the Spec File format is consistent, Specialist Commands
        exist for the main problem spaces, the build Command structure is proven — a generator
        can read a ticket and produce a ready-to-run Command.
      </P>
      <P>
        The Developer doesn&apos;t brief the agent. They review the generated Command, decide
        whether it&apos;s right, and run it. The back-and-forth happens at the checkpoints —
        not at the start. Not because the agent improvised its context, but because the
        generator gave it everything it needed before the session opened.
      </P>
      <P>
        That&apos;s the payoff of the system. Well-formed tickets become ready-to-run Commands.
        Planning produces execution artifacts directly. The agent arrives briefed because
        the whole system upstream of it is working correctly.
      </P>

      <H2>Where Commands live</H2>
      <P>
        A Command is a file — typically a markdown file in a dedicated commands directory
        at the project root. The format is whatever the team can read and the agent can act on.
        Different agent tools have different conventions for how they load Commands; what
        matters is that the Command exists before the session opens, not which directory it
        lives in.
      </P>
      <P>
        The AGENT.md file serves a related but different purpose. Commands encode
        phase-specific intent — who the agent is for this session, what it&apos;s building, where
        it stops. AGENT.md encodes project-level context that applies to every session:
        conventions, constraints, methodology reminders. The two complement each other. A
        Command without an AGENT.md is a contributor without onboarding. An AGENT.md
        without Commands is onboarding without a job to do.
      </P>

      <H2>In practice</H2>
      <P>
        Here&apos;s a build Command loading in a session. The agent knows its role, its
        scope, and its Specialists before the first message is sent.
      </P>

      <InteractiveHint hint="step through the session" arrowAt={95}>
        <AgentSessionMock
          title="api-service"
          filename="SPEC.md"
          panelTitle="Build Session — PROJ-88 Phase 1"
          codeLines={[
            "# Running: /build-phase",
            "",
            "Role:      Developer",
            "Ticket:    PROJ-88 Phase 1",
            "Criterion: POST /auth/forgot-password stores",
            "           a signed, 1-hour-expiry token.",
          ]}
          messages={[
            { role: "agent", content: "Loaded Phase 1 of PROJ-88. Before I start — running the auth Specialist to map the existing authentication layer." },
            { role: "agent", content: "Auth Specialist complete. JWT-based auth via jsonwebtoken, secret from JWT_SECRET env var, tokens verified in middleware at src/middleware/auth.ts. No existing password-reset infrastructure. Ready to build." },
            { role: "agent", content: "Phase 1 complete. POST /auth/forgot-password generates a random token, hashes it with bcrypt, stores it with a 1-hour expiry, and returns 200 — criterion met. SPEC.md updated to 'In Review'. Starting the Review." },
            { role: "agent", content: "The endpoint returns 200 even when the email isn't found. Walk me through that decision." },
            { role: "user", content: "User enumeration protection. A 404 would tell an attacker which emails are registered." },
            { role: "agent", content: "Documented. Phase 1 closed. Review Record added to SPEC.md." },
          ]}
        />
      </InteractiveHint>
    </div>
  );
}
