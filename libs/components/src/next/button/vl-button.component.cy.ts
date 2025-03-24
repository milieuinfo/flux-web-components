import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import { html } from 'lit';
import { ICON_PLACEMENT, registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonComponent } from './vl-button.component';

registerWebComponents([VlButtonComponent]);

describe('component - vl-button-next', () => {
    it('should mount', () => {
        cy.mount(html` <vl-button-next></vl-button-next>`);

        cy.get('vl-button-next').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-button-next');
    });

    it('should set disabled', () => {
        cy.mount(html` <vl-button-next disabled>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'disabled');
        cy.get('vl-button-next').shadow().find('button').should('have.attr', 'disabled');
    });

    it('should set error', () => {
        cy.mount(html` <vl-button-next error>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'error');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'error');
    });

    it('should set type', () => {
        cy.mount(html` <vl-button-next type="submit">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').shadow().find('button').should('have.attr', 'type', 'submit');
    });

    it('should set block', () => {
        cy.mount(html` <vl-button-next block>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'block');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'block');
    });

    it('should set large', () => {
        cy.mount(html` <vl-button-next large>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'large');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'large');
    });

    it('should set wide', () => {
        cy.mount(html` <vl-button-next wide>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'wide');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'wide');
    });

    it('should set narrow', () => {
        cy.mount(html` <vl-button-next narrow>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'narrow');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'narrow');
    });

    it('should set secondary', () => {
        cy.mount(html` <vl-button-next secondary>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'secondary');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'secondary');
    });

    it('should set tertiary', () => {
        cy.mount(html` <vl-button-next tertiary>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'tertiary');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'tertiary');
    });

    it('should set loading', () => {
        cy.mount(html` <vl-button-next loading>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'loading');
        cy.get('vl-button-next').shadow().find('button').should('have.class', 'loading');
    });

    it('should not grow when "loading" class is set (large viewport)', () => {
        cy.viewport(1024, 786);

        const defaultButtonHeight = '35px';
        const largeButtonHeight = '56px';

        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'loading', true)
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'large', true)
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: largeButtonHeight });
    });

    it('should not grow when "loading" class is set (small viewport)', () => {
        cy.viewport(600, 400);

        const defaultButtonHeight = '44px';
        const largeButtonHeight = '56px';

        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'loading', true)
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'large', true)
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'height', value: largeButtonHeight });
    });

    it('should set icon', () => {
        cy.mount(html` <vl-button-next icon="pin">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-button-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--right-margin');
    });

    it('should set icon-placement', () => {
        cy.mount(html` <vl-button-next icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('have.class', 'vl-icon--left-margin');
    });

    it('should not set extra margin with icon-placement is not set', () => {
        cy.mount(html` <vl-button-next icon="pin"></vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next')
            .shadow()
            .find('button')
            .shouldHaveComputedStyle({ style: 'padding', value: '0px' })
            .shouldHaveComputedStyle({ style: 'width', value: '35px' });
    });

    it('should set content', () => {
        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').shadow().find('button').find('slot');
        cy.get('vl-button-next').contains('Klik op mij');
    });

    it('should set label', () => {
        cy.mount(html`<vl-button-next label="test-label"></vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'label', 'test-label');
        cy.get('vl-button-next').shadow().find('button').should('have.attr', 'aria-label', 'test-label');
    });

    it('should set class if displayed in map', () => {
        cy.mount(html` <vl-map>
            <vl-button-next map>Klik op mij</vl-button-next>
        </vl-map>`);

        cy.get('vl-button-next').shadow().find('button').should('have.class', 'button-in-map');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-click');

        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('@vl-click').should('have.been.calledOnce');
    });

    it('should dispatch vl-toggle event', () => {
        cy.mount(html` <vl-button-next toggle>Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-toggle');

        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('vl-button-next').should('have.attr', 'on', '');
        cy.get('@vl-toggle').should('have.been.calledOnce');
        cy.get('@vl-toggle').its('firstCall.args.0.detail').should('deep.equal', { on: true });
        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('vl-button-next').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('have.been.calledTwice');
        cy.get('@vl-toggle').its('secondCall.args.0.detail').should('deep.equal', { on: false });
    });

    it('should not dispatch vl-toggle event nor change state of on if controlled', () => {
        cy.mount(html` <vl-button-next toggle controlled>Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-toggle');

        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('vl-button-next').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('not.have.been.called');
    });
});

