import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent } from '@domg-wc/components/atom';
import { html } from 'lit';
import { ALERT_ROLE, VlAlert } from '../alert';
import { VlToasterComponent } from './vl-toaster.component';

registerWebComponents([VlToasterComponent, VlButtonComponent, VlAlert, VlLinkComponent]);

const alertTypes = ['info', 'success', 'warning', 'error'] as const;

const emulateReducedMotion = (reduce: boolean) =>
    Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: { features: reduce ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [] },
    });

const mountToastWithLinks = (type: string) =>
    cy.mount(html`
        <main>
            <vl-alert type=${type} title="Melding verstuurd">
                <p>
                    Ga naar <a href="/loket/indienen">indienen</a> of volg uw dossier op via
                    <vl-link href="/loket/opvolgen">mijn dossiers</vl-link>.
                </p>
            </vl-alert>
            <vl-toaster></vl-toaster>
        </main>
    `);

// show() met een element verplaatst de melding naar de toaster, zodat ze niet twee keer in de DOM staat
const showToastWithLinks = () =>
    cy.get('vl-alert').then(($alert) => cy.get('vl-toaster').then(($toaster) => $toaster[0].show($alert[0])));

// :hover reageert enkel op echte browser-input; via het Chrome DevTools Protocol beweegt de muis echt.
const realMouseMove = (x: number, y: number) => {
    cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
            command: 'Input.dispatchMouseEvent',
            params: { type: 'mouseMoved', x, y },
        }),
    );
};

const realHover = ($element: JQuery<HTMLElement>) => {
    const element = $element[0];
    const autWindow = element.ownerDocument.defaultView!;
    const frameRect = autWindow.frameElement!.getBoundingClientRect();
    const scale = frameRect.width / autWindow.innerWidth;
    const elementRect = element.getBoundingClientRect();
    realMouseMove(
        frameRect.left + (elementRect.left + elementRect.width / 2) * scale,
        frameRect.top + (elementRect.top + elementRect.height / 2) * scale,
    );
};

// (0, 0) ligt buiten de iframe met de component, dus boven geen enkele toaster
const realMouseLeave = () => realMouseMove(0, 0);

const fadeOutAnimation = (toast: Element) =>
    toast.getAnimations().find((animation) => (animation as CSSAnimation).animationName === 'fade-out');

const getToast = (selector = 'vl-alert', options?: Partial<Cypress.Timeoutable>) =>
    cy.get('vl-toaster').shadow().find(selector, options);

const mountFadeOutToasterBetweenActions = () => {
    cy.mount(html`
        <button id="preceding-action">Vorige</button>
        <vl-toaster fade-out></vl-toaster>
        <button id="following-action">Volgende</button>
    `);
};

const tabToCloseButtonOfFirstToast = () => {
    cy.get('#preceding-action').focus();
    cy.press(Cypress.Keyboard.Keys.TAB);
    getToast('vl-alert[title="Eerste"]').should(($toast) =>
        expect($toast[0].shadowRoot?.activeElement?.id).to.equal('close'),
    );
};

const shouldHaveToastAttributes = (title: string, expected: { fadeOut: boolean; persistent: boolean }) => {
    getToast(`vl-alert[title="${title}"]`).should(($toast) => {
        expect($toast[0].hasAttribute('fade-out'), 'fade-out').to.equal(expected.fadeOut);
        expect($toast[0].hasAttribute('persistent'), 'persistent').to.equal(expected.persistent);
    });
};

const shouldHaveFadeOutPlayState = (playState: AnimationPlayState) => {
    getToast().should(($toasts) => {
        expect($toasts).not.to.have.length(0);
        $toasts.toArray().forEach((toast) => expect(fadeOutAnimation(toast)?.playState).to.equal(playState));
    });
};

