import { css, unsafeCSS } from 'lit';
import { VlDivider } from '@govflanders/vl-ui-design-system-web-components';

const SLASH_MASK =
    "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6.04 5.99'%3E%3Cg%3E%3Crect x='1.01' y='3.99' width='1.01' height='1'/%3E%3Crect y='4.99' width='1.01' height='1'/%3E%3Crect x='3.02' y='2' width='1.01' height='1'/%3E%3Crect x='2.01' y='2.99' width='1.01' height='1'/%3E%3Crect x='5.04' width='1.01' height='1'/%3E%3Crect x='4.03' y='1' width='1.01' height='1'/%3E%3C/g%3E%3C/svg%3E\"";

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
                --base-color-border-default: #cbd2da;
            }
            :host(:not([bare])) .vl-divider {
                --vl-divider-thickness: 1px;
            }
            :host(:not([bare])) .vl-divider--wave {
                height: 0.4rem;
                color: #d2d7dd;
                mask-size: 2rem 0.4rem;
            }
            :host(:not([bare])) .vl-divider--tilt {
                min-height: 0.6rem;
                color: #bec5cf;
                mask: url(${unsafeCSS(SLASH_MASK)}) repeat-x;
                mask-size: 0.6rem 0.6rem;
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
