const sideNavigationNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-default&viewMode=story';
const sideNavigationNextCompactUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-compact&viewMode=story';
const sideNavigationNextCustomTocUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation--side-navigation-with-custom-toc&viewMode=story';

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

describe('cypress-e2e - block components - vl-side-navigation-next - scroll offset', () => {
    it('should apply scroll-margin-top on heading targets (auto-generated TOC)', () => {
        cy.visit(sideNavigationNextDefaultUrl);

        cy.window().then((win) => {
            cy.get('#content-1-heading').then(($heading) => {
                expect(win.getComputedStyle($heading[0]).scrollMarginTop).to.equal('50px');
            });
        });
    });

    it('should apply scroll-margin-top on heading targets (custom TOC)', () => {
        cy.visit(sideNavigationNextCustomTocUrl);

        cy.window().then((win) => {
            cy.get('#custom-intro').then(($heading) => {
                expect(win.getComputedStyle($heading[0]).scrollMarginTop).to.equal('50px');
            });
        });
    });
});
