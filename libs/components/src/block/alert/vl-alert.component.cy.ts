import { VlAlertClosedEvent } from './vl-alert.model';
import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlAlert } from './vl-alert.component';

registerWebComponents([VlAlert]);

// de paddings staan in rem, de root font-size van de testharness bepaalt de effectieve pixelwaarde
const rem = (value: number): string => `${value * parseFloat(getComputedStyle(document.documentElement).fontSize)}px`;

const expectPaddingRight = (expected: string) => {
    cy.get('vl-alert')
        .shadow()
        .find('#alert')
        .then(($alert) => {
            expect(getComputedStyle($alert[0]).paddingRight).to.equal(expected);
        });
};

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

    it('should reserve room for the close button on the right', () => {
        expectPaddingRight(rem(4));
    });

    it('should keep its own padding without a close button', () => {
        cy.get('vl-alert').invoke('removeAttr', 'closable');
        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert')
            .shadow()
            .find('#alert')
            .then(($alert) => {
                const style = getComputedStyle($alert[0]);

                expect(style.paddingRight).to.equal(style.paddingLeft);
            });
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

    it('should reserve room for the close button on the right', () => {
        expectPaddingRight(rem(4));
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

describe('cypress-component - block components - vl-alert - banner', () => {
    const titleText = 'Juridische waarde';
    const messageText = 'De door deze toepassing gegenereerde informatie heeft geen juridische waarde.';

    const getShadowRect = ($alert: JQuery<HTMLElement>, selector: string): DOMRect =>
        ($alert[0].shadowRoot?.querySelector(selector) as HTMLElement).getBoundingClientRect();

    const expectTitleAndMessageOnSameLine = (sameLine: boolean) => {
        cy.get('vl-alert').then(($alert) => {
            const title = getShadowRect($alert, '#title');
            const message = getShadowRect($alert, '#message');

            expect(title.top < message.bottom && message.top < title.bottom).to.equal(sameLine);
        });
    };

    beforeEach(() => {
        cy.mount(html`
            <vl-alert
                data-cy="alert"
                banner
                closable
                alert-role="no-role"
                type="warning"
                icon="warning"
                title=${titleText}
            >
                <span>${messageText}</span>
            </vl-alert>
        `);
    });

    it('should mount', () => {
        cy.get('vl-alert').shadow().find('#alert').should('have.class', 'vl-alert--banner');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-alert');
    });

    it('should render without rounded corners', () => {
        cy.get('vl-alert')
            .shadow()
            .find('#alert')
            .then(($alert) => {
                expect(getComputedStyle($alert[0]).borderRadius).to.equal('0px');
            });
    });

    it('should render the title and the slotted message on the same line', () => {
        expectTitleAndMessageOnSameLine(true);
    });

    const expectSeparator = (expected: string) => {
        cy.get('vl-alert')
            .shadow()
            .find('#title')
            .then(($title) => {
                expect(getComputedStyle($title[0], '::after').content).to.equal(expected);
            });
    };

    it('should render a separator between the title and the message', () => {
        expectSeparator('" - "');
    });

    it('should not render a separator without a message', () => {
        cy.get('vl-alert').then(($alert) => {
            $alert[0].innerHTML = '';
        });
        cy.waitForLitUpdate('vl-alert');

        expectSeparator('none');
    });

    it('should not render a separator without a title', () => {
        cy.get('vl-alert').invoke('removeAttr', 'title');
        cy.waitForLitUpdate('vl-alert');

        expectSeparator('none');
    });

    it('should not render a separator without the banner attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'banner');
        cy.waitForLitUpdate('vl-alert');

        expectSeparator('none');
    });

    it('should render the title and the message attribute on the same line', () => {
        cy.get('vl-alert').invoke('attr', 'message', messageText);
        cy.waitForLitUpdate('vl-alert');

        expectTitleAndMessageOnSameLine(true);
    });

    it('should keep block level slot content on the same line', () => {
        cy.get('vl-alert').then(($alert) => {
            $alert[0].innerHTML = `<p>${messageText}</p>`;
        });
        cy.waitForLitUpdate('vl-alert');

        expectTitleAndMessageOnSameLine(true);
    });

    it('should keep the title and the message on separate lines without the banner attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'banner');
        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert').shadow().find('#alert').should('not.have.class', 'vl-alert--banner');
        expectTitleAndMessageOnSameLine(false);
    });

    it('should keep the rounded corners without the banner attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'banner');
        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert')
            .shadow()
            .find('#alert')
            .then(($alert) => {
                expect(getComputedStyle($alert[0]).borderRadius).to.not.equal('0px');
            });
    });

    it('should keep the type styling and the icon', () => {
        cy.get('vl-alert').shadow().find('#alert').should('have.class', 'vl-alert--warning');
        cy.get('vl-alert').shadow().find('.vl-alert__icon > span.vl-icon--warning');
    });

    it('should be removed after clicking the close button and send a VlAlertClosedEvent', () => {
        cy.createStubForEvent('vl-alert', VlAlertClosedEvent.eventType);
        cy.get('vl-alert').shadow().find('#close').click();

        cy.get('vl-alert').should('not.exist');
        cy.get('@' + VlAlertClosedEvent.eventType).should('have.been.calledOnce');
    });
});

describe('cypress-component - block components - vl-alert - banner small', () => {
    const expectPadding = (top: string, right: string, bottom: string, left: string) => {
        cy.get('vl-alert')
            .shadow()
            .find('#alert')
            .then(($alert) => {
                const style = getComputedStyle($alert[0]);

                expect(style.paddingTop).to.equal(top);
                expect(style.paddingRight).to.equal(right);
                expect(style.paddingBottom).to.equal(bottom);
                expect(style.paddingLeft).to.equal(left);
            });
    };

    beforeEach(() => {
        cy.viewport(1200, 400);
        cy.mount(html`
            <vl-alert
                data-cy="alert"
                banner
                size="small"
                alert-role="no-role"
                type="warning"
                icon="warning"
                title="Juridische waarde"
            >
                <span>De door deze toepassing gegenereerde informatie heeft geen juridische waarde.</span>
            </vl-alert>
        `);
    });

    it('should reduce the vertical padding and keep the horizontal padding of the small variant', () => {
        expectPadding(rem(1), rem(1.5), rem(1), rem(1.5));
    });

    it('should reserve room for the close button on the right', () => {
        cy.get('vl-alert').invoke('attr', 'closable', '');
        cy.waitForLitUpdate('vl-alert');

        expectPadding(rem(1), rem(4), rem(1), rem(1.5));
    });

    it('should keep the small padding without the banner attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'banner');
        cy.waitForLitUpdate('vl-alert');

        expectPadding(rem(1.5), rem(1.5), rem(1.5), rem(1.5));
    });

    it('should keep the banner padding without the size attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'size');
        cy.waitForLitUpdate('vl-alert');

        expectPadding(rem(1), rem(1.5), rem(1), rem(1.5));
    });

    it('should render as the small variant without the size attribute', () => {
        cy.get('vl-alert').invoke('removeAttr', 'size');
        cy.waitForLitUpdate('vl-alert');

        cy.get('vl-alert').shadow().find('#alert').should('have.class', 'vl-alert--small');
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
