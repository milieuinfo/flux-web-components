const doormatDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-default&viewMode=story';
const doormatAltUrl = 'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-alt&viewMode=story';
const doormatImageUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-image&viewMode=story';
const doormatGraphicUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-graphic&viewMode=story';

describe('story - vl-doormat - default', () => {
    it('should render', () => {
        cy.visit(doormatDefaultUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - alt', () => {
    it('should render', () => {
        cy.visit(doormatAltUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - image', () => {
    it('should render', () => {
        cy.visit(doormatImageUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - graphic', () => {
    it('should render', () => {
        cy.visit(doormatGraphicUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});
