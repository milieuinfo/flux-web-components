import { html } from 'lit';
import tinymce, { Editor } from 'tinymce';
import { registerWebComponents } from '@domg-wc/common';
import { VlTextareaRichComponent } from './vl-textarea-rich.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';

registerWebComponents([VlTextareaRichComponent, VlFormMessageComponent]);

describe('cypress-component - form components - vl-textarea-rich - vl-input event', () => {
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

describe('cypress-component - form components - vl-textarea-rich - properties & states', () => {
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

describe('cypress-component - form components - vl-textarea-rich - blur-validation', () => {
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

describe('cypress-component - form components - vl-textarea-rich - cleanup', () => {
    const mountPanel = () => {
        cy.mount(html`<div id="panel"></div>`);
        return cy.get('#panel');
    };

    // Zonder vast id genereert de component een uniek id, zodat een retry niet de editor van een vorige poging ziet
    const appendTextareaRich = (panel: HTMLElement) => {
        const textareaRich = new VlTextareaRichComponent();
        panel.append(textareaRich);
        return textareaRich;
    };

    const waitForEditorInit = () =>
        cy.get('vl-textarea-rich').should(($el) => {
            expect(tinymce.get($el[0].id)?.initialized).to.equal(true);
        });

    const expectNoErrorsOnWindowResize = () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'error').as('consoleError');
        });
        // laat TinyMCE thema en plugins van de CDN laden, zoals een achtergebleven editor dat zou doen
        cy.wait(1000);
        cy.window().then((win) => {
            win.dispatchEvent(new Event('resize'));
        });
        cy.get('@consoleError').should('not.have.been.called');
    };

    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('should not leave an editor behind when removed before the first update', () => {
        mountPanel().then(async ($panel) => {
            const textareaRich = appendTextareaRich($panel[0]);
            textareaRich.remove();
            await textareaRich.updateComplete;

            expect(tinymce.get(textareaRich.id)).to.equal(null);
        });
        expectNoErrorsOnWindowResize();
    });

    it('should not leave an editor behind when removed during TinyMCE init', () => {
        mountPanel().then(async ($panel) => {
            const textareaRich = appendTextareaRich($panel[0]);
            await textareaRich.updateComplete;
            const editor = tinymce.get(textareaRich.id);
            expect(editor?.initialized).to.equal(false);

            textareaRich.remove();

            expect(tinymce.get(textareaRich.id)).to.equal(null);
            expect(tinymce.get()).not.to.include(editor);
            expect(editor?.removed).to.equal(true);
        });
        expectNoErrorsOnWindowResize();
    });

    it('should not leave an editor behind when removed while the content CSS loads', () => {
        let removedEditor: Editor | undefined;
        let stateAtRemoval: { initialized: boolean; hasBody: boolean } | undefined;
        const removeWhileContentCssLoads = (editor: Editor) => {
            editor.on('PreInit', () => {
                // PreInit vuurt vlak voor het laden van de content-CSS, de microtask loopt na de rest van die synchrone stap
                queueMicrotask(() => {
                    removedEditor = editor;
                    stateAtRemoval = { initialized: editor.initialized, hasBody: editor.getBody() !== null };
                    document.querySelector('vl-textarea-rich')?.remove();
                });
            });
        };
        cy.mount(html`<vl-textarea-rich .customConfig=${{ setup: removeWhileContentCssLoads }}></vl-textarea-rich>`);

        cy.get('vl-textarea-rich')
            .should('not.exist')
            .then(() => {
                expect(stateAtRemoval).to.deep.equal({ initialized: false, hasBody: true });
                expect(removedEditor?.removed).to.equal(true);
                expect(tinymce.get()).not.to.include(removedEditor);
            });
        expectNoErrorsOnWindowResize();
    });

    it('should ignore focus() and a new value during TinyMCE init and load that value into the editor', () => {
        mountPanel().then(async ($panel) => {
            const textareaRich = appendTextareaRich($panel[0]);
            await textareaRich.updateComplete;
            expect(tinymce.get(textareaRich.id)?.initialized).to.equal(false);

            textareaRich.focus();
            textareaRich.setAttribute('value', '<p>Nieuwe waarde</p>');
            await textareaRich.updateComplete;
        });
        waitForEditorInit().then(($el) => {
            expect(tinymce.get($el[0].id)?.getContent()).to.equal('<p>Nieuwe waarde</p>');
        });
    });

    it('should ignore a new value while the editor iframe loads and load that value into the editor', () => {
        const setValueOnIframeLoad = (editor: Editor) => {
            editor.on('load', () => {
                document.querySelector('vl-textarea-rich')?.setAttribute('value', '<p>Nieuwe waarde</p>');
            });
        };
        cy.mount(html`<vl-textarea-rich .customConfig=${{ setup: setValueOnIframeLoad }}></vl-textarea-rich>`);

        waitForEditorInit().then(($el) => {
            expect(tinymce.get($el[0].id)?.getContent()).to.equal('<p>Nieuwe waarde</p>');
        });
        cy.get('vl-textarea-rich').should('have.attr', 'value', '<p>Nieuwe waarde</p>');
    });

    it('should remove the editor when removed after TinyMCE init', () => {
        cy.mount(html`<vl-textarea-rich></vl-textarea-rich>`);
        waitForEditorInit().then(($el) => {
            const editor = tinymce.get($el[0].id);
            $el[0].remove();

            expect(tinymce.get($el[0].id)).to.equal(null);
            expect(editor?.removed).to.equal(true);
        });
    });

    it('should call the setup callback from customConfig and keep the value in sync', () => {
        const setup = cy.stub();
        cy.mount(html`<vl-textarea-rich .customConfig=${{ setup }}></vl-textarea-rich>`);
        waitForEditorInit().then(($el) => {
            const editor = tinymce.get($el[0].id);
            expect(setup).to.have.been.calledOnceWith(editor);
            expect(setup).to.have.been.calledOn(editor);

            editor?.setContent('<p>Hallo</p>');
            editor?.dispatch('change');
        });
        cy.get('vl-textarea-rich').should('have.attr', 'value', '<p>Hallo</p>');
    });
});
