const linkDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-default&viewMode=story';
const linkBoldUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-bold&viewMode=story';
const linkSmallUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-small&viewMode=story';
const linkLargeUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-large&viewMode=story';
const linkErrorUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-error&viewMode=story';
const linkExternalUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-external&viewMode=story';
const linkIconUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-icon&viewMode=story';
const linkIconOnlyUrl = 'http://localhost:8080/iframe.html?id=components-atom-link--link-icon-only&viewMode=story';
const linkButtonStyledAsLink =
    'http://localhost:8080/iframe.html?args=&id=components-atom-link--button-styled-as-link&viewMode=story';

describe('story - vl-link - default', () => {
    it('should render', () => {
        cy.visit(linkDefaultUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - bold', () => {
    it('should render', () => {
        cy.visit(linkBoldUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - small', () => {
    it('should render', () => {
        cy.visit(linkSmallUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - large', () => {
    it('should render', () => {
        cy.visit(linkLargeUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - error', () => {
    it('should render', () => {
        cy.visit(linkErrorUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - external', () => {
    it('should render', () => {
        cy.visit(linkExternalUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - icon', () => {
    it('should render', () => {
        cy.visit(linkIconUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - icon only', () => {
    it('should render', () => {
        cy.visit(linkIconOnlyUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - button styled as link', () => {
    it('should render', () => {
        cy.visit(linkButtonStyledAsLink);

        cy.get('vl-link').shadow().find('button');
    });
});
