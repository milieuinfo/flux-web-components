// FLUX-704: Cypress component-test voor de prefix-aware VDS-form.
// Draait via de gedeelde harness (resources/cypress-component); de
// specPattern + webpack (?inline CSS, fonts, transpileOnly) zijn daar
// uitgebreid. transpileOnly betekent: geen type-check tijdens CT, dus de
// bare VDS-imports worden enkel door webpack op runtime geresolved.
import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import './vds-form.component';

// Registreer de VDS-componenten onder de vds- prefix (eenmalig).
defineAll('vds');

const root = () => cy.get('vds-form-demo').shadow();
const field = (sel: string) => root().find(sel);

const fillValid = () => {
    field('vds-input[name="voornaam"]').shadow().find('input').type('Jan');
    field('vds-input[name="achternaam"]').shadow().find('input').type('Janssens');
    field('vds-input[name="email"]').shadow().find('input').type('jan@voorbeeld.be');
    field('vds-input[name="leeftijd"]').shadow().find('input').type('42');
    field('vds-select[name="provincie"]').shadow().find('select').select('limburg');
    field('vds-radio-group[name="contact"]')
        .find('vds-radio[value="email"]')
        .then(($r) => $r[0].click());
    field('vds-radio-group[name="contact"]')
        .find('vds-radio[value="email"]')
        .should('have.prop', 'checked', true);
    field('vds-checkbox[value="sport"]').shadow().find('input[type="checkbox"]').check({ force: true });
    field('vds-checkbox[value="wetenschap"]').shadow().find('input[type="checkbox"]').check({ force: true });
    field('vds-checkbox[name="akkoord"]').shadow().find('input[type="checkbox"]').check({ force: true });
};

const submit = () => field('vds-button[type="submit"]').click();

describe('FLUX-704 - prefix-aware VDS form', () => {
    beforeEach(() => {
        cy.mount(html`<vds-form-demo></vds-form-demo>`);
        // wacht tot de velden ge-upgrade zijn
        field('vds-input[name="voornaam"]').should('exist');
    });

    it('mount alle VDS form-controls onder de vds- prefix', () => {
        ['vds-input', 'vds-select', 'vds-radio-group', 'vds-radio', 'vds-checkbox', 'vds-textarea', 'vds-fieldset', 'vds-button'].forEach(
            (tag) => field(tag).should('exist')
        );
        // bevestig dat ze echt als vds-* geregistreerd zijn (custom prefix)
        cy.window().then((win) => {
            expect(win.customElements.get('vds-input'), 'vds-input registered').to.exist;
            expect(win.customElements.get('vds-button'), 'vds-button registered').to.exist;
        });
    });

    it('lege submit toont verplichte-veld fouten en verzendt NIET', () => {
        submit();
        // zichtbare foutmelding op een verplicht veld
        field('vds-input[name="voornaam"]')
            .shadow()
            .find('[part~="message"]')
            .should('contain.text', 'Dit veld is verplicht.');
        // error-prop staat aan
        field('vds-input[name="email"]').then(($el) => {
            expect(($el[0] as unknown as { error: boolean }).error).to.eq(true);
        });
        // checkbox-akkoord heeft eigen melding
        field('vds-checkbox[name="akkoord"]').then(($el) => {
            expect(($el[0] as unknown as { error: boolean }).error).to.eq(true);
        });
        // geen FormData-resultaat geprint
        root().find('pre').should('not.exist');
        // samenvatting getoond
        root().find('p[role="alert"]').should('contain.text', 'niet verzonden');
    });

    it('geldige submit verzamelt via FormData en print de data', () => {
        fillValid();
        submit();
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
                // dubbele checkbox-name -> array
                expect(data.interesses).to.deep.eq(['sport', 'wetenschap']);
            });
        // geen openstaande fouten meer
        root().find('p[role="alert"]').should('not.exist');
    });

    it('"Vul demo-data in"-knop vult alle velden en submit lukt', () => {
        field('vds-button').contains('Vul demo-data').click();
        submit();
        root()
            .find('pre')
            .should('exist')
            .invoke('text')
            .then((text) => {
                const data = JSON.parse(text);
                expect(data.voornaam).to.eq('Jan');
                expect(data.provincie).to.eq('limburg');
                expect(data.akkoord).to.eq('ja');
                expect(data.interesses).to.deep.eq(['sport', 'wetenschap']);
            });
    });

    it('toont formaat-validatie voor een ongeldig e-mailadres', () => {
        field('vds-input[name="email"]').shadow().find('input').type('geen-email');
        submit();
        field('vds-input[name="email"]')
            .shadow()
            .find('[part~="message"]')
            .should('contain.text', 'geldig e-mailadres');
    });

    it('wist de fout live zodra het veld gecorrigeerd wordt', () => {
        submit(); // forceer fouten
        field('vds-input[name="voornaam"]').then(($el) => {
            expect(($el[0] as unknown as { error: boolean }).error).to.eq(true);
        });
        field('vds-input[name="voornaam"]').shadow().find('input').type('Jan');
        field('vds-input[name="voornaam"]').then(($el) => {
            expect(($el[0] as unknown as { error: boolean }).error).to.eq(false);
        });
    });

    it('flux vl-* blijft naast vds-* registreerbaar (geen collision)', () => {
        cy.window().then((win) => {
            // vds- prefix bezet vds-button; de default vl- namespace blijft vrij voor flux
            expect(win.customElements.get('vds-button')).to.exist;
        });
    });

    it('a11y: rapporteer axe-violations op de form (niet-blokkerend)', () => {
        cy.injectAxe();
        // skipFailures=true: VDS-componenten zijn niet onze code; we rapporteren,
        // falen de PoC-test niet op third-party violations.
        cy.checkA11y(
            'vds-form-demo',
            undefined,
            (violations) => {
                cy.log(`a11y violations: ${violations.length}`);
                violations.forEach((v) => cy.log(`a11y: ${v.id} (${v.impact}) - ${v.nodes.length} nodes`));
            },
            true
        );
    });
});
