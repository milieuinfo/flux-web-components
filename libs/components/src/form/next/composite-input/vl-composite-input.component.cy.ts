import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlCompositeInputComponent } from './vl-composite-input.component';
import { CompositeValues } from './validators';
import { VlInputFieldComponent } from '../../input-field/vl-input-field.component';
import { VlFormMessageComponent } from '../../form-message/vl-form-message.component';

registerWebComponents([VlCompositeInputComponent, VlInputFieldComponent, VlFormMessageComponent]);

type CompositeEl = HTMLElement & {
    checkValidity(): boolean;
    validity: ValidityState;
    validationMessage: string;
};

const mountForm = (customValidator?: unknown) =>
    cy.mount(html`
        <form>
            <vl-composite-input-next
                id="coords"
                name="coords"
                label="Coördinaten"
                required
                .customValidator=${customValidator ?? undefined}
            >
                <vl-input-field slot="first" label="X" type="number" min="0" max="100"></vl-input-field>
                <vl-input-field slot="second" label="Y" type="number" min="0" max="100"></vl-input-field>
            </vl-composite-input-next>
            <vl-form-message for="coords" state="valueMissing">required</vl-form-message>
            <vl-form-message for="coords" state="rangeUnderflow">underflow</vl-form-message>
            <vl-form-message for="coords" state="rangeOverflow">overflow</vl-form-message>
            <vl-form-message for="coords" state="customError"></vl-form-message>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>
    `);

const typeIn = (slot: 'first' | 'second', value: string) =>
    cy.get(`vl-input-field[slot="${slot}"]`).shadow().find('input').clear().type(value);

