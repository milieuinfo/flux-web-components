import { css } from 'lit';
import { VlDivider } from '@govflanders/vl-ui-design-system-web-components';

export class FluxSeparator extends VlDivider {
    static properties = {
        wave: { type: Boolean },
        slash: { type: Boolean },
    };

    declare wave: boolean;
    declare slash: boolean;

    static styles = [
        (VlDivider as unknown as { styles: unknown }).styles,
        css`
            :host(:not([bare])) {
                --base-color-border-default: #808080;
            }
            :host(:not([bare])) .vl-divider {
                --vl-divider-thickness: 1px;
            }
            :host(:not([bare])) .vl-divider--wave {
                height: 0.4rem;
            }
            :host(:not([bare])) .vl-divider--tilt {
                min-height: 0.6rem;
            }
        `,
    ];

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        if (this.wave) this.appearance = 'wave';
        else if (this.slash) this.appearance = 'tilt';
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-separator')) {
    customElements.define('flux-separator', FluxSeparator);
}
