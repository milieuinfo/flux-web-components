# FLUX-704: VDS web components en de `vl-` tag-clash

## Context

Het Vlaanderen Design System (VDS) heeft een prefix-aware feature: een consumer kan
de default `vl-`-tag van de VDS web components vervangen door een eigen tag
(via `defineAll('<prefix>')`).

Dit is relevant voor flux omdat flux vandaag óók de `vl-`-tag gebruikt. Beide
libraries proberen dus dezelfde custom-element-namen te registreren (bijvoorbeeld
`vl-button`), en `customElements.define` laat maar één registratie per tag toe. Zonder
oplossing kan flux z'n `vl-button` en VDS z'n `vl-button` niet samen op één pagina
bestaan.

Het achterliggende doel: flux z'n atomic components op termijn onderliggend laten
bouwen op de VDS components, zonder dat er voor de **afnemers** iets verandert (zelfde
tags, zelfde look).

## Strategieën

Elke strategie heeft een eigen doc met implementatieplan en effort-inschatting in
[`prefix-aware-strategies/`](prefix-aware-strategies/):
- [Strategie 1: flux prefix-aware maken](prefix-aware-strategies/strategy-1-flux-prefix-aware.md)
- [Strategie 2: flux-tags hernoemen (`vl-` naar `flux-`)](prefix-aware-strategies/strategy-2-rename-flux-prefix.md)
- [Strategie 3: VDS onder eigen prefix, flux blijft `vl-`](prefix-aware-strategies/strategy-3-vds-custom-prefix.md)
- [Strategie 4: gefaseerd (v3 = strategie 3, v4 = namespace-flip naar `flux-`)](prefix-aware-strategies/strategy-4-phased-v3-v4.md)

### 1. Flux zelf prefix-aware maken en hernoemen naar `flux-`

Flux implementeert een eigen prefix-aware registratie en verschuift al z'n tags naar
`flux-` (`flux-button`, `flux-input`, ...). VDS mag dan `vl-` houden.

- Voordeel: propere namespace-scheiding, flux bezit z'n eigen prefix.
- Nadeel: breaking change voor alle flux-afnemers (elke `vl-*` in hun markup moet
  `flux-*` worden). Grote migratie, en alle interne flux-referenties (templates,
  selectors, tests) moeten mee.

### 2. Find & replace `vl-` naar `flux-`

De botte variant van strategie 1: een tekstuele vervanging van `vl-` naar `flux-`
doorheen de codebase.

- Voordeel: in opzet simpel.
- Nadeel: zelfde breaking change voor afnemers als strategie 1, plus broos. `vl-`
  komt niet enkel in tags voor maar ook in CSS-klassen (`vl-button`), attributen en
  tekst, dus een blinde replace raakt te veel. Lost bovendien de coexistentie met VDS
  niet structureel op.

### 3. VDS onder een eigen prefix, flux blijft `vl-` (gevalideerd in de PoC)

We laten flux ongemoeid op `vl-` en registreren de VDS components onder een eigen
prefix met hun ingebouwde feature: `defineAll('vlds')`. Optioneel komt er een dunne
adapter zodat een flux-tag (bijvoorbeeld `vl-button`) intern een VDS-component rendert,
waardoor afnemers hun `vl-*`-markup én de oude look behouden.

- Voordeel: geen breaking change voor afnemers. Geleidelijke migratie per component
  mogelijk (first-wins registratie: wie eerst `define`t wint, de ander skipt zonder
  crash). De flux-look blijft behouden via design-tokens en `::part`.
- Nadeel: twee componentensets en twee Lit-instanties in de bundle. Styling-pariteit
  heeft grenzen (zie bevindingen). VDS is Vite-georiënteerd, dus de consumer-bundler
  vraagt wat configuratie.

### 4. Gefaseerd: v3 (strategie 3) dan v4 (namespace-flip)

Een tijdlijn over twee majors i.p.v. een losse keuze:
- **v3**: VDS onder eigen prefix (`vlds-`), flux blijft `vl-`, sommige flux-componenten
  gebruiken VDS onderliggend. Geen breaking change.
- **v4**: alle flux-tags worden `flux-`, VDS krijgt de default `vl-` (en hoeft dan zelf
  geen prefix-aware meer te zijn). Breaking change voor afnemers, major release.

Detail in [strategy-4](prefix-aware-strategies/strategy-4-phased-v3-v4.md).

## Aanbeveling

**Strategie 4 (gefaseerd), startend met v3.** v3 (= strategie 3) legt de wijziging bij
ons i.p.v. de afnemers, gebruikt de VDS-prefix-feature waarvoor hij bedoeld is, en laat
een component-per-component overgang toe zonder big-bang.

De `flux-` rename hoort in **v4**, niet v3: v3's hele waarde is "geen breaking change",
en de rename is intrinsiek een major. v4 (en dus `flux-`) is bovendien enkel nodig als
het doel is dat VDS de canonieke `vl-`-default inneemt; anders kan v3 het eindstation
blijven.

## PoC-bevindingen (zie `.claude/plans/prefix-aware-poc.md` voor detail)

- **Coexistentie werkt**: 14 VDS-componenten geregistreerd als `vlds-*` naast flux
  `vl-*`, geen registry-collision. Zelfs een verkeerde `defineAll('vl')` is een
  onschadelijke no-op (twee guards, flux wordt niet overschreven).
- **Adapter werkt**: `vl-button` met de oude flux-API rendert een VDS-button
  onderliggend (first-wins registratie), inclusief variant/size/icon/href-mapping.
- **Form werkt**: de VDS form-velden zijn formAssociated, dus een native `<form>` plus
  `FormData` leest hun waarden via `name`, ook onder de custom prefix.
- **Look-pariteit via tokens + `::part`**:
  - button: volledig matchbaar naar flux.
  - input: matchbaar via tokens voor het veld-box; de form-layout-chrome (label/message
    grid) is structureel en niet via tokens weg te krijgen.
  - link: underline-kleur matchbaar via token, maar underline-offset en -thickness
    zitten hardcoded in encapsulated CSS (geen token, geen part), dus vergen upstream.
  - title: geen VDS title-component, enkel typografie-tokens.
- **Rem-basis**: flux zet de document-root op 62.5% (1rem=10px), VDS verwacht de
  16px-default. De VDS-PR is geland (0.6.0): de font-size-tokens schalen runtime via
  `--global-font-size-scaled-base` (1.6rem zetten volstaat). De overige maat-tokens
  (dimension/space/shadow) zijn upstream nog rauwe rem-literals; die krijgen hetzelfde
  calc-patroon via een gegenereerd override-bestand, tot VDS ze ook upstream dekt.

## Grenzen / open vragen

- Bundle-grootte en dubbele Lit-instantie bij brede uitrol.
- Waar styling hardcoded in encapsulated CSS zit, is exacte flux-pariteit enkel upstream
  op te lossen (token of part exposen).
- Of de adapter-laag (oude flux-API bovenop VDS) nodig blijft, of dat afnemers
  rechtstreeks de VDS-API mogen gebruiken na verloop van tijd.
