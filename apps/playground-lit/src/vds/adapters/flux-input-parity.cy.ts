import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-input.component';

defineAll('vds');

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
                <vds-input placeholder="VDS" aria-label="VDS"></vds-input>
                <flux-input placeholder="flux" aria-label="flux"></flux-input>
            </div>
        `);
        cy.get('flux-input').shadow().find('.vl-input__wrapper').should('exist');
    });

    it('is een subclass van VlInput, geen extra shadow-laag', () => {
        cy.window().then((win) => {
            const FI = win.customElements.get('flux-input');
            const VlInput = win.customElements.get('vds-input');
            expect(FI, 'flux-input geregistreerd').to.exist;
            expect(FI!.name, 'klasse heet FluxInput').to.eq('FluxInput');
            const fi = win.document.querySelector('flux-input')!;
            expect(fi instanceof VlInput!, 'flux-input IS een VlInput').to.eq(true);
            expect(fi.shadowRoot!.querySelector('vds-input'), 'geen geneste vds-input').to.be.null;
        });
    });

    it('flux-look via tokens: radius/border wijken af van VDS-default', () => {
        readBox('vds-input', 'vds');
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

    it('geen hover-grijs: flux-input hover-surface == enabled (VDS greyt wel)', () => {
        cy.window().then((win) => {
            const read = (tag: string) => {
                const wrap = win.document.querySelector(tag)!.shadowRoot!.querySelector('.vl-input__wrapper')!;
                const cs = win.getComputedStyle(wrap);
                return {
                    enabled: cs.getPropertyValue('--base-color-background-surface-form-element-enabled').trim(),
                    hover: cs.getPropertyValue('--base-color-background-surface-form-element-hover').trim(),
                };
            };
            const flux = read('flux-input');
            const vds = read('vds-input');
            expect(flux.hover, 'flux-input: geen achtergrond-wijziging op hover').to.eq(flux.enabled);
            expect(vds.hover, 'VDS greyt wel op hover (baseline)').to.not.eq(vds.enabled);
        });
    });

    it('focus-outline: flux-input offset 2px + width 3px, VDS wijkt af', () => {
        cy.get('flux-input').shadow().find('input.vl-input').focus();
        cy.get('flux-input')
            .shadow()
            .find('.vl-input__wrapper')
            .then(($w) => {
                const cs = getComputedStyle($w[0]);
                expect(cs.outlineOffset, 'flux focus-offset = 2px').to.eq('2px');
                expect(cs.outlineWidth, 'flux focus-breedte = 3px').to.eq('3px');
            });
        cy.get('vds-input').shadow().find('input.vl-input').focus();
        cy.get('vds-input')
            .shadow()
            .find('.vl-input__wrapper')
            .then(($w) => {
                expect(getComputedStyle($w[0]).outlineWidth, 'VDS focus-breedte wijkt af (0.25rem, niet flux 3px)').to.not.eq('3px');
            });
    });
});
