import { registerWebComponents } from '@domg-wc/common';
import { html, TemplateResult } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlIconComponent } from '../../atom/icon';
import { VlModalComponent } from './vl-modal.component';

registerWebComponents([VlModalComponent, VlButtonComponent, VlIconComponent]);

const renderOpenButton = () => html`<vl-button modal-open="modal-vt" data-cy="button-modal-toggle"> Open </vl-button>`;

const renderModal = ({
    title = 'Modal',
    open = false,
    closable = false,
    notAutoClosable = false,
    notCancellable = false,
    allowOverflow = false,
    content = html`<p>Modal content</p>
        <p>Lorem ipsum dolor sit amet.</p>`,
    button = html`<vl-button>button</vl-button>`,
    size = 'default',
    position = 'center',
}: {
    title?: string;
    open?: boolean;
    closable?: boolean;
    notAutoClosable?: boolean;
    notCancellable?: boolean;
    allowOverflow?: boolean;
    content?: TemplateResult;
    button?: TemplateResult;
    size?: 'default' | 'medium' | 'large' | 'full-screen';
    position?: 'center' | 'left' | 'right';
}) => html`<vl-modal
    id="modal-vt"
    title=${title}
    ?open=${open}
    ?closable=${closable}
    ?not-cancellable=${notCancellable}
    ?not-auto-closable=${notAutoClosable}
    ?allow-overflow=${allowOverflow}
    data-cy="modal"
    size="${size}"
    position="${position}"
>
    <span slot="content"> ${content} </span>
    <span slot="button">${button}</span>
</vl-modal>`;

const otherActionButton = html` <vl-link button-as-link class="custom-action-button">
    <vl-icon right-margin="" modal-close=""></vl-icon>
    Andere actie
</vl-link>`;

const openModal = () => {
    cy.getDataCy('button-modal-toggle').click();
};

const getDialog = () => {
    return cy.getDataCy('modal').shadow().find('.vl-modal-dialog');
};

const isDialogHidden = () => {
    getDialog().should('have.attr', 'aria-hidden', 'true').and('not.have.attr', 'open');
};

const isDialogVisible = () => {
    getDialog().should('have.attr', 'aria-hidden', 'false').and('have.attr', 'open');
};

const checkDialogClass = (className: string) => {
    getDialog().should('have.class', className);
};

const closeWithCancelButton = () => {
    cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').click();
};

const closeWithCloseButton = () => {
    cy.getDataCy('modal').shadow().find('#close').click();
};

const clickActionButton = () => {
    cy.getDataCy('modal').find('vl-button').click();
};

const clickCustomActionButton = () => {
    cy.getDataCy('modal').find('.custom-action-button').click();
};

const clickBackdrop = () => {
    getDialog().trigger('pointerdown', { clientX: 1, clientY: 1, force: true });
    getDialog().trigger('click', { clientX: 1, clientY: 1, force: true });
};

const waitForPendingEvents = () => {
    cy.window().then(
        (win) => new Cypress.Promise<void>((resolve) => win.requestAnimationFrame(() => win.setTimeout(resolve)))
    );
};

const pressEnter = () => {
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: {
                    type,
                    key: 'Enter',
                    code: 'Enter',
                    windowsVirtualKeyCode: 13,
                    text: type === 'keyDown' ? '\r' : undefined,
                },
            })
        );
    });
};

const blurActiveElement = () => {
    cy.document().then((doc) => {
        let active = doc.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        (active as HTMLElement | null)?.blur();
        expect(doc.activeElement).to.equal(doc.body);
    });
};

const pressEscapeTwiceWithoutPause = () => {
    cy.then(async () => {
        for (let i = 0; i < 2; i++) {
            for (const type of ['keyDown', 'keyUp'] as const) {
                await Cypress.automation('remote:debugger:protocol', {
                    command: 'Input.dispatchKeyEvent',
                    params: { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
                });
            }
        }
    });
};

const pressEscape = () => {
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
            })
        );
    });
};

