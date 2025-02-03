import { TemplateFn } from '../vl-cascader.model';
import { html } from 'lit-html';
import { nothing } from 'lit';

export const cascaderItemTemplates = new Map<string, TemplateFn>([
    [
        'provincie',
        (item, processNarrowDown) => {
            const hasChildren = item.children || item.narrowDown;
            const childrenAnnotation = html`Bekijk deelgemeentes
            ${item.children?.length
                ? html` <vl-text-next annotation>( ${item.children.length} )</vl-text-next> `
                : 'Bekijk deelgemeentes '}`;
            return html`
                <div class="vl-cascader-item">
                    <vl-title-next type="h3">${item.label}</vl-title-next>
                    <vl-link-next
                        bold
                        button-as-link
                        icon="${hasChildren ? 'arrow-right-fat' : nothing}"
                        icon-placement="after"
                        class="vl-cascader-link"
                        @click=${() => processNarrowDown(item)}
                    >
                        <span>
                            ${item.children ? childrenAnnotation : item.narrowDown ? 'Haal deelgemeentes op' : 'Actie'}
                        </span>
                    </vl-link-next>
                </div>
            `;
        },
    ],
]);
