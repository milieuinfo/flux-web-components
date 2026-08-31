# AI configuratie profiles

Deze folder bevat meerdere profiles met geïsoleerde AI configuratie. Elke subfolder is **volledig autonoom**: een profile bepaalt zelf welke bestanden het bevat en kan vrij aangepast worden zonder andere profiles te beïnvloeden. Een profile kan persoonlijk zijn (bv. `kris/`, `karim/`, `koen/`), maar evengoed een thema vertegenwoordigen (bv. het `no/` opt-out profile).

## Folderstructuur

```
ai/profiles/
├── README.md          # dit bestand
├── karim/             # splitsing CLAUDE.md + AGENTS.md (cross-tool)
│   ├── CLAUDE.md      # loader, @-import van AGENTS.md
│   ├── AGENTS.md      # projectcontext, agent-agnostisch
│   ├── README.md      # eigen notities
│   ├── settings.json  # gedeelde permissies
│   └── skills/        # één map per skill, met SKILL.md
├── kris/              # "Claude-Code-only" — alles in CLAUDE.md
│   ├── CLAUDE.md      # entrypoint mét volledige projectcontext en conventies
│   ├── README.md      # eigen notities + uitleg afwijkingen
│   ├── settings.json  # gedeelde permissies
│   └── skills/
├── koen/              # zoals kris/, met extra mindset- en Figma-secties
│   └── …
└── no/                # opt-out — geen instructies, geen skills, geen permissies
    └── README.md      # uitleg bij dit lege profile
```

Elk onderdeel is optioneel: het activatiescript slaat over wat een profile niet heeft (zie `no/` voor een profile dat enkel een `README.md` bevat).

## Skills: verplichte structuur

Claude Code ontdekt een skill **alleen** als een map met een `SKILL.md` erin:

```
skills/
├── new-component/
│   └── SKILL.md
├── run-tests/
│   └── SKILL.md
└── test-coverage/
    └── SKILL.md
```

Een los `.md`-bestand rechtstreeks in `skills/` (bv. `skills/run-tests.md`) wordt **stilzwijgend genegeerd** — geen foutmelding, de skill bestaat gewoon niet. De mapnaam bepaalt de slash-command (`/run-tests`).

Relevante frontmatter-velden:

| Veld | Betekenis |
|------|-----------|
| `name` | Skill-naam; houd gelijk aan de mapnaam |
| `description` | Bepaalt wanneer het model de skill inroept — dit is het enige wat permanent in context zit |
| `user-invocable: false` | Geen slash-command; het model kan de skill nog wel zelf inroepen (bv. `test-coverage`) |
| `disable-model-invocation: true` | Omgekeerd: enkel via `/naam`, het model roept ze nooit uit zichzelf aan |

Skill-inhoud wordt **lazy** geladen: enkel de `description` staat in context tot de skill effectief draait. Projectcontext die altijd nodig is hoort dus in `CLAUDE.md`/`AGENTS.md`, niet in een skill.

## Welke paden moeten waarheen wijzen?

Claude Code leest een aantal **vaste paden** in de project-root. `set-ai-profile.sh` regelt het volledig, maar dit is wat het script onder de motorkap doet:

### Verplicht (Claude Code minimaal werkend)

| Vast pad | Hoe gevuld |
|----------|--------------|
| `CLAUDE.local.md` (gitignored, géén symlink) | bevat `@ai/profiles/{profile-naam}/CLAUDE.md`, of een marker-commentaar voor opt-out profiles |
| `.claude/settings.local.json` (gitignored, géén symlink) | de profile-permissies worden erin **gemerged** (zie waarschuwing hieronder) |
| `.claude/skills` (gitignored) | symlink → `../ai/profiles/{profile-naam}/skills` |

