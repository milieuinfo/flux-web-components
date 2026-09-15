// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=955-2
// source=libs/map/src/vl-map.ts
// component=VlMap
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-booleans zijn geen attributen van vl-map maar komen overeen met kind-componenten:
// `layer-switcher` → vl-map-layer-switcher, `search` → vl-map-search, `legend` → vl-map-legend,
// `tools` → vl-map-action-controls (de knoppen zelf worden afgeleid uit de vl-map-*-action-kinderen
// met een vl-map-action-control per actie).
// `zoom` heeft geen code-equivalent: de zoomknoppen worden altijd toegevoegd.
// De baselayer (vl-map-baselayer-grb-gray) zit niet in Figma maar is nodig om een kaart te tonen.
// De attributen van vl-map zelf (`full-height`, `no-border`, `lambert2008`, `allow-fullscreen`,
// `disable-*`, `allow-invalid-geometry`) bestaan enkel in code.
const layerSwitcher = instance.getBoolean('layer-switcher');
const tools = instance.getBoolean('tools');
const search = instance.getBoolean('search');
const legend = instance.getBoolean('legend');

export default {
    example: figma.code`<vl-map>
    <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>${
        search ? '\n    <vl-map-search></vl-map-search>' : ''
    }${layerSwitcher ? '\n    <vl-map-layer-switcher></vl-map-layer-switcher>' : ''}${
        tools ? '\n    <vl-map-action-controls></vl-map-action-controls>' : ''
    }${legend ? '\n    <vl-map-legend placement="bottom_right"></vl-map-legend>' : ''}
</vl-map>`,
    id: 'vl-map',
    metadata: { nestable: false },
};
