import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTypography } from './vl-typography.component';

registerWebComponents([VlTypography]);

describe('cypress-component - block components - vl-typography', () => {
    it('should mount', () => {
        cy.mount(html`<vl-typography><p>tekst</p></vl-typography>`);

        cy.get('vl-typography').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-typography><p>tekst</p></vl-typography>`);
        cy.injectAxe();

        cy.checkA11y('vl-typography');
    });

    it('should render the light DOM content in the shadow DOM', () => {
        cy.mount(html`<vl-typography><p>initial text</p></vl-typography>`);

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'initial text');
    });

    it('should replace template parameters', () => {
        cy.mount(html`
            <vl-typography parameters='{"name": "Jos"}'><p>Hello &#36;{parameter.name}</p></vl-typography>
        `);

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'Hello Jos');
    });

    it('should update the shadow DOM when the light DOM changes', () => {
        cy.mount(html`<vl-typography><p>initial text</p></vl-typography>`);
        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'initial text');

        cy.get('vl-typography').then(($typography) => {
            $typography[0].innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });

    it('should update the shadow DOM when the light DOM changes after the component was moved in the DOM', () => {
        cy.mount(html`
            <div id="first"><vl-typography><p>initial text</p></vl-typography></div>
            <div id="second"></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            typography.ownerDocument.getElementById('second')?.appendChild(typography);
        });
        cy.get('#second vl-typography').shadow().find('#content p').should('contain.text', 'initial text');

        cy.get('vl-typography').then(($typography) => {
            $typography[0].innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });

    it('should process a light DOM mutation only once after the component was moved multiple times', () => {
        cy.mount(html`
            <div id="first"></div>
            <div id="second"><vl-typography><p>initial text</p></vl-typography></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            const document = typography.ownerDocument;
            document.getElementById('first')?.appendChild(typography);
            document.getElementById('second')?.appendChild(typography);
            cy.spy(typography as any, '__processSlotElements').as('processSlotElements');
            typography.innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
        cy.get('@processSlotElements').should('have.been.calledOnce');
    });

    it('should render content that was changed while the component was detached from the DOM', () => {
        cy.mount(html`
            <div id="first"><vl-typography><p>initial text</p></vl-typography></div>
            <div id="second"></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            typography.remove();
            typography.innerHTML = '<p>updated text</p>';
            typography.ownerDocument.getElementById('second')?.appendChild(typography);
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });
});

describe('vl-typography - anchor navigation', () => {
    beforeEach(() => {
        cy.viewport(800, 600);
        cy.window().then((win) => {
            win.history.replaceState(null, '', win.location.pathname + win.location.search);
            win.scrollTo(0, 0);
        });
    });

    it('should scroll to the in-page anchor target on click without updating the hash by default', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="#doel">Ga naar doel</a></p>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.window().its('scrollY').should('eq', 0);
        cy.get('vl-typography').shadow().find('[data-cy=link]').click();

        cy.window().its('scrollY').should('be.greaterThan', 0);
        cy.window().its('location.hash').should('eq', '');
    });

    it('should update the hash on click when the update-url-hash attribute is set', () => {
        cy.mount(html`
            <vl-typography update-url-hash>
                <p><a data-cy="link" href="#doel">Ga naar doel</a></p>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.window().its('scrollY').should('eq', 0);
        cy.get('vl-typography').shadow().find('[data-cy=link]').click();

        cy.window().its('location.hash').should('eq', '#doel');
        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('should move focus to the target so keyboard context follows', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="#doel">Ga naar doel</a></p>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.get('vl-typography').shadow().find('[data-cy=link]').click();
        cy.get('vl-typography')
            .shadow()
            .find('#doel')
            .should('have.attr', 'tabindex', '-1')
            .and('have.focus');
    });

    it('should scroll to a target located in another vl-typography instance', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="#elders">Ga naar elders</a></p>
            </vl-typography>
            <div style="height: 2000px"></div>
            <vl-typography>
                <h2 id="elders">Elders</h2>
            </vl-typography>
        `);

        cy.get('vl-typography').first().shadow().find('[data-cy=link]').click();
        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('should not intercept a bare # link', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="#">Top</a></p>
            </vl-typography>
        `);

        cy.get('vl-typography').shadow().find('[data-cy=link]').click();
        cy.window().its('location.hash').should('eq', '');
    });

    it('should not intercept a modifier-click so "open in new tab" keeps working', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="#doel">Ga naar doel</a></p>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.window().then((win) => {
            // cmd/ctrl-klik opent normaal een nieuw tabblad; vang de eventuele activatie op window-niveau af (bubble ná onze shadow-root listener).
            win.addEventListener('click', (e) => e.preventDefault(), { once: true });
        });

        cy.get('vl-typography').shadow().find('[data-cy=link]').click({ metaKey: true });

        cy.window().its('location.hash').should('eq', '');
        // Niet exact 0: Cypress kan de link minimaal in beeld scrollen. De grens sluit wél de ~2000px scroll-naar-doel uit die een onderschepte klik zou veroorzaken.
        cy.window().its('scrollY').should('be.lessThan', 100);
    });

    it('should leave a navigation link to another path untouched', () => {
        cy.mount(html`
            <vl-typography>
                <p><a data-cy="link" href="/elders#doel">Andere pagina</a></p>
            </vl-typography>
        `);

        cy.window().then((win) => {
            // Blokkeer de echte navigatie pas op window-niveau (bubble ná onze handler), zodat we testen of de component zelf de klik met rust laat.
            win.addEventListener('click', (e) => e.preventDefault(), { once: true });
        });

        cy.get('vl-typography').shadow().find('[data-cy=link]').click();

        cy.window().its('location.hash').should('eq', '');
        cy.window().its('scrollY').should('eq', 0);
    });
});
