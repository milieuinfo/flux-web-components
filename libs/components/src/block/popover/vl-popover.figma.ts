// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=513-188
// source=libs/components/src/block/popover/vl-popover.component.ts
// component=VlPopoverComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// `bottom-center` komt overeen met het code-default `bottom` en wordt niet uitgeschreven.
const placement = instance.getEnum('Placement', {
    'bottom-start': 'bottom-start',
    'bottom-center': '',
    'bottom-end': 'bottom-end',
    'top-center': 'top',
    'top-start': 'top-start',
    'top-end': 'top-end',
});

// De Figma-boolean `arrow` toont de pijl; in code is dat het omgekeerde attribuut `hide-arrow`.
const arrow = instance.getBoolean('arrow');

// Het verplichte `for`-attribuut (id van het trigger-element) zit niet in Figma en moet door de developer ingevuld worden.
// `open`, `trigger`, `distance`, `strategy` en `max-height` zitten niet in Figma.
const content = instance.getSlot('content');

// `content-padding` staat in Figma op de geneste vl-popover-action-list, in code op de vl-popover zelf.
// Het action-list-template geeft de value door via metadata.props; `medium` is de code-default.
let contentPadding = '';
const actionList = instance.findConnectedInstance('vl-popover-action-list', { traverseInstances: true });
if (actionList && actionList.type === 'INSTANCE') {
    const props = actionList.executeTemplate().metadata;
    const value = props && props.props ? props.props.contentPadding : undefined;
    if (typeof value === 'string' && value && value !== 'medium') {
        contentPadding = value;
    }
}

export default {
    example: figma.code`<vl-popover${placement ? ` placement="${placement}"` : ''}${
        contentPadding ? ` content-padding="${contentPadding}"` : ''
    }${arrow ? '' : ' hide-arrow'}>${content}</vl-popover>`,
    id: 'vl-popover',
    metadata: { nestable: true },
};
