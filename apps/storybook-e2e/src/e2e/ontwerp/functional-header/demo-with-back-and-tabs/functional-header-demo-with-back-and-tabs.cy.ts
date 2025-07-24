const demoWithBackAndTabsUrl =
    'http://localhost:8080/iframe.html?id=ontwerp-functional-header-voorbeeld-met-back-en-tabs--functional-header-with-back-and-tabs&viewMode=story';

describe('story - functional header met back en tabs voorbeeld', () => {
    it('should render', () => {
        cy.visit(demoWithBackAndTabsUrl);

        cy.get('vl-functional-header').shadow();
    });
});
