import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayerGRBGray } from '../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapLayerCircleStyle } from '../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import { VlMapLayerStyle } from '../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapLegend } from './vl-map-legend';
import { LEGEND_PLACEMENT } from './vl-map-legend.defaults';

registerWebComponents([
    VlMapLegend,
    VlMap,
    VlMapWfsLayer,
    VlMapBaseLayerGRBGray,
    VlMapLayerCircleStyle,
    VlMapLayerStyle,
    VlMapFeaturesLayer,
]);

describe('cypress-component - map - vl-map-legend - single features layer', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Shapes"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"styleId":"style-1"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[141000,200908]},"properties":{"styleId":"style-2"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{"styleId":"style-3"}}]}'
                    projection-code="EPSG:31370"
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
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-legend');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-legend');
    });

    it('should contain a title', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div > span.flux-map-legend-text.flux-map-legend-title')
            .contains('Legende');
    });

    it('should contain the correct style items with an icon and name', () => {
        const expectedTexts = ['Openbaar onderzoek', 'Beslissing', 'Wateroppervlaktes'];

        cy.get('vl-map-legend')
            .shadow()
            .find(
                'div.flux-map-legend > div.flux-map-legend-item > div.flux-map-legend-icon-container > div.flux-map-legend-icon'
            )
            .its('length')
            .should('eq', 3);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item > span.flux-map-legend-text')
            .each((divElement, index) => {
                cy.wrap(divElement).should('have.text', expectedTexts[index]);
            });
    });

    it('should set the correct position with top, bottom, left, right attributes', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'right', '12px')
            .should('have.css', 'bottom', '10px');

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'bottom', '10px')
            .should('have.css', 'right', '12px');

        cy.get('vl-map-legend').invoke('attr', 'right', '10px');
        cy.get('vl-map-legend').invoke('attr', 'top', '20px');
        cy.get('vl-map-legend').invoke('attr', 'left', '30px');
        cy.get('vl-map-legend').invoke('attr', 'bottom', '40px');

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'right', '10px')
            .should('have.css', 'top', '20px')
            .should('have.css', 'left', '30px')
            .should('have.css', 'bottom', '40px');
    });

    it('should set the correct position with the placement attribute', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'right', '12px')
            .should('have.css', 'bottom', '10px');

        cy.get('vl-map-legend').invoke('removeAttr', 'right');
        cy.get('vl-map-legend').invoke('removeAttr', 'bottom');

        cy.get('vl-map-legend').invoke('attr', 'placement', LEGEND_PLACEMENT.BOTTOM_LEFT);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'left', '8px')
            .should('have.css', 'bottom', '40px');

        cy.get('vl-map-legend').invoke('attr', 'placement', LEGEND_PLACEMENT.BOTTOM_RIGHT);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'right', '58px')
            .should('have.css', 'bottom', '10px');

        cy.get('vl-map-legend').invoke('attr', 'placement', LEGEND_PLACEMENT.TOP_LEFT);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'left', '10px')
            .should('have.css', 'top', '10px');

        cy.get('vl-map-legend').invoke('attr', 'placement', LEGEND_PLACEMENT.TOP_RIGHT);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend')
            .should('have.css', 'top', '10px')
            .should('have.css', 'right', '10px');
    });

    it('should display the legend items vertically when the layout-vertical attribute is set', () => {
        cy.get('vl-map-legend').shadow().find('div.flux-map-legend').should('have.css', 'flex-direction', 'row');

        cy.get('vl-map-legend').invoke('attr', 'layout-vertical', 'true');

        cy.get('vl-map-legend').shadow().find('div.flux-map-legend').should('have.css', 'flex-direction', 'column');
    });

    it('should be able to hide the title', () => {
        cy.get('vl-map-legend').invoke('attr', 'hide-title', 'true');
        cy.get('vl-map-legend').should(($el) => {
            expect($el.attr('hide-title')).to.equal('true');
        });

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div > span.flux-map-legend-text.flux-map-legend-title')
            .should('not.exist');
    });
});

