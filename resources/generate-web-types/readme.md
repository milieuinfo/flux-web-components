# web-types-generator

## genereren

Vanuit de root:

    pnpm run libs:web-types:generate

Dat draait `web-types.generator.ts` (via `resources/bash-scripts/libs-web-types-generate.sh`) en faalt als er ergens onder
`libs/` een `*.web-types.errors.log` achterblijft.


## valideren

De validatie loopt als jest-testen, ook in de build:

    pnpm run libs:web-types:validate

Dat zijn twee specs (zie `resources/bash-scripts/libs-web-types-validate.sh`):

- `wt-validate-completeness/web-types-completeness.spec.ts` - elke web-component heeft een web-type en omgekeerd
- `wt-validate-schema/web-types-schema.spec.ts` - de gegenereerde web-types voldoen aan `web-types.schema.json`

Om de schema-fouten in detail te zien (de spec toont enkel pass/fail), vanuit `resources/generate-web-types`:

    pnpm exec tsx ./wt-validate-schema/validate-schema.ts
