// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=681-42
// source=libs/components/src/block/cascader/vl-cascader-item.component.ts
// component=VlCascaderItemComponent
// unmapped: last
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-boolean `arrow` heeft geen attribuut in code: de pijl verschijnt zodra een item kinderen
// heeft (`item.children.length` of `narrowDown`, zie `defaultItemActionTemplate` in
// vl-cascader.utils.ts). Declaratief zijn kinderen geneste vl-cascader-item-elementen, dus
// `arrow=ja` wordt hier een genest item. Het label daarvan zit niet in Figma en blijft leeg.
const arrow = instance.getBoolean('arrow');

// Bewust niet gemapt:
// - `last` (nee/ja): puur visueel (onderrand van het laatste item), geen code-equivalent.
// - `template-type` en de slots `label` en `content` hebben geen Figma-tegenhanger.

// Het label is in Figma een geneste vl-link met tekstlaag "↳ link"; in code is het het `label`-attribuut.
const labelLayer = instance.findText('↳ link', { traverseInstances: true });
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

// De annotatie zit in een geneste vl-text (tekstlaag "vl-text - annotation"), zichtbaar via de boolean `annotation`.
const hasAnnotation = instance.getBoolean('annotation');
let annotation = '';
if (hasAnnotation) {
    const annotationLayer = instance.findText('vl-text - annotation', { traverseInstances: true });
    annotation = annotationLayer && annotationLayer.type === 'TEXT' ? escapeHtml(annotationLayer.textContent) : '';
}

export default {
    example: figma.code`<vl-cascader-item label="${label}"${annotation ? ` annotation="${annotation}"` : ''}>${
        arrow ? '\n    <vl-cascader-item label=""></vl-cascader-item>\n' : ''
    }</vl-cascader-item>`,
    id: 'vl-cascader-item',
    // label en annotation worden doorgegeven aan het vl-cascader-template
    metadata: { nestable: true, props: { label, annotation } },
};
