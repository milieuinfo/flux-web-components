import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
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
    infoTileArgs,
    ({ autoOpen, toggleable, center, contentSlot, subtitleSlot, titleSlot, menuSlot, size }) => html`
        <vl-info-tile ?toggleable=${toggleable} ?auto-open=${autoOpen} ?center=${center} size=${size}>
            ${unsafeHTML(titleSlot)}${unsafeHTML(menuSlot)}${unsafeHTML(subtitleSlot)}${unsafeHTML(contentSlot)}
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
    subtitleSlot: `<span slot="subtitle">Uw zoon (19.05.2005)</span>`,
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
