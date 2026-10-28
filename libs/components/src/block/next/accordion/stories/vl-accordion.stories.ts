import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlPopoverComponent } from '../../../popover';
import { VlAccordionComponent } from '../vl-accordion.component';
import { accordionArgs, accordionArgTypes } from './vl-accordion.stories-arg';
import accordionDoc from './vl-accordion.stories-doc.mdx';

registerWebComponents([VlAccordionComponent, VlPopoverComponent, VlLinkComponent, VlButtonComponent]);

export default {
    id: 'components-block-next-accordion',
    title: 'Components - Block/next/accordion',
    tags: ['autodocs'],
    args: accordionArgs,
    argTypes: accordionArgTypes,
    parameters: {
        docs: {
            page: accordionDoc,
        },
    },
} as Meta<typeof accordionArgs>;

const content =
    '<span slot="content">Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>';

const Template = story(
    accordionArgs,
    ({
        open,
        toggleText,
        openToggleText,
        closeToggleText,
        contentPadding,
        headingLevel,
        icon,
        altBackground,
        bold,
        disabled,
        triggerSlot,
        subtitleSlot,
        actionsSlot,
        contentSlot,
        onVlToggle,
        onVlOpen,
        onVlClose,
    }) => html`
        <vl-accordion-next
            ?open=${open}
            toggle-text=${toggleText}
            open-toggle-text=${openToggleText}
            close-toggle-text=${closeToggleText}
            content-padding=${contentPadding}
            heading-level=${headingLevel}
            icon=${icon}
            ?alt-background=${altBackground}
            ?bold=${bold}
            ?disabled=${disabled}
            @vl-toggle=${(event: CustomEvent) => onVlToggle(event.detail)}
            @vl-open=${onVlOpen}
            @vl-close=${onVlClose}
        >
            ${unsafeHTML(triggerSlot)}${unsafeHTML(subtitleSlot)}${unsafeHTML(actionsSlot)}${unsafeHTML(contentSlot)}
        </vl-accordion-next>
    `,
);

export const AccordionDefault = Template.bind({});
AccordionDefault.storyName = 'vl-accordion-next - default';
AccordionDefault.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    contentSlot: content,
};

export const AccordionHeading = Template.bind({});
AccordionHeading.storyName = 'vl-accordion-next - heading';
AccordionHeading.args = {
    toggleText: 'Dit is een heading van ingevouwen inhoud',
    headingLevel: '3',
    contentSlot: content,
};

export const AccordionDynamicToggle = Template.bind({});
AccordionDynamicToggle.storyName = 'vl-accordion-next - dynamic toggle';
AccordionDynamicToggle.args = {
    openToggleText: 'Open de onderwijsdoelstelling',
    closeToggleText: 'Sluit de onderwijsdoelstelling',
    contentSlot: content,
};

export const AccordionIcon = Template.bind({});
AccordionIcon.storyName = 'vl-accordion-next - icon';
AccordionIcon.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    icon: 'university',
    contentSlot: content,
};

export const AccordionTriggerSlot = Template.bind({});
AccordionTriggerSlot.storyName = 'vl-accordion-next - trigger slot';
AccordionTriggerSlot.args = {
    triggerSlot: '<span slot="trigger">Lees meer over de onderwijsdoelstelling</span>',
    contentSlot: content,
};

export const AccordionSubtitleSlot = Template.bind({});
AccordionSubtitleSlot.storyName = 'vl-accordion-next - subtitle slot';
AccordionSubtitleSlot.args = {
    triggerSlot: '<span slot="trigger">Lees meer over de onderwijsdoelstelling</span>',
    subtitleSlot: '<span slot="subtitle">Lorem ipsum</span>',
    contentSlot: content,
};

export const AccordionActionsSlot = Template.bind({});
AccordionActionsSlot.storyName = 'vl-accordion-next - actions slot';
AccordionActionsSlot.args = {
    triggerSlot: '<span slot="trigger">Lees meer over de onderwijsdoelstelling</span>',
    subtitleSlot: '<span slot="subtitle">Lorem ipsum</span>',
    actionsSlot: `<span slot="actions">
                 <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="onderwijs-menu"></vl-button>
                 <vl-popover for="btn-acties" placement="bottom-end">
                   <vl-popover-action-list>
                     <vl-popover-action icon="search">Zoeken</vl-popover-action>
                     <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                     <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
                   </vl-popover-action-list>
                 </vl-popover>
               </span>`,
    contentSlot: content,
};

export const AccordionAltBackground = Template.bind({});
AccordionAltBackground.storyName = 'vl-accordion-next - alt background';
AccordionAltBackground.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    altBackground: true,
    contentSlot: content,
};

export const AccordionDisabled = Template.bind({});
AccordionDisabled.storyName = 'vl-accordion-next - disabled';
AccordionDisabled.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    disabled: true,
    contentSlot: content,
};

export const AccordionBold = Template.bind({});
AccordionBold.storyName = 'vl-accordion-next - bold';
AccordionBold.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    bold: true,
    contentSlot: content,
};
