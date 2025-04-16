import { html } from 'lit-html';
import { Meta } from '@storybook/web-components';
import PopoverMenuAccordionDoc from './popover-menu-accordion.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuAccordionComponent } from '@domg-wc/integration/popover/menu-accordion';

registerWebComponents([VlPopoverMenuAccordionComponent]);

export default {
    title: 'Ontwerp/Popover/Menu Accordion',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: PopoverMenuAccordionDoc,
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
} as Meta;

export const MenuAccordion = () => html`<vl-popover-menu-accordion></vl-popover-menu-accordion>`;
