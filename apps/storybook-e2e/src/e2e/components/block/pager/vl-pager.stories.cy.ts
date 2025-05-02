const pagerUrl = 'http://localhost:8080/iframe.html?id=components-block-pager--pager-default&viewMode=story';
const pagerSinglePageUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-pager--pager-single-page&viewMode=story';

describe('story vl-pager', () => {
    it('should be able to go to the next page', () => {
        cy.visit(`${pagerUrl}`);

        // Check page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('1-7');

        // Check if previous link is hidden
        cy.getDataCy('pager').shadow().find('#page-back-list-item').should('have.attr', 'hidden');

        // Go to next page
        cy.getDataCy('pager').shadow().find('#page-forward-link').click();

        // Check if previous link is shown now
        cy.getDataCy('pager').shadow().find('#page-back-list-item').should('not.have.attr', 'hidden');

        // Check updated page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('8-14');

        // Go to next page
        cy.getDataCy('pager').shadow().find('#page-forward-link').click();

        // Check updated page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('15-21');

        // Go to previous page
        cy.getDataCy('pager').shadow().find('#page-back-link').click().click();

        // Check updated page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('1-7');

        // Check if previous link is hidden again
        cy.getDataCy('pager').shadow().find('#page-back-list-item').should('have.attr', 'hidden');
    });

    it('should be able to see the total number of results', () => {
        cy.visit(`${pagerUrl}`);

        // Check page range
        cy.getDataCy('pager').shadow().find('#bounds').contains('van 50');
    });

    it('should contain a centered pager', () => {
        cy.visit(`${pagerUrl}&args=alignCenter:true`);

        // Check page range
        cy.getDataCy('pager').shadow().find('.vl-pager').should('have.class', 'vl-pager--align-center');
    });

    it('should contain a right aligned pager', () => {
        cy.visit(`${pagerUrl}&args=alignRight:true`);

        // Check page range
        cy.getDataCy('pager').shadow().find('.vl-pager').should('have.class', 'vl-pager--align-right');
    });

    it('should be able to navigate to another page when the pagination is disabled ', () => {
        cy.visit(`${pagerUrl}&args=paginationDisabled:true`);

        // Check page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('1-7');

        // Check if previous link is hidden
        cy.getDataCy('pager').shadow().find('#page-back-list-item').should('have.attr', 'hidden');

        // Go to next page
        cy.getDataCy('pager').shadow().find('#page-forward-link').click();

        // Check if previous link is shown now
        cy.getDataCy('pager').shadow().find('#page-back-list-item').should('not.have.attr', 'hidden');

        // Check updated page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('8-14');
    });

    it('should be able to see the range and total for a single page pager', () => {
        cy.visit(pagerSinglePageUrl);

        // Check page range
        cy.getDataCy('pager').shadow().find('#bounds > strong').contains('1-10');

        // Check page range
        cy.getDataCy('pager').shadow().find('#bounds').contains('van 10');
    });
});
