import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-form-controls.component';

defineAll('vds');

type Box = { radius: string; width: number };

const readBox = (tag: string, alias: string) =>
    cy
        .get(tag)
        .shadow()
        .find('.vl-checkbox__box')
        .should('exist')
        .then(($b) => {
            const cs = getComputedStyle($b[0]);
            cy.wrap<Box>({ radius: cs.borderTopLeftRadius, width: Math.round($b[0].getBoundingClientRect().width) }).as(alias);
        });

describe('FLUX-704 - flux-checkbox erft VlCheckbox (inheritance)', () => {
    beforeEach(() => {
        cy.mount(html`
            <div style="display: flex; gap: 12px;">
                <vds-checkbox label="VDS"></vds-checkbox>
                <flux-checkbox label="flux"></flux-checkbox>
            </div>
        `);
        cy.get('flux-checkbox').shadow().find('.vl-checkbox__box').should('exist');
    });

    it('is een subclass van VlCheckbox, geen extra shadow-laag', () => {
        cy.window().then((win) => {
            const FC = win.customElements.get('flux-checkbox');
            const VlCheckbox = win.customElements.get('vds-checkbox');
            expect(FC!.name, 'klasse heet FluxCheckbox').to.eq('FluxCheckbox');
            const fc = win.document.querySelector('flux-checkbox')!;
            expect(fc instanceof VlCheckbox!, 'flux-checkbox IS een VlCheckbox').to.eq(true);
            expect(fc.shadowRoot!.querySelector('vds-checkbox'), 'geen geneste vds-checkbox').to.be.null;
        });
    });

    it('flux-look: box radius scherper (0.3rem) dan rauw VDS', () => {
        readBox('vds-checkbox', 'vds');
        readBox('flux-checkbox', 'fc');
        cy.get('@vds').then((vds: unknown) => {
            cy.get('@fc').then((fc: unknown) => {
                const v = vds as Box;
                const f = fc as Box;
                expect(f.radius, 'flux-checkbox box-radius wijkt af van VDS-default').to.not.eq(v.radius);
            });
        });
    });
});