describe('cypress-component - map - vl-map-legend - multiple features layers', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Openbare onderzoeken"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":{"featureCharacter":"O","zIndex":"1"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[147075,197908]},"properties":{"featureCharacter":"O","zIndex":"2"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[147095,197908]},"properties":{"featureCharacter":"O","zIndex":"3"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[147105,197908]},"properties":{"featureCharacter":"O","zIndex":"4"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[147106,197908]},"properties":{"featureCharacter":"O","zIndex":"5"}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-circle-style
                        color="#ffe615"
                        size="10"
                        border-color="#000"
                        border-size="1"
                        text-feature-attribute-name="featureCharacter"
                        text-size="bold 14px"
                    ></vl-map-layer-circle-style>
                </vl-map-features-layer>
                <vl-map-features-layer
                    name="Beslissingen"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[141000,200908]},"properties":{"featureCharacter":"B","zIndex":"5"}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-circle-style
                        color="red"
                        size="10"
                        border-color="#000"
                        text-feature-attribute-name="featureCharacter"
                        border-size="1"
                        text-size="bold 14px"
                    ></vl-map-layer-circle-style>
                </vl-map-features-layer>
                <vl-map-features-layer
                    name="Wateroppervlaktes"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"featureCharacter":"W","zIndex":"5"}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-circle-style
                        color="green"
                        size="10"
                        border-color="#000"
                        text-feature-attribute-name="featureCharacter"
                        border-size="1"
                        text-size="bold 14px"
                    ></vl-map-layer-circle-style>
                </vl-map-features-layer>
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-legend');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-legend');
    });

    it('should contain a title', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div > span.flux-map-legend-text.flux-map-legend-title')
            .contains('Legende');
    });

    it('should contain the correct style items with an icon and name', () => {
        const expectedTexts = ['Openbare onderzoeken', 'Beslissingen', 'Wateroppervlaktes'];

        cy.get('vl-map-legend')
            .shadow()
            .find(
                'div.flux-map-legend > div.flux-map-legend-item > div.flux-map-legend-icon-container > div.flux-map-legend-icon'
            )
            .its('length')
            .should('eq', 3);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item > span.flux-map-legend-text')
            .each((divElement, index) => {
                cy.wrap(divElement).should('have.text', expectedTexts[index]);
            });
    });
});

describe('cypress-component - map - vl-map-legend - wfs layer', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-wfs-layer
                    name="Oppervlaktewaterlichamen"
                    url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                    layers="owl_l"
                    max-resolution="8"
                >
                    <vl-map-layer-circle-style
                        color="#ffe615"
                        size="5"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-circle-style>
                </vl-map-wfs-layer>
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-legend');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-legend');
    });

    it('should contain a title', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div > span.flux-map-legend-text.flux-map-legend-title')
            .contains('Legende');
    });

    it('should contain the correct style item with an icon and name', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find(
                'div.flux-map-legend > div.flux-map-legend-item > div.flux-map-legend-icon-container > div.flux-map-legend-icon'
            )
            .should(
                'have.attr',
                'style',
                'border: 1px solid #000; color:#FFF; background-color:#ffe615; border-radius: 50%;'
            )
            .its('length')
            .should('eq', 1);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item > span.flux-map-legend-text')
            .contains('Oppervlaktewaterlichamen');
    });
});

describe('cypress-component - map - vl-map-legend - wfs and wms layers', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-tiled-wms-layer
                    layers="grondwater:beschermingszones_2014"
                    name="Beschermingszones"
                    url="https://www.dov.vlaanderen.be/geoserver/wms"
                ></vl-map-tiled-wms-layer>
                <vl-map-wfs-layer
                    name="Oppervlaktewaterlichamen"
                    url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                    layers="owl_l"
                    max-resolution="8"
                >
                    <vl-map-layer-circle-style
                        color="#ffe615"
                        size="5"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-circle-style>
                </vl-map-wfs-layer>
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-legend');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-map-legend');
    });

    it('should contain a title', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div > span.flux-map-legend-text.flux-map-legend-title')
            .contains('Legende');
    });

    it('should contain the correct number of style items', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item')
            .its('length')
            .should('eq', 2);
    });

    it('should contain the correct style items with an icon and name for the wfs layer', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find(
                'div.flux-map-legend > div.flux-map-legend-item > div.flux-map-legend-icon-container > div.flux-map-legend-icon'
            )
            .its('length')
            .should('eq', 1);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item > span.flux-map-legend-text')
            .contains('Oppervlaktewaterlichamen');
    });

    it('should contain the style image for the wms layer', () => {
        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item.flux-map-legend-image > img')
            .should('have.attr', 'class', 'flux-map-legend-icon');
    });
});

