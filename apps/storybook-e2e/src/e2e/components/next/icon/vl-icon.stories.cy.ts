const iconNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-default&viewMode=story';
const iconNextSmallUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-small&viewMode=story';
const iconNextLargeUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-large&viewMode=story';
const iconNextLightUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-light&viewMode=story';
const iconNextClickableUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-clickable&viewMode=story';
const iconNextBeforeTextUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-before-text&viewMode=story';
const iconNextAfterTextUrl = 'http://localhost:8080/iframe.html?id=components-icon--icon-after-text&viewMode=story';

describe('story - vl-icon - default', () => {
    it('should render', () => {
        cy.visit(iconNextDefaultUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - small', () => {
    it('should render', () => {
        cy.visit(iconNextSmallUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - large', () => {
    it('should render', () => {
        cy.visit(iconNextLargeUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - light', () => {
    it('should render', () => {
        cy.visit(iconNextLightUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - clickable', () => {
    it('should render', () => {
        cy.visit(iconNextClickableUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - before text', () => {
    it('should render', () => {
        cy.visit(iconNextBeforeTextUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('story - vl-icon - after text', () => {
    it('should render', () => {
        cy.visit(iconNextAfterTextUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});
