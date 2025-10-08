const titleDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-title--title-default&viewMode=story';

describe('cypress-e2e - atom components - vl-title - default story', () => {
    it('should render', () => {
        cy.visit(titleDefaultUrl);

        cy.get('vl-title').shadow();
    });
});
