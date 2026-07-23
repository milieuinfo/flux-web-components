import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import './vds-scale-compensation.css';
import './flux-input.component';

defineAll('vlds');

type Box = { radius: string; borderColor: string; height: number };

const readBox = (tag: string, alias: string) =>
    cy
        .get(tag)
        .shadow()
        .find('.vl-input__wrapper')
        .should('exist')
        .then(($w) => {
            const el = $w[0];
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            cy.wrap<Box>({
                radius: s.borderTopLeftRadius,
                borderColor: s.borderTopColor,
                height: Math.round(r.height),
            }).as(alias);
        });

describe('FLUX-704 - flux-input erft VlInput (inheritance)', () => {
    beforeEach(() => {
        cy.mount(html`
            <div style="display: flex; gap: 8px; align-items: flex-start;">
                <vlds-input placeholder="VDS" aria-label="VDS"></vlds-input>
                <flux-input placeholder="flux" aria-label="flux"></flux-input>
            </div>
        `);
        cy.get('flux-input').shadow().find('.vl-input__wrapper').should('exist');
    });

    it('is een subclass van VlInput, geen extra shadow-laag', () => {
        cy.window().then((win) => {
            const FI = win.customElements.get('flux-input');
            const VlInput = win.customElements.get('vlds-input');
            expect(FI, 'flux-input geregistreerd').to.exist;
            expect(FI!.name, 'klasse heet FluxInput').to.eq('FluxInput');
            const fi = win.document.querySelector('flux-input')!;
            expect(fi instanceof VlInput!, 'flux-input IS een VlInput').to.eq(true);
            expect(fi.shadowRoot!.querySelector('vlds-input'), 'geen geneste vlds-input').to.be.null;
        });
    });

    it('flux-look via tokens: radius/border wijken af van VDS-default', () => {
        readBox('vlds-input', 'vds');
        readBox('flux-input', 'fi');

        cy.get('@vds').then((vds: unknown) => {
            cy.get('@fi').then((fi: unknown) => {
                const v = vds as Box;
                const f = fi as Box;
                expect(f.radius, 'flux-input radius wijkt af van VDS-default').to.not.eq(v.radius);
                expect(f.borderColor, 'flux-input border-kleur = flux #8695a8').to.eq('rgb(134, 149, 168)');
            });
        });
    });
});
