import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlLinkComponent } from '../../../atom/link';
import { VlPopoverComponent } from '../../popover';
import '../vl-accordion.component';
import { accordionArgs, accordionArgTypes } from './vl-accordion.stories-arg';
import accordionDoc from './vl-accordion.stories-doc.mdx';

registerWebComponents([VlPopoverComponent, VlLinkComponent]);

export default {
    id: 'components-block-accordion',
    title: 'Components - Block/accordion',
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
        altBackground,
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
        headingLevel,
        onToggle,
    }) => html`
        <vl-accordion
            ?alt-background=${altBackground}
            ?bold=${bold}
            content-padding=${contentPadding}
            close-toggle-text=${closeToggleText}
            icon=${icon}
            ?disabled=${disabled}
            ?default-open=${defaultOpen}
            open-toggle-text=${openToggleText}
            toggle-text=${toggleText}
            heading-level=${headingLevel}
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

export const AccordionHeading = Template.bind({});
AccordionHeading.storyName = 'vl-accordion - heading';
AccordionHeading.args = {
    toggleText: 'Dit is een heading van ingevouwen inhoud',
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
    headingLevel: '3',
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
                 <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="onderwijs-menu"></vl-button>
                 <vl-popover for="btn-acties" placement="bottom-end">
                   <vl-popover-action-list>
                     <vl-popover-action icon="search">Zoeken</vl-popover-action>
                     <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                     <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
                   </vl-popover-action-list>
                 </vl-popover>
               </span>`,
};

export const AccordionAltBackground = Template.bind({});
AccordionAltBackground.storyName = 'vl-accordion - alt background';
AccordionAltBackground.args = {
    toggleText: 'Lees meer over de onderwijsdoelstelling',
    altBackground: true,
    defaultSlot:
        '<span>Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het belang van wetenschappelijk onderzoek.</span>',
};
