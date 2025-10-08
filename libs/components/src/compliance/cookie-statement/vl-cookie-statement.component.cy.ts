import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';
import { VlCookieStatement } from './vl-cookie-statement.component';

registerWebComponents([VlCookieStatement]);

type MountDefaultProps = { version?: string; date?: string; disableBackLink?: boolean; hideBackLink?: boolean };

const mountDefault = (props: MountDefaultProps) => {
    return cy.mount(
        html`
            <vl-cookie-statement version=${props.version}
                                 date=${props.date}
                                 ?disable-back-link=${props.disableBackLink}
                                 ?hide-back-link=${props.hideBackLink}
            </vl-cookie-statement>`
    );
};

const props: MountDefaultProps = {
    version: '1.0.0',
    date: '3 maart 2021',
    disableBackLink: false,
    hideBackLink: false,
};

describe('cypress-component - compliance components - vl-cookie-statement - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('vl-cookie-statement').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-cookie-statement');

        cy.injectAxe();
        cy.checkA11y('vl-cookie-statement');
    });
});

describe('cypress-component - compliance components - vl-cookie-statement - children', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should render <vl-header-cookie>', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-header-cookie');
    });

    it('should render <vl-header-authentication-cookie>', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-header-authentication-cookie');
    });

    it('should render <vl-authentication-cookie>', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-authentication-cookie');
    });

    it('should render <vl-sticky-session-cookie>', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-sticky-session-cookie');
    });

    it('should render <vl-jsessionid-cookie>', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-jsessionid-cookie');
    });
});

describe('cypress-component - compliance components - vl-cookie-statement - default content', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should have an h1 with "Cookieverklaring"', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-title[type="h1"').contains('Cookieverklaring');
    });

    it('should have an h2 with "Cookiebeleid"', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-title[type="h2"').contains('Cookiebeleid');
    });

    it('should have an h2 describing how to customize cookies', () => {
        cy.get('vl-cookie-statement')
            .shadow()
            .find('vl-title[type="h2"')
            .contains('Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?');
    });

    it('should have a vl-side-navigation', () => {
        cy.get('vl-cookie-statement').shadow().find('vl-side-navigation');
    });

    it('should have default version', () => {
        cy.get('vl-cookie-statement').shadow().find('section').find('span').contains('1.0.0');
    });

    it('should have default date', () => {
        cy.get('vl-cookie-statement').shadow().find('section').find('span').contains('3 maart 2021');
    });
});

describe('cypress-component - compliance components - vl-cookie-statement - properties reflect', () => {
    it('should set date', () => {
        mountDefault({ ...props, date: '27 januari 2023' });

        cy.get('vl-cookie-statement').shadow().find('section').find('#introduction-date').contains('27 januari 2023');
    });

    it('should disable back link and emit event', () => {
        mountDefault({ ...props, disableBackLink: true });
        cy.createStubForEvent('vl-cookie-statement', 'vl-click-back');

        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').shadow().find('#back-link').click();
        cy.get('@vl-click-back').should('have.been.calledOnce');
    });

    it('should have hide back link attribute', () => {
        mountDefault({ ...props, hideBackLink: true });

        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').should('have.attr', 'hide-back-link');
    });

    it('should NOT have hide back link attribute', () => {
        mountDefault({ ...props, hideBackLink: false });

        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').should('have.not.attr', 'hide-back-link');
    });

    it('should set version', () => {
        mountDefault({ ...props, version: 'v24' });
        cy.get('vl-cookie-statement').shadow().find('#introduction-version').should('have.text', 'v24');
    });
});

describe('cypress-component - compliance components - vl-cookie-statement - hide-back-link', () => {
    it('back-link should be visible', () => {
        mountDefault({ ...props, hideBackLink: false });

        cy.get('vl-cookie-statement').should('not.have.attr', 'hide-back-link');
        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').should('not.have.attr', 'hide-back-link');
        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').shadow().find('#back-link').should('exist');
    });

    it('back-link should be hidden', () => {
        mountDefault({ ...props, hideBackLink: true });

        cy.get('vl-cookie-statement').should('have.attr', 'hide-back-link');
        cy.get('vl-cookie-statement').shadow().find('vl-functional-header').should('have.attr', 'hide-back-link');
        cy.get('vl-cookie-statement')
            .shadow()
            .find('vl-functional-header')
            .shadow()
            .find('#back-link')
            .should('not.exist');
    });
});
