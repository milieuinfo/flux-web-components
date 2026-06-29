# Koen — AI Configuratie

Persoonlijke Claude Code configuratie voor Koen. Voor de algemene activatie-flow en profile-structuur: zie [`ai/profiles/README.md`](../README.md).

Dit profile combineert het beste uit `kris/` en `karim/`.

## Stijl (zoals `kris/`) — Claude-Code-only

- **Geen `AGENTS.md`** — alle projectcontext en conventies zitten in één `CLAUDE.md`. Geen `@`-import-keten, geen cross-tool symlink op de project-root (Cursor/Codex/Aider gebruiken we niet).
- **Geen `SKILLS.md`** — de skill-bestanden in `skills/` bevatten zelf de volledige inhoud (geen stubs/indirectie). Één plek per skill.

## Overgenomen uit `karim/`

- **Engineering Mindset** — Denk vóór je codeert / Eenvoud eerst / Chirurgische wijzigingen / Doelgedreven uitvoeren (bovenaan `CLAUDE.md`).
- **Branch Safety (STRIKT)** — Claude pusht nooit; bij branchen nooit upstream/remote-tracking instellen.
- **Granulaire `settings.json`** — expliciete npm-allowlist (geen blanket `npm run *` / `cat *`), veiliger dan een brede wildcard.

## Bestanden

| Bestand | Doel |
|---------|------|
| `CLAUDE.md` | Entrypoint — alle projectcontext, conventies en mindset |
| `README.md` | Dit bestand |
| `settings.json` | Gedeelde permissies (gemerged in `.claude/settings.local.json`) |
| `skills/` | Skill-files met inline content (target van `.claude/skills/` symlink) |
