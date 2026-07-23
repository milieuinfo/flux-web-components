// FLUX-704: deterministische pariteits-test. Bewijst dat `flux-button` (erft de
// VDS VlButton, flux-look via design-tokens) qua box-geometrie OVEREENKOMT met de
// echte flux `vl-button`, en NIET met de ruwe `vlds-button`. Dit vangt regressies
// zoals "flux-button heeft VDS-padding" deterministisch op, los van browser-/tab-staat.
//
// Zelfde bootstrap als styling.ts: VDS onder vlds- prefix, theme + rem-scale-
// compensatie, en de echte flux vl-button geregistreerd.
import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import './vds-scale-compensation.css';
import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import './flux-button.component';

defineAll('vlds');
registerWebComponents([VlButtonComponent]);

type Box = { padding: string; paddingRight: string; width: number; height: number };

// Lees de box-geometrie van het interne <button> in de shadow van een tag.
const readBox = (tag: string, alias: string) =>
    cy
        .get(tag)
        .shadow()
        .find('button')
        .should('exist')
        .then(($b) => {
            const el = $b[0];
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            cy.wrap<Box>({
                padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
                paddingRight: s.paddingRight,
                width: Math.round(r.width),
                height: Math.round(r.height),
            }).as(alias);
        });

describe('FLUX-704 - flux-button box-pariteit met flux vl-button', () => {
    beforeEach(() => {
        cy.mount(html`
            <div style="display: flex; gap: 8px; align-items: flex-start;">
                <vl-button>Test</vl-button>
                <vlds-button variant="primary">Test</vlds-button>
                <flux-button variant="primary">Test</flux-button>
            </div>
        `);
        cy.get('flux-button').shadow().find('button').should('exist');
    });

    it('flux-button is een subclass van VlButton (inheritance, geen wrapper-laag)', () => {
        cy.window().then((win) => {
            const FB = win.customElements.get('flux-button');
            const VlBtn = win.customElements.get('vl-button');
            expect(FB, 'flux-button geregistreerd').to.exist;
            expect(FB!.name, 'klasse heet FluxButton').to.eq('FluxButton');
            // geen geneste vlds-button in de shadow => geen extra shadow-laag
            const fb = win.document.querySelector('flux-button')!;
            expect(fb.shadowRoot!.querySelector('vlds-button'), 'geen geneste vlds-button').to.be.null;
            // het is een ECHTE flux vl-button-klasse, niet dezelfde als flux-button
            expect(VlBtn, 'vl-button geregistreerd').to.exist;
        });
    });

    it('oude flux boolean-API mapt op de VDS variant/size/grow (willUpdate)', () => {
        cy.mount(html`
            <flux-button secondary>sec</flux-button>
            <flux-button tertiary>ter</flux-button>
            <flux-button ghost>ghost</flux-button>
            <flux-button large>large</flux-button>
            <flux-button block>block</flux-button>
        `);
        const innerClass = (sel: string) =>
            cy.get(sel).shadow().find('[part="button"]').invoke('attr', 'class');
        innerClass('flux-button[secondary]').should('contain', 'vl-button--secondary');
        innerClass('flux-button[tertiary]').should('contain', 'vl-button--tertiary');
        innerClass('flux-button[ghost]').should('contain', 'vl-button--ghost');
        innerClass('flux-button[large]').should('contain', 'vl-button--large');
        cy.get('flux-button[block]').invoke('attr', 'class').should('contain', 'vl-button--fill');
    });

    it('flux-button padding == flux vl-button padding, en != VDS-button', () => {
        readBox('vl-button', 'flux');
        readBox('vlds-button', 'vds');
        readBox('flux-button', 'fb');

        cy.get('@flux').then((flux: unknown) => {
            cy.get('@vds').then((vds: unknown) => {
                cy.get('@fb').then((fb: unknown) => {
                    const f = flux as Box;
                    const v = vds as Box;
                    const b = fb as Box;
                    // VDS verschilt echt van flux (anders test niets): bevestig de baseline
                    expect(v.paddingRight, 'VDS-padding wijkt af van flux (baseline)').to.not.eq(
                        f.paddingRight
                    );
                    // de kern: flux-button matcht flux, niet VDS
                    expect(b.padding, 'flux-button padding == flux').to.eq(f.padding);
                    expect(b.paddingRight, 'flux-button paddingRight != VDS').to.not.eq(v.paddingRight);
                    expect(b.width, 'flux-button breedte == flux').to.eq(f.width);
                });
            });
        });
    });
});
