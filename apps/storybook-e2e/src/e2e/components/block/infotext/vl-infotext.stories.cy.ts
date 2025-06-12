const infotextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-default&viewMode=story';
const infotextSecondaryUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-badge&viewMode=story';
const infotextTertiaryUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-link&viewMode=story';

describe('story - vl-infotext - default', () => {
    it('should render', () => {
        cy.visit(infotextDefaultUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('story - vl-infotext - badge', () => {
    it('should render', () => {
        cy.visit(infotextSecondaryUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('story - vl-infotext - link', () => {
    it('should render', () => {
        cy.visit(infotextTertiaryUrl);

        cy.get('vl-infotext').shadow();
    });
});
