import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-link.component';

defineAll('vds');

const underlineColor = (tag: string, alias: string) =>
    cy
        .get(tag)
        .shadow()
        .find('.vl-link__slot')
        .should('exist')
        .then(($s) => {
            cy.wrap(getComputedStyle($s[0]).textDecorationColor).as(alias);
        });

describe('FLUX-704 - flux-link erft VlLink (inheritance)', () => {
    beforeEach(() => {
        cy.mount(html`
            <div style="display: flex; gap: 12px;">
                <vds-link href="https://www.vlaanderen.be">VDS</vds-link>
                <flux-link href="https://www.vlaanderen.be">flux</flux-link>
            </div>
        `);
        cy.get('flux-link').shadow().find('.vl-link__slot').should('exist');
    });

    it('is een subclass van VlLink, geen extra shadow-laag', () => {
        cy.window().then((win) => {
            const FL = win.customElements.get('flux-link');
            const VlLink = win.customElements.get('vds-link');
            expect(FL, 'flux-link geregistreerd').to.exist;
            expect(FL!.name, 'klasse heet FluxLink').to.eq('FluxLink');
            const fl = win.document.querySelector('flux-link')!;
            expect(fl instanceof VlLink!, 'flux-link IS een VlLink').to.eq(true);
            expect(fl.shadowRoot!.querySelector('vds-link'), 'geen geneste vds-link').to.be.null;
        });
    });

    it('oude flux boolean-API mapt op de VDS danger/newWindow/size (willUpdate)', () => {
        cy.mount(html`
            <flux-link href="https://x.be" error>fout</flux-link>
            <flux-link href="https://x.be" external>extern</flux-link>
            <flux-link href="https://x.be" large>groot</flux-link>
        `);
        cy.get('flux-link[error]').shadow().find('a').invoke('attr', 'class').should('contain', 'vl-link--danger');
        cy.get('flux-link[external]').shadow().find('a').invoke('attr', 'target').should('eq', '_blank');
        cy.get('flux-link[large]').shadow().find('a').invoke('attr', 'class').should('contain', 'vl-link--large');
    });

    it('underline-kleur = flux-blauw via token, != VDS-default', () => {
        underlineColor('vds-link', 'vds');
        underlineColor('flux-link', 'fl');

        cy.get('@vds').then((vds) => {
            cy.get('@fl').then((fl) => {
                expect(fl, 'flux-link underline = flux #0055cc').to.eq('rgb(0, 85, 204)');
                expect(fl, 'flux-link underline wijkt af van VDS-default').to.not.eq(vds);
            });
        });
    });

    it('underline offset/thickness naar flux-default, wijkt af van VDS (0.25rem/0.125rem)', () => {
        const read = (tag: string, alias: string) =>
            cy
                .get(tag)
                .shadow()
                .find('.vl-link__slot')
                .then(($s) => {
                    const cs = getComputedStyle($s[0]);
                    cy.wrap({ offset: cs.textUnderlineOffset, thickness: cs.textDecorationThickness }).as(alias);
                });
        read('vds-link', 'vds');
        read('flux-link', 'fl');
        cy.get('@vds').then((vds: unknown) => {
            cy.get('@fl').then((fl: unknown) => {
                const v = vds as { offset: string; thickness: string };
                const f = fl as { offset: string; thickness: string };
                expect(f.offset, 'flux-link offset wijkt af van VDS 0.25rem').to.not.eq(v.offset);
                expect(f.thickness, 'flux-link thickness wijkt af van VDS 0.125rem').to.not.eq(v.thickness);
            });
        });
    });
});
