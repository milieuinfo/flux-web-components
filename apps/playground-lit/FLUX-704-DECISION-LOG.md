# FLUX-704 — beslissings-log (waarom we wat deden)

Doel van dit bestand: het WAAROM achter de keuzes in deze PoC, zodat een latere lezer niet
moet raden. Chronologisch-thematisch. Voor de huidige STAND + next steps zie
`.claude/plans/FLUX-704-handoff.md` (lokaal); voor wat VDS upstream moet doen zie
`VDS-UPSTREAM-REQUESTS.md` (gecommit).

## Overkoepelend doel
Flux z'n atoomcomponenten op termijn bovenop de VDS web-componenten bouwen, zonder dat
AFNEMERS iets merken (zelfde tags, zelfde look). Deze PoC (`apps/playground-lit`) bewijst
of/hoe dat kan.

## Kernprincipe (door de gebruiker vastgelegd, ~sessie 6)
1. Flux-look bereiken via PROPERE consument-side mechanismen: publieke `--base-*` design-tokens
   en `::part`.
2. Kan iets niet proper → feature request bij VDS (bijhouden in `VDS-UPSTREAM-REQUESTS.md`).
3. Nooit VDS' eigen styling zelf aanpassen.
**Waarom:** de winst van "afnemers merken niets" verdampt als we VDS gaan forken/hacken; dan is
elke VDS-update fragiel. Uitzondering: de gebruiker gaf later expliciet toestemming voor een paar
consument-side CSS-overrides (focus, underline) MITS de upstream-request als propere fix blijft.

## 1. Strategie: VDS onder eigen prefix, flux blijft `vl-` (gekozen)
**Beslissing:** VDS registreren onder een eigen prefix via `defineAll('<prefix>')`; flux blijft
op `vl-`. Aanbeveling = gefaseerd (strategie 4): v3 = prefix-aware, v4 = eventueel namespace-flip.
**Waarom:** flux en VDS claimen allebei `vl-*`; `customElements.define` laat maar 1 registratie
per tag toe. Flux hernoemen (`flux-`) is een breaking change voor alle afnemers. De prefix-vrijheid
bij VDS leggen verschuift de wijziging naar ONS als consument, niet naar de afnemers. Andere
strategieën (flux prefix-aware maken / find-replace `vl-`→`flux-`) zijn breaking en/of broos.

## 2. Inheritance i.p.v. compositie (doelproduct)
**Beslissing:** `flux-<x>` ERFT de VDS-klasse (`extends VlButton`) en zet de flux-look via tokens
op `:host`. De eerdere compositie-adapter (een `vl-button` die intern een `vds-button` rendert) is
VERWIJDERD.
**Waarom:** compositie voegt een EXTRA shadow-laag toe. Die breekt `formAssociated` (een `type=submit`
raakt het buitenste `<form>` niet meer), en vergt een volledige API-remapping. Inheritance houdt
formAssociated / `::part` / events native, want er is geen extra laag. De compositie-variant
bestond enkel als eerste, voor de hand liggende poging + als tastbaar bewijs WAAROM inheritance
beter is; toen dat vaststond is ze geschrapt (de gebruiker wilde geen `vl-button > vds-button`
nesting meer).

## 3. Rem-schaal: hybride
**Beslissing:** `--global-font-size-scaled-base: 1.6rem` (gelande upstream-knop voor font-tokens) +
gegenereerd `vds-scale-compensation.css` dat de ~215 overige maat-tokens hetzelfde calc-patroon
geeft.
**Waarom:** flux zet de document-root op 62.5% (1rem=10px), VDS is ontworpen voor 16px. Zonder
compensatie renderen alle VDS-maten 37,5% te klein. De upstream-PR dekt (voorlopig) enkel font-size;
de rest overbruggen we consument-side via token-overrides (proper: publieke `--base-*` tokens),
tot VDS het volledig upstream dekt. VALKUIL die we raakten: de basisvariabele zelf mee herschrijven
= CSS-zelfreferentie/cycle → alles valt terug op 1rem; generator excludeert ze nu.

## 4. Oude flux boolean-API mappen via `willUpdate`
**Beslissing:** de flux-componenten accepteren de oude flux-booleans (secondary/tertiary/ghost/
large/block/error/...) en mappen die in `willUpdate` op de VDS-API (variant/size/grow/danger/...).
**Waarom:** afnemers gebruiken vandaag die booleans in hun markup. Als de flux-* doelproducten die
blijven aanvaarden, hoeven afnemers niets te wijzigen (het hele punt van FLUX-704).

## 5. Prefix hernoemd `vlds-` → `vds-`
**Beslissing:** de VDS-prefix is `vds-` (was `vlds-`).
**Waarom:** de gebruiker vroeg het; `vds` (Vlaanderen Design System) is korter en logischer. De
prefix is vrij; enige eis is niet botsen met flux' `vl-`. Mechanische rename (geen VlRadio-achtige
caveats), onze eigen `vds-form-demo`/bestandsnamen bevatten geen "vlds" dus veilig.

## 6. Tarball committed in `vendor/`
**Beslissing:** de 0.6.0-tarball ligt in `apps/playground-lit/vendor/` en `package.json` wijst naar
`file:apps/playground-lit/vendor/...tgz`.
**Waarom:** de dep was eerst een absoluut pad naar een producer-worktree op deze machine → niet
herbruikbaar in CI/andere checkouts. Een gecommitte tarball is machine-onafhankelijk. (VDS 0.6.0
is een lokale build, niet in een npm-registry die wij beheren, dus een committed tarball is de enige
propere optie zonder registry.)

## 7. Demo: 3-koloms model `vds · flux · vl` met legende
**Beslissing:** overal waar we VDS tonen ter vergelijking: 3 kolommen in vaste volgorde met legende.
`vds-*` = rauw VDS, `flux-*` = doelproduct (erft VDS + flux-tokens), `vl-*` = echte flux ongewijzigd.
**Waarom:** de gebruiker zag rauwe (ronde) VDS-componenten en dacht dat flux "kapot" was. De legende
+ vaste kolommen maken duidelijk dat de rondere linkerkolom BEWUST rauw VDS is, niet een bug. De
rauwe VDS-form kreeg een expliciet "rauw VDS"-label om dezelfde verwarring te vermijden.

