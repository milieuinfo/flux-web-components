const radioGroupDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-radio-group--radio-group-default&viewMode=story';

describe('cypress-e2e - form components - vl-radio-group - default story', () => {
    it('should render', () => {
        cy.visit(radioGroupDefaultUrl);

        cy.get('vl-radio-group').shadow();
    });
});

describe('cypress-e2e - form components - vl-radio-group - block control', () => {
    it('should pass block to every vl-radio', () => {
        cy.visit(`${radioGroupDefaultUrl}&args=block:!true`);

        cy.get('vl-radio-group').should('have.attr', 'block');
        cy.get('vl-radio').each(($radio) => {
            cy.wrap($radio).should('have.attr', 'block');
        });
    });

    it('should not set block without the control', () => {
        cy.visit(radioGroupDefaultUrl);

        cy.get('vl-radio-group').should('not.have.attr', 'block');
        cy.get('vl-radio').each(($radio) => {
            cy.wrap($radio).should('not.have.attr', 'block');
        });
    });
});
