import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlPopoverActionListFluxStyles } from './vl-popover-action-list.flux-css';

@customElement('vl-popover-action-list')
export class VlPopoverActionListComponent extends BaseLitElement {
    /** Verhindert dat de bijhorende popover sluit na het klikken op een actie. */
    keepOpen = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, vlPopoverActionListFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            keepOpen: { type: Boolean, attribute: 'keep-open' },
        };
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('click', this.handleClick);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleClick);
    }

    protected render(): TemplateResult {
        return html` <slot></slot> `;
    }

    protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        this.setAttribute('role', 'menu');
    }

    private handleClick = (e: MouseEvent): void => {
        if (this.keepOpen) return;
        const isAction = e.composedPath().some(
            (el) => el instanceof Element && el.tagName.toLowerCase() === 'vl-popover-action'
        );
        if (!isAction) return;
        const popover = this.closest('vl-popover') as (HTMLElement & { hide: () => void }) | null;
        popover?.hide();
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action-list': VlPopoverActionListComponent;
    }
}
