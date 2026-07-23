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
