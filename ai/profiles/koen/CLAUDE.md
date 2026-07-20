# Koen — Claude Code configuratie (Flux Web Components)

Projectcontext en conventies voor Claude Code werkend op Flux Web Components v2 — een Lit-gebaseerde web-componentenbibliotheek (TypeScript, Cypress, Storybook, `@domg/govflanders-style` design tokens, npm-scope `@domg-wc`).

Componenten zitten onder `libs/components/src/{atom,block,form,compliance}/`. Bekijk altijd eerst een bestaand sibling-component van hetzelfde type vóór je nieuwe code schrijft of bestaande wijzigt.

## Engineering Mindset

### 1. Denk vóór je codeert
**Geen aannames. Verberg verwarring niet. Benoem tradeoffs.**
- Maak aannames expliciet. Onzeker? Vraag.
- Meerdere interpretaties mogelijk? Leg ze voor — kies niet stilzwijgend.
- Bestaat er een eenvoudiger aanpak? Zeg het. Push terug waar nodig.
- Onduidelijk? Stop. Benoem wat verwart. Vraag.

### 2. Eenvoud eerst
**Minimale code die het probleem oplost. Niets speculatief.**
- Geen features buiten wat gevraagd is.
- Geen abstracties voor single-use code.
- Geen "flexibiliteit"/"configureerbaarheid" die niet gevraagd is.
- Geen error-handling voor onmogelijke scenario's.
- 200 regels die 50 konden zijn? Herschrijf. Test: "Zou een senior dit overcomplex vinden?"

### 3. Chirurgische wijzigingen
**Raak enkel aan wat moet. Ruim enkel je eigen rommel op.**
- "Verbeter" geen aanliggende code, comments of formatting.
- Refactor niets dat niet stuk is. Match bestaande stijl, ook als je het anders zou doen.
- Zie je niet-gerelateerde dode code? Meld het — verwijder het niet.
- Verwijder imports/variabelen die jóuw wijziging ongebruikt maakte; pre-existing dode code enkel op vraag.
- De test: elke gewijzigde regel herleidbaar tot de vraag van de gebruiker.

### 4. Doelgedreven uitvoeren
**Definieer succescriteria. Loop tot geverifieerd.**
- "Voeg validatie toe" → "Schrijf tests voor ongeldige input, maak ze groen"
- "Fix de bug" → "Schrijf een test die hem reproduceert, maak hem groen"
- "Refactor X" → "Zorg dat tests groen zijn vóór én na"

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
- Shadow DOM altijd; styles via css-in-ts; nooit raw colors of hardcoded spacing — altijd CSS custom properties (design tokens)
- De meeste componenten ondersteunen een `custom-css` attribuut voor externe tweaks
- `@domg/govflanders-style` imports proberen we weg te werken door de CSS in een css-in-ts bestand (*.css.ts) te kopiëren en op te kuisen (selectors nesten, ordenen adhv BEM principe, dode regels verwijderen, bestaande tokens gebruiken voor kleuren en spacings)

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

## Figma MCP (design → component)

Lokale **Figma Dev Mode MCP server** op `http://127.0.0.1:3845/mcp` — levert design-context (gegenereerde code, design tokens/variabelen, afbeeldingen, node-metadata) rechtstreeks uit Figma.

**Meerwaarde t.o.v. de cloud-server (beperkt):** de lokale server werkt op de **live desktop-selectie** (geen URL/`node-id` nodig) en geeft Dev Mode-output (codegen, measurements, tokens) — **read-only**, zonder seat/OAuth. Voor alle overige taken is de cloud-server gelijkwaardig of beter (die leest óók elke node via URL/`node-id`, én schrijft). Gebruik de lokale server dus enkel voor een **snelle inspectie van wat je op dat moment in de desktop-app geselecteerd hebt**; verder is de cloud-server de standaard.

**Vereisten:**
- Figma desktop-app open met Dev Mode MCP server ingeschakeld (Preferences → "Enable Dev Mode MCP Server")
- Een **selectie of node** actief in Figma (of een Figma-link met `node-id`) — de tools werken op wat geselecteerd/aangeduid is

