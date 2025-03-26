import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlBreadcrumbItemComponent } from '../../breadcrumb/vl-breadcrumb-item.component';
import { VlBreadcrumbComponent } from '../../breadcrumb/vl-breadcrumb.component';
import { VlSearchComponent } from '../../search';
import { VlTabsComponent } from '../../tabs/vl-tabs.component';
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
    id: 'components-functional-header',
    title: 'Components/functional-header',
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
            data-vl-back=${back}
            data-vl-back-link=${backLink}
            ?data-vl-disable-back-link=${disableBackLink}
            ?data-vl-full-width=${fullWidth}
            ?data-vl-hide-back-link=${hideBackLink}
            ?data-vl-hide-sub-header=${hideSubHeader}
            data-vl-link=${link}
            data-vl-margin-bottom=${marginBottom}
            data-vl-sub-title=${subTitle}
            data-vl-title=${title}
            @vl-click-back=${onClickBack}
        >
            ${unsafeHTML(actionsSlot)}${unsafeHTML(backSlot)}${unsafeHTML(backLinkSlot)}${unsafeHTML(subHeaderSlot)}
            ${unsafeHTML(subTitleSlot)}${unsafeHTML(titleSlot)}${unsafeHTML(topLeftSlot)}${unsafeHTML(topRightSlot)}
        </vl-functional-header>
    `
);

export const FunctionalHeaderDefault = Template.bind({});
FunctionalHeaderDefault.storyName = 'vl-functional-header - default';
FunctionalHeaderDefault.args = {
    subTitle: 'Voor lager, middelbaar en hoger onderwijs',
    title: 'School- en studietoelagen',
};

export const FunctionalHeaderActions = Template.bind({});
FunctionalHeaderActions.storyName = 'vl-functional-header - actions';
FunctionalHeaderActions.args = {
    subTitle: 'Voor lager, middelbaar en hoger onderwijs',
    title: 'School- en studietoelagen',
    actionsSlot: `<div slot="actions">
        <a href="#">Actie 1</a>
        <a href="#">Actie 2</a>
    </div>`,
};

export const FunctionalHeaderSlots = Template.bind({});
FunctionalHeaderSlots.storyName = 'vl-functional-header - slots';
FunctionalHeaderSlots.args = {
    backSlot: '<span slot="back">Terug</span>',
    backLinkSlot: '<a slot="back-link" href="#">Terug</a>',
    subHeaderSlot: '<span slot="sub-header">Sub header content</span>',
    subTitleSlot: '<span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>',
    titleSlot: '<span slot="title">School- en studietoelagen</span>',
    topLeftSlot: '<span slot="top-left">Linkerbovenhoek content</span>',
    topRightSlot: '<span slot="top-right">Rechterbovenhoek content</span>',
};

export const FunctionalHeaderTabs = story(
    functionalHeaderArgs,
    ({ fullWidth, marginBottom, title, link }) => html`
        <vl-functional-header
            ?data-vl-full-width=${fullWidth}
            data-vl-link=${link}
            data-vl-margin-bottom=${marginBottom}
            data-vl-title=${title}
        >
            <vl-tabs
                slot="sub-header"
                data-vl-disable-links
                data-vl-within-functional-header
                data-vl-active-tab="trein"
                @change=${(event: CustomEvent) => action('change')(event.detail)}
            >
                <vl-tabs-pane data-vl-id="trein" data-vl-title="Trein"></vl-tabs-pane>
                <vl-tabs-pane data-vl-id="metro" data-vl-title="Metro, tram en bus"></vl-tabs-pane>
                <vl-tabs-pane data-vl-id="fiets" data-vl-title="Fiets"></vl-tabs-pane>
            </vl-tabs>
        </vl-functional-header>
    `
);
FunctionalHeaderTabs.storyName = 'vl-functional-header - tabs';
FunctionalHeaderTabs.args = {
    title: 'School- en studietoelagen',
};

export const FunctionalHeaderBreadcrumb = story(
    functionalHeaderArgs,
    ({ fullWidth, marginBottom, title, link }) => html`
        <vl-functional-header
            ?data-vl-full-width=${fullWidth}
            data-vl-link=${link}
            data-vl-margin-bottom=${marginBottom}
            data-vl-title=${title}
            data-vl-hide-back-link
        >
            <vl-breadcrumb slot="sub-title">
                <vl-breadcrumb-item data-vl-href=${'1'}>Vlaanderen Intern</vl-breadcrumb-item>
                <vl-breadcrumb-item data-vl-href=${'2'}>Regelgeving</vl-breadcrumb-item>
                <vl-breadcrumb-item data-vl-href=${'3'}>Webuniversum</vl-breadcrumb-item>
                <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
            </vl-breadcrumb>
        </vl-functional-header>
    `
);
FunctionalHeaderBreadcrumb.storyName = 'vl-functional-header - breadcrumb';
FunctionalHeaderBreadcrumb.args = {
    title: 'School- en studietoelagen',
};
