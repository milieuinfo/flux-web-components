import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import type { ChartModel, ChartSeries } from '../models/chart.model';
import { chartDefaults } from './vl-chart.defaults';
import { VlChartLine } from './vl-chart-line.component';

registerWebComponents([VlChartLine]);

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from([2020, 2021, 2022]),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[], sources = [{ title: 'Vlaamse Milieumaatschappij' }]): ChartModel => ({
    meta: {
        sources,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', unit: 'µT' },
    },
    series,
});

const completeModel = () => buildModel([buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64])]);

const plot = () => cy.get('vl-chart-line').shadow().find('.plot');
const stateMessage = () => cy.get('vl-chart-line').shadow().find('.state-message');

describe('cypress-component - widgets - vl-chart-line - data states', () => {
    it('should show the loading state before data is set', () => {
        cy.mount(html`<vl-chart-line></vl-chart-line>`);

        stateMessage().should('contain.text', 'Grafiek wordt geladen');
        plot().should('not.be.visible');
        stateMessage().find('.skeleton').should('be.visible');
    });

    it('should show the plot for complete data', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().should('be.visible');
        stateMessage().should('not.exist');
    });

    it('should show the plot for data with a gap', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, NaN, 0.64])]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        plot().should('be.visible');
    });

    it('should show a message instead of the plot when there are no series', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);

        stateMessage().should('contain.text', 'Geen gegevens');
        plot().should('not.be.visible');
    });

    it('should show an error and name the problem in the console when the source is missing', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'warn').as('consoleWarn');
        });
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64])], []);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        stateMessage().should('contain.text', 'kan nu niet getoond worden');
        plot().should('not.be.visible');
        cy.get('@consoleWarn').should('be.calledWithMatch', /bron/);
    });
});

describe('cypress-component - widgets - vl-chart-line - size and margin', () => {
    it('should draw an svg as wide as the plot element', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().then(($plot) => {
            plot().find('svg.main-svg').first().should('have.attr', 'width', String($plot[0].clientWidth));
        });
    });

    it('should follow the width of its container', () => {
        cy.mount(
            html`<div id="container" style="width: 500px">
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
            </div>`,
        );
        plot().find('svg.main-svg').first().should('have.attr', 'width', '500');

        cy.get('#container').invoke('css', 'width', '300px');

        plot().find('svg.main-svg').first().should('have.attr', 'width', '300');
    });

    it('should start the inner chart at least at the default margin', () => {
        const { left, top } = chartDefaults.margin;

        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        // Plotly verschuift de groep met de data (de inner chart) met de marge, zoals translate(margin) in d3.
        // De marge is een minimum: automargin maakt ze groter als de labels meer ruimte vragen.
        plot()
            .find('g.overplot > g.xy')
            .should(($xy) => {
                const [, x, y] = /^translate\(([\d.]+), ?([\d.]+)\)/.exec($xy.attr('transform') ?? '') ?? [];
                expect(Number(x)).to.be.at.least(left);
                expect(Number(y)).to.be.at.least(top);
            });
    });

    it('should not draw when there is nothing to draw', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);

        stateMessage().should('exist');
        plot().find('svg').should('not.exist');
    });
});

// Plotly zet de ruwe waarde van elke tick in data-unformatted; zo hangt de test niet af van de opmaak van getallen.
const visibleTicks = (axis: 'x' | 'y') => plot().find(`g.${axis}tick text:visible`);

describe('cypress-component - widgets - vl-chart-line - axes', () => {
    it('should start the value axis at 0', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        visibleTicks('y').first().should('have.attr', 'data-unformatted', '0');
    });

    it('should include 0 on the value axis when all values are negative', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [-0.3, -0.1, -0.2])]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        visibleTicks('y').last().should('have.attr', 'data-unformatted', '0');
    });

    it('should let the position axis run from the first to the last x value', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        visibleTicks('x').first().should('have.attr', 'data-unformatted', '2020');
        visibleTicks('x').last().should('have.attr', 'data-unformatted', '2022');
    });
});

