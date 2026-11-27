import { isButtonBlocked } from '../../atom/button/vl-button.utils';

const VL_BUTTON_TAG = 'vl-button';
const SUBMIT_BUTTON_CANDIDATES = `button, input[type="submit" i], input[type="image" i], ${VL_BUTTON_TAG}`;

type ButtonProperties = Record<string, unknown>;

// Leest de property, want type en loading van vl-button reflecteren niet naar een attribuut. Het attribuut
// is de terugval voor een vl-button die nog niet geüpgraded is en de property dus nog niet heeft.
const readString = (button: Element, property: string, attribute = property): unknown =>
    property in button ? (button as unknown as ButtonProperties)[property] : button.getAttribute(attribute);

const readBoolean = (button: Element, name: string): boolean =>
    name in button ? Boolean((button as unknown as ButtonProperties)[name]) : button.hasAttribute(name);

const isVlButton = (element: Element): boolean => element.localName === VL_BUTTON_TAG;

// Een vl-button met cta-link rendert een link en verstuurt geen formulier.
const isVlSubmitButton = (element: Element, form: HTMLFormElement): boolean =>
    isVlButton(element) &&
    element.closest('form') === form &&
    readString(element, 'type') === 'submit' &&
    !readString(element, 'ctaLink', 'cta-link');

const isNativeSubmitButton = (element: Element, form: HTMLFormElement): boolean => {
    const { form: owner, type } = element as HTMLButtonElement | HTMLInputElement;

    return !isVlButton(element) && owner === form && (type === 'submit' || type === 'image');
};

// Zoekt in de hele root en niet enkel in het formulier: een native knop met een form-attribuut hoort bij het
// formulier, ook als hij erbuiten staat.
const findDefaultButton = (form: HTMLFormElement): Element | undefined => {
    const root = form.getRootNode() as ParentNode;

    return Array.from(root.querySelectorAll(SUBMIT_BUTTON_CANDIDATES)).find(
        (element) => isNativeSubmitButton(element, form) || isVlSubmitButton(element, form),
    );
};

// De default button is de eerste submitknop in boomvolgorde. Zoals bij een native formulier beslist enkel die
// knop of Enter verstuurt, ook als een latere submitknop wel actief is.
export const isDefaultButtonBlocked = (form: HTMLFormElement): boolean => {
    const defaultButton = findDefaultButton(form);

    if (!defaultButton) {
        return false;
    }

    return isVlButton(defaultButton)
        ? isButtonBlocked(readBoolean(defaultButton, 'disabled'), readBoolean(defaultButton, 'loading'))
        : defaultButton.matches(':disabled');
};