describe('vl-composite-input-next - validation messages', () => {
    it('mounts and finds slots', () => {
        mountForm();
        cy.get('vl-composite-input-next').shadow().find('slot[name="first"]');
        cy.get('vl-composite-input-next').shadow().find('slot[name="second"]');
    });

    it('should be accessible', () => {
        mountForm();
        cy.injectAxe();
        cy.checkA11y('vl-composite-input-next');
    });

    it('shows valueMissing when both fields are empty on submit', () => {
        mountForm();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('shows valueMissing when only one field is filled on submit', () => {
        mountForm();
        typeIn('first', '50');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('shows rangeOverflow when a value exceeds max', () => {
        mountForm();
        typeIn('first', '150');
        typeIn('second', '50');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
    });

    it('shows rangeUnderflow when a value is below min', () => {
        mountForm();
        typeIn('first', '50');
        typeIn('second', '-5');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeUnderflow"]').should('have.attr', 'show');
    });

    it('clears the error after correcting an out-of-range value back into range', () => {
        mountForm();
        typeIn('first', '150');
        typeIn('second', '50');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');

        typeIn('first', '50');
        cy.get('vl-form-message[state="rangeOverflow"]').should('not.have.attr', 'show');
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
        cy.get('vl-form-message[state="rangeUnderflow"]').should('not.have.attr', 'show');
    });

    it('clears the valueMissing error after filling both fields', () => {
        mountForm();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');

        typeIn('first', '10');
        typeIn('second', '20');
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
    });

    it('surfaces customValidator string as a customError message', () => {
        const customValidator = ({ first, second }: CompositeValues): string | null => {
            const sum = parseFloat(first) + parseFloat(second);
            return sum > 100 ? `sum ${sum} exceeds 100` : null;
        };

        mountForm(customValidator);

        typeIn('first', '60');
        typeIn('second', '50');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="customError"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="customError"]').should(
            'have.attr',
            'validation-message',
            'sum 110 exceeds 100'
        );

        typeIn('second', '20');
        cy.get('vl-form-message[state="customError"]').should('not.have.attr', 'show');
    });
});

describe('vl-composite-input-next - constraint validation API', () => {
    it('is invalid (valueMissing) when required and empty', () => {
        mountForm();
        cy.get('vl-composite-input-next').should(($el) => {
            const el = $el[0] as unknown as CompositeEl;
            expect(el.checkValidity(), 'checkValidity').to.eq(false);
            expect(el.validity.valueMissing, 'valueMissing').to.eq(true);
            expect(el.validity.valid, 'valid').to.eq(false);
        });
    });

    it('becomes valid once both in-range values are present', () => {
        mountForm();
        typeIn('first', '10');
        typeIn('second', '20');
        cy.get('vl-composite-input-next').should(($el) => {
            const el = $el[0] as unknown as CompositeEl;
            expect(el.checkValidity(), 'checkValidity').to.eq(true);
            expect(el.validity.valid, 'valid').to.eq(true);
        });
    });

    it('flags rangeOverflow in the validity state', () => {
        mountForm();
        typeIn('first', '150');
        typeIn('second', '20');
        cy.get('vl-composite-input-next').should(($el) => {
            const el = $el[0] as unknown as CompositeEl;
            expect(el.validity.rangeOverflow, 'rangeOverflow').to.eq(true);
            expect(el.validity.valid, 'valid').to.eq(false);
        });
    });

    it('flags customError in the validity state', () => {
        mountForm(({ first, second }: CompositeValues) =>
            parseFloat(first) > parseFloat(second) ? 'first must be <= second' : null
        );
        typeIn('first', '90');
        typeIn('second', '10');
        cy.get('vl-composite-input-next').should(($el) => {
            const el = $el[0] as unknown as CompositeEl;
            expect(el.validity.customError, 'customError').to.eq(true);
            expect(el.validationMessage, 'validationMessage').to.eq('first must be <= second');
        });
    });

    it('forces an error via the error attribute', () => {
        mountForm();
        typeIn('first', '10');
        typeIn('second', '20');
        cy.get('vl-composite-input-next').invoke('attr', 'error', '');
        cy.get('vl-composite-input-next').should(($el) => {
            const el = $el[0] as unknown as CompositeEl;
            expect(el.validity.customError, 'customError').to.eq(true);
            expect(el.validity.valid, 'valid').to.eq(false);
        });
    });
});

describe('vl-composite-input-next - custom validator receives raw strings', () => {
    it('validates non-numeric values via the raw string payload', () => {
        const matchValidator = ({ first, second }: CompositeValues): string | null =>
            first !== second ? `'${first}' verschilt van '${second}'` : null;

        cy.mount(html`
            <form>
                <vl-composite-input-next id="pin" name="pin" label="Code" required .customValidator=${matchValidator}>
                    <vl-input-field slot="first" label="Code" type="text"></vl-input-field>
                    <vl-input-field slot="second" label="Herhaal code" type="text"></vl-input-field>
                </vl-composite-input-next>
                <vl-form-message for="pin" state="customError"></vl-form-message>
                <button type="submit">Submit</button>
            </form>
        `);

        typeIn('first', 'abc');
        typeIn('second', 'xyz');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="customError"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="customError"]').should(
            'have.attr',
            'validation-message',
            "'abc' verschilt van 'xyz'"
        );

        typeIn('second', 'abc');
        cy.get('vl-form-message[state="customError"]').should('not.have.attr', 'show');
    });
});

describe('vl-composite-input-next - events', () => {
    it('dispatches vl-change with a { first, second } payload', () => {
        mountForm();
        const onChange = cy.stub().as('change');
        cy.get('vl-composite-input-next').then(($el) => {
            $el[0].addEventListener('vl-change', (e) => onChange((e as CustomEvent).detail));
        });

        typeIn('first', '7');
        cy.get('@change').should('have.been.calledWithMatch', { first: '7', second: '' });

        typeIn('second', '8');
        cy.get('@change').should('have.been.calledWithMatch', { first: '7', second: '8' });
    });
});

