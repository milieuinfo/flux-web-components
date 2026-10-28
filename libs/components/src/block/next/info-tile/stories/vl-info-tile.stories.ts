import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlPopoverComponent } from '../../../popover';
import { VlInfoTileComponent } from '../vl-info-tile.component';
import { infoTileArgs, infoTileArgTypes } from './vl-info-tile.stories-arg';
import infoTileDoc from './vl-info-tile.stories-doc.mdx';

registerWebComponents([VlInfoTileComponent, VlPopoverComponent, VlButtonComponent]);

export default {
    id: 'components-block-next-info-tile',
    title: 'Components - Block/next/info-tile',
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
        open,
        toggleable,
        clickable,
        clickableLabel,
        center,
        fullHeight,
        size,
        icon,
        iconAsBadge,
        type,
        headingLevel,
        highlight,
        highlightLeft,
        classes,
        triggerSlot,
        titleLabelSlot,
        subtitleSlot,
        badgeSlot,
        actionsSlot,
        contentSlot,
        footerSlot,
        onVlClickInfoTile,
        onVlToggle,
        onVlOpen,
        onVlClose,
    }) => html`
        <vl-info-tile-next
            ?open=${open}
            ?toggleable=${toggleable}
            ?clickable=${clickable}
            clickable-label=${clickableLabel}
            ?center=${center}
            ?full-height=${fullHeight}
            size=${size}
            icon=${icon}
            ?icon-as-badge=${iconAsBadge}
            type=${type}
            heading-level=${headingLevel}
            ?highlight=${highlight}
            ?highlight-left=${highlightLeft}
            class=${classes}
            @vl-click-info-tile=${onVlClickInfoTile}
            @vl-toggle=${(event: CustomEvent) => onVlToggle(event.detail)}
            @vl-open=${onVlOpen}
            @vl-close=${onVlClose}
        >
            ${unsafeHTML(badgeSlot)} ${unsafeHTML(triggerSlot)} ${unsafeHTML(titleLabelSlot)} ${unsafeHTML(actionsSlot)}
            ${unsafeHTML(subtitleSlot)} ${unsafeHTML(contentSlot)} ${unsafeHTML(footerSlot)}
        </vl-info-tile-next>
    `,
);

const title = `<span slot="trigger">Broos Deprez</span>`;
const subtitle = `<span slot="subtitle">Uw zoon (19.05.2005)</span>`;
const content = `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`;
const actions = `<span slot="actions">
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover for="btn-acties" placement="bottom-end">
            <vl-popover-action-list>
                <vl-popover-action icon="search">Zoeken</vl-popover-action>
                <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    </span>`;

export const InfoTileDefault = Template.bind({});
InfoTileDefault.storyName = 'vl-info-tile-next - default';
InfoTileDefault.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content };

export const InfoTileSmall = Template.bind({});
InfoTileSmall.storyName = 'vl-info-tile-next - small';
InfoTileSmall.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, size: 'small' };

export const InfoTileMedium = Template.bind({});
InfoTileMedium.storyName = 'vl-info-tile-next - medium';
InfoTileMedium.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, size: 'medium' };

export const InfoTileLarge = Template.bind({});
InfoTileLarge.storyName = 'vl-info-tile-next - large';
InfoTileLarge.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, size: 'large' };

export const InfoTileAlt = Template.bind({});
InfoTileAlt.storyName = 'vl-info-tile-next - alt';
InfoTileAlt.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, type: 'alt' };

export const InfoTileError = Template.bind({});
InfoTileError.storyName = 'vl-info-tile-next - error';
InfoTileError.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, type: 'error' };

export const InfoTileSuccess = Template.bind({});
InfoTileSuccess.storyName = 'vl-info-tile-next - success';
InfoTileSuccess.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, type: 'success' };

export const InfoTileWarning = Template.bind({});
InfoTileWarning.storyName = 'vl-info-tile-next - warning';
InfoTileWarning.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, type: 'warning' };

export const InfoTileFullHeight = Template.bind({});
InfoTileFullHeight.storyName = 'vl-info-tile-next - full height';
InfoTileFullHeight.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
    fullHeight: true,
    classes: 'vl-column vl-column--6 vl-column--s-12 vl-column--align-self-stretch',
};
InfoTileFullHeight.decorators = [
    (story: () => unknown) => html`
        <div class="vl-grid">
            ${story()}
            <vl-info-tile-next full-height class="vl-column vl-column--6 vl-column--s-12 vl-column--align-self-stretch">
                <span slot="trigger">Grotere info tile</span>
                <span slot="subtitle">sub-title</span>
                <div slot="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
            </vl-info-tile-next>
        </div>
    `,
];

export const InfoTileHeadingLevel = Template.bind({});
InfoTileHeadingLevel.storyName = 'vl-info-tile-next - heading level';
InfoTileHeadingLevel.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, headingLevel: '6' };

export const InfoTileCentered = Template.bind({});
InfoTileCentered.storyName = 'vl-info-tile-next - centered';
InfoTileCentered.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, center: true };

export const InfoTileToggleable = Template.bind({});
InfoTileToggleable.storyName = 'vl-info-tile-next - toggleable';
InfoTileToggleable.args = { triggerSlot: title, contentSlot: content, toggleable: true };

export const InfoTileActionsSlot = Template.bind({});
InfoTileActionsSlot.storyName = 'vl-info-tile-next - actions slot';
InfoTileActionsSlot.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, actionsSlot: actions };

export const InfoTileIcon = Template.bind({});
InfoTileIcon.storyName = 'vl-info-tile-next - icon';
InfoTileIcon.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
    icon: 'file-tasks-check',
    iconAsBadge: true,
};

export const InfoTileBadgeSlot = Template.bind({});
InfoTileBadgeSlot.storyName = 'vl-info-tile-next - badge slot';
InfoTileBadgeSlot.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
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
InfoTileFooterSlot.storyName = 'vl-info-tile-next - footer slot';
InfoTileFooterSlot.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
    footerSlot: `<div slot="footer"><vl-button icon="file-download">Download</vl-button></div>`,
};

export const InfoTileIconPrimaryBackground = Template.bind({});
InfoTileIconPrimaryBackground.storyName = 'vl-info-tile-next - icon primary background';
InfoTileIconPrimaryBackground.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
    icon: 'file-tasks-check',
    iconAsBadge: true,
};
InfoTileIconPrimaryBackground.decorators = [
    (story: () => unknown) => html`
        <style>
            .info-tile-primary-icon {
                --vl-info-tile-icon-background-color: var(--vl-color--icon-success);
                --vl-info-tile-icon-border-color: var(--vl-color--border-success-subtle);
                --vl-info-tile-icon-color: var(--vl-color--border-inverse);
            }
        </style>
        <div class="info-tile-primary-icon">${story()}</div>
    `,
];

export const InfoTileClickable = Template.bind({});
InfoTileClickable.storyName = 'vl-info-tile-next - clickable';
InfoTileClickable.args = {
    triggerSlot: title,
    subtitleSlot: subtitle,
    contentSlot: content,
    actionsSlot: actions,
    clickable: true,
    clickableLabel: 'detail pagina Broos Deprez openen',
};

export const InfoTileHighlight = Template.bind({});
InfoTileHighlight.storyName = 'vl-info-tile-next - highlight';
InfoTileHighlight.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, highlight: true };

export const InfoTileHighlightLeft = Template.bind({});
InfoTileHighlightLeft.storyName = 'vl-info-tile-next - highlight left';
InfoTileHighlightLeft.args = { triggerSlot: title, subtitleSlot: subtitle, contentSlot: content, highlightLeft: true };
