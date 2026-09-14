import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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

describe('cypress-component - block components - vl-breadcrumb-item - focus', () => {
    it('should show a focus outline when focused with the keyboard', () => {
        mountWithPrecedingButton();

        cy.get('#preceding-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-breadcrumb-item')
            .shadow()
            .find('button')
            .should('have.focus')
            .shouldHaveComputedStyle({ style: 'outline-style', value: 'solid' });
    });

    it('should not show a focus outline when clicked with the mouse', () => {
        mountWithPrecedingButton();

        cy.get('vl-breadcrumb-item').shadow().find('button').then(realClick);

        cy.get('vl-breadcrumb-item')
            .shadow()
            .find('button')
            .should('have.focus')
            .shouldHaveComputedStyle({ style: 'outline-style', value: 'none' });
    });
});

const mountWithPrecedingButton = () => {
    cy.mount(html`
        <button id="preceding-action" type="button">voorgaande actie</button>
        <vl-breadcrumb-item type="button">Breadcrumb item</vl-breadcrumb-item>
    `);
    cy.get('vl-breadcrumb-item').shadow().find('button').should('exist');
};

// cy.click() simuleert enkel events, waardoor de browser geen muisinteractie registreert en :focus-visible anders
// beoordeelt; via het Chrome DevTools Protocol verloopt de klik als echte browser-input.
const realClick = ($element: JQuery<HTMLElement>) => {
    const element = $element[0];
    const autWindow = element.ownerDocument.defaultView!;
    const frameRect = autWindow.frameElement!.getBoundingClientRect();
    const scale = frameRect.width / autWindow.innerWidth;
    const elementRect = element.getBoundingClientRect();
    const x = frameRect.left + (elementRect.left + elementRect.width / 2) * scale;
    const y = frameRect.top + (elementRect.top + elementRect.height / 2) * scale;
    (['mousePressed', 'mouseReleased'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchMouseEvent',
                params: { type, x, y, button: 'left', clickCount: 1 },
            }),
        );
    });
};

const mount = (type?: string, href?: string) => {
    cy.mount(html`
        <vl-breadcrumb-item href="${ifDefined(href)}" type="${ifDefined(type)}">Breadcrumb item</vl-breadcrumb-item>
    `);
};
