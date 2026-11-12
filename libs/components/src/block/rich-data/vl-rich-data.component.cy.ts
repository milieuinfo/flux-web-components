import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlTitleComponent } from '../../atom/title';
import { VlFormLabelComponent } from '../../form/form-label';
import { VlInputFieldComponent } from '../../form/input-field';
import { VlSelectComponent } from '../../form/select';
import { VlPagerComponent } from '../pager';
import { VlSearchFilterComponent } from '../search-filter';
import { VlSearchResultComponent } from '../search-result';
import { RichData, VlRichData } from './vl-rich-data.component';

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
describe('cypress-component - block components - vl-rich-data', () => {
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
            .find('#bounds')
            .children('strong')
            .then((child) => {
                expect(child[0]).to.contain('1-5');
            });
        cy.get('vl-pager').shadow().find('li[data-pager-page=2]').click({ force: true });
        cy.get('vl-pager')
            .shadow()
            .find('#bounds')
            .children('strong')
            .then((child) => {
                expect(child[0]).to.contain('6-10');
            });
    });

    it('should reflect the live pager page in the data property after a page change', () => {
        cy.get('vl-rich-data').then(($el) => {
            ($el[0] as VlRichData).data = {
                data: [],
                paging: { currentPage: 1, totalPages: 5, itemsPerPage: 5, totalItems: 25 },
            };
        });

        cy.get('vl-pager').shadow().find('li[data-pager-page=2]').click({ force: true });

        cy.get('vl-rich-data').then(($el) => {
            expect((($el[0] as VlRichData).data as RichData).paging?.currentPage).to.equal(2);
        });
    });
});

describe('cypress-component - block components - vl-rich-data - with vl-search-filter', () => {
    const mockDefaultFilterMaxWidth = Math.floor(1280 / 3);
    const mockFilterMaxWidth = '500px';

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
        cy.viewport(1600, 1200);
        cy.injectAxe();

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data')
            .shadow()
            .find('#search')
            .then((search) => {
                expect(Math.floor(search.width() || 0)).to.equal(mockDefaultFilterMaxWidth);
            });

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-rich-data').shadow().find('#search').shouldHaveComputedStyle({ style: 'width', value: 'auto' });
        cy.checkA11y('vl-search-filter');

        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.checkA11y('vl-search-filter');
        cy.get('vl-rich-data')
            .shadow()
            .find('#search')
            .then((search) => {
                expect(Math.floor(search.width() || 0)).to.equal(mockDefaultFilterMaxWidth);
            });
    });

    it('should be able to close the search filter using the escape key when closable', () => {
        cy.viewport(1024, 768);
        cy.injectAxe();

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.checkA11y('vl-search-filter');
    });

    it('should not close the search filter using the escape key when not closable', () => {
        cy.viewport(1024, 768);
        cy.injectAxe();

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.checkA11y('vl-search-filter');
    });

    it('should close the search filter using the escape key without closable attribute in mobile', () => {
        cy.viewport(375, 667);
        cy.injectAxe();

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        cy.get('vl-rich-data').invoke('removeAttr', 'filter-closable');
        cy.get('#filterOpId').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.checkA11y('vl-search-filter');
    });

    it('should be able to set a filter-max-width value', () => {
        cy.viewport(1600, 1200);
        cy.get('vl-rich-data')
            .shadow()
            .find('#search')
            .then((search) => {
                expect(Math.floor(search.width() || 0)).to.equal(mockDefaultFilterMaxWidth);
            });
        cy.get('vl-rich-data').invoke('attr', 'filter-max-width', mockFilterMaxWidth);
        cy.get('vl-rich-data')
            .shadow()
            .find('#search')
            .shouldHaveComputedStyle({ style: 'width', value: mockFilterMaxWidth });
    });
});

