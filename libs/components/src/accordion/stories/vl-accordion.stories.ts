import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { VlLinkComponent } from '../../link';
import { VlPopoverComponent } from '../../popover';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-accordion.component';
import { accordionArgs, accordionArgTypes } from './vl-accordion.stories-arg';
import accordionDoc from './vl-accordion.stories-doc.mdx';

registerWebComponents([VlPopoverComponent, VlLinkComponent]);

export default {
    id: 'components-accordion',
    title: 'Components/accordion',
    tags: ['autodocs'],
    args: accordionArgs,
    argTypes: accordionArgTypes,
    parameters: {
        docs: {
            page: accordionDoc,
        },
    },
} as Meta<typeof accordionArgs>;

const Template = story(
    accordionArgs,
    ({
        bold,
        closeToggleText,
        contentPadding,
        disabled,
        defaultOpen,
        icon,
        openToggleText,
        toggleText,
        defaultSlot,
        titleSlot,
        subtitleSlot,
        menuSlot,
        onToggle,
    }) => html`
        <vl-accordion
            ?bold=${bold}
            content-padding=${contentPadding}
            close-toggle-text=${closeToggleText}
            icon=${icon}
            ?disabled=${disabled}
            ?default-open=${defaultOpen}
            open-toggle-text=${openToggleText}
            toggle-text=${toggleText}
            @vl-on-toggle=${(event: CustomEvent) => onToggle(event.detail)}
        >
            ${unsafeHTML(defaultSlot)}${unsafeHTML(titleSlot)}${unsafeHTML(subtitleSlot)}${unsafeHTML(menuSlot)}
        </vl-accordion>
    `
);

export const AccordionDefault = Template.bind({});
AccordionDefault.storyName = 'vl-accordion - default';
AccordionDefault.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
};

export const AccordionDynamicToggle = Template.bind({});
AccordionDynamicToggle.storyName = 'vl-accordion - dynamic toggle';
AccordionDynamicToggle.args = {
    closeToggleText: 'Sluit de onderwijsdoelstelling',
    openToggleText: 'Open de onderwijsdoelstelling',
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
};

export const AccordionIcon = Template.bind({});
AccordionIcon.storyName = 'vl-accordion - icon';
AccordionIcon.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    icon: 'university',
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
};

export const AccordionTitleSlot = Template.bind({});
AccordionTitleSlot.storyName = 'vl-accordion - title slot';
AccordionTitleSlot.args = {
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
    titleSlot: '<span slot="title">Lees meer over de onderwijsdoelstelling</span>',
};

export const AccordionSubtitleSlot = Template.bind({});
AccordionSubtitleSlot.storyName = 'vl-accordion - subtitle slot';
AccordionSubtitleSlot.args = {
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
    titleSlot: '<span slot="title">Lees meer over de onderwijsdoelstelling</span>',
    subtitleSlot: '<vl-annotation slot="subtitle">Lorem ipsum</vl-annotation>',
};

export const AccordionImageSubtitleSlot = Template.bind({});
AccordionImageSubtitleSlot.storyName = 'vl-accordion - subtitle slot';
AccordionImageSubtitleSlot.args = {
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
    titleSlot: '<span slot="title">Lees meer over de onderwijsdoelstelling</span>',
    subtitleSlot: '<img style="width: 50px" src="cat.jpeg" slot="subtitle"/>',
};

export const AccordionMenuSlot = Template.bind({});
AccordionMenuSlot.storyName = 'vl-accordion - menu slot';
AccordionMenuSlot.args = {
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
    titleSlot: '<span slot="title">Lees meer over de onderwijsdoelstelling</span>',
    subtitleSlot: '<vl-annotation slot="subtitle">Lorem ipsum</vl-annotation>',
    menuSlot: `<span slot="menu">
                 <vl-link button-as-link icon="menu" id="btn-acties"></vl-link>
                 <vl-popover for="btn-acties" placement="bottom-end">
                   <vl-popover-action-list>
                     <vl-popover-action icon="search">Zoeken</vl-popover-action>
                     <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                     <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
                   </vl-popover-action-list>
                 </vl-popover>
               </span>`,
};
