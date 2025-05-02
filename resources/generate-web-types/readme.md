# web-types-generator

## genereren

    npm run generate-web-types


## testen

De testen zouden als jest testen in de build moeten lopen. Dat lukt echter niet.
Voorlopig kan je manueel volgende commando's uitvoeren, als die lege lijsten terug geven worden er correct voor alle componenten web-types aangemaakt.
Rechter klikken in de IDE en op `web-types.spec.ts` en laten lopen lukt, alleen is de folder dan fout.
In plaats van er verder tijd in te steken: de oorzaak is de Nx verwevenheid, die wordt weggewerkt, in die aanpak ook Jest testen toevoegen voor
de web-types!

    tsx ./tools/web-types-generator/tests/compare-wc-wt-components-atom.ts
    tsx ./tools/web-types-generator/tests/compare-wc-wt-components-basic.ts
    tsx ./tools/web-types-generator/tests/compare-wc-wt-components-compliance.ts
    tsx ./tools/web-types-generator/tests/compare-wc-wt-components-form.ts
    tsx ./tools/web-types-generator/tests/compare-wc-wt-map.ts


## schema validatie

    tsx ./tools/web-types-generator/schema/validate-schema.ts
