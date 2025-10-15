const accessibilityUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-accessibility--accessibility-default&viewMode=story';

const accessibilityUrlSelfEvaluated =
    'http://localhost:8080/iframe.html?id=components-compliance-accessibility--accessibility-self-evaluated&viewMode=story';

const accessibilityUrlExpertEvaluated =
    'http://localhost:8080/iframe.html?id=components-compliance-accessibility--accessibility-expert-evaluated&viewMode=story';

const accessibilityHeaderSlotUrl =
    'http://localhost:8080/iframe.html?args=&id=components-compliance-accessibility--accessibility-header-slot';

describe('story vl-accessibility - default', () => {
    it('should display story', () => {
        cy.visit(accessibilityUrl);
        cy.get('vl-accessibility').shadow();
    });
});

describe('story vl-accessibility - self evaluated', () => {
    it('should display story', () => {
        cy.visit(accessibilityUrlSelfEvaluated);
        cy.get('vl-accessibility').shadow();
        cy.get('vl-accessibility').should('have.attr', 'evaluation', 'SELF_EVALUATED');
    });
});

describe('story vl-accessibility - expert evaluated', () => {
    it('should display story', () => {
        cy.visit(accessibilityUrlExpertEvaluated);
        cy.get('vl-accessibility').shadow();
        cy.get('vl-accessibility').should('have.attr', 'evaluation', 'EXPERT_EVALUATED');
    });
});

describe('story vl-accessibility - header slot', () => {
    it('should have replaced default header with custom header', () => {
        cy.visit(accessibilityHeaderSlotUrl);

        cy.get('vl-accessibility').find('vl-functional-header').shadow().find('slot[name="back"]').contains('Start');
    });
});
