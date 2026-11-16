import { registerWebComponents } from '@domg-wc/common';
import { html, TemplateResult } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlIconComponent } from '../../atom/icon';
import { VlDatepickerComponent } from '../../form/datepicker';
import { VlInputFieldComponent } from '../../form/input-field';
import { VlModalComponent } from './vl-modal.component';

registerWebComponents([
    VlModalComponent,
    VlButtonComponent,
    VlIconComponent,
    VlDatepickerComponent,
    VlInputFieldComponent,
]);

const renderOpenButton = () => html`<vl-button modal-open="modal-vt" data-cy="button-modal-toggle"> Open </vl-button>`;

// De host van vl-button is zelf niet focusbaar; met een native knop is de focus-terugkeer na sluiten observeerbaar.
const renderNativeOpenButton = () =>
    html`<button type="button" modal-open="modal-vt" data-cy="native-button-modal-toggle">Open</button>`;

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

const openModalWithNativeButton = () => {
    cy.getDataCy('native-button-modal-toggle').click();
};

const getDialog = (dataCy = 'modal') => {
    return cy.getDataCy(dataCy).shadow().find('.vl-modal-dialog');
};

const isDialogHidden = (dataCy = 'modal') => {
    getDialog(dataCy).should('not.have.attr', 'open');
    getDialog(dataCy).should('have.attr', 'aria-hidden', 'true');
};

const isDialogVisible = (dataCy = 'modal') => {
    getDialog(dataCy).should('have.attr', 'open');
    getDialog(dataCy).should('have.attr', 'aria-hidden', 'false');
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

// `.type('{esc}')` simuleert enkel events, waarop de native <dialog> niet reageert; via het Chrome DevTools Protocol
// verloopt de toetsaanslag als echte browser-input.
const realPressEscape = () => {
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
            }),
        );
    });
};

const realClickAt = (autWindow: Window, clientX: number, clientY: number) => {
    const frameRect = autWindow.frameElement!.getBoundingClientRect();
    const scale = frameRect.width / autWindow.innerWidth;
    const x = frameRect.left + clientX * scale;
    const y = frameRect.top + clientY * scale;
    (['mousePressed', 'mouseReleased'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchMouseEvent',
                params: { type, x, y, button: 'left', clickCount: 1 },
            }),
        );
    });
};

// Een echte klik in de linkerbovenhoek van de viewport landt op de ::backdrop van de dialog.
const realClickBackdrop = () => {
    cy.window().then((autWindow) => realClickAt(autWindow, 5, 5));
};

