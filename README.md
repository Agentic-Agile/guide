# Agentic Agile

A guide to decomposing work into phases that keep you involved in what AI is building.

Agentic Agile is about structuring work — before, during, and after each session — so that ownership stays with the team, not the model. It adapts Agile for agent-paced work. It is not about which tools to use or how to prompt an agent.

This guide is maintained as an open draft. Teams are encouraged to adapt the approach to their context and contribute proposals back.

---

## The Guide

| Module | Title |
|--------|-------|
| 00 | [The Guide](modules/00-the-guide.tsx) — The complete Agentic Agile reference |
| 01 | [Why Agentic Agile](modules/01-why-agentic-agile.tsx) — What breaks when you add AI to traditional Agile |
| 02 | [Roles](modules/02-roles.tsx) — The five roles and where they touch the workflow |
| 03 | [Artifacts](modules/03-artifacts.tsx) — Spec files, tickets, commands, review records, PRs |
| 04 | [Phase Boundaries](modules/04-phase-boundaries.tsx) — How phase boundaries are set |
| 05 | [The Workflow Loop](modules/05-the-workflow-loop.tsx) — Running Spec → Build → Review in practice |
| 06 | [Commands & Agents](modules/06-commands-and-agents.tsx) — Writing commands, building external agents |
| 07 | [Your First Phase](modules/07-your-first-phase.tsx) — A complete phase from scratch |
| 08 | [Scaling to a Team](modules/08-scaling-to-a-team.tsx) — Adopting Agentic Agile across a team |

The full methodology reference is in [RULEBOOK.md](RULEBOOK.md).

---

## Using the Components

The modules are written as React components using Tailwind CSS. To use them in a Next.js project:

1. Copy the `components/` directory into your project
2. Import the module component you want
3. Render it inside your layout

```tsx
import Module0Content from "./modules/00-the-guide";

export default function Page() {
  return <Module0Content />;
}
```

The components have no external dependencies beyond React, Tailwind, and `mermaid` (for diagrams).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

[CC BY 4.0](LICENSE) — Agentic Agile contributors
