import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { VlBreadcrumbItemComponent } from '../../breadcrumb/vl-breadcrumb-item.component';
import { VlBreadcrumbComponent } from '../../breadcrumb/vl-breadcrumb.component';
import { VlSearchComponent } from '../../search';
import { VlTabsComponent } from '../../tabs';
import { VlFunctionalHeaderComponent } from '../vl-functional-header.component';
import { functionalHeaderArgs, functionalHeaderArgTypes } from './vl-functional-header.stories-arg';
import functionalHeaderDoc from './vl-functional-header.stories-doc.mdx';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlTabsComponent,
    VlSearchComponent,
]);

export default {
    id: 'components-block-functional-header',
    title: 'Components - Block/functional-header',
    tags: ['autodocs'],
    args: functionalHeaderArgs,
    argTypes: functionalHeaderArgTypes,
    parameters: {
        docs: {
            page: functionalHeaderDoc,
        },
    },
} as Meta<typeof functionalHeaderArgs>;

const Template = story(
    functionalHeaderArgs,
    ({
        back,
        backLink,
        disableBackLink,
        fullWidth,
        hideBackLink,
        hideSubHeader,
        link,
        marginBottom,
        subTitle,
        title,
        actionsSlot,
        backSlot,
        backLinkSlot,
        subHeaderSlot,
        subTitleSlot,
        titleSlot,
        topLeftSlot,
        topRightSlot,
        onClickBack,
    }) => html`
        <vl-functional-header
            back=${back}
            back-link=${backLink}
            ?disable-back-link=${disableBackLink}
            ?full-width=${fullWidth}
            ?hide-back-link=${hideBackLink}
            ?hide-sub-header=${hideSubHeader}
            link=${link}
            margin-bottom=${marginBottom}
            sub-title=${subTitle}
            title=${title}
            @vl-click-back=${onClickBack}
        >
            ${unsafeHTML(actionsSlot)}${unsafeHTML(backSlot)}${unsafeHTML(backLinkSlot)}${unsafeHTML(subHeaderSlot)}
            ${unsafeHTML(subTitleSlot)}${unsafeHTML(titleSlot)}${unsafeHTML(topLeftSlot)}${unsafeHTML(topRightSlot)}
        </vl-functional-header>
    `
);

const subTitleString = 'Voor lager, middelbaar en hoger onderwijs';
const titleString = 'School- en studietoelagen';
const backString = 'Terug';
const actionsSlotString = `<div slot="actions">
        <a href="#">Actie 1</a>
        <a href="#">Actie 2</a>
    </div>`;
const backSlotString = `<span slot="back">${backString}</span>`;
const backLinkSlotString = `<a slot="back-link" href="#">${backString}</a>`;
const subHeaderSlotString = '<span slot="sub-header">Sub header content</span>';
const subTitleSlotString = `<span slot="sub-title">${subTitleString}</span>`;
const titleSlotString = `<span slot="title">${titleString}</span>`;
const topLeftSlotString = '<span slot="top-left">Linkerbovenhoek content</span>';
const topRightSlotString = '<span slot="top-right">Rechterbovenhoek content</span>';

export const FunctionalHeaderDefault = Template.bind({});
FunctionalHeaderDefault.storyName = 'vl-functional-header - default';
FunctionalHeaderDefault.args = {
    subTitle: subTitleString,
    title: titleString,
};

export const FunctionalHeaderActions = Template.bind({});
FunctionalHeaderActions.storyName = 'vl-functional-header - actions';
FunctionalHeaderActions.args = {
    subTitle: subTitleString,
    title: titleString,
    actionsSlot: actionsSlotString,
};

export const FunctionalHeaderSlots = Template.bind({});
FunctionalHeaderSlots.storyName = 'vl-functional-header - slots';
FunctionalHeaderSlots.args = {
    backSlot: backSlotString,
    backLinkSlot: backLinkSlotString,
    subHeaderSlot: subHeaderSlotString,
    subTitleSlot: subTitleSlotString,
    titleSlot: titleSlotString,
    topLeftSlot: topLeftSlotString,
    topRightSlot: topRightSlotString,
};

export const FunctionalHeaderTabs = story(
    functionalHeaderArgs,
    ({ fullWidth, marginBottom, title, link }) => html`
        <vl-functional-header ?full-width=${fullWidth} link=${link} margin-bottom=${marginBottom} title=${title}>
            <vl-tabs
                slot="sub-header"
                disable-links
                within-functional-header
                active-tab="trein"
                @change=${(event: CustomEvent) => action('change')(event.detail)}
            >
                <vl-tabs-pane id="trein" title="Trein"></vl-tabs-pane>
                <vl-tabs-pane id="metro" title="Metro, tram en bus"></vl-tabs-pane>
                <vl-tabs-pane id="fiets" title="Fiets"></vl-tabs-pane>
            </vl-tabs>
        </vl-functional-header>
    `
);
FunctionalHeaderTabs.storyName = 'vl-functional-header - tabs';
FunctionalHeaderTabs.args = {
    title: titleString,
};

export const FunctionalHeaderBreadcrumb = story(
    functionalHeaderArgs,
    ({ fullWidth, marginBottom, title, link }) => html`
        <vl-functional-header
            ?full-width=${fullWidth}
            link=${link}
            margin-bottom=${marginBottom}
            title=${title}
            hide-back-link
        >
            <vl-breadcrumb slot="sub-title">
                <vl-breadcrumb-item href=${'1'}>Vlaanderen Intern</vl-breadcrumb-item>
                <vl-breadcrumb-item href=${'2'}>Regelgeving</vl-breadcrumb-item>
                <vl-breadcrumb-item href=${'3'}>Webuniversum</vl-breadcrumb-item>
                <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
            </vl-breadcrumb>
        </vl-functional-header>
    `
);
FunctionalHeaderBreadcrumb.storyName = 'vl-functional-header - breadcrumb';
FunctionalHeaderBreadcrumb.args = {
    title: titleString,
};

export const FunctionalHeaderFullWidth = story(
    functionalHeaderArgs,
    ({ fullWidth, marginBottom, title, link }) => html`
        <vl-functional-header ?full-width=${fullWidth} link=${link} margin-bottom=${marginBottom} title=${title}>
            <span slot="sub-title">Full width</span>
        </vl-functional-header>
    `
);
FunctionalHeaderFullWidth.storyName = 'vl-functional-header - full width';
FunctionalHeaderFullWidth.args = {
    title: titleString,
    fullWidth: true,
};

export const FunctionalHeaderDisableBackLink = Template.bind({});
FunctionalHeaderDisableBackLink.storyName = 'vl-functional-header - disable back link';
FunctionalHeaderDisableBackLink.args = {
    title: titleString,
    subTitleSlot: subTitleSlotString,
    back: backString,
    disableBackLink: true,
    onClickBack: (event: CustomEvent) => {
        event.preventDefault();
        action('vl-click-back')(event);
    },
};

export const FunctionalHeaderHideBackLink = Template.bind({});
FunctionalHeaderHideBackLink.storyName = 'vl-functional-header - hide back link';
FunctionalHeaderHideBackLink.args = {
    title: titleString,
    subTitleSlot: subTitleSlotString,
    hideBackLink: true,
};

export const FunctionalHeaderHideSubHeader = Template.bind({});
FunctionalHeaderHideSubHeader.storyName = 'vl-functional-header - hide sub header';
FunctionalHeaderHideSubHeader.args = {
    title: titleString,
    hideSubHeader: true,
};
