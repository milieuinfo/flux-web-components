import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlVectorSource from 'ol/source/Vector';
import OlWMTSSource from 'ol/source/WMTS';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayer } from './vl-map-base-layer';

registerWebComponents([VlMap, VlMapBaseLayer]);

const baselayerFixture = html`
    <vl-map>
        <vl-map-baselayer
            data-vl-url="https://localhost"
            data-vl-layer="layername_1"
            data-vl-title="layer title 1"
        ></vl-map-baselayer>
    </vl-map>
`;

const baselayerWmtsFixture = html`
    <vl-map>
        <vl-map-baselayer
            data-vl-url="https://localhost/wmts"
            data-vl-layer="layername_2"
            data-vl-type="wmts"
            data-vl-title="layer title 2"
        ></vl-map-baselayer>
    </vl-map>
`;

const baselayerWfsFixture = html`
    <vl-map>
        <vl-map-baselayer
            data-vl-url="https://localhost/wfs"
            data-vl-layer="layername_3"
            data-vl-type="wfs"
            data-vl-title="layer title 3"
        ></vl-map-baselayer>
    </vl-map>
`;

describe('vl-map-baselayer', () => {
    const assertLayerProperties = (element, url, typeLayer, layerName, title) => {
        expect(element.url).to.be.equal(url);
        expect(element.type).to.be.equal(typeLayer);
        expect(element.layer).to.be.equal(layerName);
        expect(element.title).to.be.equal(title);
    };

    it('de basiskaartlaag wordt goed geconfigureerd wanneer de type-layer niet gezet is', () => {
        cy.mount(baselayerFixture);
        cy.runTestFor<VlMapBaseLayer>('vl-map-baselayer', (vlMapBaseLayer) => {
            assertLayerProperties(vlMapBaseLayer, 'https://localhost', 'wmts', 'layername_1', 'layer title 1');
        });
    });

    it('de basiskaartlaag wordt goed geconfigureerd wanneer de type-layer van het type wmts is', () => {
        cy.mount(baselayerWmtsFixture);
        cy.runTestFor<VlMapBaseLayer>('vl-map-baselayer', (vlMapBaseLayer) => {
            assertLayerProperties(vlMapBaseLayer, 'https://localhost/wmts', 'wmts', 'layername_2', 'layer title 2');
        });
    });

    it('de basiskaartlaag wordt goed geconfigureerd wanneer de type-layer van het type wfs is', () => {
        cy.mount(baselayerWfsFixture);
        cy.runTestFor<VlMapBaseLayer>('vl-map-baselayer', (vlMapBaseLayer) => {
            assertLayerProperties(vlMapBaseLayer, 'https://localhost/wfs', 'wfs', 'layername_3', 'layer title 3');
        });
    });

    it('wanneer een wmts source wordt aangemaakt wordt een WMTS source teruggegeven', () => {
        cy.mount(baselayerWmtsFixture);
        cy.runTestFor<VlMapBaseLayer>('vl-map-baselayer', (vlMapBaseLayer) => {
            const source = vlMapBaseLayer._createWMTSSource();
            expect(source).to.be.instanceof(OlWMTSSource);
            expect((source as any).urls).to.be.lengthOf(1);
            expect((source as any).urls[0]).to.be.equal('https://localhost/wmts');
            expect(source.getLayer()).to.be.equal('layername_2');
            expect(source.getMatrixSet()).to.be.equal('BPL72VL');
            expect(source.getFormat()).to.be.equal('image/png');
            expect(JSON.stringify(source.getProjection())).to.be.equal(JSON.stringify(vlMapBaseLayer._projection));
            expect(source.getStyle()).to.be.equal('');
            const tileGrid = source.getTileGrid();
            expect(tileGrid).to.be.instanceof(OlWMTSTileGrid);
            expect((tileGrid as any).getOrigin()).to.deep.equal([9928, 329072]);
            expect(tileGrid.getResolutions()).to.deep.equal([
                1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125,
            ]);
            expect((tileGrid as any).getMatrixIds()).to.deep.equal([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            ]);
        });
    });

    it('wanneer een WFS source wordt aangemaakt wordt een Vector source teruggegeven', () => {
        cy.mount(baselayerWfsFixture);
        cy.runTestFor<VlMapBaseLayer>('vl-map-baselayer', (vlMapBaseLayer) => {
            const source = vlMapBaseLayer._createVectorSource();
            expect(source).to.be.instanceof(OlVectorSource);
        });
    });

    it('een WMTS source wordt maar 1x aangemaakt', () => {
        cy.mount(baselayerWmtsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            expect(vlMap.map.baseLayers).to.be.length(1);
        });
    });

    it('een WFS source wordt maar 1x aangemaakt', () => {
        cy.mount(baselayerWfsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            expect(vlMap.map.baseLayers).to.be.length(1);
        });
    });
});
