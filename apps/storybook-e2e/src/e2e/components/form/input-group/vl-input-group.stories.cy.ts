describe('story vl-input-group', () => {
    it('should contain an input-group with button on the left', () => {
        cy.visit('http://localhost:8080/iframe.html?id=components-form-input-group--input-group-button-left&viewMode=story');
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .first()
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON');
    });

    it('should contain an input-group with button on the right', () => {
        cy.visit('http://localhost:8080/iframe.html?id=components-form-input-group--input-group-button-right&viewMode=story');
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .first()
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD');
    });

    it('should contain an input-group with icon on the left', () => {
        cy.visit('http://localhost:8080/iframe.html?id=components-form-input-group--input-group-icon-left&viewMode=story');
        cy.get('.vl-group').should('have.class', 'vl-group--input-group').children().first().shadow().find('.vl-icon');
    });

    it('should contain an input-group with icon on the right', () => {
        cy.visit('http://localhost:8080/iframe.html?id=components-form-input-group--input-group-icon-right&viewMode=story');
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .eq(1) // second child
            .shadow()
            .find('.vl-icon');
    });
});
