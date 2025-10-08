import { VlAlertClosedEvent } from './vl-alert.model';
import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlAlert } from './vl-alert.component';

registerWebComponents([VlAlert]);

describe('cypress-component - block components - vl-alert', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-alert data-cy="alert" icon="warning" title="Lorem ipsum" size="" type="error" closable="">
                <p>
                    Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio.
                    Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.
                </p>
            </vl-alert>
        `);
    });

    it('should mount', () => {
        cy.get('vl-alert');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-alert');
    });

    it('should contain a title', () => {
        cy.get('vl-alert').shadow().find('#alert').should('have.class', 'vl-alert').contains('Lorem ipsum');
    });

    it('should contain a text', () => {
        cy.get('vl-alert')
            .find('p')
            .contains(
                'Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.'
            );
    });

    it('should contain an icon', () => {
        cy.get('vl-alert').shadow().find('.vl-alert__icon > span.vl-icon--warning');
    });

    it('should contain a close button', () => {
        cy.get('vl-alert').shadow().find('#close').should('have.class', 'vl-alert__close');
    });

    it('should change icon', () => {
        cy.get('vl-alert').invoke('attr', 'icon', 'check');
        cy.get('vl-alert').shadow().find('.vl-alert__icon > span.vl-icon--check');
    });

    it('should be removed after clicking the close button and send a VlAlertClosedEvent', () => {
        cy.createStubForEvent('vl-alert', VlAlertClosedEvent.eventType);
        cy.get('vl-alert').shadow().find('#close').click();
        cy.get('vl-alert').should('not.exist');
        cy.get('@' + VlAlertClosedEvent.eventType).should('have.been.calledOnce');
    });

    it('should show the title using the title slot', () => {
        const titleText = 'Title from slot';

        cy.get('vl-alert').then(($alert) => {
            const shadowRoot = $alert[0].shadowRoot;
            const title = document.createElement('span');

            title.innerText = titleText;
            title.setAttribute('slot', 'title');
            $alert[0].appendChild(title);

            const titleElement = (
                shadowRoot?.querySelector('slot[name=title]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;
            expect(titleElement.innerText).to.equal(titleText);
        });
    });

    it('should show the button in the actions slot', () => {
        const buttonText = 'Button text';

        cy.get('vl-alert').then(($alert) => {
            const shadowRoot = $alert[0].shadowRoot;
            const button = document.createElement('button');

            button.innerText = buttonText;
            button.setAttribute('slot', 'actions');
            $alert[0].appendChild(button);

            const actionsElement = (
                shadowRoot?.querySelector('slot[name=actions]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;
            expect(actionsElement.innerText).to.equal(buttonText);
        });
    });
});

describe('cypress-component - block components - vl-alert - naked', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-alert
                data-cy="alert"
                icon="warning"
                title="Lorem ipsum"
                size=""
                type="error"
                closable=""
                naked="true"
                message="Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum."
            >
            </vl-alert>
        `);
    });
    it('should mount', () => {
        cy.get('vl-alert');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-alert');
    });

    it('should contain a marked title', () => {
        cy.get('vl-alert')
            .shadow()
            .find('#alert')
            .should('have.class', 'vl-alert')
            .find('slot')
            .should('have.class', 'vl-u-mark--error')
            .contains('Lorem ipsum');
    });

    it('should contain marked text', () => {
        cy.get('vl-alert')
            .shadow()
            .find('#alert #message > p')
            .should('have.class', 'vl-u-mark--error')
            .contains(
                'Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.'
            );
    });

    it('should change the title marking', () => {
        cy.get('vl-alert').invoke('attr', 'type', 'success');
        cy.get('vl-alert')
            .shadow()
            .find('#alert slot')
            .should('have.class', 'vl-u-mark--success')
            .contains('Lorem ipsum');
    });

    it('should change the text marking', () => {
        cy.get('vl-alert').invoke('attr', 'type', 'success');
        cy.get('vl-alert')
            .shadow()
            .find('#alert #message > p')
            .should('have.class', 'vl-u-mark--success')
            .contains(
                'Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.'
            );
    });

    it('should contain an icon', () => {
        cy.get('vl-alert').shadow().find('.vl-alert__icon > span.vl-icon--warning');
    });
});
