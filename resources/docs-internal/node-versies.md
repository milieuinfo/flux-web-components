# Node Versies

## Wat doen we 'in' onze monorepo

We gebruiken Nrwl Nx als monorepo opzet. Praktisch gebruiken we (al dan niet via een nx-plugin) waar het kan (en een bundler nodig is) webpack.

- builden van artifacts met tsc (hier wordt geen bundler gebruikt)
- builden van fat-js met webpack
- serven van Storybook mbv webpack en devserver (*); specifieke 'Storybook' setup
- builden van playground-lit, playground-native en playground-react (hier zit webpack achter); we doen hier niets mee tijdens de build maar deze worden actief gebruikt tijdens onze ontwikkeling  
- runnen van unit testen met Jest
- runnen van Cypress testen tov (*) - gebruikt webpack achter de schermen
- runnen van Cypress component testen - gebruikt webpack achter de schermen


## Hoe doen we onze imports

Onze code is opgesplitst in verschillende modules, elke module wordt als aparte artifact aangeboden.

- in dezelfde module worden imports relatief gedaan
    * typisch zonder suffix
    * de suffix wordt gespecifieerd 'als het nodig is'
        - als het expliciet .js bestanden zijn (default bij ons zijn het .ts bestanden), bvb. voor oude 'lib.js' bestanden     
        - voor imports uit 'lit/decorators.js'; vermoedelijk omdat dat zo in de desbetreffende package.json gespecifiëerd wordt
- over modules heen importeren we via de barrel files
    * bvb. import { webComponent } from '@domg-wc/common';
    * in de 'tsconfig.base.json' worden deze 'paths' gespecifieerd
    * hierdoor kunnen deze paden behouden blijven 'in' de artifacts, want dan verwijzen die imports naar de desbetreffende artifact


## Welke node versie gebruiken we

Wij gebruiken node via volta, de historiek van de versies die wij gebruiken is als volgt:

- 20.11.0 / sinds 29/01/2024
- 20.10.0 / sinds 08/01/2024
- 20.9.0 / sinds 25/10/2023
- 18.15.0 / sinds 13/03/2023
- 16.18.1 / sinds 22/09/2022


## Afname artifact's

Als UIG team hebben wij geen productie toepassing. Wij hebben wel de 'ConsumerApp' die we gebruiken om manueel te testen, hiervoor
zijn er nog geen automatische testen in de build.
De 'ConsumerApp' is een native toepassing die gebundeld en geserved wordt m.b.v. webpack en devserver. We testen zowel de gewone
artifacts als de fat-js na upgrades of gemelde problemen.

M.b.t. het gemelde 'import' probleem van Decibel

- er is geen verschil in afname tussen node v16.18.1 en v20.11.0 
- de artifacts zijn afneembaar zonder de 'type: module' specificatie in de package.json
- er moet geen '.js' suffix gespecifieerd worden, niet voor code in de 'ConsumerApp' en ook niet voor '@domg-wc' componenten
  het kan ook geen kwaad om de '.js' suffix te specifiëren, beide werken


## '@domg-wc' code suffixen ?

zie
https://stackoverflow.com/questions/74660824/nodejs-v19-drops-support-for-es-module-specifier-resolution-node-which-makes-i
https://stackoverflow.com/questions/77685722/node-20-esm-import-without-js-file-name-extension-not-working
https://nodejs.org/en/blog/release/v20.10.0

https://stackoverflow.com/questions/72491392/when-do-we-need-to-add-file-extension-when-importing-javascript-modules
