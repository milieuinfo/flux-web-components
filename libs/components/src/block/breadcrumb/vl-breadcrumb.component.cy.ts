import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlPopoverComponent } from '../popover';
import { VlBreadcrumbItemComponent } from './vl-breadcrumb-item.component';
import { VlBreadcrumbComponent } from './vl-breadcrumb.component';

registerWebComponents([VlBreadcrumbComponent, VlBreadcrumbItemComponent, VlPopoverComponent]);

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

describe('cypress-component - block components - vl-breadcrumb - long text', () => {
    it('should wrap a long breadcrumb item by default', () => {
        mountWithLongText({ ellipsis: false });

        cy.get('vl-breadcrumb').should('not.have.attr', 'ellipsis');
        getLastBreadcrumbItem().should(($item) => {
            const cta = getCta($item);
            expect(cta.scrollWidth).to.be.at.most(cta.clientWidth);
            expect(getComputedStyle(cta).textOverflow).to.equal('clip');
            expect($item[0].getBoundingClientRect().right).to.be.at.most(getContainerRight());
        });
    });

    it('should truncate a long breadcrumb item when the ellipsis attribute is set', () => {
        mountWithLongText({ ellipsis: true });

        getLastBreadcrumbItem().should(($item) => {
            const cta = getCta($item);
            expect(cta.scrollWidth).to.be.greaterThan(cta.clientWidth);
            expect(getComputedStyle(cta).textOverflow).to.equal('ellipsis');
            expect($item[0].getBoundingClientRect().right).to.be.at.most(getContainerRight());
        });
    });

    it('should move a breadcrumb item that does not fit to a new line without truncating it', () => {
        cy.mount(html`
            <div id="container" style="width: 300px">
                <vl-breadcrumb ellipsis>
                    <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="#">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Verordening toegankelijkheid</vl-breadcrumb-item>
                </vl-breadcrumb>
            </div>
        `);

        cy.get('vl-breadcrumb-item').should(($items) => {
            const previousTop = $items[1].getBoundingClientRect().top;
            const lastItem = $items.last();
            const cta = getCta(lastItem);
            expect(lastItem[0].getBoundingClientRect().top).to.be.greaterThan(previousTop);
            expect(cta.scrollWidth).to.equal(cta.clientWidth);
        });
    });

    it('should keep short breadcrumb items readable when the ellipsis attribute is set', () => {
        mountWithLongText({ ellipsis: true });

        cy.get('vl-breadcrumb-item')
            .first()
            .should(($item) => {
                const cta = getCta($item);
                expect(cta.scrollWidth).to.equal(cta.clientWidth);
            });
    });

    it('should truncate a breadcrumb item that is wrapped in another element', () => {
        cy.mount(html`
            <div id="container" style="width: 300px">
                <vl-breadcrumb ellipsis>
                    <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
                    <div><vl-breadcrumb-item type="button">${longText}</vl-breadcrumb-item></div>
                </vl-breadcrumb>
            </div>
        `);

        getLastBreadcrumbItem().should(($item) => {
            const cta = getCta($item);
            expect(cta.scrollWidth).to.be.greaterThan(cta.clientWidth);
            expect(cta.getBoundingClientRect().right).to.be.at.most(getContainerRight());
        });
    });
});

