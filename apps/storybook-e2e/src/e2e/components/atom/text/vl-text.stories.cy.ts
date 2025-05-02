const textNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-default&viewMode=story';
const textNextBoldUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-bold&viewMode=story';
const textNextSuccessUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-success&viewMode=story';
const textNextWarningUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-warning&viewMode=story';
const textNextErrorUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-error&viewMode=story';
const textNextItalicUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-italic&viewMode=story';
const textNextUnderlineUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-underline&viewMode=story';
const textNextAnnotationUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-annotation&viewMode=story';
const textNextSmallUrl = 'http://localhost:8080/iframe.html?id=components-atom-text--text-small&viewMode=story';

describe('story - vl-text - default', () => {
    it('should render', () => {
        cy.visit(textNextDefaultUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - bold', () => {
    it('should render', () => {
        cy.visit(textNextBoldUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - success', () => {
    it('should render', () => {
        cy.visit(textNextSuccessUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - warning', () => {
    it('should render', () => {
        cy.visit(textNextWarningUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - error', () => {
    it('should render', () => {
        cy.visit(textNextErrorUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - italic', () => {
    it('should render', () => {
        cy.visit(textNextItalicUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - underline', () => {
    it('should render', () => {
        cy.visit(textNextUnderlineUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - annotation', () => {
    it('should render', () => {
        cy.visit(textNextAnnotationUrl);
        cy.get('vl-text').shadow().find('span');
    });
});

describe('story - vl-text - small', () => {
    it('should render', () => {
        cy.visit(textNextSmallUrl);
        cy.get('vl-text').shadow().find('span');
    });
});
