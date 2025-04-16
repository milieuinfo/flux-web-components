import { registerWebComponents } from '@domg-wc/common';
import { VlIconComponent } from '../icon';
import { VlLinkComponent } from '../link';
import { VlTextComponent } from '../text';
import { CascaderItem, VlCascaderComponent } from './index';
import { html, TemplateResult, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

registerWebComponents([VlLinkComponent, VlIconComponent, VlTextComponent]);
export const getTemplateFunctionForType = (
    item: CascaderItem,
    cascader: VlCascaderComponent
): TemplateResult | void => {
    const { templateType } = item;
    if (!cascader) {
        return;
    }
    const { templates } = cascader;
    if (templateType && templates && templates instanceof Map) {
        const getCustomTemplateResult = templates.get(templateType);
        return getCustomTemplateResult && getCustomTemplateResult(item, cascader.processNarrowDown);
    }
};

export const getDefaultItemTemplate = (
    item: CascaderItem,
    cascader: VlCascaderComponent,
    hasLabelSlot = false
): TemplateResult => {
    const itemClasses = {
        'vl-cascader-item': !cascader.isDeclarativeMode(),
    };
    return html`
        <div
            class=${classMap(itemClasses)}
            @click=${(event: Event) => {
                cascader?.processNarrowDown(item);
            }}
        >
            ${!hasLabelSlot ? defaultItemActionTemplate(item) : html`<slot name="label">${item.label}</slot>`}
        </div>
    `;
};

export const defaultItemActionTemplate = (item: CascaderItem): TemplateResult => {
    const hasChildren = (item.children && item.children.length) || item.narrowDown;
    return html`
        <vl-link
            bold
            button-as-link
            icon="${hasChildren ? 'arrow-right-fat' : nothing}"
            icon-placement="after"
            class="vl-cascader-link"
            >${item.label}
        </vl-link>
        ${item.annotation ? html`<vl-text annotation>${item.annotation}</vl-text>` : nothing}
    `;
};
