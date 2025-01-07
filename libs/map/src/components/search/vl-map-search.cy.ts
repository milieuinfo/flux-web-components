import { registerWebComponents, sleep } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayerGRB } from '../baselayer/vl-map-base-layer-grb/vl-map-base-layer-grb';
import { VlSelectLocation } from '../select-location/vl-select-location';
import { VlMapSearch } from './vl-map-search';

registerWebComponents([VlMap, VlMapBaseLayerGRB, VlMapSearch]);

const mapSearchFixture = html` <vl-map-search></vl-map-search> `;

const mapWithSearchFixture = html`
    <vl-map>
        <vl-map-baselayer-grb></vl-map-baselayer-grb>
        <vl-map-search></vl-map-search>
    </vl-map>
`;

const standaloneVlMapSearchFixture = html`
    <div>
        <vl-map></vl-map>
        <vl-map-search></vl-map-search>
    </div>
`;

describe('vl-map-search', () => {
    it('bevat een search element met correct geconfigureerd select element als input slot', () => {
        cy.mount(mapSearchFixture);
        cy.runTestFor<VlMapSearch>('vl-map-search', (vlMapSearch) => {
            const searchElement = vlMapSearch.shadowRoot.querySelector('vl-search');
            expect(searchElement).to.exist;
            expect(searchElement.getAttribute('data-vl-inline')).to.exist;
            const selectElement = searchElement.querySelector('select');
            expect(selectElement).to.exist;
            expect(selectElement.getAttribute('is')).to.be.equal('vl-select-location');
        });
    });

    it('indien vl-map-search element binnen een vl-map element zit, zal dit element toegevoegd worden aan de shadow dom', () => {
        cy.mount(mapWithSearchFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap.shadowRoot.querySelector('vl-map-search')).to.exist;
            });
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
        const value = 'Antwerpen';
        const choices = [
            {
                value,
                label: value,
            },
        ];
        cy.mount(mapWithSearchFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const searchElement = vlMap.shadowRoot.querySelector('vl-map-search') as VlMapSearch;
                const zoomToSpy = cy.spy(vlMap, 'zoomTo');
                cy.wait(0).then(() => {
                    const selectElement = searchElement._selectElement as VlSelectLocation;
                    cy.wrap(selectElement.ready).then(() => {
                        selectElement.choices = choices;
                        selectElement.value = choices[0].value;
                        searchElement._selectElement.dispatchEvent(new Event('change'));
                        // ik vind niets beter dan deze halve seconde wachten
                        cy.wait(500).then(() => {
                            expect(zoomToSpy).to.be.called;
                        });
                    });
                });
            });
        });
    });

    it('wanneer een locatie geselecteerd wordt zal uitsluitend de on select callback met de locatie bounding box aangeroepen worden indien deze bestaat', () => {
        const value = 'Antwerpen';
        const choices = [
            {
                value,
                label: value,
            },
        ];
        cy.mount(mapWithSearchFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const searchElement = vlMap.shadowRoot.querySelector('vl-map-search') as VlMapSearch;
                cy.wait(0).then(() => {
                    const selectElement = searchElement._selectElement as VlSelectLocation;
                    cy.wrap(selectElement.ready).then(() => {
                        selectElement.choices = choices;
                        selectElement.value = choices[0].value;
                        searchElement.onSelect(() => {});
                        const onSelectSpy = cy.spy(searchElement as any, '_onSelect').as('select');
                        searchElement._selectElement.dispatchEvent(new Event('change'));
                        // ik vind niets beter dan deze seconde wachten
                        cy.wait(1000).then(() => {
                            expect(onSelectSpy).to.be.called;
                            cy.get('@select').should('be.calledWith', [139472.21, 203697.31, 159809.79, 229767.38]);
                        });
                    });
                });
            });
        });
    });

    it('zal de select placeholders doorgeven', () => {
        cy.mount(mapSearchFixture);
        cy.runTestFor<VlMapSearch>('vl-map-search', (vlMapSearch) => {
            const select = vlMapSearch._selectElement;
            ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'].forEach(
                (item, index) => {
                    const attribute = `data-vl-${item}`;
                    expect(select.hasAttribute(attribute)).to.be.false;
                    const value = `text-${index}`;
                    vlMapSearch.setAttribute(attribute, value);
                    expect(select.getAttribute(attribute)).to.be.equal(value);
                    vlMapSearch.removeAttribute(attribute);
                    expect(select.hasAttribute(attribute)).to.be.false;
                }
            );
        });
    });
});
