import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTextareaRichComponent } from './vl-textarea-rich.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';

registerWebComponents([VlTextareaRichComponent, VlFormMessageComponent]);

describe('vl-textarea-rich - vl-input event', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('should dispatch vl-input when user types in editor', () => {
        cy.mount(html`<vl-textarea-rich label="test"></vl-textarea-rich>`);
        cy.wait(1000);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.get('vl-textarea-rich').then(($el) => {
            const editor = ($el[0] as any).editor;
            if (editor) {
                // Stel body HTML rechtstreeks in (vermijdt TinyMCE 'change'-event dat via setContent vuurt)
                // zodat fire('input') de value wél als gewijzigd beschouwt en vl-input dispatcht.
                editor.getBody().innerHTML = '<p>Hello</p>';
                editor.fire('input');
            }
        });
        cy.get('@vl-input').should('have.been.calledOnce');
    });

    it('should dispatch vl-change when user types in editor', () => {
        cy.mount(html`<vl-textarea-rich label="test"></vl-textarea-rich>`);
        cy.wait(1000);
        cy.createStubForEvent('vl-textarea-rich', 'vl-change');
        cy.get('vl-textarea-rich').then(($el) => {
            const editor = ($el[0] as any).editor;
            if (editor) {
                editor.getBody().innerHTML = '<p>Hello</p>';
                editor.fire('input');
            }
        });
        cy.get('@vl-change').should('have.been.calledOnce');
    });

    it('should NOT dispatch vl-input when value is set programmatically', () => {
        cy.mount(html`<vl-textarea-rich label="test"></vl-textarea-rich>`);
        cy.wait(1000);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.get('vl-textarea-rich').then(($el) => {
            ($el[0] as any).value = '<p>programmatic content</p>';
        });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });
});

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

describe('vl-textarea-rich - blur-validation', () => {
    const mount = () => {
        cy.mount(html`
            <form>
                <vl-textarea-rich id="tar" name="tar" required blur-validation></vl-textarea-rich>
                <vl-form-message for="tar" state="valueMissing">Verplicht.</vl-form-message>
            </form>
        `);
        cy.wait(500); // tinymce init
    };

    it('should not show error on untouched blur', () => {
        mount();
        cy.get('vl-textarea-rich').then(($el) => {
            const tar = $el[0] as VlTextareaRichComponent;
            tar.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
    });

    it('should show error after simulated user-mutation + blur', () => {
        mount();
        cy.get('vl-textarea-rich').then(($el) => {
            const tar = $el[0] as VlTextareaRichComponent;
            tar.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail: { value: '' } }));
            tar.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });
});
