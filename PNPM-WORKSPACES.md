# pnpm & workspaces

Deze notitie legt uit hoe deze repo met pnpm en workspaces omgaat, en waarom afnemers onze artifacts
zowel met npm als pnpm kunnen blijven consumeren.

Context: de migratie van npm naar pnpm gebeurde in het kader van FLUX-708 (supply-chain-security),
met de libs als pnpm workspace.

## Wat is een workspace?

Een workspace is een feature van package managers (npm, pnpm, yarn) om meerdere packages in één repo
(een monorepo) samen te beheren. Je declareert de deelpackages, en de package manager:

- doet één install voor de hele repo en deelt de store (bespaart schijf/tijd);
- linkt lokale packages onderling via symlinks i.p.v. ze van een registry te halen (wijzig je `common`,
  dan ziet `components` dat meteen zonder publish);
- laat interne dependencies toe met het `workspace:`-protocol (bv. `"@domg-wc/common": "workspace:*"`).
  Bij `pack`/`publish` herschrijft pnpm dat automatisch naar een concrete versie, zodat het gepubliceerde
  artifact geldig is buiten de monorepo.

In pnpm zet je dit aan met een `pnpm-workspace.yaml`.

## Hoe zit het nú in deze repo?

De libs vormen een pnpm workspace. Concreet:

- `pnpm-workspace.yaml` bevat `packages: ['libs/*']` (dus `common`, `styles`, `components`, `map`,
  `integrations`). De `overrides` en `onlyBuiltDependencies` staan hier ook (niet meer in de root
  `package.json`).
- Elke lib heeft een echte `package.json` (niet langer enkel een `package.template.json`), met interne
  deps via het workspace-protocol, bv. in `libs/components/package.json`:
  `"@domg-wc/common": "workspace:*"` en `"@domg-wc/styles": "workspace:*"`.
- De `version` in die `package.json`'s staat op de placeholder `DOMG-WC-VERSION`. Bij het packen zet
  `resources/bash-scripts/libs-pack.sh` de echte release-versie via `pnpm pkg set version=...`, en
  `pnpm pack` herschrijft de `workspace:*`-deps automatisch naar diezelfde concrete versie.

Belangrijk gevolg: het gepubliceerde artifact bevat concrete versies, nooit een letterlijke
`workspace:*`. Dat protocol bestaat enkel intern in de monorepo.

## apps/consumer vs apps/consumer-e2e: waar resolven de deps?

Beide apps staan bewust BUITEN de workspace (`pnpm-workspace.yaml` bevat enkel `libs/*`).

- `apps/consumer` simuleert een externe afnemer die het gepubliceerde `@domg-wc`-package installeert.
  Die deps (`@domg-wc/components`, `@domg-wc/map`, `@domg-wc/common` + de webpack-toolchain) worden
  WEL echt geïnstalleerd: `resources/ci-bamboo/bash/verify-release.sh` doet een aparte
  `pnpm install` in `apps/consumer`. Dat is net het doel van deze app: bevestigen dat het gepubliceerde
  package installeerbaar en bouwbaar is.
- `apps/consumer-e2e` is de Cypress-testrunner die de consumer aandrijft. Die krijgt GEEN eigen
  `pnpm install`. De runner-tooling (`cypress`, `cypress-axe`, `@types/node`) staat in de root
  `package.json` en wordt van daaruit geresolved (module-resolutie loopt omhoog naar root
  `node_modules`); cypress zelf draait via het expliciete pad `../../node_modules/.bin/cypress`.

Daardoor zijn de deps die in `apps/consumer-e2e/package.json` gedeclareerd staan onder pnpm INERT: ze
worden niet in `apps/consumer-e2e` geïnstalleerd, want die map staat buiten de workspace en krijgt geen
eigen install. Ze zijn er als expliciete documentatie van wat de e2e-runner importeert (en om onder npm,
waar hoisting speelt, de phantom-dependency expliciet te maken, zie FLUX-769). De feitelijke versies
komen van root.

Dit is geen regressie: ook onder npm kreeg `apps/consumer-e2e` geen eigen install en kwam de tooling via
hoisting van root. We voegen bewust geen aparte install of workspace-lidmaatschap voor `consumer-e2e` toe:
dat zou een tweede cypress-kopie opleveren terwijl de scripts sowieso de root-binary gebruiken, dus enkel
rommel zonder winst. Root blijft de enige bron van waarheid voor de e2e-tooling.

## Kunnen afnemers zowel npm als pnpm gebruiken?

Ja. Dat blijft uitdrukkelijk de bedoeling en is niet in gevaar door de pnpm-migratie of de workspace.

- pnpm is een interne keuze (dev, CI, build, publish). Het bepaalt hoe wij bouwen en publiceren.
- Het gepubliceerde artifact is een gewone npm-package (een standaard `.tgz` met een gewone
  `package.json`). Er zit niets pnpm-specifieks in:
  - interne deps staan met concrete versies (bv. `"@domg-wc/common": "2.16.0"`), niet met `workspace:*`
    (pnpm herschrijft dat bij het packen);
  - geen pnpm-only velden;
  - het package wordt naar de normale (Artifactory) npm-registry gepubliceerd.

Daardoor kan een afnemer het package installeren met npm, pnpm én yarn. De package manager van de afnemer
staat volledig los van die waarmee wij publiceren.

Ter borging bestaat er consumer-verificatie in `apps/consumer` (+ `apps/consumer-e2e`) die de gepubliceerde
`@domg-wc/*` packages afneemt en end-to-end test (fat-lib, named, side-effect builds).
