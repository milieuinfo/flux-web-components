import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuInfoTileComponent } from '@domg-wc/integrations/popover';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlPopoverMenuInfoTileComponent]);

export default {
    title: 'Patronen/Navigatie/Popover/info tile met menu',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 250,
            },
        },
    },
} as Meta;

export const PopoverInfoTileMetMenu = () => html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`;
PopoverInfoTileMetMenu.storyName = 'popover - info tile met menu';
