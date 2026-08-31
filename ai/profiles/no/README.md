# `no` — leeg profile (opt-out)

Dit profile bevat **bewust niets**: geen `CLAUDE.md`, geen `skills/`, geen `settings.json`. Het is bedoeld om Claude Code in dit project te draaien zonder project-specifieke AI-instructies, skills of permissies te laden.

## Activeren

```bash
./set-ai-profile.sh no
```

Het script:

- schrijft **`CLAUDE.local.md`** met enkel een marker-commentaar (`# profile: no (geen CLAUDE.md — opt-out)`). Geen `@`-import, want er is niets om te importeren. De aanwezigheid van het bestand dient enkel als signaal voor de bootstrap-check dat een profile bewust gekozen is.
- **ruimt de permissielaag van het vorige profile op** in `.claude/settings.local.json`. Jouw eigen "altijd toelaten"-keuzes blijven staan; enkel wat het script eerder injecteerde verdwijnt.
- maakt **geen** `.claude/skills`-symlink en **geen** root-`AGENTS.md` — er is geen bron om naar te wijzen. Achtergebleven symlinks van een vorig profile worden verwijderd.

Team-wide config blijft uiteraard gelden: `.claude/settings.json` (gecommit, met de bootstrap-check hook) wordt door het script niet aangeraakt.

## Wanneer kiezen?

- Je gebruikt Claude Code op dit project, maar wil geen Flux-specifieke instructies of skills laden
- Je test of evalueert Claude Code-gedrag zonder profile-overrides
- Je werkt tijdelijk in een isolerende context (debugging, vergelijking, …)

Voor alle overige profile-info: zie [`ai/profiles/README.md`](../README.md).
