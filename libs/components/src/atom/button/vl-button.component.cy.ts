import { ICON_PLACEMENT, registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { html } from 'lit';
import { VlButtonComponent } from './vl-button.component';

registerWebComponents([VlButtonComponent]);

// Cypress kan de accessible name niet opvragen; via het Chrome DevTools Protocol (enkel Chromium) krijg je de naam
// zoals de browser die berekent, inclusief de slot-content over de shadow DOM-grens heen.
const shouldHaveAccessibleName = (selector: 'button' | 'a', expectedName: string) => {
    const runnerWindow = window.top as Window & { vlButtonAxTarget?: Element };

    cy.get('vl-button')
        .shadow()
        .find(selector)
        .then(($element) => {
            runnerWindow.vlButtonAxTarget = $element[0];
        })
        .then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Runtime.evaluate',
                params: { expression: 'window.vlButtonAxTarget' },
            })
        )
        .then(({ result }) => {
            delete runnerWindow.vlButtonAxTarget;
            return Cypress.automation('remote:debugger:protocol', {
                command: 'Accessibility.getPartialAXTree',
                params: { objectId: result.objectId, fetchRelatives: false },
            });
        })
        .its('nodes.0.name.value')
        .should('equal', expectedName);
};

// Roept focus() aan op de vl-button zelf, zoals een consumer dat doet, niet op de interne knop of link. Wacht eerst op de
// eerste render: daarvoor is er nog geen intern element om de focus aan door te geven.
const callFocusOnHost = (innerElement: 'button' | 'a') => {
    cy.get('vl-button').shadow().find(innerElement).should('exist');
    cy.get('vl-button').then(($host) => $host[0].focus());
};

