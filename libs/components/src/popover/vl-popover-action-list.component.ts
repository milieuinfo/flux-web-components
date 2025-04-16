import { CSSResult, TemplateResult, html } from 'lit';
import { BaseLitElement } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { customElement } from 'lit/decorators.js';
import popoverActionListUigStyle from './vl-popover-action-list.uig-css';

@customElement('vl-popover-action-list')
export class VlPopoverActionListComponent extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, popoverActionListUigStyle];
    }

    protected render(): TemplateResult {
        return html` <slot></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action-list': VlPopoverActionListComponent;
    }
}
