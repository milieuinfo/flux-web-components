import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-form-controls.component';

defineAll('vds');

describe('FLUX-704 - focus-outline doorgetrokken naar flux-select/textarea', () => {
    beforeEach(() => {
        cy.mount(html`
            <vds-textarea label="VDS"></vds-textarea>
            <flux-textarea label="flux"></flux-textarea>
            <flux-select label="flux"><option value="a">A</option></flux-select>
        `);
        cy.get('flux-textarea').shadow().find('textarea.vl-textarea').should('exist');
    });

    it('flux-textarea focus: outline width 3px + offset 2px (VDS wijkt af)', () => {
        cy.get('flux-textarea').shadow().find('textarea.vl-textarea').focus();
        cy.get('flux-textarea')
            .shadow()
            .find('textarea.vl-textarea')
            .then(($t) => {
                const cs = getComputedStyle($t[0]);
                expect(cs.outlineWidth, 'flux-textarea focus-breedte = 3px').to.eq('3px');
                expect(cs.outlineOffset, 'flux-textarea focus-offset = 2px').to.eq('2px');
            });
        cy.get('vds-textarea').shadow().find('textarea.vl-textarea').focus();
        cy.get('vds-textarea')
            .shadow()
            .find('textarea.vl-textarea')
            .then(($t) => {
                expect(getComputedStyle($t[0]).outlineOffset, 'VDS focus-offset wijkt af').to.not.eq('2px');
            });
    });

    it('flux-select focus: outline width 3px + offset 2px, geen box-shadow', () => {
        cy.get('flux-select').shadow().find('select.vl-select').focus();
        cy.get('flux-select')
            .shadow()
            .find('select.vl-select')
            .then(($s) => {
                const cs = getComputedStyle($s[0]);
                expect(cs.outlineWidth, 'flux-select focus-breedte = 3px').to.eq('3px');
                expect(cs.outlineOffset, 'flux-select focus-offset = 2px').to.eq('2px');
                expect(cs.boxShadow, 'geen box-shadow-ring').to.eq('none');
            });
    });
});
