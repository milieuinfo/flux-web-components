# Claude Code Configuration

See `AGENTS.md` for full project context, conventions, and patterns, and `SKILLS.md` for shared skill playbooks.

## Claude-Specific Settings

- `.claude/settings.json` — shared team permissions (auto-approved commands)
- `.claude/settings.local.json` — personal permissions (gitignored)

## Skill Overrides

- **Plans opslaan in `.claude/plans/`**, NIET in `docs/plans/` — `docs/` is voor projectdocumentatie (Storybook)
