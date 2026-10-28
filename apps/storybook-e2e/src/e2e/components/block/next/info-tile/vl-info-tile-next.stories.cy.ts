const infoTileNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-info-tile--info-tile-default&viewMode=story';
const infoTileNextToggleableUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-info-tile--info-tile-toggleable&viewMode=story';
const infoTileNextClickableUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-info-tile--info-tile-clickable&viewMode=story';

describe('cypress-e2e - block components - vl-info-tile-next - default story', () => {
    it('should render the default story', () => {
        cy.visit(infoTileNextDefaultUrl);
        cy.get('vl-info-tile-next').shadow().find('.info-tile__title').should('exist');
    });

    it('should be accessible in the default story', () => {
        cy.visit(infoTileNextDefaultUrl);
        cy.get('vl-info-tile-next').should('exist');
        cy.injectAxe();
        cy.checkA11y('vl-info-tile-next');
    });
});

describe('cypress-e2e - block components - vl-info-tile-next - toggleable story', () => {
    it('should open and close the toggleable story', () => {
        cy.visit(infoTileNextToggleableUrl);
        cy.get('vl-info-tile-next').shadow().find('button#trigger').click();
        cy.get('vl-info-tile-next').should('have.attr', 'open');
        cy.get('vl-info-tile-next').shadow().find('button#trigger').click();
        cy.get('vl-info-tile-next').should('not.have.attr', 'open');
    });

    it('should be accessible in the toggleable story', () => {
        cy.visit(infoTileNextToggleableUrl);
        cy.get('vl-info-tile-next').should('exist');
        cy.injectAxe();
        cy.checkA11y('vl-info-tile-next');
    });
});

describe('cypress-e2e - block components - vl-info-tile-next - clickable story', () => {
    it('should render a clickable button with an accessible name', () => {
        cy.visit(infoTileNextClickableUrl);
        cy.get('vl-info-tile-next')
            .shadow()
            .find('button.info-tile__clickable')
            .should('have.attr', 'aria-label', 'detail pagina Broos Deprez openen');
    });
});
