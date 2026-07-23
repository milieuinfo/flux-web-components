# Strategie 1: flux zelf prefix-aware maken

Flux krijgt een eigen prefix-mechanisme (zoals VDS dat heeft), zodat alle flux-tags
onder een configureerbare prefix geregistreerd worden (default `vl-`, optioneel
`flux-` of iets anders). Daardoor kan flux naast VDS bestaan zonder tag-clash, terwijl
de afnemer de prefix kiest.

## Vandaag (uitgangssituatie, gemeten in `libs/components/src`)

- **83** componenten geregistreerd via `@webComponent('vl-...')` (+ 1 `Conditional`,
  2 `Custom`, 1 `Promised` variant). De registratie loopt via
  `defineWebComponent(constructor, tagName)` in `libs/common/src/util/utils.ts`, dat
  `customElements.define(tagName, ...)` aanroept.
- **0** gebruik van een tag-resolutie-helper (VDS heeft `componentTag()`; flux heeft
  niets). Elke tag is dus een **hardcoded string-literal**.
- **115** distinct `<vl-...>`-tags in TS-templates (~2405 voorkomens) waar componenten
  elkaar als kind renderen (bijvoorbeeld `vl-link` rendert hardcoded `<vl-icon>`).
- **40** hardcoded `vl-`-literals in DOM-queries (`closest`, `querySelector`,
  `customElements.get`, `getElementById`).
- **1331** `.vl-`-CSS-klassen: dit zijn GEEN custom-element-tags maar styling-klassen
  (govflanders / Web Universum). Die blijven `vl-`, ongeacht de tag-prefix.

## Waarom dit werk is

Flux heeft nergens indirectie tussen "de klasse" en "de tag-naam". Prefix-aware worden
betekent: overal waar nu een letterlijke `vl-foo` staat als TAG, dat vervangen door een
runtime-resolutie op basis van de gekozen prefix. De CSS-klassen `.vl-` blijven net wel
ongemoeid, dus een blinde replace kan niet (zie strategie 2).

## Implementatieplan

1. **Registratie prefix-aware maken.**
   - `@webComponent` / `defineWebComponent` uitbreiden zodat de tag afgeleid wordt van
     een centrale prefix-config (bijvoorbeeld `FluxConfig.getPrefix()`), met de
     basis-naam in de decorator (`@webComponent('button')` of behoud `'vl-button'` met
     prefix-substitutie zoals VDS' `name.substring(0, indexOf('-'))`).
   - Een `static elementName` per component zetten bij registratie (VDS-patroon), zodat
     andere code de actuele tag kan opvragen i.p.v. te hardcoden.
   - Guard tegen meervoudige/foute prefixes (VDS doet dit met een regex-check).
2. **Tag-resolutie-helper invoeren** (equivalent van VDS' `componentTag(Cls)`), en de
   **115** template-tags + **40** DOM-query-literals daarmee vervangen. Dit is het
   leeuwendeel: per component de child-tags en queries dynamisch maken
   (`<${componentTag(VlIcon)}>` i.p.v. `<vl-icon>`). Lint-regel toevoegen die nieuwe
   hardcoded tags verbiedt (VDS heeft `no-hardcoded-element-tags`).
3. **Typing.** `HTMLElementTagNameMap` is gedeclareerd voor de `vl-`-default; onder een
   custom prefix verliest de consument IDE-typing. Documenteren of een helper voorzien.
4. **CSS ongemoeid laten.** De **1331** `.vl-`-klassen NIET hernoemen (ze horen bij de
   styling, niet bij de tag). Expliciet afbakenen zodat niemand ze meeneemt.
5. **Tests.** Alle 83 componenten + hun Cypress-tests draaien onder de default-prefix
   (geen regressie) en onder een custom prefix (nieuw gedrag). De `.cy.ts` gebruiken
   vaak hardcoded `vl-`-tags in mount/asserts, dus die mee aanpassen of prefix-bewust
   maken.

## Effort-inschatting

**Groot.** Het is structureel dezelfde refactor die het VDS-team al deed, toegepast op
83 componenten zonder bestaande indirectie:

- ~115 template-tags + ~40 query-literals + 83 registraties omzetten.
- Tests (componenttests met hardcoded tags) bijwerken.
- Typing + lint-regel + docs.

Grofweg: meerdere weken werk, plus een coordinatie-/migratielast voor afnemers als de
default-prefix verandert. Als de default `vl-` blijft (en de prefix enkel optioneel
overschrijfbaar is), is er geen breaking change voor afnemers, maar blijft het
implementatiewerk even groot.

## Wanneer kiezen

Als flux op termijn een echte eigen prefix-vrijheid wil (los van VDS), of als de
strategische keuze is dat flux z'n eigen tags volledig beheert. Het zwaarste pad, maar
het meest fundamentele.

## Verhouding tot strategie 3

Strategie 3 (VDS onder eigen prefix, flux blijft `vl-`) bereikt coexistentie ZONDER deze
refactor, omdat de prefix-vrijheid daar bij VDS ligt, niet bij flux. Strategie 1 is enkel
nodig als we specifiek FLUX prefix-aware willen, niet louter om de clash op te lossen.
