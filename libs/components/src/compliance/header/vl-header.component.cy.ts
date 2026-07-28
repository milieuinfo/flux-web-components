// deze import moet voor die van de component staan: hij blokkeert de widget-scripts die de component al bij het laden van zijn module ophaalt
import { BurgerprofielWidgetMock, stubBurgerprofielWidgetClient } from '../burgerprofiel-widget.mock';
import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ApplicationLink, VlHeader } from './index';

registerWebComponents([VlHeader]);

const identifier = '59188ff6-662b-45b9-b23a-964ad48c2bfb';

let widgetMock: BurgerprofielWidgetMock;

const stubWidget = () => {
    widgetMock = stubBurgerprofielWidgetClient();
    cy.intercept('GET', '/sso/ingelogde_gebruiker', { statusCode: 401, body: '' }).as('authenticatedUser');
};

// Diagnostische tests voor de externe domeinen waarvan vl-header afhangt.
// Deze staan bewust eerst: als de header tests falen op een CI omgeving (bvb. door een firewall of
// proxy die een domein blokkeert), tonen deze tests meteen welk domein of endpoint niet bereikbaar is.
// Opgelet: het widget bootstrap endpoint op tni bleek tijdens het schrijven van deze tests zelf
// intermitterend 400 terug te geven; daarom wordt dat endpoint apart getest van de statische content.
describe('cypress-component - compliance components - vl-header - external domains', () => {
    it('should reach prod.widgets.burgerprofiel.vlaanderen.be (polyfill & widget client scripts)', () => {
        cy.request(
            'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js'
        )
            .its('status')
            .should('equal', 200);
        cy.request(
            'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js'
        )
            .its('status')
            .should('equal', 200);
    });

    it('should reach tni.widgets.burgerprofiel.dev-vlaanderen.be (statische widget modules & config)', () => {
        cy.request(
            'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-platform-browser/dist/index.min.js'
        )
            .its('status')
            .should('equal', 200);
        cy.request('https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/system/config')
            .its('status')
            .should('equal', 200);
    });

    it.skip('should reach the widget bootstrap endpoint on tni.widgets.burgerprofiel.dev-vlaanderen.be', () => {
        // Dit endpoint geeft af en toe een 400 terug; de runMode retries vangen dat op.
        // Faalt deze test consequent terwijl de statische content test slaagt, dan ligt het aan het
        // endpoint (of een WAF die het CI IP-adres blokkeert), niet aan de bereikbaarheid van het domein.
        cy.request(`https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/${identifier}`)
            .its('status')
            .should('equal', 200);
    });

    it('should reach cdn.omgeving.vlaanderen.be (FlandersArtSans font uit vl-font styles)', () => {
        cy.request(
            'https://cdn.omgeving.vlaanderen.be/domg/govflanders-font/22.0.2/flanders/sans/FlandersArtSans-Regular.woff2'
        )
            .its('status')
            .should('equal', 200);
    });

    it('should reach ui.vlaanderen.be (fonts geladen door de widget CSS)', () => {
        cy.request('https://ui.vlaanderen.be/2.latest/fonts/flanders-sans-regular.woff')
            .its('status')
            .should('equal', 200);
        cy.request('https://ui.vlaanderen.be/2.latest/fonts/flanders-sans-medium.woff')
            .its('status')
            .should('equal', 200);
    });
});

describe('cypress-component - compliance components - vl-header', () => {
    beforeEach(() => {
        stubWidget();

        cy.mount(html`
            <body>
                <vl-header development identifier="${identifier}"></vl-header>
            </body>
        `);
    });

    it('should mount', () => {
        cy.get('vl-header');
        cy.get('#header__container');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.get('vl-header');
        cy.checkA11y('vl-header');
        cy.checkA11y('#header__container');
    });

    it('should render with fixed height', () => {
        cy.get('#header__container').should('have.css', 'min-height', '43px');
    });

    it('should wrap the global header in a <header> element so screenreaders pick it up as banner landmark', () => {
        cy.get('#header__container').should('have.prop', 'tagName', 'HEADER');
        cy.get('header[id="header__container"]').should('have.length', 1);
    });

    it('should bootstrap the widget of the development environment', () => {
        cy.wrap(widgetMock)
            .its('bootstrapUrls')
            .should('deep.equal', [
                `https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/${identifier}`,
            ]);
    });
});

describe('cypress-component - compliance components - vl-header - ready event', () => {
    it('should dispatch ready event when ready', () => {
        stubWidget();

        const onReady = cy.stub().as('ready');

        cy.mount(html`
            <body>
                <vl-header development identifier="${identifier}" @ready=${onReady}></vl-header>
            </body>
        `);

        cy.get('@ready').should('have.been.calledOnce');
    });
});

describe('cypress-component - compliance components - vl-header - skeleton', () => {
    it('should render the skeleton container', () => {
        stubWidget();

        cy.mount(html`
            <body>
                <vl-header development identifier="${identifier}" skeleton></vl-header>
            </body>
        `);

        cy.get('#header__skeleton').should('have.css', 'height', '43px');
    });
});

describe('cypress-component - compliance components - vl-header - applicationLinks', () => {
    const mockApplicationLinks: ApplicationLink[] = [
        {
            label: 'Link 1',
            href: '#link1',
        },
        {
            label: 'Link 2',
            href: '#link2',
        },
    ];

    it('should render the application links', () => {
        stubWidget();

        cy.viewport(1280, 800);
        cy.mount(html`
            <body>
                <vl-header
                    development
                    identifier="${identifier}"
                    .applicationLinks=${mockApplicationLinks}
                ></vl-header>
            </body>
        `);

        cy.get('#header__container')
            .find(`a[href="${mockApplicationLinks[0].href}"]`)
            .contains(mockApplicationLinks[0].label);
        cy.get('#header__container')
            .find(`a[href="${mockApplicationLinks[1].href}"]`)
            .contains(mockApplicationLinks[1].label);
    });
});
