import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlWMTSSource from 'ol/source/WMTS';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import { VlMap } from '../../../vl-map';
import { VlMapWmtsLayer } from './vl-map-wmts-layer';

registerWebComponents([VlMap, VlMapWmtsLayer]);

const wmtsLayerFixture = html`
    <vl-map>
        <vl-map-wmts-layer
            data-vl-url="https://geo.api.vlaanderen.be/GRB/wmts"
            data-vl-layer="grb_sel"
            data-vl-name="GRB Wegenkaart"
            data-vl-min-resolution="2"
            data-vl-max-resolution="4"
        >
        </vl-map-wmts-layer>
    </vl-map>
`;

const wmtsLayerWithDifferentMatrixSetFixture = html`
    <vl-map>
        <vl-map-wmts-layer
            data-vl-url="https://geo.api.vlaanderen.be/GRB/wmts"
            data-vl-layer="grb_sel"
            data-vl-name="GRB Wegenkaart"
            data-vl-min-resolution="2"
            data-vl-max-resolution="4"
            data-vl-matrix-set="MOCKMATRIX"
            data-vl-matrix-prefix
        >
        </vl-map-wmts-layer>
    </vl-map>
`;

const wmtsLayerHiddenFixture = html`
    <vl-map>
        <vl-map-wmts-layer
            data-vl-url="https://geo.api.vlaanderen.be/GRB/wmts"
            data-vl-layer="grb_sel"
            data-vl-name="GRB Wegenkaart"
            data-vl-min-resolution="2"
            data-vl-max-resolution="4"
            data-vl-hidden
        >
        </vl-map-wmts-layer>
    </vl-map>
`;

const mapFixture = html` <vl-map></vl-map> `;

const getLayer = (map) => map.querySelector('[data-vl-is-layer]');

describe('vl-map-wmts-layer', () => {
    it('de wmts source wordt correct geconfigureerd', () => {
        cy.mount(wmtsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = vlMap.map.getOverlayLayers();
                expect(layers).to.be.lengthOf(1);
                const layer = layers[0];
                const source = layer.getSource();
                expect(source).to.be.instanceof(OlWMTSSource);
                expect(source.urls).to.be.lengthOf(1);
                expect(source.urls[0]).to.be.equal('https://geo.api.vlaanderen.be/GRB/wmts');
                expect(source.getLayer()).to.be.equal('grb_sel');
                expect(source.getMatrixSet()).to.be.equal('BPL72VL');
                expect(source.getFormat()).to.be.equal('image/png');
                expect(JSON.stringify(source.getProjection())).to.be.equal(JSON.stringify(vlMap._projection));
                expect(source.getStyle()).to.be.equal('');
                const tileGrid = source.getTileGrid();
                expect(tileGrid).to.be.instanceof(OlWMTSTileGrid);
                expect(tileGrid.getOrigin()).to.deep.equal([9928, 329072]);
                expect(tileGrid.getResolutions()).to.deep.equal([
                    1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125,
                ]);
                expect(tileGrid.getMatrixIds()).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
            });
        });
    });

    it('de matrix configuratie wordt gerespecteerd', () => {
        cy.mount(wmtsLayerWithDifferentMatrixSetFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = vlMap.map.getOverlayLayers();
                expect(layers).to.be.lengthOf(1);
                const layer = layers[0];
                const source = layer.getSource();
                expect(source).to.be.instanceof(OlWMTSSource);
                expect(source.getMatrixSet()).to.be.equal('MOCKMATRIX');
            });
        });
    });

    it('de matrixset wordt geprefixed indien meegegeven', () => {
        cy.mount(wmtsLayerWithDifferentMatrixSetFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = vlMap.map.getOverlayLayers();
                expect(layers).to.be.lengthOf(1);
                const layer = layers[0];
                const source = layer.getSource();
                const tileGrid = source.getTileGrid();
                expect(tileGrid.getMatrixIds()).to.deep.equal([
                    'MOCKMATRIX:0',
                    'MOCKMATRIX:1',
                    'MOCKMATRIX:2',
                    'MOCKMATRIX:3',
                    'MOCKMATRIX:4',
                    'MOCKMATRIX:5',
                    'MOCKMATRIX:6',
                    'MOCKMATRIX:7',
                    'MOCKMATRIX:8',
                    'MOCKMATRIX:9',
                    'MOCKMATRIX:10',
                    'MOCKMATRIX:11',
                    'MOCKMATRIX:12',
                    'MOCKMATRIX:13',
                    'MOCKMATRIX:14',
                    'MOCKMATRIX:15',
                ]);
            });
        });
    });

    it('de kaartlaag zal pas angemaakt worden na constructie zodat op moment van constructie nog niet al de attributen gekend moeten zijn', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const layer = document.createElement('vl-map-wmts-layer');
            layer.setAttribute('data-vl-url', 'https://geo.api.vlaanderen.be/GRB/wmts');
            layer.setAttribute('data-vl-layer', 'grb_sel');
            layer.setAttribute('data-vl-name', 'GRB Wegenkaart');
            layer.setAttribute('data-vl-min-resolution', '2');
            layer.setAttribute('data-vl-max-resolution', '4');
            expect(layer['source']).is.undefined;
            expect(layer['layer']).is.undefined;
            vlMap.appendChild(layer);
            expect(layer['source']).to.exist;
            expect(layer['layer']).to.exist;
        });
    });

    it('de kaartlaag is bij creatie zichtbaar', () => {
        cy.mount(wmtsLayerFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            expect(getLayer(vlMap).layer.getVisible()).to.be.true;
        });
    });

    it('met data-vl-hidden is de kaartlaag bij creatie verborgen', () => {
        cy.mount(wmtsLayerHiddenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            expect(getLayer(vlMap).layer.getVisible()).to.be.false;
        });
    });
});
