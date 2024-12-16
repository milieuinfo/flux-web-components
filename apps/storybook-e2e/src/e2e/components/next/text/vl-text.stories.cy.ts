const textNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-default&viewMode=story';
const textNextBoldUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-bold&viewMode=story';
const textNextSuccessUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-success&viewMode=story';
const textNextWarningUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-warning&viewMode=story';
const textNextErrorUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-error&viewMode=story';
const textNextItalicUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-italic&viewMode=story';
const textNextUnderlineUrl = 'http://localhost:8080/iframe.html?id=components-next-text--text-underline&viewMode=story';

describe('story - vl-text-next - default', () => {
    it('should render', () => {
        cy.visit(textNextDefaultUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - bold', () => {
    it('should render', () => {
        cy.visit(textNextBoldUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - success', () => {
    it('should render', () => {
        cy.visit(textNextSuccessUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - warning', () => {
    it('should render', () => {
        cy.visit(textNextWarningUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - error', () => {
    it('should render', () => {
        cy.visit(textNextErrorUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - italic', () => {
    it('should render', () => {
        cy.visit(textNextItalicUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});

describe('story - vl-text-next - underline', () => {
    it('should render', () => {
        cy.visit(textNextUnderlineUrl);
        cy.get('vl-text-next').shadow().find('span');
    });
});
