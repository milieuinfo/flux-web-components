import { css } from 'lit';
import { VlIcon } from '@govflanders/vl-ui-design-system-web-components';

export class FluxIcon extends VlIcon {
    static properties = {
        scaled: { type: Boolean, reflect: true },
    };

    declare scaled: boolean;

    static styles = [
        (VlIcon as unknown as { styles: unknown }).styles,
        css`
            :host([scaled]) .vl-icon {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
            :host([scaled]) .vl-icon--small {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.8);
            }
            :host([scaled]) .vl-icon--large {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1.2);
            }
        `,
    ];
}

if (!customElements.get('flux-icon')) {
    customElements.define('flux-icon', FluxIcon);
}
