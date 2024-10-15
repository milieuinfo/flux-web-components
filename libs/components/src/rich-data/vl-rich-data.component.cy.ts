import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlPagerComponent } from '../pager/vl-pager.component';
import { VlRichData } from './vl-rich-data.component';

registerWebComponents([VlRichData, VlPagerComponent]);
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
