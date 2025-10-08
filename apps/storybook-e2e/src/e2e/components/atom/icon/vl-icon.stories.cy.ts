const iconDefaultUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-default&viewMode=story';
const iconSmallUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-small&viewMode=story';
const iconLargeUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-large&viewMode=story';
const iconLightUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-light&viewMode=story';
const iconLabelUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-label&viewMode=story';
const iconBeforeTextUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-before-text&viewMode=story';
const iconAfterTextUrl = 'http://localhost:8080/iframe.html?id=components-atom-icon--icon-after-text&viewMode=story';

describe('cypress-e2e - atom components - vl-icon - default story', () => {
    it('should render', () => {
        cy.visit(iconDefaultUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - small story', () => {
    it('should render', () => {
        cy.visit(iconSmallUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - large story', () => {
    it('should render', () => {
        cy.visit(iconLargeUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - light story', () => {
    it('should render', () => {
        cy.visit(iconLightUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - label story', () => {
    it('should render', () => {
        cy.visit(iconLabelUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - before text story', () => {
    it('should render', () => {
        cy.visit(iconBeforeTextUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});

describe('cypress-e2e - atom components - vl-icon - after text story', () => {
    it('should render', () => {
        cy.visit(iconAfterTextUrl);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });
});
