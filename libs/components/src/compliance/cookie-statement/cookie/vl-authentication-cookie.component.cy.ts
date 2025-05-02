import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';
import { VlAuthenticationCookie } from './vl-authentication-cookie.component';

registerWebComponents([VlAuthenticationCookie]);

const mountDefault = () => cy.mount(html` <vl-authentication-cookie></vl-authentication-cookie> `);

describe('vl-authentication-cookie component - default', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-authentication-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-authentication-cookie');

        cy.injectAxe();
        cy.checkA11y('vl-authentication-cookie');
    });
});

describe('vl-authentication-cookie component - props', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should render the correct <title>', () => {
        cy.get('vl-authentication-cookie')
            .shadow()
            .find('vl-title')
            .should('contain.text', 'Departement Omgeving toegangsbeheer cookies');
    });

    it('should render the correct <names>', () => {
        const expectedNames = ['KEYCLOAK_SESSION', 'KEYCLOAK_SESSION_LEGACY'];
        expectedNames.forEach((name) => {
            cy.get('vl-authentication-cookie').shadow().find('vl-properties').shadow().find('dd').contains(name);
        });
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(
                'Sessiegebaseerde cookies die het mogelijk maken om gebruikers te herkennen op een webpagina van Departement Omgeving.'
            );
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(window.location.hostname);
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-authentication-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Departement Omgeving');
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-authentication-cookie').shadow().find('vl-properties').shadow().find('dd').contains('10 uur');
    });
});
