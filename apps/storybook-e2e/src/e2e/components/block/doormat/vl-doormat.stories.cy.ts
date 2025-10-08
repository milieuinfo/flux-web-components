const doormatDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-default&viewMode=story';
const doormatAltUrl = 'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-alt&viewMode=story';
const doormatImageUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-image&viewMode=story';
const doormatGraphicUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-graphic&viewMode=story';

describe('cypress-e2e - block components - vl-doormat - default story', () => {
    it('should render', () => {
        cy.visit(doormatDefaultUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('cypress-e2e - block components - vl-doormat - alt story', () => {
    it('should render', () => {
        cy.visit(doormatAltUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('cypress-e2e - block components - vl-doormat - image story', () => {
    it('should render', () => {
        cy.visit(doormatImageUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('cypress-e2e - block components - vl-doormat - graphic story', () => {
    it('should render', () => {
        cy.visit(doormatGraphicUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});