describe('cypress-component - map - vl-map-legend - wms layer that requires a version', () => {
    const mapLegendWithVersion = (version: string) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-tiled-wms-layer
                name="overstromingsgevoelige_gebieden_vanuit_de_zee"
                layers="0"
                url="https://inspirepub.waterinfo.be/arcgis/services/informatieplicht/overstromingsgevoelige_gebieden_vanuit_de_zee/MapServer/WMSServer"
                is-layer="true"
            ></vl-map-tiled-wms-layer>
            <vl-map-legend version=${version}></vl-map-legend>
        </vl-map>
    `;

    it('should show the legend when a version is provided', () => {
        cy.mount(mapLegendWithVersion('1.3.0'));
        cy.get('vl-map-legend')
            .shadow()
            .find('div .flux-map-legend-image img')
            .invoke('width')
            .should('be.greaterThan', 300);
    });

    it('should show no legend when no version is provided', () => {
        cy.mount(mapLegendWithVersion(null));
        cy.get('vl-map-legend')
            .shadow()
            .find('div .flux-map-legend-image img')
            .invoke('width')
            .should('be.lessThan', 300);
    });
});

describe('cypress-component - map - vl-map-legend - reactiviteit', () => {
    it('should update the legend when a features layer is added dynamically', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item')
            .should('have.length', 0);

        cy.get('vl-map').then(($map) => {
            const layer = document.createElement('vl-map-features-layer') as VlMapFeaturesLayer;
            layer.setAttribute('name', 'Dynamische laag');
            layer.setAttribute('projection-code', 'EPSG:31370');

            const style = document.createElement('vl-map-layer-circle-style') as VlMapLayerCircleStyle;
            style.setAttribute('color', '#ffe615');
            style.setAttribute('size', '5');
            style.setAttribute('border-color', '#000');
            style.setAttribute('border-size', '1');
            layer.appendChild(style);

            $map[0].appendChild(layer);
        });

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item > span.flux-map-legend-text')
            .should('have.length', 1)
            .first()
            .should('have.text', 'Dynamische laag');
    });

    it('should update the legend when a features layer is removed dynamically', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    id="te-verwijderen-laag"
                    name="Te verwijderen laag"
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-circle-style
                        color="#ffe615"
                        size="5"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-circle-style>
                </vl-map-features-layer>
                <vl-map-legend bottom="10px" right=${'12px'}></vl-map-legend>
            </vl-map>
        `);

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item')
            .should('have.length', 1);

        cy.get('#te-verwijderen-laag').then(($layer) => {
            $layer[0].remove();
        });

        cy.get('vl-map-legend')
            .shadow()
            .find('div.flux-map-legend > div.flux-map-legend-item')
            .should('have.length', 0);
    });
});

describe('cypress-component - map - vl-map-legend - pattern support', () => {
    // SVG met transparante achtergrond: diagonale lijn op 10x10px
    const testPattern = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><line x1="0" y1="10" x2="10" y2="0" stroke="#000" stroke-width="2"/></svg>')}`;

    it('should show both background-color and background-image when a style has a pattern and color', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Arcering met kleur"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-style
                        name="Arcering met kleur"
                        pattern="${testPattern}"
                        color="rgba(255,0,0,0.5)"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);

        cy.get('vl-map-legend')
            .shadow()
            .find('.flux-map-legend-icon')
            .should('have.attr', 'style')
            .and('contain', 'background-color:rgba(255,0,0,0.5)')
            .and('contain', 'background-image');
    });

    it('should use background-color when only color is set (no pattern)', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Geen patroon"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-style
                        name="Geen patroon"
                        color="rgba(255,0,0,0.5)"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);

        cy.get('vl-map-legend')
            .shadow()
            .find('.flux-map-legend-icon')
            .should('have.attr', 'style')
            .and('contain', 'background-color')
            .and('not.contain', 'background-image');
    });

    it('should use background-image when only pattern is set (default blue background-color)', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer
                    name="Alleen patroon"
                    features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{}}]}'
                    projection-code="EPSG:31370"
                >
                    <vl-map-layer-style
                        name="Alleen patroon"
                        pattern="${testPattern}"
                        border-color="#000"
                        border-size="1"
                    ></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);

        cy.get('vl-map-legend')
            .shadow()
            .find('.flux-map-legend-icon')
            .should('have.attr', 'style')
            .and('contain', 'background-image')
            .and('contain', 'background-color');
    });
});