**Gebruik in dit project:**
- Haal de design-specs op (spacing, kleuren, typografie) als basis voor een nieuw/aangepast component — niet om de gegenereerde code letterlijk over te nemen
- Map Figma-variabelen op bestaande Flux/govflanders **design tokens** (CSS custom properties); gebruik nooit de raw hex/px-waarden uit Figma als er een token bestaat
- Sluit aan bij de css-in-ts aanpak (`*.css.ts`): vertaal de Figma-styling naar geneste, BEM-geordende selectors met tokens — niet naar inline of hardcoded waarden
- Match altijd eerst een bestaand sibling-component; Figma is de bron voor het *ontwerp*, niet voor de component-structuur

> De MCP-tools laden on-demand. Is de server onbereikbaar, controleer dan of de Figma desktop-app draait met Dev Mode MCP aan en of er iets geselecteerd is.

### Cloud MCP-server (claude.ai Figma)

Naast de lokale Dev Mode server is er de **cloud Figma MCP-server** (`claude.ai Figma`) — de officiële remote server die code en design in **beide richtingen** brugt: designs lezen én designs schrijven/bewerken in Figma vanuit code of intentie.

**Vereisten:**
- Een Figma-account met **write-access (Full/Dev seat)** — nodig om te kunnen creëren/bewerken, niet enkel lezen.
- Geauthenticeerd via claude.ai (OAuth). De verbinding is interactief; in headless/cron-runs kan de server afwezig zijn.
- Werkt op **remote Figma-content**: een `figma.com`-URL of `node-id`, géén lokale desktop-selectie nodig (in tegenstelling tot de Dev Mode server).
- Vóór `use_figma` verplicht eerst de `/figma-use` skill laden; voor design-generatie de bijhorende skill (`/figma-generate-design`, `/figma-generate-library`, `/figma-code-connect`).
- **Screenshots maken en bekijken = altijd toegestaan.** `get_screenshot` (en het downloaden ervan via `curl` + inlezen met Read) mag je vrij gebruiken zonder te vragen — beschouw dit als "allowed". Het is puur lezend/verifiërend.

**Werkverdeling:**
- **Cloud-server = standaard/workhorse:** zowel lezen (elke node via `figma.com`-URL of `node-id`) als schrijven/creëren.
- **Lokale Dev Mode server:** enkel wanneer je snel de **huidige desktop-selectie** wil inspecteren (Dev Mode codegen/tokens/measurements) zonder URL of seat. Read-only.

### Designs maken (code → design)

- Bouw designs **altijd met de FLUX Web Componenten library** in Figma. Vind je die library niet in het bestand/de beschikbare libraries, **meld het** en ga niet verder met losse/ad-hoc componenten.
- Bouw pagina's **altijd op met `vl-template` of `vl-dashboard`** als basis-layout.
- In de **main content** van zowel `vl-template` als `vl-dashboard` bouw je een pagina gewoonlijk op met **`vl-section`**, en daarbinnen **`vl-content-block`**. Verwijder dus de meegeleverde `.vl-section`-slots niet om er zelf iets te verzinnen — vul ze in.
- Heeft de pagina een **zijnavigatie** nodig (TOC / anchor-navigatie van de pagina)? Die komt **rond de content**, binnen de `vl-content-block`, opgebouwd met **`vl-side-navigation`** op een **`vl-grid`**-layout — niet als los paneel ernaast. In code is dit `vl-side-navigation-layout-next` (`content-block heading-root-selector="#..."`), dat de TOC automatisch uit de heading-ids genereert. Voorbeeld: [`page-layout-example.component.ts`](libs/integrations/src/page-layout/page-layout-example.component.ts) en Figma-node `563-51452` in het FLUX-bestand.