describe('component - vl-button-next - cta-link', () => {
    it('should mount', () => {
        cy.mount(html` <vl-button-next cta-link="https://www.vlaanderen.be"></vl-button-next>`);

        cy.get('vl-button-next').shadow().find('a');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-button-next cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-button-next');
    });

    it('should set href', () => {
        cy.mount(html` <vl-button-next cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'cta-link', 'https://www.vlaanderen.be');
        cy.get('vl-button-next').shadow().find('a').should('have.attr', 'href', 'https://www.vlaanderen.be');
    });

    it('should set external', () => {
        cy.mount(html` <vl-button-next external cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'external');
        cy.get('vl-button-next').shadow().find('a').should('have.attr', 'target', '_blank');
    });

    it('should set disabled', () => {
        cy.mount(html` <vl-button-next disabled cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'disabled');
        cy.get('vl-button-next').shadow().find('a').should('have.attr', 'tabindex', '-1');
        cy.get('vl-button-next').shadow().find('a').should('have.attr', 'aria-disabled');
    });

    it('should set error', () => {
        cy.mount(html` <vl-button-next error cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'error');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'error');
    });

    it('should set block', () => {
        cy.mount(html` <vl-button-next block cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'block');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'block');
    });

    it('should set large', () => {
        cy.mount(html` <vl-button-next large cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'large');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'large');
    });

    it('should set wide', () => {
        cy.mount(html` <vl-button-next wide cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'wide');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'wide');
    });

    it('should set narrow', () => {
        cy.mount(html` <vl-button-next narrow cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'narrow');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'narrow');
    });

    it('should set secondary', () => {
        cy.mount(html` <vl-button-next secondary cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'secondary');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'secondary');
    });

    it('should set tertiary', () => {
        cy.mount(html` <vl-button-next tertiary cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'tertiary');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'tertiary');
    });

    it('should set loading', () => {
        cy.mount(html` <vl-button-next loading cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'loading');
        cy.get('vl-button-next').shadow().find('a').should('have.class', 'loading');
    });

    it('should not grow when "loading" class is set', () => {
        // In tegenstelling tot de gewone vl-button-next is er hier geen verschil tussen small en large viewports.
        // De computed height van de a-tag houdt geen rekening met de extra margin of padding en is dus in beide
        // viewports hetzelfde.
        const defaultButtonHeight = '21px';
        const largeButtonHeight = '22px';

        cy.mount(html` <vl-button-next>Klik op mij</vl-button-next>`);

        cy.get('vl-button-next')
            .invoke('attr', 'cta-link', 'https://www.vlaanderen.be')
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'loading', true)
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'height', value: defaultButtonHeight });

        cy.get('vl-button-next')
            .invoke('attr', 'large', true)
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'height', value: largeButtonHeight });
    });

    it('should set icon', () => {
        cy.mount(html` <vl-button-next icon="pin" cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-button-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-button-next').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should set icon-placement', () => {
        cy.mount(
            html` <vl-button-next icon="pin" icon-placement=${ICON_PLACEMENT.AFTER} cta-link="https://www.vlaanderen.be"
                >Klik op mij
            </vl-button-next>`
        );

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-button-next')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('have.class', 'vl-icon--left-margin');
    });

    it('should not set extra margin with icon-placement is not set', () => {
        cy.mount(html` <vl-button-next cta-link="https://www.vlaanderen.be" icon="pin"></vl-button-next>`);

        cy.get('vl-button-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-button-next')
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'padding', value: '0px' })
            .shouldHaveComputedStyle({ style: 'width', value: '31px' });
    });

    it('should set content', () => {
        cy.mount(html` <vl-button-next cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>`);

        cy.get('vl-button-next').shadow().find('a').find('slot');
        cy.get('vl-button-next').contains('Klik op mij');
    });

    it('should set class if displayed in map', () => {
        cy.mount(
            html` <vl-map>
                <vl-button-next map cta-link="https://www.vlaanderen.be">Klik op mij</vl-button-next>
            </vl-map>`
        );

        cy.get('vl-button-next').shadow().find('a').should('have.class', 'button-in-map');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html` <vl-button-next cta-link="#home">Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-click');

        cy.get('vl-button-next').shadow().find('a').click({ force: true });
        cy.get('@vl-click').should('have.been.calledOnce');
    });

    it('should dispatch vl-toggle event', () => {
        cy.mount(html` <vl-button-next toggle cta-link="#home">Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-toggle');

        cy.get('vl-button-next').shadow().find('a').click({ force: true });
        cy.get('vl-button-next').should('have.attr', 'on', '');
        cy.get('vl-button-next').shadow().find('a').should('have.attr', 'aria-pressed');
        cy.get('@vl-toggle').should('have.been.calledOnce');
        cy.get('@vl-toggle').its('firstCall.args.0.detail').should('deep.equal', { on: true });
        cy.get('vl-button-next').shadow().find('a').click({ force: true });
        cy.get('vl-button-next').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('have.been.calledTwice');
        cy.get('@vl-toggle').its('secondCall.args.0.detail').should('deep.equal', { on: false });
    });

    it('should not dispatch vl-toggle event nor change state of on if controlled', () => {
        cy.mount(html` <vl-button-next toggle controlled cta-link="#home">Klik op mij</vl-button-next>`);
        cy.createStubForEvent('vl-button-next', 'vl-toggle');

        cy.get('vl-button-next').shadow().find('a').click({ force: true });
        cy.get('vl-button-next').should('not.have.attr', 'on');
        cy.get('@vl-toggle').should('not.have.been.called');
    });
});

