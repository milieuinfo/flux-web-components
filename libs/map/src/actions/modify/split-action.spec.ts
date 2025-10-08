// import Map from 'ol/Map';
// import MultiPolygon from 'ol/geom/MultiPolygon';
// import Polygon from 'ol/geom/Polygon';
// import LineString from 'ol/geom/LineString';
// import Feature from 'ol/Feature';
// import { VlSplitAction } from '../../../../../../components/map/actions';

describe('jest - map - split-action', () => {
    // TODO: fix testen en uncomment
    it('TODO: fix testen en uncomment', () => {});

    //     const callbackSpy = sinon.spy();
    //     const optionsSpy = {
    //         filter: sinon.spy(),
    //     };
    //     const feature = new Feature({ id: 1 });
    //     const layer = {
    //         getSource: () => ({
    //             getFeatures: () => [],
    //             getFeatureById: (id) => (id == 1 ? feature : null),
    //         }),
    //     };
    //     const createSplitAction = () => {
    //         const splitAction = new VlSplitAction(layer, callbackSpy, optionsSpy);
    //         splitAction.map = new Map({});
    //         return splitAction;
    //     };
    //     it('zal bij het activeren een select en draw actie toevoegen aan de map en de select interacties activeren', () => {
    //         const splitAction = createSplitAction();
    //         splitAction.map = {
    //             addAction: sinon.spy(),
    //         };
    //         expect(splitAction.interactions).to.be.empty;
    //         expect(splitAction.selectAction.interactions).to.not.be.empty;
    //         splitAction.selectAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.false);
    //         expect(splitAction.drawAction.interactions).to.not.be.empty;
    //         splitAction.drawAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.false);
    //         expect(splitAction.map.addAction.called).to.be.false;
    //         splitAction.activate();
    //         expect(splitAction.map.addAction.called).to.be.true;
    //         expect(splitAction.map.addAction.callCount).to.equal(2);
    //         expect(splitAction.map.addAction.getCall(0).args[0]).to.equal(splitAction.selectAction);
    //         expect(splitAction.map.addAction.getCall(1).args[0]).to.equal(splitAction.drawAction);
    //         expect(splitAction.interactions).to.be.empty;
    //         splitAction.selectAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.true);
    //         splitAction.drawAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.false);
    //     });
    //     it('zal bij het deactiveren zowel de select als draw actie deactiveren', () => {
    //         const splitAction = createSplitAction();
    //         const drawActionStub = sinon.stub(splitAction.drawAction, 'deactivate');
    //         const selectActionStub = sinon.stub(splitAction.selectAction, 'deactivate');
    //         splitAction.deactivate();
    //         expect(drawActionStub.called).to.be.true;
    //         expect(selectActionStub.called).to.be.true;
    //         drawActionStub.reset();
    //         selectActionStub.reset();
    //     });
    //     it('zal na het selecteren de select action deactiveren en de draw action activeren', () => {
    //         const splitAction = createSplitAction();
    //         splitAction.selectAction.map = new Map({});
    //         splitAction.selectAction.selectInteraction.getFeatures().push(feature);
    //         splitAction.selectAction.selectInteraction.dispatchEvent({ type: 'select' });
    //         splitAction.selectAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.false);
    //         splitAction.drawAction.interactions.forEach((interaction) => expect(interaction.getActive()).to.be.true);
    //     });
    //     it('zal na het selecteren en tekenen zal de split callback uitgevoerd worden met de geselecteerde feature en de opgesplitste features', () => {
    //         const splitAction = createSplitAction();
    //         const selectedFeature = {
    //             getGeometry: () => {
    //                 const multiPolygon = new MultiPolygon([]);
    //                 multiPolygon.appendPolygon(
    //                     new Polygon([
    //                         [
    //                             [0, 0],
    //                             [0, 10],
    //                             [10, 10],
    //                             [0, 0],
    //                         ],
    //                     ]),
    //                 );
    //                 return multiPolygon;
    //             },
    //         };
    //         const drawnFeature = {
    //             getGeometry: () =>
    //                 new LineString([
    //                     [0, 5],
    //                     [10, 5],
    //                 ]),
    //         };
    //         splitAction.selectAction.selectedFeature = selectedFeature;
    //         splitAction.drawAction.drawInteraction.dispatchEvent({
    //             type: 'drawend',
    //             feature: drawnFeature,
    //         });
    //         expect(callbackSpy.calledWith(selectedFeature)).to.be.true;
    //         const features = callbackSpy.getCall(0).args[1];
    //         expect(features.length).to.equal(2);
    //         expect(features[0].getGeometry().getCoordinates()).to.deep.equal([
    //             [
    //                 [
    //                     [0, 0],
    //                     [0, 5],
    //                     [5, 5],
    //                     [0, 0],
    //                 ],
    //             ],
    //         ]);
    //         expect(features[1].getGeometry().getCoordinates()).to.deep.equal([
    //             [
    //                 [
    //                     [0, 5],
    //                     [0, 10],
    //                     [10, 10],
    //                     [5, 5],
    //                     [0, 5],
    //                 ],
    //             ],
    //         ]);
    //     });
    //     it('zal na het selecteren en tekenen de laatst geselecteerde feature deselecteren, de map action deactiveren en de select action activeren', (done) => {
    //         const splitAction = createSplitAction();
    //         const clearFeaturesStub = sinon.stub(splitAction.selectAction, 'clearFeatures');
    //         const activateSelectStub = sinon.stub(splitAction.selectAction, 'activate');
    //         const deactivateDrawStub = sinon.stub(splitAction.drawAction, 'deactivate');
    //         const selectedFeature = {
    //             getGeometry: () => {
    //                 const multiPolygon = new MultiPolygon([]);
    //                 multiPolygon.appendPolygon(
    //                     new Polygon([
    //                         [
    //                             [0, 0],
    //                             [0, 10],
    //                             [10, 10],
    //                             [0, 0],
    //                         ],
    //                     ]),
    //                 );
    //                 return multiPolygon;
    //             },
    //         };
    //         const drawnFeature = {
    //             getGeometry: () =>
    //                 new LineString([
    //                     [0, 5],
    //                     [10, 5],
    //                 ]),
    //         };
    //         splitAction.selectAction.selectedFeature = selectedFeature;
    //         splitAction.drawAction.drawInteraction.dispatchEvent({
    //             type: 'drawend',
    //             feature: drawnFeature,
    //         });
    //         setTimeout(() => {
    //             expect(clearFeaturesStub.called).to.be.true;
    //             expect(deactivateDrawStub.called).to.be.true;
    //             expect(activateSelectStub.called).to.be.true;
    //             clearFeaturesStub.reset();
    //             activateSelectStub.reset();
    //             deactivateDrawStub.reset();
    //             done();
    //         });
    //     });
});
