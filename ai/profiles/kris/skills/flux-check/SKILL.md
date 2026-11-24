---
name: flux-check
description: Conventiecheck van de branch-diff tegen de Flux-regels (code, tokens, WCAG, tests, stories, metadata, commits). Vóór commit of PR; aanvulling op /code-review.
argument-hint: "[base-branch]"
context: fork
---

# Flux-conventiecheck

Base: `$ARGUMENTS`. Leeg: `develop-v2` voor `feature-v2/*` en `develop-v1` voor `feature-v1/*`.

- Branch: !`git branch --show-current`
- Niet gecommit: !`git status --short`
- Gewijzigde bestanden (branch): bepaal ze zelf met `git diff --name-status {base}...HEAD`

## Wat controleren

De regels staan in `CLAUDE.md` (profiel `ai/profiles/kris/CLAUDE.md`). Lees dat bestand en toets de diff (`git diff {base}...HEAD` en `git diff HEAD`) aan elke sectie:
- Component Patterns en Naming
- Testing. Raakt de diff attributen of argTypes, draai dan `pnpm run figma:code-connect:check-attributes`; een fout is blokkerend
- Accessibility
- Form Validation
- Storybook Stories
- Git Workflow: `git log --format='%B' {base}..HEAD` voor subject, body en trailer

Controleer **enkel wat de diff raakt**. Bestaande afwijkingen elders zijn geen bevinding; vermeld ze hoogstens in één info-regel.

Daarnaast, want dit staat niet in `CLAUDE.md`:
- Geen `it.only`, `describe.only`, `cy.pause()`, `console.log` of `debugger` in toegevoegde regels
- Nieuw component: metadata-entry, wt-config-entry, tellingen in `web-types-completeness.spec.ts`, exports in de component-`index.ts` én de type-`index.ts`, Storybook E2E test (zie `/new-component`)
- Geen `*.web-types.json` in de diff

## Bevindingen

- **Verifieer vóór je rapporteert**: open de regel, controleer of een regex of patroon echt matcht op de werkelijke input en of het voorgestelde token of alternatief bestaat. Wat je niet kon bevestigen, is een vraag en geen bevinding.
- Ernst:
  - **Blokkerend**: schendt een harde regel of breekt iets, bv. `@customElement`, een fix zonder regressietest, `it.only`, of een gecommitte `web-types.json`
  - **Aanbevolen**: conventie of kwaliteit
  - **Info**: opmerking zonder actie

```
Flux-check {branch} t.o.v. {base}: X blokkerend, Y aanbevolen, Z info

Blokkerend
- path/to/file.ts:42 - wat er mis is → wat het moet zijn

In orde: {gecontroleerde punten zonder bevindingen}
```

Pas zelf niets aan. Stel de ingebouwde `/code-review` van Claude Code voor als dat nog niet gedraaid werd; die zoekt bugs, deze check zoekt conventies.
