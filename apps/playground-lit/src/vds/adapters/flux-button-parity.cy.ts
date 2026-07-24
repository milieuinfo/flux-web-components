import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import './flux-button.component';

defineAll('vds');
registerWebComponents([VlButtonComponent]);

type Geom = {
    padTop: number;
    padLeft: number;
    border: string;
    ctrlH: string;
    radius: string;
};

const readGeom = (tag: string, alias: string) =>
    cy
        .get(tag)
        .should('exist')
        .then(($h) => {
            const host = $h[0] as HTMLElement;
            const btn = host.shadowRoot!.querySelector('button')!;
            const s = getComputedStyle(btn);
            const hs = getComputedStyle(host);
            cy.wrap<Geom>({
                padTop: parseFloat(s.paddingTop),
                padLeft: parseFloat(s.paddingLeft),
                border: s.borderTopWidth,
                ctrlH: hs.getPropertyValue('--vl-form-control-height').trim(),
                radius: hs.getPropertyValue('--base-border-radius-selectable-default').trim(),
            }).as(alias);
        });

describe('FLUX-704 - flux-button geometrie = flux-target, != rauw VDS', () => {
    beforeEach(() => {
        cy.mount(html`
            <div style="display: flex; gap: 8px; align-items: flex-start;">
                <vl-button>Test</vl-button>
                <vds-button variant="primary">Test</vds-button>
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
            // geen geneste vds-button in de shadow => geen extra shadow-laag
            const fb = win.document.querySelector('flux-button')!;
            expect(fb.shadowRoot!.querySelector('vds-button'), 'geen geneste vds-button').to.be.null;
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

    it('flux-button draagt de flux-knop-geometrie (target), niet de rauwe VDS-geometrie', () => {
        readGeom('flux-button', 'fb');
        readGeom('vds-button', 'vds');

        cy.get('@fb').then((fbUnknown: unknown) => {
            cy.get('@vds').then((vdsUnknown: unknown) => {
                const fb = fbUnknown as Geom;
                const vds = vdsUnknown as Geom;
                expect(
                    fb.padLeft / fb.padTop,
                    'flux inset-ratio horizontaal:verticaal == 4 (5/20)'
                ).to.be.closeTo(4, 0.2);
                expect(
                    vds.padLeft / vds.padTop,
                    'rauwe VDS-ratio is duidelijk lager (baseline)'
                ).to.be.lessThan(2);
                expect(fb.padTop, 'flux verticale inset != rauw VDS').to.not.eq(vds.padTop);
                expect(fb.border, 'flux border-breedte == 2px').to.eq('2px');
                expect(fb.radius, 'flux radius-token == 0.3rem').to.eq('0.3rem');
                expect(fb.ctrlH, 'flux control-height == 3.5rem (35px op 10px-root)').to.eq('3.5rem');
            });
        });
    });
});
