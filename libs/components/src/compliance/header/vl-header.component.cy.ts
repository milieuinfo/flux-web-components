import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlHeader } from './index';

registerWebComponents([VlHeader]);

const identifier = '59188ff6-662b-45b9-b23a-964ad48c2bfb';

describe('component - vl-header', () => {
    beforeEach(() => {
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

    it('should dispatch ready event when ready', () => {
        cy.createStubForEvent('vl-header', 'ready');
        cy.get('@ready').should('have.been.calledOnce');
    });
});

describe('component - vl-header - skeleton', () => {
    it('should render the skeleton container', () => {
        cy.mount(html`
            <body>
                <vl-header development identifier="${identifier}" skeleton></vl-header>
            </body>
        `);

        cy.get('#header__skeleton').should('have.css', 'height', '43px');
    });
});
