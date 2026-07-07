const sideNavigationNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-default&viewMode=story';
const sideNavigationNextCompactUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-compact&viewMode=story';
const sideNavigationNextCustomTocUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-with-custom-toc&viewMode=story';
const sideNavigationNextSectionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-with-sections&viewMode=story';

describe('cypress-e2e - block components - vl-side-navigation-next - default story', () => {
    it('should render', () => {
        cy.visit(sideNavigationNextDefaultUrl);

        cy.get('vl-side-navigation-next').shadow().find('nav');
        cy.get('vl-side-navigation-next').shadow().find('a').should('have.length.greaterThan', 0);
        cy.get('#content-1-heading').should('contain', 'Content 1');
    });
});

describe('cypress-e2e - block components - vl-side-navigation-next - compact story', () => {
    it('should render with compact attribute', () => {
        cy.visit(sideNavigationNextCompactUrl);

        cy.get('vl-side-navigation-next').should('have.attr', 'compact');
        cy.get('vl-side-navigation-next').shadow().find('nav');
        cy.get('#content-1-heading').should('contain', 'Content 1');
    });
});

describe('cypress-e2e - block components - vl-side-navigation-next - custom toc story', () => {
    it('should render', () => {
        cy.visit(sideNavigationNextCustomTocUrl);

        cy.get('vl-side-navigation-next').shadow().find('nav');
        cy.get('vl-side-navigation-next').find('vl-link').should('have.length.greaterThan', 0);
        cy.get('#custom-intro').should('contain', 'Over deze pagina');
    });

    it('should have toggle buttons for nested items', () => {
        cy.visit(sideNavigationNextCustomTocUrl);

        cy.get('vl-side-navigation-next').find('vl-button.toggle-button').should('have.length', 2);
    });

    it('should toggle nested items when clicking toggle button', () => {
        cy.visit(sideNavigationNextCustomTocUrl);

        // Initially all nested ul elements should be hidden (initialized by the component)
        cy.get('vl-side-navigation-next').find('ul > li > ul').should('have.attr', 'hidden');

        // Click the first toggle button to expand
        cy.get('vl-side-navigation-next').find('vl-button.toggle-button').first().click({force: true});

        // The first nested ul should now be visible
        cy.get('vl-side-navigation-next').find('ul > li').first().find('> ul').should('not.have.attr', 'hidden');
    });
});

describe('cypress-e2e - block components - vl-side-navigation-next - sections story', () => {
    it('should render auto and custom sections in one nav', () => {
        cy.visit(sideNavigationNextSectionsUrl);

        // One nav landmark for the whole side-navigation, not one per section
        cy.get('vl-side-navigation-next').shadow().find('nav').should('have.length', 1);
        // Auto section generates its own links
        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-section-next[type="auto"] a')
            .should('have.length.greaterThan', 0);
        // Multiple sections (auto + custom) live in the same nav
        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-section-next')
            .should('have.length.greaterThan', 1);
    });

    it('should give each section an accessible name via aria-labelledby', () => {
        cy.visit(sideNavigationNextSectionsUrl);

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-section-next ul[aria-labelledby]')
            .should('have.length.greaterThan', 0);
    });

    it('should use vl-link and vl-button for the action section', () => {
        cy.visit(sideNavigationNextSectionsUrl);

        cy.get('vl-side-navigation-next').find('vl-link').should('have.length.greaterThan', 0);
        cy.get('vl-side-navigation-next').find('vl-button').should('have.length.greaterThan', 0);
    });

    it('should keep a single drawer toggle for the whole instance', () => {
        cy.visit(sideNavigationNextSectionsUrl);

        cy.get('vl-side-navigation-next').shadow().find('#show-toc-button').should('have.length', 1);
    });
});
