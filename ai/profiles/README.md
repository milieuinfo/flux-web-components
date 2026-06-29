# AI configuratie profiles

Deze folder bevat meerdere profiles met geïsoleerde AI configuratie. Elke subfolder is **volledig autonoom**: een profile bepaalt zelf welke bestanden het bevat en kan vrij aangepast worden zonder andere profiles te beïnvloeden. Een profile kan persoonlijk zijn (bv. `kris/`, `karim/`), maar evengoed een thema vertegenwoordigen (bv. een `agents`-profile, of het `no/` opt-out profile).

## Folderstructuur (drie voorbeeldstijlen)

```
ai/profiles/
├── README.md          # dit bestand
├── karim/             # "klassieke" splitsing voor cross-tool support
│   ├── CLAUDE.md      # loader, @-import van AGENTS.md + SKILLS.md
│   ├── AGENTS.md      # projectcontext, agent-agnostisch
│   ├── SKILLS.md      # playbooks, agent-agnostisch
│   ├── README.md      # eigen notities
│   ├── settings.json  # gedeelde permissies
│   └── skills/        # skill stubs naar SKILLS.md
├── kris/              # "Claude-Code-only" — alles in CLAUDE.md, echte skill-content
│   ├── CLAUDE.md      # entrypoint mét volledige projectcontext en conventies
│   ├── README.md      # eigen notities + uitleg afwijkingen
│   ├── settings.json  # gedeelde permissies
│   └── skills/        # skill-files met inline content (geen stubs)
└── no/                # opt-out — geen project-instructies, geen skills
    ├── README.md      # uitleg bij dit lege profile
    └── settings.json  # minimale permissies
```

De meeste profiles hebben een `CLAUDE.md` als entrypoint, maar het kan ook bewust ontbreken (zie `no/` voor een opt-out profile zonder project-instructies of skills).

## Welke paden moeten waarheen wijzen?

Claude Code leest een aantal **vaste paden** in de project-root. `set-ai-profile.sh` regelt het volledig, maar dit is wat het script onder de motorkap doet:

### Verplicht (Claude Code minimaal werkend)

| Vast pad | Hoe gevuld |
|----------|--------------|
| `CLAUDE.local.md` (gitignored, géén symlink) | bevat `@ai/profiles/{profile-naam}/CLAUDE.md`, of een marker-commentaar voor opt-out profiles |
| `.claude/settings.local.json` (gitignored, géén symlink) | de profile-allowlist wordt erin **gemerged** (zie waarschuwing hieronder) |
| `.claude/skills` (gitignored) | symlink → `../ai/profiles/{profile-naam}/skills` |

