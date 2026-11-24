import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent } from '@domg-wc/components/atom';
import { html } from 'lit';
import { ALERT_ROLE, VlAlert } from '../alert';
import { VlAlertAttributes } from '../alert/vl-alert.model';
import { VlModalComponent } from '../modal';
import { VlModalComponent as VlModalNextComponent } from '../next/modal';
import { VlToasterComponent } from './vl-toaster.component';
import { TOASTER_PLACEMENT } from './vl-toaster.model';

registerWebComponents([
    VlToasterComponent,
    VlButtonComponent,
    VlAlert,
    VlLinkComponent,
    VlModalComponent,
    VlModalNextComponent,
]);

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

describe('cypress-component - block components - vl-toaster - open modal', () => {
    const savedAlert: VlAlertAttributes = {
        title: 'Bewaard',
        message: 'Uw wijzigingen zijn bewaard.',
        type: 'success',
    };

    const modals = [
        {
            tag: 'vl-modal-next',
            template: html`<vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>`,
        },
        {
            tag: 'vl-modal',
            template: html`<vl-modal id="modal" title="Modal"><p slot="content">Inhoud</p></vl-modal>`,
        },
    ];

    const getOutput = () => cy.get('vl-toaster').shadow().find('output');
    const showAlert = (alert: VlAlertAttributes = savedAlert) =>
        cy.get('vl-toaster').then(($toaster) => $toaster[0].showAlert(alert));
    const getModal = (selector: string) => cy.get<VlModalComponent | VlModalNextComponent>(selector);
    const openModal = (selector = '#modal') => getModal(selector).then(($modal) => $modal[0].open());
    const closeModal = (selector = '#modal') => getModal(selector).then(($modal) => $modal[0].close());

    const countOpenModals = (): number =>
        [...document.querySelectorAll('vl-modal, vl-modal-next')].filter((modal) =>
            modal.shadowRoot?.querySelector('dialog:modal'),
        ).length + document.querySelectorAll('dialog:modal').length;

    // Een toast buiten de modal is inert en telt niet mee bij hit-testing, dus be.visible kan de volgorde in de top
    // layer niet aantonen. Die volgt uit het aantal modals dat al open stond toen de output de top layer inging.
    const trackTopLayerEntries = (): number[] => {
        const openModalsAtEntry: number[] = [];
        getOutput().then(($output) => {
            $output[0].addEventListener('beforetoggle', (event) => {
                if ((event as ToggleEvent).newState === 'open') {
                    openModalsAtEntry.push(countOpenModals());
                }
            });
        });
        return openModalsAtEntry;
    };

    const shouldBeAboveModals = (openModalsAtEntry: number[], expectedModals: number) =>
        getOutput().should(($output) => {
            expect($output[0].matches(':popover-open')).to.equal(true);
            expect(openModalsAtEntry[openModalsAtEntry.length - 1]).to.equal(expectedModals);
        });

    const shouldNotBeInTopLayer = () => getOutput().should('not.have.attr', 'popover');

    const mountFadeOutToasterInModal = () => {
        cy.mount(html`
            <vl-modal-next id="modal" title-label="Modal">
                <div slot="content">
                    <button id="modal-action">Actie</button>
                    <vl-toaster fade-out></vl-toaster>
                </div>
            </vl-modal-next>
        `);
    };

    beforeEach(() => realMouseLeave());

    modals.forEach(({ tag, template }) => {
        it(`should show a toast above an open ${tag}`, () => {
            cy.mount(html`<vl-toaster></vl-toaster>${template}`);
            const entries = trackTopLayerEntries();

            openModal();
            showAlert();

            getToast().should('exist');
            shouldBeAboveModals(entries, 1);
        });

        it(`should move a visible toast above a ${tag} that opens afterwards`, () => {
            cy.mount(html`<vl-toaster></vl-toaster>${template}`);
            const entries = trackTopLayerEntries();

            showAlert();
            getToast().should('be.visible');
            shouldNotBeInTopLayer();
            openModal();

            shouldBeAboveModals(entries, 1);
        });

        it(`should leave the top layer when the ${tag} closes`, () => {
            cy.mount(html`<vl-toaster></vl-toaster>${template}`);
            const entries = trackTopLayerEntries();

            openModal();
            showAlert();
            shouldBeAboveModals(entries, 1);
            closeModal();

            shouldNotBeInTopLayer();
            getToast().should('be.visible');
        });
    });

    it('should stay above stacked modals until the last one closes', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
            <vl-modal-next id="second-modal" title-label="Tweede modal">
                <p slot="content">Inhoud</p>
            </vl-modal-next>
        `);
        const entries = trackTopLayerEntries();

        openModal();
        showAlert();
        openModal('#second-modal');
        shouldBeAboveModals(entries, 2);
        closeModal('#second-modal');
        cy.get('#second-modal').should('not.have.attr', 'open');
        shouldBeAboveModals(entries, 1);
        closeModal();

        shouldNotBeInTopLayer();
    });

    it('should show a toast above a native modal dialog', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <dialog id="dialog">Inhoud</dialog>
        `);
        const entries = trackTopLayerEntries();

        cy.get('dialog').then(($dialog) => $dialog[0].showModal());
        showAlert();
        shouldBeAboveModals(entries, 1);
        cy.get('dialog').then(($dialog) => $dialog[0].close());

        shouldNotBeInTopLayer();
    });

    it('should move a visible toast above a native modal dialog that opens afterwards', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <dialog id="dialog">Inhoud</dialog>
        `);
        const entries = trackTopLayerEntries();

        showAlert();
        getToast().should('be.visible');
        shouldNotBeInTopLayer();
        cy.get('dialog').then(($dialog) => $dialog[0].showModal());

        shouldBeAboveModals(entries, 1);
        cy.get('dialog').then(($dialog) => $dialog[0].close());

        shouldNotBeInTopLayer();
    });

    it('should leave the top layer when a native dialog closes in a browser without dialog toggle events', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <dialog id="dialog">Inhoud</dialog>
        `);
        const entries = trackTopLayerEntries();
        const withoutToggle = new AbortController();
        Cypress.once('test:after:run', () => withoutToggle.abort());
        cy.window().then((win) =>
            win.addEventListener('toggle', (event) => event.stopImmediatePropagation(), {
                capture: true,
                signal: withoutToggle.signal,
            }),
        );

        cy.get('dialog').then(($dialog) => $dialog[0].showModal());
        showAlert();
        shouldBeAboveModals(entries, 1);
        cy.get('dialog').then(($dialog) => $dialog[0].close());

        shouldNotBeInTopLayer();
    });

    it('should not move again when another element than a dialog toggles', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <vl-modal-next id="modal" title-label="Modal">
                <details slot="content">
                    <summary>Meer</summary>
                    Inhoud
                </details>
            </vl-modal-next>
        `);
        const entries = trackTopLayerEntries();

        openModal();
        showAlert();
        shouldBeAboveModals(entries, 1).then(() => {
            const entriesBeforeToggle = entries.length;
            cy.get('details').then(($details) => {
                const toggled = new Promise((resolve) => $details[0].addEventListener('toggle', resolve));
                $details[0].open = true;
                return toggled;
            });
            // de toggle van de details is voorbij: een listener op document heeft hem dan al gezien
            cy.then(() => expect(entries.length).to.equal(entriesBeforeToggle));
        });
    });

    it('should not use the top layer without an open modal', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <div id="accordion"></div>
        `);

        showAlert();
        getToast().should('be.visible');
        cy.get('#accordion').then(($accordion) =>
            $accordion[0].dispatchEvent(new CustomEvent('vl-open', { bubbles: true, composed: true })),
        );

        shouldNotBeInTopLayer();
    });

    Object.values(TOASTER_PLACEMENT).forEach((placement) => {
        it(`should keep the ${placement} position of the toasts above a modal`, () => {
            cy.mount(html`
                <style>
                    vl-toaster {
                        --vl-toaster-width: 40rem;
                    }
                </style>
                <vl-toaster placement=${placement}><vl-alert id="slotted" title="Melding"></vl-alert></vl-toaster>
                <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
            `);
            const entries = trackTopLayerEntries();
            const getPositions = () => [
                Cypress.$('vl-toaster')[0].shadowRoot!.querySelector('vl-alert')!.getBoundingClientRect().toJSON(),
                Cypress.$('#slotted')[0].getBoundingClientRect().toJSON(),
            ];

            showAlert();
            getToast()
                .should('be.visible')
                .then(() => {
                    const positions = getPositions();
                    openModal();
                    shouldBeAboveModals(entries, 1).then(() => expect(getPositions()).to.deep.equal(positions));
                });
        });
    });

    it('should not restart the animations of visible toasts when moving above a modal', () => {
        cy.mount(html`
            <vl-toaster fade-out></vl-toaster>
            <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
        `);
        const entries = trackTopLayerEntries();

        showAlert();
        getToast()
            .should(($toast) => expect($toast[0].getAnimations()).to.have.length(2))
            .then(($toast) => {
                const animations = $toast[0].getAnimations();
                openModal();
                // een tweede toast haalt de output die al in de top layer staat opnieuw naar boven
                showAlert({ title: 'Tweede melding' });
                getToast().should('have.length', 2);
                shouldBeAboveModals(entries, 1).then(() => {
                    animations.forEach((animation) => expect(animation.playState).to.not.equal('idle'));
                    expect($toast[0].getAnimations().every((animation) => animations.includes(animation))).to.equal(
                        true,
                    );
                });
            });
    });

    it('should keep a toast in a toaster inside the modal focused and closable', () => {
        cy.mount(html`
            <vl-modal-next id="modal" title-label="Modal">
                <div slot="content">
                    <p>Inhoud</p>
                    <vl-toaster></vl-toaster>
                </div>
            </vl-modal-next>
        `);
        const entries = trackTopLayerEntries();

        const getSavedToast = () => getOutput().find('vl-alert[title="Bewaard"]').shadow();

        openModal();
        showAlert({ ...savedAlert, closable: true, 'alert-role': ALERT_ROLE.ALERT_DIALOG });
        getSavedToast().find('#alert').focus();
        showAlert({ title: 'Tweede melding' });
        getToast().should('have.length', 2);

        shouldBeAboveModals(entries, 1);
        getSavedToast().find('#alert').should('have.focus');
        getSavedToast().find('button#close').click();
        getOutput().find('vl-alert[title="Bewaard"]').should('not.exist');
    });

    it('should pause fading out while the focus is within a toaster inside the modal', () => {
        mountFadeOutToasterInModal();
        const entries = trackTopLayerEntries();

        openModal();
        showAlert({ ...savedAlert, closable: true });
        shouldBeAboveModals(entries, 1);
        getToast().shadow().find('button#close').focus();

        shouldHaveFadeOutPlayState('paused');

        cy.get('#modal-action').focus();

        shouldHaveFadeOutPlayState('running');
        getToast('vl-alert', { timeout: 6000 }).should('not.exist');
    });

    it('should pause fading out while hovering a toaster inside the modal', () => {
        mountFadeOutToasterInModal();
        const entries = trackTopLayerEntries();

        openModal();
        showAlert();
        shouldBeAboveModals(entries, 1);
        getToast().then(realHover);

        shouldHaveFadeOutPlayState('paused');

        realMouseLeave();

        shouldHaveFadeOutPlayState('running');
        getToast('vl-alert', { timeout: 6000 }).should('not.exist');
    });

    it('should keep reacting to modals after being reconnected', () => {
        cy.mount(html`
            <main><vl-toaster></vl-toaster></main>
            <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
        `);
        const entries = trackTopLayerEntries();

        cy.get('vl-toaster').then(($toaster) => {
            const parent = $toaster[0].parentElement!;
            $toaster[0].remove();
            parent.append($toaster[0]);
        });
        openModal();
        showAlert();
        shouldBeAboveModals(entries, 1);
        cy.get('vl-toaster').then(($toaster) => $toaster[0].parentElement!.append($toaster[0]));
        shouldBeAboveModals(entries, 1);
        closeModal();

        shouldNotBeInTopLayer();
    });

    it('should remove a faded out toast after the toaster moved in the DOM', () => {
        cy.mount(html`
            <main><vl-toaster fade-out></vl-toaster></main>
            <aside></aside>
        `);

        cy.get('vl-toaster').then(($toaster) => Cypress.$('aside')[0].append($toaster[0]));
        showAlert();
        getToast().should('exist');

        cy.wait(5000);
        getToast().should('not.exist');
    });

    it('should fall back to the regular layer without Popover API', () => {
        cy.stub(CSS, 'supports').callThrough().withArgs('selector(:popover-open)').returns(false);
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
        `);

        openModal();
        showAlert();

        getToast().should('exist');
        shouldNotBeInTopLayer();
    });

    it('should be accessible above an open modal', () => {
        cy.mount(html`
            <vl-toaster></vl-toaster>
            <vl-modal-next id="modal" title-label="Modal"><p slot="content">Inhoud</p></vl-modal-next>
        `);
        const entries = trackTopLayerEntries();
        cy.injectAxe();

        openModal();
        showAlert();
        shouldBeAboveModals(entries, 1);

        cy.checkA11y('vl-toaster');
    });
});
