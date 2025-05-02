const infotextNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-default&viewMode=story';
const infotextNextSecondaryUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-badge&viewMode=story';
const infotextNextTertiaryUrl =
    'http://localhost:8080/iframe.html?id=components-block-infotext--infotext-link&viewMode=story';

describe('story - vl-infotext - default', () => {
    it('should render', () => {
        cy.visit(infotextNextDefaultUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('story - vl-infotext - badge', () => {
    it('should render', () => {
        cy.visit(infotextNextSecondaryUrl);

        cy.get('vl-infotext').shadow();
    });
});

describe('story - vl-infotext - link', () => {
    it('should render', () => {
        cy.visit(infotextNextTertiaryUrl);

        cy.get('vl-infotext').shadow();
    });
});
