// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=681-92
// source=libs/components/src/block/cascader/vl-cascader.component.ts
// component=VlCascaderComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - Figma toont één vlak niveau; hiërarchie (geneste items), `level`, `loading`, `loading-message` en de slots `home`
//   en `breadcrumb-placeholder` hebben geen Figma-tegenhanger.
// - `header` toont in Figma een header zonder eigen tekstlaag of property; in code hoort daar `header-text` of het
//   `header`-slot bij. Enkel een slot-hint wordt gezet.
// `breadcrumb` (aan/uit) is in code het omgekeerde attribuut `hide-breadcrumb`.
const showBreadcrumb = instance.getBoolean('breadcrumb');
const showHeader = instance.getBoolean('header');

// De items zijn geneste vl-cascader-item-instances zonder slot-property. Label en annotatie komen uit de metadata van
// het vl-cascader-item-template.
const items = instance
    .findConnectedInstances((node) => node.codeConnectId() === 'vl-cascader-item')
    .map((node) => {
        const props = node.executeTemplate().metadata?.props ?? {};
        const annotation = props.annotation ? ` annotation="${props.annotation}"` : '';
        return `<vl-cascader-item label="${props.label ?? ''}"${annotation}></vl-cascader-item>`;
    })
    .join('');

export default {
    example: figma.code`<vl-cascader${showBreadcrumb ? '' : ' hide-breadcrumb'}>${
        showHeader ? '<span slot="header"></span>' : ''
    }${items}</vl-cascader>`,
    id: 'vl-cascader',
    metadata: { nestable: true },
};