describe('cypress-component - atom components - vl-button', () => {
    it('should mount', () => {
        cy.mount(html` <vl-button></vl-button>`);

        cy.get('vl-button').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-button>Klik op mij</vl-button>`);
        cy.injectAxe();

        cy.checkA11y('vl-button');
    });

    it('should set disabled', () => {
        cy.mount(html` <vl-button disabled>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'disabled');
        cy.get('vl-button').shadow().find('button').should('have.attr', 'disabled');
    });

    it('should set error', () => {
        cy.mount(html` <vl-button error>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'error');
        cy.get('vl-button').shadow().find('button').should('have.class', 'error');
    });

    it('should set type', () => {
        cy.mount(html` <vl-button type="submit">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('button').should('have.attr', 'type', 'submit');
    });

    it('should set block', () => {
        cy.mount(html` <vl-button block>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'block');
        cy.get('vl-button').shadow().find('button').should('have.class', 'block');
    });

    it('should set large', () => {
        cy.mount(html` <vl-button large>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'large');
        cy.get('vl-button').shadow().find('button').should('have.class', 'large');
    });

    it('should set wide', () => {
        cy.mount(html` <vl-button wide>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'wide');
        cy.get('vl-button').shadow().find('button').should('have.class', 'wide');
    });

    it('should set narrow', () => {
        cy.mount(html` <vl-button narrow>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'narrow');
        cy.get('vl-button').shadow().find('button').should('have.class', 'narrow');
    });

    it('should set secondary', () => {
        cy.mount(html` <vl-button secondary>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'secondary');
        cy.get('vl-button').shadow().find('button').should('have.class', 'secondary');
    });

    it('should set tertiary', () => {
        cy.mount(html` <vl-button tertiary>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'tertiary');
        cy.get('vl-button').shadow().find('button').should('have.class', 'tertiary');
    });

    it('should set loading', () => {
        cy.mount(html` <vl-button loading>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'loading');
        cy.get('vl-button').shadow().find('button').should('have.class', 'loading');
    });

    it('should keep the slot text in the accessible name when loading', () => {
        cy.mount(html` <vl-button loading>Bewaren</vl-button>`);

        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-label');
        shouldHaveAccessibleName('button', 'Bewaren (Wordt geladen...)');
    });

    it('should keep nested slot content in the accessible name when loading with an icon after', () => {
        cy.mount(html` <vl-button loading icon="search" icon-placement="after"><span>Bewaren</span></vl-button>`);

        shouldHaveAccessibleName('button', 'Bewaren (Wordt geladen...)');
    });

    it('should add the loading text to the aria-label when loading with a label', () => {
        cy.mount(html` <vl-button loading label="Zoeken" icon="search"></vl-button>`);

        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-label', 'Zoeken (Wordt geladen...)');
        cy.get('vl-button').shadow().find('.vl-visually-hidden').should('not.exist');
        shouldHaveAccessibleName('button', 'Zoeken (Wordt geladen...)');
    });

    it('should remove the loading text from the accessible name when loading stops', () => {
        cy.mount(html` <vl-button loading>Bewaren</vl-button>`);
        shouldHaveAccessibleName('button', 'Bewaren (Wordt geladen...)');

        cy.get('vl-button').invoke('removeAttr', 'loading');

        cy.get('vl-button').shadow().find('button').should('not.have.class', 'loading');
        shouldHaveAccessibleName('button', 'Bewaren');
    });

    it('should not grow when "loading" class is set (large viewport)', () => {
        cy.viewport(1024, 786);

        cy.mount(html` <vl-button>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('button')
            .then(($button) => {
                const buttonHeight = $button[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('button')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (large viewport, large button)', () => {
        cy.viewport(1024, 786);

        cy.mount(html` <vl-button large>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('button')
            .then(($button) => {
                const buttonHeight = $button[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('button')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (small viewport)', () => {
        cy.viewport(600, 400);

        cy.mount(html` <vl-button>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('button')
            .then(($button) => {
                const buttonHeight = $button[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('button')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (small viewport, large button)', () => {
        cy.viewport(600, 400);

        cy.mount(html` <vl-button large>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('button')
            .then(($button) => {
                const buttonHeight = $button[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('button')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should set icon', () => {
        cy.mount(html` <vl-button icon="pin">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button').shadow().find('button').find('span.vl-icon').should('have.class', 'vl-icon--pin');
    });

    it('should set icon-placement', () => {
        cy.mount(html` <vl-button icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}>Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-button').shadow().find('button').find('span.vl-icon').should('have.class', 'vl-icon--pin');
    });

    it('should not set extra margin with icon-placement is not set', () => {
        cy.mount(html` <vl-button icon="pin"></vl-button>`);

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button')
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'padding', value: '0px' })
            .shouldHaveComputedStyle({ style: 'width', value: '35px' });
    });

    it('should set content', () => {
        cy.mount(html` <vl-button>Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('button').find('slot');
        cy.get('vl-button').contains('Klik op mij');
    });

    it('should set label', () => {
        cy.mount(html`<vl-button label="test-label"></vl-button>`);

        cy.get('vl-button').should('have.attr', 'label', 'test-label');
        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-label', 'test-label');
    });

    it('should set class if displayed in map', () => {
        cy.mount(html` <vl-map lambert2008>
            <vl-button map>Klik op mij</vl-button>
        </vl-map>`);

        cy.get('vl-button').shadow().find('button').should('have.class', 'button-in-map');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html` <vl-button>Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-click');

        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('@vl-click').should('have.been.calledOnce');
    });

    it('should dispatch vl-toggle event', () => {
        cy.mount(html` <vl-button toggle>Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-toggle');

        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-button').should('have.attr', 'on', '');
        cy.get('@vl-toggle').should('have.been.calledOnce');
        cy.get('@vl-toggle').its('firstCall.args.0.detail').should('deep.equal', { on: true });
        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-button').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('have.been.calledTwice');
        cy.get('@vl-toggle').its('secondCall.args.0.detail').should('deep.equal', { on: false });
    });

    it('should not dispatch vl-toggle event nor change state of on if controlled', () => {
        cy.mount(html` <vl-button toggle controlled>Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-toggle');

        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-button').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('not.have.been.called');
    });

    it('should set aria-pressed in case it is a toggle button', () => {
        cy.mount(html`<vl-button toggle></vl-button>`);

        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-pressed', 'false');

        cy.get('vl-button').click();

        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-pressed', 'true');
    });

    it('should not set aria-pressed in case it is not a toggle button', () => {
        cy.mount(html`<vl-button></vl-button>`);

        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-pressed');

        cy.get('vl-button').click();

        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-pressed');
    });

    it('should propagate aria-expanded attribute to the inner button when present', () => {
        cy.mount(html`<vl-button aria-expanded="false"></vl-button>`);

        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-expanded', 'false');

        // updating the attribute should update rendering as well
        cy.get('vl-button').invoke('attr', 'aria-expanded', 'true');
        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-expanded', 'true');
    });

    it('should not render aria-expanded on the inner button when host attribute is absent', () => {
        cy.mount(html`<vl-button></vl-button>`);

        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-expanded');
    });

    it('should propagate aria-current attribute to the inner button when present', () => {
        cy.mount(html`<vl-button aria-current="page">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('button').should('have.attr', 'aria-current', 'page');

        cy.get('vl-button').invoke('removeAttr', 'aria-current');
        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-current');
    });

    it('should not render aria-current on the inner button when host attribute is absent', () => {
        cy.mount(html`<vl-button>Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('button').should('not.have.attr', 'aria-current');
    });

    it('should focus the inner button when focus() is called on the host', () => {
        cy.mount(html`<vl-button>Klik op mij</vl-button>`);

        callFocusOnHost('button');

        cy.get('vl-button').shadow().find('button').should('have.focus');
        cy.get('vl-button').should(($host) => {
            const shadowRoot = $host[0].shadowRoot!;
            expect(shadowRoot.activeElement).to.equal(shadowRoot.querySelector('button'));
        });
    });

    it('should not focus the inner button when focus() is called on a disabled host', () => {
        cy.mount(html`<vl-button disabled>Klik op mij</vl-button>`);

        callFocusOnHost('button');

        cy.get('vl-button').should(($host) => expect($host[0].shadowRoot!.activeElement).to.be.null);
    });

    it('should still focus the inner button via the shadow root', () => {
        cy.mount(html`<vl-button>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('button')
            .then(($button) => $button[0].focus());

        cy.get('vl-button').shadow().find('button').should('have.focus');
    });

    it('should visibly restore focus to the button when a dialog closes', () => {
        cy.mount(html`
            <vl-button id="open-dialog">Open dialog</vl-button>
            <div id="dialog">
                <button id="close-dialog" type="button">Sluiten</button>
            </div>
        `);
        cy.get('#dialog').then(($dialog) => {
            $dialog[0].addEventListener('vl-close', () => document.querySelector<HTMLElement>('#open-dialog')!.focus());
        });

        cy.get('vl-button').shadow().find('button').should('exist');

        cy.get('#close-dialog').focus();
        cy.get('#dialog').then(($dialog) => $dialog[0].dispatchEvent(new CustomEvent('vl-close')));

        cy.get('vl-button').shadow().find('button').should('have.focus').and('have.css', 'outline-style', 'solid');
    });

    it('should have a single tab stop', () => {
        cy.mount(html`
            <button id="before" type="button">Voor</button>
            <vl-button>Klik op mij</vl-button>
            <button id="after" type="button">Na</button>
        `);

        cy.get('#before').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('#after').should('have.focus');
    });
});

describe('cypress-component - atom components - vl-button - cta-link', () => {
    it('should mount', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);
        cy.injectAxe();

        cy.checkA11y('vl-button');
    });

    it('should set href', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'cta-link', 'https://www.vlaanderen.be');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'href', 'https://www.vlaanderen.be');
    });

    it('should propagate aria-current attribute to the inner link when present', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be" aria-current="page">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a').should('have.attr', 'aria-current', 'page');

        cy.get('vl-button').invoke('removeAttr', 'aria-current');
        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'aria-current');
    });

    it('should not render aria-current on the inner link when host attribute is absent', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'aria-current');
    });

    it('should set external', () => {
        cy.mount(html` <vl-button external cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'external');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'target', '_blank');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'rel', 'noopener noreferrer nofollow');
    });

    it('should not set target and rel when not external', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'target');
        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'rel');
    });

    it('should set download without filename', () => {
        cy.mount(html` <vl-button download cta-link="https://www.vlaanderen.be/document.pdf">Download</vl-button>`);

        cy.get('vl-button').should('have.attr', 'download');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'download', '');
    });

    it('should set download with filename', () => {
        cy.mount(
            html` <vl-button download="verslag.pdf" cta-link="https://www.vlaanderen.be/document.pdf"
                >Download</vl-button
            >`
        );

        cy.get('vl-button').should('have.attr', 'download', 'verslag.pdf');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'download', 'verslag.pdf');
    });

    it('should not set download when absent', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'download');
    });

    it('should not set download when disabled', () => {
        cy.mount(
            html` <vl-button disabled download="verslag.pdf" cta-link="https://www.vlaanderen.be/document.pdf"
                >Download</vl-button
            >`
        );

        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'download');
    });

    it('should set disabled', () => {
        cy.mount(html` <vl-button disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'disabled');
        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'href');
        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'tabindex');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'role', 'link');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'aria-disabled', 'true');
    });

    it('should be accessible when disabled', () => {
        cy.mount(html` <vl-button disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);
        cy.injectAxe();

        cy.checkA11y('vl-button');
    });

    it('should restore href when no longer disabled', () => {
        cy.mount(html` <vl-button disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').invoke('removeAttr', 'disabled');

        cy.get('vl-button').shadow().find('a').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'role');
    });

    it('should skip a disabled link in the tab order', () => {
        cy.mount(html`
            <button id="before" type="button">Voor</button>
            <vl-button disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>
            <button id="after" type="button">Na</button>
        `);

        cy.get('#before').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#after').should('have.focus');
    });

    it('should focus the inner link when focus() is called on the host', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        callFocusOnHost('a');

        cy.get('vl-button').shadow().find('a').should('have.focus');
        cy.get('vl-button').should(($host) => {
            const shadowRoot = $host[0].shadowRoot!;
            expect(shadowRoot.activeElement).to.equal(shadowRoot.querySelector('a'));
        });
    });

    it('should not focus the inner link when focus() is called on a disabled host', () => {
        cy.mount(html` <vl-button disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        callFocusOnHost('a');

        cy.get('vl-button').should(($host) => expect($host[0].shadowRoot!.activeElement).to.be.null);
    });

    it('should set error', () => {
        cy.mount(html` <vl-button error cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'error');
        cy.get('vl-button').shadow().find('a').should('have.class', 'error');
    });

    it('should set block', () => {
        cy.mount(html` <vl-button block cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'block');
        cy.get('vl-button').shadow().find('a').should('have.class', 'block');
    });

    it('should set large', () => {
        cy.mount(html` <vl-button large cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'large');
        cy.get('vl-button').shadow().find('a').should('have.class', 'large');
    });

    it('should set wide', () => {
        cy.mount(html` <vl-button wide cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'wide');
        cy.get('vl-button').shadow().find('a').should('have.class', 'wide');
    });

    it('should set narrow', () => {
        cy.mount(html` <vl-button narrow cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'narrow');
        cy.get('vl-button').shadow().find('a').should('have.class', 'narrow');
    });

    it('should set secondary', () => {
        cy.mount(html` <vl-button secondary cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'secondary');
        cy.get('vl-button').shadow().find('a').should('have.class', 'secondary');
    });

    it('should set tertiary', () => {
        cy.mount(html` <vl-button tertiary cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'tertiary');
        cy.get('vl-button').shadow().find('a').should('have.class', 'tertiary');
    });

    it('should set loading', () => {
        cy.mount(html` <vl-button loading cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'loading');
        cy.get('vl-button').shadow().find('a').should('have.class', 'loading');
    });

    it('should keep the slot text in the accessible name when loading', () => {
        cy.mount(html` <vl-button loading cta-link="https://www.vlaanderen.be">Bewaren</vl-button>`);

        cy.get('vl-button').shadow().find('a').should('not.have.attr', 'aria-label');
        shouldHaveAccessibleName('a', 'Bewaren (Wordt geladen...)');
    });

    it('should add the loading text to the aria-label when loading with a label', () => {
        cy.mount(
            html` <vl-button loading label="Zoeken" icon="search" cta-link="https://www.vlaanderen.be"></vl-button>`
        );

        cy.get('vl-button').shadow().find('a').should('have.attr', 'aria-label', 'Zoeken (Wordt geladen...)');
        cy.get('vl-button').shadow().find('.vl-visually-hidden').should('not.exist');
        shouldHaveAccessibleName('a', 'Zoeken (Wordt geladen...)');
    });

    it('should not grow when "loading" class is set (large viewport)', () => {
        cy.viewport(1024, 786);

        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('a')
            .then(($a) => {
                const buttonHeight = $a[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('a')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (large viewport, large button)', () => {
        cy.viewport(1024, 786);

        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be" large>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('a')
            .then(($a) => {
                const buttonHeight = $a[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('a')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (small viewport)', () => {
        cy.viewport(600, 400);

        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('a')
            .then(($a) => {
                const buttonHeight = $a[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('a')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should not grow when "loading" class is set (small viewport, large button)', () => {
        cy.viewport(600, 400);

        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be" large>Klik op mij</vl-button>`);

        cy.get('vl-button')
            .shadow()
            .find('a')
            .then(($a) => {
                const buttonHeight = $a[0].getBoundingClientRect().height;

                cy.get('vl-button')
                    .invoke('attr', 'loading', true)
                    .shadow()
                    .find('a')
                    .shouldHaveComputedStyle({ style: 'height', value: `${buttonHeight}px` });
            });
    });

    it('should set icon', () => {
        cy.mount(html` <vl-button icon="pin" cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--pin');
    });

    it('should set icon-placement', () => {
        cy.mount(
            html` <vl-button icon="pin" icon-placement=${ICON_PLACEMENT.AFTER} cta-link="https://www.vlaanderen.be"
                >Klik op mij
            </vl-button>`
        );

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-button').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--pin');
    });

    it('should not set extra margin with icon-placement is not set', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be" icon="pin"></vl-button>`);

        cy.get('vl-button').should('have.attr', 'icon', 'pin');
        cy.get('vl-button')
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'padding', value: '0px' })
            .shouldHaveComputedStyle({ style: 'width', value: '35px' });
    });

    it('should set content', () => {
        cy.mount(html` <vl-button cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>`);

        cy.get('vl-button').shadow().find('a').find('slot');
        cy.get('vl-button').contains('Klik op mij');
    });

    it('should set class if displayed in map', () => {
        cy.mount(
            html` <vl-map lambert2008>
                <vl-button map cta-link="https://www.vlaanderen.be">Klik op mij</vl-button>
            </vl-map>`
        );

        cy.get('vl-button').shadow().find('a').should('have.class', 'button-in-map');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html` <vl-button cta-link="#home">Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-click');

        cy.get('vl-button').shadow().find('a').click({ force: true });
        cy.get('@vl-click').should('have.been.calledOnce');
    });

    it('should dispatch vl-toggle event', () => {
        cy.mount(html` <vl-button toggle cta-link="#home">Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-toggle');

        cy.get('vl-button').shadow().find('a').click({ force: true });
        cy.get('vl-button').should('have.attr', 'on', '');
        cy.get('vl-button').shadow().find('a').should('have.attr', 'aria-pressed');
        cy.get('@vl-toggle').should('have.been.calledOnce');
        cy.get('@vl-toggle').its('firstCall.args.0.detail').should('deep.equal', { on: true });
        cy.get('vl-button').shadow().find('a').click({ force: true });
        cy.get('vl-button').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('have.been.calledTwice');
        cy.get('@vl-toggle').its('secondCall.args.0.detail').should('deep.equal', { on: false });
    });

    it('should not dispatch vl-toggle event nor change state of on if controlled', () => {
        cy.mount(html` <vl-button toggle controlled cta-link="#home">Klik op mij</vl-button>`);
        cy.createStubForEvent('vl-button', 'vl-toggle');

        cy.get('vl-button').shadow().find('a').click({ force: true });
        cy.get('vl-button').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('not.have.been.called');
    });
});

