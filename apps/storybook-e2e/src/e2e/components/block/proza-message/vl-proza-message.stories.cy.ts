const prozaMessageDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message--proza-message-default&viewMode=story';
const prozaMessageEditableUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message--proza-message-editable&viewMode=story';

describe('story vl-proza-message - default', () => {
    it('should display Proza messages', () => {
        cy.visit(prozaMessageDefaultUrl);

        cy.get('vl-proza-message[code=inline]').shadow().contains('Inline');
        cy.get('vl-proza-message[code=block]').shadow().contains('Lorem ipsum');
        cy.get('vl-proza-message[code=action]').shadow().contains('Action');
    });
});

describe('story vl-proza-message - editable', () => {
    it('should display Proza messages', () => {
        cy.visit(prozaMessageEditableUrl);

        cy.get('vl-proza-message[code=inline]').shadow().contains('Inline');
        cy.get('vl-proza-message[code=block]').shadow().contains('Lorem ipsum');
        cy.get('vl-proza-message[code=action]').shadow().contains('Action');
    });

    it('should display Proza action buttons', () => {
        cy.visit(prozaMessageEditableUrl);

        cy.get('vl-proza-message[code=inline]').shadow().find('#edit-button').should('exist');
        cy.get('vl-proza-message[code=inline]').shadow().find('#refresh-button').should('exist');
        cy.get('vl-proza-message[code=block]').shadow().find('#edit-button').should('exist');
        cy.get('vl-proza-message[code=block]').shadow().find('#refresh-button').should('exist');
        cy.get('vl-proza-message[code=action]').shadow().find('#edit-button').should('exist');
        cy.get('vl-proza-message[code=action]').shadow().find('#refresh-button').should('exist');
    });
});
