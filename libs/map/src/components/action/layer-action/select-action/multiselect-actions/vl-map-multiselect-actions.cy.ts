import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlMap } from '../../../../../vl-map';
import { VlMapBaseLayerGRBGray } from '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapFeaturesLayer } from '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapMultiselectActions } from './vl-map-multiselect-actions';

registerWebComponents([VlMap, VlMapBaseLayerGRBGray, VlMapFeaturesLayer, VlMapMultiselectActions]);

const featuresLayer1 = {
    type: 'Feature',
    id: 1,
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [100000, 150000],
                [200000, 150000],
                [200000, 250000],
                [100000, 250000],
                [100000, 150000],
            ],
        ],
    },
};

const featuresLayer2 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 2,
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [100000, 140000],
                        [190000, 140000],
                        [190000, 200000],
                        [100000, 200000],
                        [100000, 140000],
                    ],
                ],
            },
        },
    ],
};

const layers = ['layer-1', 'layer-2'];

describe('component vl-map-multiselect-actions', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer data-vl-name="layer-1" .features=${featuresLayer1}>
                    <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-features-layer .features=${featuresLayer2} data-vl-name="layer-2">
                    <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style
                ></vl-map-features-layer>
                <vl-map-multiselect-actions .active=${true} .layers=${layers} ?data-vl-default-active=${true}>
                </vl-map-multiselect-actions>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-multiselect-actions');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-multiselect-actions');
    });

    it('should fire the onSelect event', () => {
        cy.window().then((win) => {
            // @ts-ignore
            win.selectStub = cy.stub().as('selectStub');
        });

        cy.get('vl-map').should('exist');
        cy.get('vl-map-multiselect-actions').should('exist');

        cy.document().then((doc) => {
            const multiselectActions = doc.querySelector('vl-map-multiselect-actions') as VlMapMultiselectActions;

            multiselectActions.onSelect((...args) => {
                // @ts-ignore
                window.selectStub(args);
            });
        });
        cy.wait(1000);
        cy.get('vl-map').click(100, 200);

        // Assertions to verify if the stub was called as expected
        cy.window().its('selectStub').should('have.been.calledOnce');
    });

    it('should have the correct features and layers in the event args when selecting 1 feature', () => {
        let selectArgs = [];

        cy.window().then((win) => {
            // @ts-ignore
            win.selectStub = cy.stub().as('selectStub');
        });

        cy.get('vl-map').should('exist');
        cy.get('vl-map-multiselect-actions').should('exist');

        cy.document().then((doc) => {
            const multiselectActions = doc.querySelector('vl-map-multiselect-actions') as VlMapMultiselectActions;
            // Use the stub function here
            // @ts-ignore
            multiselectActions.onSelect((...args) => {
                // @ts-ignore
                window.selectStub(args);
                selectArgs = args;
            });
        });
        cy.wait(1000);
        cy.get('vl-map').click(100, 200);

        // Assertions to verify if the stub was called as expected
        cy.window()
            .its('selectStub')
            .should('have.been.calledOnce')
            .then(() => {
                const [selectedFeatures, event, layers] = selectArgs;

                expect(selectedFeatures).to.be.an('array').that.has.lengthOf(1);
                expect(selectedFeatures[0].id_).to.equal(1);

                expect(layers).to.be.an('array').that.has.lengthOf(1);
                expect(layers[0].get('title')).to.equal('layer-1');
            });
    });

    it('should have the correct features and layers in the event args when selecting 2 features', () => {
        let selectArgs = [];

        cy.window().then((win) => {
            // @ts-ignore
            win.selectStub = cy.stub().as('selectStub');
        });

        cy.get('vl-map').should('exist');
        cy.get('vl-map-multiselect-actions').should('exist');

        cy.document().then((doc) => {
            const multiselectActions = doc.querySelector('vl-map-multiselect-actions') as VlMapMultiselectActions;
            // Use the stub function here
            // @ts-ignore
            multiselectActions.onSelect((...args) => {
                // @ts-ignore
                window.selectStub(args);
                selectArgs = args;
            });
        });
        cy.wait(1000);
        cy.get('vl-map').click(100, 300);

        // Assertions to verify if the stub was called as expected
        cy.window()
            .its('selectStub')
            .should('have.been.calledOnce')
            .then(() => {
                const [selectedFeatures, event, layers] = selectArgs;

                expect(selectedFeatures).to.be.an('array').that.has.lengthOf(2);
                expect(selectedFeatures[0].id_).to.equal(2);
                expect(selectedFeatures[1].id_).to.equal(1);

                expect(layers).to.be.an('array').that.has.lengthOf(2);
                expect(layers[0].get('title')).to.equal('layer-2');
                expect(layers[1].get('title')).to.equal('layer-1');
            });
    });
});