## 8. Layout-vergelijking met flux' ECHTE layout-styles
**Beslissing:** VDS heeft layout-COMPONENTEN (vl-box/inline/stack); flux heeft geen layout-component
maar wel layout-STYLES (`vl-group`/`vl-stacked`/`vl-padding`, globaal geladen via autoRegisterStyles).
De flux-kolom gebruikt die styles, niet ad-hoc CSS.
**Waarom:** de gebruiker wilde een eerlijke vergelijking met onze echte layout-aanpak, niet met
verzonnen inline-flex. Het layout-PRIMITIEF zelf blijft 2 benaderingen (VDS-component vs flux-style),
want er is geen `vl-box`-COMPONENT om een derde layout-kolom te vullen.

**Uitbreiding (op vraag):** waar in een layout-blok KNOPPEN zitten (inline · stack) tonen we de knoppen
in dezelfde 3 tiers als de atoom-sectie: `vds-button` (rauw VDS) in de vds-layout, `flux-button` (erft
VDS + tokens) in `vl-group`/`vl-stacked`, en `vl-button` (echte flux) in `vl-group`/`vl-stacked`. Dit
haalt de verwarring weg dat de flux-layout-kolom enkel de echte `vl-button` (35px) toonde terwijl de
flux-atoom-kolom hierboven de `flux-button` (44px) toont: nu staan flux-button en vl-button naast elkaar
in dezelfde layout, zodat het look-verschil zichtbaar en benoemd is i.p.v. impliciet. `vl-box` heeft geen
knoppen en blijft 2-koloms.

## 9. flux-form doelproduct (per-control inheritance)
**Beslissing:** flux-form-demo naast vds-form-demo, met flux-* form-controls (select/checkbox/
textarea/fieldset/radio-group via inheritance). De radio's blijven `vds-radio`.
**Waarom:** de gebruiker wilde de form in beide looks zien. `VlRadio` wordt NIET los geëxporteerd
door VDS (enkel `VlRadioGroup`), dus geen `flux-radio` mogelijk; de radio-group vindt z'n radios via
`VlRadio.elementName` (= `vds-radio`), en de flux-tokens op de group cascaden naar die vds-radio's
(radios zijn rond → radius is toch niet zichtbaar). We dupliceerden de form (i.p.v. de werkende
vds-form + z'n test aan te raken) om regressierisico te vermijden.

## 10. Consument-side overrides (bewuste afwijking van het principe, op vraag)
Telkens: eerst geprobeerd via token; kon niet → gebruiker koos "toch consument-side override"; upstream-
request bleef als propere fix.
- **Hover-grijs weg:** `--base-color-background-surface-form-element-hover` = enabled. Dit is PROPER
  (publiek token), geen afwijking. Waarom: flux-inputs mogen geen grijze hover-achtergrond.
- **Focus-outline (input/textarea/select):** VDS' focusMixin hardcodeert `outline: 0.25rem`/
  `offset: 0.125rem` en NEGEERT het bestaande `--base-border-focus-spacing-width: 3px` token; voor de
  offset bestaat geen token. Override naar flux' 3px/2px (select gebruikt een box-shadow-ring i.p.v.
  outline → box-shadow in px). In px zodat het niet krimpt op de 10px-root.
- **Link-underline:** VDS hardcodeert offset 0.25rem/thickness 0.125rem op `.vl-link .vl-link__slot`;
  flux gebruikt de browser-default. Override naar `auto`/`auto`. Nodig was hogere selector-
  specificiteit (`.vl-link .vl-link__slot`) want de VDS-regel is genest.
- **Checkbox box-radius:** `--base-border-radius-container-2xs: 0.3rem` (proper, publiek token).

## 11. Checkbox box-GROOTTE: geprobeerd, TERUGGEDRAAID
**Beslissing:** de size-override (`--checkbox-box-width: 1.8rem`) is teruggedraaid; enkel de radius
bleef.
**Waarom:** `--checkbox-box-width` is een VDS-INTERNE var (geen publiek token) → tegen het principe;
en het forceren brak de checkbox-layout (de checkmark heeft een aparte vaste `font-size`, de box-grid
schoof). De grootte-mismatch (VDS rendert klein op 10px-root) is een rem-scale-issue → upstream (4a),
niet consument-side te forceren.

## 12. Verificaties (om latere twijfel te vermijden)
- **Checkbox TOONT wel een vinkje bij checked:** de check-glyph U+F2B2 wordt gezet via de
  `vlaanderen-icon` font. Onze eerste metingen leken "leeg" omdat die private-use-glyph als een
  onzichtbaar teken serialiseert; via char-code (0xf2b2) bevestigd dat de glyph er is.
- **flux-button/link radius:** flux-button (3px) matcht de echte `vl-button` (3px = flux' eigen
  `--vl-border--radius: 0.3rem`); de 8px-rondere is de rauwe `vds-`-kolom (per design). Op de echte
  10px-root is dat 3px; in de 16px-root Cypress-context 4.8px (context-verschil, geen bug).

## 13. flux-button hoogte-pariteit met de echte vl-button (fix)
**Beslissing:** flux-button matcht nu exact de echte flux `vl-button` (35px hoog, padding 5/20,
line-height normal), via publieke override-punten op `:host`:
- `--base-space-selectable-inset-vertical-s: 0.5rem` en `--base-space-selectable-inset-horizontal-l: 2rem`
  (5px/20px op 10px-root, zoals de echte knop),
- `--base-typography-desktop-body-medium-compact-s-line-height: normal` (VDS zette 20px),
- `--vl-form-control-height: 3.5rem` = 35px. VDS' knop-CSS leest `height: var(--vl-form-control-height, auto)`,
  dus dit is een bewust override-punt; de echte vl-button heeft een `min-height: 35px` (vast control-height).
