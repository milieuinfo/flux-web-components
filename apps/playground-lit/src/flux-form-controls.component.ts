import { css } from 'lit';
import {
    VlCheckbox,
    VlFieldset,
    VlRadioGroup,
    VlSelect,
    VlTextarea,
} from '@govflanders/vl-ui-design-system-web-components';

const fluxLook = css`
    :host {
        --base-border-radius-selectable-default: 0.3rem;
        --base-color-border-default: #8695a8;
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
            .vl-select:focus {
                box-shadow:
                    0 0 0 2px white,
                    0 0 0 5px var(--base-color-focus-400);
            }
        `,
    ];
}
export class FluxCheckbox extends VlCheckbox {
    static styles = [
        (VlCheckbox as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            :host {
                --base-border-radius-container-2xs: 0.3rem;
            }
        `,
    ];
}
export class FluxTextarea extends VlTextarea {
    static styles = [
        (VlTextarea as unknown as { styles: unknown }).styles,
        fluxLook,
        css`
            .vl-textarea:focus,
            .vl-textarea:focus-visible {
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

const registry: [string, CustomElementConstructor][] = [
    ['flux-select', FluxSelect],
    ['flux-checkbox', FluxCheckbox],
    ['flux-textarea', FluxTextarea],
    ['flux-fieldset', FluxFieldset],
    ['flux-radio-group', FluxRadioGroup],
];
for (const [tag, ctor] of registry) {
    if (!customElements.get(tag)) customElements.define(tag, ctor);
}