describe('cypress-component - block components - vl-rich-data - mobile filter behavior', () => {
    const mountWithFilter = (filterClosable = false) => {
        cy.mount(html`
            <vl-rich-data ?filter-closable=${filterClosable}>
                <vl-search-filter slot="filter">
                    <form>
                        <div>
                            <vl-form-label for="filterInput" label="Project id" light></vl-form-label>
                            <vl-input-field id="filterInput" type="text" name="id" block></vl-input-field>
                        </div>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
                <div slot="content">Content</div>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data>
        `);
    };

    it('should hide the search column on mobile on page load without filter-closable', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-u-hidden--s');
    });

    it('should hide the search column on mobile on page load with filter-closable', () => {
        cy.viewport(375, 667);
        mountWithFilter(true);

        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-u-hidden--s');
    });

    it('should show the search filter when the open button is clicked on mobile', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data').shadow().find('#search').should('have.class', 'vl-u-hidden--s');

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    });

    it('should hide the search filter after submitting the form on mobile', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');

        cy.get('vl-search-filter').find('form').submit();

        cy.get('vl-search-filter').should('have.attr', 'hidden');
    });

    it('should show the search filter inline on desktop without filter-closable', () => {
        cy.viewport(1280, 800);
        mountWithFilter(false);

        cy.get('vl-rich-data').shadow().find('#search').should('not.have.attr', 'hidden');
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    });

    const mobileFilterButton = () =>
        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').shadow().find('button');

    it('should expose the mobile filter button as a dialog trigger without aria-expanded', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        mobileFilterButton().should('have.attr', 'aria-haspopup', 'dialog').and('not.have.attr', 'aria-expanded');

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        mobileFilterButton().should('have.attr', 'aria-haspopup', 'dialog').and('not.have.attr', 'aria-expanded');

        cy.get('vl-search-filter').find('form').submit();
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        mobileFilterButton().should('have.attr', 'aria-haspopup', 'dialog').and('not.have.attr', 'aria-expanded');

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('#filterInput').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        mobileFilterButton().should('have.attr', 'aria-haspopup', 'dialog').and('not.have.attr', 'aria-expanded');
    });

    it('should expose the opened mobile filter as a named dialog', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);
        cy.injectAxe();

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('have.attr', 'role', 'dialog').and('have.attr', 'aria-label', 'Filter');
        cy.checkA11y('vl-rich-data');

        cy.get('#filterInput').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-search-filter').invoke('attr', 'mobile-modal-title', 'Filteren');
        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('have.attr', 'role', 'dialog').and('have.attr', 'aria-label', 'Filteren');
    });

    it('should remove the dialog role when resizing back to desktop', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('have.attr', 'role', 'dialog');

        // Enkel de resize-handler van vl-rich-data: een echte viewportwissel na het openen laat de renderer van
        // Cypress crashen, ook zonder deze wijziging (ResizeObserver van vl-search-filter).
        cy.window().then((win) => {
            cy.stub(win, 'innerWidth').value(1280);
            win.dispatchEvent(new Event('resize'));
        });

        cy.get('vl-search-filter').should('not.have.attr', 'role');
        cy.get('vl-search-filter').should('not.have.attr', 'aria-label');
    });

    const mountWithOwnFilterSemantics = () => {
        cy.mount(html`
            <vl-rich-data>
                <vl-search-filter slot="filter" role="search" aria-label="Projecten filteren">
                    <form>
                        <vl-input-field id="filterInput" type="text" name="id" block></vl-input-field>
                        <footer>
                            <vl-button type="submit">Zoeken</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
                <div slot="content">Content</div>
            </vl-rich-data>
        `);
    };

    const resizeToDesktop = () =>
        cy.window().then((win) => {
            cy.stub(win, 'innerWidth').value(1280);
            win.dispatchEvent(new Event('resize'));
        });

    it('should keep the own role and aria-label of the filter when resizing on desktop', () => {
        cy.viewport(1280, 800);
        mountWithOwnFilterSemantics();

        cy.window().then((win) => win.dispatchEvent(new Event('resize')));

        cy.get('vl-search-filter').should('have.attr', 'role', 'search');
        cy.get('vl-search-filter').should('have.attr', 'aria-label', 'Projecten filteren');
    });

    it('should restore the own role and aria-label of the filter after the mobile dialog', () => {
        cy.viewport(375, 667);
        mountWithOwnFilterSemantics();

        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('have.attr', 'role', 'dialog').and('have.attr', 'aria-label', 'Filter');

        resizeToDesktop();

        cy.get('vl-search-filter').should('have.attr', 'role', 'search');
        cy.get('vl-search-filter').should('have.attr', 'aria-label', 'Projecten filteren');
    });

    // document.activeElement stopt aan de eerste shadow host
    const deepActiveElement = () =>
        cy.document().then((document) => {
            let active = document.activeElement;
            while (active?.shadowRoot?.activeElement) {
                active = active.shadowRoot.activeElement;
            }
            return Cypress.$(active ?? []);
        });

    const hostIdOfFocusedElement = () =>
        cy.document().then((document) => {
            let active = document.activeElement;
            while (active?.shadowRoot?.activeElement) {
                active = active.shadowRoot.activeElement;
            }
            return (active?.getRootNode() as ShadowRoot).host?.id;
        });

    const closeButton = () => cy.get('vl-search-filter').shadow().find('#close-mobile-modal-button');
    const openMobileFilter = () => {
        cy.get('vl-rich-data').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    };

    it('should expose the opened mobile filter as a modal dialog only while it is open', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-search-filter').should('not.have.attr', 'aria-modal');
        openMobileFilter();
        cy.get('vl-search-filter').should('have.attr', 'aria-modal', 'true');

        cy.get('#filterInput').shadow().find('input').type('{esc}', { force: true });
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-search-filter').should('not.have.attr', 'aria-modal');

        openMobileFilter();
        cy.get('vl-search-filter').should('have.attr', 'aria-modal', 'true');
        cy.get('vl-search-filter').find('form').submit();
        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-search-filter').should('not.have.attr', 'aria-modal');
    });

    it('should move the focus from the last element to the close button with Tab in the mobile filter', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);
        openMobileFilter();

        cy.get('vl-search-filter vl-button[type="reset"]').shadow().find('button').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        hostIdOfFocusedElement().should('equal', 'close-mobile-modal-button');
    });

    it('should move the focus from the close button to the last element with Shift+Tab in the mobile filter', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);
        openMobileFilter();

        closeButton().shadow().find('button').focus();
        // cy.press kent geen Shift; een keydown met shiftKey volstaat voor de trap, die de focus zelf verplaatst
        deepActiveElement().then(([active]) => {
            active?.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Tab',
                    shiftKey: true,
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                })
            );
        });

        deepActiveElement().should(([active]) => {
            expect((active?.getRootNode() as ShadowRoot).host?.getAttribute('type')).to.equal('reset');
        });
    });

    it('should close the mobile filter with the close button and return the focus to the filter button', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);
        cy.injectAxe();
        openMobileFilter();

        closeButton().shadow().find('button').should('have.attr', 'aria-label', 'Filter sluiten');
        cy.checkA11y('vl-rich-data');
        closeButton().click();

        cy.get('vl-search-filter').should('have.attr', 'hidden');
        cy.get('vl-search-filter').should('not.have.attr', 'aria-modal');
        cy.get('vl-rich-data').should('have.attr', 'filter-closed');
        hostIdOfFocusedElement().should('equal', 'open-toggle-filter-button');
    });

    it('should close the mobile filter with Escape on the close button', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);
        openMobileFilter();

        closeButton().shadow().find('button').focus();
        cy.press(Cypress.Keyboard.Keys.ESC);

        cy.get('vl-search-filter').should('have.attr', 'hidden');
        hostIdOfFocusedElement().should('equal', 'open-toggle-filter-button');
    });

    it('should not show a close button in the filter on desktop', () => {
        cy.viewport(1280, 800);
        mountWithFilter(true);

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
        closeButton().should('not.exist');
        cy.get('vl-search-filter').should('not.have.attr', 'aria-modal');
    });

    it('should keep aria-expanded on the desktop toggle button', () => {
        cy.viewport(1280, 800);
        mountWithFilter(true);

        const toggleButton = () =>
            cy.get('vl-rich-data').shadow().find('#toggle-filter-button').shadow().find('button');

        toggleButton().should('have.attr', 'aria-expanded', 'true').and('not.have.attr', 'aria-haspopup');
        cy.get('vl-rich-data').shadow().find('#toggle-filter-button').click();
        toggleButton().should('have.attr', 'aria-expanded', 'false').and('not.have.attr', 'aria-haspopup');
    });
});

describe('cypress-component - block components - vl-rich-data - with vl-select', () => {
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
