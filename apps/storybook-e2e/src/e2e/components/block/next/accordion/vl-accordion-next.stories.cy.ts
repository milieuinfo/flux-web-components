const accordionNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-accordion--accordion-default&viewMode=story';
const accordionNextActionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-accordion--accordion-actions-slot&viewMode=story';

describe('cypress-e2e - block components - vl-accordion-next - default story', () => {
    it('should open and close the default story', () => {
        cy.visit(accordionNextDefaultUrl);
        cy.get('vl-accordion-next').shadow().find('button#trigger').should('have.attr', 'aria-expanded', 'false');

        cy.get('vl-accordion-next').shadow().find('button#trigger').click();
        cy.get('vl-accordion-next').should('have.attr', 'open');
        cy.get('vl-accordion-next').shadow().find('button#trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should be accessible in the default story', () => {
        cy.visit(accordionNextDefaultUrl);
        cy.get('vl-accordion-next').should('exist');
        cy.injectAxe();
        cy.checkA11y('vl-accordion-next');
    });
});

describe('cypress-e2e - block components - vl-accordion-next - actions slot story', () => {
    it('should render the actions in the header, next to the trigger', () => {
        cy.visit(accordionNextActionsUrl);
        cy.get('vl-accordion-next').find('[slot="actions"] vl-button').should('be.visible');
        cy.get('vl-accordion-next')
            .shadow()
            .find('[part="header"] [part="actions"] slot[name="actions"]')
            .should('exist');
    });
});