describe('cypress-component - widgets - vl-chart-line - lines', () => {
    it('should draw one line per series', () => {
        const model = buildModel([
            buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64]),
            buildSeries('Obscurionweg 93', [0.52, 0.58, 0.55]),
        ]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        plot().find('g.scatterlayer g.trace path.js-line').should('have.length', 2);
    });

    it('should color the lines in the order of the categorical palette', () => {
        const model = buildModel([
            buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64]),
            buildSeries('Obscurionweg 93', [0.52, 0.58, 0.55]),
        ]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        // Plotly zet de kleur als rgb() in de style van het path.
        plot().find('g.scatterlayer path.js-line').eq(0).should('have.css', 'stroke', 'rgb(35, 137, 226)'); // De Schelde
        plot().find('g.scatterlayer path.js-line').eq(1).should('have.css', 'stroke', 'rgb(82, 31, 129)'); // Struikheide
    });

    it('should break the line at a gap', () => {
        const model = buildModel([
            {
                name: 'Obscurionweg 91',
                x: Float64Array.from([2020, 2021, 2022, 2023, 2024]),
                y: Float64Array.from([0.66, 0.71, NaN, 0.64, 0.6]),
            },
        ]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        // Elk stuk lijn begint met een M (moveTo) in het path; een onderbreking geeft dus twee M's.
        plot()
            .find('g.scatterlayer path.js-line')
            .should(($paths) => {
                const moves = $paths.toArray().flatMap((path) => path.getAttribute('d')?.match(/M/g) ?? []);
                expect(moves).to.have.length(2);
            });
    });
});

const unit = () => cy.get('vl-chart-line').shadow().find('.unit');

describe('cypress-component - widgets - vl-chart-line - axis titles', () => {
    it('should show the title of the position axis', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().find('text.xtitle').should('be.visible').and('have.text', 'Jaar');
    });

    it('should show the unit above the chart instead of a rotated axis title', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        unit().should('be.visible').and('have.text', 'µT');
        plot().find('text.ytitle').should('not.exist');
    });

    it('should open the explanation of the unit from an info button next to it', () => {
        const model = completeModel();
        model.meta.y.unitInfo = 'microtesla, de sterkte van het magnetisch veld';
        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        unit()
            .find('vl-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label', 'Uitleg bij de eenheid')
            .click();
        unit().find('vl-popover').should('have.attr', 'open');
        unit()
            .find('.unit-info')
            .should('be.visible')
            .and('have.text', 'microtesla, de sterkte van het magnetisch veld');
        unit().find('.unit-info').should('have.css', 'word-break', 'normal');
    });

    it('should not show an info button when the unit has no explanation', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        unit().find('vl-button').should('not.exist');
    });

    it('should not show a unit when there is nothing to draw', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);

        unit().should('not.exist');
    });
});

const source = () => cy.get('vl-chart-line').shadow().find('.source');

