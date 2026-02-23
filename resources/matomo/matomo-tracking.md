# Matomo tracking voor Storybook

## Wat wordt er gelogd?

Per story-bezoek wordt het volgende naar Matomo gestuurd:

- **Pageview** — elke keer dat een gebruiker een story opent of naar een andere story navigeert
- **URL** — het volledige adres inclusief het `?path=/docs/...` gedeelte, waarmee exact te zien is welke
  story bekeken werd
- **Versie** (custom dimension 1) — de Storybook-versie, afgeleid uit het URL-pad
  (bijv. `/release-v2/2.10.1/storybook/` → `2.10.1`). Hiermee kan gefilterd worden op versie in
  Matomo-rapporten. Lokaal wordt `local` als versie geregistreerd.
- **Document title** — de paginatitel op het moment van navigatie

Er worden geen cookies geplaatst tenzij Matomo server-side zo geconfigureerd is. Er wordt geen persoonlijke
informatie verzameld buiten wat Matomo standaard registreert (IP-adres, user-agent, etc.).

## Bestandsstructuur

| Bestand                                              | Verantwoordelijkheid                                                                       |
|------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `apps/storybook/matomo-tracking.js`                  | Bevat de volledige trackinglogica                                                          |
| `apps/storybook/resources/public/matomo-loader.js`   | Zoekt `matomo-tracking.js` op via `./`, `../`, `../../` of `../../../` en laadt het       |

De twee bestanden worden bewust verschillend gedeployd:

- **`matomo-loader.js`** — staat in `apps/storybook/resources/public/` en wordt via `staticDirs` in
  `.storybook/main.ts` automatisch meegekopieerd naar de root van elke Storybook-build. Elke versie
  heeft dus zijn eigen kopie.
- **`matomo-tracking.js`** — zit *niet* in `resources/public/` en wordt dus *niet* meegeleverd met de
  build. Het bestand wordt éénmalig hogerop in de deploy-boom geplaatst (bijv. in `flux-builds/` of
  `release-vX/`) via `inject-matomo.sh`. De loader zoekt het vandaar via `./`, `../`, `../../` of
  `../../../`.

Dit ontwerp maakt dat trackinglogica gewijzigd kan worden door één centraal bestand te vervangen —
zonder alle gepubliceerde Storybook-versies opnieuw te builden of te deployen.

## Hoe werkt het in nieuwe Storybook builds?

Het script wordt ingeladen via `apps/storybook/.storybook/manager-head.html`, waar een `<script defer>` tag
verwijst naar de loader:

```html
<script defer src="./matomo-loader.js"></script>
```

Storybook injecteert de inhoud van `manager-head.html` via `innerHTML` in de `<head>` van de manager UI.
Inline scripts worden in die context niet uitgevoerd door de browser — daarom verwijst de tag naar een
extern bestand (`matomo-loader.js`), dat op zijn beurt `matomo-tracking.js` dynamisch laadt.

### Configuratie

Bovenaan `matomo-tracking.js` staat de `logTo` constante waarmee de actieve niet-lokale omgeving wordt ingesteld:

```js
const logTo = 'PRODUCTIE'; // 'ONTWIKKEL', 'OEFEN' of 'PRODUCTIE'
```

De Matomo-URL en site-ID worden bepaald op basis van de hostname en `logTo`:

| Omgeving                                       | `logTo`                           | Matomo-URL                                        | Site-ID |
|------------------------------------------------|-----------------------------------|---------------------------------------------------|---------|
| Lokaal (`localhost`, `127.0.0.1`, `192.168.*`) | —                                 | `https://stats-ontwikkel.omgeving.vlaanderen.be/` | `45`    |
| Niet-lokaal                                    | `'ONTWIKKEL'`                     | `https://stats-ontwikkel.omgeving.vlaanderen.be/` | `45`    |
| Niet-lokaal                                    | `'OEFEN'` (of elke andere waarde) | `https://stats-oefen.omgeving.vlaanderen.be/`     | `36`    |
| Niet-lokaal                                    | `'PRODUCTIE'`                     | `https://stats.omgeving.vlaanderen.be/`           | `89`    |

