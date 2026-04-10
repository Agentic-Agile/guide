# Contributing to Agentic Agile

This guide is an open draft. Contributions are welcome — proposals, corrections, and challenges to the methodology itself.

---

## What we're looking for

- **Corrections** — something in the guide is factually wrong or contradicts itself
- **Gaps** — a scenario the guide doesn't address that teams commonly encounter
- **Challenges** — a claim that doesn't hold in your experience, with a concrete counter-example
- **Adaptations** — how the methodology works (or doesn't) in non-Scrum contexts: Kanban, Shape Up, solo projects, large orgs

We are not looking for style changes, formatting tweaks, or additions that make the guide longer without adding substance.

---

## Known open gaps in v1.0

These are gaps in the methodology as currently documented. Contributions that address them directly are particularly welcome.

**Bottom-up adoption.** The guide assumes team-wide, consensual adoption. In practice, one developer starts using Claude Code, ships faster, and the team notices. The friction they face is not "how do we redesign our ceremonies" — it's "how do I explain what I built to my tech lead" and "how do I get the team on board." This entry point is not addressed. Module 8 (Scaling to a Team) is the natural home for it.

**Kanban and non-sprint workflows.** The methodology is implicitly sprint-shaped. Teams on Kanban have no sprint boundaries, no planning cadence, and no natural Checkpoint moments. The phase concept still works, but the surrounding framing does not. Needs a dedicated treatment explaining how phase boundaries substitute for sprint boundaries and what the Retro equivalent looks like in a continuous-flow context.

**Bootstrapping the Spec Owner role.** The Spec Owner role assumes someone is willing to own the spec, make scope decisions, and sign off on Checkpoints. In many teams this person does not exist — everyone writes tickets, nobody owns the spec, and scope decisions happen in Slack. The guide does not address how to bootstrap the role in a team that resists it, or whether a tech lead or product manager is the right default.

**Greenfield vs maintenance.** Almost all the framing assumes building something new. Maintenance work on a legacy codebase is where AI agents cause the most damage: hallucinating APIs, breaking subtle invariants, producing code that passes tests but violates assumptions baked into the existing system. Phase boundaries, Checkpoints, and Spec File entries all need to be applied differently when the starting point is existing code.

---

## How to contribute

1. **Open an issue first** for anything substantive — a methodology change, a new module, a significant rewrite. Discuss before writing.
2. **Fork and PR** for small corrections (typos, broken examples, factual errors).
3. **Be specific** — "this doesn't match my experience" needs a concrete example. What did you try, what happened, what did you expect?

---

## Module structure

Each module is a React component in `modules/`. The components use:

- `components/content/Typography.tsx` — heading and paragraph components
- `components/mocks/` — interactive demonstration components
- `components/diagrams/` — SVG diagrams
- `components/content/MermaidDiagram.tsx` — flowchart diagrams via Mermaid

Keep content changes in the module files. Keep component changes in `components/`.

---

## Code of conduct

Be direct. Disagree with ideas, not people. The methodology is a set of observations about what tends to work — it is not a religion and it is not complete. Challenges backed by evidence are more useful than endorsements.
