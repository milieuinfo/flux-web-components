import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlErrorMessageComponent } from './vl-error-message.component';

registerWebComponents([VlErrorMessageComponent]);

export const getErrorMessageTextPart = (el: Cypress.Chainable<JQuery<HTMLElement>>) => el.shadow().find('[part=text]');

describe('component - vl-error-message', () => {
    it('should mount', () => {
        cy.mount(html`<vl-error-message>Test error message</vl-error-message>`);

        cy.get('vl-error-message');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-error-message>Test error message</vl-error-message>`);
        cy.injectAxe();

        cy.checkA11y('vl-error-message');
    });

    it('should be hidden', () => {
        cy.mount(html`<vl-error-message>Test error message</vl-error-message>`);

        getErrorMessageTextPart(cy.get('vl-error-message')).should('be.hidden');
    });

    it('should be visible', () => {
        cy.mount(html`<vl-error-message show>Test error message</vl-error-message>`);

        getErrorMessageTextPart(cy.get('vl-error-message')).should('be.visible');
    });

    it('should set pre-line attribute', () => {
        cy.mount(html`<vl-error-message pre-line>Test error message</vl-error-message>`);

        cy.get('vl-error-message').shadow().find('p').should('have.css', 'white-space', 'pre-line');

        cy.get('vl-error-message').invoke('removeAttr', 'pre-line');
        cy.get('vl-error-message').shadow().find('p').should('not.have.css', 'white-space', 'pre-line');
    });

    it('should set for', () => {
        cy.mount(html`<vl-error-message for="test-input">Test error message</vl-error-message>`);

        cy.runTestFor<VlErrorMessageComponent>('vl-error-message', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.for).to.equal('test-input');
        });
    });

    it('should set state', () => {
        cy.mount(html`<vl-error-message state="missingValue">Test error message</vl-error-message>`);

        cy.runTestFor<VlErrorMessageComponent>('vl-error-message', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.state).to.equal('missingValue');
        });
    });

    it('should set content', () => {
        cy.mount(html`<vl-error-message>Test error message</vl-error-message>`);

        cy.get('vl-error-message').shadow().find('slot');
        cy.get('vl-error-message').should('have.text', 'Test error message');
    });

    it('should display validation message without slotted content', () => {
        cy.mount(html` <vl-error-message validation-message="Test validation message" show></vl-error-message> `);

        cy.get('vl-error-message')
            .shadow()
            .find('slot')
            .then((slot) => {
                const assignedNodes = slot[0].assignedNodes();
                expect(assignedNodes.length).to.equal(0);
            })
            .invoke('text')
            .should('equal', 'Test validation message');

        cy.get('vl-error-message')
            .shadow()
            .find('p')
            .should('contain.text', 'Test validation message')
            .and('be.visible');
    });

    it('should not show validation message with slotted content', () => {
        cy.mount(
            html`
                <vl-error-message validation-message="Test validation message" show>
                    custom validation message
                </vl-error-message>
            `
        );

        cy.get('vl-error-message').should('contain.text', 'custom validation message');

        cy.get('vl-error-message')
            .shadow()
            .find('slot')
            .then((slot) => {
                const assignedNodes = slot[0].assignedNodes();
                expect(assignedNodes.length).to.equal(1);
                expect(assignedNodes[0].textContent).to.contain('custom validation message');
            });
    });
});