describe('cypress-component - widgets - vl-chart-line - source', () => {
    it('should show the source below the chart', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        source().should('be.visible').and('contain.text', 'Bron:').and('contain.text', 'Vlaamse Milieumaatschappij');
    });

    it('should link to the source when it has an address', () => {
        const model = completeModel();
        model.meta.sources[0].href = 'https://www.vmm.be';

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        source()
            .find('vl-link')
            .should('have.attr', 'href', 'https://www.vmm.be')
            .and('have.text', 'Vlaamse Milieumaatschappij');
    });

    it('should link a source with only a metadata key to its record in the catalogue', () => {
        const model = completeModel();
        model.meta.sources = [
            { title: 'Maatwerkgebieden stikstofdecreet', metadataId: '449f14d5-c179-58ae-95be-15fc48fdd414' },
        ];

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        source()
            .find('vl-link')
            .should('have.attr', 'href')
            .and('contain', 'metadata.omgeving.vlaanderen.be')
            .and('contain', '449f14d5-c179-58ae-95be-15fc48fdd414');
    });

    it('should read the title, the owner and open data from the record in the catalogue', () => {
        cy.readFile('../../libs/widgets/src/datavis/models/sample-data/record-vlops-nh3.xml').then((record) => {
            cy.intercept('GET', '**/srv/api/records/2bee1b5e-c3c4-59bb-8d9a-742d3002d34e/formatters/xml', {
                body: record,
                headers: { 'content-type': 'application/xml' },
            }).as('record');
        });
        const model = completeModel();
        model.meta.sources = [{ metadataId: '2bee1b5e-c3c4-59bb-8d9a-742d3002d34e' }];

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        cy.wait('@record');
        source().should('contain.text', 'VLOPS kaarten - NH3 - NH3 concentratie');
        source().find('.source-owner').should('have.text', 'VLAAMSE MILIEUMAATSCHAPPIJ');
        cy.get('vl-chart-line').shadow().find('.open-data-mark').should('exist');
    });

    it('should name a source by its key, with its link, when the catalogue does not answer', () => {
        cy.intercept('GET', '**/srv/api/records/1fe4dff9-87b4-5646-b29a-a026025f520e/formatters/xml', {
            statusCode: 503,
        }).as('record');
        const model = completeModel();
        model.meta.sources = [{ metadataId: '1fe4dff9-87b4-5646-b29a-a026025f520e' }];

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        cy.wait('@record');
        source()
            .find('vl-link')
            .should('have.text', 'Metadatarecord 1fe4dff9-87b4-5646-b29a-a026025f520e')
            .and('have.attr', 'href')
            .and('contain', '#/metadata/1fe4dff9-87b4-5646-b29a-a026025f520e');
    });

    it('should name the owner on a line of its own under the source, without opening a panel', () => {
        const model = completeModel();
        model.meta.sources = [{ title: 'Maatwerkgebieden stikstofdecreet', owner: 'Agentschap voor Natuur en Bos' }];

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        source().find('li vl-text').first().should('have.text', 'Maatwerkgebieden stikstofdecreet');
        source()
            .find('.source-owner')
            .should('have.text', 'Agentschap voor Natuur en Bos')
            .then(($owner) => {
                source()
                    .find('li vl-text')
                    .first()
                    .should(($title) => {
                        expect(rect($owner).top).to.be.at.least(rect($title).bottom);
                    });
            });
    });

    it('should keep the open data mark on the right, also with long titles', () => {
        const model = completeModel();
        model.meta.isOpenData = true;
        model.meta.sources = [
            {
                title: 'VLOPS kaarten - NH3 - NH3 concentratie (VLOPS23, meteo 2021, emissies 2021)',
                owner: 'Vlaamse Milieumaatschappij',
            },
            { title: 'Maatwerkgebieden stikstofdecreet', owner: 'Agentschap voor Natuur en Bos' },
        ];
        cy.viewport(600, 800);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        cy.get('vl-chart-line')
            .shadow()
            .find('.open-data-mark')
            .then(($mark) => {
                source().should(($source) => {
                    expect(rect($mark).left).to.be.greaterThan(rect($source).right);
                    expect(rect($mark).top).to.be.lessThan(rect($source).bottom);
                });
            });
    });

    it('should tell the developer once about a source without a record in the catalogue', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'warn').as('consoleWarn');
        });

        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        source().should('be.visible');
        cy.get('@consoleWarn').should('have.been.calledOnceWith', Cypress.sinon.match(/geen metadataId/));
    });

    it('should name every source when there are several', () => {
        const model = completeModel();
        model.meta.sources = [{ title: 'Vlaamse Milieumaatschappij' }, { title: 'Departement Omgeving' }];

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        source().should('contain.text', 'Bronnen:');
        source()
            .find('li')
            .then(($items) =>
                expect($items.toArray().map((item) => item.textContent?.trim())).to.deep.equal([
                    'Vlaamse Milieumaatschappij',
                    'Departement Omgeving',
                ]),
            );
    });

    it('should mark open data on the right, linking to the open data page', () => {
        const model = completeModel();
        model.meta.isOpenData = true;

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        const mark = () => cy.get('vl-chart-line').shadow().find('.open-data-mark');
        mark().should('contain.text', 'Vlaamse Open Data').find('vl-icon').should('have.attr', 'icon', 'vlaanderen');
        mark().find('a').should('have.attr', 'href').and('contain', 'open-data');
        cy.get('vl-chart-line')
            .shadow()
            .find('.source')
            .then(($source) => {
                mark().should(($mark) => {
                    expect(rect($mark).left).to.be.greaterThan(rect($source).right);
                });
            });
    });

    it('should not mark data that is not open data', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        cy.get('vl-chart-line').shadow().find('.open-data-mark').should('not.exist');
    });

    it('should not show a source when there is nothing to draw', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);

        source().should('not.exist');
    });
});

const wideValuesModel = () => {
    const model = buildModel([
        buildSeries('Obscurionweg 91', [125000.5, 131000.25, 128000.75]),
        buildSeries('Obscurionweg 93 (meetpunt achter de school)', [98000.5, 101000.25, 99500.75]),
    ]);
    model.meta.y = { type: 'number', title: 'Magnetische fluxdichtheid', unit: 'µT' };
    return model;
};

