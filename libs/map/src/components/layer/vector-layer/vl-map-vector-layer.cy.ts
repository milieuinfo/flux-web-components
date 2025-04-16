import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlStyleFill from 'ol/style/Fill';
import OlStyle from 'ol/style/Style';
import { VlMap } from '../../../vl-map';
import { VlMapLayerStyle } from '../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from './vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from './vl-map-wfs-layer/vl-map-wfs-layer';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapLayerStyle, VlMapWfsLayer]);

const featuresLayerFixture = html`
    <vl-map>
        <vl-map-features-layer
            data-vl-name="testlaag"
            data-vl-min-resolution="2"
            data-vl-max-resolution="4"
            data-vl-features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}]}'
        >
        </vl-map-features-layer>
        <vl-map-layer-style data-vl-color="rgba(255,0,0,1)"></vl-map-layer-style>
    </vl-map>
`;

const featuresLayerHiddenFixture = html`
    <vl-map>
        <vl-map-features-layer data-vl-hidden></vl-map-features-layer>
    </vl-map>
`;

const wfsLayerFixture = html`
    <vl-map>
        <vl-map-wfs-layer data-vl-name="foobar" data-vl-url="http://dummy/wfs" data-vl-layers="layer1,layer2">
        </vl-map-wfs-layer>
        <vl-map-layer-style data-vl-color="rgba(255,0,0,1)"></vl-map-layer-style>
    </vl-map>
`;

const wfsLayerHiddenFixture = html`
    <vl-map>
        <vl-map-wfs-layer data-vl-hidden></vl-map-wfs-layer>
    </vl-map>
`;

const getLayer = (map) => {
    return map.querySelector('[data-vl-is-layer]');
};

// eens herbekijken, zijn allemaal rare testen
describe('vl-map-vector-layer', () => {
    it('de stijl kan op de features-layer gezet worden met een VlMapLayerStyle object', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                layer.style = vlMap.querySelector('vl-map-layer-style');
                const style = layer.style()[0];
                expect(style.getFill().getColor()).to.be.equal('rgba(255,0,0,1)');
                expect(style.getStroke().getColor()).to.be.equal('rgba(2, 85, 204, 1)');
            });
        });
    });

    it('de stijl kan op de wfs-layer gezet worden met een VlMapLayerStyle object', () => {
        cy.mount(wfsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                layer.style = vlMap.querySelector('vl-map-layer-style');
                const style = layer.style()[0];
                expect(style.getFill().getColor()).to.be.equal('rgba(255,0,0,1)');
                expect(style.getStroke().getColor()).to.be.equal('rgba(2, 85, 204, 1)');
            });
        });
    });

    it('de stijl kan op de features-layer gezet worden met een VlMapLayerStyle object', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                const color = vlMap.querySelector('vl-map-layer-style').getAttribute('data-vl-color');
                layer.style = new OlStyle({ fill: new OlStyleFill({ color: color }) });
                expect(layer.style.getFill().getColor()).to.be.equal(color);
            });
        });
    });

    it('de stijl kan op de wfs-layer gezet worden met een VlMapLayerStyle object', () => {
        cy.mount(wfsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                const color = vlMap.querySelector('vl-map-layer-style').getAttribute('data-vl-color');
                layer.style = new OlStyle({ fill: new OlStyleFill({ color: color }) });
                expect(layer.style.getFill().getColor()).to.be.equal(color);
            });
        });
    });

    // behouden wc-test - lijkt mij niet zo zinvol
    it('de stijl kan op de features-layer verwijderd worden met null', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                const color = vlMap.querySelector('vl-map-layer-style').getAttribute('data-vl-color');
                layer.style = new OlStyle({ fill: new OlStyleFill({ color: color }) });
                expect(getLayer(vlMap).style).is.not.null;
                layer.style = null;
                expect(getLayer(vlMap).style).is.null;
            });
        });
    });

    // behouden wc-test - lijkt mij niet zo zinvol
    it('de stijl kan op de wfs-layer verwijderd worden met null', () => {
        cy.mount(wfsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                const color = vlMap.querySelector('vl-map-layer-style').getAttribute('data-vl-color');
                layer.style = new OlStyle({ fill: new OlStyleFill({ color: color }) });
                expect(getLayer(vlMap).style).is.not.null;
                layer.style = null;
                expect(getLayer(vlMap).style).is.null;
            });
        });
    });

    it('de feature-layer is bij creatie zichtbaar', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(getLayer(vlMap).layer.getVisible()).is.true;
            });
        });
    });

    it('met data-vl-hidden is de features-layer bij creatie verborgen', () => {
        cy.mount(featuresLayerHiddenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(getLayer(vlMap).layer.getVisible()).is.false;
            });
        });
    });

    it('de feature-layer is bij creatie zichtbaar', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(getLayer(vlMap).layer.getVisible()).is.true;
            });
        });
    });

    it('met data-vl-hidden is de wfs-layer bij creatie verborgen', () => {
        cy.mount(wfsLayerHiddenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(getLayer(vlMap).layer.getVisible()).is.false;
            });
        });
    });

    it('er wordt een event gegooid als de stijl verandert', () => {
        cy.mount(wfsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layer = getLayer(vlMap);
                layer.addEventListener('style-changed', cy.stub().as('styleChange'));
                layer.style = new OlStyle({});
                cy.get('@styleChange').should('have.been.calledOnce');
            });
        });
    });
});
