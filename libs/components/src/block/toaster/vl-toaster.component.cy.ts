import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { html } from 'lit';
import { ALERT_ROLE, VlAlert } from '../alert';
import { VlAlertAttributes } from '../alert/vl-alert.model';
import { VlModalComponent } from '../modal';
import { VlModalComponent as VlModalNextComponent } from '../next/modal';
import { VlToasterComponent } from './vl-toaster.component';
import { TOASTER_PLACEMENT } from './vl-toaster.model';

registerWebComponents([VlToasterComponent, VlButtonComponent, VlAlert, VlModalComponent, VlModalNextComponent]);

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
    const getToast = () => getOutput().find('vl-alert');
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
