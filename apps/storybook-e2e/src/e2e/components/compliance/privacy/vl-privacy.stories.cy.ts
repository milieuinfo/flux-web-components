const privacyUrl = 'http://localhost:8080/iframe.html?id=components-compliance-privacy--privacy-default&viewMode=story';
const privacyHeaderSlotUrl =
    'http://localhost:8080/iframe.html?args=&id=components-compliance-privacy--privacy-header-slot&viewMode=story';

describe('story vl-privacy - default', () => {
    it('should display story', () => {
        cy.visit(privacyUrl);
        cy.get('vl-privacy').shadow();
    });
});

describe('story vl-privacy - header slot', () => {
    it('should have replace default header with custom header', () => {
        cy.visit(privacyHeaderSlotUrl);

        cy.get('vl-privacy').find('vl-functional-header').shadow().find('slot[name="back"]').contains('Start');
    });
});
