import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-form-demo.component';

defineAll('vds');

const root = () => cy.get('flux-form-demo').shadow();
const field = (sel: string) => root().find(sel);

const fillValid = () => {
    field('flux-input[name="voornaam"]').shadow().find('input').type('Jan');
    field('flux-input[name="achternaam"]').shadow().find('input').type('Janssens');
    field('flux-input[name="email"]').shadow().find('input').type('jan@voorbeeld.be');
    field('flux-input[name="leeftijd"]').shadow().find('input').type('42');
    field('flux-select[name="provincie"]').shadow().find('select').select('limburg');
    field('flux-radio-group[name="contact"]')
        .find('vds-radio[value="email"]')
        .then(($r) => $r[0].click());
    field('flux-checkbox[value="sport"]').shadow().find('input[type="checkbox"]').check({ force: true });
    field('flux-checkbox[value="wetenschap"]').shadow().find('input[type="checkbox"]').check({ force: true });
    field('flux-checkbox[name="akkoord"]').shadow().find('input[type="checkbox"]').check({ force: true });
};

describe('FLUX-704 - flux-form (doelproduct, flux-* controls)', () => {
    beforeEach(() => {
        cy.mount(html`<flux-form-demo></flux-form-demo>`);
        field('flux-input[name="voornaam"]').should('exist');
    });

    it('rendert de flux-* controls (doelproducten, geen vds-* behalve radio)', () => {
        ['flux-fieldset', 'flux-input', 'flux-select', 'flux-radio-group', 'flux-checkbox', 'flux-textarea', 'flux-button'].forEach(
            (tag) => field(tag).should('exist')
        );
        field('flux-radio-group').find('vds-radio').should('have.length', 3);
        cy.window().then((win) => {
            expect(win.customElements.get('flux-select'), 'flux-select registered').to.exist;
            expect(win.customElements.get('flux-radio-group'), 'flux-radio-group registered').to.exist;
        });
    });

    it('flux-look: flux-input veld-box radius = flux 0.3rem (4.8px hier), niet VDS 8px', () => {
        field('flux-input[name="voornaam"]')
            .shadow()
            .find('.vl-input__wrapper')
            .then(($w) => {
                const radius = getComputedStyle($w[0]).borderTopLeftRadius;
                expect(radius, 'flux-token 0.3rem toegepast (16px-root context = 4.8px)').to.eq('4.8px');
                expect(radius, 'wijkt af van VDS-default 8px').to.not.eq('8px');
            });
    });

    it('geldige submit verzamelt via FormData en print de data', () => {
        fillValid();
        field('flux-button[type="submit"]').click();
        root()
            .find('pre')
            .should('exist')
            .invoke('text')
            .then((text) => {
                const data = JSON.parse(text);
                expect(data).to.deep.include({
                    voornaam: 'Jan',
                    achternaam: 'Janssens',
                    email: 'jan@voorbeeld.be',
                    leeftijd: '42',
                    provincie: 'limburg',
                    contact: 'email',
                    akkoord: 'ja',
                });
                expect(data.interesses).to.deep.eq(['sport', 'wetenschap']);
            });
    });
});
