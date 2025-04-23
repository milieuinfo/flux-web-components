import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlMapLegend } from '../legend/vl-map-legend';
import { VlMap } from '../../vl-map';
import { VlMapWfsLayer } from '../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapBaseLayerGRBGray } from '../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapLayerCircleStyle } from '../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import { VlMapFeaturesLayer } from '../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLegendItem } from './vl-map-legend-item';

registerWebComponents([
    VlMapLegend,
    VlMap,
    VlMapWfsLayer,
    VlMapBaseLayerGRBGray,
    VlMapLayerCircleStyle,
    VlMapFeaturesLayer,
    VlMapLegendItem,
]);

const legendItem = `
<vl-map-legend-item layer="Beslissing">
    <span slot="icon">
        <div
            style="
                height: 50px;
                width: 50px;
                border: 1px solid rgb(0, 0, 0);
                background-color:rgb(200, 0, 0);"
        ></div>
    </span>
    <span slot="label">Custom label</span>
</vl-map-legend-item>`;

describe('component vl-map-legend-item', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Shapes"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"styleId":"style-1"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[141000,200908]},"properties":{"styleId":"style-2"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{"styleId":"style-3"}}]}'
                >
                    <vl-map-layer-circle-style
                        id="style-1"
                        name="Openbaar onderzoek"
                        color="#ffe615"
                        size="5"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-circle-style>
                    <vl-map-layer-circle-style
                        id="style-2"
                        name="Beslissing"
                        color="red"
                        size="5"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-circle-style>
                    <vl-map-layer-style
                        id="style-3"
                        name="Wateroppervlaktes"
                        color="rgba(255,0,0,0.5)"
                        border-color="rgba(255,255,100,1)"
                        border-size="2"
                        text-feature-attribute-name="label"
                        text-background-color="rgba(0,0,255,0.2)"
                        text-border-color="rgba(0,255,0,1)"
                        text-border-size="3"
                        text-color="rgba(255,0,0,1)"
                        text-offset-x="10"
                        text-offset-y="-10"
                        text-size="13px"
                    ></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend>
                    <vl-map-legend-item layer="Wateroppervlaktes">
                        <span slot="icon">
                            <div
                                style="
                                height: 12px;
                                width: 12px;
                                border: 1px solid rgb(0, 0, 0);
                                background-color:rgb(128, 0, 128);"
                            ></div>
                        </span>
                        <span slot="label">Custom label</span>
                    </vl-map-legend-item>
                </vl-map-legend>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-legend-item').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-legend');
    });

    it('should have the correct number of legend items', () => {
        cy.get('vl-map-legend').shadow().find('vl-map-legend-item').shadow().children().should('have.length', 1);
    });

    it('should contain the custom icon', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('vl-map-legend-item')
            .shadow()
            .find('div#legend-item > div.uig-map-legend-icon-container > slot[name="icon"]')
            .then(($slot) => {
                const slotContent = ($slot[0] as HTMLSlotElement).assignedNodes()[0];

                cy.wrap(slotContent)
                    .find('div')
                    .should('have.css', 'height', '12px')
                    .should('have.css', 'width', '12px')
                    .should('have.css', 'border', '1px solid rgb(0, 0, 0)')
                    .should('have.css', 'background-color', 'rgb(128, 0, 128)');
            });
    });

    it('should contain the custom label', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('vl-map-legend-item')
            .shadow()
            .find('div#legend-item > span#label > slot[name="label"]')
            .then(($slot) => {
                const slotContent = ($slot[0] as HTMLSlotElement).assignedNodes()[0];

                cy.wrap(slotContent).contains('Custom label');
            });
    });

    it('should show a newly added item', () => {
        cy.get('vl-map-legend').then(($legend) => {
            $legend.append(legendItem);

            cy.get('vl-map-legend').shadow().find('div.uig-map-legend > vl-map-legend-item').should('have.length', 2);

            cy.get('vl-map-legend')
                .shadow()
                .find('vl-map-legend-item')
                .shadow()
                .find('div#legend-item > div.uig-map-legend-icon-container > slot[name="icon"]')
                .then(($slot) => {
                    const slotContent = ($slot[1] as HTMLSlotElement).assignedNodes()[0];

                    cy.wrap(slotContent)
                        .find('div')
                        .should('have.css', 'height', '50px')
                        .should('have.css', 'width', '50px')
                        .should('have.css', 'border', '1px solid rgb(0, 0, 0)')
                        .should('have.css', 'background-color', 'rgb(200, 0, 0)');
                });
        });
    });

    it('should remove deleted items', () => {
        cy.get('vl-map-legend').then(($legend) => {
            $legend.append(legendItem);

            cy.get('vl-map-legend')
                .shadow()
                .find('div.uig-map-legend > vl-map-legend-item')
                .should('have.length', 2)
                .then(() => {
                    $legend.children()[1].remove();

                    cy.get('vl-map-legend')
                        .shadow()
                        .find('div.uig-map-legend > vl-map-legend-item')
                        .should('have.length', 1);
                });
        });
    });

    it('should display the default style for an item without a label and icon slot', () => {
        const defaultLegendItem = `<vl-map-legend-item layer="Beslissing"></vl-map-legend-item>`;

        cy.get('vl-map-legend').then(($legend) => {
            $legend.append(defaultLegendItem);

            cy.get('vl-map-legend').shadow().find('div.uig-map-legend > vl-map-legend-item').should('have.length', 1);

            cy.get('vl-map-legend')
                .shadow()
                .find('div.uig-map-legend-item > div.uig-map-legend-icon-container > div.uig-map-legend-icon')
                .should('have.css', 'border', '1px solid rgb(0, 0, 0)')
                .should('have.css', 'background-color', 'rgb(255, 0, 0)');
        });
    });

    it('should display the default style with icon text', () => {
        const defaultLegendItem = `<vl-map-legend-item layer="Beslissing" icon-text="B"></vl-map-legend-item>`;

        cy.get('vl-map-legend').then(($legend) => {
            $legend.append(defaultLegendItem);

            cy.get('vl-map-legend').shadow().find('div.uig-map-legend > vl-map-legend-item').should('have.length', 1);

            cy.get('vl-map-legend')
                .shadow()
                .find('div.uig-map-legend-item > div.uig-map-legend-icon-container > div.uig-map-legend-icon')
                .should('have.css', 'border', '1px solid rgb(0, 0, 0)')
                .should('have.css', 'background-color', 'rgb(255, 0, 0)')
                .should('have.contain', 'B');
        });
    });
});
