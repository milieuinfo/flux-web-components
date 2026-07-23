type FormControlLike = HTMLElement & {
    value?: string | null;
    checked?: boolean;
};

type NativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isCheckbox = (el: Element): boolean => el.localName.endsWith('-checkbox');
const isRadioGroup = (el: Element): boolean => el.localName.endsWith('-radio-group');

const innerControl = (el: Element): NativeControl | null =>
    el.shadowRoot?.querySelector<NativeControl>('input, textarea, select') ?? null;

const nativeProtoValueSetter = (native: NativeControl): ((v: string) => void) | undefined => {
    const proto =
        native instanceof HTMLSelectElement
            ? HTMLSelectElement.prototype
            : native instanceof HTMLTextAreaElement
              ? HTMLTextAreaElement.prototype
              : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    return setter ? (v: string) => setter.call(native, v) : undefined;
};

const fireInputAndChange = (native: NativeControl): void => {
    native.dispatchEvent(new Event('input', { bubbles: true }));
    native.dispatchEvent(new Event('change', { bubbles: true }));
};

export function getFormValue(host: FormControlLike): string | boolean | null {
    if (isCheckbox(host)) {
        const inner = innerControl(host) as HTMLInputElement | null;
        return inner ? inner.checked : Boolean(host.checked);
    }
    if (isRadioGroup(host)) {
        const checked =
            host.shadowRoot?.querySelector<HTMLInputElement>('input[type="radio"]:checked') ??
            host.querySelector<HTMLInputElement>('input[type="radio"]:checked');
        return checked?.value ?? host.value ?? null;
    }
    const inner = innerControl(host);
    return inner ? inner.value : (host.value ?? null);
}

export function setFormValue(host: FormControlLike, value: string | boolean): void {
    if (isCheckbox(host)) {
        const target = Boolean(value);
        const inner = innerControl(host) as HTMLInputElement | null;
        if (inner) {
            if (inner.checked !== target) inner.click();
        } else {
            host.checked = target;
        }
        return;
    }
    if (isRadioGroup(host)) {
        const str = String(value);
        const radio = host.querySelector<HTMLElement>(`[value="${str}"]`);
        const innerRadio = radio?.shadowRoot?.querySelector<HTMLInputElement>('input[type="radio"]');
        if (innerRadio) {
            if (!innerRadio.checked) innerRadio.click();
        } else if (radio) {
            radio.click();
        } else {
            host.value = str;
        }
        return;
    }
    const str = String(value);
    const inner = innerControl(host);
    if (inner) {
        nativeProtoValueSetter(inner)?.(str);
        fireInputAndChange(inner);
    } else {
        host.value = str;
    }
}
