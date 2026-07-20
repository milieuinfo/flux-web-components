import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlDatepickerComponent } from './vl-datepicker.component';

registerWebComponents([VlDatepickerComponent]);

// Verifieert de ECHTE positionering (niet enkel het popover-attribuut). Op native browsers doen de
// CSS-regels het werk; op non-native (bv. Firefox 143) doet @floating-ui/dom het via de controller.
// Deze relatieve asserties (kalender t.o.v. toggle-button) gelden in beide gevallen.
describe('vl-datepicker - anchor-positioning placement', () => {
    const TOL = 16;

    const openAndAssert = (assert: (button: DOMRect, calendar: DOMRect) => void) => {
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('have.class', 'open');
        cy.get('vl-datepicker')
            .shadow()
            .find('button#toggle-calendar')
            .then(($button) => {
                cy.get('vl-datepicker')
                    .shadow()
                    .find('.flatpickr-calendar')
                    .should(($calendar) => {
                        assert($button[0].getBoundingClientRect(), $calendar[0].getBoundingClientRect());
                    });
            });
    };

    const below = (b: DOMRect, c: DOMRect) => expect(c.top, 'kalender onder de knop').to.be.at.least(b.bottom - TOL);
    const above = (b: DOMRect, c: DOMRect) => expect(c.bottom, 'kalender boven de knop').to.be.at.most(b.top + TOL);
    const alignLeft = (b: DOMRect, c: DOMRect) =>
        expect(Math.abs(c.left - b.left), 'links uitgelijnd').to.be.lessThan(TOL);
    const alignRight = (b: DOMRect, c: DOMRect) =>
        expect(Math.abs(c.right - b.right), 'rechts uitgelijnd').to.be.lessThan(TOL);
    const alignCenter = (b: DOMRect, c: DOMRect) =>
        expect(Math.abs((c.left + c.right) / 2 - (b.left + b.right) / 2), 'gecentreerd').to.be.lessThan(TOL);

    beforeEach(() => cy.viewport(1024, 768));

    // Ruimte onder de knop (margin-top 200): below/auto tonen onder.
    const belowCases: { position: string; horizontal: (b: DOMRect, c: DOMRect) => void }[] = [
        { position: 'below left', horizontal: alignLeft },
        { position: 'below center', horizontal: alignCenter },
        { position: 'below right', horizontal: alignRight },
        { position: 'auto', horizontal: alignLeft },
        { position: 'auto left', horizontal: alignLeft },
        { position: 'auto center', horizontal: alignCenter },
        { position: 'auto right', horizontal: alignRight },
    ];

    belowCases.forEach(({ position, horizontal }) => {
        it(`positioneert onder de knop bij position="${position}"`, () => {
            cy.mount(html`
                <div style="margin-top: 200px; margin-left: 300px;">
                    <vl-datepicker position=${position}></vl-datepicker>
                </div>
            `);
            openAndAssert((b, c) => {
                below(b, c);
                horizontal(b, c);
            });
        });
    });

    // Expliciet 'above' (geen flip): margin-top 400 zodat er ook boven plaats is.
    const aboveCases: { position: string; horizontal: (b: DOMRect, c: DOMRect) => void }[] = [
        { position: 'above left', horizontal: alignLeft },
        { position: 'above center', horizontal: alignCenter },
        { position: 'above right', horizontal: alignRight },
    ];

    aboveCases.forEach(({ position, horizontal }) => {
        it(`positioneert boven de knop bij position="${position}"`, () => {
            cy.mount(html`
                <div style="margin-top: 400px; margin-left: 300px;">
                    <vl-datepicker position=${position}></vl-datepicker>
                </div>
            `);
            openAndAssert((b, c) => {
                above(b, c);
                horizontal(b, c);
            });
        });
    });

    // auto met weinig plaats onder → flip naar boven (floating-ui flip / native @position-try).
    it('flipt naar boven bij position="auto" met weinig ruimte onder', () => {
        cy.mount(html`
            <div style="margin-top: 620px; margin-left: 300px;">
                <vl-datepicker position="auto"></vl-datepicker>
            </div>
        `);
        openAndAssert((b, c) => above(b, c));
    });

    // FLUX-595 — kalender blijft nabij de knop ondanks kapotte ancestor (top-layer + JS/CSS positie).
    it('blijft correct gepositioneerd met transform + overflow:auto ancestor', () => {
        cy.mount(html`
            <div style="transform: translateX(0); overflow: auto; max-height: 300px; padding: 80px; margin: 50px;">
                <div style="height: 100px;"></div>
                <vl-datepicker></vl-datepicker>
                <div style="height: 400px;"></div>
            </div>
        `);
        openAndAssert((b, c) => {
            expect(Math.abs(c.left - b.left), 'horizontaal nabij knop').to.be.lessThan(TOL);
            const nearVertically = c.top >= b.bottom - TOL || c.bottom <= b.top + TOL;
            expect(nearVertically, 'verticaal net onder of boven de knop').to.be.true;
        });
    });
});
