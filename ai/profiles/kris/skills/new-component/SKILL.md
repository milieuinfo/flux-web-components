---
name: new-component
description: Scaffold een nieuw Flux component (vl-*) met code, flux-css, tests, stories, metadata, web-types en exports.
argument-hint: <vl-naam> <atom|block|form|compliance>
---

# Nieuw component scaffolden

Argumenten: `$ARGUMENTS`. Verwacht een naam in kebab-case met `vl-`-prefix en een type (`atom` | `block` | `form` | `compliance`). Ontbreekt er iets, vraag het dan. Bestaat de tag al (`grep -r "'vl-xxx'" libs/`), stop dan.

## Namen (voorbeeld `vl-info-tile`, type `block`)

| Wat | Waarde |
|-----|--------|
| Map | `libs/components/src/block/info-tile/` |
| Class | `VlInfoTileComponent` |
| Defaults / styles | `infoTileDefaults` / `vlInfoTileFluxStyles` |
| Args / ArgTypes | `infoTileArgs` / `infoTileArgTypes` |
| Story id / title | `components-block-info-tile` / `Components - Block/info-tile` |
| Default story | `InfoTileDefault` → story-URL-id `components-block-info-tile--info-tile-default` |

## Bestanden

Kopieer structuur, imports en stijl van een sibling van hetzelfde type (`atom/button`, `block/progress-bar`, `form/checkbox`, `compliance/privacy`), met twee uitzonderingen:

- **Registratie** altijd met `@webComponent()` uit `@domg-wc/common`. Sommige siblings (bv. `vl-progress-bar`) gebruiken ten onrechte `@customElement()`.
- **Properties** met `@property`/`@state`-decorators zoals in `block/next/tabs/vl-tab.component.ts`, ook al gebruiken de meeste siblings nog `static get properties()`.

In de componentmap:
1. `vl-{naam}.defaults.ts`
2. `vl-{naam}.component.ts`, met `declare global { interface HTMLElementTagNameMap }` onderaan
3. `vl-{naam}.flux-css.ts`
4. `index.ts` met de export van de class. **Vergeet ook niet** de export in `libs/components/src/{type}/index.ts`
5. `vl-{naam}.component.cy.ts`: minstens `should mount`, `should be accessible` en een test per attribuut, slot en event
6. `stories/`: `.stories.ts`, `.stories-arg.ts` (elke slot en elk event gedocumenteerd, events via `action()`) en `.stories-doc.mdx` met `<FluxComponentMetaData id="components-{type}-{naam}"/>` en de secties Doel, Voorbeeld, Configuratie, Varianten

Daarbuiten, en dit wordt het vaakst vergeten:

7. **Storybook E2E test**: `apps/storybook-e2e/src/e2e/components/{type}/{naam}/vl-{naam}.stories.cy.ts`, één `describe` per story, zoals `…/atom/button/vl-button.stories.cy.ts`
8. **Metadata**: entry `components-{type}-{naam}` in `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`. Velden en toegelaten waarden staan in `flux-meta-data.model.ts`; lees die, want ze veranderen. Voor een nieuw component: `"base": "LitElement"`, `"generation": "v2"`, `"css": "Flux"`, `"tests": ["Component", "Storybook"]`, `"documentation": "basis"`, `"wcag": "TODO"`, `"jiraMeta"`: het meta-ticket of `"geen"`
9. **Web-types**:
   - voeg `buildWTConfig('vl-{naam}', {naam}ArgTypes, '<pad naar stories-doc.mdx>', '/docs/components-{type}-{naam}--documentatie')` alfabetisch toe in `resources/generate-web-types/wt-config-build/components-{type}.wt-config.ts`
   - `pnpm run libs:web-types:generate` en daarna `pnpm run libs:web-types:validate`
   - de validatie faalt op de tellingen in `resources/generate-web-types/wt-validate-completeness/web-types-completeness.spec.ts`. Zijn de lijsten `...WCWithoutWT` en `...WTWithoutWC` leeg, zet dan `components{Type}WCNameCount` en `...WTNameCount` op de nieuwe waarden. Anders ontbreekt er een entry
   - zet de gegenereerde bestanden terug: `git restore 'libs/**/*.web-types.json'`

## Verifiëren

- Component test groen (commando in `CLAUDE.md`)
- E2E: start Storybook in de achtergrond (`pnpm run apps:storybook:dev`, wacht op http://localhost:8080), dan `cd apps/storybook-e2e && ../../node_modules/.bin/cypress run --e2e --spec "src/e2e/components/{type}/{naam}/vl-{naam}.stories.cy.ts"`
- Web-types-validatie groen
- Vraag de gebruiker de stories visueel te checken (docs-pagina, controls, console zonder errors)
