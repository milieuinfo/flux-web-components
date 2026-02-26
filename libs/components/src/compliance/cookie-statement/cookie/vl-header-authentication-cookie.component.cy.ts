import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlHeaderAuthenticationCookie } from './vl-header-authentication-cookie.component';

registerWebComponents([VlHeaderAuthenticationCookie]);

const mountDefault = () => cy.mount(html` <vl-header-authentication-cookie></vl-header-authentication-cookie> `);

describe('cypress-component - compliance components - cookie-statement vl-header-authentication-cookie - default', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-header-authentication-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-header-authentication-cookie');

        cy.injectAxe();
        cy.checkA11y('vl-header-authentication-cookie');
    });
});

describe('cypress-component - compliance components - cookie-statement vl-authentication-cookie - props', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should render the correct <title>', () => {
        cy.get('vl-header-authentication-cookie')
            .shadow()
            .find('vl-title')
            .should('contain.text', 'Vlaams toegangsbeheer cookies');
    });

    it('should render the correct <names>', () => {
        const expectedNames = [
            'AMWEBJCT!%2Fsps!JSESSIONID',
            'https%3A%2F%2Fauthenticatie.vlaanderen.be%2Fsps%2Fvidp%2Fsaml20FIMSAML20',
            'PD_STATEFUL_5bb64e42-0d53-11e2-a712-52540052f0ed',
            'PD-H-SESSION-ID',
            'tbsession',
        ];
        expectedNames.forEach((name) => {
            cy.get('vl-header-authentication-cookie').shadow().find('vl-properties').shadow().find('dd').contains(name);
        });
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-header-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(
                'Sessiegebaseerde cookies die het mogelijk maken om gebruikers te herkennen op een webpagina van het Vlaams toegangsbeheer.'
            );
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-header-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('authenticatie.vlaanderen.be');
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-header-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Vlaamse overheid');
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-header-authentication-cookie').shadow().find('vl-properties').shadow().find('dd').contains('Sessie');
    });
});
