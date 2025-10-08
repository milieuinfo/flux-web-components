const cookieStatementDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-cookie-statement--cookie-statement-default&viewMode=story';
const cookieStatementHeaderSlotUrl =
    'http://localhost:8080/iframe.html?args=&id=components-compliance-cookie-statement--cookie-statement-header-slot&viewMode=story';

describe('cypress-e2e - compliance components - vl-cookie-statement - default story', () => {
    it('should display story', () => {
        cy.visit(cookieStatementDefaultUrl);
        cy.get('vl-cookie-statement').shadow();
    });
});

describe('cypress-e2e - compliance components - vl-cookie-statement - header slot story', () => {
    it('should have replace default header with custom header', () => {
        cy.visit(cookieStatementHeaderSlotUrl);
        cy.get('vl-cookie-statement').find('vl-functional-header').shadow().find('slot[name="back"]').contains('Start');
    });
});
