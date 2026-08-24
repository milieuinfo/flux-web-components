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

    it('should render multiline message from the message attribute', () => {
        const multilineMessage = 'Folder D is in gebruik\nFolder F is in gebruik\nFolder G is in gebruik';

        cy.get('vl-alert').invoke('attr', 'multiline', true);
        cy.get('vl-alert').invoke('attr', 'message', multilineMessage);

        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert')
            .shadow()
            .find('#alert #message > p')
            .then(($message) => {
                expect($message.text()).to.equal(multilineMessage);
                expect(getComputedStyle($message[0]).whiteSpace).to.equal('pre-line');
            });
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

describe('cypress-component - block components - vl-alert - alert-role', () => {
    it('should have role alert by default', () => {
        cy.mount(html`<vl-alert title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'role', 'alert');
        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'aria-labelledby');
        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'aria-describedby');
    });

    it('should not have a role when alert-role is no-role', () => {
        cy.mount(html`<vl-alert alert-role="no-role" title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'role');
    });

    it('should have role alertdialog with a name and a description when alert-role is alertdialog', () => {
        cy.mount(html`
            <vl-alert alert-role="alertdialog" title="Lorem ipsum">
                <p>Ipsum dolor sit amet.</p>
                <button slot="actions">Bevestigen</button>
            </vl-alert>
        `);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'role', 'alertdialog');
        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-labelledby', 'title');
        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-describedby', 'message');
    });

    it('should not reference the title when there is no title', () => {
        cy.mount(html`
            <vl-alert alert-role="alertdialog">
                <p>Ipsum dolor sit amet.</p>
                <button slot="actions">Bevestigen</button>
            </vl-alert>
        `);

        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'aria-labelledby');
        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-describedby', 'message');
    });

    it('should not reference the message when there is no message', () => {
        cy.mount(html`<vl-alert alert-role="alertdialog" title="Lorem ipsum"></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-labelledby', 'title');
        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'aria-describedby');
    });

    it('should reference a slotted title and the message property', () => {
        cy.mount(html`
            <vl-alert alert-role="alertdialog" message="Ipsum dolor sit amet.">
                <span slot="title">Lorem ipsum</span>
            </vl-alert>
        `);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-labelledby', 'title');
        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-describedby', 'message');
    });

    it('should reference a title that is slotted after the first render', () => {
        cy.mount(html`<vl-alert alert-role="alertdialog"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'aria-labelledby');

        cy.get('vl-alert').then(($alert) => {
            const title = document.createElement('span');
            title.setAttribute('slot', 'title');
            title.textContent = 'Lorem ipsum';
            $alert[0].appendChild(title);
        });

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'aria-labelledby', 'title');
    });

    it('should fall back to role alert for an unknown alert-role', () => {
        cy.mount(html`<vl-alert alert-role="banner" title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'role', 'alert');
    });

    it('should change the role', () => {
        cy.mount(html`<vl-alert title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').invoke('attr', 'alert-role', 'alertdialog');
        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'role', 'alertdialog');
    });

    it('should be focusable when alert-role is alertdialog', () => {
        cy.mount(html`
            <vl-alert alert-role="alertdialog" title="Lorem ipsum">
                <p>Ipsum dolor sit amet.</p>
                <button slot="actions">Bevestigen</button>
            </vl-alert>
        `);

        cy.get('vl-alert').shadow().find('#alert').should('have.attr', 'tabindex', '-1');

        cy.get('vl-alert').then(($alert) => {
            $alert[0].focus();

            expect($alert[0].shadowRoot?.activeElement?.id).to.equal('alert');
        });
    });

    it('should not be focusable for the other roles', () => {
        cy.mount(html`<vl-alert title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#alert').should('not.have.attr', 'tabindex');

        cy.get('vl-alert').then(($alert) => {
            $alert[0].focus();

            expect($alert[0].shadowRoot?.activeElement).to.equal(null);
        });
    });

    it('should be accessible as alertdialog', () => {
        cy.mount(html`
            <vl-alert alert-role="alertdialog" title="Lorem ipsum">
                <p>Ipsum dolor sit amet.</p>
                <button slot="actions">Bevestigen</button>
            </vl-alert>
        `);

        cy.injectAxe();

        cy.checkA11y('vl-alert');
    });
});

describe('cypress-component - block components - vl-alert - slots na de eerste render', () => {
    it('should show the actions slot when a button is slotted after the first render', () => {
        cy.mount(html`<vl-alert title="Lorem ipsum"><p>Ipsum dolor sit amet.</p></vl-alert>`);

        cy.get('vl-alert').shadow().find('#actions').should('have.class', 'vl-u-visually-hidden');

        cy.get('vl-alert').then(($alert) => {
            const button = document.createElement('button');
            button.setAttribute('slot', 'actions');
            button.textContent = 'Bevestigen';
            $alert[0].appendChild(button);
        });

        cy.get('vl-alert').shadow().find('#actions').should('not.have.class', 'vl-u-visually-hidden');
    });
});
