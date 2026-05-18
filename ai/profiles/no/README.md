# `no` — leeg profile (opt-out)

Dit profile bevat **bewust geen `CLAUDE.md` en geen `skills/`**. Het is bedoeld om Claude Code in dit project te draaien zonder project-specifieke AI-instructies of skills te laden.

## Wat zit erin

| Bestand | Doel |
|---------|------|
| `README.md` | Dit bestand |
| `settings.json` | Minimale, gedeelde permissies (target van `.claude/settings.json` symlink, optioneel) |

Geen `CLAUDE.md`, geen `AGENTS.md`, geen `SKILLS.md`, geen `skills/` folder.

## Activeren

```bash
./set-ai-profile.sh no
```

Het script regelt alles in één keer:

- **`CLAUDE.local.md`** — wordt geschreven met een marker-commentaar (`# profile: no (geen CLAUDE.md — opt-out)`). Geen `@`-import, want er is niets om te importeren. De aanwezigheid van het bestand dient enkel als signaal voor de bootstrap-check dat een profile bewust gekozen is.
- **`.claude/settings.json`** → symlink naar deze minimale `settings.json` (kan handig zijn voor gedeelde permissies).
- **`.claude/skills`** wordt **niet** aangemaakt — er is geen skills-folder om naar te wijzen.

## Wanneer kiezen?

- Je gebruikt Claude Code op dit project, maar wil geen Flux-specifieke instructies of skills laden
- Je test of evalueert Claude Code-gedrag zonder profile-overrides
- Je werkt tijdelijk in een isolerende context (debugging, vergelijking, …)

Voor alle overige profile-info: zie [`ai/profiles/README.md`](../README.md).
