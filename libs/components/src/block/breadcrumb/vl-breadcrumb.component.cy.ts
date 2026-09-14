import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
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

const mount = () => {
    cy.mount(html` <vl-breadcrumb>
        <vl-breadcrumb-item>item 1</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 2</vl-breadcrumb-item>
        <vl-breadcrumb-item>item 3</vl-breadcrumb-item>
        </vl-breadcrumb> `);
};
