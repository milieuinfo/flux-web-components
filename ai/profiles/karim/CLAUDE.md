# Claude Code Configuration — Karim

Karim's persoonlijke Claude Code configuratie voor het Flux Web Components project. Geactiveerd via `CLAUDE.local.md` in de project-root (zie [`ai/profiles/README.md`](../README.md)).

Alle projectcontext en conventies staan in `AGENTS.md` — agent-agnostisch, zodat ook andere tools (Cursor, Codex, Aider) ze lezen via de `AGENTS.md`-symlink op de project-root.

@ai/profiles/karim/AGENTS.md

## Skills

Ontdekt via de `.claude/skills`-symlink naar `skills/` (elke skill is een map met een `SKILL.md`):

- `/new-component` — scaffold een nieuwe Flux web component (procedure + alle vereiste files)
- `/run-tests` — Cypress component tests draaien voor één component of voor alle componenten
- `test-coverage` (auto-invoked) — regels voor wanneer tests of regressietests vereist zijn

Skill-inhoud wordt **lazy** geladen: enkel de `description` staat in context tot de skill effectief draait. Zet er dus geen projectcontext in die altijd nodig is — die hoort in `AGENTS.md`.