**Waarom:** eerder leek flux-button "identiek" aan vl-button, maar dat was een artefact van de
Cypress-component-harness (die flux' globale knop-styling niet faithful laadt → vl-button rendert daar 44px
i.p.v. de echte 35px). Op de ECHTE pagina (browser, 10px-root, flux-globals geladen) was flux-button 44px
en de echte vl-button 35px. Verschil = verticale padding (10 vs 5) + line-height (20 vs normal) + het
ontbreken van de vaste control-height. Bovenstaande drie overrides sluiten de gap; browser-meting bevestigt
1:1 (H35, W identiek, pad 5/20, border 2px, radius 3px).

**Test-gevolg:** `flux-button-parity.cy.ts` vergeleek flux-button met de IN-HARNESS vl-button — een
onbetrouwbare baseline (zie hierboven). Herschreven zodat de test de flux-TARGET-geometrie rechtstreeks
asserteert (root-onafhankelijk: inset-ratio h:v == 4, border 2px, radius-token 0.3rem,
`--vl-form-control-height` == 3.5rem) én dat die verschilt van de rauwe vds-button. De echte 1:1-pariteit
met vl-button is in de browser geverifieerd, niet in de harness.

## 14. flux-datepicker geïntegreerd + integratie-status-accordion
**Beslissing:** `flux-datepicker` erft `VlDatepicker` en krijgt de gedeelde `fluxLook`-tokens (radius,
border-kleur, padding, hover) + een focus-override analoog aan flux-input
(`.vl-datepicker__input-wrapper:has(.vl-datepicker__input:focus) { outline 3px/2px }`). Toegevoegd aan
het gedeelde `flux-form-controls.component.ts`-registry en getoond als 3-tier rij (vds · flux · vl) in
de atoom-sectie.
**Waarom:** de VDS-datepicker gebruikt exact dezelfde `--base-*` tokens als de andere form-controls, dus
`fluxLook` volstond; de focus zit op hetzelfde `__input-wrapper:has(input:focus)`-patroon als vl-input.
Browser-meting: flux-datepicker radius 3px + border-kleur #8695a8 (= flux), i.p.v. rauw VDS (8px). De
echte flux `vl-datepicker` is een aparte flatpickr-implementatie (andere shadow-structuur), maar de
zichtbare box matcht (3px, #8695a8, ~35px).

**Accordion samengevoegd:** de integratie-status is nu één gesloten `<details>` met alle 16 componenten
in één gesorteerde tabel (geïntegreerd, dan onrechtstreeks, dan nog niet). `vl-box`/`vl-inline`/`vl-stack`
staan als ➖ "onrechtstreeks" (ze worden getoond/gebruikt in de layout-sectie; flux gebruikt de
`vl-padding`/`vl-group`/`vl-stacked`-STYLE i.p.v. een wrapper-component), niet als ❌. Stand: 9 ✅ · 4 ➖ · 3 ❌.

## 15. flux-icon geïntegreerd + datepicker-kalender via tokens gelijkgetrokken
**flux-icon:** `flux-icon` erft `VlIcon` (dunne subclass, geen extra tokens). Iconen zijn glyphs uit de
gedeelde `vlaanderen-icon`-font, dus visueel identiek aan `vds-icon` / de echte flux `vl-icon`; de
integratie is puur de tag-registratie. In de playground een selectie-grid (12 iconen) + de drie
`size`-varianten. Accordion-stand: 10 ✅ · 4 ➖ · 2 ❌.

**Datepicker-focus (correctie):** eerst per abuis een outline-override gezet (zoals flux-input), maar dat
deed niks. De datepicker gebruikt de `styles/common/focusMixin` (box-shadow-ring + een TRANSPARANTE
outline), niet de outline-mixin. De zichtbare ring is dus de box-shadow. Fix (zoals flux-select):
`.vl-datepicker__input-wrapper:has(.vl-datepicker__input:focus) { box-shadow: 0 0 0 2px white, 0 0 0 5px var(--base-color-focus-400) }`.
Valkuil bij verificatie: `:focus` matcht niet in een headless tab zonder document-focus (activeElement wél,
maar `:has(:focus)` niet); een ECHTE muisklik was nodig om de ring te zien/meten.

**Datepicker-kalender (Cally) via tokens naar flux-look:** de echte flux `vl-datepicker` is flatpickr
(andere engine), dus 1:1 kan niet, maar de token-adresseerbare verschillen zijn weggewerkt. Referentie
uit de flatpickr-kalender (computed): kalender-hoek 3px, dagen rond. Aanpassingen op `FluxDatepicker`:
- `:host { --base-border-radius-container-xl: 0.3rem }` → popover-hoek van 20px naar 3px.
- `calendar-month { --base-border-radius-selectable-default: 50% }` → dag-cellen rond i.p.v. 3px-vierkant
  (scoped op calendar-month, zodat de input + nav-knoppen hun 3px houden).
De geselecteerde dag was al flux-blauw (`--color-accent: var(--base-color-background-surface-action-default)`).
Resultaat geverifieerd in de browser: dag 15 = blauwe ronde cirkel, today onderstreept, 3px hoeken.

**Kalender-grootte (consument-side override, op vraag):** de kalender rendert te klein op flux'
10px-root omdat de dag-cel een hardgecodeerde `2.25rem`-literal is (geen token), die de
rem-scale-compensatie niet raakt; de cel-paddings lopen wél via tokens en worden wél geschaald, dus
je krijgt geschaalde paddings rond te kleine 22.5px-cellen (gedrongen, 16px-tekst in mini-vakjes). De
font zelf is correct 16px. Fix via `::part`:
`calendar-month::part(button) { width/height: calc(var(--global-font-size-scaled-base,1rem) * 2.25) }`
= 36px op de 10px-root. Bewuste VDS-CSS-override (geen token voor de celgrootte), upstream-request
toegevoegd aan VDS-UPSTREAM-REQUESTS 4a. Geverifieerd: cel 22.5px naar 36px, proper proportie.

## 16. Focus-ring: systematisch gelijkgetrokken over ALLE componenten (correctie)
Aanleiding: de focus was inconsistent gedaan (sommige componenten niet, en button/select/datepicker
via box-shadow terwijl de ECHTE flux overal een outline gebruikt). Systematisch gemeten op de echte
`vl-*`: de flux focus-ring is overal `outline: 3px solid rgba(0,85,204,0.65)` + `outline-offset: 2px`
(button, link, input, datepicker identiek gemeten). Alle flux-componenten daarnaartoe gebracht:
- outline-mixin-componenten (input, link, textarea, checkbox): `outline-width: 3px; outline-offset: 2px`.
  Checkbox vergde de VOLLE VDS-selector (`:host(:focus) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box`),
  anders won de specifiekere VDS-regel.
- box-shadow-mixin-componenten (button, select, datepicker): de VDS-outline is TRANSPARENT, dus een
  width/offset-override alleen is onzichtbaar. Fix = outline zichtbaar maken (`outline-color` zetten) +
  `box-shadow: none`. Dit verving mijn eerdere (foute) box-shadow-override.
- kleur: `--base-border-focus-spacing-color: rgba(0,85,204,0.65)` op elke flux-`:host` (VDS-default was #5990de).
- `flux-radio` niet fixbaar (vds-radio encapsulated shadow, VlRadio niet geexporteerd) → blijft VDS-default.
Geverifieerd met ECHTE focus (headless `:focus` matcht niet zonder venster-focus, dus een echte muisklik
eerst): flux == vl (3px/2px + `rgba(0,85,204,0.65)`) voor button/link/input/datepicker; checkbox/select/textarea
op dezelfde flux-waarde. Zie VDS-UPSTREAM-REQUESTS 3 voor het volledige verhaal.

## 17. Icon-vergelijking legt een glyph-collision bloot (correctie op #15)
De 3-tier icon-vergelijking (vds-icon · flux-icon · vl-icon) toonde dat mijn eerdere aanname
("glyphs identiek, integratie triviaal") FOUT was. Op de playground tonen `vds-icon`/`flux-icon`
andere en kleinere glyphs dan de echte `vl-icon`. Oorzaak (gemeten): flux en VDS delen de
font-familienaam `vlaanderen-icon` maar met verschillende codepoint-KLASSEN (VDS `vl-vi-*`,
flux `vl-icon--*`). Er is maar 1 font-bestand geladen (dat van flux, want vl-icon rendert correct),
dus de VDS-klassen mappen op verkeerde glyphs. Daarnaast is de VDS-icon-grootte een rem-literal
(`vl-icon--large` = 12px op de 10px-root vs 18px bij vl-icon). Gevolg: `vl-icon` in de accordion
van ✅ naar ➖ gezet (flux-icon is wel geregistreerd, maar rendert niet matchend op een mixed page).
Belangrijk: dit is grotendeels een PLAYGROUND-artefact (we laden flux' font naast VDS voor de
vergelijking); in een echte flux-op-VDS build is er enkel VDS' font en geen `vl-icon`, dus dan
speelt de glyph-collision niet. De rem-size blijft wel een aandachtspunt (zie 4a).

## 18. Master-toggle "Rauw VDS tonen" + oplijsting van alle lokale overrides
Op vraag: één schakelaar die ALLE consument-side overrides tegelijk aan/uit zet (flux-look ↔ rauw VDS),
plus een volledige lijst van wat we lokaal wijzigden.
- **Mechanisme:** elk override-blok in de flux-componenten staat achter `:host(:not([bare]))`. Er zijn
  GEEN property-declaraties nodig: enkel de aanwezigheid van het `[bare]`-attribuut stuurt de CSS.
  De app zet `bare` imperatief in `updated()` op alle flux-* (light DOM + de flux-form-demo-shadow),
  gedreven door één `@state overridesOff` + een checkbox. Geverifieerd: met `bare` AAN wordt flux-button
  pixel-identiek aan de rauwe vds-button (radius 8px, pad 10/14, h42), en het attribuut bereikt ook de
  form-controls in de form-shadow.
- **Oplijsting:** sectie "Lokale overrides" met een tabel (24 rijen), gecategoriseerd als
  token (12, idiomatisch publiek `--base-*`), workaround (9, VDS-CSS overschreven want geen token) en
  rem-brug (3, scale-compensatie). De workarounds verwijzen naar VDS-UPSTREAM-REQUESTS. Dit is de
  consument-side "kost" van de flux-look zichtbaar gemaakt; de token-rijen zijn het bedoelde mechanisme,
  de workaround-rijen zijn wat upstream hoort.

## 19. vlaanderen-icon font-collision (iconen + checkbox-vinkje) — bewezen niet consument-side fixbaar
De 3-tier icon-vergelijking legde bloot dat `vds-icon`/`flux-icon` verkeerde glyphs tonen. Volledig
uitgezocht: flux én VDS shippen allebei een font met dezelfde naam `vlaanderen-icon` maar met
VERSCHILLENDE codepoint-maps (VDS spant `f101–f316`, flux overlapt). Beide `@font-face`'s zijn
full-range, dus de browser kiest één winnaar (die van flux); de VDS-codepoints renderen dan verkeerde
glyphs. **Het checkbox-vinkje heeft exact dezelfde oorzaak:** dat is intern een `<vds-icon icon="check">`.
Dus "geen vinkje" en "verkeerde iconen" zijn één en hetzelfde probleem.

**Waarom niet consument-side fixbaar (getest):**
- Beide libraries hardcoden `font-family: vlaanderen-icon !important` in hun encapsulated shadow → het
  gebruik is aan geen van beide kanten te hernoemen.
- De codepoint-ranges overlappen volledig → geen `unicode-range`-splitsing mogelijk.
- Een extra document-`@font-face` met VDS' font als LAATSTE toegevoegd: die laadde wel (5e face, HTTP 200)
  maar won de cascade NIET (bij 5 identieke full-range faces bepaalt de browser de winnaar op een manier
  die niet consument-side te forceren is). Poging teruggedraaid.

**Beslissing (op vraag):** laten staan en documenteren, geen fragiele hacks. Het is een PLAYGROUND-artefact:
het treedt enkel op omdat we flux' legacy-icon-font laden voor de `vl-*`-referentiekolom náást VDS. In een
echte flux-op-VDS build (enkel VDS' font, geen `vl-icon`) is er geen collision en renderen zowel de iconen
als het checkbox-vinkje correct. Enige losstaande, wél-fixbare deelkwestie: de VDS-icon-GROOTTE (rem-literal,
achter de `[scaled]`-toggle, zie 4a).

## 20. Font-collision opgelost via een ALIAS (flux-icon), beide fonts coexisteren
Vervolg op #19. De collision is voor ONZE eigen `flux-icon` wél weg te werken met een alias, zodat
flux' en VDS' icon-font naast elkaar bestaan:
- We laden VDS' font onder een UNIEKE `font-family`-naam `vds-vlaanderen-icon` via een `@font-face` op
  DOCUMENT-niveau (in `flux-icon.component.ts` als module-side-effect). Belangrijk: het `@font-face` MOET
  document-niveau zijn, niet in Lit's `static styles` (constructed/adopted stylesheets laden een `@font-face`
  niet betrouwbaar in Chrome). Unieke naam = geen collision, laadt gewoon.
- Op `flux-icon` overrulen we de glyph-`font-family` naar die alias:
  `:host [class*='vl-vi-']::before { font-family: 'vds-vlaanderen-icon' !important }`. De `:host`-prefix is
  nodig om de specificiteit van VDS' eigen regel (`:host [class*='vl-vi-']::before ... !important`) te
  evenaren; met een latere, even-specifieke `!important` wint de onze.
Resultaat: `flux-icon` rendert de juiste VDS-glyphs (via VDS' font onder de alias), terwijl `vl-icon` flux'
font blijft gebruiken. Gemeten/gezien: flux-icon glyph-font = `vds-vlaanderen-icon`, vl-icon = `vlaanderen-icon`,
beide correct.

**Grens:** dit werkt enkel op elementen die WIJ stylen. De rauwe `vds-icon`-kolom en het checkbox-vinkje
(intern een `<vds-icon icon="check">`) blijven de collision tonen, want dat is de `vds-icon`-TAG zelf en z'n
glyph zit in een geneste shadow die we van buitenaf niet bereiken. Om die ook te fixen zou je de `vds-icon`-tag
zelf als aliased subclass moeten registreren (vóór `defineAll`), wat de "rauwe VDS"-referentiekolom overschrijft;
open beslissing. Dit is de consument-side variant van upstream-request 4b (namespace de VDS-icon-font).

## 21. Select-tekst te klein (rem-literal in de size-modifiers)
Breed gemeten op de 10px-root: alle flux-tekst was 16/18px (correct via scale-token), BEHALVE de select:
`flux-select`-tekst = 10px, de datepicker-kalender-header-select = 8.75px, en de dropdown-`option`s = 10px.
Oorzaak: VDS' `.vl-select` gebruikt op de basis wél `--base-font-size-desktop-s` (scaled), maar de
size-modifiers (`.vl-formfield__container--{small,medium,large} .vl-select`) én de `option`s overschrijven
dat met RAUWE rem (`0.875rem / 1rem / 1.125rem`). Medium is default → `1rem` = 10px. Zelfde klasse als de
icon-rem-literal (4a).
Fix (consument-side, gated met `[bare]`): op `flux-select` de drie size-modifiers naar
`calc(scaled-base * ...)`, en de `option`s met `!important` (de `::picker(select)` top-layer wordt via een
geïnjecteerde `<style>` gestyled, niet via adoptedStyleSheets, dus een gewone regel verliest). De
datepicker-header-select (geneste `vds-select`, size small) via `calendar-date vds-select::part(select)` +
`!important`. Gemeten na fix: select 16px, header-select 14px, opties 16px. De datepicker z'n GENESTE
vds-select dropdown-`option`s (aanvankelijk 10px, onbereikbaar via CSS) zijn later WEL gefixt via dezelfde
adoptedStyleSheets-injectie als het checkbox-vinkje: `flux-datepicker.updated()` voegt een geconstrueerde
`.vl-select option{font-size:...}`-sheet toe aan elke geneste `vds-select`. Eindresultaat: geen enkele
te kleine tekst meer in de flux-componenten (paginabrede scan leeg, ook met open kalender).

## 22. Extra vergelijkingsrijen (checkbox/select/radio-group), icon-defaults, link-hover
Batch op vraag:
- **Eigen 3-tier-rijen** voor checkbox, select en radio-group (naast de form-demo), in de "drie varianten"-sectie
  zoals button/input/link. De echte `vl-*` form-componenten (`VlCheckboxComponent`, `VlSelectComponent`,
  `VlRadioGroupComponent`, `VlRadioComponent`) uit `@domg-wc/components/form` (= repo's eigen `libs/`) geregistreerd.
  LET OP: de flux-API wijkt af van VDS: `vl-select` neemt een `.options`-array (geen `<option>`-children), en
  `vl-radio` toont z'n label via een `<slot>` (tekst-child), niet via het `label`-attribuut (dat enkel `aria-label`
  zet). vds/flux gebruiken wél option-children resp. `label`-attribuut.
- **Iconen standaard correct**: `iconScaled` default `true` (glyphs al correct via de alias, grootte via
  scale-comp ≈ 19px). De grootte-checkbox is omgekeerd: default UIT = correct, aanvinken = "toon rauwe VDS-grootte"
  (12px, het probleem).
- **Icon-uitleg in een accordion** (`<details>`, dicht by default) i.p.v. een grote altijd-zichtbare note.
- **flux-link hover**: underline verdwijnt op hover (zoals FWC/de echte flux), via
  `:host(:not([bare])) .vl-link:hover .vl-link__slot { text-decoration-line: none }`. Geverifieerd met echte hover
  (`anchorHovered: true`, slot-decoration `none`).

## 23. Mobile-pariteit: echte flux heeft 767px-breakpoints die de VDS-flux miste
Bevinding: de look-pariteit was enkel op DESKTOP gevalideerd. De echte flux-componenten (`libs/components`,
`vl-*`) hebben `@media screen and (max-width: 767px)`-regels (`vlMediaScreenSmall = 767`) die op mobile andere
maten zetten. Onze VDS-gebaseerde flux-* mirrorden die niet, dus flux week op klein scherm af van de echte flux.

Audit van de geïntegreerde componenten (welke hebben een 767px-delta in echte flux):
- **button**: WEL, en zichtbaar (9px). Desktop is de knop 35px (`padding 5px 20px`), op mobile schakelt echte flux
  naar uniforme `--vl-spacing--xsmall`-padding (1rem) en laat de vaste height los (`min-height 3.5rem`, groeit met
  padding naar ~44px voor een groter touch-target). Onze flux-button hield z'n vaste `--vl-form-control-height: 3.5rem`
  (= `height: 35px`, border-box → padding groeide niet mee). GEFIXT met een mobile-tak: inset-tokens naar 1rem +
  `.vl-button { height: auto; min-height: 3.5rem }`. Gemeten: desktop flux=vl=35px, mobile flux=vl=44px, vds rauw
  blijft 42px (toont het verschil). Dit ging via PUBLIEKE tokens + een height-lever die VDS honoreert.
- **select**: WEL, maar verwaarloosbaar. Echte flux zet op mobile `font-size: small` + `line-height = height`; gemeten
  is het font gelijk (16px) en het hoogteverschil 1px (34 vs 35). Niet gefixt.
- **checkbox**: WEL, maar sub-2px: label `line-height` 2.4rem→2.2rem, box `margin-top` 0.3rem→0.2rem. Bovendien zit dit
  in VDS-INTERNE layout-klassen (`.vl-checkbox__box/__label`) waar VDS z'n eigen uitlijning heeft; de echte-flux-waarden
  daar blind op plakken is riskant (kan juist MISlijnen) voor onzichtbare winst. Niet gefixt.
- **link**: enkel de `.small`/`.large`-varianten (-0.1rem / -0.2rem font op mobile); de basis-link is ongewijzigd. Niet
  in de demo zichtbaar. Niet gefixt.
- **radio-group / textarea / datepicker**: GEEN 767px-breakpoint. De datepicker-kalender is een vaste ~307px-popover die
  op mobile past.

Les: de knop was fixbaar omdat z'n maten aan publieke `--base-*`-tokens + een override op de publieke `.vl-button`-klasse
hangen. Voor componenten waar de mobile-delta in VDS-interne layout zit, geldt dezelfde grens als bij de rem-literals:
consument-side niet netjes te mirroren, hoort upstream (VDS zou de mobile-maten ook moeten tokeniseren). De componenten
zelf breken niet op mobile; de VDS web-componenten hebben geen eigen width-breakpoints, dus de flux-look houdt stand.

Los hiervan: de PLAYGROUND-PAGINA is niet mobile-proof (547px horizontale overflow door de 3-koloms vergelijkingsgrids
en brede tabellen, plus de zwevende toggle die daardoor buiten beeld valt). Dat is een layout-kwestie van de demo, geen
component-pariteit, en staat los open.

## 24. Form-demo 3-weg (vds · flux · vl) + gedeelde getFormValue/setFormValue-utils
Op vraag: naast vds-form en flux-form nu ook een **echte vl-form** (de flux-web-componenten uit `libs/components`),
zodat de form-demo dezelfde 3-weg-vergelijking heeft als de losse componenten.

Structurele bevinding (belangrijk voor de migratie): de echte `vl-*` form-velden componeren hun form-chrome
ANDERS dan vds/flux. Waar vds/flux `label` + `message` als PROPS op het veld zetten, rendert een echte
`vl-input-field` enkel de `<input>` met `aria-label` (geen zichtbaar label). De echte flux verwacht dat de
consument label en melding als APARTE componenten plaatst en via `for=id` koppelt:
- zichtbaar label: `vl-form-label for="id" label="..."` (met `block` voor gestapeld i.p.v. inline);
- validatie-melding: `vl-form-message for="id" state="valueMissing|typeMismatch|..."`, default verborgen
  (`show=false`), getoond zodra de bijhorende validity-flag actief is; `variant="annotation"` toont altijd;
- checkbox toont z'n label via een slotted tekst-child (`<vl-checkbox>Sport</vl-checkbox>`), niet via `label`;
- radio-group verbergt z'n `label` in een visually-hidden legend, dus ook daar een `vl-form-label`;
- fieldset gebruikt een `legend`-slot (`<span slot="legend">...</span>`).
Alle vl-velden erven van `FormControl` (`@open-wc/form-control`), dus formAssociated: `new FormData(form)`
leest ze via `name`, net als vds/flux. `blur-validation` op de `<form>` cascadeert naar alle controls en
stelt de eager-validatie uit tot blur/submit (anders tonen de required-meldingen al bij load).

**Gedeelde utils** (`form-value-utils.ts`): `getFormValue`/`setFormValue` (+ `getFormValues`/`setFormValues`)
die over de drie tag-families (`vds-`/`flux-`/`vl-`) heen werken. Ze vervangen de brittle native-proto-hack die
in elke form-demo gedupliceerd stond. Twee bevindingen zaten in de weg:
- **VDS form-value updatet niet op host-`.value`**: enkel de host-property zetten laat de FormData-waarde leeg;
  de form-associated waarde (ElementInternals) updatet pas als de INNER native control een `input`/`change`
  krijgt. Daarom zet de util de inner control via de prototype-value-setter + dispatcht events (dat drijft
  meteen ook de component z'n eigen `onInput` → `setValue` bij de echte flux). Host-`.value` + inner samen in
  één tick gaf een validity-refresh-timingbug, dus inner-only is de robuuste weg (host-`.value` enkel als er
  geen inner control is).
- **Host `checkValidity()` kan stale zijn** bij de echte flux na een error-state + programmatische fill; daarom
  leest de vl-form-demo de INNER native control z'n `validity` (altijd actueel) i.p.v. de host.
Gemeten eindresultaat: de drie form-demo's leveren via "Vul demo-data in" + "Verzenden" **identieke FormData-JSON**,
en de vl-form toont per-validity NL-meldingen (verplicht / geldig e-mailadres) zoals vds/flux.

## 25. Checkbox-vinkje zichtbaar + checkbox/radio-grootte + vl-form-label in vergelijkingsrijen + vl-stacked
Batch op vraag:
- **Checkbox-vinkje (eindelijk de echte oorzaak).** Het vinkje was er wel, maar DONKERGRIJS op de blauwe box =
  onzichtbaar. VDS' checkbox-CSS zet de check-kleur via `vl-icon.vl-checkbox__check { color: --base-color-icon-on-action }`;
  onder de `vds-`-prefix is het element `vds-icon`, dus die selector matcht niet en de kleur valt terug op donker. Fix
  consument-side: `:host(:not([bare])) .vl-checkbox__check/__indeterminate { color: #fff }`. (Upstream punt 6: de
  interne selector moet prefix-aware zijn.) Het alias-font-werk uit #20/#21 was correct; de kleur was het echte probleem.
- **Checkbox/radio te klein.** VDS checkbox-box `--checkbox-box-width: 1.125rem` en radio-box `1.125rem` (rauwe rem)
  renderen ≈13px op de 10px-root i.p.v. de echte-vl ≈18px. Checkbox: `--checkbox-box-width` naar
  `calc(scaled-base * 1)`. Radio: de radios zijn `vds-radio` (slotted, andere shadow) en de box-grootte is een
  hardcoded rem zonder var, dus via adoptedStyleSheets-injectie in `FluxRadioGroup.updated()` (zoals het
  checkbox-vinkje/datepicker) `.vl-radio__box` + dot geschaald. Gemeten flux checkbox+radio = 18px = echte vl.
- **vl-form-label in de vergelijkingsrijen.** De echte `vl-*` velden tonen hun `label` enkel als `aria-label`, dus de
  vl-kolom stond zonder zichtbaar label t.o.v. vds/flux. Per rij een `vl-form-label for="id"` toegevoegd
  (input/datepicker/select/radio-group); de checkbox-label via slot-tekst i.p.v. het `label`-attribuut.
- **vl-stacked full-width.** `.vl-stacked` is `flex; column`, dus met de flex-default `align-items: stretch` rekken
  ALLE kinderen full-width, identiek voor flux en vl (de oude note die beweerde dat enkel flux rekte, klopte niet:
  beide zijn `display:block` en rekken). Om ze te laten huggen: `align-items: flex-start` op de demo-stacks. Flux en
  vl staan nu gelijk (beide op natuurlijke breedte).
- **Utils-bevestiging.** Alle drie de form-demo's (vds/flux/vl) importeren én gebruiken `setFormValue` in hun
  `fillDemo` (niet enkel de vl-demo).

## 26. Datepicker-icoon niet aliased + checkbox-vinkje niet gecentreerd (positie/grootte/display)
Vervolg op #25, na "iconen nog steeds kapot: positie, grootte, correcte weergave".

- **Datepicker-kalendericoon (font-collision).** De checkbox-check kreeg de vlaanderen-icon-alias wel (via
  `aliasVdsIcon` in `FluxCheckbox.updated()`), maar de datepicker NIET: z'n toggle-icoon (`vds-icon.vl-vi-calendar`)
  gebruikte de rauwe `vlaanderen-icon`-font → collision → verkeerde glyph. Fix: `FluxDatepicker.updated()` aliaset nu
  z'n `vds-icon`(en) + een `MutationObserver` op de shadowRoot vangt de dynamisch bijkomende kalender-popover-iconen.
  Gemeten: toggle-icoon nu font `vds-vlaanderen-icon` (U+f2c4 = kalender), geen enkele rauwe `vlaanderen-icon` meer.
  De kalender-nav ‹ › zijn geen icon-font-glyphs (chevrons), dus geen collision daar.
- **Checkbox-vinkje niet gecentreerd (5px te laag).** Het opschalen van de box (13→18px via `--checkbox-box-width`,
  zie #25) brak de centrering: de geneste `vds-icon.vl-checkbox__check` is `position: static; display: inline-block`
  met een `line-height` van ~21px (hoger dan de 16px-box) → de check zakte onderaan (dy +5, dx −2.5). VDS' positionering
  was op de 13px-box afgestemd. Fix: check + indeterminate `position: absolute; inset: 0; display: flex; align-items/
  justify-content: center; line-height: 1` → glyph exact gecentreerd (gemeten dx/dy 0, = echte vl). Bevestigd: geen
  minus-overlap (indeterminate-glyph leeg bij checked).
- **Meta-valkuil: meerdere dev-servers, verschuivende poort.** Er draaien parallel meerdere webpack-dev-servers uit
  verschillende worktrees, allemaal met titel "Playground Lit". webpack negeert de launch.json-poort (8084) en bindt
  de eerste vrije vanaf 8080; bezette poorten schuiven mijn server naar 8083/8084/... Gevolg: makkelijk de VERKEERDE
  pagina bekijken (een andere branch/worktree, of stale). Verifieer altijd de bound-poort via `preview_logs` ("Loopback:
  http://localhost:PORT") en check een branch-specifieke marker (bv. `vl-form-demo` aanwezig).

**Open (op gebruikersvraag te beslissen):** de datepicker-TOGGLE-KNOP zelf is nog de VDS-default (blauw blok + wit icoon);
de echte vl-datepicker heeft een witte/subtiele knop + blauw icoon (SVG). Dat is een aparte override op de geneste
vds-button (achtergrond + icoonkleur), niet het icoon; nog niet aangepast.

## 27. Rauwe vds-kolom geïsoleerd in iframe: VDS tonen zoals bedoeld
Vraag: "hoe komt dat de VDS-componenten er zo kapot uitzien, en wat is er nodig om ze te tonen zoals bedoeld?"
Antwoord: het was grotendeels ONZE hostomgeving, niet VDS. Drie oorzaken: (1) de font-collision (flux' gelijknamige
`vlaanderen-icon`-font wint → verkeerde glyphs), (2) de flux-10px-root (rauwe rem-literals renderen op 62.5% → alles
te klein), (3) de prefix-selector-bug (upstream #6, enkel onder custom prefix). In een schone VDS-app spelen 1 en 2
niet, en met de default `vl-`-prefix ook 3 niet.

Gekozen oplossing (boven "compensaties ook op vds" en "laten + note"): de vds-cellen van de 7 vergelijkingsrijen
renderen in een **geïsoleerd iframe** met een eigen document: 16px-root, VDS' eigen icon-font, default `vl-`-prefix,
geen flux. Nieuwe webpack-entry `vds-frame.html` + `vds-frame.ts` (`?demo=button|input|link|datepicker|checkbox|
select|radio-group|icon`); de kolom blijft zo eerlijk "rauw VDS", maar dan zoals VDS het bedoelt. Gemeten in de
frames: kalender-icoon correct (`vlaanderen-icon`, 19.2px), checkbox-vinkje wit (de `vl-icon.…`-selector matcht weer
onder de default prefix), box 20px, geen clipping op desktop-breedte. Binnen de frame heten de tags gewoon `vl-*`
(VDS' default), wat meteen demonstreert dat de collision-problematiek pas ontstaat zodra flux en VDS één document
delen. Rollback-punt: commit 9c9a7d6b (alles vóór de iframe-stap gecommit).

Bewust NIET mee geïsoleerd: de vds-form-demo-kolom (zou een vl-*-getagde herbouw van de form vergen) en de
icon-showcase (die demonstreert de collision juist). Eventueel vervolg op vraag.

## 28. vl-icon (echte flux) toonde verkeerde glyphs: de OMGEKEERDE font-collision
Vraag: "de icons bij vl-icon helemaal onderaan tonen nog altijd verkeerde icons."

De font-collision heeft TWEE kanten. Tot nu fixten we de flux-op-VDS-kant (flux-icon/checkbox/datepicker → alias
`vds-vlaanderen-icon`). Maar de echte flux `vl-icon` had het spiegelbeeld-probleem: hij gebruikt class
`vl-icon--calendar` met flux' eigen codepoint (calendar = U+f14b) in font `vlaanderen-icon`. Op DOCUMENTNIVEAU was
`vlaanderen-icon` echter VDS' font: `vds-prefix-aware.ts` importeerde `@govflanders/.../vlaanderen-icon.css`, en flux'
eigen `vlaanderen-icon`-@font-face (CDN, uit `vlFontStyles`) zit enkel op adopted-niveau (dat laadt niet betrouwbaar,
zie #20). Dus vl-icon vroeg U+f14b maar kreeg VDS' glyph op U+f14b = verkeerd icoon.

Fix: `flux-iconfont.ts` injecteert flux' `vlaanderen-icon` (CDN-woff2, via de `iconFontLocation`-export van
`@domg-wc/styles`) op documentniveau, en wordt in `main.ts` ALS LAATSTE geïmporteerd. Bij meerdere gelijknamige
@font-face wint de laatst gedeclareerde voor het hele bereik, dus `vlaanderen-icon` = flux' font. De expliciete VDS-
`vlaanderen-icon.css`-import is uit `vds-prefix-aware.ts` verwijderd (VDS blijft bereikbaar via de aparte alias
`vds-vlaanderen-icon`). Gemeten/gezien: vl-icon toont nu calendar/user/mail/search correct; flux-icon + checkbox +
datepicker ongewijzigd (alias); de vds-iframes ongewijzigd (eigen font intern). De rauwe vds-icon-showcase op de
hoofdpagina toont nu flux' glyphs op VDS-codepoints = nog steeds "fout", wat exact de collision demonstreert.

Les: bij een naam-collision op `vlaanderen-icon` moet je BEIDE kanten regelen. Één kant (VDS→alias) volstaat niet;
de andere kant (flux' eigen font moet op documentniveau de plain naam winnen) is even nodig. Structureel lost upstream
#4b (VDS z'n font namespacen) dit in één klap op.

## 29. Icon-showcase: vds-icon-kolom alsnog geïsoleerd (supersedes #27-noot)
De gebruiker bedoelde met "VDS-iconen nog steeds kapot" specifiek de **icon-showcase** (`icon (vds · flux · vl)`),
niet de losse vergelijkingsrijen. In #27 lieten we die kolom bewust rauw "om de collision te demonstreren"; dat is nu
teruggedraaid op vraag. De `vds-icon`-cel is nu, net als de andere vds-kolommen, een **geïsoleerd iframe** per icoon:
`vds-frame.ts` kreeg een enkel-icoon-modus (`?demo=icon&name=<icon>` → één `vl-icon size="large"` in het geïsoleerde
16px/eigen-font/default-`vl`-prefix-document). Alle drie de kolommen tonen nu correcte glyphs (vds via iframe, flux via
de alias, vl via flux' eigen font uit #28). De accordion blijft de host-collision uitleggen. Geverifieerd: het
geïsoleerde kalender-icoon rendert correct (`vl-vi-calendar` U+f2c4 in VDS' `vlaanderen-icon`, 19.2px). De collision zelf
is nog steeds impliciet zichtbaar zolang je bedenkt dat de niet-geïsoleerde flux-host precies dit brak; wie de rauwe
breuk live wil zien, zet de iframe-isolatie tijdelijk af.

## Terugkerende valkuilen / lessen
- **Preview-tool onbetrouwbaar:** de webpack-devServer bindt de default-poort (8080/volgende vrije),
  niet de 8084 uit launch.json → de preview-browser is vaak onbereikbaar (chrome-error). We
  verifiëren daarom via Cypress (poort-onafhankelijk).
- **HMR herregistreert geen custom element:** na een wijziging aan een flux-* component moet je HARD
  reloaden (Cmd+Shift+R), anders blijf je de oude registratie zien. Meermaals oorzaak van "ik zie het
  niet veranderen".
- **rem vs px in tests:** Cypress draait op 16px-root, de echte pagina op 10px-root. rem-gebaseerde
  waarden verschillen dus tussen test en pagina; asserties op px-waarden of op "wijkt af van X" i.p.v.
  hardcoded rem-afgeleiden.
- **Selector-specificiteit bij overrides:** VDS nest z'n selectors (`.vl-link .vl-link__slot`), dus een
  bare `.vl-link__slot`-override verliest de cascade. Match de nesting.
