import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlDescriptionData } from './vl-description-data.component';
import { VlDescriptionDataItem } from './vl-description-data-item.component';

registerWebComponents([VlDescriptionData, VlDescriptionDataItem]);

const mountDefault = ({ bordered = false }: { bordered?: boolean }) => {
    cy.mount(
        html`
            <vl-description-data ?bordered=${bordered}>
                <vl-description-data-item
                    label="Uitgever"
                    value="Kind en Gezin"
                    data-cy="description-data-item-1"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Publicatiedatum"
                    value="Augustus 2018"
                    data-cy="description-data-item-2"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Publicatietype"
                    value="Brochure"
                    data-cy="description-data-item-3"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Categorie"
                    value="Kinderen en jongeren"
                    data-cy="description-data-item-4"
                ></vl-description-data-item>
            </vl-description-data>
        `
    );
};

const mountWithSlots = () => {
    cy.mount(
        html`
            <vl-description-data>
                <vl-description-data-item data-cy="description-data-item-1">
                    <span slot="label">Uitgever</span>
                    <span slot="value"><a href="#">Kind en Gezin</a></span>
                </vl-description-data-item>
                <vl-description-data-item
                    label="Publicatiedatum"
                    value="Augustus 2018"
                    data-cy="description-data-item-2"
                ></vl-description-data-item>
            </vl-description-data>
        `
    );
};

const mountWithItemSizeOverride = () => {
    cy.mount(
        html`
            <vl-description-data items-size="3">
                <vl-description-data-item
                    label="Uitgever"
                    value="Kind en Gezin"
                    data-cy="description-data-item-1"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Publicatiedatum"
                    value="Augustus 2018"
                    data-cy="description-data-item-2"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Publicatietype"
                    value="Brochure"
                    data-cy="description-data-item-3"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Categorie"
                    value="Kinderen en jongeren"
                    data-cy="description-data-item-4"
                ></vl-description-data-item>
                <vl-description-data-item
                    label="Omschrijving"
                    value="Volledige breedte"
                    items-size="12"
                    data-cy="description-data-item-5"
                ></vl-description-data-item>
            </vl-description-data>
        `
    );
};

const getColumn = (index: number) => cy.get('vl-description-data').shadow().find('dl.vl-grid > .vl-column').eq(index);

const IGNORED_CHILDREN_WARNING =
    'vl-description-data rendert enkel vl-description-data-item kinderen, andere elementen worden genegeerd';

const spyOnConsoleWarn = () => {
    cy.window().then((win) => {
        cy.spy(win.console, 'warn').as('consoleWarn');
    });
};

describe('cypress-component - block components - vl-description-data - default', () => {
    it('should mount', () => {
        mountDefault({});

        cy.get('vl-description-data').shadow().find('dl');
    });

    it('should be accessible', () => {
        mountDefault({});

        cy.injectAxe();
        cy.checkA11y('vl-description-data');
    });

    it('should be bordered', () => {
        mountDefault({ bordered: true });

        cy.get('vl-description-data').shadow().find('div.vl-description-data.vl-description-data--bordered');
    });

    it('should render a description list with a term and a definition per item', () => {
        mountDefault({});

        const items = [
            { label: 'Uitgever', value: 'Kind en Gezin' },
            { label: 'Publicatiedatum', value: 'Augustus 2018' },
            { label: 'Publicatietype', value: 'Brochure' },
            { label: 'Categorie', value: 'Kinderen en jongeren' },
        ];
        items.forEach((item, index) => {
            getColumn(index).find('dt.vl-description-data__label').should('contain.text', item.label);
            getColumn(index).find('dd.vl-description-data__value').should('contain.text', item.value);
        });
    });

    it('should group each dt and dd in a column that is a direct child of the dl', () => {
        mountDefault({});

        cy.get('vl-description-data').shadow().find('dl').children().should('have.length', 4);
        cy.get('vl-description-data')
            .shadow()
            .find('dl > div.vl-column')
            .each((column) => {
                cy.wrap(column).find('> dt').should('have.length', 1);
                cy.wrap(column).find('> dd').should('have.length', 1);
            });
    });

    it('should lay the columns out in a single grid row', () => {
        cy.viewport(1024, 768);
        mountDefault({});

        cy.get('vl-description-data')
            .shadow()
            .find('dl > div.vl-column')
            .then((columns) => {
                const [first, second] = [columns[0].getBoundingClientRect(), columns[1].getBoundingClientRect()];

                expect(second.top).to.be.closeTo(first.top, 1);
                expect(second.left).to.be.greaterThan(first.right - 1);
            });
    });

    it('should not render the items in the light DOM', () => {
        mountDefault({});

        cy.getDataCy('description-data-item-1').should('not.be.visible');
    });

    it('should render an empty dl without items', () => {
        cy.mount(html`<vl-description-data></vl-description-data>`);

        cy.get('vl-description-data').shadow().find('dl').children().should('have.length', 0);
    });

    it('should not render children that are not a vl-description-data-item', () => {
        spyOnConsoleWarn();
        cy.mount(
            html`
                <vl-description-data>
                    <vl-description-data-item label="Uitgever" value="Kind en Gezin"></vl-description-data-item>
                    <div data-cy="other-child">Geen item</div>
                </vl-description-data>
            `
        );

        cy.get('vl-description-data').shadow().find('dl').children().should('have.length', 1);
        cy.getDataCy('other-child').should('not.be.visible');
        cy.get('@consoleWarn').should('be.calledWith', IGNORED_CHILDREN_WARNING);
    });

    it('should warn only once about ignored children', () => {
        spyOnConsoleWarn();
        cy.mount(
            html`
                <vl-description-data>
                    <vl-description-data-item label="Uitgever" value="Kind en Gezin"></vl-description-data-item>
                    <div data-cy="other-child">Geen item</div>
                </vl-description-data>
            `
        );

        cy.get('@consoleWarn').should('be.calledOnceWith', IGNORED_CHILDREN_WARNING);

        cy.runTestFor<VlDescriptionData>('vl-description-data', (component) => {
            const item = document.createElement('vl-description-data-item');
            item.setAttribute('label', 'Auteur');
            item.setAttribute('value', 'Vlaamse overheid');
            component.append(item);
            component.append(document.createElement('span'));
        });

        // het extra dt bewijst dat de MutationObserver buildEntries opnieuw uitgevoerd heeft, met nog steeds een
        // genegeerd kind in de light DOM
        cy.get('vl-description-data').shadow().find('dt').should('have.length', 2);
        cy.get('@consoleWarn').should('be.calledOnceWith', IGNORED_CHILDREN_WARNING);
    });
});

