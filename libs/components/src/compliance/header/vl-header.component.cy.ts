import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ApplicationLink, VlHeader } from './index';

registerWebComponents([VlHeader]);

describe('cypress-component - compliance components - vl-header', () => {
    beforeEach(() => {
        cy.mount(html`
            <body>
                <vl-header development identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"></vl-header>
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

    it('should dispatch ready event when ready', () => {
        // Mogelijke flaky test aangezien het event afgevuurd kan worden vooraleer de eventListener is toegevoegd.
        cy.createStubForEvent('vl-header', 'ready');
        cy.get('@ready').should('have.been.calledOnce');
    });
});

describe('cypress-component - compliance components - vl-header - skeleton', () => {
    it('should render the skeleton container', () => {
        cy.mount(html`
            <body>
                <vl-header development identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb" skeleton></vl-header>
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
        cy.viewport(1280, 800);
        cy.mount(html`
            <body>
                <vl-header
                    development
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
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
