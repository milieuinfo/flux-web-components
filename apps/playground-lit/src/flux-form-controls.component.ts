import { css } from 'lit';
import {
    VlCheckbox,
    VlDatepicker,
    VlFieldset,
    VlRadioGroup,
    VlSelect,
    VlTextarea,
} from '@govflanders/vl-ui-design-system-web-components';
import { aliasVdsIcon } from './vds-iconfont-alias';

const superUpdated = (self: object, changed: Map<PropertyKey, unknown>): void => {
    const base = Object.getPrototypeOf(Object.getPrototypeOf(self)) as {
        updated?: (c: Map<PropertyKey, unknown>) => void;
    };
    base.updated?.call(self, changed);
};

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
            :host(:not([bare])) .vl-formfield__container--small .vl-select {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.875);
            }
            :host(:not([bare])) .vl-formfield__container--medium .vl-select {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
            :host(:not([bare])) .vl-formfield__container--large .vl-select {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1.125);
            }
            :host(:not([bare])) .vl-select option {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1) !important;
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
                --checkbox-box-width: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
            :host(:not([bare])) .vl-checkbox__box {
                position: relative;
            }
            :host(:not([bare])) .vl-checkbox__check,
            :host(:not([bare])) .vl-checkbox__indeterminate {
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: auto;
                height: auto;
                line-height: 1;
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.625);
            }
            :host(:not([bare]):focus) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box,
            :host(:not([bare]):focus-visible) .vl-checkbox:not(.vl-checkbox--tile) .vl-checkbox__box {
                outline-width: 3px;
                outline-offset: 2px;
            }
        `,
    ];

    protected updated(changed: Map<PropertyKey, unknown>): void {
        superUpdated(this, changed);
        this.shadowRoot?.querySelectorAll('vds-icon').forEach((el) => aliasVdsIcon(el));
    }
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

    protected updated(changed: Map<PropertyKey, unknown>): void {
        superUpdated(this, changed);
        if (this.hasAttribute('bare')) return;
        this.querySelectorAll('vds-radio').forEach((radio) => {
            const sr = (radio as HTMLElement).shadowRoot as (ShadowRoot & { __fluxRadioSized?: boolean }) | null;
            if (sr && !sr.__fluxRadioSized) {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(
                    '.vl-radio__box{width:calc(var(--global-font-size-scaled-base,1rem)*1.125);height:calc(var(--global-font-size-scaled-base,1rem)*1.125);}' +
                        '.vl-radio__box::after{width:calc(var(--global-font-size-scaled-base,1rem)*0.375);height:calc(var(--global-font-size-scaled-base,1rem)*0.375);}'
                );
                sr.adoptedStyleSheets = [...sr.adoptedStyleSheets, sheet];
                sr.__fluxRadioSized = true;
            }
        });
    }
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
            :host(:not([bare])) calendar-date vds-select::part(select) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.875) !important;
            }
        `,
    ];

    private aliasAllIcons(): void {
        this.shadowRoot?.querySelectorAll('vds-icon').forEach((el) => aliasVdsIcon(el));
    }

    protected updated(changed: Map<PropertyKey, unknown>): void {
        superUpdated(this, changed);
        if (this.hasAttribute('bare')) return;
        this.aliasAllIcons();
        const root = this.shadowRoot as (ShadowRoot & { __fluxDpObserved?: boolean }) | null;
        if (root && !root.__fluxDpObserved) {
            new MutationObserver(() => this.aliasAllIcons()).observe(root, { childList: true, subtree: true });
            root.__fluxDpObserved = true;
        }
        this.shadowRoot?.querySelectorAll('vds-select').forEach((sel) => {
            const sr = (sel as HTMLElement).shadowRoot as (ShadowRoot & { __fluxSelSized?: boolean }) | null;
            if (sr && !sr.__fluxSelSized) {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(
                    ".vl-select option{font-size:calc(var(--global-font-size-scaled-base,1rem)*0.875) !important;}"
                );
                sr.adoptedStyleSheets = [...sr.adoptedStyleSheets, sheet];
                sr.__fluxSelSized = true;
            }
        });
    }
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