const rect = ($el: JQuery<HTMLElement>) => $el[0].getBoundingClientRect();
// 1 px speling: automargin legt een titel tegen de rand, en het tekstvak van een titel reikt een halve pixel verder.
const EDGE_TOLERANCE = 1;
const isInside = (inner: DOMRect, outer: DOMRect) =>
    inner.left >= outer.left - EDGE_TOLERANCE &&
    inner.right <= outer.right + EDGE_TOLERANCE &&
    inner.top >= outer.top - EDGE_TOLERANCE &&
    inner.bottom <= outer.bottom + EDGE_TOLERANCE;
const overlaps = (a: DOMRect, b: DOMRect) =>
    a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

const directLabels = () => plot().find('g.annotation');

// Plotly tekent in meerdere svg-lagen boven elkaar; titels en labels zitten in een andere laag dan de lijnen.
describe('cypress-component - widgets - vl-chart-line - layout', () => {
    (['xtitle', 'annotation'] as const).forEach((part) => {
        it(`should draw the ${part} inside the plot`, () => {
            cy.viewport(1800, 500); // breed genoeg voor deze lange directe labels; smaller komt er een legende
            cy.mount(html`<vl-chart-line .data=${wideValuesModel()}></vl-chart-line>`);

            plot().then(($plot) => {
                plot()
                    .find(`.${part}`)
                    .should('exist')
                    .each(($part) => expect(isInside(rect($part), rect($plot)), $part.text()).to.be.true);
            });
        });
    });

    it('should keep wide y tick labels inside the plot', () => {
        cy.mount(html`<vl-chart-line .data=${wideValuesModel()}></vl-chart-line>`);

        plot().then(($plot) => {
            visibleTicks('y').each(($tick) => {
                expect(isInside(rect($tick), rect($plot)), $tick.text()).to.equal(true);
            });
        });
    });

    it('should keep the first tick labels of both axes apart', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        visibleTicks('y')
            .first()
            .then(($y) => {
                visibleTicks('x')
                    .first()
                    .should(($x) => expect(overlaps(rect($y), rect($x))).to.be.false);
            });
    });
});

describe('cypress-component - widgets - vl-chart-line - direct labels', () => {
    // Breed genoeg voor directe labels; smaller komt er een legende (zie de test met de legende).
    beforeEach(() => cy.viewport(1000, 500));

    const twoSeriesModel = () =>
        buildModel([
            buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64]),
            buildSeries('Obscurionweg 93', [0.32, 0.38, 0.35]),
        ]);

    it('should label each line by name and its last value instead of showing a legend', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        directLabels().should('have.length', 2);
        directLabels().eq(0).should('have.text', 'Obscurionweg 91 0,64');
        directLabels().eq(1).should('have.text', 'Obscurionweg 93 0,35');
        plot().find('g.legend').should('not.exist');
    });

    it('should show a legend above the chart when the labels would take too much of the width', () => {
        cy.mount(html`<div style="width: 24rem"><vl-chart-line .data=${twoSeriesModel()}></vl-chart-line></div>`);

        directLabels().should('have.length', 0);
        cy.get('vl-chart-line').shadow().find('.legend li').should('have.length', 2);
        cy.get('vl-chart-line')
            .shadow()
            .find('.legend li')
            .eq(0)
            .invoke('text')
            .invoke('trim')
            .should('equal', 'Obscurionweg 91 0,64');
        cy.get('vl-chart-line').shadow().find('.legend li b').eq(0).should('have.text', '0,64');
    });

    it('should not show a legend when the labels fit next to the lines', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        directLabels().should('have.length', 2);
        cy.get('vl-chart-line').shadow().find('.legend').should('not.exist');
    });

    it('should show the last value in bold', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        directLabels().eq(0).find('tspan').contains('0,64').should('have.css', 'font-weight', '700');
    });

    it('should place the label right of the end of its line', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        plot()
            .find('g.scatterlayer g.trace')
            .eq(0)
            .find('path.point')
            .last()
            .then(($lastPoint) => {
                directLabels()
                    .eq(0)
                    .should(($label) => {
                        const point = rect($lastPoint);
                        const label = rect($label);
                        expect(label.left).to.be.greaterThan(point.right);
                        expect(point.top + point.height / 2).to.be.within(label.top, label.bottom);
                    });
            });
    });

    it('should color the label in the text grade of its series', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        directLabels().eq(0).find('text').should('have.css', 'fill', 'rgb(15, 111, 191)'); // De Schelde 600
    });
});

