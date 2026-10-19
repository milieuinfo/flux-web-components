// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=955-2
// source=libs/map/src/vl-map.ts
// component=VlMap
// code-only vl-map: allow-fullscreen, allow-invalid-geometry, auto-shift-controls, disable-escape-key, disable-keyboard
// code-only vl-map: disable-mouse-wheel-zoom, disable-rotation, full-height, lambert2008, scale-position
// code-only vl-map-baselayer-grb-gray: background-layer, background-options, background-type, layer, type, url
// code-only vl-map-legend: bottom, hide-title, layout-vertical, left, right, top, version
// code-only vl-map-search: placeholder, search-empty-text, search-no-results-text, search-placeholder, with-offset
import figma from 'figma';
import { booleanProperty } from '../../../resources/code-connect/boolean-property';

const instance = figma.selectedInstance;

// De Figma-booleans zijn geen attributen van vl-map maar komen overeen met kind-componenten:
// `layer-switcher` → vl-map-layer-switcher, `search` → vl-map-search, `legend` → vl-map-legend,
// `tools` → vl-map-action-controls (de knoppen zelf worden afgeleid uit de vl-map-*-action-kinderen
// met een vl-map-action-control per actie).
// `zoom` heeft geen code-equivalent: de zoomknoppen worden altijd toegevoegd.
// De baselayer (vl-map-baselayer-grb-gray) zit niet in Figma maar is nodig om een kaart te tonen.
// De boolean `border` toont de rand van de kaart; uit is `no-border`. Een oudere library had geen rand, maar dat was een
// gap in Figma en geen ontwerpkeuze: de terugval volgt de code.
const border = booleanProperty(instance, 'border', true);
// De boolean `scale` toont de schaallijn in de infobalk; uit is `hide-scale`. Een oudere library toonde ze altijd.
const scale = booleanProperty(instance, 'scale', true);
// De andere attributen van vl-map zelf (`full-height`, `lambert2008`, `allow-fullscreen`,
// `disable-*`, `allow-invalid-geometry`) bestaan enkel in code.
const layerSwitcher = booleanProperty(instance, 'layer-switcher', false);
const tools = booleanProperty(instance, 'tools', false);
const search = booleanProperty(instance, 'search', false);
const legend = booleanProperty(instance, 'legend', false);

export default {
    example: figma.code`<vl-map${border ? '' : ' no-border'}${scale ? '' : ' hide-scale'}>
    <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>${
        search ? '\n    <vl-map-search></vl-map-search>' : ''
    }${layerSwitcher ? '\n    <vl-map-layer-switcher></vl-map-layer-switcher>' : ''}${
        tools ? '\n    <vl-map-action-controls></vl-map-action-controls>' : ''
    }${legend ? '\n    <vl-map-legend placement="bottom_right"></vl-map-legend>' : ''}
</vl-map>`,
    id: 'vl-map',
    metadata: { nestable: false },
};
