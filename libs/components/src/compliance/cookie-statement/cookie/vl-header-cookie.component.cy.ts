import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';
import { VlHeaderCookie } from './vl-header-cookie.component';

registerWebComponents([VlHeaderCookie]);

const mountDefault = () => cy.mount(html` <vl-header-cookie></vl-header-cookie> `);

describe('cypress-component - compliance components - cookie-statement vl-header-cookie - default', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-header-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-header-cookie');

        cy.injectAxe();
        cy.checkA11y('vl-header-cookie');
    });
});

describe('cypress-component - compliance components - cookie-statement vl-header-cookie - props', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should render the correct <title>', () => {
        cy.get('vl-header-cookie').shadow().find('vl-title').should('contain.text', 'Vlaanderen header cookie');
    });

    it('should render the correct <names>', () => {
        const expectedNames = ['VOGANONUSER'];
        expectedNames.forEach((name) => {
            cy.get('vl-header-cookie').shadow().find('vl-properties').shadow().find('dd').contains(name);
        });
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-header-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(
                'De Reverse Proxy van de Vlaamse overheid plaats dit cookie in kader van de Vlaanderen header op Vlaanderen.be om de goede uitvoering van de verzending van communicatie over een elektronisch communicatienetwerk van de Vlaamse overheid te verzekeren.'
            );
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-header-cookie').shadow().find('vl-properties').shadow().find('dd').contains('vlaanderen.be');
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-header-cookie').shadow().find('vl-properties').shadow().find('dd').contains('Vlaamse overheid');
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-header-cookie')
            .shadow()
            .find('vl-properties')

            .shadow()
            .find('dd')
            .contains('Permanente cookies met een geldigheid van maximaal 24 uur');
    });
});
