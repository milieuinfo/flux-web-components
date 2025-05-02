const propertiesDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-default&viewMode=story';
const propertiesWithPropsUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-with-props&viewMode=story';
const propertiesHtmlEnrichedUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-html-enriched&viewMode=story';
const propertiesCollapsedUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-collapsed&viewMode=story';
const propertiesColumnsUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-properties--properties-columns&viewMode=story';

describe('story - vl-properties - default', () => {
    it('should render', () => {
        cy.visit(propertiesDefaultUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('story - vl-properties - with props', () => {
    it('should render', () => {
        cy.visit(propertiesWithPropsUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('story - vl-properties - html enriched', () => {
    it('should render', () => {
        cy.visit(propertiesHtmlEnrichedUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('story - vl-properties - collapsed', () => {
    it('should render', () => {
        cy.visit(propertiesCollapsedUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});

describe('story - vl-properties - columns', () => {
    it('should render', () => {
        cy.visit(propertiesColumnsUrl);

        cy.get('vl-properties').shadow().find('dl');
    });
});
