import { css } from 'lit';
import { VlIcon } from '@govflanders/vl-ui-design-system-web-components';
import '../bootstrap/vds-iconfont-alias';

export class FluxIcon extends VlIcon {
    static properties = {
        scaled: { type: Boolean, reflect: true },
        small: { type: Boolean },
        large: { type: Boolean },
    };

    declare scaled: boolean;
    declare small: boolean;
    declare large: boolean;

    static styles = [
        (VlIcon as unknown as { styles: unknown }).styles,
        css`
            :host [class*='vl-vi-']::before {
                font-family: 'vds-vlaanderen-icon' !important;
            }
            :host([scaled]) .vl-icon {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
            :host([scaled]) .vl-icon--s {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.8);
            }
            :host([scaled]) .vl-icon--l {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1.2);
            }
        `,
    ];

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        const vds = this as unknown as { size: string };
        if (this.small) vds.size = 's';
        else if (this.large) vds.size = 'l';
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-icon')) {
    customElements.define('flux-icon', FluxIcon);
}