describe('cypress-component - block components - vl-breadcrumb - submenu', () => {
    // De knop zit in de shadow DOM van vl-breadcrumb-item; de popover zet daar aria-expanded en aria-controls.
    const triggerButton = () => cy.get('#submenu-fauna-flora').shadow().find('button');
    const actionButton = (index: number) => cy.get('vl-popover-action').eq(index).shadow().find('button');

    // Enter of Spatie op een knop met focus vuurt een click op die knop; cy.press(ENTER) doet dat niet in Electron.
    const openWithKeyboard = () => {
        triggerButton().focus();
        triggerButton()
            .should('have.focus')
            .then(($button) => $button[0].click());
        cy.get('vl-popover').should('have.attr', 'open');
    };

    beforeEach(() => {
        mountWithSubmenu();
    });

    it('should expose the submenu as a disclosure and not as a menu', () => {
        triggerButton()
            .should('have.attr', 'aria-controls', 'submenu-fauna-flora-popover')
            .and('have.attr', 'aria-expanded', 'false')
            .and('not.have.attr', 'aria-haspopup');

        openWithKeyboard();

        triggerButton().should('have.attr', 'aria-expanded', 'true');
        cy.get('vl-popover-action-list').should('not.have.attr', 'role', 'menu');
        actionButton(0).should('not.have.attr', 'role');
        actionButton(1).should('not.have.attr', 'role');
    });

    it('should have an accessible submenu when it is open', () => {
        cy.injectAxe();
        openWithKeyboard();

        // Enkel de popover: aria-controls op de knop in de shadow DOM verwijst naar een id buiten die shadow root, wat
        // axe als ongeldig meldt (aria-valid-attr-value). Dat geldt voor elke trigger in een shadow root, ook vl-button.
        cy.checkA11y('vl-popover');
    });

    it('should move focus from the breadcrumb button to the submenu actions with Tab', () => {
        openWithKeyboard();

        cy.press(Cypress.Keyboard.Keys.TAB);
        actionButton(0).should('have.focus');
        cy.press(Cypress.Keyboard.Keys.TAB);
        actionButton(1).should('have.focus');
    });

    it('should return focus to the breadcrumb button when closing the submenu with Escape from an action', () => {
        openWithKeyboard();
        cy.press(Cypress.Keyboard.Keys.TAB);
        actionButton(0).should('have.focus');

        cy.press(Cypress.Keyboard.Keys.ESC);

        cy.get('vl-popover').should('not.have.attr', 'open');
        triggerButton().should('have.focus').and('have.attr', 'aria-expanded', 'false');
    });
});

const longText =
    'Besluit van de Vlaamse Regering tot vaststelling van een gewestelijke stedenbouwkundige verordening voor publiciteitsinrichtingen';

const mountWithLongText = ({ ellipsis }: { ellipsis: boolean }) => {
    cy.mount(html`
        <div id="container" style="width: 300px">
            <vl-breadcrumb ?ellipsis=${ellipsis}>
                <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
                <vl-breadcrumb-item>${longText}</vl-breadcrumb-item>
            </vl-breadcrumb>
        </div>
    `);
};

const getLastBreadcrumbItem = () => cy.get('vl-breadcrumb-item').last();

const getCta = ($item: JQuery<HTMLElement>) =>
    $item[0].shadowRoot!.querySelector<HTMLElement>('.vl-breadcrumb__list__item__cta')!;

const getContainerRight = () => cy.$$('#container')[0].getBoundingClientRect().right;

// Zoals de story "vl-breadcrumb - buttons": een breadcrumb item met type="button" opent een submenu in een popover.
const mountWithSubmenu = () => {
    cy.mount(html`
        <vl-breadcrumb>
            <vl-breadcrumb-item type="button">Natuur</vl-breadcrumb-item>
            <div>
                <vl-breadcrumb-item id="submenu-fauna-flora" type="button">Flora</vl-breadcrumb-item>
                <vl-popover
                    id="submenu-fauna-flora-popover"
                    distance="6"
                    for="submenu-fauna-flora"
                    hide-arrow
                    placement="bottom-start"
                    trigger="click hover"
                >
                    <vl-popover-action-list>
                        <vl-popover-action icon="nature-leaf">Flora</vl-popover-action>
                        <vl-popover-action icon="programming-bug">Fauna</vl-popover-action>
                    </vl-popover-action-list>
                </vl-popover>
            </div>
            <vl-breadcrumb-item>Bomen</vl-breadcrumb-item>
        </vl-breadcrumb>
    `);
};

const mount = () => {
    cy.mount(html` <vl-breadcrumb>
        <vl-breadcrumb-item>item 1</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 2</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 3</vl-breadcrumb-item>
        </vl-breadcrumb> `);
};
