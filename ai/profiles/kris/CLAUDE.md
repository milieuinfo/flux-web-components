# Kris - Claude Code configuratie (Flux Web Components)

Projectcontext en conventies voor Claude Code werkend op Flux Web Components v2 - een Lit-gebaseerde web-componentenbibliotheek (TypeScript, Cypress, Storybook, `@domg/govflanders-style` design tokens, npm-scope `@domg-wc`).

Componenten zitten onder `libs/components/src/{atom,block,form,compliance}/`. Bekijk altijd eerst een bestaand sibling-component van hetzelfde type vóór je nieuwe code schrijft of bestaande wijzigt.

## Component Patterns

Componenten extenden basisklassen uit `@domg-wc/common`, **niet** `LitElement` rechtstreeks:

- **BaseLitElement** - zie `libs/components/src/atom/button/vl-button.component.ts`
- **BaseHTMLElement** (HTML template strings) - zie `libs/components/src/compliance/cookie-consent/vl-cookie-consent.component.ts`
- **FormControl** (form components, extends `FormControlMixin(BaseLitElement)`) - zie `libs/components/src/form/input-field/vl-input-field.component.ts`
- **Defaults pattern** - zie `libs/components/src/atom/button/vl-button.defaults.ts`

Regels:
- Gebruik altijd `@webComponent()` uit `@domg-wc/common`, niet `@customElement()` uit Lit - bevat eigen registratielogica
- Gebruik Lit decorators (`@property`, `@state`, `@query`, `@queryAll`) waar mogelijk
- Custom events krijgen `vl-` prefix, dispatched met `bubbles: true, composed: true`
- Shadow DOM altijd; nieuwe styles als css-in-ts in `vl-component-name.flux-css.ts` (Lit `css`), zie `libs/components/src/block/progress-bar/vl-progress-bar.flux-css.ts`. Oudere componenten importeren nog `@domg/govflanders-style`
- Nooit raw colors of hardcoded spacing - altijd CSS custom properties (design tokens, `var(--vl-…)`)
- De meeste componenten ondersteunen een `custom-css` attribuut voor externe tweaks

## Naming Conventions

| Item | Patroon |
|------|---------|
| Component tag | `vl-component-name` (kebab-case, `vl-` prefix) |
| Class | `VlComponentName` of `VlComponentNameComponent` |
| Component file | `vl-component-name.component.ts` |
| Defaults | `vl-component-name.defaults.ts` |
| Styles | `vl-component-name.flux-css.ts` |
| Tests | `vl-component-name.component.cy.ts` |
| Stories | `vl-component-name.stories.ts` (in `stories/` subdir) |
| Story args | `vl-component-name.stories-arg.ts` (singular `arg`) |
| Story docs | `vl-component-name.stories-doc.mdx` |

## Testing (Cypress Component Tests)

Conventies:
- Tests in **Engels**, beginnen met "should"
- Test gerenderde HTML, geen interne methods
- Gebruik data uit stories/fixtures; fixtures in `apps/storybook-e2e/src/fixtures` voor herbruikbaarheid
- A11y: `cy.injectAxe()` + `cy.checkA11y('vl-component-name')`
- Keyboard: `cy.press(Cypress.Keyboard.Keys.TAB)`
- Referentie: `libs/components/src/atom/button/vl-button.component.cy.ts`

**Wanneer vereist:**
- Feature → tests per nieuw attribuut, property, event, slot of interactie; gewijzigd gedrag → bestaande tests aanpassen
- Bugfix → eerst een regressietest schrijven en draaien tot hij **rood** is om de juiste reden, dan pas fixen
- Nieuwe of hernoemde story → Storybook E2E test in `apps/storybook-e2e/src/e2e/components/{type}/{naam}/`
- Nooit als klaar melden zonder de tests van het gewijzigde component effectief gedraaid te hebben

**Uitvoeren** (headless; specs staan onder heel `libs/**`, niet enkel `libs/components`):

```bash
pnpm run libs:component-tests:run --spec "../../libs/components/src/{type}/{naam}/vl-{naam}.component.cy.ts"
```

- Spec-paden relatief t.o.v. `resources/cypress-component` (prefix `../../`), meerdere komma-gescheiden; **geen `--`** vóór `--spec` (pnpm geeft die letterlijk door)
- `runMode` doet tot 4 retries: een test die pas bij `(Attempt 2 of 5)` of later slaagt, is flaky. Meld hem als flaky, niet als geslaagd
- Na `cy.viewport()` eerst wachten op de toestand die de ResizeObserver zet (bv. `mobile-modal`) vóór een eenmalige `{esc}` of klik; retries lossen die race niet op

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

