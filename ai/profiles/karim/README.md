# Karim — AI Configuratie

Persoonlijke Claude Code configuratie voor Karim. Voor de algemene activatie-flow en profile-structuur: zie [`ai/profiles/README.md`](../README.md).

## Stijl: gesplitst voor cross-tool support

Als enige profile splitst dit de projectcontext van de Claude-specifieke loader:

- **`AGENTS.md`** bevat alle projectcontext, conventies en de engineering mindset — agent-agnostisch geschreven.
- **`CLAUDE.md`** is een dunne loader die `AGENTS.md` `@`-importeert.
- `set-ai-profile.sh` zet daarnaast een `AGENTS.md`-symlink op de project-root, zodat tools die geen `CLAUDE.md` kennen (Cursor, Codex, Aider) dezelfde context lezen.

Wie enkel Claude Code gebruikt, heeft die splitsing niet nodig — zie `kris/` of `koen/` voor de alles-in-`CLAUDE.md` variant.

## Bestanden

| Bestand | Doel |
|---------|------|
| `CLAUDE.md` | Loader — `@`-import van `AGENTS.md` + overzicht van de skills |
| `AGENTS.md` | Projectcontext en conventies (bron van de root-`AGENTS.md`-symlink) |
| `README.md` | Dit bestand |
| `settings.json` | Permissies, gemerged in `.claude/settings.local.json` |
| `skills/` | Eén map per skill met een `SKILL.md` (doel van de `.claude/skills`-symlink) |

## Skills

De skills bevatten hun volledige inhoud; ze worden **lazy** geladen (enkel de `description` staat permanent in context). Zet er dus geen context in die altijd nodig is — die hoort in `AGENTS.md`.

- `/new-component` — scaffold een nieuwe Flux web component
- `/run-tests` — Cypress component tests draaien
- `test-coverage` — auto-invoked bij features en bugfixes, geen slash-command

Zie [`ai/profiles/README.md`](../README.md#skills-verplichte-structuur) voor de vereiste `skills/{naam}/SKILL.md`-structuur.
