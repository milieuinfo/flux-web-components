# Strategie 3: VDS onder een eigen prefix, flux blijft `vl-`

Flux blijft volledig op `vl-`. We registreren de VDS-componenten onder een eigen prefix
(`vds-`) met hun ingebouwde prefix-feature, en gebruiken optioneel een dunne adapter
zodat een flux-tag intern een VDS-component rendert. Afnemers behouden hun `vl-*`-markup
en de oude look. Dit is de strategie die in de PoC is gevalideerd.

## Kernidee

- De prefix-vrijheid ligt bij **VDS** (de consument kiest de VDS-prefix), niet bij flux.
- Geen wijziging aan flux z'n 83 registraties, 115 template-tags of 40 DOM-queries.
- De clash verdwijnt omdat flux `vl-button` en VDS `vds-button` verschillende tags zijn.

## Implementatieplan

1. **VDS consumeren onder prefix.** Bootstrap met `defineAll('vds')` + de VDS-CSS,
   iconfont en theme importeren. (In de PoC: `vds-prefix-aware.ts`.)
2. **Bundler-config** voor de Vite-georiënteerde VDS-package: webpack-loaders voor de
   `?inline`-CSS, fonts (`asset/resource`) en een TS-module-shim voor de exports-map.
3. **Rem-basis overbruggen.** Flux zet de root op 62.5% (1rem=10px), VDS verwacht 16px.
   De VDS-PR (geland in 0.6.0) maakt de font-size-tokens runtime-schaalbaar via
   `--global-font-size-scaled-base` (op 1.6rem zetten volstaat voor fonts). De overige
   maat-tokens (dimension/space/shadow) zijn upstream nog rauwe rem-literals; die
   compenseren we met een gegenereerd override-bestand dat hetzelfde calc-patroon op
   dezelfde basisvariabele toepast, tot VDS dit ook upstream dekt.
4. **Adapter per component (optioneel, voor API-compat).** Een flux-tag (bijvoorbeeld
   `vl-button`) registreren met een wrapper die de oude flux-API mapt op de VDS-component
   eronder. First-wins registratie: de adapter claimt de tag voor flux z'n eigen
   registratie laadt, zodat afnemers niets merken. (In de PoC: `vl-button-adapter.ts`.)
5. **Look-pariteit via tokens + `::part`.** VDS naar de oude flux-look duwen zonder
   flux-CSS te injecteren (zie het styling-experiment en de per-component findings).
6. **Geleidelijke uitrol.** Component per component overzetten; wat nog niet over is,
   blijft puur flux. Geen big-bang.

## Effort-inschatting

**Middelgroot, en grotendeels consumer-side** (geen flux-core-refactor):

- Bootstrap + bundler-config: eenmalig, beperkt.
- Per component: een adapter + styling-afstemming (tokens/`::part`) + tests. Schaalt met
  het aantal componenten dat je effectief wil overzetten, maar incrementeel.
- Geen aanpassing aan flux z'n bestaande tag-registratie of CSS-klassen.

## Voordelen

- **Geen breaking change** voor afnemers (tags en look blijven).
- **Incrementeel**: per component migreerbaar, terugdraaibaar.
- Gebruikt de VDS-prefix-feature waarvoor hij bedoeld is.

## Nadelen / grenzen (uit de PoC)

- Twee componentensets en (afhankelijk van versies) twee Lit-instanties in de bundle.
- Styling-pariteit heeft grenzen waar VDS hardcoded styling in encapsulated CSS heeft
  (link-underline-geometrie), of structureel afwijkt (VDS-input is een form-layout-grid
  met label/message-rijen, flux-input is een kaal veld). Niet via tokens/`::part` te
  matchen; vergt upstream of wordt aanvaard.
- VDS heeft geen 1-op-1 voor elk flux-component (bijvoorbeeld geen title-component).
- De adapter-laag voegt een extra shadow-niveau toe (bijvoorbeeld formAssociated-gedrag
  via een wrapper kan anders zijn).

## Wanneer kiezen

Wanneer het doel is "afnemers merken niets" en een geleidelijke, omkeerbare overgang
gewenst is. Dit is de aanbevolen strategie: de wijziging ligt bij ons als consument, niet
bij de afnemers, en de clash wordt opgelost zonder flux te hoeven hernoemen of
prefix-aware te maken.

## PoC-bewijs

Gevalideerd in `apps/playground-lit` (zie `.claude/plans/prefix-aware-poc.md`):
coexistentie van 14 `vds-*` naast flux `vl-*` zonder collision, een werkende
`vl-button`-adapter op een VDS-button, een formAssociated VDS-form via `FormData`, en een
styling-experiment dat per component toont wat wel/niet naar flux-look te brengen is.
