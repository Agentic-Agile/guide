import React from "react";
import { H2, P, Pullquote } from "../components/content/Typography";
import JiraTicketMock from "../components/mocks/JiraTicketMock";
import LinkedSessionMock from "../components/mocks/LinkedSessionMock";
import TextEditorMock from "../components/mocks/TextEditorMock";

export default function Module7Content() {
  return (
    <div>
      <P>
        Let&apos;s run one. Not a demonstration — an actual phase from the beginning. You&apos;ll write
        the spec entry, define the completion criterion, write the Command, run Build, and
        close the Review. By the end, the Spec File has a Review Record and you can explain
        everything that shipped.
      </P>

      <H2>The requirement</H2>
      <P>
        The project is a small API. A support request has surfaced a gap: users who forget
        their password have no recovery path. The Product Owner writes it up.
      </P>

      <TextEditorMock
        title="Product Requirements"
        filename="requirements.md"
        content={`# Password Reset

Users who forget their password are permanently locked out.
Support is handling these manually which doesn't scale.

Required:
- Users can request a reset link sent to their registered email
- The link takes them to a form to set a new password
- Links must expire (security requirement — 1 hour)
- Flow must work without support intervention

Out of scope: social login recovery, SMS fallback`}
      />

      <H2>The ticket</H2>
      <P>
        The Product Owner creates a ticket from the requirement. That&apos;s too
        large for one phase — it covers generating the token, sending the email, and
        handling the reset itself. The Developer decomposes it into phases before writing
        a single line.
      </P>

      <JiraTicketMock
        ticket={{
          id: "PROJ-88",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Password reset flow",
          sprint: "Sprint 6",
          assignee: "@developer",
          summary: "Allow users to request a password reset link and use it to set a new password.",
          status: "todo",
          criteria: [
            "POST /auth/forgot-password stores a signed, 1-hour-expiry reset token and returns 200",
            "Endpoint sends an email containing the reset link to the user's registered address",
            "POST /auth/reset-password validates the token, updates the password, and invalidates the token",
            "Reset links expire after 1 hour; expired tokens are rejected",
          ],
        }}
      />

      <H2>Phase 1: Writing the spec entry</H2>
      <P>
        Before writing any code, write the Spec File entry for Phase 1. It needs three
        things: what the phase is, the completeness criterion, and any constraints.
      </P>

      <TextEditorMock
        title="SPEC.md — user-api"
        filename="SPEC.md"
        content={`## Phase 1: Generate and store reset token

**Ticket:** PROJ-88
**Status:** Spec
**Criterion:** POST /auth/forgot-password stores a signed, 1-hour-expiry token against the user record and returns 200.

**Constraints:**
- Token must be cryptographically random (crypto.randomBytes)
- Expiry enforced server-side, not by the token format
- Store hashed token, not plaintext`}
      />

      <P>
        Product Owner signs off on the scope. Phase 1 is approved. Now write the Command.
      </P>

      <H2>Phase 1: Writing the Command</H2>
      <P>
        The Command tells the agent its role for this session — who it is, what it&apos;s
        building, and where to stop. If it&apos;s hard to write, the spec entry needs more work.
      </P>

      <TextEditorMock
        title=".agent/commands/build-phase.md"
        filename="build-phase.md"
        content={`# Build Command — PROJ-88 Phase 1

You are a developer on this team. Your job is to build Phase 1 of PROJ-88.

Phase:  Generate and store reset token
Spec:   SPEC.md § Phase 1
Ticket: PROJ-88

Criterion:
POST /auth/forgot-password stores a signed, 1-hour-expiry token against the user record and returns 200.

Constraints:
- Use crypto.randomBytes for token generation
- Store hashed token (bcrypt), not plaintext
- Expiry is a timestamp stored alongside the hash
- User model lives in src/models/User.ts

When the criterion is met:
1. Update SPEC.md Phase 1 status to 'In Review'
2. Stop. Do not begin Phase 2.
3. Lead the Review.`}
      />

      <H2>Phase 1: Build and Review</H2>
      <P>
        You run the Command. The agent builds. Then it stops and leads the Review. Watch the
        ticket update as the session progresses.
      </P>

      <LinkedSessionMock
        ticket={{
          id: "PROJ-88",
          feature: { id: "FEAT-10", name: "User Account Security" },
          title: "Password reset flow",
          sprint: "Sprint 6",
          assignee: "@developer",
          summary: "Allow users to request a password reset link and use it to set a new password.",
          status: "in-progress",
          criteria: [
            "POST /auth/forgot-password stores a signed, 1-hour-expiry reset token and returns 200",
            "Endpoint sends an email containing the reset link to the user's registered address",
            "POST /auth/reset-password validates the token, updates the password, and invalidates the token",
            "Reset links expire after 1 hour; expired tokens are rejected",
          ],
        }}
        ticketUpdates={[
          {
            afterStep: 7,
            comment: { type: "review-record", body: "200 for unknown emails (user enumeration protection). bcrypt over SHA-256 for brute-force resistance. Expiry validation is handled in the reset submission phase — cross-phase dependency documented." },
          },
        ]}
        sessionTitle="user-api"
        filename="src/routes/auth.ts"
        panelTitle="PROJ-88 Phase 1 — Build & Review"
        codeLines={[
          "// src/routes/auth.ts",
          "import { Router } from 'express';",
          "const router = Router();",
          "",
          "// Phase 1 — to be built",
        ]}
        codeSteps={[
          {
            afterStep: 1,
            lines: [
              "// src/routes/auth.ts",
              "import { Router } from 'express';",
              "import crypto from 'crypto';",
              "import bcrypt from 'bcrypt';",
              "import { User } from '../models/User';",
              "const router = Router();",
              "",
              "router.post('/auth/forgot-password', async (req, res) => {",
              "  const user = await User.findOne({ email: req.body.email });",
              "  if (!user) return res.status(200).json({ ok: true });",
              "  const raw = crypto.randomBytes(32).toString('hex');",
              "  const hash = await bcrypt.hash(raw, 10);",
              "  const expiry = new Date(Date.now() + 3600_000);",
              "  await user.setResetToken(hash, expiry);",
              "  res.status(200).json({ ok: true });",
              "});",
            ],
            added: [2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          },
        ]}
        messages={[
          { role: "agent", content: "Phase 1 complete. POST /auth/forgot-password generates a random token, hashes it with bcrypt, stores it with a 1-hour expiry, and returns 200 — criterion met. SPEC.md updated to 'In Review'. Starting the Review." },
          { role: "agent", content: "Line 9: the endpoint returns 200 even when the email isn't found. Walk me through that decision." },
          { role: "user", content: "User enumeration protection. If we returned a 404 for unknown emails, an attacker could use the endpoint to discover which emails are registered." },
          { role: "agent", content: "Good. The token is hashed with bcrypt — why bcrypt over something like SHA-256?" },
          { role: "user", content: "bcrypt is slow by design, which makes brute-forcing a leaked token database much harder. SHA-256 is fast — not what you want for credential storage." },
          { role: "agent", content: "Correct. One last question: the expiry is stored as a timestamp alongside the hash. Who checks that expiry — the reset endpoint, or somewhere else?" },
          { role: "user", content: "Phase 3 will handle that — the reset submission endpoint validates both the token match and the expiry before accepting the new password." },
          { role: "agent", content: "Documented as a cross-phase dependency. Phase 1 closed — all questions answered. Review Record added to SPEC.md. Ready for Phase 2 when you are." },
        ]}
        hint="step through the phase"
        hintArrowAt={95}
      />

      <H2>What just happened</H2>
      <P>
        The Spec File now has a Review Record for Phase 1. Every question the agent asked
        has an answer in writing. The cross-phase dependency — Phase 3 handles expiry
        validation — is documented. Nobody has to remember it.
      </P>
      <Pullquote>
        The Review Record is the difference between code you shipped and code you own.
      </Pullquote>

      <H2>The anchor file</H2>
      <P>
        Phase 1 is closed. Now write the anchor entry — which files were touched, who owns
        this phase, and what the acceptance criteria were. This can be written by hand,
        generated by the agent at phase close, or maintained by editor tooling. The format
        is open.
      </P>

      <div className="bg-zinc-900 border border-zinc-700 rounded p-4 my-6 font-mono text-xs text-zinc-300 leading-relaxed">
        <div className="text-zinc-500 mb-3"># .anchor.yml</div>
        <div className="mb-1">- <span className="text-indigo-400">ticket</span>: PROJ-88</div>
        <div className="mb-1 pl-2"><span className="text-indigo-400">phase</span>: 1</div>
        <div className="mb-1 pl-2"><span className="text-indigo-400">title</span>: Generate and store reset token</div>
        <div className="mb-1 pl-2"><span className="text-indigo-400">assignee</span>: &quot;@developer&quot;</div>
        <div className="mb-1 pl-2"><span className="text-indigo-400">acceptance</span>: POST /auth/forgot-password stores a signed, 1-hour-expiry token and returns 200</div>
        <div className="mb-1 pl-2"><span className="text-indigo-400">files</span>:</div>
        <div className="pl-4">- src/routes/auth.ts</div>
        <div className="pl-4">- src/models/User.ts</div>
      </div>

      <P>
        Open <code className="font-mono text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">src/routes/auth.ts</code> six
        months from now — the anchor entry tells you which ticket owns it, who was assigned,
        and why the endpoint returns 200 for unknown emails. No Jira hunting, no asking
        whoever last touched it. The answer is in the file.
      </P>

      <P>
        Phase 2 is next. You already know what it needs: the spec entry is written, the
        criterion is clear, and there&apos;s an open question from the ticket that Phase 2&apos;s
        Review will likely surface — whether to return 200 or 404 for unknown emails in
        the send-email step. That one will go to the Product Owner.
      </P>
      <P>
        Run it the same way. Spec, Command, Build, Review. That&apos;s the loop.
      </P>
    </div>
  );
}
