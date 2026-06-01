import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormMessageComponent } from './vl-form-message.component';

registerWebComponents([VlFormMessageComponent]);

describe('vl-form-message - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-form-message show>Test form message</vl-form-message>
            </div>
        `);

        cy.get('vl-form-message');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('form-message-mount');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-form-message>Test form message</vl-form-message>`);
        cy.injectAxe();

        cy.checkA11y('vl-form-message');
    });

    it('should be hidden', () => {
        cy.mount(html`<vl-form-message>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message').shadow().find('.vl-form__error').should('be.hidden');
    });

    it('should be visible', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-form-message show>Test form message</vl-form-message>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('form-message-visible');
        cy.get('vl-form-message').should('be.visible');
        cy.get('vl-form-message').shadow().find('.vl-form__error').should('be.visible');
        cy.get('vl-form-message')
            .shadow()
            .find('.vl-form__error')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(210, 55, 60)' });
    });

    it('should set pre-line attribute', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-form-message pre-line show>Eerste lijn\nTweede lijn</vl-form-message>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('form-message-pre-line');
        cy.get('vl-form-message').shadow().find('p').should('have.css', 'white-space', 'pre-line');

        cy.get('vl-form-message').invoke('removeAttr', 'pre-line');
        cy.get('vl-form-message').shadow().find('p').should('not.have.css', 'white-space', 'pre-line');
    });

    it('should set for', () => {
        cy.mount(html`<vl-form-message for="test-input">Test form message</vl-form-message>`);

        cy.runTestFor<VlFormMessageComponent>('vl-form-message', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.for).to.equal('test-input');
        });
    });

    it('should set state', () => {
        cy.mount(html`<vl-form-message state="missingValue">Test form message</vl-form-message>`);

        cy.runTestFor<VlFormMessageComponent>('vl-form-message', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.state).to.equal('missingValue');
        });
    });

    it('should render error variant by default', () => {
        cy.mount(html`<vl-form-message show>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('p').should('have.class', 'vl-form__error');
        cy.get('vl-form-message').shadow().find('p').should('not.have.class', 'vl-form__success');
        cy.get('vl-form-message').shadow().find('p').should('not.have.class', 'vl-form__annotation');
    });

    it('should render success variant', () => {
        cy.mount(html`<vl-form-message variant="success" show>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('p').should('have.class', 'vl-form__success');
        cy.get('vl-form-message').shadow().find('p').should('not.have.class', 'vl-form__error');
        cy.get('vl-form-message').shadow().find('.vl-form__success').should('be.visible');
    });

    it('should render the success style for state="valid"', () => {
        cy.mount(html`<vl-form-message state="valid" show>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('p').should('have.class', 'vl-form__success');
        cy.get('vl-form-message').shadow().find('p').should('not.have.class', 'vl-form__error');
        cy.get('vl-form-message').shadow().find('.vl-form__success').should('be.visible');
    });

    it('should render annotation variant', () => {
        cy.mount(html`<vl-form-message variant="annotation" show>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('p').should('have.class', 'vl-form__annotation');
        cy.get('vl-form-message').shadow().find('p').should('not.have.class', 'vl-form__error');
        cy.get('vl-form-message').shadow().find('.vl-form__annotation').should('be.visible');
    });

    it('should always show an annotation message even without the show attribute', () => {
        cy.mount(html`<vl-form-message variant="annotation">Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('.vl-form__annotation').should('be.visible');
    });
});

describe('vl-form-message - content & validation', () => {
    it('should set content', () => {
        cy.mount(html`<vl-form-message>Test form message</vl-form-message>`);

        cy.get('vl-form-message').shadow().find('slot');
        cy.get('vl-form-message').should('have.text', 'Test form message');
    });

    it('should display validation message without slotted content', () => {
        cy.mount(html` <vl-form-message validation-message="Test validation message" show></vl-form-message> `);

        cy.get('vl-form-message')
            .shadow()
            .find('slot')
            .then((slot) => {
                const assignedNodes = slot[0].assignedNodes();
                expect(assignedNodes.length).to.equal(0);
            })
            .invoke('text')
            .should('equal', 'Test validation message');

        cy.get('vl-form-message')
            .shadow()
            .find('p')
            .should('contain.text', 'Test validation message')
            .and('be.visible');
    });

    it('should not show validation message with slotted content', () => {
        cy.mount(
            html`
                <vl-form-message validation-message="Test validation message" show>
                    custom validation message
                </vl-form-message>
            `
        );

        cy.get('vl-form-message').should('contain.text', 'custom validation message');

        cy.get('vl-form-message')
            .shadow()
            .find('slot')
            .then((slot) => {
                const assignedNodes = slot[0].assignedNodes();
                expect(assignedNodes.length).to.equal(1);
                expect(assignedNodes[0].textContent).to.contain('custom validation message');
            });
    });

    it('should expose a polite aria-live region so screen readers announce changes', () => {
        cy.mount(html`<vl-form-message validation-message="msg"></vl-form-message>`);
        cy.get('vl-form-message')
            .shadow()
            .find('[role="status"]')
            .should('have.attr', 'aria-live', 'polite')
            .and('have.attr', 'aria-atomic', 'true');
    });
});
