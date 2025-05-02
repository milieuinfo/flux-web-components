import { vlGroupStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { BaseLitElement, findNodesForSlot } from '@domg-wc/common';
import { customElement } from 'lit/decorators.js';
import { resetStyle } from '@domg/govflanders-style/common';
import cascaderItemUigStyle from './vl-cascader-item.uig-css';
import { CASCADER_MESSAGES, CASCADER_SLOTS, CascaderItem } from './vl-cascader.model';
import { defaultItemActionTemplate, getDefaultItemTemplate, getTemplateFunctionForType } from './vl-cascader.utils';
import { VlCascaderComponent } from './vl-cascader.component';

@customElement('vl-cascader-item')
export class VlCascaderItemComponent extends BaseLitElement {
    item: CascaderItem = { label: CASCADER_MESSAGES.LABEL_MISSING };
    label = CASCADER_MESSAGES.LABEL_MISSING;
    templateType: string | undefined;
    cascaderRef: VlCascaderComponent | undefined;
    annotation: string | undefined;

    static get properties(): PropertyDeclarations {
        return {
            label: { type: String },
            templateType: { type: String, attribute: 'template-type' },
            item: { type: Object },
            annotation: { type: String },
        };
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlGroupStyles, cascaderItemUigStyle];
    }

    connectedCallback() {
        super.connectedCallback();
        this.updateItemData();
    }

    private updateItemData(): void {
        if (this.label != null) {
            this.item.label = this.label;
            this.item.templateType = this.templateType;
        }
        this.item.annotation = this.annotation;
    }

    protected render(): TemplateResult {
        const cascaderRef = this.cascaderRef;
        const hasLabelSlot = Boolean(findNodesForSlot(this, CASCADER_SLOTS.LABEL)?.length);
        const { templateType } = this.item;
        let templateResultForNode;
        if (templateType && cascaderRef) {
            templateResultForNode = getTemplateFunctionForType(this.item, cascaderRef);
        } else if (cascaderRef) {
            templateResultForNode = getDefaultItemTemplate(this.item, cascaderRef, hasLabelSlot);
        }
        return cascaderRef && templateResultForNode
            ? html`${templateResultForNode} ${html`<slot name="content"></<slot>`}`
            : html`
                  ${!hasLabelSlot ? defaultItemActionTemplate(this.item) : html`<slot name="label"></slot>`}
                  <slot name="content"></slot>
              `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cascader-item': VlCascaderItemComponent;
    }
}
