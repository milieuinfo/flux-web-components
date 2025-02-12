import { registerWebComponents } from '@domg-wc/common-utilities';
import { html, TemplateResult } from 'lit';
import { VlButtonComponent } from '../next/button';
import { VlModalComponent } from './vl-modal.component';

registerWebComponents([VlModalComponent, VlButtonComponent]);

const renderOpenButton = () => html`<vl-button-next data-vl-modal-open="modal-vt" data-cy="button-modal-toggle">
    Open
</vl-button-next>`;

const renderModal = ({
    title = 'Modal',
    open = false,
    closable = false,
    notAutoClosable = false,
    notCancellable = false,
    allowOverflow = false,
    content = html`<p>Modal content</p>
        <p>Lorem ipsum dolor sit amet.</p>`,
    button = html`<vl-button-next>button</vl-button-next>`,
}: {
    title?: string;
    open?: boolean;
    closable?: boolean;
    notAutoClosable?: boolean;
    notCancellable?: boolean;
    allowOverflow?: boolean;
    content?: TemplateResult;
    button?: TemplateResult;
}) => html`<vl-modal
    id="modal-vt"
    data-vl-title=${title}
    ?data-vl-open=${open}
    ?data-vl-closable=${closable}
    ?data-vl-not-cancellable=${notCancellable}
    ?data-vl-not-auto-closable=${notAutoClosable}
    ?data-vl-allow-overflow=${allowOverflow}
    data-cy="modal"
>
    <span slot="content"> ${content} </span>
    <span slot="button">${button}</span>
</vl-modal>`;

const otherActionButton = html`<button is="vl-button-link" class="custom-action-button">
    <span is="vl-icon" data-vl-icon="cross" before="" data-vl-modal-close=""></span>
    Andere actie
</button>`;

const openModal = () => {
    cy.getDataCy('button-modal-toggle').click();
};

const isDialogHidden = () => {
    cy.getDataCy('modal').shadow().find('.vl-modal-dialog').should('have.attr', 'aria-hidden', 'true');
};

const isDialogVisible = () => {
    cy.getDataCy('modal').shadow().find('.vl-modal-dialog').should('have.attr', 'aria-hidden', 'false');
};

const closeWithCancelButton = () => {
    cy.getDataCy('modal').shadow().find('#modal-toggle-cancellable').click();
};

const closeWithCloseButton = () => {
    cy.getDataCy('modal').shadow().find('#close').click();
};

const clickActionButton = () => {
    cy.getDataCy('modal').find('vl-button-next').click();
};

const clickCustomActionButton = () => {
    cy.getDataCy('modal').find('button.custom-action-button').click();
};

const closeByPressingEscape = () => {
    cy.get('body').type('{esc}');
};

describe('component - vl-modal', () => {
    it('should mount', () => {
        cy.mount(renderModal({ open: true }));

        cy.get('vl-modal').shadow().find('dialog.vl-modal-dialog');
    });

    it('should be able to open by default', () => {
        cy.mount(renderModal({ open: true }));

        isDialogVisible();
    });

    it('should contain a toggable modal by using the cancel button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({})}`);

        isDialogHidden();
        openModal();
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
    });

    it('should contain a toggable modal by using the close button', () => {
        // Test met desktop viewport omdat de close button verborgen wordt op mobiel
        cy.viewport(1024, 768);
        cy.mount(html`${renderOpenButton()} ${renderModal({ closable: true })}`);

        isDialogHidden();
        openModal();
        isDialogVisible();
        closeWithCloseButton();
        isDialogHidden();
    });

    it('should contain a non closable modal when using the action button', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ notAutoClosable: true })}`);

        isDialogHidden();
        openModal();
        isDialogVisible();
        clickActionButton();
        isDialogVisible();
        closeWithCancelButton();
        isDialogHidden();
    });

    it('should contain an automatically closable modal by clicking the custom action link', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ button: otherActionButton })}`);

        isDialogHidden();
        openModal();
        isDialogVisible();
        clickCustomActionButton();
        isDialogHidden();
    });

    // TODO: deze test faalt
    it.skip('should contain a closable modal by pressing escape', () => {
        cy.mount(html`${renderOpenButton()} ${renderModal({ button: otherActionButton })}`);

        isDialogHidden();
        openModal();
        isDialogVisible();
        closeByPressingEscape();
        isDialogHidden();
    });
});
