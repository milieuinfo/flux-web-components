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

describe('cypress-component - block components - vl-description-data - default', () => {
    it('should mount', () => {
        mountDefault({});

        cy.get('vl-description-data').shadow();
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

    it('should contain a valid label and value for each item', () => {
        mountDefault({});

        cy.getDataCy('description-data-item-1').shadow().find('.vl-description-data__label').contains('Uitgever');
        cy.getDataCy('description-data-item-1').shadow().find('.vl-description-data__value').contains('Kind en Gezin');
        cy.getDataCy('description-data-item-2').shadow().find('.vl-description-data__label').contains('Publicatiedatum');
        cy.getDataCy('description-data-item-2').shadow().find('.vl-description-data__value').contains('Augustus 2018');
        cy.getDataCy('description-data-item-3').shadow().find('.vl-description-data__label').contains('Publicatietype');
        cy.getDataCy('description-data-item-3').shadow().find('.vl-description-data__value').contains('Brochure');
        cy.getDataCy('description-data-item-4').shadow().find('.vl-description-data__label').contains('Categorie');
        cy.getDataCy('description-data-item-4').shadow().find('.vl-description-data__value').contains('Kinderen en jongeren');
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
