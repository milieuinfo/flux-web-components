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
});

