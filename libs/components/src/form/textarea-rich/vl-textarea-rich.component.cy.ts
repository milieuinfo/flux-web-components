import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTextareaRichComponent } from './vl-textarea-rich.component';

registerWebComponents([VlTextareaRichComponent]);

describe('vl-textarea-rich - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich></vl-textarea-rich>
            </div>
        `);

        cy.get('vl-textarea-rich').shadow().find('textarea');
        cy.wait(500);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-mount');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-textarea-rich label="test-label"></vl-textarea-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-textarea-rich', {
            // aria-prohibited-attr rule bewust uitgezet: fout in TinyMCE
            rules: {
                'aria-prohibited-attr': { enabled: false },
            },
        });
    });

    it('should set toolbar', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich toolbar="h1 h2 h3"></vl-textarea-rich>
            </div>
        `);

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn.tox-tbtn--select')
            .find('.tox-tbtn__select-label')
            .contains('H1');

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn.tox-tbtn--select')
            .find('.tox-tbtn__select-label')
            .contains('H2');

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn.tox-tbtn--select')
            .find('.tox-tbtn__select-label')
            .contains('H3');

        cy.wait(500);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-toolbar');
    });

    it('should set plugins', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich toolbar="link numlist bullist" plugins="link lists"></vl-textarea-rich>
            </div>
        `);

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn')
            .first()
            .should('have.attr', 'title', 'Link invoegen/bewerken');

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn')
            .first()
            .next()
            .should('have.attr', 'title', 'Geordende lijst');

        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-editor-header')
            .find('.tox-tbtn')
            .first()
            .next()
            .next()
            .should('have.attr', 'title', 'Ongeordende lijst');

        cy.wait(500);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-plugins');
    });

    it('should set preview', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich preview></vl-textarea-rich>
            </div>
        `);

        cy.get('vl-textarea-rich').shadow().find('.tox-editor-header').should('not.be.visible');

        cy.wait(500);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-preview');
    });

    it('should set a small height', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich height="100"></vl-textarea-rich>
            </div>
        `);

        cy.wait(500);
        cy.get('vl-textarea-rich').shadow().find('.tox-tinymce').invoke('outerHeight').should('be.lte', 150);

        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-height-small');
    });

    it('should set a large height', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 600px; padding: 20px; background: white;">
                <vl-textarea-rich height="400"></vl-textarea-rich>
            </div>
        `);

        cy.wait(500);
        cy.get('vl-textarea-rich').shadow().find('.tox-tinymce').invoke('outerHeight').should('be.gte', 350);

        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-rich-height-large');
    });
});

describe('vl-textarea-rich - events', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('should dispatch vl-input when user types in the editor', () => {
        cy.mount(html`<vl-textarea-rich label="omschrijving"></vl-textarea-rich>`);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.createStubForEvent('vl-textarea-rich', 'vl-change');
        cy.get('vl-textarea-rich')
            .shadow()
            .find('.tox-edit-area__iframe')
            .its('0.contentDocument.body')
            .type('hallo', { force: true });
        cy.get('@vl-input').should('have.been.called');
        cy.get('@vl-change').should('have.been.called');
    });

    it('should not dispatch vl-input when value is set programmatically', () => {
        cy.mount(html`<vl-textarea-rich label="omschrijving"></vl-textarea-rich>`);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.createStubForEvent('vl-textarea-rich', 'vl-change');
        cy.get('vl-textarea-rich').then((el) => {
            (el[0] as VlTextareaRichComponent).value = '<p>programmatisch</p>';
        });
        cy.get('@vl-change').should('have.been.calledOnce');
        cy.get('@vl-input').should('not.have.been.called');
    });
});