// Een echte klik geeft user activation. Zonder die bundelt de browser de close watchers van modals die na elkaar openen,
// zodat één Escape ze allemaal sluit.
const realClick = (dataCy: string) => {
    cy.getDataCy(dataCy).then(($element) => {
        const rect = $element[0].getBoundingClientRect();
        realClickAt($element[0].ownerDocument.defaultView!, rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
};

const stubVlClose = () => {
    cy.get('vl-modal').then(($el) => {
        $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
    });
};

const shouldBeClosedWithCleanup = () => {
    isDialogHidden();
    cy.get('body').should('not.have.class', 'vl-u-no-overflow');
    cy.getDataCy('native-button-modal-toggle').should('have.focus');
    cy.get('@vlClose').should('have.been.calledOnce');
};

const moveModal = (containerId: string) => {
    cy.get('vl-modal').then(($modal) => {
        $modal[0].ownerDocument.getElementById(containerId)!.append($modal[0]);
    });
};

const mountWithFocusMovingVlCloseHandler = () => {
    cy.mount(
        html`${renderNativeOpenButton()} <button data-cy="focus-target">Doel</button> ${renderModal({
                closable: true,
            })}`,
    );
    cy.get('vl-modal').then(($el) => {
        const focusTarget = $el[0].ownerDocument.querySelector<HTMLElement>('[data-cy="focus-target"]')!;
        $el[0].addEventListener('vl-close', () => focusTarget.focus());
    });
    getDialog().then(($dialog) => {
        $dialog[0].addEventListener('close', cy.stub().as('dialogClose'));
    });
};

const renderStackedModals = ({ bottomClosable, topClosable }: { bottomClosable: boolean; topClosable: boolean }) =>
    html`${renderNativeOpenButton()}
        <vl-modal id="modal-vt" title="Onderste modal" ?closable=${bottomClosable} data-cy="modal">
            <span slot="content">
                <button type="button" modal-open="modal-top" data-cy="open-top-modal">Open bovenste modal</button>
            </span>
        </vl-modal>
        <vl-modal id="modal-top" title="Bovenste modal" ?closable=${topClosable} not-auto-closable data-cy="modal-top">
            <span slot="content"><p>Bovenste modal</p></span>
            <span slot="button"><button type="button" data-cy="top-save">Bewaar</button></span>
        </vl-modal>`;

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
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true, button: otherActionButton })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        realPressEscape();
        isDialogHidden();
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
        cy.checkA11y('vl-modal');
    });

    it('should not close a non-closable modal by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ button: otherActionButton })}`);

        openModal();
        isDialogVisible();
        realPressEscape();
        isDialogVisible();
    });

    it('should close a closable modal by clicking the backdrop', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);

        openModal();
        isDialogVisible();
        realClickBackdrop();
        isDialogHidden();
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
    });

    it('should not close a non-closable modal by clicking the backdrop', () => {
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        isDialogVisible();
        realClickBackdrop();
        isDialogVisible();
    });

    it('should NOT close by clicking a light DOM element with modal-close in the content', () => {
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({ content: html`<button type="button" modal-close data-cy="content-close">Sluit</button>` })}`,
        );

        openModal();
        cy.getDataCy('content-close').click();
        isDialogVisible();
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

    it('should wrap a long word in the title instead of scrolling horizontally', () => {
        cy.viewport(1280, 800);
        cy.mount(renderModal({ open: true, title: 'een.heel.lange.code.zonder.spaties.die.niet.afbreekt' }));

        isDialogVisible();
        getDialog()
            .find('.vl-modal-dialog__wrapper')
            .should(([wrapper]) => {
                const title = wrapper.querySelector<HTMLElement>('.vl-modal-dialog__title')!;
                expect(title.scrollWidth).to.be.at.most(title.clientWidth);
                expect(wrapper.scrollWidth).to.be.at.most(wrapper.clientWidth);
                expect(title.getBoundingClientRect().right).to.be.at.most(wrapper.getBoundingClientRect().right);
            });
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
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true, button: otherActionButton })}`);
        cy.get('vl-modal').then(($el) => {
            $el[0].addEventListener('vl-close', cy.stub().as('vlClose'));
        });

        openModal();
        isDialogVisible();
        realPressEscape();
        isDialogHidden();
        cy.get('@vlClose').should('have.been.calledOnce');
    });

    it('should keep the focus where a vl-close handler moved it', () => {
        mountWithFocusMovingVlCloseHandler();

        openModalWithNativeButton();
        closeWithCancelButton();
        isDialogHidden();
        cy.get('@dialogClose').should('have.been.calledOnce');
        cy.getDataCy('focus-target').should('have.focus');
    });

    it('should keep the focus where a vl-close handler moved it after pressing escape', () => {
        mountWithFocusMovingVlCloseHandler();

        openModalWithNativeButton();
        realPressEscape();
        isDialogHidden();
        cy.get('@dialogClose').should('have.been.calledOnce');
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
        cy.getDataCy('focus-target').should('have.focus');
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

describe('cypress-component - block components - vl-modal - reactive closable attribuut', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    it('should not close by pressing escape or clicking the backdrop after closable is removed', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        isDialogVisible();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.getDataCy('modal').shadow().find('#close').should('not.exist');
        realPressEscape();
        isDialogVisible();
        realClickBackdrop();
        isDialogVisible();
        cy.get('body').should('have.class', 'vl-u-no-overflow');
        cy.get('@vlClose').should('not.have.been.called');
    });

    it('should not close by pressing escape after the focused close button disappears with closable', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').shadow().find('#close').focus();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        realPressEscape();
        isDialogVisible();
        cy.get('@vlClose').should('not.have.been.called');

        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realPressEscape();
        shouldBeClosedWithCleanup();
    });

    it('should not close by pressing escape after the focused action button is disabled and closable is removed', () => {
        cy.mount(
            html`${renderNativeOpenButton()}
            ${renderModal({
                closable: true,
                notAutoClosable: true,
                button: html`<button type="button" data-cy="save">Bewaar</button>`,
            })}`,
        );
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('save').focus().invoke('prop', 'disabled', true);
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.document().its('activeElement.tagName').should('eq', 'BODY');
        realPressEscape();
        isDialogVisible();
        cy.get('@vlClose').should('not.have.been.called');

        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realPressEscape();
        shouldBeClosedWithCleanup();
    });

    it('should move the focus to the dialog when the focused close button disappears with closable', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);

        openModalWithNativeButton();
        isDialogVisible();
        cy.getDataCy('modal').shadow().find('#close').focus();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        getDialog().should(($dialog) => {
            expect(($dialog[0].getRootNode() as ShadowRoot).activeElement).to.equal($dialog[0]);
        });
    });

    it('should close by using the close button after closable is added again', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        closeWithCloseButton();
        shouldBeClosedWithCleanup();
    });

    it('should close by pressing escape after closable is added again', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realPressEscape();
        shouldBeClosedWithCleanup();
    });

    it('should close by clicking the backdrop after closable is added again', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').invoke('removeAttr', 'closable');
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realClickBackdrop();
        shouldBeClosedWithCleanup();
    });

    it('should close by pressing escape when closable is added after the start', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({})}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realPressEscape();
        shouldBeClosedWithCleanup();
    });

    it('should close by clicking the backdrop when closable is added after the start', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({})}`);
        stubVlClose();

        openModalWithNativeButton();
        cy.getDataCy('modal').invoke('attr', 'closable', '');
        realClickBackdrop();
        shouldBeClosedWithCleanup();
    });

    it('should clean up after pressing escape when the open dialog got aria-hidden from elsewhere', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderModal({ closable: true })}`);
        stubVlClose();

        openModalWithNativeButton();
        isDialogVisible();
        getDialog().invoke('attr', 'aria-hidden', 'true');
        realPressEscape();
        shouldBeClosedWithCleanup();
    });
});

