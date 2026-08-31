# Kris — AI Configuratie

Persoonlijke Claude Code configuratie voor Kris. Voor de algemene activatie-flow en profile-structuur: zie [`ai/profiles/README.md`](../README.md).

## Afwijkingen t.o.v. de standaard (zoals in `karim/`)

Deze folder wijkt bewust af op twee punten — beide vereenvoudigingen omdat Kris enkel Claude Code gebruikt op dit project en geen cross-tool agent-discovery nodig heeft.

### 1. Geen `AGENTS.md` — alles in `CLAUDE.md`

Karim splitst projectcontext (`AGENTS.md`) van Claude-specifieke loader-instructies (`CLAUDE.md`). Voor Kris zit alles in één `CLAUDE.md`:

- Eén bestand voor Claude Code om te lezen
- Geen `@`-import-keten nodig
- Geen `AGENTS.md` aan project-root (en dus geen symlink) — Cursor/Codex/Aider gebruiken we niet

### 2. Skills met inline content

Elke skill is een map met een `SKILL.md` (de structuur die Claude Code vereist — zie [`ai/profiles/README.md`](../README.md#skills-verplichte-structuur)) en bevat zijn volledige inhoud:

- `skills/new-component/SKILL.md` — volledige scaffolding-procedure
- `skills/run-tests/SKILL.md` — test-uitvoering
- `skills/test-coverage/SKILL.md` — feature/bugfix test-regels

Skill-inhoud wordt lazy geladen: enkel de `description` staat permanent in context. Wat altijd nodig is, hoort dus in `CLAUDE.md`.

## Bestanden

| Bestand | Doel |
|---------|------|
| `CLAUDE.md` | Entrypoint — bevat alle projectcontext en conventies |
| `README.md` | Dit bestand |
| `settings.json` | Permissies, gemerged in `.claude/settings.local.json` |
| `skills/` | Eén map per skill met een `SKILL.md` (doel van de `.claude/skills`-symlink) |
