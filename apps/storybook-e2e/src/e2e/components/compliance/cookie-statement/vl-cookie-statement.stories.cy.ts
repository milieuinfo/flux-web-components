const cookieStatementUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-cookie-statement--cookie-statement-default&viewMode=story';

const cookieStatementHeaderSlotUrl =
    'http://localhost:8080/iframe.html?args=&id=components-compliance-cookie-statement--cookie-statement-header-slot&viewMode=story';

describe('story vl-cookie-statement - default', () => {
    it('should display story', () => {
        cy.visit(cookieStatementUrl);
        cy.get('vl-cookie-statement').shadow();
    });
});

describe('story vl-cookie-statement - header slot', () => {
    it('should have replace default header with custom header', () => {
        cy.visit(cookieStatementHeaderSlotUrl);

        cy.get('vl-cookie-statement').find('vl-functional-header').shadow().find('slot[name="back"]').contains('Start');
    });
});
