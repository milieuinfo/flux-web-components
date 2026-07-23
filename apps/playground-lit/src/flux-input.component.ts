import { css } from 'lit';
import { VlInput } from '@govflanders/vl-ui-design-system-web-components';

export class FluxInput extends VlInput {
    static styles = [
        (VlInput as unknown as { styles: unknown }).styles,
        css`
            :host {
                --base-border-radius-selectable-default: 0.3rem;
                --base-color-border-default: #8695a8;
                --base-space-container-inset-vertical-s: calc(var(--global-font-size-scaled-base, 1rem) * 0.375);
                --base-space-container-inset-horizontal-l: calc(var(--global-font-size-scaled-base, 1rem) * 0.625);
            }
        `,
    ];
}

if (!customElements.get('flux-input')) {
    customElements.define('flux-input', FluxInput);
}
