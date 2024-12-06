describe('story vl-input-group-next', () => {
    it('should contain an input-group with button on the left', () => {
        cy.visit('http://localhost:8080/iframe.html?id=form-next-input-group--input-group-button-left&viewMode=story');
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .first()
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON-NEXT');
    });

    it('should contain an input-group with button on the right', () => {
        cy.visit('http://localhost:8080/iframe.html?id=form-next-input-group--input-group-button-right&viewMode=story');
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .first()
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD-NEXT');
    });

    it('should contain an input-group with icon on the left', () => {
        cy.visit('http://localhost:8080/iframe.html?id=form-next-input-group--input-group-icon-left&viewMode=story');
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .first()
            .shadow()
            .find('.vl-icon');

    });

    it('should contain an input-group with icon on the right', () => {
        cy.visit('http://localhost:8080/iframe.html?id=form-next-input-group--input-group-icon-right&viewMode=story');
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .eq(1) // second child
            .shadow()
            .find('.vl-icon');
    });
});
