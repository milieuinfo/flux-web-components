const modalNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-modal--modal-default&viewMode=story';

describe('cypress-e2e - block components - vl-modal-next - default story', () => {
    it('should open and close the modal in the default story', () => {
        cy.visit(modalNextDefaultUrl);
        cy.get('vl-modal-next').shadow().find('dialog').should('not.have.attr', 'open');
        cy.get('vl-button[modal-open="modal-default"]').click();
        cy.get('vl-modal-next').shadow().find('dialog').should('have.attr', 'open');
        cy.get('vl-modal-next').shadow().find('#modal-toggle-cancellable').click();
        cy.get('vl-modal-next').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should be accessible in the default story', () => {
        cy.visit(modalNextDefaultUrl);
        cy.get('vl-button[modal-open="modal-default"]').click();
        cy.get('vl-modal-next').shadow().find('dialog').should('have.attr', 'open');
        cy.injectAxe();
        cy.checkA11y('vl-modal-next');
    });
});
