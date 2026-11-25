import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import type { ChartModel } from '../models/chart.model';
import { VlChartLine } from './vl-chart-line.component';
import { VlChartReference } from './vl-chart-reference.component';

registerWebComponents([VlChartLine, VlChartReference]);

const model: ChartModel = {
    meta: { sources: [{ title: 'Departement Omgeving' }], x: { type: 'number' }, y: { type: 'number', unit: 'µT' } },
    series: [{ name: 'Meetpunt Beringen', x: Float64Array.from([1, 2, 3]), y: Float64Array.from([0.21, 0.32, 0.27]) }],
};

type DrawnLayout = {
    shapes?: { y0: number; line: { dash?: string } }[];
    annotations?: { text: string }[];
    yaxis: { range: [number, number] };
};
/** De gestreepte referentielijnen, zonder de rasterlijn op de rand. */
const referenceLinesOf = (layout: DrawnLayout) => (layout.shapes ?? []).filter((shape) => shape.line.dash === 'dash');

/** Plotly zet na elk tekenen een nieuw `layout`-object op het element: lees het in de `should`, zodat Cypress het
 *  opnieuw leest tot het klopt. */
const shouldDraw = (assert: (layout: DrawnLayout) => void) =>
    cy
        .get('vl-chart-line')
        .shadow()
        .find('.plot')
        .should(($plot) => {
            const layout = ($plot[0] as HTMLElement & { layout?: DrawnLayout }).layout;
            expect(layout, 'getekend').to.not.equal(undefined);
            assert(layout!);
        });

const notes = () => cy.get('vl-chart-line').shadow().find('.reference-notes li');

describe('cypress-component - widgets - vl-chart-reference', () => {
    it('should stretch the value axis to a reference with in-view, and draw it as a dashed line with its label', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="1" label="Streefwaarde" in-view></vl-chart-reference>
            </vl-chart-line>`,
        );

        shouldDraw((layout) => {
            expect(referenceLinesOf(layout).map((shape) => shape.y0)).to.deep.equal([1]);
            expect(layout.annotations?.map((label) => label.text)).to.include('Streefwaarde: 1 µT');
            expect(layout.yaxis.range[1]).to.be.at.least(1);
        });
        notes().should('not.exist');
    });

    it('should draw a reference without in-view that falls within the data anyway', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="0.3" label="Vlaamse streefwaarde"></vl-chart-reference>
            </vl-chart-line>`,
        );

        shouldDraw((layout) => expect(referenceLinesOf(layout).map((shape) => shape.y0)).to.deep.equal([0.3]));
        notes().should('not.exist');
    });

    it('should keep the value axis for a far reference without in-view, and note it above the chart', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="0.4" label="Vlaamse streefwaarde" in-view></vl-chart-reference>
                <vl-chart-reference value="100" label="EU-referentieniveau"></vl-chart-reference>
            </vl-chart-line>`,
        );

        shouldDraw((layout) => {
            expect(layout.yaxis.range).to.deep.equal([0, 0.4]);
            expect(referenceLinesOf(layout).map((shape) => shape.y0)).to.deep.equal([0.4]);
        });
        notes().should('have.length', 1).and('contain.text', '↑').and('contain.text', 'EU-referentieniveau: 100');
    });

    it('should draw again when a reference changes or is added', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="1" label="EU" in-view></vl-chart-reference>
            </vl-chart-line>`,
        );
        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(1));

        cy.get('vl-chart-reference').invoke('attr', 'value', '0.5');
        shouldDraw((layout) => expect(referenceLinesOf(layout)[0].y0).to.equal(0.5));

        cy.get('vl-chart-line').then(($chart) => {
            const reference = document.createElement('vl-chart-reference');
            reference.setAttribute('value', '0.2');
            reference.setAttribute('label', 'Streefwaarde');
            $chart[0].append(reference);
        });
        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(2));
    });

    it('should follow in-view when it is removed', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="100" label="EU-referentieniveau" in-view></vl-chart-reference>
            </vl-chart-line>`,
        );
        shouldDraw((layout) => expect(layout.yaxis.range[1]).to.equal(100));

        cy.get('vl-chart-reference').invoke('removeAttr', 'in-view');
        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(0));
        notes().should('have.length', 1);
    });

    it('should stop drawing a reference that is removed, and follow the tags again after moving the chart', () => {
        cy.mount(
            html`<div class="after"></div>
                <vl-chart-line .data=${model}>
                    <vl-chart-reference value="1" label="EU" in-view></vl-chart-reference>
                    <vl-chart-reference value="0.2" label="Streefwaarde"></vl-chart-reference>
                </vl-chart-line>`,
        );
        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(2));

        cy.get('vl-chart-reference[label="Streefwaarde"]').invoke('remove');
        shouldDraw((layout) => expect(referenceLinesOf(layout).map((shape) => shape.y0)).to.deep.equal([1]));

        // Verplaatsen = loskoppelen en opnieuw verbinden: de observer moet daarna weer luisteren.
        cy.get('vl-chart-line').then(($chart) => document.querySelector('.after')!.append($chart[0]));
        cy.get('vl-chart-reference').invoke('attr', 'value', '0.7');
        shouldDraw((layout) => expect(referenceLinesOf(layout).map((shape) => shape.y0)).to.deep.equal([0.7]));
    });

    it('should describe every reference for a screen reader, also the ones above the chart', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="0.4" label="Vlaamse streefwaarde" in-view></vl-chart-reference>
                <vl-chart-reference value="100" label="EU-referentieniveau"></vl-chart-reference>
            </vl-chart-line>`,
        );

        cy.get('vl-chart-line')
            .shadow()
            .find('.plot')
            .should('have.attr', 'aria-describedby', 'keyboard-hint references');
        cy.get('vl-chart-line')
            .shadow()
            .find('#references')
            .should('have.text', 'Referentielijnen: Vlaamse streefwaarde: 0,4 µT; EU-referentieniveau: 100 µT.');
    });

    it('should warn about a reference without a value and skip it', () => {
        cy.window().then((win) => cy.spy(win.console, 'warn').as('warn'));

        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference label="Zonder waarde"></vl-chart-reference>
            </vl-chart-line>`,
        );

        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(0));
        cy.get('@warn').should('have.been.calledWithMatch', 'vl-chart-reference');
    });

    it('should have no accessibility violations, with a line and a note', () => {
        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="0.4" label="Vlaamse streefwaarde" in-view></vl-chart-reference>
                <vl-chart-reference value="100" label="EU-referentieniveau"></vl-chart-reference>
            </vl-chart-line>`,
        );
        notes().should('have.length', 1);
        cy.injectAxe();
        cy.checkA11y('vl-chart-line');
    });

    it('should put the notes on the PNG too, one line each', () => {
        /** De hoogte van de PNG in pixels. */
        const pngHeight = () =>
            cy.get('vl-chart-line').then(async ($chart) => {
                const png = await ($chart[0] as VlChartLine).buildPng('Magnetische fluxdichtheid');
                return (await createImageBitmap(png!)).height;
            });

        cy.mount(
            html`<vl-chart-line .data=${model}>
                <vl-chart-reference value="100" label="EU-referentieniveau"></vl-chart-reference>
            </vl-chart-line>`,
        );
        shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(0));
        pngHeight().then((withNote) => {
            cy.get('vl-chart-reference').invoke('attr', 'in-view', '');
            shouldDraw((layout) => expect(referenceLinesOf(layout)).to.have.length(1));
            // Eén tekstregel van 20 CSS-pixels, maal PNG_SCALE.
            pngHeight().should((withoutNote) => expect(withNote - withoutNote).to.equal(40));
        });
    });
});