describe('cypress-component - block components - vl-modal - stacked modals', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    const openTopModal = () => {
        openModalWithNativeButton();
        realClick('open-top-modal');
        isDialogVisible('modal-top');
    };

    const openTopModalWithFocusOnBody = () => {
        openTopModal();
        cy.getDataCy('top-save').focus().invoke('prop', 'disabled', true);
        cy.document().its('activeElement.tagName').should('eq', 'BODY');
    };

    it('should close a closable top modal by pressing escape with the focus on body above a non-closable modal', () => {
        cy.mount(renderStackedModals({ bottomClosable: false, topClosable: true }));

        openTopModalWithFocusOnBody();
        realPressEscape();
        isDialogHidden('modal-top');
        isDialogVisible();
    });

    it('should not close a non-closable top modal by pressing escape with the focus on body above a closable modal', () => {
        cy.mount(renderStackedModals({ bottomClosable: true, topClosable: false }));

        openTopModalWithFocusOnBody();
        realPressEscape();
        isDialogVisible('modal-top');
        isDialogVisible();
    });

    it('should close only the top modal by clicking its backdrop', () => {
        cy.mount(renderStackedModals({ bottomClosable: true, topClosable: true }));

        openTopModal();
        realClickBackdrop();
        isDialogHidden('modal-top');
        isDialogVisible();
    });
});

