# Troubleshooting

## Storybook not starting
> blank screen, empty `body` & empty `head` in html, no `console.log()`
- check if there's not still a process running at the port defined, usually `8080`
- remove `--quiet` to see logs
- try changing port in `apps/storybook/project.json` to another port, e.g. `8081`
e.g. `"command": "start-storybook -p 8081 -c apps/storybook/.storybook"`
- you can also run `pnpm run killstart:storybook`
  - this will search for any processes running on 8080 & kill them
  - then start storybook on port 8080

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

Je kan experimenteren door in je .npmrc bestand specifieke packages uit andere registries te halen .

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

