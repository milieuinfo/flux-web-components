import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlUploadProgressComponent } from './vl-upload-progress.component';
import { UploadProgressDefaults } from './vl-upload-progress.defaults';

registerWebComponents([VlUploadProgressComponent]);

const mountDefault = ({
    filename,
    filesize,
    progress,
    indeterminate,
    label,
    cancellable,
    retryable,
    error,
    success,
    message,
    hideProgress,
}: Partial<UploadProgressDefaults> = {}) => {
    return cy.mount(html`
        <vl-upload-progress
            filename=${ifDefined(filename)}
            filesize=${ifDefined(filesize)}
            progress=${ifDefined(progress)}
            ?indeterminate=${indeterminate}
            ?cancellable=${cancellable}
            ?retryable=${retryable}
            ?error=${error}
            ?success=${success}
            hide-progress=${ifDefined(hideProgress === true ? true : undefined)}
            message=${ifDefined(message)}
            label=${ifDefined(label)}
        ></vl-upload-progress>
    `);
};

const getElement = (selector: string) => {
    return cy.get('vl-upload-progress').shadow().find(selector);
};

describe('cypress-component - block components - vl-upload-progress', () => {
    it('should mount', () => {
        mountDefault();

        cy.get('vl-upload-progress').shadow().find('.vl-upload-progress');
    });

    it('should be accessible', () => {
        mountDefault({
            filename: 'Document.pdf',
            filesize: '1.2 MB',
            progress: 50,
            cancellable: true,
            retryable: true,
            error: false,
            message: 'Upload progress message',
        });
        cy.injectAxe();

        cy.checkA11y('vl-upload-progress');
    });

    it('should render filename and filesize', () => {
        const filename = 'test-document.docx';
        const filesize = '2.5 MB';
        mountDefault({ filename, filesize });

        getElement('.vl-upload-progress__filename').should('contain.text', filename);
        getElement('.vl-upload-progress__filesize').should('contain.text', filesize);
    });

    it('should render a label', () => {
        const label = 'Bijlage';
        mountDefault({ label });

        getElement('#label').should('contain.text', label).and('not.have.class', 'vl-visually-hidden');
    });

    it('should pass progress to the progress-bar', () => {
        const progress = 75;
        mountDefault({ progress });

        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('have.attr', 'value', String(progress));
    });

    it('should set the progress-bar to indeterminate', () => {
        mountDefault({ indeterminate: true });

        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('have.attr', 'indeterminate');
    });

    it('should show an error state', () => {
        const message = 'Upload mislukt';
        mountDefault({ error: true, message });

        cy.get('vl-upload-progress')
            .shadow()
            .find('.vl-upload-progress')
            .should('have.class', 'vl-upload-progress--error');
        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('have.attr', 'error');
        getElement('vl-icon').should('have.attr', 'icon', 'alert-triangle');
        getElement('#message').should('contain.text', message);
        getElement('#message').should('have.attr', 'error');
    });

    it('should show a success state', () => {
        const message = 'Upload voltooid';
        mountDefault({ success: true, message });

        cy.get('vl-upload-progress')
            .shadow()
            .find('.vl-upload-progress')
            .should('have.class', 'vl-upload-progress--success');
        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('have.attr', 'success');
        getElement('vl-icon').should('have.attr', 'icon', 'check-circle');
        getElement('#message').should('contain.text', message);
        getElement('#message').should('have.attr', 'success');
    });

    it('should show the cancel button when cancellable', () => {
        mountDefault({ cancellable: true });

        getElement('#cancel-button').should('exist');
    });

    it('should not show the cancel button when not cancellable', () => {
        mountDefault({ cancellable: false });

        getElement('#cancel-button').should('not.exist');
    });

    it('should dispatch vl-upload-progress-cancel event on cancel button click', () => {
        mountDefault({ cancellable: true });
        cy.createStubForEvent('vl-upload-progress', 'vl-upload-progress-cancel');

        getElement('#cancel-button').click();
        cy.get('@vl-upload-progress-cancel').should('have.been.calledOnce');
    });

    it('should show the retry button when retryable', () => {
        mountDefault({ retryable: true });

        getElement('#retry-button').should('exist');
    });

    it('should not show the retry button when not retryable', () => {
        mountDefault({ retryable: false });

        getElement('#retry-button').should('not.exist');
    });

    it('should dispatch vl-upload-progress-retry event on retry button click', () => {
        mountDefault({ retryable: true });
        cy.createStubForEvent('vl-upload-progress', 'vl-upload-progress-retry');

        getElement('#retry-button').click();
        cy.get('@vl-upload-progress-retry').should('have.been.calledOnce');
    });

    it('should hide filesize when not provided', () => {
        mountDefault({ filesize: undefined });

        getElement('.vl-upload-progress__filesize').should('not.exist');
    });

    it('should hide message when not provided', () => {
        mountDefault({ message: undefined });

        getElement('#message').should('not.exist');
    });

    it('should have a default icon', () => {
        mountDefault({ error: false });

        getElement('vl-icon').should('have.attr', 'icon', 'file');
    });

    it('should show progress bar by default', () => {
        mountDefault();

        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('be.visible');
    });

    it('should hide progress bar when hide-progress is set', () => {
        mountDefault({ hideProgress: true });

        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('not.exist');
    });

    it('should show progress bar when hide-progress is set to false', () => {
        mountDefault({ hideProgress: false });

        cy.get('vl-upload-progress').shadow().find('vl-progress-bar').should('be.visible');
    });
});
