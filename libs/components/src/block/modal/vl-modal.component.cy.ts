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
    getDialog().should('have.attr', 'aria-hidden', 'true');
};

const isDialogVisible = () => {
    getDialog().should('have.attr', 'aria-hidden', 'false');
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

const closeByPressingEscape = () => {
    // Dit zou moeten werken met `cy.get('body').type('{esc}')`,
    // Cypress verwacht echter dat `.type()` uitgevoerd wordt op een "typeable" element.
    // `{ force: true }` is nodig om in de shadow dom te kunnen typen.
    // (https://github.com/cypress-io/cypress/issues/7741)
    cy.getDataCy('modal').shadow().find('vl-link').shadow().find('button').first().type('{esc}', { force: true });
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

    it('should close the modal by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ button: otherActionButton })}`);
        cy.injectAxe();

        isDialogHidden();
        openModal();
        cy.checkA11y('vl-modal');

        isDialogVisible();
        closeByPressingEscape();
        isDialogHidden();
        cy.checkA11y('vl-modal');
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
