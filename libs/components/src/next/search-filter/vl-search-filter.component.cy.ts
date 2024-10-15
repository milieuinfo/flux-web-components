import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
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
        cy.mount(html`<vl-search-filter-next></vl-search-filter-next>`);

        cy.get('vl-search-filter-next').shadow().find('.form-container');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-search-filter-next filter-title="Filter title"></vl-search-filter-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-search-filter-next');
    });

    it('should render the title on mobile', () => {
        cy.viewport('iphone-6');
        cy.mount(html`<vl-search-filter-next filter-title="Filter title"></vl-search-filter-next>`);

        cy.get('vl-search-filter-next').shadow().find('.vl-search-filter-next--header-modal').contains('Filter title');
        cy.get('vl-search-filter-next').invoke('attr', 'mobile-modal-title', 'Mobile title');
        cy.get('vl-search-filter-next').shadow().find('.vl-search-filter-next--header-modal').contains('Mobile title');
    });

    it('should render the filter title on desktop', () => {
        cy.viewport('macbook-15');
        cy.mount(html`<vl-search-filter-next filter-title="Filter title"></vl-search-filter-next>`);

        cy.get('vl-search-filter-next').shadow().find('.vl-search-filter-next--intro').contains('Filter title');
    });

    it('should render alt style', () => {
        mountWithSlottedForm();

        cy.get('form.vl-search-filter-next--form').shouldHaveComputedStyle({
            style: 'background-color',
            value: 'rgb(232, 235, 238)',
        });
        cy.get('vl-search-filter-next').invoke('attr', 'alt', 'true');
        cy.get('form.vl-search-filter-next--form').shouldHaveComputedStyle({
            style: 'background-color',
            value: 'rgb(255, 255, 255)',
        });
    });

    it('should not submit form when clicking button', () => {
        mountWithSlottedForm();
        cy.viewport('iphone-6');

        cy.get('form.vl-search-filter-next--form')
            .find('vl-input-field-next[name="id"]')
            .shadow()
            .find('input')
            .type('123');
        cy.get('form.vl-search-filter-next--form').find('vl-button-next[type="submit"]').click();
        cy.get('form.vl-search-filter-next--form').find('vl-input-field-next[name="id"]').should('have.value', '123');
    });
});

const mountWithSlottedForm = () => {
    cy.mount(html`
            <vl-search-filter-next filter-title="Filter title">
                <form>
                    <div>
                        <section>
                            <vl-title-next type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title-next>
                            <div>
                                <vl-form-label-next
                                    for="filterOpId"
                                    label="Project id"
                                    light
                                ></vl-form-label-next>
                                <vl-input-field-next
                                    id="filterOpId"
                                    type="text"
                                    name="id"
                                    block
                                ></vl-input-field-next>
                            </div>
                            <div>
                                <vl-form-label-next for="filterOpNaamProject" label="Project naam" light></vl-form-label-next>
                                <vl-input-field-next
                                    type="text"
                                    id="filterOpNaamProject"
                                    name="name"
                                    block
                                    autocomplete="given-name"
                                ></vl-input-field-next>
                            </div><div>
                            <vl-form-label-next for="filterOpNaamManager" label="Manager familienaam" light></vl-form-label-next>
                            <vl-input-field-next
                                type="text"
                                id="filterOpNaamManager"
                                name="name"
                                block
                                autocomplete="family-name"
                            ></vl-input-field-next>
                        </div>
                        </section>
                        <section>
                            <vl-title-next type="h2" alt no-space-bottom="">Locatie</vl-title-next>
                            <div>
                                <vl-form-label-next for="vl-select-city" label="Stad" light></vl-form-label-next>
                                <vl-select-next
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
                                </vl-select-next>
                            </div>
                            <div>
                                <vl-form-label-next for="vl-select-country" label="Land" light></vl-form-label-next>
                                <vl-select-next
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
                                </vl-select-next>
                            </div>
                        </section>
                    </div>
                    <footer>
                        <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                        <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button-next-->
                    </footer>
                </form>
            </vl-search-filter-next>
        `);
};
