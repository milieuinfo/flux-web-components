import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-info-tile.component';
import { infoTileArgs, infoTileArgTypes } from './vl-info-tile.stories-arg';
import infoTileDoc from './vl-info-tile.stories-doc.mdx';

export default {
    id: 'components-block-info-tile',
    title: 'Components - Block/info-tile',
    tags: ['autodocs'],
    args: infoTileArgs,
    argTypes: infoTileArgTypes,
    parameters: {
        docs: {
            page: infoTileDoc,
        },
    },
} as Meta<typeof infoTileArgs>;

const Template = story(
    { ...infoTileArgs, classes: '' },
    ({
        autoOpen,
        toggleable,
        center,
        clickable,
        clickableLabel,
        contentSlot,
        subtitleSlot,
        titleSlot,
        footerSlot,
        menuSlot,
        badgeSlot,
        size,
        icon,
        iconAsBadge,
        type,
        fullHeight = false,
        classes = '',
        headingLevel,
        onVlClickInfoTile,
    }) => html`
        <vl-info-tile
            ?auto-open=${autoOpen}
            ?center=${center}
            ?icon-as-badge=${iconAsBadge}
            ?toggleable=${toggleable}
            ?full-height=${fullHeight}
            ?clickable=${clickable}
            clickable-label=${clickableLabel}
            icon="${icon}"
            size="${size}"
            type="${type}"
            class="${classes}"
            heading-level="${ifDefined(headingLevel)}"
            @vl-click-info-tile="${onVlClickInfoTile}"
        >
            ${unsafeHTML(badgeSlot)} ${unsafeHTML(titleSlot)} ${unsafeHTML(menuSlot)} ${unsafeHTML(subtitleSlot)}
            ${unsafeHTML(contentSlot)} ${unsafeHTML(footerSlot)}
        </vl-info-tile>
    `
);

export const InfoTileDefault = Template.bind({});
InfoTileDefault.storyName = 'vl-info-tile - default';
InfoTileDefault.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
};

export const InfoTileSmall = Template.bind({});
InfoTileSmall.storyName = 'vl-info-tile - small';
InfoTileSmall.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    size: 'small',
};

export const InfoTileMedium = Template.bind({});
InfoTileMedium.storyName = 'vl-info-tile - medium';
InfoTileMedium.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    size: 'medium',
};

export const InfoTileLarge = Template.bind({});
InfoTileLarge.storyName = 'vl-info-tile - large';
InfoTileLarge.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    size: 'large',
};

export const InfoTileAlt = Template.bind({});
InfoTileAlt.storyName = 'vl-info-tile - alt';
InfoTileAlt.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    type: 'alt',
};

export const InfoTileError = Template.bind({});
InfoTileError.storyName = 'vl-info-tile - error';
InfoTileError.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    type: 'error',
};

export const InfoTileSuccess = Template.bind({});
InfoTileSuccess.storyName = 'vl-info-tile - success';
InfoTileSuccess.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    type: 'success',
};

export const InfoTileWarning = Template.bind({});
InfoTileWarning.storyName = 'vl-info-tile - warning';
InfoTileWarning.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    type: 'warning',
};

export const InfoTileFullHeight = Template.bind({});
InfoTileFullHeight.storyName = 'vl-info-tile - full height';
InfoTileFullHeight.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    fullHeight: true,
    classes: 'vl-column vl-column--6 vl-column--s-12 vl-column--align-self-stretch',
};
InfoTileFullHeight.decorators = [
    (story: () => unknown) => html`
        <div class="vl-grid">
            ${story()}
            <vl-info-tile full-height class="vl-column vl-column--6 vl-column--s-12 vl-column--align-self-stretch">
                <span slot="title">Grotere info tile</span>
                <span slot="subtitle">sub-title</span>
                <div slot="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
            </vl-info-tile>
        </div>
    `,
];

export const InfoTileHeadingLevel = Template.bind({});
InfoTileHeadingLevel.storyName = 'vl-info-tile - heading level';
InfoTileHeadingLevel.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    headingLevel: '6',
};

export const InfoTileCentered = Template.bind({});
InfoTileCentered.storyName = 'vl-info-tile - centered';
InfoTileCentered.args = {
    toggleable: false,
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    center: true,
};

export const InfoTileToggleable = Template.bind({});
InfoTileToggleable.storyName = 'vl-info-tile - toggleable';
InfoTileToggleable.args = {
    toggleable: true,
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
};

export const InfoTileMenuSlot = Template.bind({});
InfoTileMenuSlot.storyName = 'vl-info-tile - menu slot';
InfoTileMenuSlot.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    menuSlot: `<span slot="menu">
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover for="btn-acties" placement="bottom-end">
            <vl-popover-action-list>
                <vl-popover-action icon="search">Zoeken</vl-popover-action>
                <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    </span>`,
};

export const InfoTileIcon = Template.bind({});
InfoTileIcon.storyName = 'vl-info-tile - icon';
InfoTileIcon.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    icon: 'file-tasks-check',
    iconAsBadge: true,
};

export const InfoTileBadgeSlot = Template.bind({});
InfoTileBadgeSlot.storyName = 'vl-info-tile - badge slot';
InfoTileBadgeSlot.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    badgeSlot: `<div slot="badge" style="
            width: 45px;
            height: 45px;
            background: var(--vl-color--background-alt);
            border: 1px solid var(--vl-color--border-default);
            border-radius: 50%;
            display: flex;
            flex-wrap: wrap;
            place-content: center center;
            font-weight: 500;
        ">BD</div>`,
};

export const InfoTileFooterSlot = Template.bind({});
InfoTileFooterSlot.storyName = 'vl-info-tile - footer slot';
InfoTileFooterSlot.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    footerSlot: `<div slot="footer">
        <vl-button icon="file-download">Download</vl-button>
    </div>`,
};

export const InfoTileClickable = Template.bind({});
InfoTileClickable.storyName = 'vl-info-tile - clickable';
InfoTileClickable.args = {
    titleSlot: `<span slot="title">Broos Deprez</span>`,
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
    contentSlot: `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`,
    menuSlot: `<span slot="menu">
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover for="btn-acties" placement="bottom-end">
            <vl-popover-action-list>
                <vl-popover-action icon="search">Zoeken</vl-popover-action>
                <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    </span>`,
    clickable: true,
    clickableLabel: 'detail pagina Broos Deprez openen',
};