1. `vl-{name}.stories.ts` - story definities en templates
2. `vl-{name}.stories-arg.ts` - args en argTypes (singular `arg`)
3. `vl-{name}.stories-doc.mdx` - documentatiepagina (Nederlands)

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

**Vóór commit visueel verifiëren in Storybook** (`pnpm run apps:storybook:dev`, http://localhost:8080):
- Component rendert, alle varianten werken, controls reageren, geen console errors
- Veelvoorkomende fouten: ontbrekende imports, slots zonder `unsafeHTML`, properties zonder `.` prefix, template zonder `story()` helper

## Git Workflow

- Feature branches: `feature-v2/FLUX-XXX-short-description` (v1-werk: `feature-v1/…` op `develop-v1`)
- Base branch: `develop-v2`; main: `main` (protected)
- Bij de start van een ticket ook het gelinkte `[meta] - {component}`-ticket lezen (voorgeschiedenis, openstaande WCAG-punten)
- PR's targeten `develop-v2`. Titel = commit-subject. Body = eerste regel `[Jira](https://jira.omgeving.vlaanderen.be/jira/browse/FLUX-XXX)`, daarna de commit-body in het Nederlands (geen "Summary/Test plan"-sjabloon, geen trailer)

**Commit messages** beschrijven in **subject en body** enkel de codewijziging - geen metadata in de boodschap zelf. Body in het Nederlands, elke paragraaf op één regel (niet hard wrappen).

**AI-ondertekening (verplicht bij AI-betrokkenheid):** als AI meewerkte aan de wijziging, onderteken de commit met een `Co-Authored-By`-trailer die **het effectief gebruikte model** benoemt:

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

- Gebruik het model dat effectief gebruikt werd (bv. `Claude Opus 4.8`, `Claude Sonnet 4.6`, `Claude Haiku 4.5`) - nooit een vaste placeholder of een model dat niet gebruikt werd.
- Dit is de **enige** toegelaten trailer; geen andere attribution of metadata.
- Een puur manuele commit (geen AI) krijgt geen trailer.

**Format:** `feat|fix|docs|chore: FLUX-XXX - component name - beschrijving in Nederlands`

- `feat:` (nieuwe features/uitbreidingen → minor release) of `fix:` (bugfixes → patch); `docs:` enkel voor documentatie (patch); `chore:` voor build, CI en tooling (geen release). Het subject komt in de publieke changelog
- 1 ticket = 1 feature branch; 1 commit per ticket per component
- Gegenereerde `libs/**/*.web-types.json` nooit committen (doet de release build); wt-config en tellingen wel
- Component-naam vermelden (bv. `vl-upload`, `vl-side-navigation-next`)
- A11y-werk: "WCAG verbeteringen" in beschrijving

**Voorbeelden:**
- `feat: FLUX-576 - vl-alert - multiline attribuut toegevoegd`
- `fix: FLUX-592 - vl-spotlight, vl-infotext, vl-doormat - extern icoon inline na titel geplaatst`
- `fix: FLUX-585 - flaky testen stabiel gemaakt`

## Werkafspraken

- **Nooit een em-dash (U+2014) gebruiken, altijd een gewoon streepje `-`.** Geldt voor alle tekst die je schrijft: code, comments, documentatie, stories, commit messages, PR-beschrijvingen, Jira-tickets en antwoorden
- **Plans opslaan in `.claude/plans/`**, NIET in `docs/plans/` (`docs/` is voor projectdocumentatie / Storybook)

## Skills

Ontdekt via de `.claude/skills`-symlink naar `skills/`. Elke skill is een map met een `SKILL.md`:

- `/new-component vl-naam type` - nieuw component, inclusief de bestanden die je anders vergeet (metadata, web-types, E2E, exports)
- `/jira-ticket` - FLUX-ticket met componentprefix en link naar het `[meta]`-ticket
- `/wcag-audit vl-naam` - WCAG 2.2 AA-audit van één component: code-review, meetrun tegen Storybook en voorstel voor de `wcag`-metadata
- `/flux-check` - conventiecheck van de branch-diff tegen dit bestand (aanvulling op `/code-review`)

Skill-inhoud wordt **lazy** geladen: enkel de `description` staat permanent in context. Wat altijd moet gelden, hoort dus in dit bestand; een skill enkel voor kennis die een specifieke taak nodig heeft en die Claude niet zelf afleidt.
