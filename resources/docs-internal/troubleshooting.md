# Troubleshooting

## Storybook not starting
> blank screen, empty `body` & empty `head` in html, no `console.log()`
- check if there's not still a process running at the port defined, usually `8080`:
  `lsof -ti:8080` toont de PID, `lsof -ti:8080 | xargs kill` ruimt het proces op
- try changing the port in the `apps:storybook:dev` script in the root `package.json` to another port, e.g. `8081`
e.g. `"apps:storybook:dev": "cd ./apps/storybook && storybook dev -p 8081"`

## Per ongeluk `npm install` gedraaid
> `Dit project gebruikt pnpm, geen npm.`

De `preinstall`-guard (`resources/utils-build/only-allow-pnpm.mjs`) weigert een install met npm, maar npm heeft op dat
moment al een gehoiste `node_modules` en een `package-lock.json` weggeschreven. Die ondermijnen de strikte pnpm-setup
(phantom-dependency-detectie, `allowBuilds`). Opruimen en opnieuw installeren:

```
rm -rf node_modules package-lock.json
pnpm install
```

`package-lock.json` staat in `.gitignore`, dus zo'n lockfile kan niet per ongeluk mee gecommit raken.

## Encoding / Font issues
> Rare artefacten in de gerenderde fonts

Verzeker je er van dat charset juist is ingesteld:
```html
<head>
    <meta charset="utf-8" />
    <title>Dali</title>
</head>
```

## Issues bij het binnenhalen van npm packages via artefactory

> Soms is het mogelijk dat er moeilijkheden zijn via artifactory om node packages op te halen.
Dit is typisch het geval met artifacts die niet van Digitaal Vlaanderen (@govflanders) of Departement Omgeving (@domg) zijn.

Je kan experimenteren door in je .npmrc bestand specifieke packages uit andere registries te halen (pnpm leest
dezelfde .npmrc als npm).

> OPGELET: commit dit niet, alle packages moeten binnengetrokken kunnen worden via de repo.omgeving.vlaanderen.be !

```
registry=https://registry.npmjs.org/
@govflanders:registry=https://repo.omgeving.vlaanderen.be/artifactory/api/npm/acd-npm/
@domg:registry=https://repo.omgeving.vlaanderen.be/artifactory/api/npm/acd-npm/
```

of door volgende 3 commando's uit te voeren in commandline:

- `pnpm config set registry https://registry.npmjs.org`
- `pnpm config set @govflanders:registry https://repo.omgeving.vlaanderen.be/artifactory/api/npm/acd-npm/`
- `pnpm config set @domg:registry https://repo.omgeving.vlaanderen.be/artifactory/api/npm/acd-npm/`

