import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-side-sheet';
import '../vl-map-side-sheet-menu';
import '../vl-map-side-sheet-menu-item';
import { mapSideSheetArgs, mapSideSheetArgTypes } from './vl-map-side-sheet.stories-arg';
import mapSideSheetDoc from './vl-map-side-sheet.stories-doc.mdx';

export default {
    id: 'map-side-sheet-side-sheet',
    title: 'map/side-sheet/side-sheet',
    tags: ['autodocs'],
    args: mapSideSheetArgs,
    argTypes: mapSideSheetArgTypes,
    parameters: {
        docs: {
            page: mapSideSheetDoc,
        },
    },
} as Meta<typeof mapSideSheetArgs>;

export const MapSideSheetDefault = story(
    mapSideSheetArgs,
    ({
        right,
        open,
        enableSwipe,
        defaultSlot,
        toggleText,
        tooltipText,
        customIcon,
        iconPlacement,
        hideToggleButton,
    }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray/>
            </vl-map-baselayer-grb-gray>
            <vl-map-side-sheet
                ?data-vl-open=${open}
                ?data-vl-right=${right}
                ?data-vl-enable-swipe=${enableSwipe}
                data-vl-toggle-text=${toggleText}
                data-vl-tooltip-text=${tooltipText}
                data-vl-custom-icon=${customIcon}
                data-vl-icon-placement=${iconPlacement}
                ?data-vl-hide-toggle-button=${hideToggleButton}
            >
                ${unsafeHTML(defaultSlot)}
            </vl-map-side-sheet>
        </vl-map>
    `
);
MapSideSheetDefault.storyName = 'vl-map-side-sheet - default';
MapSideSheetDefault.args = {
    defaultSlot: '<div>Plaats hier je zijpaneel content.</div>',
};

export const MapSideSheetDual = story(
    mapSideSheetArgs,
    ({ enableSwipe, defaultSlot, open }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-side-sheet>${unsafeHTML(defaultSlot)}</vl-map-side-sheet>
            <vl-map-side-sheet data-vl-right ?data-vl-open=${open} ?data-vl-enable-swipe=${enableSwipe}
                >${unsafeHTML(defaultSlot)}
            </vl-map-side-sheet>
        </vl-map>
    `
);
MapSideSheetDual.storyName = 'vl-map-side-sheet - dual';
MapSideSheetDual.args = {
    defaultSlot: '<div>Plaats hier je zijpaneel content.</div>',
};
