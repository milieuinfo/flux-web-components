import {
    baseStyle,
    elementStyle,
    resetStyle,
    typographyStyle as commonTypographyStyle,
} from '@domg/govflanders-style/common';
import { titlesStyle, typographyStyle } from '@domg/govflanders-style/component';
import { css, CSSResult, CSSResultGroup, PropertyValues, unsafeCSS } from 'lit';
import {
    VlAvatar,
    VlBannerMessage,
    VlGrid,
    VlGridItem,
    VlInlineMessage,
    VlInputGroup,
    VlMarkdown,
} from '@govflanders/vl-ui-design-system-web-components';
import { fluxFocus, fluxMessageTokens } from './flux-tokens';

const stylesOf = (cls: unknown): CSSResultGroup => (cls as { styles: CSSResultGroup }).styles;

export class FluxAvatar extends VlAvatar {
    static styles = [
        stylesOf(VlAvatar),
        fluxFocus,
        css`
            :host(:not([bare])) [part~='icon']::part(icon),
            :host(:not([bare])) [part~='icon'] *::part(icon) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 1);
            }
            :host(:not([bare])[size='s']) [part~='icon']::part(icon),
            :host(:not([bare])[size='s']) [part~='icon'] *::part(icon) {
                font-size: calc(var(--global-font-size-scaled-base, 1rem) * 0.8);
            }
        `,
    ];
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

const VDS_MARKDOWN_SCOPE = /:host\s*,\s*:host\s*\*/;

export const vdsMarkdownStylesWhenBare = (): CSSResult => {
    const text = (stylesOf(VlMarkdown) as CSSResult).cssText;
    if (!VDS_MARKDOWN_SCOPE.test(text)) throw new Error('flux-markdown: VDS-markdown-styles niet herkend');
    return unsafeCSS(text.replace(VDS_MARKDOWN_SCOPE, ':host([bare]), :host([bare]) *'));
};

export class FluxMarkdown extends VlMarkdown {
    static properties = { bare: { type: Boolean, reflect: true } };

    declare bare: boolean;

    static styles = [
        vdsMarkdownStylesWhenBare(),
        resetStyle,
        baseStyle,
        elementStyle,
        typographyStyle,
        commonTypographyStyle,
        titlesStyle,
        fluxFocus,
        css`
            :host(:not([bare])) .vl-typography {
                display: block;
            }
        `,
    ];

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        this.shadowRoot?.querySelector('[part~="content"]')?.classList.toggle('vl-typography', !this.bare);
    }
}

export class FluxInputGroup extends VlInputGroup {
    static styles = [
        stylesOf(VlInputGroup),
        fluxFocus,
        css`
            :host(:not([bare])) {
                --base-border-radius-selectable-default: 0.3rem;
                --base-color-border-default: #8695a8;
                --vl-form-control-height: 3.5rem;
                --base-color-background-surface-form-element-hover: var(
                    --base-color-background-surface-form-element-enabled
                );
            }
            :host(:not([bare])) slot[name='after']::slotted(*) {
                --base-border-radius-selectable-default: 0 0.3rem 0.3rem 0;
            }
            :host(:not([bare])) slot[name='before']::slotted(*) {
                --base-border-radius-selectable-default: 0.3rem 0 0 0.3rem;
            }
        `,
    ];
}

const define = (tag: string, cls: CustomElementConstructor): void => {
    if (!customElements.get(tag)) customElements.define(tag, cls);
};

define('flux-avatar', FluxAvatar);
define('flux-banner-message', FluxBannerMessage);
define('flux-inline-message', FluxInlineMessage);
define('flux-grid', FluxGrid);
define('flux-grid-item', FluxGridItem);
define('flux-markdown', FluxMarkdown);
define('flux-input-group', FluxInputGroup);
