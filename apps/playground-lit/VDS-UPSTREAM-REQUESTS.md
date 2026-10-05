# VDS upstream-verzoeken (FLUX-704 PoC)

Lijst van punten die tijdens de FLUX-704 PoC (flux-atoomcomponenten bovenop VDS
web-components) NIET consument-side op te lossen bleken, omdat de betrokken
waarde hardgecodeerd in de encapsulated shadow-CSS staat: geen design-token en
geen `::part` om ze te bereiken.

Per punt geldt: **een design-token heeft de voorkeur** (idiomatisch, versie-robuust,
themeable), maar **een `::part` op het betrokken element is een aanvaardbaar
alternatief** waarmee de consument het zelf kan bijsturen.

Versie waarop dit is vastgesteld: `@govflanders/vl-ui-design-system-web-components`
**0.6.0** (build van `origin/develop`) voor de punten 1 tot 6, **0.15.0** (release-tag op
`master`) voor de punten 7 tot 11. Punt 6 is opnieuw nagekeken op 0.15.0.

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

**Status (workaround actief):** op `flux-link` staat een consument-side override
(`.vl-link .vl-link__slot { text-underline-offset: auto; text-decoration-thickness: auto }`)
die de underline naar de flux-default (dicht bij de tekst, dun) zet. Bewust een afwijking van
het "geen VDS-styling overriden"-principe, op expliciete vraag. Kan weg zodra de tokens/part
landen.

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

## 3. Focus-outline: breedte + offset niet (bruikbaar) getokeniseerd

**Betreft:** alle form-controls (de gedeelde `focusMixin`, gebruikt door ~9 componenten).
**Bron:** `src/styles/mixins/focus.styles.ts`

```css
/* focusMixin */
outline: 0.25rem solid var(--base-border-focus-spacing-color); /* breedte hardcoded */
outline-offset: 0.125rem;                                      /* offset hardcoded, geen token */
```

Enkel de KLEUR is een token. Twee problemen:
- **Breedte:** er BESTAAT een token `--base-border-focus-spacing-width: 3px` (gelijk aan de
  flux-focus-breedte), maar de mixin gebruikt het niet en hardcodeert `0.25rem`. Waarschijnlijk
  een vergetelheid: de mixin zou dit token moeten gebruiken.
- **Offset:** er is GEEN token; `outline-offset: 0.125rem` is hardgecodeerd.

**Gevolg voor de consument:** de afstand tussen het veld en de focus-rand (en de rand-breedte)
wijkt af van de flux-look (flux = `outline: 3px` / `outline-offset: 2px`), en is consument-side
niet te corrigeren zonder de VDS-focus-CSS te overschrijven (wat we bewust niet doen). Extra:
omdat het rem-literals zijn, renderen ze op flux' 62.5%-root ook nog eens te klein
(zie 4a, rem-scale).

**Verzoek (één van beide):**
- Laat de `focusMixin` het bestaande `--base-border-focus-spacing-width` token gebruiken i.p.v.
  `0.25rem`, en voeg een `--base-border-focus-spacing-offset` token toe (px-gebaseerd, zoals de
  width) dat de mixin gebruikt i.p.v. `0.125rem`, of
- expose het focusbare element als `::part` zodat de consument outline/offset zelf kan zetten.

