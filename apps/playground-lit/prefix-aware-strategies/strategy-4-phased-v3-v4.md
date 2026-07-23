# Strategie 4: gefaseerde migratie (v3 dan v4)

Geen losse strategie maar een tijdlijn die strategie 3 en strategie 1 combineert over
twee major releases. v3 levert waarde zonder breaking change; v4 doet de definitieve
namespace-flip.

## v3: VDS onder eigen prefix, flux blijft `vl-`

Dit is strategie 3.

- We gebruiken de prefix-aware feature van VDS met een ANDERE tag (bijvoorbeeld `vds-`).
- Onze componenten behouden de `vl-`-prefix.
- Sommige van onze componenten gebruiken achterliggend een custom VDS-tag (via een
  adapter: flux-API buiten, VDS-component binnen).

Eigenschappen:
- Geen breaking change voor afnemers (tags en look blijven).
- Incrementeel en omkeerbaar: per component overzetten naar VDS-onderbouw.
- Coexistentie is bewezen in de PoC.

## v4: flux wordt `flux-`, VDS krijgt de default `vl-`

Dit is de namespace-flip (strategie 1 toegepast, met een belangrijke vereenvoudiging).

- Al onze componenten worden `flux-` prefix.
- VDS-componenten behouden hun DEFAULT tag `vl-` (sommige van onze componenten gebruiken
  VDS-componenten onderliggend).

Belangrijke vereenvoudiging: zodra flux `vl-` loslaat, hoeft VDS GEEN prefix-aware meer te
zijn. VDS draait gewoon op zijn default `vl-`. De prefix-vrijheid die in v3 nog nodig was
(om de clash te vermijden) is in v4 overbodig: flux is de partij die verhuist.

Eigenschappen:
- Breaking change voor afnemers (`vl-*` naar `flux-*` in hun markup) → major release +
  migratiegids + codemod.
- Vergt het volledige flux-prefix-werk (zie strategie 1): 83 registraties, ~115
  template-tags, ~40 DOM-queries, typing, tests. De `.vl-`-CSS-klassen blijven.

## Waarom faseren

- v3 ontkoppelt "VDS adopteren" van "afnemers breken". Je kan intern op VDS bouwen,
  pariteit bewijzen, de adapter- en styling-aanpak uitwerken, terwijl niemand buiten iets
  merkt.
- v4 bundelt de onvermijdelijke breaking change in één bewuste major, op het moment dat
  de VDS-onderbouw volwassen is. Niet halverwege, niet als big-bang vooraf.
- De zwaarste investering (flux prefix-aware / rename) wordt uitgesteld tot ze
  gerechtvaardigd is, niet als toegangsticket vooraan gelegd.

## Zou je `flux-` al in v3 of in v4 doen?

**In v4.** Redenen:

1. v3's hele waarde is "geen breaking change". `flux-` in v3 introduceren vernietigt dat:
   afnemers zouden meteen moeten migreren, terwijl v3 net bedoeld is om dat te vermijden.
2. De `flux-` rename is intrinsiek een major/breaking change. Die hoort op een
   major-grens (v4), met migratiegids en codemod, niet verstopt in een tussenstap.
3. v3 koopt tijd: VDS intern adopteren en pariteit bewijzen zonder druk. Pas als dat
   staat, is de namespace-flip de moeite en het risico waard.
4. Het flux-prefix-werk is groot (strategie 1). Het vooraan in v3 leggen vertraagt de
   waarde van v3 zonder dat het iets oplost wat v3 niet al oplost.

Kanttekening: `flux-` (v4) is enkel nodig als het doel is dat VDS de canonieke `vl-`
default inneemt (Vlaanderen-namespace) en flux een eigen `flux-`-identiteit krijgt. Als
permanente coexistentie met VDS op `vds-` aanvaardbaar is, kan v4 in principe
achterwege blijven en blijft v3 het eindstation. v4 is dus een strategische/branding-keuze,
geen technische noodzaak.

## Samengevat

| | v3 | v4 |
|---|---|---|
| flux-tags | `vl-` (ongewijzigd) | `flux-` |
| VDS-tags | `vds-` (prefix-aware) | `vl-` (default, geen prefix-aware nodig) |
| Breaking voor afnemers | nee | ja (major + codemod) |
| Effort | middelgroot, consumer-side | groot, flux-core (strategie 1) |
| Doel | VDS adopteren zonder impact | namespace-flip, VDS als canonieke `vl-` |

Aanbeveling: start met v3 (= strategie 3). Doe `flux-` pas in v4, en enkel als de
strategische keuze is dat VDS de `vl-`-default moet innemen.
