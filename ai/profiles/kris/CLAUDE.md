# Kris — Claude Code configuratie (Flux Web Components)

Projectcontext en conventies voor Claude Code werkend op Flux Web Components v2 — een Lit-gebaseerde web-componentenbibliotheek (TypeScript, Cypress, Storybook, `@domg/govflanders-style` design tokens, npm-scope `@domg-wc`).

Componenten zitten onder `libs/components/src/{atom,block,form,compliance}/`. Bekijk altijd eerst een bestaand sibling-component van hetzelfde type vóór je nieuwe code schrijft of bestaande wijzigt.

## Component Patterns

Componenten extenden basisklassen uit `@domg-wc/common`, **niet** `LitElement` rechtstreeks:

- **BaseLitElement** — zie `libs/components/src/atom/button/vl-button.component.ts`
- **BaseHTMLElement** (HTML template strings) — zie `libs/components/src/compliance/cookie-consent/vl-cookie-consent.component.ts`
- **FormControl** (form components, extends `FormControlMixin(BaseLitElement)`) — zie `libs/components/src/form/input-field/vl-input-field.component.ts`
- **Defaults pattern** — zie `libs/components/src/atom/button/vl-button.defaults.ts`

Regels:
- Gebruik altijd `@webComponent()` uit `@domg-wc/common`, niet `@customElement()` uit Lit — bevat eigen registratielogica
- Gebruik Lit decorators (`@property`, `@state`, `@query`, `@queryAll`) waar mogelijk
- Custom events krijgen `vl-` prefix, dispatched met `bubbles: true, composed: true`
- Shadow DOM altijd; styles via `@domg/govflanders-style`; nooit raw colors of hardcoded spacing — altijd CSS custom properties (design tokens)
- De meeste componenten ondersteunen een `custom-css` attribuut voor externe tweaks

## Naming Conventions

| Item | Patroon |
|------|---------|
| Component tag | `vl-component-name` (kebab-case, `vl-` prefix) |
| Class | `VlComponentName` of `VlComponentNameComponent` |
| Component file | `vl-component-name.component.ts` |
| Defaults | `vl-component-name.defaults.ts` |
| Tests | `vl-component-name.component.cy.ts` |
| Stories | `vl-component-name.stories.ts` (in `stories/` subdir) |
| Story args | `vl-component-name.stories-arg.ts` (singular `arg`) |
| Story docs | `vl-component-name.stories-doc.mdx` |

## Testing (Cypress Component Tests)

Conventies:
- Tests in **Engels**, beginnen met "should"
- Test gerenderde HTML, geen interne methods
- Gebruik data uit stories/fixtures; fixtures in `storybook-e2e/src/fixtures` voor herbruikbaarheid
- A11y: `cy.injectAxe()` + `cy.checkA11y('vl-component-name')`
- Keyboard: `cy.press(Cypress.Keyboard.Keys.TAB)`
- Referentie: `libs/components/src/atom/button/vl-button.component.cy.ts`

**Uitvoeren** → `/run-tests` skill.
**Wanneer tests vereist zijn** (feature/bugfix) → `test-coverage` skill (auto-invoked).

## Accessibility (WCAG 2.2 AA)

- Contrast: 4.5:1 voor tekst, 3:1 voor grote tekst/UI-componenten
- Nooit kleur alleen om informatie over te dragen
- Form controls altijd een label (via `<vl-form-label for="...">` of `label`-attribuut)
- Foutmeldingen specifiek en actiegericht:
  - **Niet:** "E-mail adres is niet juist."
  - **Wel:** "Vul een geldig e-mailadres in. Bijvoorbeeld: omgeving@vlaanderen.be"
- `placeholder` enkel voor voorbeeldwaarden, nooit als label
- `autocomplete` correct zetten (`off` als er geen relevante suggestie is)

## Form Validation

Form-componenten gebruiken HTML5 Constraint Validation API met `ValidityState`:
- Constraints: `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `customError`
- Foutmeldingen via `vl-form-message`
- Form containers: class `vl-form`; action groups: `vl-action-group`
- Gebruik `parseFormData()` voor formuliergegevens (import uit `@domg-wc/components/form`)

## Storybook Stories

Per component **3 files** in `libs/components/src/{type}/{component}/stories/`:

1. `vl-{name}.stories.ts` — story definities en templates
2. `vl-{name}.stories-arg.ts` — args en argTypes (singular `arg`)
3. `vl-{name}.stories-doc.mdx` — documentatiepagina (Nederlands)

**Template regels:**
- `story()` helper uit `@resources/utils-storybook` (filtert default args uit source)
- Args alfabetisch sorteren tenzij logische volgorde
- Boolean attributes: `?disabled=${disabled}`
- Properties: `.steps=${steps}`
- Events: `@vl-click-step=${handler}`
- Slots: `${unsafeHTML(defaultSlot)}` (anders escaped)
- Story-naam: `[Component]+[Variant]` (bv. `ButtonPrimary`)
- ArgTypes-categorieën: `CATEGORIES.ATTRIBUTES | PROPERTIES | SLOTS | EVENTS`

Referentie: `libs/components/src/atom/button/stories/`.

**Bij nieuw component:** voeg entry toe in `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`.

**Vóór commit visueel verifiëren in Storybook** (`npm run apps:storybook:dev`, http://localhost:8080):
- Component rendert, alle varianten werken, controls reageren, geen console errors
- Veelvoorkomende fouten: ontbrekende imports, slots zonder `unsafeHTML`, properties zonder `.` prefix, template zonder `story()` helper

## Git Workflow

- Feature branches: `feature-v2/FLUX-XXX-short-description`
- Base branch: `develop-v2`; main: `main` (protected)
- PR's targeten `develop-v2`, met FLUX-ticket in titel en JIRA-link in beschrijving

**Commit messages** beschrijven enkel de codewijziging — geen attribution, geen trailers, geen metadata.

**Format:** `feat|fix: FLUX-XXX - component name - beschrijving in Nederlands`

- Enkel `feat:` (nieuwe features/uitbreidingen) of `fix:` (bugfixes); andere types (`chore:` etc.) zijn voor het buildsysteem
- 1 ticket = 1 feature branch = 1 squashed commit (tenzij meerdere distincte tickets in 1 branch)
- Component-naam vermelden (bv. `vl-upload`, `vl-side-navigation-next`)
- A11y-werk: "WCAG verbeteringen" in beschrijving

**Voorbeelden:**
- `feat: FLUX-576 - vl-alert - multiline attribuut toegevoegd`
- `fix: FLUX-592 - vl-spotlight, vl-infotext, vl-doormat - extern icoon inline na titel geplaatst`
- `fix: FLUX-585 - flaky testen stabiel gemaakt`

## Werkafspraken

- **Plans opslaan in `.claude/plans/`**, NIET in `docs/plans/` (`docs/` is voor projectdocumentatie / Storybook)

## Skills

Automatisch ontdekt via `skills/`:
- `/new-component` — scaffold een nieuwe Flux web component (procedure + alle vereiste files)
- `/run-tests` — Cypress component tests draaien voor één component of voor alle componenten
- `test-coverage` (auto-invoked) — regels voor wanneer tests of regressietests vereist zijn
