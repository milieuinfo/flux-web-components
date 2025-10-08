const textDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-default&viewMode=story';
const textBoldUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-bold&viewMode=story';
const textSuccessUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-success&viewMode=story';
const textWarningUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-warning&viewMode=story';
const textErrorUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-error&viewMode=story';
const textItalicUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-italic&viewMode=story';
const textUnderlineUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-underline&viewMode=story';
const textAnnotationUrl =
    'http://localhost:8080/iframe.html?id=components-atom-text--text-annotation&viewMode=story';
const textSmallUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-small&viewMode=story';

describe('cypress-e2e - atom components - vl-text - default story', () => {
    it('should render', () => {
        cy.visit(textDefaultUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - bold story', () => {
    it('should render', () => {
        cy.visit(textBoldUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - success story', () => {
    it('should render', () => {
        cy.visit(textSuccessUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - warning story', () => {
    it('should render', () => {
        cy.visit(textWarningUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - error story', () => {
    it('should render', () => {
        cy.visit(textErrorUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - italic story', () => {
    it('should render', () => {
        cy.visit(textItalicUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - underline story', () => {
    it('should render', () => {
        cy.visit(textUnderlineUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - annotation story', () => {
    it('should render', () => {
        cy.visit(textAnnotationUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('cypress-e2e - atom components - vl-text - small story', () => {
    it('should render', () => {
        cy.visit(textSmallUrl);
        cy.get('vl-text').shadow().find('span');
    });
});
