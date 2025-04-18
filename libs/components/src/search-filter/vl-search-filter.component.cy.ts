import { registerWebComponents } from '@domg-wc/common';
import { VlFormLabelComponent, VlInputFieldComponent, VlSelectComponent } from '@domg-wc/form';
import { html } from 'lit';
import { VlButtonComponent } from '../button';
import { VlTitleComponent } from '../title';
import { VlSearchFilterComponent } from './vl-search-filter.component';

registerWebComponents([
    VlSearchFilterComponent,
    VlTitleComponent,
    VlInputFieldComponent,
    VlFormLabelComponent,
    VlSelectComponent,
    VlButtonComponent,
]);

describe('component - vl-search-filter', () => {
    it('should mount', () => {
        cy.mount(html`<vl-search-filter></vl-search-filter>`);

        cy.get('vl-search-filter').shadow().find('.form-container');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-search-filter filter-title="Filter title"></vl-search-filter>`);
        cy.injectAxe();

        cy.checkA11y('vl-search-filter');
    });

    it('should render the title on mobile', () => {
        cy.viewport('iphone-6');
        cy.mount(html`<vl-search-filter filter-title="Filter title"></vl-search-filter>`);

        cy.get('vl-search-filter').shadow().find('.vl-search-filter--header-modal').contains('Filter title');
        cy.get('vl-search-filter').invoke('attr', 'mobile-modal-title', 'Mobile title');
        cy.get('vl-search-filter').shadow().find('.vl-search-filter--header-modal').contains('Mobile title');
    });

    it('should render the filter title on desktop', () => {
        cy.viewport('macbook-15');
        cy.mount(html`<vl-search-filter filter-title="Filter title"></vl-search-filter>`);

        cy.get('vl-search-filter').shadow().find('.vl-search-filter--intro').contains('Filter title');
    });

    it('should render alt style', () => {
        mountWithSlottedForm();

        cy.get('form.vl-search-filter--form').shouldHaveComputedStyle({
            style: 'background-color',
            value: 'rgb(232, 235, 238)',
        });
        cy.get('vl-search-filter').invoke('attr', 'alt', 'true');
        cy.get('form.vl-search-filter--form').shouldHaveComputedStyle({
            style: 'background-color',
            value: 'rgb(255, 255, 255)',
        });
    });

    it('should not submit form when clicking button', () => {
        mountWithSlottedForm();
        cy.viewport('iphone-6');

        cy.get('form.vl-search-filter--form').find('vl-input-field[name="id"]').shadow().find('input').type('123');
        cy.get('form.vl-search-filter--form').find('vl-button[type="submit"]').click();
        cy.get('form.vl-search-filter--form').find('vl-input-field[name="id"]').should('have.value', '123');
    });
});

const mountWithSlottedForm = () => {
    cy.mount(html`
        <vl-search-filter filter-title="Filter title">
            <form>
                <div>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title>
                        <div>
                            <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                            <vl-input-field id="filterOpId" type="text" name="id" block></vl-input-field>
                        </div>
                        <div>
                            <vl-form-label for="filterOpNaamProject" label="Project naam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamProject"
                                name="name"
                                block
                                autocomplete="given-name"
                            ></vl-input-field>
                        </div>
                        <div>
                            <vl-form-label for="filterOpNaamManager" label="Manager familienaam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamManager"
                                name="name"
                                block
                                autocomplete="family-name"
                            ></vl-input-field>
                        </div>
                    </section>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Locatie</vl-title>
                        <div>
                            <vl-form-label for="vl-select-city" label="Stad" light></vl-form-label>
                            <vl-select
                                name="vl-select-city"
                                deletable
                                block
                                autocomplete="address-level2"
                                placeholder="Kies een stad"
                                .options=${[
                                    { label: 'Kies een stad', value: '' },
                                    { label: 'Brussel', value: 'brussel' },
                                    { label: 'Gent', value: 'gent' },
                                ]}
                            >
                            </vl-select>
                        </div>
                        <div>
                            <vl-form-label for="vl-select-country" label="Land" light></vl-form-label>
                            <vl-select
                                name="vl-select-country"
                                deletable
                                block
                                autocomplete="address-level2"
                                placeholder="Kies een land"
                                .options=${[
                                    { label: 'Kies een land', value: '' },
                                    { label: 'België', value: 'België' },
                                    { label: 'Frankrijk', value: 'Frankrijk' },
                                    { label: 'Nederland', value: 'Nederland' },
                                ]}
                            >
                            </vl-select>
                        </div>
                    </section>
                </div>
                <footer>
                    <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                    <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                </footer>
            </form>
        </vl-search-filter>
    `);
};