describe('component - vl-button-next - in form', () => {
    it('should mount', () => {
        cy.mount(html` <form>
            <vl-button-next>Klik op mij</vl-button-next>
        </form>`);

        cy.get('vl-button-next').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html` <form>
            <vl-button-next>Klik op mij</vl-button-next>
        </form>`);
        cy.injectAxe();

        cy.checkA11y('vl-button-next');
    });

    it('should submit form', () => {
        cy.mount(
            html` <form
                @submit=${(event: Event) => {
                    event?.preventDefault();
                }}
            >
                <vl-button-next type="submit">Klik op mij</vl-button-next>
            </form>`
        );
        cy.createStubForEvent('form', 'submit');

        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('@submit').should('have.been.called');
    });

    it('should reset form', () => {
        cy.mount(
            html` <form>
                <vl-button-next type="reset">Klik op mij</vl-button-next>
            </form>`
        );
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-button-next').shadow().find('button').click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('@reset').should('have.been.called');
    });
});

describe('component - vl-button-next - in input-group', () => {
    it('should have no radius depending on the side', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--input-group">
                <vl-button-next input-group>links</vl-button-next>
                <vl-button-next input-group>rechts</vl-button-next>
            </div>`);

        cy.get('vl-button-next').eq(0).shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('vl-button-next').eq(1).shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });

    it('should have a specific border for a tertiary button with icon', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--input-group">
                <vl-button-next input-group tertiary icon="pin"></vl-button-next>
                <vl-button-next input-group tertiary icon="pin"></vl-button-next>
            </div>`);

        cy.get('vl-button-next').eq(0).shadow().find('button').shouldHaveComputedStyle({
            style: 'border',
            value: '1px solid rgb(134, 149, 168)',
        });
        cy.get('vl-button-next').eq(1).shadow().find('button').shouldHaveComputedStyle({
            style: 'border',
            value: '1px solid rgb(134, 149, 168)',
        });
    });
});
