import { css } from 'lit';
import { VlLink } from '@govflanders/vl-ui-design-system-web-components';

export class FluxLink extends VlLink {
    static properties = {
        small: { type: Boolean },
        large: { type: Boolean },
        error: { type: Boolean },
        external: { type: Boolean },
    };

    declare small: boolean;
    declare large: boolean;
    declare error: boolean;
    declare external: boolean;

    static styles = [
        (VlLink as unknown as { styles: unknown }).styles,
        css`
            :host {
                --base-color-underline-action-default: #0055cc;
                --base-color-underline-action-hover: #0048ad;
                --base-color-underline-action-active: #002f70;
            }

            .vl-link .vl-link__slot {
                text-underline-offset: auto;
                text-decoration-thickness: auto;
            }
        `,
    ];

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        const vds = this as unknown as { size: string; danger: boolean; newWindow: boolean };
        if (this.small) vds.size = 'small';
        else if (this.large) vds.size = 'large';
        if (this.error) vds.danger = true;
        if (this.external) vds.newWindow = true;
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-link')) {
    customElements.define('flux-link', FluxLink);
}
