import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTabSectionComponent } from './vl-tab-section.component';

registerWebComponents([VlTabSectionComponent]);

const mountDefault = () => {
    return cy.mount(html`<vl-tab-section></vl-tab-section>`);
};

describe('component vl-tab-section', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-tab-section');
        });
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-tab-section');
    });
});

describe('component vl-tab-section - classes', () => {
    it('should have class vl-tab__pane', () => {
        mountDefault();

        cy.get('vl-tab-section').should('have.class', 'vl-tab__pane');
    });
});

describe('component vl-tab-section - attributes', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should have attribute <tab-pane>', () => {
        cy.get('vl-tab-section').should('have.attr', 'tab-pane');
    });

    it('should have attribute <tabindex>', () => {
        cy.get('vl-tab-section').should('have.attr', 'tabindex', '0');
    });

    it('should have attribute <role>', () => {
        cy.get('vl-tab-section').should('have.attr', 'role', 'tabpanel');
    });

    it('should have attribute <hidden>', () => {
        cy.get('vl-tab-section').should('have.attr', 'hidden');
    });

    it('should have attribute <aria-labelledby>', () => {
        cy.get('vl-tab-section').should('have.attr', 'aria-labelledby');
    });
});
