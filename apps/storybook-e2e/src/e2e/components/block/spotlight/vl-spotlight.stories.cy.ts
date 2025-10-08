const spotlightDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spot-light-default&viewMode=story';
const spotlightWithLinkUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-with-link&viewMode=story';
const spotlightWithNoLinkUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-no-link&viewMode=story';
const spotlightWithContentUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-with-content&viewMode=story';
const spotlightWithTextUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-with-text&viewMode=story';
const spotlightWithImageUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-with-image&viewMode=story';
const spotlightSubtitleUrl =
    'http://localhost:8080/iframe.html?id=components-block-spotlight--spotlight-with-subtitle&viewMode=story';

describe('cypress-e2e - block components - vl-spotlight - default story', () => {
    it('should render', () => {
        cy.visit(`${spotlightDefaultUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with link story', () => {
    it('should render', () => {
        cy.visit(`${spotlightWithLinkUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with no link story', () => {
    it('should render', () => {
        cy.visit(`${spotlightWithNoLinkUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with content story', () => {
    it('should render', () => {
        cy.visit(`${spotlightWithContentUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with text story', () => {
    it('should render', () => {
        cy.visit(`${spotlightWithTextUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with image story', () => {
    it('should render', () => {
        cy.visit(`${spotlightWithImageUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});

describe('cypress-e2e - block components - vl-spotlight - with subtitle story', () => {
    it('should render', () => {
        cy.visit(`${spotlightSubtitleUrl}`);

        cy.get('vl-spotlight').shadow().find('.vl-spotlight');
    });
});
