# Claude Code Configuration

Dit project gebruikt **AI configuratie via profiles**: er zijn verschillende profile-folders onder `ai/profiles/{profile-naam}/`. Inhoudelijk kan elke profile vrij gestructureerd zijn (splitsen via `CLAUDE.md` + `AGENTS.md` + `SKILLS.md` / alles in één `CLAUDE.md`). De volledige uitleg over de structuur staat in [`ai/profiles/README.md`](ai/profiles/README.md).

## Activeer jouw configuratie

1. Kies of maak een profile-folder onder `ai/profiles/`. Bestaande voorbeelden: `karim/`, `kris/`, `no`.
2. Voer het activatiescript uit met de profile-naam:

   ```bash
   ./set-ai-profile.sh {profile-naam}
   ```

   Dit maakt/vervangt in één keer:
   - `CLAUDE.local.md` (gitignored) met de import `@ai/profiles/{profile-naam}/CLAUDE.md`
   - `.claude/settings.local.json` (gitignored) → de profile-permissies worden hierin **gemerged** (geen symlink). Dit bestand wordt door Claude Code zelf beheerd (het schrijft er jouw "altijd toelaten"-keuzes in); het script laat die keuzes staan en voegt enkel de profile-allowlist toe. Bij een profielwissel wordt de vorige profile-laag weer verwijderd. Vergt `jq`.
   - `.claude/skills` (gitignored) → symlink naar `../ai/profiles/{profile-naam}/skills`
   - `AGENTS.md` / `SKILLS.md` op de project-root — alleen als het profile die bestanden heeft (cross-tool support voor Cursor/Codex/Aider; overslaan als je enkel Claude Code gebruikt)

   Welke permissie-entries het script zelf injecteerde, onthoudt het in `.claude/.profile-injected.json` (gitignored) zodat een profielwissel netjes opruimt zonder jouw eigen keuzes te wissen. Alles blijft per-repo: andere checkouts/worktrees worden nooit geraakt.

   Het bestand `.claude/settings.json` is gecommit en wordt door dit script níet aangeraakt — daarin staan team-wide hooks en eventuele gedeelde permissies (zie [`ai/profiles/README.md`](ai/profiles/README.md)).

3. Herstart Claude Code zodat de nieuwe configuratie geladen wordt.

Zonder `CLAUDE.local.md` worden er geen profile-specifieke instructies geladen — Claude Code start dan met enkel deze loader-tekst. Voor het `no` opt-out profile bevat `CLAUDE.local.md` enkel een marker-commentaar zonder `@`-import; het bestand is er, maar er wordt niets bijkomends ingeladen.

## Bootstrap-check bij sessiestart

Als `CLAUDE.local.md` ontbreekt, vraagt een `SessionStart` hook in het gecommitte `.claude/settings.json` aan de AI agent om eerst een profile te (laten) activeren voor er aan de vraag van de gebruiker wordt begonnen. De hook bevat de exacte stappen — geen manuele opvolging nodig, ook niet bij een verse `git clone`.

## Niet personaliseerbaar

- `.claude/settings.json` — **gecommit** team-wide config: bootstrap-check hook + eventuele gedeelde permissies. Wijzig dit enkel als de aanpassing voor het hele team relevant is.
- `.claude/settings.local.json` — gitignored, **door Claude Code zelf beheerd** (jouw "altijd toelaten"-keuzes). `set-ai-profile.sh` mergt de profile-allowlist erin en laat de rest staan. Geen symlink (zou keuzes naar git lekken en in worktrees botsen).
- `.claude/.profile-injected.json` — gitignored geheugenbriefje: welke permissie-entries het script injecteerde, voor nette opkuis bij een profielwissel. Niet manueel bewerken.
- `.claude/plans/`, `.claude/worktrees/` — lokale werkmappen, gitignored