**Layout-keuze: `vl-template` vs `vl-dashboard`**
- **`vl-template` is de standaardkeuze.** De meeste applicaties zijn web-page-gebaseerd en passen daardoor het best bij de `vl-template`-stijl.
- **`vl-dashboard`** gebruik je sporadisch, voor grote applicaties die eerder als "dashboard" of "desktop app" te beschouwen zijn.
- Jij beslist welk van de twee past en **stelt gerichte vragen om die beslissing te valideren** vóór je begint.
- Bij `vl-template`: geef de voorkeur aan een **full-width functional header** en **full-width content-blokken** wanneer de content uit grote tabellen of paginavullende componenten (zoals een kaart) bestaat.

**Best practices & correctheid**
- De **Storybook-documentatie** bevat tal van best practices (zowel design als accessibility) — neem die in acht wanneer je designs in Figma voorstelt.
- **Meld onvolkomenheden** in zowel code als Figma-componenten en stel fixes/verbeteringen voor waar nodig.
- De **codebase is de single source of truth**. Wijkt Figma daarvan af, meld het dan.

**Maak het werk van de frontend developer makkelijk**
- Maak designs die het latere werk zo eenvoudig mogelijk maken. **Bedenk geen eigen layouts** (geen eigen frames, backgrounds, borders, spacing, …) — gebruik wat de library biedt.
- **Spacing-vuistregel:** een component mag niet weten in welke parent hij zit — de **parent bepaalt de spacing**. Verkies hiervoor gewoonlijk `.vl-stacked` voor verticale layouts en `.vl-group` voor horizontale blokken.
- Gebruik altijd vl-titles met no-space-bottom in een vl-stacked layout
- Bestaat er een variant met **native Figma slots**, geef daar dan de voorkeur aan.

**Nooit een component verzinnen — eerst uitputtend zoeken**
- **Bouw nooit zelf een "card", "tegel", "blok", "select", … na** met losse frames + borders + eigen tekst. Elk UI-patroon dat op een component lijkt, ís bijna altijd een FLUX-component. Verzin er geen namaak van.
- **Zoek uitputtend** in de Figma-library (`search_design_system`) vóór je concludeert dat iets niet bestaat: `search_design_system` geeft enkel de top-matches, dus varieer met **meerdere synoniemen én korte losse termen** — NL én EN. Bv. zoek óók op `tile` apart (niet enkel `data tile`), op `select`, `infoblock`, `spotlight`, … Één smalle zoekterm mist componenten.
- **Zoek ook buiten `libs/components`.** Componenten leven niet alleen daar: `vl-map` en z'n kaartlagen zitten in **`libs/integrations/src/map/`**. Grep breed over de hele repo vóór je "bestaat niet" concludeert.
- **Code ≠ Figma-library.** Sommige componenten bestaan in de codebase maar (nog) niet in de Figma-library, en omgekeerd. Alleen **in Figma gepubliceerde** componenten zijn bruikbaar in een design — controleer altijd met `get_libraries` + `search_design_system`, en meld het als een code-component in Figma ontbreekt (bv. `vl-map` bestaat in code, is in Figma nog niet volwaardig).
- Pas **na** een brede zoektocht zonder match: gebruik een **duidelijk gemarkeerde placeholder** (laagnaam `PLACEHOLDER … — geen FLUX-component`) en **meld het**. Typische echte placeholders: grafieken/charts.

**Component-mapping (UI-patroon → FLUX-component in Figma)** — startpunt; verifieer namen/keys altijd live met `search_design_system`:

| Wat je zoekt | FLUX-component |
|---|---|
| Pagina-layout (standaard / dashboard) | `vl-template` / `vl-dashboard` |
| App-/titelbalk bovenaan | `vl-functional-header` |
| Footer | `vl-footer` |
| Knop | `vl-button` |
| Link (met/zonder icoon) | `vl-link` |
| Tekst-/zoekinput | `vl-input-field` |
| Filterpaneel (meerdere filters) | `vl-search-filter` |
| Dropdown / (multi)select / segmented keuze (bv. tijdsresolutie, weergave) | `vl-select-rich` |
| Tabbladen-navigatie | `vl-tabs` (+ `vl-tab`) |
| Statistiek-/KPI-kaart ("card", "tile") | `vl-info-tile` |
| Uitleg-/infoblok (titel + tekst + link) | `vl-infoblock` |
| Korte inline-uitleg | `vl-infotext` |
| Uitgelicht contentblok (met illustratie) | `vl-spotlight` |
| Proza / rich text | `vl-proza-message` |
| Label/waarde-lijst (metadata) | `vl-properties` (verkozen boven `vl-description-data`) |
| Kaart / GIS-laag | `vl-map` (+ `vl-map-*` lagen, in `libs/integrations`) |
| Overlay-detailpaneel | `vl-side-sheet` |
| Datatabel (filters/paginatie) | `vl-rich-data` / `vl-rich-data-table` |
| Contactgegevens | `vl-contact-card` |
| Heading / body-tekst | `vl-title` / `vl-text` |
| Popover / tooltip | `vl-popover` / `vl-tooltip` |
| Kolommenraster / groepering | `.vl-grid` / `.vl-group` · `.vl-stacked` |

