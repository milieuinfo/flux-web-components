const cookieConsentDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-cookie-consent--cookie-consent-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-cookie-consent - default story', () => {
    it('should display story', () => {
        cy.visit(cookieConsentDefaultUrl);
        cy.get('vl-cookie-consent').shadow();
    });

    it('should contain the `Cookie-toestemming`', () => {
        cy.visit(cookieConsentDefaultUrl);
        cy.get('vl-button#button-open-cookie-consent').click();
        cy.get('vl-cookie-consent').shadow().find('vl-modal').shadow().find('h2').contains('Cookie-toestemming');
    });
});
