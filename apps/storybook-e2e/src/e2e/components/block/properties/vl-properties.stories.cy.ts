const propertiesDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-default&viewMode=story';
const propertiesWithPropsUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-with-props&viewMode=story';
const propertiesHtmlEnrichedUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-html-enriched&viewMode=story';
const propertiesStackedUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-stacked&viewMode=story';
const propertiesColumnsUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-columns&viewMode=story';

describe('cypress-e2e - block components - vl-properties - default story', () => {
    it('should render', () => {
        cy.visit(propertiesDefaultUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('cypress-e2e - block components - vl-properties - with props story', () => {
    it('should render', () => {
        cy.visit(propertiesWithPropsUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('cypress-e2e - block components - vl-properties - html enriched story', () => {
    it('should render', () => {
        cy.visit(propertiesHtmlEnrichedUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('cypress-e2e - block components - vl-properties - stacked story', () => {
    it('should render', () => {
        cy.visit(propertiesStackedUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('cypress-e2e - block components - vl-properties - columns story', () => {
    it('should render', () => {
        cy.visit(propertiesColumnsUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});