describe('cypress-component - block components - vl-modal', () => {
    it('should mount', () => {
        cy.mount(renderModal({ open: true }));
        cy.injectAxe();

        cy.get('vl-modal').shadow().find('dialog.vl-modal-dialog');
    });

    it('should be accessible', () => {
        cy.mount(renderModal({ open: true }));
        cy.injectAxe();

        cy.get('vl-modal');
        cy.checkA11y('vl-modal');
    });

    it('should be able to open by default', () => {
        cy.mount(renderModal({ open: true }));
        cy.injectAxe();

        isDialogVisible();
    });

    it('should be able to close the modal by using the cancel button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should be able to close the modal by using the close button', () => {
        // Test met desktop viewport omdat de close button verborgen wordt op mobiel
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        closeWithCloseButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should close a closable modal by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        pressEscape();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should not close a non-closable modal by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        isDialogVisible();
        pressEscape();
        isDialogVisible();
    });

    it('should not close a non-closable modal by pressing escape when the focus is outside the dialog', () => {
        cy.mount(html`<button modal-open="modal-vt" data-cy="native-trigger">Open</button> ${renderModal({})}`);

        cy.getDataCy('native-trigger').focus();
        pressEnter();
        isDialogVisible();
        blurActiveElement();
        pressEscape();
        isDialogVisible();
    });

    it('should close a closable modal by pressing escape when the focus is outside the dialog', () => {
        cy.mount(html`<button modal-open="modal-vt" data-cy="native-trigger">Open</button>
            ${renderModal({ closable: true })}`);

        cy.getDataCy('native-trigger').focus();
        pressEnter();
        isDialogVisible();
        blurActiveElement();
        pressEscape();
        isDialogHidden();
    });

    it('should be able to render a medium sized modal', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ size: 'medium' })}`);

        openModal();
        checkDialogClass('vl-modal-dialog--medium');
    });

    it('should be able to render a large sized modal', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ size: 'large' })}`);

        openModal();
        checkDialogClass('vl-modal-dialog--large');
    });

    it('should be able to render a full-screen sized modal', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ size: 'full-screen', closable: true })}`);

        openModal();
        checkDialogClass('vl-modal-dialog--full-screen');
    });

    it('should be able to render a left positioned modal', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ position: 'left', closable: true })}`);

        openModal();
        checkDialogClass('vl-modal-dialog--left');
    });

    it('should be able to render a right positioned modal', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ position: 'right', closable: true })}`);

        openModal();
        checkDialogClass('vl-modal-dialog--right');
    });

    // Tests voor de centering na de transform: translate(-50%, -50%) → margin: auto wijziging.
    // Verifieert dat de modal nog steeds correct gecentreerd is zonder transform.
    it('should center the default modal horizontally on the viewport', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        getDialog().then(($dialog) => {
            const dialogRect = $dialog[0].getBoundingClientRect();
            const viewportCenter = 1024 / 2;
            const dialogCenter = dialogRect.left + dialogRect.width / 2;
            // Modal moet horizontaal gecentreerd zijn (50px tolerantie)
            expect(Math.abs(dialogCenter - viewportCenter)).to.be.lessThan(50);
        });
    });

    it('should center the medium modal horizontally on the viewport', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ size: 'medium' })}`);

        openModal();
        getDialog().then(($dialog) => {
            const dialogRect = $dialog[0].getBoundingClientRect();
            const viewportCenter = 1024 / 2;
            const dialogCenter = dialogRect.left + dialogRect.width / 2;
            expect(Math.abs(dialogCenter - viewportCenter)).to.be.lessThan(50);
        });
    });

    it('should center the large modal horizontally on the viewport', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ size: 'large' })}`);

        openModal();
        getDialog().then(($dialog) => {
            const dialogRect = $dialog[0].getBoundingClientRect();
            const viewportCenter = 1024 / 2;
            const dialogCenter = dialogRect.left + dialogRect.width / 2;
            expect(Math.abs(dialogCenter - viewportCenter)).to.be.lessThan(50);
        });
    });

    it('should position the left modal on the left side of the viewport', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ position: 'left', closable: true })}`);

        openModal();
        getDialog().then(($dialog) => {
            const dialogRect = $dialog[0].getBoundingClientRect();
            // Left modal moet links staan (left < 50px)
            expect(dialogRect.left).to.be.lessThan(50);
        });
    });

    it('should position the right modal on the right side of the viewport', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ position: 'right', closable: true })}`);

        openModal();
        getDialog().then(($dialog) => {
            const dialogRect = $dialog[0].getBoundingClientRect();
            // Right modal moet rechts staan (right edge dicht bij viewport rechterrand)
            expect(1024 - dialogRect.right).to.be.lessThan(50);
        });
    });

    it('should not have a transform on the center modal dialog', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        getDialog().then(($dialog) => {
            const transform = getComputedStyle($dialog[0]).transform;
            // transform moet 'none' zijn (geen translate(-50%, -50%) meer)
            expect(transform).to.equal('none');
        });
    });

    it('should open via a data-modal-open trigger', () => {
        cy.mount(html`<button data-modal-open="modal-vt" data-cy="data-trigger">Open</button> ${renderModal({})}`);

        isDialogHidden();
        cy.getDataCy('data-trigger').click();
        isDialogVisible();
    });

    it('should focus the dialog itself when focus-on-modal is set', () => {
        cy.mount(html`${renderOpenButton()}
            <vl-modal id="modal-vt" title="Modal" focus-on-modal data-cy="modal">
                <span slot="content"><button>Eerste knop</button></span>
            </vl-modal>`);

        openModal();
        isDialogVisible();
        cy.getDataCy('modal').shadow().find('dialog').should('have.focus');
    });

    it('should focus the first focusable element without focus-on-modal', () => {
        cy.mount(html`${renderOpenButton()}
            <vl-modal id="modal-vt" title="Modal" data-cy="modal">
                <span slot="content"><button data-cy="first-focusable">Eerste knop</button></span>
            </vl-modal>`);

        openModal();
        isDialogVisible();
        cy.getDataCy('first-focusable').should('have.focus');
    });

    it('should label the dialog with aria-label when only label is set', () => {
        cy.mount(html`<vl-modal id="modal-vt" label="Modal zonder titel" open data-cy="modal">
            <span slot="content">Modal content</span>
        </vl-modal>`);
        cy.injectAxe();

        isDialogVisible();
        getDialog().should('have.attr', 'aria-label', 'Modal zonder titel').and('not.have.attr', 'aria-labelledby');
        cy.checkA11y('vl-modal');
    });

    it('should label the dialog with aria-labelledby when title is set', () => {
        cy.mount(renderModal({ title: 'Modal met titel', open: true }));

        isDialogVisible();
        getDialog().should('have.attr', 'aria-labelledby', 'modal-toggle-title').and('not.have.attr', 'aria-label');
        cy.getDataCy('modal').shadow().find('#modal-toggle-title').should('have.text', 'Modal met titel');
    });

    it('should add vl-u-no-overflow to the body while the modal is open', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
        openModal();
        isDialogVisible();
        cy.get('body').should('have.class', 'vl-u-no-overflow');
        closeWithCancelButton();
        isDialogHidden();
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
    });

    it('should reflect allowOverflow to the allow-overflow attribute', () => {
        cy.mount(renderModal({}));

        cy.getDataCy('modal').should('not.have.attr', 'allow-overflow');
        cy.getDataCy('modal').then(($el) => {
            ($el[0] as VlModalComponent).allowOverflow = true;
        });
        cy.getDataCy('modal').should('have.attr', 'allow-overflow');
        getDialog().should('have.css', 'overflow', 'visible');
    });
});

describe('cypress-component - block components - vl-modal - reactive open attribuut', () => {
    it('should close the modal when the open attribuut is removed', () => {
        cy.mount(renderModal({ open: true }));
        cy.injectAxe();

        isDialogVisible();
        cy.getDataCy('modal').invoke('removeAttr', 'open');
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should open the modal when the open attribuut is added', () => {
        cy.mount(renderModal({}));
        cy.injectAxe();

        isDialogHidden();
        cy.getDataCy('modal').invoke('attr', 'open', '');
        isDialogVisible();
        cy.checkA11y('vl-modal');
    });

    it('should remove the open attribuut from the host when closing via the cancel button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        isDialogVisible();
        cy.getDataCy('modal').should('have.attr', 'open');
        closeWithCancelButton();
        isDialogHidden();
        cy.getDataCy('modal').should('not.have.attr', 'open');
    });
});

describe('cypress-component - block components - vl-modal - events', () => {
    it('should dispatch vl-open when opening via the open attribuut', () => {
        cy.mount(renderModal({}));
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-open', cy.stub().as('vlOpen'));
        });

        cy.getDataCy('modal').invoke('attr', 'open', '');
        isDialogVisible();
        cy.get('@vlOpen').should('have.been.calledOnce');
    });

    it('should dispatch vl-close when closing via the open attribuut', () => {
        cy.mount(renderModal({ open: true }));
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
        });

        isDialogVisible();
        cy.getDataCy('modal').invoke('removeAttr', 'open');
        isDialogHidden();
        cy.get('@vlClose').should('have.been.calledOnce');
    });

    it('should dispatch vl-open via a trigger and vl-close via the cancel button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-open', cy.stub().as('vlOpen'));
            $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
        });

        openModal();
        isDialogVisible();
        cy.get('@vlOpen').should('have.been.calledOnce');
        closeWithCancelButton();
        isDialogHidden();
        cy.get('@vlClose').should('have.been.calledOnce');
    });

    it('should dispatch vl-close when closing by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
        });

        openModal();
        isDialogVisible();
        pressEscape();
        isDialogHidden();
        cy.get('@vlClose').should('have.been.calledOnce');
    });
});

describe('cypress-component - block components - vl-modal - notAutoClosable (true)', () => {
    it('should NOT automatically close the modal when using the action button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: true })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        clickActionButton();
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should NOT automatically close the modal when using a custom action', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: true, button: otherActionButton })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        clickCustomActionButton();
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });
});

describe('cypress-component - block components - vl-modal - notAutoClosable (false)', () => {
    it('should automatically close the modal when using the action button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: false })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        clickActionButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });

    it('should automatically close the modal when using a custom action', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: false, button: otherActionButton })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        clickCustomActionButton();
        isDialogHidden();
        cy.checkA11y('vl-modal');
    });
});

describe('cypress-component - block components - vl-modal - closing behaviour', () => {
    it('should close a closable modal when clicking on the backdrop', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);

        openModal();
        isDialogVisible();
        clickBackdrop();
        isDialogHidden();
    });

    it('should not close a non-closable modal when clicking on the backdrop', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        isDialogVisible();
        clickBackdrop();
        isDialogVisible();
    });

    it('should return focus to the trigger after closing', () => {
        cy.mount(html`<button modal-open="modal-vt" data-cy="native-trigger">Open</button> ${renderModal({})}`);

        cy.getDataCy('native-trigger').click();
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.focused().should('have.attr', 'data-cy', 'native-trigger');
    });

    it('should return focus into a vl-button trigger that had no focus when the modal opened', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        cy.getDataCy('button-modal-toggle').then(($button) => $button[0].click());
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.getDataCy('button-modal-toggle').should(($button) => {
            expect($button[0].matches(':focus-within')).to.equal(true);
        });
    });

    it('should call listeners registered with on() before the modal was rendered', () => {
        const onClose = cy.stub().as('onClose');
        cy.mount(html`<div data-cy="container"></div>`);
        cy.getDataCy('container').then(($container) => {
            const modal = document.createElement('vl-modal');
            modal.setAttribute('title', 'Modal');
            modal.setAttribute('data-cy', 'modal');
            modal.on('close', onClose);
            $container[0].appendChild(modal);
            modal.open();
        });

        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.get('@onClose').should('have.been.calledOnce');
    });
});

describe('cypress-component - block components - vl-modal - api', () => {
    it('should stay open when close() and open() are called in the same tick', () => {
        cy.mount(renderModal({ open: true }));
        isDialogVisible();
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-open', cy.stub().as('vlOpen'));
            $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
            const modal = $el[0] as VlModalComponent;
            modal.on('close', cy.stub().as('nativeClose'));
            modal.close();
            modal.open();
        });
        cy.get('@nativeClose').should('have.been.calledOnce');
        cy.get('@vlClose').should('have.been.calledOnce');
        cy.get('@vlOpen').should('have.been.calledOnce');
        isDialogVisible();
        cy.getDataCy('modal').should('have.attr', 'open');
    });

    it('should clean up when the modal is removed while open', () => {
        cy.mount(html`<div data-cy="container">${renderModal({ open: true })}</div>`);
        isDialogVisible();
        let modal: VlModalComponent;
        cy.get('vl-modal').then(($el) => {
            modal = $el[0] as VlModalComponent;
            modal.addEventListener('vl-close', cy.stub().as('vlClose'));
            modal.remove();
        });
        cy.get('@vlClose').should('have.been.calledOnce');
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
        cy.wrap(null).should(() => {
            expect(modal.isOpen()).to.equal(false);
            expect(modal.hasAttribute('open')).to.equal(false);
        });
    });

    it('should not call listeners removed with off()', () => {
        const onClose = cy.stub().as('onClose');
        cy.mount(renderModal({ open: true }));
        cy.get('vl-modal').then(($el) => {
            const modal = $el[0] as VlModalComponent;
            modal.on('close', onClose);
            modal.off('close', onClose);
        });

        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.get('@onClose').should('not.have.been.called');
    });

    it('should open via a trigger in the same shadow root', () => {
        cy.mount(html`<div data-cy="shadow-host"></div>`);
        cy.getDataCy('shadow-host').then(($host) => {
            $host[0].attachShadow({ mode: 'open' }).innerHTML = `
                <button modal-open="modal-shadow" data-cy="shadow-trigger">Open</button>
                <vl-modal id="modal-shadow" title="Modal" data-cy="modal">
                    <span slot="content">Modal content</span>
                </vl-modal>`;
        });

        cy.getDataCy('shadow-host').shadow().find('[data-cy="shadow-trigger"]').click();
        cy.getDataCy('shadow-host').shadow().find('vl-modal').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should open via a trigger inside an element that stops click propagation', () => {
        cy.mount(html`<div data-cy="stopper"><button modal-open="modal-vt" data-cy="stopped-trigger">Open</button></div>
            ${renderModal({})}`);
        cy.getDataCy('stopper').then(($stopper) => {
            $stopper[0].addEventListener('click', (event) => event.stopPropagation());
        });

        cy.getDataCy('stopped-trigger').click();
        isDialogVisible();
    });

    it('should open via a trigger in the same closed shadow root', () => {
        let modal: VlModalComponent;
        let trigger: HTMLButtonElement;
        cy.mount(html`<div data-cy="closed-host"></div>`);
        cy.getDataCy('closed-host').then(($host) => {
            const root = $host[0].attachShadow({ mode: 'closed' });
            root.innerHTML = `
                <button modal-open="modal-closed">Open</button>
                <vl-modal id="modal-closed" title="Modal">
                    <span slot="content">Modal content</span>
                </vl-modal>`;
            modal = root.querySelector('vl-modal') as VlModalComponent;
            trigger = root.querySelector('button') as HTMLButtonElement;
        });

        cy.then(() => modal.updateComplete);
        cy.then(() => trigger.click());
        cy.wrap(null).should(() => expect(modal.isOpen()).to.equal(true));
    });

    it('should bind the triggers of the new id when the id changes', () => {
        cy.mount(html`<button modal-open="modal-vt" data-cy="old-trigger">Oud</button>
            <button modal-open="modal-nieuw" data-cy="new-trigger">Nieuw</button>
            ${renderModal({})}`);

        cy.getDataCy('modal').invoke('attr', 'id', 'modal-nieuw');
        cy.getDataCy('old-trigger').click();
        isDialogHidden();
        cy.getDataCy('new-trigger').click();
        isDialogVisible();
    });

    it('should open once via a trigger after the modal was reconnected', () => {
        cy.mount(html`<div data-cy="container">${renderOpenButton()} ${renderModal({})}</div>`);
        cy.get('vl-modal').then(($el) => {
            const modal = $el[0] as VlModalComponent;
            const container = modal.parentElement!;
            modal.remove();
            container.append(modal);
            modal.addEventListener('vl-open', cy.stub().as('vlOpen'));
        });

        openModal();
        isDialogVisible();
        cy.get('@vlOpen').should('have.been.calledOnce');
    });

    it('should close a closable modal opened from a non-closable modal by pressing escape', () => {
        cy.mount(html`<button modal-open="modal-outer" data-cy="outer-trigger">Open buiten</button>
            <vl-modal id="modal-outer" title="Buiten" not-cancellable data-cy="modal-outer">
                <div slot="content">
                    <button modal-open="modal-inner" data-cy="inner-trigger">Open binnen</button>
                </div>
            </vl-modal>
            <vl-modal id="modal-inner" title="Binnen" closable data-cy="modal-inner"></vl-modal>`);

        cy.getDataCy('outer-trigger').focus();
        pressEnter();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
        cy.focused().should('have.attr', 'data-cy', 'inner-trigger');
        pressEnter();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('have.attr', 'open');
        pressEscape();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('not.have.attr', 'open');
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
        pressEscape();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should close a closable modal nested in a non-closable modal by pressing escape', () => {
        cy.mount(html`<button modal-open="modal-outer" data-cy="outer-trigger">Open buiten</button>
            <vl-modal id="modal-outer" title="Buiten" not-cancellable data-cy="modal-outer">
                <div slot="content">
                    <button modal-open="modal-inner" data-cy="inner-trigger">Open binnen</button>
                    <vl-modal id="modal-inner" title="Binnen" closable data-cy="modal-inner"></vl-modal>
                </div>
            </vl-modal>`);

        cy.getDataCy('outer-trigger').focus();
        pressEnter();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
        cy.focused().should('have.attr', 'data-cy', 'inner-trigger');
        pressEnter();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('have.attr', 'open');
        pressEscape();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('not.have.attr', 'open');
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
        pressEscape();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should open when open() is called while the modal is detached from the DOM', () => {
        cy.mount(html`<div data-cy="container">${renderModal({})}</div>`);
        isDialogHidden();
        let modal: VlModalComponent;
        let container: HTMLElement;
        cy.get('vl-modal').then(($el) => {
            modal = $el[0] as VlModalComponent;
            container = modal.parentElement!;
            modal.remove();
            modal.open();
            return modal.updateComplete;
        });
        cy.then(() => container.append(modal));

        cy.getDataCy('modal').should('have.attr', 'open');
        getDialog().should('have.attr', 'open');
    });

    it('should stay closed when close() follows open() while the modal is detached', () => {
        cy.mount(html`<div data-cy="container">${renderModal({})}</div>`);
        isDialogHidden();
        let modal: VlModalComponent;
        let container: HTMLElement;
        cy.get('vl-modal').then(($el) => {
            modal = $el[0] as VlModalComponent;
            container = modal.parentElement!;
            modal.remove();
            modal.open();
            modal.close();
            return modal.updateComplete;
        });
        cy.then(() => container.append(modal));

        cy.getDataCy('modal').should('not.have.attr', 'open');
        isDialogHidden();
    });

    it('should stay closed when close() follows open() before the first render', () => {
        let modal: VlModalComponent;
        cy.mount(html`<div data-cy="container"></div>`);
        cy.getDataCy('container').then(($container) => {
            modal = document.createElement('vl-modal');
            modal.setAttribute('title', 'Modal');
            modal.setAttribute('data-cy', 'modal');
            modal.open();
            modal.close();
            $container[0].append(modal);
        });

        cy.getDataCy('modal').should('not.have.attr', 'open');
        isDialogHidden();
    });

    it('should stay open as a modal dialog when an open modal is moved in the same tick', () => {
        cy.mount(html`<div data-cy="from">${renderModal({ open: true })}</div>
            <div data-cy="to"></div>`);
        isDialogVisible();
        cy.get('vl-modal').then(($el) => {
            const modal = $el[0] as VlModalComponent;
            modal.addEventListener('vl-close', cy.stub().as('vlClose'));
            modal.on('close', cy.stub().as('nativeClose'));
            cy.$$('[data-cy="to"]')[0].append(modal);
        });

        cy.getDataCy('to').find('vl-modal').should('have.attr', 'open');
        isDialogVisible();
        getDialog().should(($dialog) => expect($dialog[0].matches(':modal')).to.equal(true));
        waitForPendingEvents();
        cy.get('@vlClose').should('not.have.been.called');
        cy.get('@nativeClose').should('not.have.been.called');
    });

    it('should keep vl-u-no-overflow on the body while another modal is still open', () => {
        cy.mount(html`<vl-modal id="outer" title="Buiten" open data-cy="outer"></vl-modal>
            <vl-modal id="inner" title="Binnen" data-cy="inner"></vl-modal>`);

        cy.getDataCy('outer').shadow().find('dialog').should('have.attr', 'open');
        cy.getDataCy('inner').then(($inner) => ($inner[0] as VlModalComponent).open());
        cy.getDataCy('inner').shadow().find('dialog').should('have.attr', 'open');
        cy.getDataCy('inner').then(($inner) => ($inner[0] as VlModalComponent).close());
        cy.getDataCy('inner').shadow().find('dialog').should('not.have.attr', 'open');
        cy.get('body').should('have.class', 'vl-u-no-overflow');
        cy.getDataCy('outer').then(($outer) => ($outer[0] as VlModalComponent).close());
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
    });

    it('should not close a closable modal when a text selection inside ends on the backdrop', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);

        openModal();
        isDialogVisible();
        cy.getDataCy('modal').find('[slot="content"]').trigger('pointerdown');
        getDialog().trigger('click', { clientX: 1, clientY: 1, force: true });
        isDialogVisible();
    });

    it('should reflect the title property to the title attribute', () => {
        cy.mount(renderModal({ title: 'Oud' }));

        cy.getDataCy('modal').then(($el) => {
            ($el[0] as VlModalComponent).title = 'Nieuw';
        });
        cy.getDataCy('modal').should('have.attr', 'title', 'Nieuw');
        cy.getDataCy('modal').shadow().find('#modal-toggle-title').should('have.text', 'Nieuw');
    });

    it('should bind the triggers of the new id when the id is set via the id property', () => {
        cy.mount(html`<button modal-open="modal-nieuw" data-cy="new-trigger">Nieuw</button> ${renderModal({})}`);

        cy.getDataCy('modal').then(($el) => {
            $el[0].id = 'modal-nieuw';
        });
        cy.getDataCy('new-trigger').click();
        isDialogVisible();
    });

    it('should keep the focus on the same element when an open modal is moved', () => {
        cy.mount(html`<div data-cy="from">
                <vl-modal id="modal-vt" title="Modal" open data-cy="modal">
                    <span slot="content">
                        <button data-cy="first">Eerste</button>
                        <button data-cy="second">Tweede</button>
                    </span>
                </vl-modal>
            </div>
            <div data-cy="to"></div>`);
        isDialogVisible();
        cy.getDataCy('second').focus();
        cy.getDataCy('modal').then(($el) => {
            cy.$$('[data-cy="to"]')[0].append($el[0]);
        });

        isDialogVisible();
        cy.focused().should('have.attr', 'data-cy', 'second');
    });

    it('should return the focus to the element that had it before open() after the modal was moved', () => {
        cy.mount(html`<button data-cy="outside">Buiten</button>
            <div data-cy="from">${renderModal({})}</div>
            <div data-cy="to"></div>`);
        cy.getDataCy('outside').focus();
        cy.getDataCy('modal').then(($el) => ($el[0] as VlModalComponent).open());
        isDialogVisible();
        cy.getDataCy('modal').then(($el) => {
            cy.$$('[data-cy="to"]')[0].append($el[0]);
        });
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
        cy.focused().should('have.attr', 'data-cy', 'outside');
    });

    it('should update the size and position classes after the first render', () => {
        cy.mount(renderModal({ open: true }));
        isDialogVisible();

        cy.getDataCy('modal').invoke('attr', 'size', 'large');
        checkDialogClass('vl-modal-dialog--large');
        cy.getDataCy('modal').invoke('attr', 'position', 'right');
        checkDialogClass('vl-modal-dialog--right');
        cy.getDataCy('modal').invoke('removeAttr', 'size');
        getDialog().should('not.have.class', 'vl-modal-dialog--large');
    });

    it('should add and remove the close button when closable changes after the first render', () => {
        cy.mount(renderModal({ open: true }));
        isDialogVisible();

        cy.getDataCy('modal').shadow().find('#close').should('not.exist');
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        cy.getDataCy('modal').shadow().find('#close').should('exist');
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.getDataCy('modal').shadow().find('#close').should('not.exist');
    });

    it('should add and remove the cancel link when not-cancellable changes after the first render', () => {
        cy.mount(renderModal({ open: true }));
        isDialogVisible();

        cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').should('exist');
        cy.getDataCy('modal').invoke('attr', 'not-cancellable', '');
        cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').should('not.exist');
        cy.getDataCy('modal').invoke('removeAttr', 'not-cancellable');
        cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').should('exist');
    });

    it('should switch between aria-labelledby and aria-label when title and label change after the first render', () => {
        cy.mount(renderModal({ title: 'Titel', open: true }));
        isDialogVisible();

        getDialog().should('have.attr', 'aria-labelledby', 'modal-toggle-title');
        cy.getDataCy('modal').invoke('attr', 'label', 'Label');
        cy.getDataCy('modal').invoke('removeAttr', 'title');
        getDialog().should('have.attr', 'aria-label', 'Label').and('not.have.attr', 'aria-labelledby');
        cy.getDataCy('modal').shadow().find('#modal-toggle-title').should('not.exist');
        cy.getDataCy('modal').invoke('attr', 'title', 'Nieuwe titel');
        getDialog().should('have.attr', 'aria-labelledby', 'modal-toggle-title').and('not.have.attr', 'aria-label');
        cy.getDataCy('modal').shadow().find('#modal-toggle-title').should('have.text', 'Nieuwe titel');
    });

    it('should not add a title attribute when only a label is set', () => {
        cy.mount(html`<vl-modal id="modal-vt" label="Enkel label" open data-cy="modal"></vl-modal>`);

        isDialogVisible();
        cy.getDataCy('modal').should('not.have.attr', 'title');
    });

    it('should keep blocking escape for a non-closable modal that is moved above a closable modal', () => {
        cy.mount(html`<button modal-open="modal-a" data-cy="trigger-a">Open A</button>
            <div data-cy="from">
                <vl-modal id="modal-a" title="A" not-cancellable data-cy="modal-a">
                    <div slot="content"><button modal-open="modal-b" data-cy="trigger-b">Open B</button></div>
                </vl-modal>
            </div>
            <vl-modal id="modal-b" title="B" closable data-cy="modal-b"></vl-modal>
            <div data-cy="to"></div>`);

        cy.getDataCy('trigger-a').focus();
        pressEnter();
        cy.getDataCy('modal-a').shadow().find('dialog').should('have.attr', 'open');
        cy.focused().should('have.attr', 'data-cy', 'trigger-b');
        pressEnter();
        cy.getDataCy('modal-b').shadow().find('dialog').should('have.attr', 'open');
        cy.getDataCy('modal-a').then(($a) => {
            cy.$$('[data-cy="to"]')[0].append($a[0]);
        });
        cy.getDataCy('modal-a').shadow().find('dialog').should('have.attr', 'open');
        pressEscape();
        cy.getDataCy('modal-a').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should keep a non-closable modal open when escape is pressed twice quickly with a closable modal on top', () => {
        cy.mount(html`<button modal-open="modal-outer" data-cy="outer-trigger">Open buiten</button>
            <vl-modal id="modal-outer" title="Buiten" not-cancellable data-cy="modal-outer">
                <div slot="content">
                    <button modal-open="modal-inner" data-cy="inner-trigger">Open binnen</button>
                </div>
            </vl-modal>
            <vl-modal id="modal-inner" title="Binnen" closable data-cy="modal-inner"></vl-modal>`);

        cy.getDataCy('outer-trigger').focus();
        pressEnter();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
        cy.focused().should('have.attr', 'data-cy', 'inner-trigger');
        pressEnter();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('have.attr', 'open');
        pressEscapeTwiceWithoutPause();
        cy.getDataCy('modal-inner').shadow().find('dialog').should('not.have.attr', 'open');
        waitForPendingEvents();
        cy.getDataCy('modal-outer').shadow().find('dialog').should('have.attr', 'open');
    });
});

