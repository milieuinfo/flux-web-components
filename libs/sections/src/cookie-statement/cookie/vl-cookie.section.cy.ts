import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';

import { type VlCookieProps, VlCookie } from './vl-cookie.section';

registerWebComponents([VlCookie]);

const mountDefault = (props: VlCookieProps) =>
    cy.mount(
        html`
            <vl-cookie
                title=${props.title}
                purpose=${props.purpose}
                domain=${props.domain}
                name=${props.name}
                processor=${props.processor}
                validity=${props.validity}
            >
            </vl-cookie>
        `
    );

const props = {
    title: 'Departement Omgeving toegangsbeheer cookies',
    name: ['KEYCLOAK_SESSION', 'KEYCLOAK_SESSION_LEGACY'],
    purpose:
        'Sessiegebaseerde cookies die het mogelijk maken om gebruikers te herkennen op een webpagina van Departement Omgeving.',
    domain: window.location.hostname,
    processor: 'Departement Omgeving',
    validity: '10 uur',
};

describe('vl-cookie component - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('vl-cookie').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-cookie');
    });
});

describe('vl-cookie component - props', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should render the correct <title>', () => {
        cy.get('vl-cookie').should('have.attr', 'title', props.title);
    });

    it('should render the correct <names>', () => {
        cy.get('vl-cookie').should('have.attr', 'name', 'KEYCLOAK_SESSION,KEYCLOAK_SESSION_LEGACY');
    });

    it('should render the correct <purpose>', () => {
        cy.get('vl-cookie').should('have.attr', 'purpose', props.purpose);
    });

    it('should render the correct <domain>', () => {
        cy.get('vl-cookie').should('have.attr', 'domain', props.domain);
    });

    it('should render the correct <processor>', () => {
        cy.get('vl-cookie').should('have.attr', 'processor', props.processor);
    });

    it('should render the correct <validity>', () => {
        cy.get('vl-cookie').should('have.attr', 'validity', props.validity);
    });
});
