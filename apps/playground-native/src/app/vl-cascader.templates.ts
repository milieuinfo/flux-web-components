import { registerWebComponents } from '@domg-wc/common-utilities';
import { TemplateFn, VlIconComponent } from '@domg-wc/components';
import { nothing } from 'lit';
import { html } from 'lit-html';

registerWebComponents([VlIconComponent]);

export const cascaderItemTemplates = new Map<string, TemplateFn>([
    [
        'provincie',
        (item, processNarrowDown) => {
            const hasChildren = item.children || item.narrowDown;
            return html`
                <div class="vl-cascader-item">
                    <h3>${item.label}</h3>
                    <vl-link bold class="vl-cascader-link space-between" @click=${() => processNarrowDown(item)}>
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
