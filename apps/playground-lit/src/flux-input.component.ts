import { css } from 'lit';
import { VlInput } from '@govflanders/vl-ui-design-system-web-components';

export class FluxInput extends VlInput {
    static styles = [
        (VlInput as unknown as { styles: unknown }).styles,
        css`
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

            :host(:not([bare])) .vl-input__wrapper:has(.vl-input:focus) {
                outline-width: 3px;
                outline-offset: 2px;
            }
        `,
    ];
}

if (!customElements.get('flux-input')) {
    customElements.define('flux-input', FluxInput);
}
