const cookieConsentUrl =
    'http://localhost:8080/iframe.html?id=sections-cookie-consent--cookie-consent-default&viewMode=story';

describe('story vl-cookie-consent - default', () => {
    it('should display story', () => {
        cy.visit(cookieConsentUrl);
        cy.get('vl-cookie-consent').shadow();
    });

    it('should contain the `Cookie-toestemming`', () => {
        cy.visit(cookieConsentUrl);

        cy.get('vl-button-next#button-open-cookie-consent').click();
        cy.get('vl-cookie-consent').shadow().find('vl-modal').shadow().find('h2').contains('Cookie-toestemming');
    });
});
