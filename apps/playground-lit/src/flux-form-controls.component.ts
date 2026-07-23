import { css } from 'lit';
import {
    VlCheckbox,
    VlDatepicker,
    VlFieldset,
    VlRadioGroup,
    VlSelect,
    VlTextarea,
} from '@govflanders/vl-ui-design-system-web-components';

const fluxLook = css`
    :host(:not([bare])) {
        --base-border-radius-selectable-default: 0.3rem;
        --base-color-border-default: #8695a8;
        --base-border-focus-spacing-color: rgba(0, 85, 204, 0.65);
        --base-space-container-inset-vertical-s: calc(var(--global-font-size-scaled-base, 1rem) * 0.375);
        --base-space-container-inset-horizontal-l: calc(var(--global-font-size-scaled-base, 1rem) * 0.625);
        --base-color-background-surface-form-element-hover: var(
            --base-color-background-surface-form-element-enabled
        );
    }
`;

export class FluxSelect extends VlSelect {
    static styles = [
        (VlSelect as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            :host(:not([bare])) .vl-select:focus {
                outline-color: var(--base-border-focus-spacing-color);
                outline-width: 3px;
                outline-offset: 2px;
                box-shadow: none;
            }
        `,
    ];
}
export class FluxCheckbox extends VlCheckbox {
    static styles = [
        (VlCheckbox as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            :host(:not([bare])) {
                --base-border-radius-container-2xs: 0.3rem;
            }
            :host(:not([bare]):focus) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box,
            :host(:not([bare]):focus-visible) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box {
                outline-width: 3px;
                outline-offset: 2px;
            }
        `,
    ];
}
export class FluxTextarea extends VlTextarea {
    static styles = [
        (VlTextarea as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            :host(:not([bare])) .vl-textarea:focus,
            :host(:not([bare])) .vl-textarea:focus-visible {
                outline-width: 3px;
                outline-offset: 2px;
            }
        `,
    ];
}
export class FluxFieldset extends VlFieldset {
    static styles = [(VlFieldset as unknown as { styles: unknown }).styles, fluxLook];
}
export class FluxRadioGroup extends VlRadioGroup {
    static styles = [(VlRadioGroup as unknown as { styles: unknown }).styles, fluxLook];
}
export class FluxDatepicker extends VlDatepicker {
    static styles = [
        (VlDatepicker as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            :host(:not([bare])) {
                --base-border-radius-container-xl: 0.3rem;
            }
            :host(:not([bare])) .vl-datepicker__input-wrapper:has(.vl-datepicker__input:focus) {
                outline-color: var(--base-border-focus-spacing-color);
                outline-width: 3px;
                outline-offset: 2px;
                box-shadow: none;
            }
            :host(:not([bare])) calendar-month {
                --base-border-radius-selectable-default: 50%;
            }
            :host(:not([bare])) calendar-month::part(button) {
                width: calc(var(--global-font-size-scaled-base, 1rem) * 2.25);
                height: calc(var(--global-font-size-scaled-base, 1rem) * 2.25);
            }
        `,
    ];
}

const registry: [string, CustomElementConstructor][] = [
    ['flux-select', FluxSelect],
    ['flux-checkbox', FluxCheckbox],
    ['flux-textarea', FluxTextarea],
    ['flux-fieldset', FluxFieldset],
    ['flux-radio-group', FluxRadioGroup],
    ['flux-datepicker', FluxDatepicker],
];
for (const [tag, ctor] of registry) {
    if (!customElements.get(tag)) customElements.define(tag, ctor);
}
