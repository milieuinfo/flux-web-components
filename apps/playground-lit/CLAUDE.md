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

## Strategie

De strategie-documenten staan niet op deze branch. Ze leven op de aparte branch
`lab/FLUX-704-afnemen-VDS-artifacts-2026-07-24-strategy`, in
`apps/playground-lit/prefix-aware-strategies/` (`strategie.md` en
`open-beslissingen.md`). Deze branch houdt enkel de PoC-code en de bevindingen die
daaruit volgen.

Samengevat, twee fases:

- **Fase 1 (minor, additief)**: nieuwe flux-componenten erven van de VDS-klasse en
  zetten de flux-look via design-tokens op `:host`. VDS draait onder een eigen prefix
  (`vds-`), strikt intern. De bestaande `vl-*` blijven ongemoeid, dus geen breaking
  change.
- **Fase 2 (major)**: alle flux-tags worden `flux-`, VDS gaat terug naar zijn default
  `vl-` en hoeft dan niet meer prefix-aware te zijn. Codemod plus migratiegids. Enkel
  de tags; de `.vl-`-CSS-klassen blijven (die komen uit `@domg/govflanders-style`).

Twee dingen die daarbij vaak verkeerd begrepen worden:

1. **De aparte VDS-prefix blijft nodig, ook al erf je enkel van de VDS-klassen en breng
   je nooit een VDS-tag naar buiten.** VDS-componenten bouwen zichzelf intern op uit
   echte custom-element-tags (het checkbox-vinkje is een `vds-icon`, de datepicker
   bevat een `vds-select`). Die sub-componenten moeten geregistreerd zijn, en dat kan
   niet onder `vl-` zolang flux die namespace bezet.
2. **Die prefix kost ons wel iets.** VDS' eigen interne CSS hardcodeert de
   default-tagnamen, wat workarounds vergt (zie upstream-verzoek 6 en de
   icon-font-alias). Die vervallen zodra flux `vl-` loslaat, wat fase 2 ook technisch
   de moeite maakt en niet enkel een branding-keuze.

De naamgeving van de nieuwe generatie in fase 1 (`-next`-suffix versus meteen `flux-`)
staat nog open.

## PoC-bevindingen (zie `.claude/plans/prefix-aware-poc.md` voor detail)

- **Coexistentie werkt**: 14 VDS-componenten geregistreerd als `vds-*` naast flux
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
