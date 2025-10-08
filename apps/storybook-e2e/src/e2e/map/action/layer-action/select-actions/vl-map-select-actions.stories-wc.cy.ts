import { VlMapSelectActions, VlSelectActions } from '@domg-wc/map';

const mapSelectActionsUrl =
    'http://localhost:8080/iframe.html?id=map-action-layer-action-select-action-select-actions--map-select-actions-default&viewMode=story';
const mapSelectActionsClusteringUrl =
    'http://localhost:8080/iframe.html?id=map-action-layer-action-select-action-select-actions--map-select-actions-clustering&viewMode=story';

describe('cypress-e2e - map - vl-map-select-actions - wc default story', () => {
    it('should contain 2 layers', () => {
        cy.visit(mapSelectActionsUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            expect(selectActions.olLayers).to.have.length(2);
        });
    });

    it('should define an action', () => {
        cy.visit(mapSelectActionsUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            assert.isDefined(selectActions._action);
            assert.isNotNull(selectActions._action);
        });
    });

    it('should select and unselect features', () => {
        cy.visit(mapSelectActionsUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            const feature1 = selectActions.olLayers[0].getSource().getFeatures()[0];
            const feature2 = selectActions.olLayers[1].getSource().getFeatures()[0];
            const feature3 = selectActions.olLayers[1].getSource().getFeatures()[1];
            const selectedFeatures = (selectActions._action as VlSelectActions).selectInteraction
                .getFeatures()
                .getArray();

            selectActions.select(feature1);
            selectActions.select(feature2);

            expect(selectedFeatures.indexOf(feature1)).to.not.equal(-1);
            expect(selectedFeatures.indexOf(feature2)).to.not.equal(-1);
            expect(selectedFeatures.indexOf(feature3)).to.equal(-1);

            selectActions.reset();

            expect(selectedFeatures.indexOf(feature1)).to.equal(-1);
            expect(selectedFeatures.indexOf(feature2)).to.equal(-1);
            expect(selectedFeatures.indexOf(feature3)).to.equal(-1);
        });
    });

    it('should mark and unmark features', () => {
        cy.visit(mapSelectActionsUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            const layer1 = selectActions.olLayers[0];
            const layer2 = selectActions.olLayers[1];
            const feature1 = layer1.getSource().getFeatures()[0];
            const feature2 = layer2.getSource().getFeatures()[0];
            const feature3 = layer2.getSource().getFeatures()[1];
            const markedFeatures = (selectActions._action as VlSelectActions).markInteraction.getFeatures().getArray();

            selectActions.mark(feature1.getId(), layer1);
            selectActions.mark(feature2.getId(), layer2);

            expect(markedFeatures.indexOf(feature1)).to.not.equal(-1);
            expect(markedFeatures.indexOf(feature2)).to.not.equal(-1);
            expect(markedFeatures.indexOf(feature3)).to.equal(-1);

            selectActions.reset();

            expect(markedFeatures.indexOf(feature1)).to.equal(-1);
            expect(markedFeatures.indexOf(feature2)).to.equal(-1);
            expect(markedFeatures.indexOf(feature3)).to.equal(-1);

            selectActions.mark(feature1.getId(), layer1);
            selectActions.mark(feature2.getId(), layer2);

            expect(markedFeatures.indexOf(feature1)).to.not.equal(-1);
            expect(markedFeatures.indexOf(feature2)).to.not.equal(-1);
            expect(markedFeatures.indexOf(feature3)).to.equal(-1);

            selectActions.removeMarks();

            expect(markedFeatures.indexOf(feature1)).to.equal(-1);
            expect(markedFeatures.indexOf(feature2)).to.equal(-1);
            expect(markedFeatures.indexOf(feature3)).to.equal(-1);
        });
    });
});

describe('cypress-e2e - map - vl-map-select-actions - wc clustering story', () => {
    it('should contain 2 layers', () => {
        cy.visit(mapSelectActionsClusteringUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            expect(selectActions.olLayers).to.have.length(2);
        });
    });

    it('should define an action', () => {
        cy.visit(mapSelectActionsClusteringUrl);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            assert.isDefined(selectActions._action);
            assert.isNotNull(selectActions._action);
        });
    });

    it('should select and unselect clustered features', () => {
        cy.visit(mapSelectActionsClusteringUrl);

        // Wachten op het clusteren van de features door OL.
        cy.wait(100);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            const feature1 = selectActions.olLayers[0].getSource().getFeatures()[0];
            const cluster1 = selectActions.olLayers[1].getSource().getFeatures()[0];
            const clusteredFeature1 = cluster1.get('features')[0];
            const clusteredFeature2 = cluster1.get('features')[1];
            const selectedFeatures = (selectActions._action as VlSelectActions).selectInteraction
                .getFeatures()
                .getArray();

            selectActions.select(feature1);
            selectActions.select(clusteredFeature1);

            expect(selectedFeatures.indexOf(feature1)).to.not.equal(-1);
            expect(selectedFeatures.indexOf(clusteredFeature1)).to.not.equal(-1);
            expect(selectedFeatures.indexOf(clusteredFeature2)).to.equal(-1);

            selectActions.reset();

            expect(selectedFeatures.indexOf(feature1)).to.equal(-1);
            expect(selectedFeatures.indexOf(clusteredFeature1)).to.equal(-1);
            expect(selectedFeatures.indexOf(clusteredFeature2)).to.equal(-1);
        });
    });

    it('should select and unselect clusters', () => {
        cy.visit(mapSelectActionsClusteringUrl);

        // Wachten op het clusteren van de features door OL.
        cy.wait(100);

        cy.runTestFor<VlMapSelectActions>('vl-map-select-actions', (selectActions) => {
            const cluster1 = selectActions.olLayers[1].getSource().getFeatures()[0];
            const selectedFeatures = (selectActions._action as VlSelectActions).selectInteraction
                .getFeatures()
                .getArray();

            selectActions.select(cluster1);

            expect(selectedFeatures.indexOf(cluster1)).to.not.equal(-1);

            selectActions.reset();

            expect(selectedFeatures.indexOf(cluster1)).to.equal(-1);
        });
    });
});