describe('cypress-component - block components - vl-modal - listeners', () => {
    it('should not add listeners to the document or the open trigger when the modal is moved in the DOM', () => {
        cy.mount(
            html`<div id="container-a">${renderNativeOpenButton()} ${renderModal({ closable: true })}</div>
                <div id="container-b"></div>`,
        );
        cy.document().then((doc) => {
            cy.spy(doc, 'addEventListener').as('documentAddEventListener');
        });
        cy.getDataCy('native-button-modal-toggle').then(($trigger) => {
            cy.spy($trigger[0], 'addEventListener').as('triggerAddEventListener');
        });

        moveModal('container-b');
        moveModal('container-a');
        moveModal('container-b');
        cy.get('@documentAddEventListener').should('not.have.been.called');
        cy.get('@triggerAddEventListener').should('not.have.been.called');
    });

    it('should clean up when a click on a close trigger removes the modal', () => {
        cy.mount(
            html`${renderNativeOpenButton()}
            ${renderModal({ button: html`<button type="button" data-cy="save">Bewaar</button>` })}`,
        );
        cy.get('vl-modal').then(($modal) => {
            $modal[0].querySelector('[data-cy="save"]')!.addEventListener('click', () => $modal[0].remove());
        });

        openModalWithNativeButton();
        cy.getDataCy('save').click();
        cy.get('vl-modal').should('not.exist');
        cy.get('body').should('not.have.class', 'vl-u-no-overflow');
        cy.getDataCy('native-button-modal-toggle').should('have.focus');
    });

    it('should still open and close after the modal is moved in the DOM', () => {
        cy.mount(
            html`<div id="container-a">${renderNativeOpenButton()} ${renderModal({ closable: true })}</div>
                <div id="container-b"></div>`,
        );
        stubVlClose();

        moveModal('container-b');
        openModalWithNativeButton();
        isDialogVisible();
        realPressEscape();
        shouldBeClosedWithCleanup();
    });
});

