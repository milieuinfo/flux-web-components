import { VlShowInfoAction } from './show-info-action';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

describe('show info action', () => {
    let map;
    let showInfoAction;
    let feature;
    let source;
    let mapWasRerendered;

    const waitFor = (done, callback) => {
        if (done() && callback) {
            callback();
        } else {
            window.setTimeout(() => {
                waitFor(done, callback);
            }, 50);
        }
    };

    beforeEach(() => {
        mapWasRerendered = false;
        source = new VectorSource();
        const infoPromise = () => ({
            then: (callback) => callback('content of info object'),
        });
        map = {
            overlays: [],
            addOverlay(overlay) {
                this.overlays.push(overlay);
            },
            removeOverlay(overlay) {
                this.overlays.splice(this.overlays.indexOf(overlay), 1);
            },
            render: () => {
                mapWasRerendered = true;
            },
        };
        feature = new Feature();
        feature.setGeometry(new Point([0, 0]));
        showInfoAction = new VlShowInfoAction(
            {
                getSource: () => source,
            },
            infoPromise,
            'loading message'
        );
        showInfoAction.map = map;
    });

    it('zet een overlay op de map wanneer punt getekend werd, met daarin inhoud van de promise', (done) => {
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        const contentShown = () =>
            map.overlays.length === 1 &&
            map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>';
        waitFor(contentShown, () => {
            expect(map.overlays[0].getPosition()).toEqual([0, 0]);
            done();
        });
    });

    it('er wordt een loading message getoond als de promise er lang over doet om zijn resultaat te resolven', (done) => {
        const infoPromise = () => ({
            then: (callback) => setTimeout(() => callback('content of info object'), 600),
        });
        showInfoAction = new VlShowInfoAction(
            {
                getSource: () => new VectorSource({}),
            },
            infoPromise,
            'loading message'
        );
        showInfoAction.map = map;
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        const loadingShown = () =>
            map.overlays.length === 1 &&
            map.overlays[0].getElement().innerHTML ===
                '<span class="content"><span class="icon"></span> loading message</span><div class="arrow"></div>';
        const contentShown = () =>
            map.overlays.length === 1 &&
            map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>';
        waitFor(loadingShown, () => {
            waitFor(contentShown, () => {
                expect(mapWasRerendered).toBe(true);
                done();
            });
        });
    });

    it('overlays worden verwijderd als de interactie gedeactiveerd wordt', (done) => {
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        source.addFeature(feature);
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        const contentShown = () => map.overlays.length === 2 && source.getFeatures().length > 0;
        waitFor(contentShown, () => {
            showInfoAction.deactivate();
            expect(map.overlays.length).toBe(0);
            expect(source.getFeatures().length).toBe(0);
            done();
        });
    });

    it('een default offset van [0, -10] wordt gebruikt wanneer er geen offset wordt meegegeven', (done) => {
        const infoPromise = () => ({
            then(callback) {
                setTimeout(() => {
                    callback('content of info object');
                }, 600);
            },
        });
        showInfoAction = new VlShowInfoAction(
            {
                getSource: () => new VectorSource({}),
            },
            infoPromise,
            'loading message'
        );
        showInfoAction.map = map;
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        const contentShown = () =>
            map.overlays.length === 1 &&
            map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>' &&
            map.overlays[0].getOffset().length === 2 &&
            map.overlays[0].getOffset()[0] === 0 &&
            map.overlays[0].getOffset()[1] === -10;
        waitFor(contentShown, () => done());
    });

    it('een meegegeven offset wordt gebruikt', (done) => {
        const infoPromise = () => ({
            then: (callback) => setTimeout(() => callback('content of info object'), 600),
        });
        showInfoAction = new VlShowInfoAction(
            {
                getSource: () => new VectorSource({}),
            },
            infoPromise,
            'loading message',
            { offset: [0, 0] }
        );
        showInfoAction.map = map;
        showInfoAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature,
        });
        const contentShown = () =>
            map.overlays.length === 1 &&
            map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>' &&
            map.overlays[0].getOffset().length === 2 &&
            map.overlays[0].getOffset()[0] === 0 &&
            map.overlays[0].getOffset()[1] === 0;
        waitFor(contentShown, () => done());
    });
});
