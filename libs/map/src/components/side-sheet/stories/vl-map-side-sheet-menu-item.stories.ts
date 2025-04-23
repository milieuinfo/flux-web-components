import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-side-sheet';
import '../vl-map-side-sheet-menu';
import '../vl-map-side-sheet-menu-item';
import { mapSideSheetMenuItemArgs, mapSideSheetMenuItemArgTypes } from './vl-map-side-sheet-menu-item.stories-arg';

export default {
    id: 'map-side-sheet-side-sheet-menu-item',
    title: 'map/side-sheet/side-sheet-menu-item',
    tags: ['autodocs'],
    args: mapSideSheetMenuItemArgs,
    argTypes: mapSideSheetMenuItemArgTypes,
} as Meta<typeof mapSideSheetMenuItemArgs>;

export const MapSideSheetMenuItemDefault = story(
    mapSideSheetMenuItemArgs,
    ({ title, href, defaultSlot }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-side-sheet>
                <vl-map-side-sheet-menu>
                    <vl-map-side-sheet-menu-item title=${title} href=${href}>
                        ${unsafeHTML(defaultSlot)}
                    </vl-map-side-sheet-menu-item>
                </vl-map-side-sheet-menu>
            </vl-map-side-sheet>
        </vl-map>
    `
);
MapSideSheetMenuItemDefault.storyName = 'vl-map-side-sheet-menu-item default';
MapSideSheetMenuItemDefault.args = {
    defaultSlot: '<div>Plaats hier je zijpaneel content.</div>',
};
