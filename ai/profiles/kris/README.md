# Kris - AI Configuratie

Persoonlijke Claude Code configuratie voor Kris. Voor de algemene activatie-flow en profile-structuur: zie [`ai/profiles/README.md`](../README.md).

## Afwijkingen t.o.v. de standaard (zoals in `karim/`)

Deze folder wijkt bewust af op twee punten - beide vereenvoudigingen omdat Kris enkel Claude Code gebruikt op dit project en geen cross-tool agent-discovery nodig heeft.

### 1. Geen `AGENTS.md` - alles in `CLAUDE.md`

Karim splitst projectcontext (`AGENTS.md`) van Claude-specifieke loader-instructies (`CLAUDE.md`). Voor Kris zit alles in één `CLAUDE.md`:

- Eén bestand voor Claude Code om te lezen
- Geen `@`-import-keten nodig
- Geen `AGENTS.md` aan project-root (en dus geen symlink) - Cursor/Codex/Aider gebruiken we niet

### 2. Skills met inline content

Elke skill is een map met een `SKILL.md` - de structuur die Claude Code vereist. Een los `skills/naam.md` wordt stilzwijgend genegeerd. De skill bevat zijn volledige inhoud, zonder indirectie via een `SKILLS.md`.

## Skills

Een skill hoort hier enkel als hij kennis bevat die een specifieke taak nodig heeft en die Claude niet zelf afleidt. Regels die altijd gelden (testregels, commit- en PR-formaat, testcommando) staan in `CLAUDE.md`, want een skill laadt enkel als het model eraan denkt. Algemene werkwijze (verkennen, plannen, rapporteren, bevestigen vóór een push) doet Claude zelf.

| Skill | Gebruik | Waarom een skill |
|-------|---------|------------------|
| `new-component` | `/new-component vl-naam type` | Somt de bestanden op die je zonder skill vergeet: E2E test, metadata, web-types met tellingen, exports |
| `jira-ticket` | `/jira-ticket omschrijving` | Teamconventies voor titels, `[meta]`-tickets en links; maakt aan na bevestiging (Jira-MCP) |
| `wcag-audit` | `/wcag-audit vl-naam` | Betekenis van het `wcag`-metadataveld, valkuilen specifiek voor shadow DOM, manuele punten niet claimen |
| `flux-check` | `/flux-check` | Toetst de branch-diff in een aparte subagent aan `CLAUDE.md` plus enkele extra regels; aanvulling op `/code-review` |

Houd de `description` kort (maximaal ~160 tekens). Bij langere beschrijvingen vielen er skills uit de listing, en dan roept het model ze niet meer zelf aan.

## Permissies (`settings.json`)

Gemerged in `.claude/settings.local.json` door `set-ai-profile.sh`.

- **allow**: lees-git, lokale git-bewerkingen (add, commit, rebase, reset, …), `pnpm run *`, read-only `gh pr`-commando's en read-only Jira-tools
- **ask** (wint van allow): varianten die werk of stashes weggooien (`git reset --hard`, `git branch -D`, `git stash drop/clear`) en de publish/release-scripts, die door `pnpm run *` anders zonder vraag zouden draaien
- Niet toegelaten, dus altijd een vraag: `git push`, `git restore` (gooit wijzigingen weg), `gh pr create`, Jira-tools die schrijven

## Bestanden

| Bestand | Doel |
|---------|------|
| `CLAUDE.md` | Entrypoint - bevat alle projectcontext en conventies |
| `README.md` | Dit bestand |
| `settings.json` | Permissies, gemerged in `.claude/settings.local.json` |
| `skills/` | Eén map per skill met een `SKILL.md` (doel van de `.claude/skills`-symlink) |
