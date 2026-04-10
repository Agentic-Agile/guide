import React from "react";
import { Rule, RH2, RP, Table, Loop } from "../components/content/Typography";
import { GitHubCallout } from "../components/content/GitHubCallout";

export default function Module0Content() {
  return (
    <div>
      <RP>
        Agentic Agile is a guide to decomposing work into phases that keep you involved in what
        AI is building. It is about structuring the work — before, during, and after each session — so that ownership stays
        with the team, not the model. It works on greenfield projects and legacy codebases alike.
        The codebase age doesn&apos;t change the need for checkpoints.
      </RP>

      <RH2>1. Roles</RH2>
      <RP>
        Agentic Agile adapts the four Scrum roles. The Agent is added as a fifth participant
        with defined responsibilities.
      </RP>
      <Table
        headers={["Role", "Responsibility"]}
        rows={[
          ["Product Owner", "Owns the backlog and priorities. Defines what gets built and why. Approves phase entries in the Spec File before Build begins."],
          ["Scrum Master", "Facilitates the methodology. Keeps phases well-scoped. Ensures Reviews are completed and recorded."],
          ["Developer", "Executes phases with the agent. Accountable for all agent actions within a session. Must be able to explain what was built before the phase closes."],
          ["Stakeholder", "Consumer of shipped output. Not present in day-to-day phases, but the work is accountable to them."],
          ["The Agent", "A named collaborator. Executes within the scope defined in the Spec File. Leads the Review — asks questions, surfaces gaps, flags divergences from the spec. Does not close a Review without Developer sign-off."],
        ]}
      />

      <RH2>2. The Spec File</RH2>
      <RP>
        The Spec File is the single source of truth. It may be a markdown document, a Jira
        project, a Linear board, or any structured record the team maintains. Format is not
        prescribed. What is prescribed: every phase has an entry before Build begins, and
        that entry defines the scope, the completion criteria, and — after Review — what was
        built and decided.
      </RP>

      <RH2>3. Phases</RH2>
      <RP>
        A phase is a subdivision of a ticket — chunk sized so the agent can execute it with
        a clear, verifiable endpoint. One ticket may produce one phase or several. The right
        size is whatever can be handed to the agent with unambiguous completion criteria.
      </RP>
      <RP>
        Phases are not tracked independently of their ticket. The ticket is the unit of
        planning; the phase is the unit of execution.
      </RP>

      <RH2>4. The Workflow</RH2>
      <Loop />
      <Table
        headers={["Stage", "Who", "What happens"]}
        rows={[
          ["Spec", "Developer + Product Owner", "The ticket is broken into phases. Each phase gets clear completion criteria before Build begins. The Agent does not start without defined scope."],
          ["Build", "Developer + Agent", "The Agent executes within the boundaries set in the Spec File. The Developer is accountable for all agent actions."],
          ["Review", "Agent + Developer", "The Agent leads the closeout. It asks questions to verify the Developer understands what was built, flags divergences from the Spec File, and records decisions. The phase does not close until the Developer can explain what shipped."],
        ]}
      />

      <RH2>5. The Escalation Ceremony</RH2>
      <RP>
        When a Developer cannot answer the Agent&apos;s Review questions, those questions are
        recorded as unresolved and escalated. The phase may close with open questions logged
        against the ticket — it does not block indefinitely.
      </RP>
      <RP>
        The Escalation Ceremony is run by the Scrum Master. They inspect accumulated unresolved
        questions, determine the appropriate resolution path for each, and assign accordingly.
        Three Amigos — or any equivalent group with the right domain coverage — is a common
        output. The ceremony does not prescribe who resolves a question; that is the Scrum
        Master&apos;s judgment.
      </RP>

      <RH2>6. What tends to work</RH2>
      <Rule n={1}>Ticket sizing matters more with agents than it did before. A vague or oversized ticket handed to an agent produces confident, well-written drift. Break it down at refinement, not mid-session.</Rule>
      <Rule n={2}>Phases work best when scope and completion criteria are written down before the agent starts.</Rule>
      <Rule n={3}>Reviews tend to be skipped when they feel optional — making them part of the loop helps.</Rule>
      <Rule n={4}>The most useful signal a Review produces: can the Developer explain what was built?</Rule>
      <Rule n={5}>Scope changes that happen inside a session tend to drift. Going back to the ticket keeps them traceable.</Rule>
      <Rule n={6}>A Review the agent leads — rather than the Developer presents — tends to surface more gaps.</Rule>
      <Rule n={7}>Unresolved questions that aren't written down get lost. Logging them against the ticket is the simplest fix.</Rule>
      <Rule n={8}>Updating the Spec File before the next phase keeps the history readable later.</Rule>

      <RH2>7. Scrum Mapping</RH2>
      <RP>
        Agentic Agile does not replace Scrum. It defines what happens inside each sprint when
        agents are doing the execution.
      </RP>
      <Table
        headers={["Scrum", "Agentic Agile equivalent"]}
        rows={[
          ["Sprint planning", "Phase scoping — breaking tickets into Spec File entries with completion criteria"],
          ["Sprint backlog", "The Spec File entries for the current sprint"],
          ["Daily standup", "Review Records — the agent-led closeout at the end of each phase"],
          ["Sprint review", "Standard Scrum sprint review, now evaluating agent-built output against the Spec File"],
          ["Retrospective", "Standard Scrum retro — unchanged"],
          ["Three Amigos", "One possible output of the Escalation Ceremony — convened by the Scrum Master to resolve questions that surfaced in Reviews and couldn't be answered by the Developer alone"],
          ["Definition of Done", "The Developer can explain what was built. The Spec File reflects what shipped."],
        ]}
      />

      <GitHubCallout href="https://github.com/Agentic-Agile/guide/discussions" />
    </div>
  );
}
