const pageDefaultUrl = 'http://localhost:8080/iframe.html?args=&id=structures-page--page-default&viewMode=story';

describe('cypress-e2e - structures - vl-page - default story', () => {
    it('should render', () => {
        cy.visit(`${pageDefaultUrl}`);
        cy.get('vl-page').shadow().find('div.vl-page > main.vl-main-content');
        cy.getDataCy('page-content').find('vl-title[type="h1"]').contains('vl-page');
    });
});
