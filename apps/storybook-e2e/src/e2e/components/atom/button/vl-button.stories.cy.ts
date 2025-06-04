const buttonNextPrimaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-primary&viewMode=story';
const buttonNextSecondaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-secondary&viewMode=story';
const buttonNextTertiaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-tertiary&viewMode=story';
const buttonNextDisabledUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-disabled&viewMode=story';
const buttonNextErrorUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-error&viewMode=story';
const buttonNextBlockUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-block&viewMode=story';
const buttonNextLargeUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-large&viewMode=story';
const buttonNextWideUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-wide&viewMode=story';
const buttonNextNarrowUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-narrow&viewMode=story';
const buttonNextLoadingUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-loading&viewMode=story';
const buttonNextIconUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-icon&viewMode=story';
const buttonNextIconOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-icon-only&viewMode=story';
const buttonNextToggleUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-toggle&viewMode=story';

describe('story - vl-button - default', () => {
    it('should render', () => {
        cy.visit(buttonNextPrimaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - secondary', () => {
    it('should render', () => {
        cy.visit(buttonNextSecondaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - tertiary', () => {
    it('should render', () => {
        cy.visit(buttonNextTertiaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - disabled', () => {
    it('should render', () => {
        cy.visit(buttonNextDisabledUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - error', () => {
    it('should render', () => {
        cy.visit(buttonNextErrorUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - block', () => {
    it('should render', () => {
        cy.visit(buttonNextBlockUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - large', () => {
    it('should render', () => {
        cy.visit(buttonNextLargeUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - wide', () => {
    it('should render', () => {
        cy.visit(buttonNextWideUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - narrow', () => {
    it('should render', () => {
        cy.visit(buttonNextNarrowUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - loading', () => {
    it('should render', () => {
        cy.visit(buttonNextLoadingUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - icon', () => {
    it('should render', () => {
        cy.visit(buttonNextIconUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - icon only', () => {
    it('should render', () => {
        cy.visit(buttonNextIconOnlyUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - toggle', () => {
    it('should render', () => {
        cy.visit(buttonNextToggleUrl);

        cy.get('vl-button').shadow().find('button');
    });
});
