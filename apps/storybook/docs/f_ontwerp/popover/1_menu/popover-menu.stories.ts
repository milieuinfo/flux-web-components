import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { VlPopoverMenuComponent } from '@domg-wc/integrations/popover';

registerWebComponents([VlPopoverMenuComponent]);

export default {
    title: 'Ontwerp/Popover/Menu',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 250,
            },
        },
    },
} as Meta;

export const Menu = () => html`<vl-popover-menu></vl-popover-menu>`;
