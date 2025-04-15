const linkNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-link--link-default&viewMode=story';
const linkNextBoldUrl = 'http://localhost:8080/iframe.html?id=components-link--link-bold&viewMode=story';
const linkNextSmallUrl = 'http://localhost:8080/iframe.html?id=components-link--link-small&viewMode=story';
const linkNextLargeUrl = 'http://localhost:8080/iframe.html?id=components-link--link-large&viewMode=story';
const linkNextErrorUrl = 'http://localhost:8080/iframe.html?id=components-link--link-error&viewMode=story';
const linkNextExternalUrl = 'http://localhost:8080/iframe.html?id=components-link--link-external&viewMode=story';
const linkNextIconUrl = 'http://localhost:8080/iframe.html?id=components-link--link-icon&viewMode=story';
const linkNextIconOnlyUrl = 'http://localhost:8080/iframe.html?id=components-link--link-icon-only&viewMode=story';
const linkButtonStyledAsLink =
    'http://localhost:8080/iframe.html?args=&id=components-link--button-styled-as-link&viewMode=story';

describe('story - vl-link - default', () => {
    it('should render', () => {
        cy.visit(linkNextDefaultUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - bold', () => {
    it('should render', () => {
        cy.visit(linkNextBoldUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - small', () => {
    it('should render', () => {
        cy.visit(linkNextSmallUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - large', () => {
    it('should render', () => {
        cy.visit(linkNextLargeUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - error', () => {
    it('should render', () => {
        cy.visit(linkNextErrorUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - external', () => {
    it('should render', () => {
        cy.visit(linkNextExternalUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - icon', () => {
    it('should render', () => {
        cy.visit(linkNextIconUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - icon only', () => {
    it('should render', () => {
        cy.visit(linkNextIconOnlyUrl);

        cy.get('vl-link').shadow().find('a');
    });
});

describe('story - vl-link - button styled as link', () => {
    it('should render', () => {
        cy.visit(linkButtonStyledAsLink);

        cy.get('vl-link').shadow().find('button');
    });
});
