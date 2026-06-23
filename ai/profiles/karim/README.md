# AI Agent Configuratie

Deze directory bevat Claude Code-specifieke configuratiebestanden.

## Bestandsstructuur

```
project root/
├── AGENTS.md                     # Projectcontext en richtlijnen voor alle AI agents
├── SKILLS.md                     # Agent-agnostische playbooks voor project skills
├── CLAUDE.md                     # Claude Code-specifieke configuratie
└── .claude/
    ├── settings.json             # Gedeelde team-permissies (committed naar git)
    ├── settings.local.json       # Persoonlijke instellingen (gitignored)
    ├── skills/                   # Project skills (Claude Code) (git committed)
    ├── README.md                 # Dit bestand
    └── worktrees/                # Lokale worktree tracking (gitignored)
```

- `AGENTS.md` — wordt gelezen door alle AI agents (Claude Code, Cursor, Cline, ...) en bevat projectcontext, conventies en patronen.
- `SKILLS.md` — wordt gebruikt als gedeelde, agent-agnostische playbook voor project skills.
- `CLAUDE.md` — wordt automatisch ingelezen door Claude Code, verwijst naar `AGENTS.md` en bevat Claude-specifieke commando's.

## Wat wordt gecommit vs. gitignored?

### Gitignored (persoonlijk/lokaal)

- `settings.local.json` — persoonlijke permissies
- `worktrees/` — lokale worktree tracking
- API keys of credentials
- Lokale paden specifiek voor jouw machine

**Voorbeeld van lokale instellingen:**
```json
{
  "permissions": {
    "allow": [
      "Bash(git -C /Users/jouwnaam/pad/naar/project ...)",
      "Bash(npx cypress run ...)"
    ]
  }
}
```

### Gecommit (gedeeld)

- `settings.json` — gedeelde team-permissies voor veelgebruikte commando's
- `AGENTS.md` (project root) — gedeelde richtlijnen, context en patronen

## Hoe Claude Code deze bestanden gebruikt

1. **Leest `CLAUDE.md`** (project root) voor Claude-specifieke configuratie
2. **Leest `AGENTS.md`** (project root) voor volledige projectcontext
3. **Leest `settings.json`** voor gedeelde team-permissies (automatisch goedgekeurde commando's)
4. **Leest `settings.local.json`** voor persoonlijke permissies (indien aanwezig)
5. **Merged settings** — lokale instellingen hebben voorrang

## Available skills

Claude Code ontdekt skills automatisch uit `.claude/skills/`. De skill-bestanden zijn discovery stubs die verwijzen naar de volledige playbooks in `SKILLS.md` (project root).

- `/new-component` (`.claude/skills/new-component.md`) — scaffold een nieuwe Flux web component. Playbook: `SKILLS.md` → "New Component Scaffolding".
- `/run-tests` (`.claude/skills/run-tests.md`) — run Cypress component tests. Playbook: `SKILLS.md` → "Run Component Tests".
- `test-coverage` (`.claude/skills/test-coverage.md`) — wordt automatisch aangeroepen bij features/fixes (niet user-invocable). Playbook: `SKILLS.md` → "Test Coverage Enforcement".

## Lokale configuratie instellen

1. **Maak `settings.local.json` aan** met je persoonlijke permissies:
   ```json
   {
     "permissions": {
       "allow": [
         "Bash(git -C /volledig/pad/naar/project ...)",
         "Bash(npx cypress run --component ...)"
       ]
     }
   }
   ```

2. **Commit nooit** `settings.local.json` (staat al in `.gitignore`)

## Best practices

1. **Gebruik relatieve patronen** in gedeelde settings, absolute paden in lokale
2. **Documenteer waarom** bepaalde commando's zijn toegestaan in gedeelde settings
3. **Houd credentials buiten** alle settings-bestanden
4. **Update `AGENTS.md`** bij nieuwe patronen of conventies
5. **Review gedeelde settings** tijdens team meetings of PR reviews

## Gedeelde settings bijwerken

Wanneer je nuttige patronen of conventies ontdekt:

1. Voeg ze toe aan `settings.json` of `AGENTS.md`
2. Zorg dat ze geen persoonlijke/lokale informatie bevatten
3. Commit en push zodat het team ervan profiteert
4. Deel met het team, als het een belangrijke wijziging is

## Problemen oplossen

### AI agent vraagt herhaaldelijk om permissies

Voeg het commando-patroon toe aan je `settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(command-pattern:*)"
    ]
  }
}
```

### Settings worden niet opgepikt

1. Controleer of het bestand geldige JSON is
2. Herstart Claude Code
3. Controleer bestandsrechten (moet leesbaar zijn)

## Vragen?

Voor vragen over AI agent configuratie, vraag het team of raadpleeg:
- Claude Code docs: https://github.com/anthropics/claude-code