describe('cypress-component - block components - vl-description-data - slots', () => {
    it('should use the label and value slot content', () => {
        mountWithSlots();

        getColumn(0).find('dt').should('contain.text', 'Uitgever');
        getColumn(0).find('dd a').should('contain.text', 'Kind en Gezin');
    });

    it('should not keep the slot attribute on the cloned content', () => {
        mountWithSlots();

        getColumn(0).find('dt > span').should('not.have.attr', 'slot');
    });

    it('should be accessible', () => {
        mountWithSlots();

        cy.injectAxe();
        cy.checkA11y('vl-description-data');
    });
});

describe('cypress-component - block components - vl-description-data - light DOM changes', () => {
    it('should update the shadow DOM after an item is added', () => {
        mountDefault({});

        cy.runTestFor<VlDescriptionData>('vl-description-data', (component) => {
            const item = document.createElement('vl-description-data-item');
            item.setAttribute('label', 'Auteur');
            item.setAttribute('value', 'Vlaamse overheid');
            component.append(item);
        });

        cy.get('vl-description-data').shadow().find('dt').should('have.length', 5);
        getColumn(4).find('dt').should('contain.text', 'Auteur');
        getColumn(4).find('dd').should('contain.text', 'Vlaamse overheid');
    });

    it('should update the shadow DOM after an item is removed', () => {
        mountDefault({});

        cy.runTestFor<VlDescriptionData>('vl-description-data', (component) => {
            component.children[0].remove();
        });

        cy.get('vl-description-data').shadow().find('dt').should('have.length', 3);
        getColumn(0).find('dt').should('contain.text', 'Publicatiedatum');
    });

    it('should update the shadow DOM when a label attribute is mutated in-place', () => {
        mountDefault({});

        cy.runTestFor<VlDescriptionData>('vl-description-data', (component) => {
            component.children[0].setAttribute('label', 'Verantwoordelijke uitgever');
        });

        getColumn(0).find('dt').should('contain.text', 'Verantwoordelijke uitgever');
    });

    it('should update the shadow DOM when slotted text is mutated in-place', () => {
        mountWithSlots();

        cy.runTestFor<VlDescriptionData>('vl-description-data', (component) => {
            const textNode = component.querySelector('[slot="label"]')?.firstChild;
            textNode!.textContent = 'Verantwoordelijke uitgever';
        });

        getColumn(0).find('dt').should('contain.text', 'Verantwoordelijke uitgever');
    });
});

describe('cypress-component - block components - vl-description-data - per-item size override', () => {
    it('should apply the parent items-size to regular items', () => {
        mountWithItemSizeOverride();

        cy.get('vl-description-data')
            .shadow()
            .find('.vl-grid > .vl-column')
            .eq(0)
            .should('have.class', 'vl-column--3');
    });

    it('should apply items-size from the item attribute when set', () => {
        mountWithItemSizeOverride();

        cy.get('vl-description-data')
            .shadow()
            .find('.vl-grid > .vl-column')
            .eq(4)
            .should('have.class', 'vl-column--12');
    });
});

describe('cypress-component - block components - vl-description-data-item - standalone', () => {
    it('should render the label and the value', () => {
        cy.mount(
            html`<vl-description-data-item
                label="Uitgever"
                value="Kind en Gezin"
                data-cy="description-data-item"
            ></vl-description-data-item>`
        );

        cy.getDataCy('description-data-item').shadow().find('.vl-description-data__label').contains('Uitgever');
        cy.getDataCy('description-data-item').shadow().find('.vl-description-data__value').contains('Kind en Gezin');
    });

    it('should render the label and value slots', () => {
        cy.mount(
            html`<vl-description-data-item data-cy="description-data-item">
                <span slot="label">Uitgever</span>
                <span slot="value">Kind en Gezin</span>
            </vl-description-data-item>`
        );

        cy.getDataCy('description-data-item').shadow().find('slot[name="label"]');
        cy.getDataCy('description-data-item').shadow().find('slot[name="value"]');
        cy.getDataCy('description-data-item').should('contain.text', 'Uitgever');
        cy.getDataCy('description-data-item').should('contain.text', 'Kind en Gezin');
    });
});
