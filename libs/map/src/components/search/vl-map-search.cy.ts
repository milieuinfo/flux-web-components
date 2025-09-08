import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayerGRB } from '../baselayer/vl-map-base-layer-grb/vl-map-base-layer-grb';
import {
    enterSelectLocationValue,
    interceptLocation,
    interceptSuggestions,
    locationAntwerpen1,
    selectLocationSuggestion,
    suggestionsAntwerpen,
} from '../select-location/vl-select-location.cy';
import { VlMapSearch } from './vl-map-search';

registerWebComponents([VlMap, VlMapBaseLayerGRB, VlMapSearch]);

const mapSearchFixture = html` <vl-map-search></vl-map-search> `;

const mapWithSearchFixture = html`
    <vl-map lambert2008>
        <vl-map-baselayer-grb></vl-map-baselayer-grb>
        <vl-map-search></vl-map-search>
    </vl-map>
`;

const standaloneVlMapSearchFixture = html`
    <div>
        <vl-map lambert2008></vl-map>
        <vl-map-search></vl-map-search>
    </div>
`;

const getSearchComponent = () => cy.get('vl-map-search').shadow().find('vl-search');

const getSelectLocationComponent = () =>
    cy.get('vl-map').shadow().find('vl-map-search').shadow().find('vl-search').find('vl-select-location');

describe('vl-map-search', () => {
    it('bevat een search element met correct geconfigureerd select element als input slot', () => {
        cy.mount(mapSearchFixture);
        getSearchComponent().should('exist').should('have.attr', 'inline');
        getSearchComponent().find('vl-select-location').should('exist');
        getSearchComponent().find('vl-select-location').shadow().find('select').should('exist');
    });

    it('indien vl-map-search element binnen een vl-map element zit, zal dit element toegevoegd worden aan de shadow dom', () => {
        cy.mount(mapWithSearchFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => expect(vlMap.shadowRoot.querySelector('vl-map-search')).to.exist);
        });
    });

    it('indien vl-map-search element niet binnen een vl-map element zit, kan de koppeling nadien manueel gebeuren', () => {
        cy.mount(standaloneVlMapSearchFixture);
        cy.runTestFor<HTMLDivElement>('div', (div) => {
            const mapElement = div.getElementsByTagName('vl-map')[0];
            const searchElement: any = div.getElementsByTagName('vl-map-search')[0];
            searchElement.bindMap(mapElement);
            expect(searchElement._map).to.be.equal(mapElement);
        });
    });

    it('wanneer een locatie geselecteerd wordt zal de map zoomen naar deze locatie', () => {
        cy.mount(mapWithSearchFixture);
        interceptSuggestions(suggestionsAntwerpen);
        interceptLocation([locationAntwerpen1]);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const searchElement = vlMap.shadowRoot.querySelector('vl-map-search') as VlMapSearch;
            // @ts-ignore
            const onZoomSpy = cy.spy(searchElement, 'zoomTo');
            enterSelectLocationValue(suggestionsAntwerpen[0], getSelectLocationComponent);
            selectLocationSuggestion(0, getSelectLocationComponent).should(() => expect(onZoomSpy).to.be.called);
        });
    });

    it('wanneer een locatie geselecteerd wordt zal de map niet zoomen naar deze locatie indien de _onSelect callback gedefineerd is', () => {
        cy.mount(mapWithSearchFixture);
        interceptSuggestions(suggestionsAntwerpen);
        interceptLocation([locationAntwerpen1]);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const searchElement = vlMap.shadowRoot.querySelector('vl-map-search') as VlMapSearch;
            // @ts-ignore
            const onZoomSpy = cy.spy(searchElement, 'zoomTo');
            searchElement.onSelect(() => {});
            // @ts-ignore
            const onSelectSpy = cy.spy(searchElement, '_onSelect');
            enterSelectLocationValue(suggestionsAntwerpen[0], getSelectLocationComponent);
            selectLocationSuggestion(0, getSelectLocationComponent).should(
                () =>
                    expect(onSelectSpy).to.be.calledWith([
                        locationAntwerpen1.BoundingBox.LowerLeft.X_Lambert2008,
                        locationAntwerpen1.BoundingBox.LowerLeft.Y_Lambert2008,
                        locationAntwerpen1.BoundingBox.UpperRight.X_Lambert2008,
                        locationAntwerpen1.BoundingBox.UpperRight.Y_Lambert2008,
                    ]) && expect(onZoomSpy).not.to.be.called
            );
        });
    });

    it('zal de select placeholders doorgeven', () => {
        cy.mount(mapSearchFixture);
        cy.runTestFor<VlMapSearch>('vl-map-search', (vlMapSearch) => {
            const select = vlMapSearch._selectElement;
            ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'].forEach(
                (item, index) => {
                    const attribute = `${item}`;
                    expect(select.hasAttribute(attribute)).to.be.equal(false);
                    const value = `text-${index}`;
                    vlMapSearch.setAttribute(attribute, value);
                    expect(select.getAttribute(attribute)).to.be.equal(value);
                    vlMapSearch.removeAttribute(attribute);
                    expect(select.hasAttribute(attribute)).to.be.equal(false);
                }
            );
        });
    });
});
