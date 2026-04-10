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

**Bottom-up adoption.** The guide assumes team-wide, consensual adoption. In practice, one developer starts using an AI agent, ships faster, and the team notices. The friction they face is not "how do we redesign our ceremonies" — it's "how do I explain what I built to my tech lead" and "how do I get the team on board." This entry point is not addressed. Module 8 (Scaling to a Team) is the natural home for it.

**Kanban and non-sprint workflows.** The methodology is implicitly sprint-shaped. Teams on Kanban have no sprint boundaries, no planning cadence, and no natural Checkpoint moments. The phase concept still works, but the surrounding framing does not. Needs a dedicated treatment explaining how phase boundaries substitute for sprint boundaries and what the Retro equivalent looks like in a continuous-flow context.


---

## Project governance

**Benevolent Dictator for Life (BDFL):** [@Simsarmy](https://github.com/Simsarmy) holds final say on the project but exercises this authority only to settle disputes. Day-to-day leadership — driving conversations, reviewing and approving PRs, and anything else typical of a maintainer role — is handled by the **Core Contributors**.

If a decision cannot be resolved within the Core Contributors group, it escalates to the BDFL for a final call. Outside of that, expect the BDFL to participate as a contributor like anyone else.

If the project's direction doesn't align with yours, forking is a legitimate and explicitly supported path — the license permits it. A fork is not a failure; it is the right outcome when a project genuinely needs to go in two different directions.

**Core Contributors** are managed as the `core-contributors` team in the GitHub org. The team is automatically requested as reviewers on all PRs via `CODEOWNERS`. To propose someone for Core Contributor status — including yourself — open a Discussion.

---

## How to contribute

**Discussion → Issue → PR.** That's the funnel. Skipping steps wastes everyone's time.

1. **Start a Discussion** for anything open-ended — a methodology question, a proposal, a challenge you're not sure is a real gap yet. No commitment to act. Use the methodology discussion template.
2. **Open an Issue** once there's consensus that something is worth doing, or for clear-cut actionable items (a factual error, a broken example) that don't need prior debate. Use the appropriate issue template — correction, gap, challenge, or adaptation.
3. **Fork and open a PR** only after an issue exists for anything substantive. Small corrections (typos, broken examples) can go straight to a PR. Use the PR template and link the issue.

A Core Contributor will review your PR. If your PR sits unreviewed for more than two weeks, ping the thread.

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
