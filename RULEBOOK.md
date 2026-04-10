# The Agentic Agile Rulebook
**Version 1.0**

Agentic Agile is a methodology for software teams building with AI agents. It is
Claude Code-specific. It replaces traditional Agile ceremonies with agent-native equivalents.

---

## 1. Core Principle

The human's primary responsibility is ownership. Ownership is the complete understanding of
what exists in a project and why. The Agent's primary responsibility is execution within
defined phase boundaries.

---

## 2. Roles

Agentic Agile defines three roles.

### 2.1 Spec Owner

The Spec Owner owns the Spec File. The Spec Owner defines phase boundaries, approves
Tickets, and signs off on Checkpoints. No phase begins or closes without Spec Owner
approval. On solo projects, the developer is the Spec Owner.

### 2.2 Agent Operator

The Agent Operator executes agent sessions. The Agent Operator writes Commands,
interprets agent output, and runs the Build stage. The Agent Operator is accountable
for all agent actions within a session. On solo projects, the developer is also the
Agent Operator.

### 2.3 The Agent

The Agent is a named project participant. The Agent executes phases within the
boundaries defined by the Spec File, prompts the Spec Owner at Checkpoints, and flags
divergences between completed work and the Spec File. The Agent does not make scope
decisions or advance past a Checkpoint without Spec Owner sign-off.

---

## 3. Artifacts

Agentic Agile defines six Artifacts. Each flows from the previous.

| Artifact | Definition | Flows From |
|----------|-----------|------------|
| **Spec File** | The single source of truth for the project. Contains all stages and phases. | — |
| **Ticket** | A precise, human-approved scope statement for a single phase. | Spec File |
| **Command** | A slash command that encodes the Agent Operator's intent for a phase. | Ticket |
| **Checkpoint Record** | The record of the Checkpoint exchange for a phase. Stored in the Spec File. | Build |
| **Retro Log** | The record of the Retro for a phase. Appended to the Spec File. | Checkpoint |
| **Pull Request** | A change set evaluated for value against the Spec File. | Build |

---

## 4. Rules

1. No phase begins without a written Spec File entry.
2. No phase closes without a completed Checkpoint.
3. The Spec File is the single source of truth.
4. The Agent does not advance past a Checkpoint without Spec Owner sign-off.
5. Every Ticket maps to exactly one phase.
6. Commands are written before agent execution begins.

---

## 5. Phase Boundaries

A phase is the atomic unit of work in Agentic Agile. A phase is valid when all four
conditions are met:

1. It is completable in a single agent session.
2. It has exactly one testable completeness criterion.
3. It maps to exactly one Ticket.
4. Its boundary is defined during the Spec stage, not during Build.

The Spec Owner defines all phase boundaries before Build begins.

---

## 6. The Workflow Loop

Every phase follows this loop:

```
Spec → Build → Checkpoint → Retro
```

**Spec**
The Spec Owner defines the phase in the Spec File. The Agent Operator writes the Ticket
and Command. The Agent does not begin until both exist.

**Build**
The Agent Operator executes the Command. The Agent executes within phase boundaries.
External Agents may run autonomously during Build and do not require human presence.

**Checkpoint**
The Agent prompts the Spec Owner with questions about the completed work, and does not
advance until all gaps in understanding are resolved. The Agent directs the Spec Owner
toward resources rather than providing direct answers.

**Retro**
The Agent and Spec Owner conduct a prompted review of the phase. The Agent flags
divergences from the Spec File. The Spec Owner records decisions and carry-forwards
before the next phase begins.

---

## 7. Stage Structure

| Stage | Definition |
|-------|-----------|
| **Prototype** | The core concept is proven. Scope is minimal. |
| **Alpha** | The primary use case is feature-complete. |
| **Beta** | The product is stable, tested, and ready for real use. |

Each stage contains one or more phases. Phases within a stage share a completeness goal.

---

## 8. Commands and Agents

A Command is a Claude Code slash command written by the Agent Operator. Commands flow
from Tickets and encode intent explicitly. The Agent does not infer scope from context.

An Agent is an external script triggered by a Claude Code hook. Agents run outside the
session and handle autonomous tasks: running tests, flagging Spec File divergences,
scaffolding phases. Agents do not make decisions.

---

## 9. Replaced Ceremonies

| Traditional Agile | Agentic Agile |
|---|---|
| Sprint planning | Agent-assisted phase scoping from the Spec File |
| Ticket writing | Tickets as Spec File artifacts, written with Agent assistance |
| Code review | Agent-flagged Spec File divergences and Checkpoint verification |
| Standup | Retro Log at phase completion |
| Story points | Phase boundary discipline |

---

## 10. Observations

These are observations from practice, not rules. Adapt them to your context.

1. **Starting a phase with a written Spec File entry** keeps history traceable and the Agent's scope clear.
2. **Closing a phase with a completed Checkpoint** surfaces gaps before they become bugs.
3. **The Spec File as the single source of truth** — for individuals and teams alike — reduces context-switching and keeps decisions durable.
4. **Developer sign-off before the Agent closes a Checkpoint** ensures understanding, not just completion.
5. **One testable completeness criterion per phase** makes Checkpoints unambiguous and PRs easier to evaluate.
6. **Commands written before Agent execution** — the Agent Operator encodes intent explicitly; the Agent does not infer scope.

---

*Agentic Agile is Claude Code-specific. Version 1.0.*
