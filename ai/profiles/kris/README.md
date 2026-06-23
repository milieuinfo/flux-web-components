# Kris — AI Configuratie

Persoonlijke Claude Code configuratie voor Kris. Voor de algemene activatie-flow en profile-structuur: zie [`ai/profiles/README.md`](../README.md).

## Afwijkingen t.o.v. de standaard (zoals in `karim/`)

Deze folder wijkt bewust af op twee punten — beide vereenvoudigingen omdat Kris enkel Claude Code gebruikt op dit project en geen cross-tool agent-discovery nodig heeft.

### 1. Geen `AGENTS.md` — alles in `CLAUDE.md`

Karim splitst projectcontext (`AGENTS.md`) van Claude-specifieke loader-instructies (`CLAUDE.md`). Voor Kris zit alles in één `CLAUDE.md`:

- Eén bestand voor Claude Code om te lezen
- Geen `@`-import-keten nodig
- Geen `AGENTS.md` aan project-root (en dus geen symlink) — Cursor/Codex/Aider gebruiken we niet

### 2. Geen `SKILLS.md` — echte content in `skills/`

Karim's `skills/*.md` zijn stubs die naar `SKILLS.md` redirecten. Voor Kris staat de inhoud direct in de skill-bestanden:

- `skills/new-component.md` — volledige scaffolding-procedure
- `skills/run-tests.md` — test-uitvoering
- `skills/test-coverage.md` — feature/bugfix test-regels

Resultaat: één plek per skill, geen indirectie, geen `SKILLS.md`-bestand.

## Bestanden

| Bestand | Doel |
|---------|------|
| `CLAUDE.md` | Entrypoint — bevat alle projectcontext en conventies |
| `README.md` | Dit bestand |
| `settings.json` | Gedeelde permissies (target van `.claude/settings.json` symlink) |
| `skills/` | Skill-files (target van `.claude/skills/` symlink) |
