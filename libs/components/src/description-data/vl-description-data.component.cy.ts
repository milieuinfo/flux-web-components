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

describe('component vl-description-data - default', () => {
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
});
