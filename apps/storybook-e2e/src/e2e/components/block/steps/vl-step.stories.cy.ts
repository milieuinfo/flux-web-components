const stepDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-step--step-default&viewMode=story';

describe('cypress-e2e - block components - vl-step - default story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepDefaultUrl);
        cy.get('vl-step').shadow();
    });
});