const announcement = () => cy.get('vl-chart-line').shadow().find('[aria-live]');
const tooltip = () => cy.get('vl-chart-line').shadow().find('.tooltip');

describe('cypress-component - widgets - vl-chart-line - number format', () => {
    it('should group thousands on the value axis', () => {
        cy.mount(html`<vl-chart-line .data=${wideValuesModel()}></vl-chart-line>`);

        visibleTicks('y')
            .last()
            .invoke('text')
            .should('match', /^\d{1,3}(\.\d{3})+$/);
    });

    it('should not group the years on the position axis', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        visibleTicks('x').first().should('have.text', '2020');
    });
});

describe('cypress-component - widgets - vl-chart-line - tooltip', () => {
    const twoSeriesModel = () =>
        buildModel([
            buildSeries('Obscurionweg 91', [0.66, 0.71, 0.6]),
            buildSeries('Obscurionweg 93', [0.32, 0.38, 0.35]),
        ]);

    it('should show one tooltip per x with every series, value and unit', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        plot().find('.nsewdrag').trigger('mousemove', 'center');

        tooltip().find('.tooltip-title').should('contain.text', '2021').and('contain.text', 'µT');
        tooltip()
            .find('tr')
            .should(($rows) => {
                const rows = $rows.toArray().map((row) => row.textContent?.replace(/\s+/g, ' ').trim());
                expect(rows).to.deep.equal(['Obscurionweg 91 0,71', 'Obscurionweg 93 0,38']);
            });
    });

    it('should list the series from high to low and put a dot on every line', () => {
        const model = buildModel([
            buildSeries('Obscurionweg 93', [0.32, 0.38, 0.35]),
            buildSeries('Obscurionweg 91', [0.66, 0.71, 0.6]),
        ]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        plot().find('.nsewdrag').trigger('mousemove', 'center');

        tooltip().find('tr').first().should('contain.text', 'Obscurionweg 91');
        cy.get('vl-chart-line').shadow().find('.hover-dot').should('have.length', 2);
        cy.get('vl-chart-line').shadow().find('.crosshair').should('exist');
    });

    it('should hide the tooltip of Plotly itself', () => {
        cy.mount(html`<vl-chart-line .data=${twoSeriesModel()}></vl-chart-line>`);

        plot().find('.nsewdrag').trigger('mousemove', 'center');

        tooltip().should('exist');
        plot().find('g.hoverlayer').should('not.be.visible');
    });

    it('should pad values to the same number of decimals', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, 0.7, 0.64])]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        plot().find('.nsewdrag').trigger('mousemove', 'center');

        tooltip().find('.tooltip-value').should('have.text', '0,70');
    });
});

/** Een tik met de vinger: pointerdown en pointerup op dezelfde plek. */
const tap = (position: Cypress.PositionType) => {
    const touch = { pointerType: 'touch', eventConstructor: 'PointerEvent' };
    plot().find('.nsewdrag').trigger('pointerdown', position, touch).trigger('pointerup', position, touch);
};

describe('cypress-component - widgets - vl-chart-line - touch', () => {
    it('should pin the tooltip to the x closest to a tap', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        tap('right');

        tooltip().find('.tooltip-title').should('contain.text', '2022');
        plot().find('.nsewdrag').trigger('mouseout');
        tooltip().should('exist');
    });

    it('should hide a pinned tooltip with a second tap on the same x', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        tap('center');
        tooltip().should('contain.text', '2021');
        tap('center');

        tooltip().should('not.exist');
    });

    it('should move a pinned tooltip with a tap on another x', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        tap('center');
        tap('left');

        tooltip().find('.tooltip-title').should('contain.text', '2020');
    });

    it('should hide a pinned tooltip with a tap outside the chart', () => {
        cy.mount(
            html`<p id="outside">Buiten</p>
                <vl-chart-line .data=${completeModel()}></vl-chart-line>`,
        );

        tap('center');
        tooltip().should('exist');
        cy.get('#outside').trigger('pointerdown', { pointerType: 'touch', eventConstructor: 'PointerEvent' });

        tooltip().should('not.exist');
    });

    it('should hide a pinned tooltip on Escape', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        tap('center');
        tooltip().should('exist');
        plot().trigger('keydown', { key: 'Escape' });

        tooltip().should('not.exist');
    });

    it('should not pin the tooltip with a mouse click', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);
        const mouse = { pointerType: 'mouse', eventConstructor: 'PointerEvent' };

        plot().find('.nsewdrag').trigger('pointerdown', 'center', mouse).trigger('pointerup', 'center', mouse);

        tooltip().should('not.exist');
    });
});

