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

describe('story - vl-text - default', () => {
    it('should render', () => {
        cy.visit(textDefaultUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - bold', () => {
    it('should render', () => {
        cy.visit(textBoldUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - success', () => {
    it('should render', () => {
        cy.visit(textSuccessUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - warning', () => {
    it('should render', () => {
        cy.visit(textWarningUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - error', () => {
    it('should render', () => {
        cy.visit(textErrorUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - italic', () => {
    it('should render', () => {
        cy.visit(textItalicUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - underline', () => {
    it('should render', () => {
        cy.visit(textUnderlineUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - annotation', () => {
    it('should render', () => {
        cy.visit(textAnnotationUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - small', () => {
    it('should render', () => {
        cy.visit(textSmallUrl);
        cy.get('vl-text').shadow().find('span');
    });
});
