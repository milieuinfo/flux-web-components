const titleNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-title--title-default&viewMode=story';

describe('story - vl-title - default', () => {
    it('should render', () => {
        cy.visit(titleNextDefaultUrl);

        cy.get('vl-title').shadow();
    });
});
