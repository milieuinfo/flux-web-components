import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import LambertCoordinaat from '../../utils/lambert-coordinaat';
import { VlSelectLocationComponent } from './vl-select-location';
import { Location } from './vl-select-location.model';

registerWebComponents([VlSelectLocationComponent]);

const selectLocationFixture = html`
    <vl-select-location id="zoeken-op-kaart" name="zoeken-op-kaart"></vl-select-location>
`;

const locationGent1 = {
    Municipality: 'Gent',
    Zipcode: '9000',
    Thoroughfarename: 'Charles de Kerchovelaan',
    Housenumber: '191A',
    ID: 3021631,
    FormattedAddress: 'Charles de Kerchovelaan 191A, 9000 Gent',
    Location: {
        Lat_WGS84: 51.03991219945412,
        Lon_WGS84: 3.723601443431199,
        X_Lambert72: 104751.84,
        Y_Lambert72: 192389.4,
    },
    LocationType: 'crab_huisnummer_manueleAanduidingVanPerceel',
    BoundingBox: {
        LowerLeft: {
            Lat_WGS84: 51.03991219945412,
            Lon_WGS84: 3.723601443431199,
            X_Lambert72: 104751.84,
            Y_Lambert72: 192389.4,
        },
        UpperRight: {
            Lat_WGS84: 51.03991219945412,
            Lon_WGS84: 3.723601443431199,
            X_Lambert72: 104751.84,
            Y_Lambert72: 192389.4,
        },
    },
};

const locationGent2 = {
    Municipality: 'Gent',
    Zipcode: '9000',
    Thoroughfarename: 'Charles de Kerchovelaan',
    Housenumber: '197',
    ID: 1210091,
    FormattedAddress: 'Charles de Kerchovelaan 197, 9000 Gent',
    Location: {
        Lat_WGS84: 51.0398710793381,
        Lon_WGS84: 3.7236600414926286,
        X_Lambert72: 104755.91,
        Y_Lambert72: 192384.79,
    },
    LocationType: 'crab_huisnummer_manueleAanduidingVanPerceel',
    BoundingBox: {
        LowerLeft: {
            Lat_WGS84: 51.0398710793381,
            Lon_WGS84: 3.7236600414926286,
            X_Lambert72: 104755.91,
            Y_Lambert72: 192384.79,
        },
        UpperRight: {
            Lat_WGS84: 51.0398710793381,
            Lon_WGS84: 3.7236600414926286,
            X_Lambert72: 104755.91,
            Y_Lambert72: 192384.79,
        },
    },
};

export const locationAntwerpen1 = {
    Municipality: 'Antwerpen',
    Zipcode: null,
    Thoroughfarename: null,
    Housenumber: null,
    ID: 2,
    FormattedAddress: 'Antwerpen',
    Location: {
        Lat_WGS84: 51.26055097634139,
        Lon_WGS84: 4.358436586642045,
        X_Lambert72: 149279.48,
        Y_Lambert72: 216739.74,
    },
    LocationType: 'crab_gemeente',
    BoundingBox: {
        LowerLeft: {
            Lat_WGS84: 51.143359370883445,
            Lon_WGS84: 4.218833610929702,
            X_Lambert72: 139508.19,
            Y_Lambert72: 203712.17,
        },
        UpperRight: {
            Lat_WGS84: 51.377571431614676,
            Lon_WGS84: 4.498743162727715,
            X_Lambert72: 159050.77,
            Y_Lambert72: 229767.3,
        },
    },
};

export const suggestionsAntwerpen = [
    'Antwerpen',
    'Antwerpenlei, Brasschaat',
    'Antwerpenplein, Gent',
    'Antwerpenstraat, Bredene',
    'Hemiksem',
];

export const enterSelectLocationValue = (
    value: string,
    getSelectLocationComponent: () => Cypress.Chainable = () => cy.get('vl-select-location')
) => getSelectLocationComponent().click().shadow().find('.vl-select__list .vl-input-field').type(value).type('{enter}');

