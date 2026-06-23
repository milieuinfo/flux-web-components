const formDemoUrl = 'http://localhost:8080/iframe.html?id=patronen-formulier-demo--formulier-demo&viewMode=story';

describe('cypress-e2e - patronen - formulieren - form demo - default story', () => {
    it('should render', () => {
        cy.visit(formDemoUrl);

        cy.get('vl-form-demo').shadow();
    });
});