describe('cypress-component - block components - vl-toaster', () => {
    it('should mount', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shadow().find('output.vl-toaster');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);
        cy.injectAxe();

        cy.checkA11y('vl-toaster');
    });

    alertTypes.forEach((type) => {
        it(`should be accessible with links in the message - case: ${type}`, () => {
            mountToastWithLinks(type);
            cy.injectAxe();

            showToastWithLinks();

            // axe meet de kleuren zoals ze op dat moment op het scherm staan: tijdens de fade is de toast half
            // doorzichtig en haalt geen enkele tekst de contrastdrempel, dus pas scannen na de animatie
            cy.get('vl-toaster').shadow().find('vl-alert').should('have.css', 'opacity', '1');

            cy.checkA11y('vl-toaster');
        });
    });

    it('should set top right by default', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').should('not.have.attr', 'placement');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top right', () => {
        cy.mount(html` <vl-toaster placement="top-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top left', () => {
        cy.mount(html` <vl-toaster placement="top-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom left', () => {
        cy.mount(html` <vl-toaster placement="bottom-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom right', () => {
        cy.mount(html` <vl-toaster placement="bottom-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set z-index', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'z-index', value: '10012' });
    });

    it('should have default width', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '300px' });
    });

    it('should have custom width', () => {
        cy.mount(html`
            <style>
                aside {
                    --vl-toaster-width: 50rem; /* 500px */
                }
            </style>
            <main>
                <vl-toaster></vl-toaster>
            </main>
            <aside>
                <vl-toaster></vl-toaster>
            </aside>
        `);

        cy.get('main vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '300px' });
        cy.get('aside vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '500px' });
    });

    it('should show a toast', () => {
        cy.mount(html`
            <vl-toaster>
                <vl-alert title="toast">
                    <p>message</p>
                </vl-alert>
            </vl-toaster>
        `);
        cy.get('vl-toaster').find('vl-alert').should('be.visible');
    });

    it('should show a dynamically created alert', () => {
        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible');
        });
    });

    it('should show every toast that is shown before the toaster has rendered', () => {
        cy.mount(html` <div id="toaster-container"></div> `);
        cy.get('#toaster-container').then(($container) => {
            const toaster = document.createElement('vl-toaster');
            $container[0].append(toaster);
            toaster.showAlert({ type: 'info', title: 'Eerste' });
            toaster.showAlert({ type: 'success', title: 'Tweede' });
        });

        getToast().should('have.length', 2);
    });

    it('should show a toast in the output slot', () => {
        cy.mount(html`
            <vl-toaster>
                <vl-alert title="toast"></vl-alert>
            </vl-toaster>
        `);

        cy.get('vl-toaster').find('vl-alert').should('be.visible');
    });

    it('should show a toast when dynamically adding it to the output slot', () => {
        cy.mount(html`
            <main>
                <vl-alert title="toast"></vl-alert>
                <vl-toaster></vl-toaster>
            </main>
        `);

        cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');

        cy.get('vl-alert')
            .then(($alert) => {
                cy.get('vl-toaster').then(($toaster) => {
                    $toaster[0].show($alert[0]);
                });
            })
            .get('vl-toaster')
            .shadow()
            .find('output')
            .find('vl-alert')
            .should('be.visible');
    });

    it('should show a dynamically created multiline alert', () => {
        const multilineMessage = 'Eerste regel.\nTweede regel.\nDerde regel.';

        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Info',
                message: multilineMessage,
                type: 'info',
                multiline: true,
            });
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .should('be.visible')
                .and('have.attr', 'multiline');
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .shadow()
                .find('#message.vl-alert__message > p')
                .then(($message) => {
                    expect($message.text()).to.equal(multilineMessage);
                    expect(getComputedStyle($message[0]).whiteSpace).to.equal('pre-line');
                });
        });
    });

    it('should not apply pre-line white-space without multiline attribute', () => {
        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({
                title: 'Info',
                message: 'Gewone boodschap zonder multiline.',
                type: 'info',
            });
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .should('be.visible')
                .and('not.have.attr', 'multiline');
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .shadow()
                .find('#message.vl-alert__message > p')
                .then(($message) => {
                    expect(getComputedStyle($message[0]).whiteSpace).to.not.equal('pre-line');
                });
        });
    });

    it('should show a dynamically created alert with a multi-word attribute', () => {
        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
                'alert-role': ALERT_ROLE.ALERT_DIALOG,
            });
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .shadow()
                .find('#alert')
                .should('have.attr', 'role', 'alertdialog');
        });
    });

    it('should show alerts defined in a template', () => {
        cy.mount(html`
            <template id="alert-error-template">
                <vl-alert type="error" icon="warning" title="Error">
                    <p>Er is een fout opgetreden.</p>
                </vl-alert>
            </template>
            <vl-toaster id="toaster-template"></vl-toaster>
            <vl-button id="button-error"> Toon foutmelding</vl-button>
        `);

        cy.get('vl-button#button-error').then(($button) => {
            const button = $button[0];
            button.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-template') as VlToasterComponent;
                // tonen het eerst gevonden kind element van de <template>
                toaster?.show('#alert-error-template');
            });
        });

        cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');

        cy.get('vl-button#button-error').shadow().find('button').click({ force: true });

        cy.get('vl-toaster').shadow().find('vl-alert').should('exist');
    });
});

