import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlJSessionIdCookie } from './vl-jsessionid-cookie.component';

registerWebComponents([VlJSessionIdCookie]);

const mountDefault = () => cy.mount(html` <vl-jsessionid-cookie></vl-jsessionid-cookie> `);

describe('cypress-component - compliance components - cookie-statement vl-jsessionid-cookie - default', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-jsessionid-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-jsessionid-cookie');

        cy.injectAxe();
        cy.checkA11y('vl-jsessionid-cookie');
    });
});

describe('cypress-component - compliance components - cookie-statement vl-jsessionid-cookie - props', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should render the correct <title>', () => {
        cy.get('vl-jsessionid-cookie')
            .shadow()
            .find('vl-title')
            .should('contain.text', 'Sessie cookie voor betere gebruikerservaring');
    });

    it('should render the correct <names>', () => {
        const expectedNames = ['JSESSIONID', 'KEYCLOAK_IDENTITY', 'KEYCLOAK_IDENTITY_LEGACY'];
        expectedNames.forEach((name) => {
            cy.get('vl-jsessionid-cookie').shadow().find('vl-properties').shadow().find('dd').contains(name);
        });
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-jsessionid-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(
                'De cookie wordt gebruikt om een sessie tussen de applicatieserver en een gebruiker in stand te houden. Dankzij deze cookie kan een gebruiker door de server op een uniek manier geïdentificeerd worden.'
            );
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-jsessionid-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(window.location.hostname);
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-jsessionid-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Departement Omgeving');
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-jsessionid-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Beperkt tot de duur van de sessie');
    });
});
