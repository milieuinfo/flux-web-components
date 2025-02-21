import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { html } from 'lit';
import { VlPagerComponent } from '../pager/vl-pager.component';
import { VlRichData } from './vl-rich-data.component';

registerWebComponents([VlRichData, VlPagerComponent, VlSelectComponent]);
describe('component - vl-rich-data', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data data-vl-filter-title="title">
                <div is="vl-search-filter" slot="filter">
                    <form is="vl-form" id="form">
                        <label for="filter-input">Hier kunnen filtervelden komen</label>
                        <input is="vl-input-field" id="filter-input" type="text" name="filter1" />
                    </form>
                    <div>
                        <button is="vl-button-link" type="reset" form="form">Zoekopdracht verwijderen</button>
                    </div>
                </div>
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

describe('component - vl-rich-data with vl-select-next', () => {
    it('should cut off long text with an ellipsis', () => {
        cy.viewport(1024, 768);
        cy.mount(html`
            <vl-rich-data data-vl-filter-title="title">
                <div is="vl-search-filter" slot="filter">
                    <form is="vl-form" id="form">
                        <label for="filter-input">Hier kunnen filtervelden komen</label>
                        <input is="vl-input-field" id="filter-input" type="text" name="filter1" />
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
                    </form>
                    <div>
                        <button is="vl-button-link" type="reset" form="form">Zoekopdracht verwijderen</button>
                    </div>
                </div>
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