> **Belangrijk — waarom `settings.local.json` geen symlink is:** dit bestand wordt door **Claude Code zelf beheerd**: het programma schrijft er jouw "altijd toelaten"-permissiekeuzes in weg. Een symlink naar de profile-folder zou (1) die runtime-keuzes naar de gecommitte profile-folder laten lekken en (2) in worktrees botsen omdat het bestand daar al bestaat. Daarom **mergt** het script in plaats daarvan de profile-allowlist erin: bestaande keuzes blijven staan, de profile-allowlist wordt toegevoegd, en bij een profielwissel wordt enkel de vorige profile-laag verwijderd. Het script onthoudt zijn eigen injecties in `.claude/.profile-injected.json` (gitignored). De merge vergt `jq` en gebeurt **enkel** bij het draaien van `set-ai-profile.sh` — verder raakt niets dit bestand aan, en alleen de huidige repo/worktree wordt geraakt.
>
> Het bestand `.claude/settings.json` op de project-root is **gecommit en team-wide** — het bevat de SessionStart bootstrap-check hook en wordt door `set-ai-profile.sh` níet aangeraakt. Zie [Team-wide vs persoonlijk](#wat-blijft-team-breed) hieronder.

### Optioneel (enkel voor cross-tool support — Cursor, Codex, Aider, …)

| Vast pad | Wijst naar                                |
|----------|---------------------------------------------|
| `AGENTS.md` (root) | symlink → `ai/profiles/{profile-naam}/AGENTS.md` |
| `SKILLS.md` (root) | symlink → `ai/profiles/{profile-naam}/SKILLS.md` |

Alle gitignored paden staan in `.gitignore` zodat ze lokaal naar het gewenste profile kunnen wijzen — per checkout te kiezen.

## Een profile activeren of switchen

Gebruik altijd het meegeleverde script vanuit de project-root:

```bash
./set-ai-profile.sh {profile-naam}
```

Het script:

- maakt/vervangt `CLAUDE.local.md` (gewoon bestand, geen symlink), mergt de profile-allowlist in `.claude/settings.local.json`, en zet de symlinks hierboven — in één keer
- slaat paden over waarvoor het profile geen bron heeft (bv. een profile zonder `AGENTS.md` krijgt geen `AGENTS.md`-symlink)
- schrijft **altijd** een `CLAUDE.local.md` — ook voor opt-out profiles zonder `CLAUDE.md` (dan met een marker-commentaar zonder `@`-import). De aanwezigheid van het bestand is daarmee een betrouwbare "profile geactiveerd"-marker voor de bootstrap-check in de project-root `CLAUDE.md`
- weigert bestaande **niet-symlink** bestanden/folders op de symlink-doelpaden (`.claude/skills`, `AGENTS.md`, `SKILLS.md`) te overschrijven — verplaats of verwijder die manueel als dat nodig is. `.claude/settings.local.json` wordt niet geweigerd maar gemerged; een achtergebleven symlink van de oude aanpak wordt automatisch vervangen door een echt bestand
- **moet uitgevoerd worden, niet gesourced** (anders kan een fout je shell afsluiten en blijven env-wijzigingen plakken)

Na afloop: **herstart Claude Code** zodat de nieuwe configuratie geladen wordt.

## Eerste keer opzetten (nieuw profile)

1. **Kopieer een bestaand profile als startpunt** — kies de stijl die bij je past:

   ```bash
   # Klassieke splitsing (cross-tool ready)
   cp -R ai/profiles/karim ai/profiles/{jouw-naam}

   # Of: alles-in-CLAUDE.md (alleen Claude Code)
   cp -R ai/profiles/kris  ai/profiles/{jouw-naam}
   ```

2. **Activeer jouw profile:**

   ```bash
   ./set-ai-profile.sh {jouw-naam}
   ```

3. **Pas jouw profile aan zoals je wil.** Wijzigingen worden gecommit in jouw folder en raken niemand anders.

## Wat blijft team-breed?

- `CLAUDE.md` (root) — generieke loader, identiek voor iedereen
- `.claude/settings.json` (root) — **gecommit** team-wide config: bevat de SessionStart bootstrap-check hook die afdwingt dat elke nieuwe sessie eerst een profile activeert. Hier horen ook permissies die voor het hele team zinvol zijn. Profile-specifieke permissies worden er bovenop gemerged in `.claude/settings.local.json` (geen symlink — zie hierboven).
- `.gitignore` — regels voor de gitignored symlinks en `CLAUDE.local.md`
- `.claude/plans/`, `.claude/worktrees/` — lokale werkmappen (al gitignored)

## Team-brede conventie: AI-ondertekening van commits

Onafhankelijk van welk profile je gebruikt geldt één gedeelde afspraak over commits:

- **Subject en body** beschrijven enkel de codewijziging — geen metadata in de boodschap zelf.
- **Bij AI-betrokkenheid is ondertekening verplicht.** Als AI meewerkte aan een wijziging, onderteken je de commit met een `Co-Authored-By`-trailer die **het effectief gebruikte model** benoemt:

  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```

- Gebruik het model dat effectief gebruikt werd (bv. `Claude Opus 4.8`, `Claude Sonnet 4.6`, `Claude Haiku 4.5`) — nooit een vaste placeholder of een model dat niet gebruikt werd.
- Dit is de **enige** toegelaten trailer; geen andere attribution of metadata.
- Een puur manuele commit (geen AI) krijgt geen trailer.

De concrete uitwerking staat per profile in de commit-sectie (`karim/AGENTS.md`, `kris/CLAUDE.md`, `koen/CLAUDE.md`). Het `no/` opt-out profile laadt geen instructies en valt hier dus buiten.

## Persoonlijke permissies bovenop het profile

`.claude/settings.local.json` bevat na activatie de profile-allowlist (gemerged) plus de permissiekeuzes die je tijdens het werken met "altijd toelaten" goedkeurt. Die laatste blijven lokaal en per-repo, en overleven een profielwissel. Wil je extra persoonlijke overrides die níet in je gecommit profile horen én in álle projecten gelden, voeg ze dan toe aan `~/.claude/settings.json` (user-global). Wil je project-specifiek persoonlijke permissies die wél in de repo gecommit worden, pas dan je eigen profile-folder (`settings.json`) aan.
