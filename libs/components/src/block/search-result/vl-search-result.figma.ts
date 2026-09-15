// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=841-2
// source=libs/components/src/block/search-result/vl-search-result.component.ts
// component=VlSearchResultComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-component heeft geen properties; de inhoud zit in drie tekstlagen die overeenkomen met de
// sub-componenten vl-search-result-title, vl-search-result-text en vl-search-result-properties (vl-property).
// Het ontwerp bevat één "property"-tekstlaag; de bijhorende vl-property-data heeft geen tekstlaag.
const titleLayer = instance.findText('vl-search-result-title');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

const textLayer = instance.findText('vl-search-result-text');
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

const propertyLayer = instance.findText('property');
const property = propertyLayer && propertyLayer.type === 'TEXT' ? escapeHtml(propertyLayer.textContent) : '';

export default {
    example: figma.code`<vl-search-result>
    <vl-search-result-title><a href="#">${title}</a></vl-search-result-title>
    <vl-search-result-text>${text}</vl-search-result-text>
    <vl-search-result-properties>
        <vl-property>${property}</vl-property>
        <vl-property-data>...</vl-property-data>
    </vl-search-result-properties>
</vl-search-result>`,
    id: 'vl-search-result',
    metadata: { nestable: true },
};