describe('vl-composite-input-next - disabled', () => {
    it('propagates disabled to its slotted children', () => {
        mountForm();
        cy.get('vl-composite-input-next').invoke('attr', 'disabled', '');
        cy.get('vl-input-field[slot="first"]').should('have.attr', 'disabled');
        cy.get('vl-input-field[slot="second"]').should('have.attr', 'disabled');
        cy.get('vl-input-field[slot="first"]').shadow().find('input').should('be.disabled');
    });

    it('removes disabled from children again when cleared', () => {
        mountForm();
        cy.get('vl-composite-input-next').invoke('attr', 'disabled', '');
        cy.get('vl-input-field[slot="first"]').should('have.attr', 'disabled');
        cy.get('vl-composite-input-next').invoke('removeAttr', 'disabled');
        cy.get('vl-input-field[slot="first"]').should('not.have.attr', 'disabled');
    });
});

describe('vl-composite-input-next - blur-validation', () => {
    it('validates on blur once a value is out of range', () => {
        cy.mount(html`
            <form blur-validation>
                <vl-composite-input-next id="coords" name="coords" label="Coördinaten" required>
                    <vl-input-field slot="first" label="X" type="number" min="0" max="100"></vl-input-field>
                    <vl-input-field slot="second" label="Y" type="number" min="0" max="100"></vl-input-field>
                </vl-composite-input-next>
                <vl-form-message for="coords" state="rangeOverflow">overflow</vl-form-message>
                <button type="submit">Submit</button>
            </form>
        `);

        typeIn('first', '150');
        typeIn('second', '20');
        cy.get('body').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
    });
});

describe('vl-composite-input-next - form data (get & set)', () => {
    it('submits both values as <name>-first and <name>-second entries', () => {
        mountForm();
        typeIn('first', '12');
        typeIn('second', '34');
        cy.get('form').should(($f) => {
            const fd = new FormData($f[0] as HTMLFormElement);
            expect(fd.get('coords-first')).to.eq('12');
            expect(fd.get('coords-second')).to.eq('34');
        });
    });

    it('omits the control from form data while incomplete', () => {
        mountForm();
        typeIn('first', '12');
        cy.get('form').should(($f) => {
            const fd = new FormData($f[0] as HTMLFormElement);
            expect(fd.get('coords-first')).to.eq(null);
            expect(fd.get('coords-second')).to.eq(null);
        });
    });

    it('accepts programmatically pre-filled child values and reflects them in form data', () => {
        cy.mount(html`
            <form>
                <vl-composite-input-next id="coords" name="coords" label="Coördinaten" required>
                    <vl-input-field slot="first" label="X" type="number" min="0" max="100" value="40"></vl-input-field>
                    <vl-input-field slot="second" label="Y" type="number" min="0" max="100" value="55"></vl-input-field>
                </vl-composite-input-next>
                <button type="submit">Submit</button>
            </form>
        `);

        cy.get('vl-composite-input-next').should(($el) => {
            expect(($el[0] as unknown as CompositeEl).validity.valid).to.eq(true);
        });
        cy.get('form').should(($f) => {
            const fd = new FormData($f[0] as HTMLFormElement);
            expect(fd.get('coords-first')).to.eq('40');
            expect(fd.get('coords-second')).to.eq('55');
        });
    });
});

describe('vl-composite-input-next - form participation & reset', () => {
    it('participates in the owning form via its name', () => {
        mountForm();
        cy.get('form').should(($f) => {
            const form = $f[0] as HTMLFormElement;
            expect(form.elements.namedItem('coords')).to.exist;
        });
    });

    it('resets values, validity and messages on form reset', () => {
        mountForm();
        typeIn('first', '150');
        typeIn('second', '20');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-input-field[slot="first"]').shadow().find('input').should('have.value', '');
        cy.get('vl-input-field[slot="second"]').shadow().find('input').should('have.value', '');
        cy.get('vl-form-message[state="rangeOverflow"]').should('not.have.attr', 'show');
        cy.get('form').should(($f) => {
            const fd = new FormData($f[0] as HTMLFormElement);
            expect(fd.get('coords-first')).to.eq(null);
        });
    });
});
