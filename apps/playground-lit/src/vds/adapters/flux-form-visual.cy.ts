import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-form-controls.component';

defineAll('vds');

describe('FLUX-704 - visuele pariteit form-controls', () => {
    it('flux-checkbox: het vinkje ligt binnen de box', () => {
        cy.mount(html`<flux-checkbox label="Akkoord" checked></flux-checkbox>`);
        cy.get('flux-checkbox').should(($c) => {
            const sr = $c[0].shadowRoot!;
            const box = sr.querySelector('.vl-checkbox__box')!.getBoundingClientRect();
            const glyph = sr.querySelector('.vl-checkbox__check')!.shadowRoot!.querySelector('[part="icon"]')!.getBoundingClientRect();
            expect(glyph.width, 'vinkje heeft een breedte').to.be.greaterThan(0);
            expect(glyph.left, 'links binnen de box').to.be.at.least(box.left);
            expect(glyph.right, 'rechts binnen de box').to.be.at.most(box.right);
            expect(glyph.top, 'boven binnen de box').to.be.at.least(box.top);
            expect(glyph.bottom, 'onder binnen de box').to.be.at.most(box.bottom);
        });
    });

    it('flux-radio-group: ruimte tussen rondje en tekst, focus-ring 3px/2px op het rondje', () => {
        cy.mount(html`<flux-radio-group label="Voorkeur">
            <vds-radio value="a" label="A"></vds-radio>
            <vds-radio value="b" label="B"></vds-radio>
        </flux-radio-group>`);
        cy.get('vds-radio')
            .first()
            .should(($r) => {
                const sr = $r[0].shadowRoot!;
                const box = sr.querySelector('.vl-radio__box')!.getBoundingClientRect();
                const label = sr.querySelector('[part="label"]')!.getBoundingClientRect();
                expect(label.left - box.right, 'ruimte tussen rondje en tekst').to.be.at.least(6);
            });
        cy.get('vds-radio').first().focus();
        cy.get('vds-radio')
            .first()
            .should(($r) => {
                const box = $r[0].shadowRoot!.querySelector('.vl-radio__box')!;
                const cs = getComputedStyle(box);
                expect(cs.outlineWidth).to.eq('3px');
                expect(cs.outlineOffset).to.eq('2px');
            });
    });

    it('flux-select: klassieke native select, geen stylebare base-select', () => {
        cy.mount(html`<flux-select label="Provincie"><option value="a">A</option></flux-select>`);
        cy.get('flux-select')
            .shadow()
            .find('select')
            .should(($s) => {
                expect(getComputedStyle($s[0]).appearance).to.eq('none');
            });
    });
});