describe('cypress-component - widgets - vl-chart-line - keyboard', () => {
    it('should be reachable with the keyboard and explain how to use it', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot()
            .should('have.attr', 'tabindex', '0')
            .and('have.attr', 'aria-roledescription', 'grafiek')
            .and('have.attr', 'aria-label', 'µT')
            .and('have.attr', 'aria-describedby', 'keyboard-hint');
        cy.get('vl-chart-line').shadow().find('#keyboard-hint').should('contain.text', 'pijltjestoetsen');
    });

    it('should not be focusable when there is nothing to draw', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);

        plot().should('not.have.attr', 'tabindex');
    });

    it('should show the tooltip and read the values when stepping with the arrow keys', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().focus().trigger('keydown', { key: 'ArrowRight' });
        tooltip().should('contain.text', '2020');
        announcement().should('have.text', '2020: Obscurionweg 91 0,66\u00A0µT');

        plot().trigger('keydown', { key: 'ArrowRight' });
        announcement().should('have.text', '2021: Obscurionweg 91 0,71\u00A0µT');

        plot().trigger('keydown', { key: 'End' });
        announcement().should('have.text', '2022: Obscurionweg 91 0,64\u00A0µT');

        plot().trigger('keydown', { key: 'ArrowRight' });
        announcement().should('have.text', '2022: Obscurionweg 91 0,64\u00A0µT');
    });

    it('should hide the tooltip on Escape', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().focus().trigger('keydown', { key: 'ArrowRight' });
        tooltip().should('exist');

        plot().trigger('keydown', { key: 'Escape' });
        tooltip().should('not.exist');
        announcement().should('be.empty');
    });

    it('should keep the keyboard tooltip when the mouse leaves, and hide it when the chart loses focus', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);

        plot().focus().trigger('keydown', { key: 'ArrowRight' });
        plot().find('.nsewdrag').trigger('mouseout');
        tooltip().should('contain.text', '2020');

        plot().blur();
        tooltip().should('not.exist');
        announcement().should('be.empty');
    });

    it('should say when a series has no value at that x', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, NaN, 0.64])]);

        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);

        plot().focus().trigger('keydown', { key: 'ArrowRight' }).trigger('keydown', { key: 'ArrowRight' });
        announcement().should('have.text', '2021: Obscurionweg 91 geen gegevens');
    });
});

describe('cypress-component - widgets - vl-chart-line - accessibility', () => {
    const shouldBeAccessible = () => {
        cy.injectAxe();
        cy.checkA11y('vl-chart-line');
    };

    it('should be accessible while loading', () => {
        cy.mount(html`<vl-chart-line></vl-chart-line>`);
        stateMessage().should('exist');

        shouldBeAccessible();
    });

    it('should be accessible with data', () => {
        cy.mount(html`<vl-chart-line .data=${completeModel()}></vl-chart-line>`);
        plot().find('.main-svg').should('exist');

        shouldBeAccessible();
    });

    it('should be accessible with a gap', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, NaN, 0.64])]);
        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);
        plot().find('.main-svg').should('exist');

        shouldBeAccessible();
    });

    it('should be accessible without data', () => {
        cy.mount(html`<vl-chart-line .data=${buildModel([])}></vl-chart-line>`);
        stateMessage().should('contain.text', 'Geen gegevens');

        shouldBeAccessible();
    });

    it('should be accessible with an error', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64])], []);
        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);
        stateMessage().should('contain.text', 'kan nu niet getoond worden');

        shouldBeAccessible();
    });

    it('should be accessible with the explanation of the unit open', () => {
        const model = completeModel();
        model.meta.y.unitInfo = 'microtesla, de sterkte van het magnetisch veld';
        cy.mount(html`<vl-chart-line .data=${model}></vl-chart-line>`);
        unit().find('vl-button').shadow().find('button').click();
        unit().find('.unit-info').should('be.visible');

        // vl-popover zet aria-controls op de knop in de shadow root van vl-button, naar een id in een andere shadow
        // root: dat verwijst nergens heen (libs/components/src/block/popover/vl-floating-ui.controller.ts:73). Een
        // fout van Flux, niet van de grafiek; de andere regels blijven gelden.
        cy.injectAxe();
        cy.checkA11y('vl-chart-line', { rules: { 'aria-valid-attr-value': { enabled: false } } });
    });
});
