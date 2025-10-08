const formDemoUrl = 'http://localhost:8080/iframe.html?id=ontwerp-form-demo--demo&viewMode=story';

describe('cypress-e2e - form - form demo - default story', () => {
    it('should render', () => {
        cy.visit(formDemoUrl);

        cy.get('vl-form-demo').shadow();
    });
});
