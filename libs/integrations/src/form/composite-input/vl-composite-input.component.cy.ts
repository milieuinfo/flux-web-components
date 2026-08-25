import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { CompositeInputComponent } from './vl-composite-input.component';
import { CompositeValues } from '@domg-wc/components/form';

registerWebComponents([CompositeInputComponent, VlInputFieldComponent]);

const typeIn = (id: string, value: string) =>
    cy.get(`vl-input-field#${id}`).shadow().find('input').clear().type(value).blur();

const formKeys = (assert: (keys: string[]) => void) =>
    cy.get('form').should(($form) => assert([...new FormData($form[0] as HTMLFormElement).keys()]));

const formValid = (assert: (valid: boolean) => void) =>
    cy.get('form').should(($form) => assert(($form[0] as HTMLFormElement).checkValidity()));

const veldVan = (target: HTMLElement | undefined | null): string | undefined => {
    const root = target?.getRootNode();
    return root instanceof ShadowRoot ? (root.host as HTMLElement).id : target?.id;
};

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
        const teGroot = ({ 'geo-lon': lon }: CompositeValues): string | null =>
            parseFloat(lon) > 100 ? 'lon te groot' : null;
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

    it('richt de melding op het eerste lege veld, niet op het reeds ingevulde', () => {
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" required>
                    <vl-input-field id="lon" name="geo-lon" label="Longitude"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat" label="Latitude"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '4.35');

        cy.get('vl-composite-input#geo').should(($composite) => {
            const composite = $composite[0] as CompositeInputComponent;
            composite.checkValidity();
            expect(veldVan(composite.validationTarget)).to.equal('lat');
        });
    });

    it('valt terug op het eerste veld wanneer geen enkel veld leeg is', () => {
        const teGroot = ({ 'geo-lon': lon }: CompositeValues): string | null =>
            parseFloat(lon) > 100 ? 'lon te groot' : null;
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" required .customValidator=${teGroot}>
                    <vl-input-field id="lon" name="geo-lon" label="Longitude"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat" label="Latitude"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '200');
        typeIn('lat', '50');

        cy.get('vl-composite-input#geo').should(($composite) => {
            const composite = $composite[0] as CompositeInputComponent;
            composite.checkValidity();
            expect(veldVan(composite.validationTarget)).to.equal('lon');
        });
    });

    it('geeft disabled door aan de kinderen en haalt het er weer af', () => {
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" disabled>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        cy.get('vl-input-field#lon').should('have.attr', 'disabled');
        cy.get('vl-input-field#lat').should('have.attr', 'disabled');

        cy.get('vl-composite-input#geo').then(($composite) => $composite[0].removeAttribute('disabled'));
        cy.get('vl-input-field#lon').should('not.have.attr', 'disabled');
        cy.get('vl-input-field#lat').should('not.have.attr', 'disabled');
    });

    it('een kind dat later toegevoegd wordt, krijgt de actieve staat mee', () => {
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" disabled>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        cy.get('vl-input-field#lon').should('have.attr', 'disabled');

        cy.get('vl-composite-input#geo').then(($composite) => {
            const composite = $composite[0];
            const laatkomer = composite.ownerDocument.createElement('vl-input-field');
            laatkomer.setAttribute('id', 'lat');
            laatkomer.setAttribute('name', 'geo-lat');
            composite.appendChild(laatkomer);
        });
        cy.get('vl-composite-input#geo')
            .find('vl-input-field#lat')
            .should('have.attr', 'disabled');
    });

    it('bundelt een kind-wijziging tot één vl-change met de waarden van alle velden', () => {
        const events: CustomEvent<CompositeValues>[] = [];
        const onChange = (event: Event) => {
            if (event.target instanceof CompositeInputComponent) {
                events.push(event as CustomEvent<CompositeValues>);
            }
        };
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" @vl-change=${onChange}>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                    <vl-input-field id="lat" name="geo-lat"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '4.35');

        cy.wrap(events).should((verzameld) => {
            expect(verzameld).to.not.be.empty;
            expect(verzameld[verzameld.length - 1].detail).to.deep.equal({
                'geo-lon': '4.35',
                'geo-lat': '',
            });
        });
    });

    it('stuurt geen vl-change wanneer een kind meldt zonder dat de waarde wijzigde', () => {
        const events: CustomEvent<CompositeValues>[] = [];
        const onChange = (event: Event) => {
            if (event.target instanceof CompositeInputComponent) {
                events.push(event as CustomEvent<CompositeValues>);
            }
        };
        cy.mount(html`
            <form>
                <vl-composite-input id="geo" @vl-change=${onChange}>
                    <vl-input-field id="lon" name="geo-lon"></vl-input-field>
                </vl-composite-input>
            </form>
        `);
        typeIn('lon', '4.35');

        let naInvoer = 0;
        cy.wrap(events)
            .should((verzameld) => expect(verzameld).to.not.be.empty)
            .then((verzameld) => {
                naInvoer = (verzameld as unknown as CustomEvent[]).length;
            });

        cy.get('vl-input-field#lon').then(($field) =>
            $field[0].dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true })),
        );

        cy.wrap(events).should((verzameld) => expect(verzameld).to.have.length(naInvoer));
    });
});
