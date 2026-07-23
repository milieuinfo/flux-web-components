# VDS upstream-verzoeken (FLUX-704 PoC)

Lijst van punten die tijdens de FLUX-704 PoC (flux-atoomcomponenten bovenop VDS
web-components) NIET consument-side op te lossen bleken, omdat de betrokken
waarde hardgecodeerd in de encapsulated shadow-CSS staat: geen design-token en
geen `::part` om ze te bereiken.

Per punt geldt: **een design-token heeft de voorkeur** (idiomatisch, versie-robuust,
themeable), maar **een `::part` op het betrokken element is een aanvaardbaar
alternatief** waarmee de consument het zelf kan bijsturen.

Versie waarop dit is vastgesteld: `@govflanders/vl-ui-design-system-web-components`
**0.6.0** (build van `origin/develop`).

Context: de knop (`vl-button`) is WEL volledig matchbaar via bestaande tokens
(radius, border-width, padding) en staat dus niet in deze lijst.

---

## 1. Link: underline-dikte en -offset (hardgecodeerd)

**Component:** `vl-link`
**Bron:** `src/components/vl-link/vl-link.styles.ts` (selector `.vl-link__slot`)

De underline-KLEUR is correct getokeniseerd
(`--base-color-underline-action-default/-hover/-active`), maar de **dikte** en de
**offset** staan als literal in de shadow-CSS:

```css
.vl-link__slot {
  text-decoration-color: var(--base-color-underline-action-default); /* OK: token */
  text-decoration-line: underline;
  text-decoration-thickness: 0.125rem; /* hardcoded, geen token */
  text-underline-offset: 0.25rem;      /* hardcoded, geen token */
}
```

**Gevolg voor de consument:** we kunnen de underline-kleur naar de flux-look sturen,
maar niet de dikte/afstand tot de tekst. De VDS-underline blijft daardoor dikker en
verder van de tekst dan de flux-look vereist.

**Verzoek (één van beide):**
- Tokeniseer dikte en offset, analoog aan de kleur, bijv.
  `--base-size-underline-action-thickness` en `--base-size-underline-action-offset`
  (of de bestaande naamgevingsconventie van VDS), of
- expose `.vl-link__slot` als `::part` (bijv. `part="underline"` of `part="slot"`).

---

## 2. Input: form-layout-chrome rond het veld (geen bare-veld-modus)

**Component:** `vl-input` (+ core `vl-form-layout-element`)
**Bron:** `src/components/vl-input/vl-input.styles.ts` en
`src/core/vl-form-layout-element/vl-form-layout-element.styles.ts`

Het veld-BOX zelf (`.vl-input__wrapper`) is volledig matchbaar via bestaande tokens
(radius via `--base-border-radius-selectable-default`, kleur via
`--base-color-border-default`, padding via de inset-tokens). Dat punt is dus OK.

Het resterende verschil is structureel: `vl-input` is een form-layout-grid met rijen
voor label / veld / message / annotation (`.vl-formfield__container`). Er is geen
manier om enkel het kale veld te renderen (zoals flux' `vl-input-field`, waar het label
een apart `vl-form-label`-component is). De host reserveert daardoor meer ruimte dan een
kaal veld, ook zonder label.

Dit is geen enkele hardgecodeerde waarde maar een component-structuur, dus een token
lost het niet volledig op.

**Verzoek (één van beide):**
- Een "field-only" / `bare`-modus op `vl-input` die de form-layout-rijen niet
  reserveert wanneer label/message/annotation afwezig zijn, of
- expose de sub-onderdelen als `::part` (`part="container"`, `part="label"`,
  `part="message"`, `part="wrapper"`) zodat de consument de chrome zelf kan
  collapsen/herstijlen.

### 2b. Input: clear/suffix-knop grootte (hardgecodeerd)

Kleiner, gerelateerd punt in dezelfde component. De clear/suffix-knop heeft een
hardgecodeerde afmeting (enkel relevant bij `clearable` of een suffix):

```css
/* vl-input.styles.ts, de flex-knop */
width: 1.25rem;   /* hardcoded */
height: 1.25rem;  /* hardcoded */
```

**Verzoek:** tokeniseer de knop-afmeting (bijv. via een `--base-size-*`-token), of
expose de knop als `::part`.

---

## 3. Reeds bekend bij VDS (geen actie gevraagd, ter volledigheid)

### 3a. Rem-schaalbaarheid van de maat-tokens

De gelande rem-scale-aanpak maakt enkel de **font-size-tokens** runtime-schaalbaar via
`--global-font-size-scaled-base` (calc-patroon). De overige **maat-tokens**
(dimension / space / shadow / paragraph-spacing, ~215 stuks in 0.6.0) blijven rauwe
rem-literals. Een consument met een afwijkende root-font-size (flux zet de document-root
op 62.5%, dus 1rem=10px) kan daardoor de fonts wel herschalen maar de spacing/dimensies
niet zonder workaround.

**Status:** VDS is hiervan op de hoogte en pakt dit op (calc-patroon uitbreiden naar
alle maat-tokens). Flux werkt intussen met een gegenereerd compensatiebestand als
workaround. Geen apart verzoek nodig; hier enkel vermeld voor de volledigheid van het
overzicht.

---

## Niet van toepassing: vl-title

VDS levert (nog) geen title/heading-component. Dit is een **component-gap**, geen
token/part-gap, en valt dus buiten deze lijst. Flux stijlt voorlopig een eigen native
heading met de VDS-typografie-tokens (`--base-typography-desktop-title-*`).
