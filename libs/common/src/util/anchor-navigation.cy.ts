import { html } from 'lit';
import '@domg-wc/components/block/typography/vl-typography.component';
import {
    dispatchNavigateToAnchor,
    enableAnchorNavigation,
    handleAnchorClick,
    navigateToAnchor,
} from './anchor-navigation';

describe('anchor-navigation utility', () => {
    beforeEach(() => {
        cy.viewport(800, 600);
        cy.window().then((win) => {
            win.history.replaceState(null, '', win.location.pathname + win.location.search);
            win.scrollTo(0, 0);
        });
    });

    it('should scroll to a target inside a shadow root via navigateToAnchor() without touching the hash by default', () => {
        cy.mount(html`
            <vl-typography>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.window().its('scrollY').should('eq', 0);
        cy.then(() => {
            expect(navigateToAnchor('#doel')).to.equal(true);
        });

        cy.window().its('scrollY').should('be.greaterThan', 0);
        cy.window().its('location.hash').should('eq', '');
    });

    it('should update the hash via navigateToAnchor() when updateHash is enabled', () => {
        cy.mount(html`
            <vl-typography>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.then(() => {
            expect(navigateToAnchor('#doel', { updateHash: true })).to.equal(true);
        });

        cy.window().its('location.hash').should('eq', '#doel');
        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('should return false and do nothing when the target does not exist', () => {
        cy.mount(html`<vl-typography><h2 id="doel">Doel</h2></vl-typography>`);

        cy.then(() => {
            expect(navigateToAnchor('#bestaat-niet')).to.equal(false);
        });

        cy.window().its('location.hash').should('eq', '');
        cy.window().its('scrollY').should('eq', 0);
    });

    it('should let any link outside vl-typography navigate to a target in another shadow root via the event', () => {
        cy.mount(html`
            <button data-cy="ext">Ga naar doel</button>
            <div style="height: 2000px"></div>
            <vl-typography>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.then(() => enableAnchorNavigation());
        cy.get('[data-cy=ext]').then(($btn) => {
            expect(dispatchNavigateToAnchor($btn[0], '#doel', { updateHash: true })).to.equal(true);
        });

        cy.window().its('location.hash').should('eq', '#doel');
        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('should let handleAnchorClick (attached to document) navigate a light-DOM link to a shadow-root target', () => {
        cy.mount(html`
            <a data-cy="link" href="#doel">Ga naar doel</a>
            <div style="height: 2000px"></div>
            <vl-typography>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.document().then((doc) =>
            doc.addEventListener('click', ((event: MouseEvent) => handleAnchorClick(event, { updateHash: true })) as EventListener)
        );
        cy.then(() => enableAnchorNavigation());

        cy.window().its('scrollY').should('eq', 0);
        cy.get('[data-cy=link]').click();

        cy.window().its('location.hash').should('eq', '#doel');
        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('should scroll on hashchange (back/forward, deep-link) without pushing an extra history entry', () => {
        cy.mount(html`
            <vl-typography>
                <div style="height: 2000px"></div>
                <h2 id="doel">Doel</h2>
            </vl-typography>
        `);

        cy.then(() => enableAnchorNavigation());
        cy.window().then((win) => {
            const lengthBefore = win.history.length;
            win.location.hash = '#doel';
            cy.wrap(lengthBefore).as('lengthBefore');
        });

        cy.window().its('scrollY').should('be.greaterThan', 0);
        cy.window().then((win) => {
            cy.get('@lengthBefore').then((lengthBefore) => {
                // De hashchange-afhandeling mag geen extra pushState veroorzaken (enkel de directe hash-set telt).
                expect(win.history.length).to.equal(Number(lengthBefore) + 1);
            });
        });
    });
});
