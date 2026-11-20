const prozaMessagePreloaderDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message-proza-message-preloader--proza-message-preloader-default&viewMode=story';

describe('cypress-e2e - block components - vl-proza-message-preloader - default story', () => {
    it('should display preloaded Proza messages', () => {
        cy.visit(prozaMessagePreloaderDefaultUrl);

        cy.get('vl-proza-message[code=inline]').shadow().contains('Inline');
        cy.get('vl-proza-message[code=block]').shadow().contains('Lorem ipsum');
        cy.get('vl-proza-message[code=action]').shadow().contains('Action');
    });

    it('should render the block message as a paragraph', () => {
        cy.visit(prozaMessagePreloaderDefaultUrl);

        cy.get('vl-proza-message[code=block]')
            .shadow()
            .find('vl-typography')
            .shadow()
            .find('p')
            .should('contain.text', 'Lorem ipsum');
    });
});
