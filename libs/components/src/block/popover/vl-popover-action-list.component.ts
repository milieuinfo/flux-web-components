import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlPopoverActionListFluxStyles } from './vl-popover-action-list.flux-css';

@customElement('vl-popover-action-list')
export class VlPopoverActionListComponent extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, vlPopoverActionListFluxStyles];
    }

    protected render(): TemplateResult {
        return html` <slot></slot> `;
    }

    protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        // Een groep, geen ARIA-menu: de acties zijn gewone knoppen en links die je met Tab bereikt. Een groep laat ook
        // een aria-label en een scheidingslijn (<hr>) toe.
        this.setAttribute('role', 'group');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action-list': VlPopoverActionListComponent;
    }
}
