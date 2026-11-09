# Fixtures voor vl-map

## bd72lb72_etrs89lb08.gsb (tijdelijk)

Officieel NTv2-grid van BD72 (Lambert 72, EPSG:31370) naar ETRS89 (Lambert 2008, EPSG:3812), ongewijzigd.

- Bron: `bd72lb72_etrs89lb08.gsb` uit https://download.osgeo.org/proj/proj-datumgrid-europe-1.3.zip, oorspronkelijk van het NGI/IGN
- Grootte: 5.555.968 bytes
- sha256: `e5683f585409845bfc7158b0bb43ce12cf105ffd3663cb1230dde8e9e31f4eb8`
- Licentie: [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)
- Naamsvermelding: (c)2014-2016 Grid created by Nicolas SIMON

De tests in `libs/map/src/vl-map-ntv2-grid.cy.ts` leveren dit bestand via `cy.intercept` op de CDN-URL van het grid.
Zodra het grid op `cdn.omgeving.vlaanderen.be` staat, halen de tests het daar op en verdwijnen dit bestand en deze
sectie uit de repo.

## lambert72-lambert2008-testpunten.json

36 testpunten, één per cel van 40 x 40 km over heel België, uit de officiële testdataset `rs_testdata_lamb08.gpkg` van
Departement Omgeving ("Testdata transformatie Lambert 72 naar Lambert 2008 coördinaten"). `x72` en `y72` zijn Lambert 72,
`x08` en `y08` de officiële NTv2-waarden in Lambert 2008.
