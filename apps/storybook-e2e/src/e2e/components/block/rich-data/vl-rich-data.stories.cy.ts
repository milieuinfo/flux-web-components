const richDataUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data--rich-data-pager&viewMode=story';

describe('cypress-e2e - block components - vl-rich-data - default story', () => {
    it('should render', () => {
        cy.visit(`${richDataUrl}`);

        cy.get('vl-rich-data').shadow().find('div.vl-grid');
        cy.get('vl-pager').shadow().find('#bounds');
    });
});
