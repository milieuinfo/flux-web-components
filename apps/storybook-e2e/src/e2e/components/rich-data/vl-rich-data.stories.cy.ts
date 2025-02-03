const richDataUrl = 'http://localhost:8080/iframe.html?args=&id=components-rich-data--rich-data-pager&viewMode=story';

describe('story - vl-rich-data', () => {
    it('should render', () => {
        cy.visit(`${richDataUrl}`);

        cy.get('vl-rich-data').shadow().find('div.vl-grid-next');
        cy.get('vl-pager').shadow().find('li[id=bounds]');
    });
});