describe('cypress-component - block components - vl-toaster - fade out', () => {
    // hover pauzeert het verdwijnen: de muis mag niet van een vorige test of spec boven de toaster blijven staan
    beforeEach(() => realMouseLeave());

    it('should set fade out', () => {
        cy.mount(html` <vl-toaster fade-out></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible').and('exist');
            cy.wait(5000);
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
        });
    });

    it('should reflect the fade-out property to the attribute', () => {
        cy.mount(html` <vl-toaster .fadeOut=${true}></vl-toaster> `);

        cy.get('vl-toaster').should('have.attr', 'fade-out');
    });

    it('should fade out a toast with the fade-out attribute in a toaster without fade-out', () => {
        cy.mount(html`
            <template id="toast-fade-out">
                <vl-alert fade-out type="success" title="Bewaard"></vl-alert>
            </template>
            <vl-toaster></vl-toaster>
        `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'info', title: 'Info' });
            $toaster[0].show('#toast-fade-out');
        });

        getToast('vl-alert[type="success"]').should('exist');
        getToast('vl-alert[type="success"]', { timeout: 6000 }).should('not.exist');
        getToast('vl-alert[type="info"]').should('exist');
    });

    it('should keep a toast with the persistent attribute in a toaster with fade-out', () => {
        cy.mount(html`
            <template id="toast-persistent">
                <vl-alert persistent type="error" title="Niet bewaard"></vl-alert>
            </template>
            <vl-toaster fade-out></vl-toaster>
        `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].show('#toast-persistent');
            $toaster[0].showAlert({ type: 'success', title: 'Bewaard' });
        });

        getToast('vl-alert[type="success"]').should('exist');
        getToast('vl-alert[type="success"]', { timeout: 6000 }).should('not.exist');
        getToast('vl-alert[type="error"]').should('exist');
    });

    it('should set the fade-out or persistent attribute on the toast with the fadeOut option', () => {
        cy.mount(html`
            <template id="toast-persistent">
                <vl-alert persistent type="warning" title="Template"></vl-alert>
            </template>
            <vl-toaster></vl-toaster>
        `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'success', title: 'Verdwijnt' }, { fadeOut: true });
            $toaster[0].showAlert({ type: 'error', title: 'Blijft' }, { fadeOut: false });
            $toaster[0].showAlert({ type: 'info', title: 'Standaard' });
            $toaster[0].show('#toast-persistent', { fadeOut: true });
        });

        shouldHaveToastAttributes('Verdwijnt', { fadeOut: true, persistent: false });
        shouldHaveToastAttributes('Blijft', { fadeOut: false, persistent: true });
        shouldHaveToastAttributes('Standaard', { fadeOut: false, persistent: false });
        shouldHaveToastAttributes('Template', { fadeOut: true, persistent: false });
    });

    it('should pause fading out all toasts while the focus is within the toaster', () => {
        mountFadeOutToasterBetweenActions();
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'info', title: 'Eerste', closable: true });
            $toaster[0].showAlert({ type: 'success', title: 'Tweede' });
        });

        tabToCloseButtonOfFirstToast();

        shouldHaveFadeOutPlayState('paused');
        getToast('vl-alert[title="Tweede"]').then(($toast) => {
            const animation = fadeOutAnimation($toast[0])!;
            const pausedTime = animation.currentTime as number;
            cy.wait(1000).then(() => expect(animation.currentTime as number).to.be.closeTo(pausedTime, 50));
        });

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('#following-action').should('have.focus');

        shouldHaveFadeOutPlayState('running');
        getToast('vl-alert', { timeout: 6000 }).should('not.exist');
    });

    it('should pause fading out all toasts while hovering the toaster', () => {
        cy.mount(html` <vl-toaster fade-out></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'info', title: 'Eerste' });
            $toaster[0].showAlert({ type: 'success', title: 'Tweede' });
        });

        getToast('vl-alert[title="Eerste"]').then(realHover);

        shouldHaveFadeOutPlayState('paused');

        realMouseLeave();

        shouldHaveFadeOutPlayState('running');
        getToast('vl-alert', { timeout: 6000 }).should('not.exist');
    });

    it('should fade in a new toast while fading out is paused', () => {
        mountFadeOutToasterBetweenActions();
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'info', title: 'Eerste', closable: true });
        });
        tabToCloseButtonOfFirstToast();
        shouldHaveFadeOutPlayState('paused');

        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({ type: 'success', title: 'Tweede' });
        });

        getToast('vl-alert[title="Tweede"]')
            .should('have.css', 'opacity', '1')
            .and(($toast) => expect(fadeOutAnimation($toast[0])?.playState).to.equal('paused'));
    });

    it('should only animate the toast and not its content', () => {
        cy.mount(html`
            <template id="toast-with-content">
                <vl-alert type="success" title="Bewaard"><p>Uw wijzigingen zijn bewaard.</p></vl-alert>
            </template>
            <vl-toaster fade-out></vl-toaster>
        `);
        cy.get('vl-toaster').then(($toaster) => $toaster[0].show('#toast-with-content'));

        getToast().should('have.css', 'animation-name', 'fade-in, fade-out');
        getToast().find('p').should('have.css', 'animation-name', 'none');
    });

    it('should not remove a toast when an element inside the toast ends a fade-out animation', () => {
        cy.mount(html`
            <template id="toast-with-content">
                <vl-alert type="success" title="Bewaard"><p>Uw wijzigingen zijn bewaard.</p></vl-alert>
            </template>
            <vl-toaster fade-out></vl-toaster>
        `);
        cy.get('vl-toaster').then(($toaster) => $toaster[0].show('#toast-with-content'));

        getToast()
            .find('p')
            .then(($content) => {
                $content[0].dispatchEvent(
                    new AnimationEvent('animationend', { animationName: 'fade-out', bubbles: true }),
                );
            });

        getToast().should('exist');
    });

    it('should still fade out a toast after the toaster is reconnected', () => {
        cy.mount(html`
            <main>
                <vl-toaster fade-out></vl-toaster>
            </main>
        `);
        cy.get('vl-toaster').then(($toaster) => $toaster[0].showAlert({ type: 'success', title: 'Bewaard' }));
        getToast().should('exist');

        cy.get('vl-toaster').then(($toaster) => {
            const main = $toaster[0].parentElement!;
            $toaster[0].remove();
            main.append($toaster[0]);
        });

        getToast('vl-alert', { timeout: 6000 }).should('not.exist');
    });
});

describe('cypress-component - block components - vl-toaster - reduced motion', () => {
    // hover pauzeert het verdwijnen: de muis mag niet van een vorige test boven de toaster blijven staan
    beforeEach(() => realMouseLeave());

    afterEach(() => {
        cy.then(() => emulateReducedMotion(false));
    });

    it('should show the toast without fading in and still remove it afterwards', () => {
        cy.then(() => emulateReducedMotion(true));
        cy.mount(html` <vl-toaster fade-out></vl-toaster> `);

        cy.get('vl-toaster').then(($toaster) =>
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            })
        );

        // enkel de fade-out blijft over: zonder die animatie zou de toast nooit meer verwijderd worden
        cy.get('vl-toaster')
            .shadow()
            .find('vl-alert')
            .shouldHaveComputedStyle({ style: 'animation-name', value: 'none, fade-out' });

        cy.wait(5000);
        cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
    });
});
