import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapImageWmsLayer } from './vl-map-image-wms-layer/vl-map-image-wms-layer';
import { VlMapTiledWmsLayer } from './vl-map-tiled-wms-layer/vl-map-tiled-wms-layer';
import { VlMapWmsStyle } from './vl-map-wms-style/vl-map-wms-style';

registerWebComponents([VlMap, VlMapWmsStyle, VlMapImageWmsLayer, VlMapTiledWmsLayer]);

const mapFixture = html` <vl-map></vl-map> `;

const wmsLayersFixture = html`
    <vl-map>
        <vl-map-image-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2"></vl-map-image-wms-layer>
        <vl-map-tiled-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2"></vl-map-tiled-wms-layer>
    </vl-map>
`;

const wmsLayersHiddenFixture = html`
    <vl-map>
        <vl-map-image-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2" data-vl-hidden>
        </vl-map-image-wms-layer>
        <vl-map-tiled-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2" data-vl-hidden>
        </vl-map-tiled-wms-layer>
    </vl-map>
`;

const wmsLayersSldFixture = html`
    <vl-map>
        <vl-map-image-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2">
            <vl-map-wms-style
                data-vl-sld='
            <StyledLayerDescriptor>
              <NamedLayer>
                <Name>ns:laagnaam</Name>
                <UserStyle>
                  <FeatureTypeStyle>
                    <Rule>
                      <RasterSymbolizer>
                        <ColorMap type="values">
                          <ColorMapEntry color="#800080" quantity="10.0"/>
                          <ColorMapEntry color="#FFFFFF" quantity="100.0"/>
                          <ColorMapEntry color="#FFFFFF" quantity="1000.0"/>
                        </ColorMap>
                      </RasterSymbolizer>
                    </Rule>
                  </FeatureTypeStyle>
                </UserStyle>
              </NamedLayer>
            </StyledLayerDescriptor>'
            >
            </vl-map-wms-style>
        </vl-map-image-wms-layer>
        <vl-map-tiled-wms-layer data-vl-url="http://dummy/wms" data-vl-layers="layer1,layer2">
            <vl-map-wms-style
                data-vl-sld='
            <StyledLayerDescriptor>
              <NamedLayer>
                <Name>ns:laagnaam</Name>
                <UserStyle>
                  <FeatureTypeStyle>
                    <Rule>
                      <RasterSymbolizer>
                        <ColorMap type="values">
                          <ColorMapEntry color="#800080" quantity="10.0"/>
                          <ColorMapEntry color="#FFFFFF" quantity="100.0"/>
                          <ColorMapEntry color="#FFFFFF" quantity="1000.0"/>
                        </ColorMap>
                      </RasterSymbolizer>
                    </Rule>
                  </FeatureTypeStyle>
                </UserStyle>
              </NamedLayer>
            </StyledLayerDescriptor>'
            >
            </vl-map-wms-style>
        </vl-map-tiled-wms-layer>
    </vl-map>
`;

const getLayers = (map) => Array.from(map.querySelectorAll('[data-vl-is-layer]'));

describe('vl-map-wms-layer', () => {
    it('de kaartlaag zal pas aangemaakt worden na constructie zodat op moment van constructie nog niet al de attributen gekend moeten zijn', () => {
        const types = ['image', 'tiled'];
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                types.map((type) => {
                    const layer: any = document.createElement(`vl-map-${type}-wms-layer`);
                    layer.setAttribute('data-vl-url', 'http://dummy/wms-adjusted');
                    layer.setAttribute('data-vl-layers', 'layer1');
                    layer.setAttribute('data-vl-styles', 'style1,style2');
                    layer.setAttribute('data-vl-version', '1.1.1');
                    layer.setAttribute('data-vl-opacity', '0.75');
                    layer.setAttribute('data-vl-min-resolution', '10');
                    layer.setAttribute('data-vl-max-resolution', '1000');
                    layer.setAttribute('data-vl-name', 'adjusted');
                    expect(layer.source).to.be.undefined;
                    expect(layer.layer).to.be.undefined;
                    vlMap.appendChild(layer);
                    // pas in de volgende event loop verder gaan
                    cy.wait(0).then(() => {
                        expect(layer.source).to.exist;
                        expect(layer.layer).to.exist;
                    });
                });
                expect(vlMap.map.getLayers().getLength()).is.equal(2);
            });
        });
    });

    it('de kaartlagen zijn bij creatie zichtbaar', () => {
        cy.mount(wmsLayersFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = getLayers(vlMap);
                expect(layers).to.be.lengthOf(2);
                layers.forEach((element: any) => expect(element.layer.getVisible()).is.true);
            });
        });
    });

    it('de kaartlagen kunnen bij creatie verborgen worden', () => {
        cy.mount(wmsLayersHiddenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = getLayers(vlMap);
                expect(layers).to.be.lengthOf(2);
                layers.forEach((element: any) => expect(element.layer.getVisible()).is.false);
            });
        });
    });

    it('de kaartlaag kan een sld body bevatten die overeenkomt met het data-vl-sld attribuut van de onderliggende vl-map-wms-style', () => {
        cy.mount(wmsLayersSldFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layers = getLayers(vlMap);
                expect(layers).to.be.lengthOf(2);
                layers.forEach((element: any) => {
                    expect(element.source.getParams().SLD_BODY).to.include('StyledLayerDescriptor');
                    expect(element.source.getParams().SLD_BODY).to.equal(
                        element.querySelector(':scope > vl-map-wms-style').getAttribute('data-vl-sld')
                    );
                });
            });
        });
    });
});