**Flux-doelwaarde (gemeten op de echte vl-\*):** de echte flux focus-ring is overal
`outline: 3px solid rgba(0, 85, 204, 0.65)` met `outline-offset: 2px`. Gemeten op de echte
`vl-button`, `vl-link`, `vl-input-field` en `vl-datepicker`: alle vier identiek (3px/2px, kleur
`rgba(0,85,204,0.65)` = flux-blauw #0055cc op 65%). VDS gebruikt daarentegen twee eigen mixins met
rem-literals + een afwijkende kleur (`--base-border-focus-spacing-color` = #5990de).

**Status (workaround actief):** consument-side overrides op alle flux-componenten die de VDS-focus-CSS
naar de flux-doelwaarde brengen (bewust een afwijking van het "geen VDS-styling overriden"-principe,
op expliciete vraag; geverifieerd met echte focus dat flux == vl voor button/link/input/datepicker).
Kan weg zodra VDS de breedte/offset tokeniseert en de mixin de flux-kleur laat toe. TWEE VDS-mechanismen:
- **outline-mixin** (`styles/mixins/focus`, gebruikt door input, link, textarea, checkbox, radio):
  zichtbare gekleurde outline. Override = `outline-width: 3px; outline-offset: 2px`. Bij `flux-checkbox`
  moest de VOLLE VDS-selector-specificiteit gematcht worden
  (`:host(:focus) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box`), anders won de VDS-regel.
- **box-shadow-mixin** (`styles/common/focusMixin`, gebruikt door button, select, datepicker):
  `box-shadow`-ring + een TRANSPARANTE outline. Een pure `outline-width/offset`-override doet hier NIKS
  (de outline is transparent). Override = de outline zichtbaar maken én de box-shadow uit:
  `outline-color: var(--base-border-focus-spacing-color); outline-width: 3px; outline-offset: 2px; box-shadow: none`.
- **Kleur:** op elke flux-`:host` staat `--base-border-focus-spacing-color: rgba(0, 85, 204, 0.65)` zodat
  de outline-kleur de flux-focus-kleur is i.p.v. de VDS-#5990de.
- **NIET fixbaar: `flux-radio`.** De radios zijn `vds-radio`-kinderen in `flux-radio-group`; hun focus-CSS
  zit in de encapsulated shadow van `vds-radio` en `VlRadio` wordt niet los geexporteerd, dus geen
  `flux-radio` om te stylen en de group kan niet in de radio-shadow reiken. Blijft VDS-default (2px/0px).
  Vergt upstream (tokeniseren of `VlRadio` exposen).

**Stand op 0.15.0:** VDS gebruikt nu zelf een outline van 3px breed op input, textarea en select
(gemeten in de parity-tests). De offset (ongeveer 3.2px tegenover 2px bij flux) en de kleur wijken
nog af, dus het verzoek om ze te tokeniseren blijft staan.

---

## 4. Reeds bekend bij VDS (geen actie gevraagd, ter volledigheid)

### 4a. Rem-schaalbaarheid van de maat-tokens

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

**Belangrijke uitbreiding (component-INTERNE rem-literals):** het compensatiebestand dekt
enkel de `--base-*`/`--global-*` tokens uit het theme. Sommige componenten gebruiken
daarnaast **hardgecodeerde rem-literals in hun eigen shadow-CSS**, die op een niet-16px-root
te klein/groot renderen en NIET door de tokencompensatie geraakt worden. Concreet gevonden:
- `vl-checkbox`: `--checkbox-box-width: 1.125rem` (de box-grootte). Op flux' 62.5%-root rendert
  de checkbox-box te klein. Consument-side forceren (de var overschrijven) breekt de layout,
  want de checkmark heeft een aparte vaste `font-size: 0.5rem` en de box-grid gaat mee schuiven.
- `vl-radio`: de box is een hardgecodeerde `width/height: 1.125rem` **literal** (geen var,
  geen token), dus zelfs niet overschrijfbaar.
- `vl-datepicker` (Cally-kalender): de dag-cel is een hardgecodeerde
  `calendar-month::part(button) { width/height: 2.25rem }` **literal**, en de toggle-knop
  `.vl-datepicker__toggle::part(toggle-button) { min-height: 2.5rem }`. De cel-PADDINGS eromheen
  lopen wél via `--base-space-*` tokens (dus die worden wél gecompenseerd), waardoor je op de
  62.5%-root geschaalde paddings rond te kleine 22.5px-cellen krijgt: een gedrongen kalender met
  normaal-grote (16px) tekst in te kleine vakjes. Omdat de cel via `::part(button)` bereikbaar is,
  is hier wél een consument-side override mogelijk (zie status).
- `vl-icon`: de icoon-GROOTTE is een rauwe rem-literal die het scale-token NIET gebruikt:
  `.vl-icon { font-size: 1rem }`, `.vl-icon--small { 0.8rem }`, `.vl-icon--large { 1.2rem }`.
  Op de 10px-root rendert `--large` dus 12px i.p.v. de bedoelde ~19px. Dit is net het soort plek waar
  de scale-aanpak zou moeten grijpen: idealiter `font-size: calc(var(--global-font-size-scaled-base) * 1.2)`.
  Consument-side patchbaar (override met dezelfde calc); in de playground zit dat achter een aan/uit-toggle
  op `flux-icon` (`:host([scaled])`) zodat het verschil 12px vs ~19px zichtbaar is. LET OP: dit fixt enkel
  de GROOTTE, niet het glyph-verschil (dat is een aparte font-familienaam-collision, geen rem-issue).

- `vl-select`: de size-modifiers (`.vl-formfield__container--{small,medium,large} .vl-select`) én de
  dropdown-`option`s gebruiken RAUWE rem-literals (`0.875rem / 1rem / 1.125rem`), terwijl de basis
  `.vl-select` het scale-token (`--base-font-size-desktop-s`) WEL gebruikt. De modifier is specifieker en
  wint, dus op de 10px-root rendert de default (medium) select-tekst 10px en de opties 10px; in de
  datepicker-kalender-header (size small) zelfs 8.75px. Idealiter gebruiken die modifiers ook
  `calc(var(--global-font-size-scaled-base) * ...)`. Consument-side gepatcht (de opties via `!important`,
  want de `::picker(select)` top-layer wordt bewust via een geïnjecteerde `<style>` gestyled i.p.v.
  adoptedStyleSheets). De datepicker-header-select is een GENESTE `vds-select`; z'n `::part(select)`-grootte
  gaat via een `::part`-override, en z'n dropdown-`option`s (die we van buitenaf niet via CSS bereiken) via
  een runtime-injectie: `flux-datepicker.updated()` voegt een geconstrueerde stylesheet toe aan de
  `adoptedStyleSheets` van elke geneste `vds-select` (die komt na VDS' eigen sheets, dus wint). Zo is ook de
  maand/jaar-picker leesbaar (14px i.p.v. 10px).

### 4b. Icon-font naam-collision (`vlaanderen-icon`) — coexistentie

Flux en VDS shippen allebei een icon-font met dezelfde `font-family`-naam `vlaanderen-icon`, maar met
verschillende codepoint-maps (VDS spant `f101–f316`). Op een pagina waar beide laden (zoals deze playground,
die flux' legacy-font laadt voor de `vl-*`-referentie) zijn er meerdere full-range `@font-face`'s met dezelfde
naam → de browser kiest één winnaar en de andere z'n codepoints renderen verkeerde glyphs. Dit raakt
`vds-icon`, `flux-icon` én het checkbox-vinkje (intern een `<vds-icon icon="check">`).

**Niet consument-side fixbaar** (getest): beide hardcoden `font-family: vlaanderen-icon !important` in de
shadow, de ranges overlappen (geen `unicode-range`-splitsing), en een extra `@font-face` toevoegen wint de
cascade niet. Het is een PLAYGROUND-artefact: in een echte flux-op-VDS build (enkel VDS' font) speelt het niet.

**Verzoek (voor robuuste coexistentie tijdens de migratie):** geef de VDS-icon-font een **versie-/namespace-
specifieke `font-family`-naam** (bv. `vlaanderen-icon-vds` of met een versietag) i.p.v. het generieke
`vlaanderen-icon`, zodat hij niet botst met een gelijknamige font van de consument. Analoog aan hoe de
componenten al prefix-aware zijn, zou de font dat ook moeten zijn.

**Verzoek:** neem deze component-interne maat-rems mee in dezelfde rem-scale-aanpak (of expose
ze als `--base-*`-token / CSS-var), zodat de radius wél maar de GROOTTE nu niet consument-side
matchbaar is. De radius zelf is wel getokeniseerd (`--base-border-radius-container-2xs` voor de
checkbox-box) en dus matchbaar; enkel de grootte hangt aan deze rem-literals.

**Status (workaround actief):** op `flux-datepicker` staat een consument-side override die de
kalender-dag-cel opschaalt naar de bedoelde grootte:
`calendar-month::part(button) { width/height: calc(var(--global-font-size-scaled-base,1rem) * 2.25) }`
(= 36px op de 10px-root). Bewust een afwijking van het "geen VDS-styling overriden"-principe, op
expliciete vraag. Kan weg zodra VDS deze rem-literals mee schaalt of tokeniseert.

---

## 5. Mobile-maten (767px-breakpoint) niet consument-side te mirroren

**Componenten:** o.a. `vl-select`, `vl-checkbox` (en `vl-button`, dat WEL lukte)
**Bron:** de `@media screen and (max-width: 767px)`-regels in de flux-component-CSS

De echte flux-componenten passen op mobile (`< 767px`) enkele maten aan (grotere touch-targets,
andere line-heights/margins). Om de flux-look ook op mobile op VDS te reproduceren moet de
VDS-gebaseerde flux die deltas mirroren. Dat lukt enkel waar de maat aan een publiek token of
een publieke klasse hangt:

- **button: WEL** matchbaar. De mobile-padding en -height hangen aan `--base-space-selectable-inset-*`
  en de publieke `.vl-button`-klasse, dus consument-side te overschrijven (gedaan in de playground).
- **select / checkbox: NIET** netjes matchbaar. De mobile-deltas (`.vl-select` height/line-height/font,
  `.vl-checkbox__box` margin-top, `.vl-checkbox__label` line-height) zitten hardgecodeerd in
  encapsulated shadow-CSS zonder token of `::part`. Ze consument-side forceren botst bovendien met
  VDS' eigen interne uitlijning.

**Verzoek:** expose de mobile-relevante maten als `--base-*`-token (of `::part`), of laat VDS de
mobile-breakpoint-maten zelf tokeniseren, zodat de consument de flux-look ook op mobile kan sturen
zonder in de encapsulated CSS te moeten grijpen. (De deltas zijn klein — vaak sub-2px — dus lage
prioriteit, maar wel dezelfde structurele grens als bij de rem-literals in punt 4a.)

---

## 6. Checkbox/radio: check-kleur-selector niet prefix-aware + box-grootte hardcoded rem

**Componenten:** `vl-checkbox`, `vl-radio`
**Bron:** `vl-checkbox.styles` / `vl-radio.styles`

Twee samenhangende problemen als de VDS-componenten onder een custom prefix (`vds-`) draaien:

1. **Check-kleur onzichtbaar (prefix-bug).** De checkbox zet de vinkje-kleur via de selector
   `vl-icon.vl-checkbox__check { color: var(--base-color-icon-on-action) }`. Maar onder de
   `vds-`-prefix is het icoon-element `vds-icon`, dus die selector matcht NIET en de check valt terug
   op de default donkergrijze tekstkleur, onzichtbaar op de blauwe (checked) box. De VDS-interne CSS
   moet prefix-aware zijn (bv. via `::part` of een class-selector i.p.v. de tag `vl-icon`), anders werkt
   de checked-check-kleur enkel onder de default `vl-`-prefix. (De radio-dot gebruikt
   `.vl-radio__box::after`, een class-selector, en heeft dit probleem niet.)

2. **Box-grootte hardcoded rem.** `.vl-checkbox__box` (`--checkbox-box-width: 1.125rem`) en
   `.vl-radio__box` (`width/height: 1.125rem`, geen var) staan als rauwe rem in de encapsulated CSS. Op
   de flux-10px-root rendert dat te klein (≈13px i.p.v. de bedoelde ≈18px). Zelfde soort gap als de
   rem-literals in punt 4a. Voor de radio is er niet eens een var, dus enkel via een
   `.vl-radio__box`-override (in de playground via adoptedStyleSheets-injectie) bij te sturen.

**Verzoek:** maak de check-kleur-selector prefix-aware (of expose de check als `::part`), en tokeniseer de
box-grootte (of laat ze meeschalen via `--global-font-size-scaled-base`), zodat een consument onder een
custom prefix zowel het zichtbare vinkje als de correcte grootte krijgt.

**Stand op 0.15.0:** probleem 1 is opgelost, de selector is nu `.vl-checkbox__check` (class in plaats van
tag). Probleem 2 staat nog open: de box-grootte is nog altijd `1.125rem`.

---

## Sinds 0.15.0: de 16 nieuwe componenten

De punten 7 tot 11 kwamen boven bij het afnemen van de componenten die 0.15.0 toevoegde.
Het zijn fouten of beperkingen in VDS zelf, geen feature-requests: flux omzeilt ze vandaag
met een workaround in de adapter, die verdwijnt zodra VDS ze oplost. Prioriteit: 7 en 8
hoog, 9 en 10 midden, 11 laag.

## 7. Tabs: kinderen gezocht op de exacte tagnaam

**Component:** `vl-tabs` (met `vl-tab` en `vl-tabpanel`)
**Bron:** `vl-tabs.component` (`:scope > ${VlTab.elementName}`, `closest(VlTab.elementName)`)

`vl-tabs` vindt zijn tabs en panelen op de exacte tagnaam waaronder `VlTab` en `VlTabpanel`
geregistreerd zijn. Een component die van `VlTab` erft maar onder een eigen tag geregistreerd
staat (zoals `flux-tab`), wordt daardoor nooit gevonden. Overerving is voor tabs dus onmogelijk;
flux moet delegeren (een eigen element dat intern `vds-tabs` rendert).

**Verzoek:** zoek de kinderen op type in plaats van op tagnaam, bv. met `instanceof VlTab`. VDS
doet dat al zo in `vl-input-group` (`element instanceof VlFormLayoutElement`). `vl-radio-group`
heeft hetzelfde patroon als tabs (`querySelectorAll(VlRadio.elementName)`).

---

## 8. Table: document-styles hardcoded op `vl-table`

**Component:** `vl-table`
**Bron:** `vl-table-slotted.styles` (`lightStyles`, `injectLightStyles()`)

De styling van de echte `<table>` die de afnemer in `vl-table` zet, staat in een document-sheet
met de selector `vl-table table { ... }`. Die tagnaam is hardcoded. Twee gevolgen:

1. Onder een custom prefix (`vds-table`) of in een component die van `VlTable` erft
   (`flux-table`) krijgt de tabel geen styling.
2. De sheet wordt in het hele document geïnjecteerd. Op een pagina waar flux zijn eigen
   `vl-table` heeft, stylet die VDS-sheet dus ook de flux-tabel mee.

De playground omzeilt het door `lightStyles` te kopiëren met `flux-table` als selector, en de
geïnjecteerde VDS-sheet daarna weer uit `document.adoptedStyleSheets` te halen.

**Verzoek:** bouw `lightStyles` op met de runtime `elementName` van de component (die kent
`VlTable` al), zodat de selector de werkelijke tagnaam volgt.

---

## 9. Tags: achtergrond en rand delen één token, geen publieke vormtokens

**Componenten:** `vl-informative-tag`, `vl-removable-tag`, `vl-selectable-tag`, `vl-clickable-tag`
**Bron:** `core/vl-tag/vl-tag.styles`

De statuskleuren lopen via private variabelen (`--_tag-bg`, `--_tag-border`) die op het element
zelf gezet worden. Bij de informative-tag gebruikt de rand dezelfde token als de achtergrond,
dus een witte tag met een grijze rand (de flux-look) is via tokens onmogelijk. Hoogte, padding
en radius hebben geen eigen tokens. `flux-pill` stylet daarom alles via `::part(base)`.

**Verzoek:** aparte, publieke tokens voor achtergrond, rand, tekstkleur, radius en hoogte van
een tag, per status.

---

## 10. Collapsible en section-message: enkel named slots

**Componenten:** `vl-collapsible` (slots `trigger`, `content`, `actions`), `vl-section-message`
(slots `title`, `body`, `footer`)

De inhoud moet in een named slot. Inhoud zonder `slot`-attribuut wordt niet getoond. flux
gebruikt voor dezelfde componenten (`vl-accordion`, `vl-alert`) de default slot, dus de adapters
moeten de light DOM van de afnemer herschikken (slot-attributen zetten) om zonder wijziging voor
afnemers te werken.

**Verzoek:** laat de default slot vallen op `content` respectievelijk `body`.

---

## 11. Status-naam niet consistent: `error` tegenover `danger`

De tags gebruiken `status="error"`, de messages (`vl-section-message`, `vl-banner-message`,
`vl-inline-message`) en `vl-avatar` gebruiken `status="danger"`. Dezelfde betekenis heeft dus
twee namen binnen VDS zelf. flux gebruikt overal `error`.

**Verzoek:** één naam voor alle componenten, of beide waarden aanvaarden.

---

## Niet van toepassing: vl-title

VDS levert (nog) geen title/heading-component. Dit is een **component-gap**, geen
token/part-gap, en valt dus buiten deze lijst. Flux stijlt voorlopig een eigen native
heading met de VDS-typografie-tokens (`--base-typography-desktop-title-*`).