export const selectLocationSuggestion = (
    itemIndex = 0,
    getSelectLocationComponent: () => Cypress.Chainable = () => cy.get('vl-select-location')
) =>
    cy
        .wait('@getSuggestions')
        .wait(0)
        .then(() => getSelectLocationComponent().shadow().find('.vl-select__item--choice').eq(itemIndex).click());

export const interceptSuggestions = (data: string[]) =>
    cy
        .intercept('GET', `https://geo.api.vlaanderen.be/geolocation/Suggestion?*`, {
            SuggestionResult: data,
        })
        .as('getSuggestions');

export const interceptLocation = (data: Location[]) =>
    cy
        .intercept('GET', `https://geo.api.vlaanderen.be/geolocation/Location?*`, {
            LocationResult: data,
        })
        .as('getLocation');

describe('vl-select-location', () => {
    it('heeft een div met de class .js-vl-select', () => {
        cy.mount(selectLocationFixture);
        cy.get('vl-select-location').shadow().find('div.js-vl-select').should('exist');
    });

    it('heeft een select html element', () => {
        cy.mount(selectLocationFixture);
        cy.get('vl-select-location').shadow().find('select').should('exist');
    });

    it('heeft een placeholder element met default tekst', () => {
        cy.mount(selectLocationFixture);
        cy.get('vl-select-location')
            .shadow()
            .find('.vl-select__placeholder')
            .should('exist')
            .should('include.text', 'Zoeken op kaart');
    });

    it('de placeholders kunnen ingesteld worden', () => {
        const mockPlaceholder = 'mock placeholder';
        const mockSearchPlaceholder = 'mock search placeholder';

        cy.mount(
            html`
                <vl-select-location
                    id="zoeken-op-kaart"
                    name="zoeken-op-kaart"
                    placeholder="${mockPlaceholder}"
                    search-placeholder="${mockSearchPlaceholder}"
                ></vl-select-location>
            `
        );
        cy.get('vl-select-location').shadow().find('.vl-select__placeholder').should('include.text', mockPlaceholder);
        cy.get('vl-select-location')
            .shadow()
            .find('.vl-select__list .vl-input-field')
            .should('have.attr', 'placeholder', mockSearchPlaceholder);
    });

    it('wanneer de gebruiker zoekt zullen bij Geopunt de suggesties opgehaald en gevisualiseerd worden', () => {
        cy.mount(selectLocationFixture);

        interceptSuggestions(suggestionsAntwerpen);
        enterSelectLocationValue(suggestionsAntwerpen[0]);

        cy.wait('@getSuggestions')
            .wait(0)
            .then(() =>
                cy
                    .get('vl-select-location')
                    .shadow()
                    .find('.vl-select__item--choice')
                    .each((item, i) => expect(item.text().trim()).to.equal(suggestionsAntwerpen[i]))
            );
    });

    it('wanneer de gebruiker een Lambert-coördinaat zoekt, zullen bij Geopunt de locaties opgehaald en gevisualiseerd worden', () => {
        cy.mount(selectLocationFixture);

        const coordinate = '104719.27, 192387.25';
        const lambertCoordinaat = LambertCoordinaat.of(coordinate);
        const value = lambertCoordinaat.toString();
        const suggestions = [locationGent1, locationGent2];

        interceptLocation(suggestions);
        enterSelectLocationValue(coordinate);

        cy.wait('@getLocation')
            .wait(0)
            .then(() =>
                cy
                    .get('vl-select-location')
                    .shadow()
                    .find('.vl-select__item--choice')
                    .each((item, i) =>
                        i === 0
                            ? expect(item.text().trim()).to.equal(`Lambert-coördinaat: ${value}`)
                            : expect(item.text().trim()).to.equal(suggestions[i - 1].FormattedAddress)
                    )
            );
    });

    it('kan de geografische locatie van het geselecteerde adres opvragen', () => {
        cy.mount(selectLocationFixture);

        interceptSuggestions(suggestionsAntwerpen);
        interceptLocation([locationAntwerpen1]);
        enterSelectLocationValue(suggestionsAntwerpen[0]);

        cy.wait('@getSuggestions')
            .wait(0)
            .then(() => {
                cy.get('vl-select-location').shadow().find('.vl-select__item--choice').first().click();
                cy.runTestFor<VlSelectLocationComponent>('vl-select-location', async (vlSelectLocationComponent) => {
                    const location = await vlSelectLocationComponent.location;
                    cy.wait('@getLocation').then(() => {
                        assert.deepEqual(location, [
                            locationAntwerpen1.BoundingBox.LowerLeft.X_Lambert72,
                            locationAntwerpen1.BoundingBox.LowerLeft.Y_Lambert72,
                            locationAntwerpen1.BoundingBox.UpperRight.X_Lambert72,
                            locationAntwerpen1.BoundingBox.UpperRight.Y_Lambert72,
                        ]);
                    });
                });
            });
    });

    it('kan de geografische locatie van een Lambert-coördinaat opvragen', () => {
        const coordinate = '104719.27, 192387.25';
        const lambertCoordinaat = LambertCoordinaat.of(coordinate);
        const suggestions = [locationGent1, locationGent2];

        cy.mount(selectLocationFixture);

        interceptLocation(suggestions);
        enterSelectLocationValue(coordinate);

        cy.wait('@getLocation')
            .wait(0)
            .then(() => {
                cy.get('vl-select-location').shadow().find('.vl-select__item--choice').eq(1).click();
                cy.runTestFor<VlSelectLocationComponent>('vl-select-location', async (vlSelectLocationComponent) => {
                    const fetchSpy = cy.spy(window, 'fetch');
                    const location = await vlSelectLocationComponent.location;
                    assert.deepEqual(location, [
                        lambertCoordinaat.x - 1,
                        lambertCoordinaat.y - 1,
                        lambertCoordinaat.x + 1,
                        lambertCoordinaat.y + 1,
                    ]);
                    // eslint-disable-line @typescript-eslint/no-unused-expressions
                    expect(fetchSpy).to.be.not.called;
                });
            });
    });

    it('kan de geografische locatie van een Lambert-coördinaat adres opvragen', () => {
        const fetchSpy = cy.spy(window, 'fetch');

        cy.mount(selectLocationFixture);
        cy.runTestFor<VlSelectLocationComponent>('vl-select-location', (vlSelectLocationComponent) => {
            // @ts-expect-error: choices is private
            cy.waitUntil(() => vlSelectLocationComponent.choices).then(async () => {
                // @ts-expect-error: choices is private
                vlSelectLocationComponent.choices.setChoices([
                    {
                        value: locationAntwerpen1,
                        label: locationAntwerpen1.FormattedAddress,
                        selected: true,
                    },
                ]);
                const location = await vlSelectLocationComponent.location;
                assert.deepEqual(location, [
                    locationAntwerpen1.BoundingBox.LowerLeft.X_Lambert72,
                    locationAntwerpen1.BoundingBox.LowerLeft.Y_Lambert72,
                    locationAntwerpen1.BoundingBox.UpperRight.X_Lambert72,
                    locationAntwerpen1.BoundingBox.UpperRight.Y_Lambert72,
                ]);
                // eslint-disable-line @typescript-eslint/no-unused-expressions
                expect(fetchSpy).to.be.not.called;
            });
        });
    });

    it('verstuurt een change event wanneer een vl-input event getriggerd wordt', () => {
        interceptSuggestions(suggestionsAntwerpen);

        cy.mount(selectLocationFixture);

        cy.runTestFor<VlSelectLocationComponent>('vl-select-location', (vlSelectLocationComponent) => {
            vlSelectLocationComponent.parentElement.addEventListener('vl-input', (e) => {
                expect(e.type).to.equal('vl-input');
            });
        });

        enterSelectLocationValue(suggestionsAntwerpen[0]);
        selectLocationSuggestion();
    });
});
