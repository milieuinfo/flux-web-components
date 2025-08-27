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
        this.setAttribute('role', 'listbox');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action-list': VlPopoverActionListComponent;
    }
}
