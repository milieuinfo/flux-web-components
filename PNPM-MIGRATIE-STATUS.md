# pnpm-migratie (FLUX-708): status

Overzicht van wat klaar is en wat nog moet voor de migratie van npm naar pnpm.
Reden van de migratie: supply-chain-security (install-scripts standaard geblokkeerd).

## Wat is klaar

Commits op deze branch (`lab/FLUX-708-pnpm-migratie`):

- `8738d2fd` feat: migratie van npm naar pnpm (root `package.json`: `packageManager: pnpm@10.18.0`, `onlyBuiltDependencies`-allowlist, `pnpm-lock.yaml` i.p.v. `package-lock.json`).
- `7c2b7d62` fix: storybook lit-html-imports naar `lit` (phantom dep faalde onder pnpm's strikte node_modules).
- `ddd2206c` fix: e2e cypress via de root-binary i.p.v. `pnpm exec` (behoudt de juiste cwd).
- `3e0f65a5` fix: `pnpm-lock.yaml` gesynct met develop-v2 (playwright-webkit lockfile-drift).
- `57f2198f` fix: cookie-consent opt-in test, dubbele `checked`-binding verwijderd (dit was de rode Bamboo-build; Lit 3.1.0 gooit op dubbele attribute-bindings in dev).

Verder aanwezig:

- Bamboo CI-scripts en `resources/bash-scripts` omgezet naar pnpm.
- `apps/consumer` omgezet en bewust buiten de (afwezige) pnpm-workspace gehouden, zodat het een externe consumer blijft simuleren.
- `PNPM-WORKSPACES.md`: uitleg waarom we geen pnpm workspaces gebruiken en hoe afnemers zowel met npm als pnpm blijven consumeren. Staat nu nog untracked op deze branch.

## Wat moet nog

- Groene Bamboo-run bevestigen op de laatste commit, daarna FLUX-708 sluiten. Force-push en het opnieuw triggeren van Bamboo zijn handelingen van de gebruiker.
- Beslissen of `PNPM-WORKSPACES.md` (en deze status-notitie) mee in de PR moeten of losse werknotities blijven.
- Opruimen van de parallelle branches (zie hieronder): eventueel `-ci-fix` consolideren in deze branch.
- Follow-up (apart ticket): dual npm/pnpm consumer-compatibiliteitstest via een CI-matrix op een enkele `apps/consumer`. Voorstel staat op `feature-v2/consumer-npm-pnpm-matrix` in `consumer-npm-pnpm-matrix.md`. Bewust afgewezen: een duplicaat `apps/consumer-pnpm`-map (onderhouds- en drift-last).

## Branches

- `lab/FLUX-708-pnpm-migratie`: de eigenlijke migratie (deze branch).
- `lab/FLUX-708-pnpm-migratie-ci-fix`: zelfde tip, afgesplitst voor het onderzoek naar de rode CI.
- `feature-v2/consumer-npm-pnpm-matrix`: de aparte consumer-dual-test follow-up.

## Sleutelbeslissingen

- Geen pnpm workspaces (details in `PNPM-WORKSPACES.md`).
- `apps/consumer` blijft buiten de workspace: het test het echte install-pad van een externe afnemer, voor zowel npm als pnpm.
- De `onlyBuiltDependencies`-allowlist is de kern van de security-winst: postinstall-scripts worden standaard geblokkeerd.
- pnpm wordt gepind via corepack (`pnpm@10.18.0`).
