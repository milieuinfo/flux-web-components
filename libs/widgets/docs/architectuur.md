# Architectuur van data-visualisation

## Inhoudstafel

- [Inleiding](#inleiding)
- [Bouwstenen](#bouwstenen)
- [Mappen](#mappen)
- [Zo tekent een grafiek](#zo-tekent-een-grafiek)
- [Hoe data stroomt](#hoe-data-stroomt)
- [Afspraken](#afspraken)
- [Een nieuw grafiektype toevoegen](#een-nieuw-grafiektype-toevoegen)

## Inleiding

`@domg-wc/widgets/datavis` bouwt een grafiek op met webcomponenten, volgens het patroon **bron → figuur → visual**.
De grafieken tekenen we met [Plotly](https://plotly.com/javascript/): hover, assen en export zijn ingebouwd. Wat
Plotly niet goed doet (tooltip, labels, kleuren), doen we zelf.

Dit document is voor wie aan de bibliotheek werkt. Hoe je ze gebruikt, lees je in Storybook onder
_Widgets - Datavis/Overzicht_.

```html
<vl-data-source src="/api/elf/sensors/ELF_L_0004" period="24h">
    <vl-data-period></vl-data-period>
    <vl-data-figure headline="Magnetische veldsterkte" subtitle="Temse, laatste 24 uur">
        <vl-chart-line>
            <vl-chart-reference value="0.4" label="Vlaamse streefwaarde"></vl-chart-reference>
        </vl-chart-line>
        <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
    </vl-data-figure>
</vl-data-source>
```

## Bouwstenen

| Laag         | Element                                                      | Wat het doet                                                                            |
| ------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **Bron**     | `vl-data-source`, `vl-data-period`                           | Haalt de data op voor een periode en deelt ze met alle visuals erin. Tekent zelf niets. |
| **Figuur**   | `vl-data-figure`                                             | Houdt één visual samen met kop, controls, tabel en uitleg. Altijd dezelfde opbouw.      |
| **Visual**   | `vl-chart-line`, `vl-chart-reference`                        | Tekent de data, met eenheid en bron eronder.                                            |
| **Controls** | `vl-data-controls`, `vl-data-download`, `vl-data-fullscreen` | Waarmee de lezer de weergave verandert of bewaart.                                      |
| **Tabel**    | `vl-data-table`                                              | Het tekstalternatief van de grafiek. Verplicht.                                         |
| **Uitleg**   | `vl-data-reading-guide`, `vl-data-about`                     | Uitklapbare tekst onder de visual.                                                      |

De figuur toont standaard een tabel, een rij controls (PNG, schermvullend) en "Over deze data". Zet je zelf een
onderdeel in de figuur, dan vervangt het alleen dát standaardonderdeel.

## Mappen

| Map       | Wat                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| `models/` | Het datacontract (`ChartModel`), validatie en de toestand (`DataState`). Zonder DOM.                          |
| `layout/` | Rekent uit hoe de data getekend wordt: assen, traces, labels, hover, opmaak van getallen en tijd. Zonder DOM. |
| `chart/`  | `VlChart` en de grafiektypes, Plotly-layout, kleuren, PNG-export, `vl-chart-reference`.                       |
| `figure/` | `vl-data-figure` en zijn onderdelen: tabel, controls en uitleg.                                               |
| `source/` | `vl-data-source`, `vl-data-period`, periodes en het inlezen van JSON of SensorThings.                         |
| `events/` | `vl-data-change` en `vl-period-change`.                                                                       |

`chart/`, `figure/` en `source/` zijn plat, zoals `libs/structures`: de componenten naast elkaar, alle stories in
`stories/` en een `index.ts`. Elke module in `models/` en `layout/` heeft een Jest-spec. Componenten testen we met
Cypress (`*.cy.ts`).

## Zo tekent een grafiek

`VlChart` (abstract) doet alles wat voor elk grafiektype gelijk is. `#draw()` volgt altijd dezelfde volgorde
(Template Method):

1. De spec lezen: kleuren en font uit de Flux-tokens (`readChartSpec`).
2. `beforeLayout`: het type beslist wat de layout nodig heeft.
3. `buildTraces`: wat het type tekent.
4. De referentielijnen plaatsen en de waarde-as bepalen.
5. De layout bouwen (`buildPlotLayout`) met `buildMargin` en `buildChartLayout`.
6. `Plotly.react` tekent; daarna koppelt `ChartInteractionController` de hover.

Een grafiektype vult deze hooks in:

| Hook                            | Standaard              | `VlChartLine`                         |
| ------------------------------- | ---------------------- | ------------------------------------- |
| `buildTraces(model, spec)`      | verplicht              | één lijn per reeks                    |
| `beforeLayout(model, spec)`     | niets                  | kiest directe labels of een legende   |
| `buildMargin(model, spec)`      | `chartDefaults.margin` | rechts ruimte voor de directe labels  |
| `buildChartLayout(model, spec)` | `{}`                   | de directe labels als annotaties      |
| `renderLegend()`                | niets                  | de legende, als de labels niet passen |

Alleen `beforeLayout` verandert state. De `build…`-hooks lezen die beslissing en veranderen zelf niets.

Twee controllers helpen `VlChart`:

- `ChartInteractionController`: waarden lezen met muis, toetsenbord of tik. Beslist wat in de tooltip staat en wat
  de schermlezer voorleest; `VlChart` tekent de tooltip.
- `ReferenceTagsController`: houdt de `vl-chart-reference`-tags in de grafiek bij en tekent opnieuw als ze veranderen.

## Hoe data stroomt

- Een visual krijgt data via `.data`, of leest de dichtstbijzijnde `vl-data-source` (`sourceContext`). Met `.data`
  wint die.
- De visual bepaalt de toestand met `classifyDataState`: `loading`, `data`, `partial` (met onderbrekingen), `empty` of `error`.
- Elke nieuwe toestand meldt de visual met het event `vl-data-change`.
- `vl-data-figure` vangt dat event op en deelt de toestand via `figureContext`. Tabel, controls en uitleg lezen die
  context; ze kennen elkaar en de visual niet.
- `vl-data-period` vraagt een andere periode met `vl-period-change`. De bron haalt dan nieuwe data op; een nieuwe
  vraag breekt de vorige af.
- `context-root.ts` zorgt dat een visual die vóór de bron laadt, zijn data toch krijgt.

## Afspraken

**Data**

- Bij een onderbreking (`NaN`) stopt de lijn. We tekenen er nooit overheen.
- Meer dan zes reeksen (`MAX_SERIES`) is een fout: de grafiek toont de fouttoestand.
- Een periode is een reeks volle kalenderdagen in lokale tijd, nooit voorbij vandaag.

**Uitzicht**

- De waarde-as bevat altijd 0 en rondt af naar een ronde stap (1, 2 of 5), met hoogstens zes stappen.
- Reekskleuren komen uit het omgevingspalet v6.1 (`vl-chart.palette.tokens.json`), in een vaste volgorde. Nooit statuskleuren.
- Neutrale kleuren en font komen uit Flux-tokens (`vl-chart.flux-css.ts`). Plotly kent geen `var()`, daarom lezen
  we de berekende waarden.
- Directe labels in plaats van een legende. Passen ze niet, dan komt er een legende boven de grafiek.
- De eenheid staat boven de grafiek. De bron staat eronder, met het open-datakenmerk als dat van toepassing is.
- Getallen in het Nederlands (`1.250,5`), voluit (geen `125k`).
- Een referentielijn buiten de waarde-as wordt een notitie boven de grafiek. Met `in-view` rekt de as uit.

**Toegankelijkheid**

- De tabel is verplicht (WCAG 1.1.1). Een eigen `<vl-data-table>` verandert alleen haar plaats.
- De tooltip is HTML, niet van Plotly: we lijnen hem zelf uit en hij werkt ook met het toetsenbord.
- De auteur kiest het niveau van de kop met `headline-level`. De figuur rendert een `vl-title` met het uitzicht van een `h3`.

**Code**

- `models/` en `layout/` hebben geen DOM nodig en krijgen altijd een Jest-spec.
- Ontbrekende Plotly-types vullen we aan in `plotly-augment.d.ts`, niet met `as any`.
- Plotly zet zijn CSS in `document.head`. Wat de grafiek daarvan nodig heeft, staat in `vl-chart.flux-css.ts`.
- Een onderdeel van de figuur zet zichzelf in zijn zone (`joinFigureZone`). De auteur hoeft geen `slot` te schrijven.

## Een nieuw grafiektype toevoegen

1. Maak `chart/vl-chart-{type}.component.ts` en laat de klasse `VlChart` uitbreiden.
2. Vul `buildTraces` in. Vul de andere hooks alleen in als het type ze nodig heeft.
3. Zet rekenwerk in `layout/`, met een Jest-spec.
4. Voeg een Cypress-test, stories en metadata toe, zoals bij `vl-chart-line`.
5. Exporteer het type in `chart/index.ts` en `index.ts`.
