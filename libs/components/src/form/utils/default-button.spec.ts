import { isDefaultButtonBlocked } from './default-button';

// vl-button is hier bewust niet geregistreerd: zo test deze spec de terugval op de attributen.
describe('jest - components - form - default-button - vl-button that is not upgraded yet', () => {
    const createForm = (buttons: string): HTMLFormElement => {
        document.body.innerHTML = `<form><input name="veld" />${buttons}</form>`;
        return document.querySelector('form') as HTMLFormElement;
    };

    it('should not know vl-button as a custom element', () => {
        expect(customElements.get('vl-button')).toBeUndefined();
    });

    it.each([
        ['disabled', '<vl-button type="submit" disabled>Verstuur</vl-button>'],
        ['loading', '<vl-button type="submit" loading>Verstuur</vl-button>'],
        [
            'disabled and followed by an active submit button',
            '<vl-button type="submit" disabled>Bewaar</vl-button><vl-button type="submit">Verstuur</vl-button>',
        ],
    ])('should be blocked when the first submit button is %s', (_name, buttons) => {
        expect(isDefaultButtonBlocked(createForm(buttons))).toBe(true);
    });

    it.each([
        ['there is no submit button', ''],
        ['the submit button is active', '<vl-button type="submit">Verstuur</vl-button>'],
        ['a disabled button has type="button"', '<vl-button type="button" disabled>Annuleer</vl-button>'],
        ['a disabled button has no type', '<vl-button disabled>Annuleer</vl-button>'],
        [
            'a disabled button has cta-link',
            '<vl-button type="submit" cta-link="https://www.vlaanderen.be" disabled>Meer info</vl-button>',
        ],
    ])('should not be blocked when %s', (_name, buttons) => {
        expect(isDefaultButtonBlocked(createForm(buttons))).toBe(false);
    });

    it('should read a property that a framework set before the upgrade', () => {
        const form = createForm('<vl-button type="submit">Verstuur</vl-button>');

        Object.assign(form.querySelector('vl-button') as Element, { loading: true });

        expect(isDefaultButtonBlocked(form)).toBe(true);
    });
});