### SPA-navigatie detectie

Storybook is een Single Page Application: bij het wisselen van story wordt de pagina niet opnieuw geladen,
maar verandert alleen de URL via `history.pushState()`. Die methode vuurt standaard geen event af,
dus kan je er niet rechtstreeks op luisteren.

Het tracking script lost dat op door `history.pushState` en `history.replaceState` te "monkey-patchen":
de originele functies worden vervangen door wrappers die eerst de native implementatie aanroepen en
daarna een custom `locationchange` event dispatchen. Daar wordt dan op geluisterd, samen met het
standaard `popstate` event (voor browser back/forward):

```js
window.addEventListener('locationchange', scheduleTrack);
window.addEventListener('popstate', scheduleTrack);
```

Bij elke URL-wijziging wordt na een kleine vertraging (zodat de SPA-router zijn titel kan bijwerken)
een virtuele pageview naar Matomo gestuurd met de nieuwe URL en paginatitel. Geen polling, geen
CPU-belasting tussen navigaties door.

### Sessie-afbakening per tab en versie

Om bezoeken per browsertab en per Storybook-versie correct te scheiden, gebruikt het script `sessionStorage`:

- **Nieuwe tab** — elke nieuwe tab start altijd een nieuwe Matomo-visit, ook als dezelfde versie al open
  staat in een andere tab
- **Versiewisseling** — navigeren van de ene versie naar een andere (bijv. van `2.5.0` naar `2.10.0`)
  start een nieuwe visit in dezelfde tab

## Injectie in bestaande Storybook builds

Reeds gepubliceerde versies zijn al gebuild en gedeployd. Om daar tracking aan toe te voegen zonder opnieuw
te builden, is er een shell-script:

```
resources/matomo/inject-matomo.sh
```

### Gebruik

Het script ondersteunt vier modi:

```bash
# Eén enkele Storybook build directory (bevat zelf een index.html)
./resources/matomo/inject-matomo.sh ./build/dist/apps/storybook

# Specifieke versie-directory (bevat een storybook/ subdirectory)
./resources/matomo/inject-matomo.sh /var/www/flux/release-v2/2.10.0

# Alle versies in een release-directory (doorloopt alle versie-subdirectories)
./resources/matomo/inject-matomo.sh /var/www/flux/release-v2

# Alle releases tegelijk (doorloopt alle release-vX/ subdirectories)
./resources/matomo/inject-matomo.sh /var/www/flux
```

### Wat doet het script?

Het script plaatst `matomo-tracking.js` op één centrale locatie afhankelijk van de modus:

| Modus          | Locatie van `matomo-tracking.js`  | Loader vindt het via |
|----------------|-----------------------------------|----------------------|
| Enkele build   | `storybook/`                      | `./`                 |
| Versie-dir     | `x.y.z/`                          | `../`                |
| Release-dir    | `release-vX/`                     | `../../`             |
| Builds-root    | `flux-builds/`                    | `../../../`          |

Per modus:

1. **Kopieert** `matomo-tracking.js` naar de centrale locatie en `matomo-loader.js` naar elke
   `storybook/` directory; voert `git add` uit als de directory binnen een git-repository valt
2. **Injecteert** `<script defer src="./matomo-loader.js"></script>` in `index.html` vóór de eerste
   bestaande `<script>` tag
3. **Slaat injectie over** als de loader al aanwezig is (idempotent) — beide JS-bestanden worden wel
   altijd overschreven zodat de meest recente versie actief is

### Vereisten

- Schrijfrechten op de doeldirectory
- `perl` (standaard beschikbaar op Linux en macOS)
- `git` (optioneel — alleen nodig als `git add` gewenst is)
- De repository moet beschikbaar zijn (het script haalt `matomo-tracking.js` op uit `apps/storybook/`
  en `matomo-loader.js` uit `apps/storybook/resources/public/`)
