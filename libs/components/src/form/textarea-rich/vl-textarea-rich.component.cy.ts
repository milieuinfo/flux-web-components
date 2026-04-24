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
    it('should dispatch vl-input and vl-change on TinyMCE input event', () => {
        cy.mount(html`<vl-textarea-rich></vl-textarea-rich>`);
        cy.wait(500);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.createStubForEvent('vl-textarea-rich', 'vl-change');

        cy.get('vl-textarea-rich').then(($el) => {
            const el = $el.get(0) as Element & { id: string };
            cy.window().then((win: Window & { tinymce?: { get: (id: string) => { setContent: (c: string) => void; fire: (e: string) => void } | null } }) => {
                const editor = win.tinymce?.get(el.id);
                editor?.setContent('<p>test</p>');
                editor?.fire('input');
            });
        });

        cy.get('@vl-input').its('callCount').should('eq', 1);
        cy.get('@vl-input').its('lastCall.args.0.detail.value').should('include', 'test');
        cy.get('@vl-change').its('callCount').should('eq', 1);
    });

    it('should not dispatch vl-input on programmatic value change', () => {
        cy.mount(html`<vl-textarea-rich></vl-textarea-rich>`);
        cy.wait(500);
        cy.createStubForEvent('vl-textarea-rich', 'vl-input');
        cy.createStubForEvent('vl-textarea-rich', 'vl-change');

        cy.get('vl-textarea-rich').invoke('attr', 'value', '<p>programmatic test</p>');

        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: '<p>programmatic test</p>' });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });
});

