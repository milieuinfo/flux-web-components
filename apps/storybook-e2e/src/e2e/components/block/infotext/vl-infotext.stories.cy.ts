const infotextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-default&viewMode=story';
const infotextBadgeUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-badge&viewMode=story';
const infotextLinkUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-link&viewMode=story';

describe('cypress-e2e - block components - vl-infotext - default story', () => {
    it('should render', () => {
        cy.visit(infotextDefaultUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('cypress-e2e - block components - vl-infotext - badge story', () => {
    it('should render', () => {
        cy.visit(infotextBadgeUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('cypress-e2e - block components - vl-infotext - link story', () => {
    it('should render', () => {
        cy.visit(infotextLinkUrl);

        cy.get('vl-infotext').shadow();
    });
});
