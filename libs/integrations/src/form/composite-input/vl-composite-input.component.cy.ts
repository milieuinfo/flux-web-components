import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { VlCompositeInputComponent } from './vl-composite-input.component';
import { CompositeValues } from '@domg-wc/components/form';

registerWebComponents([VlCompositeInputComponent, VlInputFieldComponent]);

const typeIn = (id: string, value: string) =>
    cy.get(`vl-input-field#${id}`).shadow().find('input').clear().type(value).blur();

const formKeys = (assert: (keys: string[]) => void) =>
    cy.get('form').should(($form) => assert([...new FormData($form[0] as HTMLFormElement).keys()]));

const formValid = (assert: (valid: boolean) => void) =>
    cy.get('form').should(($form) => assert(($form[0] as HTMLFormElement).checkValidity()));

describe('cypress-component - integrations - vl-composite-input (Mode A)', () => {
    it('de kinderen submitten zichzelf onder hun eigen name; de composite voegt geen eigen sleutel toe', () => {
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" required>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '4.35');
        typeIn('lat', '50.85');

        formKeys((keys) => {
            expect(keys).to.include('geo-lon');
            expect(keys).to.include('geo-lat');
            expect(keys).to.not.include('geo');
        });
    });

    it('required-all: de form is ongeldig bij onvolledige invoer en geldig zodra alle velden ingevuld zijn', () => {
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" required>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '4.35');
        formValid((valid) => expect(valid).to.be.false);

        typeIn('lat', '50.85');
        formValid((valid) => expect(valid).to.be.true);
    });

    it('customValidator maakt de composite ongeldig (customError) bij een foute combinatie', () => {
        const teGroot = ({ 'geo-lon': lon }: CompositeValues): string | null => (parseFloat(lon) > 100 ? 'lon te groot' : null);
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" .customValidator=${teGroot}>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '200');
        typeIn('lat', '5');
        formValid((valid) => expect(valid).to.be.false);

        typeIn('lon', '5');
        formValid((valid) => expect(valid).to.be.true);
    });
});
