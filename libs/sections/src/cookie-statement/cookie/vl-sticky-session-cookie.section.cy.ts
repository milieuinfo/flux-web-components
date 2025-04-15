import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlStickySessionCookie } from './vl-sticky-session-cookie.section';

registerWebComponents([VlStickySessionCookie]);

const mountDefault = () => cy.mount(html` <vl-sticky-session-cookie></vl-sticky-session-cookie> `);

describe('vl-sticky-session-cookie component - default', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-sticky-session-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-sticky-session-cookie');
        cy.injectAxe();
        cy.checkA11y('vl-sticky-session-cookie');
    });
});

describe('vl-sticky-session-cookie component - props', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should render the correct <title>', () => {
        cy.get('vl-sticky-session-cookie')
            .shadow()
            .find('vl-title')
            .should('contain.text', 'Persistentie sessie cookie voor betere gebruikerservaring');
    });

    it('should render the correct <names>', () => {
        const expectedNames = [
            'BIGipServerPool-AUTO-* (vb. "BIGipServerPOOL-AUTO-app=2016879114.37407.0000")',
            'BIGipServerPool-sso-pr-* (vb. "BIGipServerPOOL-sso-pr-app=2016879114.37407.0000")',
        ];
        expectedNames.forEach((name) => {
            cy.get('vl-sticky-session-cookie').shadow().find('vl-properties').shadow().find('dd').contains(name);
        });
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-sticky-session-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(
                'Dankzij de cookie kan er verzekerd worden dat verzoeken van een gebruiker voor de duur van een sessie worden gedistribueerd naar de server waarop ze zijn gestart. De cookies worden daarom vaak beschreven als "sticky sessions". Hierdoor kan een betere gebruikerservaring gerealiseerd worden. Bovendien kan de infrastructuur optimaal gebruikt worden.'
            );
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-sticky-session-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains(window.location.hostname);
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-sticky-session-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Departement Omgeving');
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-sticky-session-cookie')
            .shadow()
            .find('vl-properties')
            .shadow()
            .find('dd')
            .contains('Beperkt tot de duur van de sessie');
    });
});