describe('cypress-component - atom components - vl-button - in form', () => {
    it('should mount', () => {
        cy.mount(html` <form>
            <vl-button>Klik op mij</vl-button>
        </form>`);

        cy.get('vl-button').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html` <form>
            <vl-button>Klik op mij</vl-button>
        </form>`);
        cy.injectAxe();

        cy.checkA11y('vl-button');
    });

    it('should submit form', () => {
        cy.mount(
            html` <form
                @submit=${(event: Event) => {
                    event?.preventDefault();
                }}
            >
                <vl-button type="submit">Klik op mij</vl-button>
            </form>`
        );
        cy.createStubForEvent('form', 'submit');

        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('@submit').should('have.been.called');
    });

    it('should reset form', () => {
        cy.mount(
            html` <form>
                <vl-button type="reset">Klik op mij</vl-button>
            </form>`
        );
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-button').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('@reset').should('have.been.called');
    });
});

describe('cypress-component - atom components - vl-button - in input-group', () => {
    it('should have no radius depending on the side', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--input-group">
                <vl-button input-group>links</vl-button>
                <vl-button input-group>rechts</vl-button>
            </div>`);

        cy.get('vl-button').eq(0).shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('vl-button').eq(1).shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });

    it('should have a specific border for a tertiary button with icon', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--input-group">
                <vl-button input-group tertiary icon="pin"></vl-button>
                <vl-button input-group tertiary icon="pin"></vl-button>
            </div>`);

        cy.get('vl-button').eq(0).shadow().find('button').shouldHaveComputedStyle({
            style: 'border',
            value: '1px solid rgb(134, 149, 168)',
        });
        cy.get('vl-button').eq(1).shadow().find('button').shouldHaveComputedStyle({
            style: 'border',
            value: '1px solid rgb(134, 149, 168)',
        });
    });
});
