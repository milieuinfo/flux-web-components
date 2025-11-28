import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VlBreadcrumbItemComponent } from './vl-breadcrumb-item.component';

registerWebComponents([VlBreadcrumbItemComponent]);

describe('cypress-component - block components - vl-breadcrumb-item', () => {
    it('should render breadcrumb item as text by default when no type and no href are provided', () => {
        mount();
        cy.get('vl-breadcrumb-item')
            .should('contain.text', 'Breadcrumb item')
            .shadow()
            .find('span.vl-breadcrumb__list__item__cta')
            .should('exist');
    });

    it('should render breadcrumb item as link when href is provided', () => {
        mount(undefined, '#');
        cy.get('vl-breadcrumb-item')
            .should('contain.text', 'Breadcrumb item')
            .shadow()
            .find('a.vl-breadcrumb__list__item__cta')
            .should('exist')
            .and('have.attr', 'href', '#');
    });

    it('should render breadcrumb item as button when type is button', () => {
        mount('button');
        cy.get('vl-breadcrumb-item')
            .should('contain.text', 'Breadcrumb item')
            .shadow()
            .find('button.vl-breadcrumb__list__item__cta')
            .should('exist');
    });

    it('should render breadcrumb item as text when type is text', () => {
        mount('text');
        cy.get('vl-breadcrumb-item')
            .should('contain.text', 'Breadcrumb item')
            .shadow()
            .find('span.vl-breadcrumb__list__item__cta')
            .should('exist');
    });
});

const mount = (type?: string, href?: string) => {
    cy.mount(html`
        <vl-breadcrumb-item href="${ifDefined(href)}" type="${ifDefined(type)}">Breadcrumb item</vl-breadcrumb-item>
    `);
};
