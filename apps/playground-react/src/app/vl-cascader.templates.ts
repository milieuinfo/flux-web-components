import { registerWebComponents } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components';
import { html } from 'lit-html';
import { nothing } from 'lit';
import { TemplateFn } from '@domg-wc/components';

registerWebComponents([VlIconComponent]);

export const cascaderItemTemplates = new Map<string, TemplateFn>([
    [
        'provincie',
        (item, processNarrowDown) => {
            const hasChildren = item.children || item.narrowDown;
            return html`
                <div class="vl-cascader-item">
                    <h3>${item.label}</h3>
                    <vl-link
                        bold
                        button-as-link
                        class="vl-cascader-link space-between"
                        @click=${() => processNarrowDown(item)}
                    >
                        <span>
                            ${item.children
                                ? 'Bekijk deelgemeentes '
                                : item.narrowDown
                                ? 'Haal deelgemeentes op'
                                : 'Actie'}
                            ${item.children?.length
                                ? html` <vl-annotation>( ${item.children.length} )</vl-annotation> `
                                : nothing}
                        </span>
                        ${hasChildren ? html` <vl-icon icon="arrow-right-fat"></vl-icon> ` : ''}
                    </vl-link>
                </div>
            `;
        },
    ],
]);