**Kleurgebruik & datavisualisatie (a11y):** volg bij kaarten, grafieken en gekleurde labels steeds de projectrichtlijnen — [`h_opmaak/2_kleurenpalet.mdx`](apps/storybook/docs/h_opmaak/2_kleurenpalet.mdx) (o.a. "Kleurgebruik in grafieken" + kleurenblindheid) en [`.../1_waarneembaar/1.4-onderscheidbaar.mdx`](apps/storybook/docs/e_richtlijnen/a_toegankelijkheid-aanpak/1_waarneembaar/1.4-onderscheidbaar.mdx). Nooit kleur als enig onderscheid.

## Git Workflow

- Feature branches: `feature-v2/FLUX-XXX-short-description`
- Base branch: `develop-v2`; main: `main` (protected)
- PR's targeten `develop-v2`, met FLUX-ticket in titel en JIRA-link in beschrijving

### Branch Safety (STRIKT)

- **Claude pusht nooit in deze repo** — staande afspraak. Geen `git push` in welke vorm dan ook; pushen doet de gebruiker zelf.
- **Bij het maken van een branch nooit een upstream / remote-tracking instellen.** Dus geen `git push -u` / `--set-upstream`, en niet aftakken van een remote-branch (`git checkout -b foo origin/...`). Branches blijven puur lokaal zonder gekoppelde origin.

### Commit Messages

Beschrijven in **subject en body** enkel de codewijziging — geen metadata in de boodschap zelf.

**AI-ondertekening (verplicht bij AI-betrokkenheid):** als AI meewerkte aan de wijziging, onderteken de commit met een `Co-Authored-By`-trailer die **het effectief gebruikte model** benoemt:

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

- Gebruik het model dat effectief gebruikt werd (bv. `Claude Opus 4.8`, `Claude Sonnet 4.6`, `Claude Haiku 4.5`) — nooit een vaste placeholder of een model dat niet gebruikt werd.
- Dit is de **enige** toegelaten trailer; geen andere attribution of metadata.
- Een puur manuele commit (geen AI) krijgt geen trailer.

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

- **Blijf binnen de repo-folder.** Lees, schrijf of navigeer nooit buiten de repo-root (geen `../`, geen home- of systeempaden, ook niet via Bash zoals `cat /pad/buiten/repo`). Interactie met de buitenwereld verloopt **uitsluitend via MCP-servers**. Dit is afgedwongen met `deny`-regels in `settings.json`, maar geldt ook als harde gedragsregel waar die patronen niet alles kunnen vatten. Gevolg: gebruik géén scratchpad buiten de repo — temp-bestanden horen in `.claude/plans/`.
- **Plans/scratchpads opslaan in `.claude/plans/`** (gitignored, lokaal-only), NIET in `docs/plans/` (`docs/` is voor projectdocumentatie / Storybook). Bestandsnaam: `YYYY-MM-DD-{korte-beschrijving}.md`

## Skills

Automatisch ontdekt via `skills/`:
- `/new-component` — scaffold een nieuwe Flux web component (procedure + alle vereiste files)
- `/run-tests` — Cypress component tests draaien voor één component of voor alle componenten
- `test-coverage` (auto-invoked) — regels voor wanneer tests of regressietests vereist zijn
