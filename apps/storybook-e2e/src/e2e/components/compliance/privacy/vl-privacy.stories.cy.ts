const privacyDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-privacy--privacy-default&viewMode=story';
const privacyHeaderSlotUrl =
    'http://localhost:8080/iframe.html?args=&id=components-compliance-privacy--privacy-header-slot&viewMode=story';

describe('cypress-e2e - compliance components - vl-privacy - default story', () => {
    it('should display story', () => {
        cy.visit(privacyDefaultUrl);
        cy.get('vl-privacy').shadow();
    });
});

describe('cypress-e2e - compliance components - vl-privacy - header slot story', () => {
    it('should have replace default header with custom header', () => {
        cy.visit(privacyHeaderSlotUrl);

        cy.get('vl-privacy').find('vl-functional-header').shadow().find('slot[name="back"]').contains('Start');
    });
});
