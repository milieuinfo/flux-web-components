const titleDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-title--title-default&viewMode=story';
const titleAppearanceUrl =
    'http://localhost:8080/iframe.html?id=components-atom-title--title-appearance&viewMode=story';
const titleUnderlineUrl = 'http://localhost:8080/iframe.html?id=components-atom-title--title-underline&viewMode=story';
const titleNoSpaceBottomUrl =
    'http://localhost:8080/iframe.html?id=components-atom-title--title-no-space-bottom&viewMode=story';
const titleAltUrl = 'http://localhost:8080/iframe.html?id=components-atom-title--title-alt&viewMode=story';

describe('cypress-e2e - atom components - vl-title - default story', () => {
    it('should render', () => {
        cy.visit(titleDefaultUrl);

        cy.get('vl-title').shadow();
    });
});

describe('cypress-e2e - atom components - vl-title - appearance story', () => {
    it('should render', () => {
        cy.visit(titleAppearanceUrl);

        cy.get('vl-title').shadow();
    });
});

describe('cypress-e2e - atom components - vl-title - underline story', () => {
    it('should render', () => {
        cy.visit(titleUnderlineUrl);

        cy.get('vl-title').shadow();
    });
});

describe('cypress-e2e - atom components - vl-title - no-space-bottom story', () => {
    it('should render', () => {
        cy.visit(titleNoSpaceBottomUrl);

        cy.get('vl-title').shadow();
    });
});

describe('cypress-e2e - atom components - vl-title - alt story', () => {
    it('should render', () => {
        cy.visit(titleAltUrl);

        cy.get('vl-title').shadow();
    });
});
