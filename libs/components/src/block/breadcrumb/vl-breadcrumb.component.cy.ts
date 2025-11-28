import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit-html';
import { VlBreadcrumbItemComponent } from './vl-breadcrumb-item.component';
import { VlBreadcrumbComponent } from './vl-breadcrumb.component';

registerWebComponents([VlBreadcrumbComponent, VlBreadcrumbItemComponent]);

describe('cypress-component - block components - vl-breadcrumb', () => {
    beforeEach(() => {
        mount();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-breadcrumb');

        cy.get('vl-breadcrumb').shadow().find('.vl-breadcrumb').should('have.attr', 'aria-label', 'U bent hier: ');
    });

    it('should contain a nav section', () => {
        cy.get('vl-breadcrumb').shadow().find('nav.vl-breadcrumb').should('exist');
    });

    it('should contain an ordered list', () => {
        cy.get('vl-breadcrumb').shadow().find('ol.vl-breadcrumb__list').should('exist');
    });

    it('should contain a list item for each breadcrumb item', () => {
        cy.get('vl-breadcrumb')
            .shadow()
            .find('.vl-breadcrumb__list')
            .children('.vl-breadcrumb__list__item')
            .should('have.length', 3);
    });
});

const mount = () => {
    cy.mount(html` <vl-breadcrumb>
        <vl-breadcrumb-item>item 1</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 2</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 3</vl-breadcrumb-item>
        </vl-breadcrumb> `);
};