> **Belangrijk — waarom `settings.local.json` geen symlink is:** dit bestand wordt door **Claude Code zelf beheerd**: het programma schrijft er jouw "altijd toelaten"-permissiekeuzes in weg. Een symlink naar de profile-folder zou (1) die runtime-keuzes naar de gecommitte profile-folder laten lekken en (2) in worktrees botsen omdat het bestand daar al bestaat. Daarom **mergt** het script in plaats daarvan de profile-permissies erin: bestaande keuzes blijven staan, de profile-permissies worden toegevoegd, en bij een profielwissel wordt enkel de vorige profile-laag verwijderd. Het script onthoudt zijn eigen injecties in `.claude/.profile-injected.json` (gitignored). De merge vergt `jq` en gebeurt **enkel** bij het draaien van `set-ai-profile.sh` — verder raakt niets dit bestand aan, en alleen de huidige repo/worktree wordt geraakt.
>
> Het bestand `.claude/settings.json` op de project-root is **gecommit en team-wide** — het bevat de SessionStart bootstrap-check hook en wordt door `set-ai-profile.sh` níet aangeraakt. Zie [Team-wide vs persoonlijk](#wat-blijft-team-breed) hieronder.

### Optioneel (enkel voor cross-tool support — Cursor, Codex, Aider, …)

| Vast pad | Wijst naar                                |
|----------|---------------------------------------------|
| `AGENTS.md` (root) | symlink → `ai/profiles/{profile-naam}/AGENTS.md` |

Enkel `karim/` gebruikt dit. Claude Code leest zowel `CLAUDE.md` als `AGENTS.md` automatisch; andere tools kennen enkel `AGENTS.md`.

Alle gitignored paden staan in `.gitignore` zodat ze lokaal naar het gewenste profile kunnen wijzen — per checkout te kiezen.

## Een profile activeren of switchen

Gebruik altijd het meegeleverde script vanuit de project-root:

```bash
./set-ai-profile.sh {profile-naam}
```

Het script:

- maakt/vervangt `CLAUDE.local.md` (gewoon bestand, geen symlink), mergt de profile-permissies in `.claude/settings.local.json`, en zet de symlinks hierboven — in één keer
- slaat paden over waarvoor het profile geen bron heeft (bv. een profile zonder `AGENTS.md` krijgt geen `AGENTS.md`-symlink)
- ruimt de permissielaag van het vorige profile **altijd** op, ook bij een wissel naar een profile zónder `settings.json` (zoals `no/`)
- schrijft **altijd** een `CLAUDE.local.md` — ook voor opt-out profiles zonder `CLAUDE.md` (dan met een marker-commentaar zonder `@`-import). De aanwezigheid van het bestand is daarmee een betrouwbare "profile geactiveerd"-marker voor de bootstrap-check in de project-root `CLAUDE.md`
- weigert bestaande **niet-symlink** bestanden/folders op de symlink-doelpaden (`.claude/skills`, `AGENTS.md`) te overschrijven — verplaats of verwijder die manueel als dat nodig is. `.claude/settings.local.json` wordt niet geweigerd maar gemerged; een achtergebleven symlink van de oude aanpak wordt automatisch vervangen door een echt bestand
- **moet uitgevoerd worden, niet gesourced** (anders kan een fout je shell afsluiten en blijven env-wijzigingen plakken)

Na afloop: **herstart Claude Code** zodat de nieuwe configuratie geladen wordt.

## Eerste keer opzetten (nieuw profile)

1. **Kopieer een bestaand profile als startpunt** — kies de stijl die bij je past:

   ```bash
   # Splitsing CLAUDE.md + AGENTS.md (cross-tool ready)
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

`.claude/settings.local.json` bevat na activatie de profile-permissies (gemerged) plus de permissiekeuzes die je tijdens het werken met "altijd toelaten" goedkeurt. Die laatste blijven lokaal en per-repo, en overleven een profielwissel. Wil je extra persoonlijke overrides die níet in je gecommit profile horen én in álle projecten gelden, voeg ze dan toe aan `~/.claude/settings.json` (user-global). Wil je project-specifiek persoonlijke permissies die wél in de repo gecommit worden, pas dan je eigen profile-folder (`settings.json`) aan.
