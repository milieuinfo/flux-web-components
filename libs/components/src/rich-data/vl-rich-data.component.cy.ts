import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSearchResult, VlSearchResults } from '@domg-wc/elements';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { html } from 'lit';
import { VlButtonComponent } from '../next/button';
import { VlSearchFilterComponent } from '../next/search-filter';
import { VlTitleComponent } from '../next/title';
import { VlPagerComponent } from '../pager/vl-pager.component';
import { VlRichData } from './vl-rich-data.component';

registerWebComponents([
    VlRichData,
    VlPagerComponent,
    VlSearchResults,
    VlSearchResult,
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
            <vl-rich-data data-vl-filter-title="title">
                <vl-search-filter-next slot="filter" alt>
                    <form>
                        <section>
                            <label for="filter-input">Hier kunnen filtervelden komen</label>
                            <vl-input-field-next id="filter-input" type="text" label="filtervelden"
                                                 name="filter1"></vl-input-field-next>
                            <footer>
                                <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                                <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Zoekopdracht
                                    verwijderen</vl-button-next-->
                            </footer>
                    </form>
                </vl-search-filter-next>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <vl-search-results slot="content">
                    <vl-search-result>
                        <div>Resultaat 1</div>
                    </vl-search-result>
                </vl-search-results>
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
        cy.get('vl-pager').shadow().find('li[data-vl-pager-page=2]').click({ force: true });
        cy.get('vl-pager')
            .shadow()
            .find('li[id=bounds]')
            .children('strong')
            .then((child) => {
                expect(child[0]).to.contain('6-10');
            });
    });
});

describe('component - vl-rich-data with vl-search-filter-next', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data data-vl-filter-title="title" data-vl-filter-closable>
                <vl-search-filter-next filter-title="Filteren" mobile-modal-title="Filteren" slot="filter">
                    <form>
                        <div>
                            <section>
                                <vl-title-next type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title-next>
                                <div>
                                    <vl-form-label-next for="filterOpId" label="Project id" light></vl-form-label-next>
                                    <vl-input-field-next
                                        id="filterOpId"
                                        type="text"
                                        name="id"
                                        block
                                    ></vl-input-field-next>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                            <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button-next>
                        </footer>
                    </form>
                </vl-search-filter-next>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <vl-search-results slot="content">
                    <vl-search-result>
                        <div>Resultaat 1</div>
                    </vl-search-result>
                </vl-search-results>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);
    });

    it('should be able to toggle the search filter using the toggle button', () => {
        cy.viewport(1024, 768);
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next--4');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next--8');

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter-next').should('have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next--0');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next--12');

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-column-next--4');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next');
        cy.get('vl-rich-data').shadow().find('#content').should('have.class', 'vl-column-next--8');
    });

    it('should be able to close the search filter using the escape key when closable', () => {
        cy.viewport(1024, 768);
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter-next').should('have.attr', 'hidden');
    });

    it('should not close the search filter using the escape key when not closable', () => {
        cy.viewport(1024, 768);
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'data-vl-filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
    });

    it('should close the search filter using the escape key without closable attribute in mobile', () => {
        cy.viewport(375, 667);
        cy.get('vl-search-filter-next').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'data-vl-filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter-next').should('have.attr', 'hidden');
    });
});

describe('component - vl-rich-data with vl-select-next', () => {
    it('should cut off long text with an ellipsis', () => {
        cy.viewport(1024, 768);
        cy.mount(html`
            <vl-rich-data data-vl-filter-title="title">
                <vl-search-filter-next slot="filter">
                    <form>
                        <section>
                            <label for="filter-input">Hier kunnen filtervelden komen</label>
                            <vl-input-field-next id="filter-input" type="text" label="filtervelden"
                                                 name="filter1"></vl-input-field-next>
                            <vl-select-next
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
                            ></vl-select-next>
                            <footer>
                                <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                                <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Zoekopdracht
                                    verwijderen</vl-button-next-->
                            </footer>
                    </form>
                </vl-search-filter-next>
                <vl-pager slot="pager" total-items="25" items-per-page="5" current-page="1"></vl-pager>
                <vl-search-results slot="content">
                    <vl-search-result>
                        <div>Resultaat 1</div>
                    </vl-search-result>
                </vl-search-results>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);

        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .select('option2')
            .should('have.css', 'text-overflow', 'ellipsis')
            .should('have.css', 'white-space', 'nowrap');
    });
});
