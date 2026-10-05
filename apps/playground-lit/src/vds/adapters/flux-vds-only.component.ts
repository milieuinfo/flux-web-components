import { css, CSSResultGroup } from 'lit';
import {
    VlAvatar,
    VlBannerMessage,
    VlGrid,
    VlGridItem,
    VlInlineMessage,
} from '@govflanders/vl-ui-design-system-web-components';
import { fluxFocus, fluxMessageTokens } from './flux-tokens';

const stylesOf = (cls: unknown): CSSResultGroup => (cls as { styles: CSSResultGroup }).styles;

export class FluxAvatar extends VlAvatar {
    static styles = [stylesOf(VlAvatar), fluxFocus];
}

export class FluxBannerMessage extends VlBannerMessage {
    static styles = [
        stylesOf(VlBannerMessage),
        fluxFocus,
        fluxMessageTokens,
        css`
            :host(:not([bare])) [part~='icon'] *::part(icon) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1.5);
            }
            :host(:not([bare])) [part~='close-button'] > *::part(icon) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
        `,
    ];
}

export class FluxInlineMessage extends VlInlineMessage {
    static styles = [
        stylesOf(VlInlineMessage),
        fluxFocus,
        fluxMessageTokens,
        css`
            :host(:not([bare])) [part~='icon'] *::part(icon) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1.125);
            }
        `,
    ];
}

export class FluxGrid extends VlGrid {
    static styles = [stylesOf(VlGrid)];
}

export class FluxGridItem extends VlGridItem {
    static styles = [stylesOf(VlGridItem)];
}

const define = (tag: string, cls: CustomElementConstructor): void => {
    if (!customElements.get(tag)) customElements.define(tag, cls);
};

define('flux-avatar', FluxAvatar);
define('flux-banner-message', FluxBannerMessage);
define('flux-inline-message', FluxInlineMessage);
define('flux-grid', FluxGrid);
define('flux-grid-item', FluxGridItem);