describe('cypress-component - block components - vl-modal - reactive close triggers', () => {
    it('should close by using the cancel button after not-cancellable is removed again', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        cy.getDataCy('modal').invoke('attr', 'not-cancellable', '');
        cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').should('not.exist');
        cy.getDataCy('modal').invoke('removeAttr', 'not-cancellable');
        closeWithCancelButton();
        isDialogHidden();
    });

    it('should automatically close by using the action button after not-auto-closable is removed', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: true })}`);

        openModal();
        cy.getDataCy('modal').invoke('removeAttr', 'not-auto-closable');
        clickActionButton();
        isDialogHidden();
    });

    it('should NOT automatically close by using the action button after not-auto-closable is added', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        openModal();
        cy.getDataCy('modal').invoke('attr', 'not-auto-closable', '');
        clickActionButton();
        isDialogVisible();
    });
});

// Firefox en Safari zoeken bij showModal() het eerste focusbare element enkel in de shadow tree van de modal, niet in
// de inhoud van de slots, en focussen zo de sluitknop. Cypress draait in Chromium; deze stub bootst dat gedrag na.
const emulateShowModalFocusingCloseButton = () => {
    cy.window().then((autWindow) => {
        const showModal = autWindow.HTMLDialogElement.prototype.showModal;
        cy.stub(autWindow.HTMLDialogElement.prototype, 'showModal').callsFake(function (this: HTMLDialogElement) {
            showModal.call(this);
            this.querySelector<HTMLElement>('#close')?.focus();
        });
    });
};

describe('cypress-component - block components - vl-modal - initial focus', () => {
    beforeEach(() => {
        // desktop viewport omdat de sluitknop verborgen wordt op mobiel
        cy.viewport(1024, 768);
    });

    it('should focus the first focusable element in the content when the browser focuses the close button', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({ closable: true, content: html`<input data-cy="first-focusable" />` })}`,
        );

        openModal();
        isDialogVisible();
        cy.getDataCy('first-focusable').should('have.focus');
    });

    it('should focus the first focusable element in a slotted datepicker when the browser focuses the close button', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({
                closable: true,
                content: html`<vl-datepicker block label="Kies een datum" data-cy="datepicker"></vl-datepicker>`,
            })}`,
        );

        openModal();
        isDialogVisible();
        cy.getDataCy('datepicker').should(($datepicker) => {
            const activeElement = $datepicker[0].shadowRoot!.activeElement;
            expect(activeElement?.tagName).to.equal('INPUT');
            expect(activeElement!.getBoundingClientRect().width).to.be.greaterThan(0);
        });
    });

    it('should focus the first focusable element in the content when the modal opens with the open attribute', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(renderModal({ open: true, closable: true, content: html`<input data-cy="first-focusable" />` }));

        isDialogVisible();
        cy.getDataCy('first-focusable').should('have.focus');
    });

    it('should focus the element with autofocus in the content', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({
                closable: true,
                content: html`<input /> <input autofocus data-cy="autofocus" />`,
            })}`,
        );

        openModal();
        isDialogVisible();
        cy.getDataCy('autofocus').should('have.focus');
    });

    it('should focus an element with autofocus and tabindex -1 in the content', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({
                closable: true,
                content: html`<h3 tabindex="-1" autofocus data-cy="autofocus">Titel</h3>
                    <input />`,
            })}`,
        );

        openModal();
        isDialogVisible();
        cy.getDataCy('autofocus').should('have.focus');
    });

    it('should focus the dialog itself when focus-on-modal is set', () => {
        emulateShowModalFocusingCloseButton();
        cy.mount(
            html`${renderOpenButton()}
                <vl-modal id="modal-vt" title="Modal" closable focus-on-modal data-cy="modal">
                    <span slot="content"><input /></span>
                </vl-modal>`,
        );

        openModal();
        isDialogVisible();
        getDialog().should('have.focus');
    });

    it('should keep the start of long content in view instead of focusing a focusable element further down', () => {
        cy.viewport(1024, 400);
        cy.mount(
            html`${renderOpenButton()}
            ${renderModal({
                closable: true,
                content: html`<p data-cy="first-paragraph">Begin van de inhoud</p>
                    ${Array.from({ length: 20 }, () => html`<p>Lorem ipsum dolor sit amet.</p>`)}
                    <input data-cy="last-input" />`,
            })}`,
        );

        openModal();
        isDialogVisible();
        getDialog().should('have.focus');
        getDialog().then(($dialog) => {
            const dialogTop = $dialog[0].getBoundingClientRect().top;
            cy.getDataCy('first-paragraph').should(($paragraph) => {
                expect($paragraph[0].getBoundingClientRect().top).to.be.at.least(dialogTop);
            });
        });
    });

    it('should focus the dialog itself when it contains no focusable element', () => {
        cy.mount(
            html`${renderOpenButton()}
                <vl-modal id="modal-vt" title="Modal" not-cancellable data-cy="modal">
                    <span slot="content"><p>Enkel tekst</p></span>
                </vl-modal>`,
        );

        openModal();
        isDialogVisible();
        getDialog().should('have.focus');
    });
});

const shouldFitWithinViewport = (viewportWidth: number) => {
    getDialog().then(($dialog) => {
        const dialogRect = $dialog[0].getBoundingClientRect();
        expect(dialogRect.left).to.be.at.least(0);
        expect(dialogRect.right).to.be.at.most(viewportWidth);
    });
    cy.getDataCy('datepicker')
        .shadow()
        .find('#toggle-calendar')
        .then(($button) => {
            const buttonRect = $button[0].getBoundingClientRect();
            expect(buttonRect.left).to.be.at.least(0);
            expect(buttonRect.right).to.be.at.most(viewportWidth);
        });
};

describe('cypress-component - block components - vl-modal - reflow', () => {
    (['medium', 'large'] as const).forEach((size) => {
        it(`should fit a ${size} modal with a datepicker within a narrow viewport`, () => {
            cy.viewport(320, 640);
            cy.mount(
                html`${renderOpenButton()}
                ${renderModal({
                    size,
                    content: html`<vl-datepicker block label="Kies een datum" data-cy="datepicker"></vl-datepicker>`,
                })}`,
            );

            openModal();
            isDialogVisible();
            shouldFitWithinViewport(320);
        });
    });
});

describe('cypress-component - block components - vl-modal - autofocus', () => {
    const renderConfirmModal = ({ open = false, focusOnModal = false, disabled = false } = {}) =>
        html`<vl-modal
            id="modal-vt"
            title="Wijzigingen verwerpen?"
            not-cancellable
            ?open=${open}
            ?focus-on-modal=${focusOnModal}
            data-cy="modal"
        >
            <span slot="content">Je wijzigingen gaan verloren.</span>
            <vl-button slot="button" error data-cy="discard">Verwerpen</vl-button>
            <vl-button slot="button" autofocus ?disabled=${disabled} data-cy="keep-editing">Verder bewerken</vl-button>
        </vl-modal>`;

    const shouldFocusButton = (dataCy: string) => {
        cy.getDataCy(dataCy).shadow().find('button').should('have.focus');
    };

    it('should focus the slotted element with autofocus when opening via a trigger', () => {
        cy.mount(html`${renderOpenButton()} ${renderConfirmModal()}`);
        cy.injectAxe();

        openModal();
        isDialogVisible();
        shouldFocusButton('keep-editing');
        cy.checkA11y('vl-modal');
    });

    it('should not focus the first focusable element before the element with autofocus', () => {
        cy.mount(html`${renderOpenButton()} ${renderConfirmModal()}`);
        cy.getDataCy('discard').then(($el) => $el[0].addEventListener('focusin', cy.stub().as('discardFocusin')));

        openModal();
        isDialogVisible();
        shouldFocusButton('keep-editing');
        cy.get('@discardFocusin').should('not.have.been.called');
    });

    it('should focus the slotted element with autofocus when the open attribute is added', () => {
        cy.mount(renderConfirmModal());

        isDialogHidden();
        cy.getDataCy('modal').invoke('attr', 'open', '');
        isDialogVisible();
        shouldFocusButton('keep-editing');
    });

    it('should focus the slotted element with autofocus when opening via open()', () => {
        cy.mount(renderConfirmModal());

        isDialogHidden();
        cy.getDataCy('modal').then(($el) => ($el[0] as VlModalComponent).open());
        isDialogVisible();
        shouldFocusButton('keep-editing');
    });

    it('should focus the slotted element with autofocus when the modal is open from the start', () => {
        cy.mount(renderConfirmModal({ open: true }));

        isDialogVisible();
        shouldFocusButton('keep-editing');
    });

    it('should move the focus to the element with autofocus once it is rendered', () => {
        cy.mount(
            html`<vl-modal id="modal-vt" title="Naam wijzigen" open data-cy="modal">
                <button slot="content" data-cy="first-focusable">Hulp</button>
                <vl-button slot="button" autofocus data-cy="save">Bewaren</vl-button>
            </vl-modal>`,
        );

        isDialogVisible();
        shouldFocusButton('save');
    });

    it('should focus the first element with autofocus when the modal is open from the start', () => {
        cy.mount(
            html`<vl-modal id="modal-vt" title="Naam wijzigen" open data-cy="modal">
                <vl-input-field slot="content" id="naam" label="Naam" autofocus data-cy="name"></vl-input-field>
                <button slot="button" autofocus>Bewaren</button>
            </vl-modal>`,
        );

        isDialogVisible();
        cy.getDataCy('name').shadow().find('input').should('have.focus');
    });

    it('should focus an element with autofocus in the content slot before one in the button slot', () => {
        cy.mount(
            html`${renderOpenButton()}
                <vl-modal id="modal-vt" title="Naam wijzigen" data-cy="modal">
                    <div slot="content">
                        <button data-cy="first-focusable">Hulp</button>
                        <vl-input-field id="naam" label="Naam" autofocus data-cy="name"></vl-input-field>
                    </div>
                    <vl-button slot="button" autofocus>Bewaren</vl-button>
                </vl-modal>`,
        );

        openModal();
        isDialogVisible();
        cy.getDataCy('name').shadow().find('input').should('have.focus');
    });

    it('should focus the dialog itself when focus-on-modal is set next to an element with autofocus', () => {
        cy.mount(html`${renderOpenButton()} ${renderConfirmModal({ focusOnModal: true })}`);

        openModal();
        isDialogVisible();
        getDialog().should('have.focus');
    });

    it('should focus the first focusable element when the element with autofocus is disabled', () => {
        cy.mount(html`${renderOpenButton()} ${renderConfirmModal({ disabled: true })}`);

        openModal();
        isDialogVisible();
        shouldFocusButton('discard');
    });

    it('should skip an element with autofocus that cannot receive focus', () => {
        cy.mount(
            html`${renderOpenButton()}
                <vl-modal id="modal-vt" title="Modal" data-cy="modal">
                    <div slot="content" autofocus>
                        Niet focusbaar
                        <input autofocus hidden />
                    </div>
                    <vl-button slot="button" data-cy="first-focusable">Bewaren</vl-button>
                </vl-modal>`,
        );

        openModal();
        isDialogVisible();
        shouldFocusButton('first-focusable');
    });

    it('should ignore an element with autofocus in a nested modal', () => {
        cy.mount(
            html`<button modal-open="modal-outer" data-cy="outer-trigger">Open buiten</button>
                <vl-modal id="modal-outer" title="Buiten" data-cy="modal-outer">
                    <div slot="content">
                        <button modal-open="modal-inner" data-cy="inner-trigger">Open binnen</button>
                        <vl-modal id="modal-inner" title="Binnen" data-cy="modal-inner">
                            <vl-button slot="button">Eerste</vl-button>
                            <vl-button slot="button" autofocus data-cy="inner-autofocus">Tweede</vl-button>
                        </vl-modal>
                    </div>
                </vl-modal>`,
        );

        cy.getDataCy('outer-trigger').click();
        isDialogVisible('modal-outer');
        cy.getDataCy('inner-trigger').should('have.focus');
        cy.getDataCy('inner-trigger').click();
        isDialogVisible('modal-inner');
        shouldFocusButton('inner-autofocus');
    });

    it('should keep the focus where a vl-open handler moved it', () => {
        cy.mount(html`${renderOpenButton()} ${renderConfirmModal()}`);
        cy.getDataCy('modal').then(($el: JQuery<HTMLElement>) => {
            const discard = $el[0].querySelector<HTMLElement>('[data-cy="discard"]')!;
            $el[0].addEventListener('vl-open', () => discard.focus());
        });

        openModal();
        isDialogVisible();
        shouldFocusButton('discard');
    });

    it('should keep the focus where a vl-open handler moved it when the modal is open from the start', () => {
        const focusHelp = (event: Event) =>
            (event.currentTarget as HTMLElement).querySelector<HTMLElement>('[data-cy="help"]')!.focus();
        cy.mount(
            html`<vl-modal id="modal-vt" title="Naam wijzigen" open data-cy="modal" @vl-open=${focusHelp}>
                <div slot="content">
                    <button data-cy="first-focusable">Eerste knop</button>
                    <button data-cy="help">Hulp</button>
                </div>
                <vl-button slot="button" autofocus data-cy="save">Bewaren</vl-button>
            </vl-modal>`,
        );

        isDialogVisible();
        cy.getDataCy('save').shadow().find('button').should('exist');
        cy.getDataCy('help').should('have.focus');
    });

    it('should return focus to the trigger after closing a modal with an autofocus element', () => {
        cy.mount(html`${renderNativeOpenButton()} ${renderConfirmModal()}`);

        openModalWithNativeButton();
        isDialogVisible();
        shouldFocusButton('keep-editing');
        cy.getDataCy('keep-editing').click();
        isDialogHidden();
        cy.getDataCy('native-button-modal-toggle').should('have.focus');
    });
});
