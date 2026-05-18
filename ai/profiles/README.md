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

Claude Code leest een aantal **vaste paden** in de project-root. Voor elk profile wijzen die via symlinks naar de bijbehorende folder — `set-ai-profile.sh` regelt het volledig, maar dit is wat het script onder de motorkap doet:

### Verplicht (Claude Code minimaal werkend)

| Vast pad | Wijst naar |
|----------|--------------|
| `CLAUDE.local.md` (gitignored, géén symlink) | bevat `@ai/profiles/{profile-naam}/CLAUDE.md`, of een marker-commentaar voor opt-out profiles |
| `.claude/settings.local.json` (gitignored) | symlink → `../ai/profiles/{profile-naam}/settings.json` |
| `.claude/skills` (gitignored) | symlink → `../ai/profiles/{profile-naam}/skills` |

> **Belangrijk:** profile-settings cascaderen via `.claude/settings.local.json` (persoonlijk, lokaal). Het bestand `.claude/settings.json` op de project-root is **gecommit en team-wide** — het bevat de SessionStart bootstrap-check hook en wordt door `set-ai-profile.sh` níet aangeraakt. Zie [Team-wide vs persoonlijk](#wat-blijft-team-breed) hieronder.

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

- maakt/vervangt `CLAUDE.local.md` (gewoon bestand, geen symlink) en de symlinks hierboven in één keer
- slaat paden over waarvoor het profile geen bron heeft (bv. een profile zonder `AGENTS.md` krijgt geen `AGENTS.md`-symlink)
- schrijft **altijd** een `CLAUDE.local.md` — ook voor opt-out profiles zonder `CLAUDE.md` (dan met een marker-commentaar zonder `@`-import). De aanwezigheid van het bestand is daarmee een betrouwbare "profile geactiveerd"-marker voor de bootstrap-check in de project-root `CLAUDE.md`
- weigert bestaande **niet-symlink** bestanden/folders op de doelpaden te overschrijven — verplaats of verwijder die manueel als dat nodig is
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
- `.claude/settings.json` (root) — **gecommit** team-wide config: bevat de SessionStart bootstrap-check hook die afdwingt dat elke nieuwe sessie eerst een profile activeert. Hier horen ook permissies die voor het hele team zinvol zijn. Profile-specifieke settings cascaderen er bovenop via `.claude/settings.local.json` (symlink).
- `.gitignore` — regels voor de gitignored symlinks en `CLAUDE.local.md`
- `.claude/plans/`, `.claude/worktrees/` — lokale werkmappen (al gitignored)

## Persoonlijke permissies bovenop het profile

`.claude/settings.local.json` is door `set-ai-profile.sh` ingezet als symlink naar je profile. Als je extra persoonlijke overrides wil die níet in je gecommit profile horen, voeg ze toe aan `~/.claude/settings.json` (user-global — geldt cross-project) of, voor project-specifiek persoonlijk, pas je eigen profile-folder aan.
