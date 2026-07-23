import { css } from 'lit';
import { VlButton } from '@govflanders/vl-ui-design-system-web-components';

export class FluxButton extends VlButton {
    static properties = {
        secondary: { type: Boolean },
        tertiary: { type: Boolean },
        ghost: { type: Boolean },
        large: { type: Boolean },
        block: { type: Boolean },
    };

    declare secondary: boolean;
    declare tertiary: boolean;
    declare ghost: boolean;
    declare large: boolean;
    declare block: boolean;

    static styles = [
        (VlButton as unknown as { styles: unknown }).styles,
        css`
            :host(:not([bare])) {
                --vl-form-control-height: 3.5rem;
                --base-border-radius-selectable-default: 0.3rem;
                --base-border-width-default: 2px;
                --base-border-focus-spacing-color: rgba(0, 85, 204, 0.65);
                --base-space-selectable-inset-vertical-s: 0.5rem;
                --base-space-selectable-inset-horizontal-l: 2rem;
                --base-typography-desktop-body-medium-compact-s-line-height: normal;
            }
            :host(:not([bare]):focus-visible),
            :host(:not([bare]):focus) {
                outline-color: var(--base-border-focus-spacing-color);
                outline-width: 3px;
                outline-offset: 2px;
                box-shadow: none;
            }
            @media screen and (max-width: 767px) {
                :host(:not([bare])) {
                    --base-space-selectable-inset-vertical-s: 1rem;
                    --base-space-selectable-inset-horizontal-l: 1rem;
                }
                :host(:not([bare])) .vl-button {
                    height: auto;
                    min-height: 3.5rem;
                }
            }
        `,
    ];

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        const vds = this as unknown as { variant: string; size: string; grow: string };
        if (this.secondary) vds.variant = 'secondary';
        else if (this.tertiary) vds.variant = 'tertiary';
        else if (this.ghost) vds.variant = 'ghost';
        if (this.large) vds.size = 'large';
        if (this.block) vds.grow = 'fill';
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-button')) {
    customElements.define('flux-button', FluxButton);
}
