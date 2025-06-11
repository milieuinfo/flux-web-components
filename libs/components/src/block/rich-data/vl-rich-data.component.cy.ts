import { registerWebComponents } from '@domg-wc/common';
import { filter } from 'cypress/types/minimatch';
import { html } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlTitleComponent } from '../../atom/title';
import { VlFormLabelComponent } from '../../form/form-label';
import { VlInputFieldComponent } from '../../form/input-field';
import { VlSearchFilterComponent } from '../search-filter';
import { VlSearchResultComponent } from '../search-result';
import { VlSelectComponent } from '../../form/select';
import { VlPagerComponent } from '../pager';
import { VlRichData } from './vl-rich-data.component';

registerWebComponents([
    VlRichData,
    VlPagerComponent,
    VlSearchResultComponent,
    VlSearchFilterComponent,
    VlSelectComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlTitleComponent,
    VlButtonComponent,
]);
describe('component - vl-rich-data', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data filter-title="title">
                <vl-search-filter slot="filter">
                    <form id="form">
                        <label for="filter-input">Hier kunnen filtervelden komen</label>
                        <input id="filter-input" type="text" name="filter1" />
                    </form>
                    <div>
                        <button type="reset" form="form">Zoekopdracht verwijderen</button>
                    </div>
                </vl-search-filter>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <vl-search-result slot="content">
                    <vl-search-result-text>
                        <div>Resultaat 1</div>
                    </vl-search-result-text>
                </vl-search-result>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-rich-data');
        cy.checkA11y('vl-pager');
    });

    it('should see the rich-data pager', () => {
        cy.get('vl-pager')
            .shadow()
            .find('li[id=bounds]')
            .children('strong')
            .then((child) => {
                expect(child[0]).to.contain('1-5');
            });
        cy.get('vl-pager').shadow().find('li[pager-page=2]').click({ force: true });
        cy.get('vl-pager')
            .shadow()
            .find('li[id=bounds]')
            .children('strong')
            .then((child) => {
                expect(child[0]).to.contain('6-10');
            });
    });
});

describe('component - vl-rich-data with vl-search-filter', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data filter-title="title" filter-closable>
                <vl-search-filter filter-title="Filteren" mobile-modal-title="Filteren" slot="filter">
                    <form>
                        <div>
                            <section>
                                <vl-title type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title>
                                <div>
                                    <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                                    <vl-input-field id="filterOpId" type="text" name="id" block></vl-input-field>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <div slot="content">
                    <vl-search-result>
                        <div>Resultaat 1</div>
                    </vl-search-result>
                </div>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);
    });

    it('should be able to toggle the search filter using the toggle button', () => {
        cy.viewport(1024, 768);

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column--4');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column--8');

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column--0');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column--12');

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column--4');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column--8');
    });

    it('should be able to close the search filter using the escape key when closable', () => {
        cy.viewport(1024, 768);
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
    });

    it('should not close the search filter using the escape key when not closable', () => {
        cy.viewport(1024, 768);
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    });

    it('should close the search filter using the escape key without closable attribute in mobile', () => {
        cy.viewport(375, 667);
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
    });
});

describe('component - vl-rich-data with vl-select', () => {
    it('should cut off long text with an ellipsis', () => {
        cy.viewport(1024, 768);
        cy.mount(html`
            <vl-rich-data filter-title="title">
                <vl-search-filter slot="filter">
                    <form>
                        <section>
                            <label for="filter-input">Hier kunnen filtervelden komen</label>
                            <vl-input-field
                                id="filter-input"
                                type="text"
                                label="filtervelden"
                                name="filter1"
                            ></vl-input-field>
                            <vl-select
                                id="select-lange-tekst"
                                name="Select met lange tekst"
                                block
                                placeholder="Selecteer iets met lange tekst"
                                .options=${[
                                    {
                                        label: 'Optie 1',
                                        value: 'option1',
                                    },
                                    {
                                        label: 'Optie 2 met langere tekst lorem ipsum dolor sit amet',
                                        value: 'option2',
                                    },
                                ]}
                            ></vl-select>
                        </section>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary
                                >Zoekopdracht verwijderen</vl-button
                            >
                        </footer>
                    </form>
                </vl-search-filter>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <vl-search-results slot="content">
                    <vl-search-result>
                        <div>Resultaat 1</div>
                    </vl-search-result>
                </vl-search-results>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);

        cy.get('vl-select')
            .shadow()
            .find('select')
            .select('option2')
            .should('have.css', 'text-overflow', 'ellipsis')
            .should('have.css', 'white-space', 'nowrap');
    });
});
