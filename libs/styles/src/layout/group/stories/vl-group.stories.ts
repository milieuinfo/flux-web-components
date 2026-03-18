import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlIconComponent, VlLinkComponent } from '@domg-wc/components/atom';
import { VlAccordionComponent } from '@domg-wc/components/block';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlGroupArgs, vlGroupArgTypes } from './vl-group.stories-arg';
import vlGroupStoriesDoc from './vl-group.stories-doc.mdx';

export default {
    id: 'styles-layout-group',
    title: 'Styles/Layout (afnemers)/group',
    tags: ['autodocs'],
    args: vlGroupArgs,
    argTypes: vlGroupArgTypes,
    parameters: {
        docs: {
            page: vlGroupStoriesDoc,
        },
    },
} as Meta<typeof vlGroupArgs>;

registerWebComponents([VlAccordionComponent, VlButtonComponent, VlLinkComponent, VlIconComponent]);

export const GroupButtons = ({
    group,
    column,
    stretchChildren,
    noGap,
    noRowGap,
    noColumnGap,
    wrap,
    spaceBetween,
    justifyStart,
    justifyCenter,
    justifyEnd,
    alignStart,
    alignCenter,
    alignEnd,
    baseline,
    separatorRow,
    separatorColumn,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
}: typeof vlGroupArgs) =>
    html` <div
        class=${classMap({
            'vl-group': group,
            'vl-group--column': column,
            'vl-group--stretch-children': stretchChildren,
            'vl-group--no-gap': noGap,
            'vl-group--no-row-gap': noRowGap,
            'vl-group--no-column-gap': noColumnGap,
            'vl-group--wrap': wrap,
            'vl-group--space-between': spaceBetween,
            'vl-group--justify-start': justifyStart,
            'vl-group--justify-center': justifyCenter,
            'vl-group--justify-end': justifyEnd,
            'vl-group--align-start': alignStart,
            'vl-group--align-center': alignCenter,
            'vl-group--align-end': alignEnd,
            'vl-group--baseline': baseline,
            'vl-group--separator-row': separatorRow,
            'vl-group--separator-column': separatorColumn,
            'vl-group--collapse-l': collapseL,
            'vl-group--collapse-m': collapseM,
            'vl-group--collapse-s': collapseS,
            'vl-group--collapse-xs': collapseXS,
        })}
    >
        <vl-button>Aanvraag starten</vl-button>
        <vl-button secondary>Annuleren</vl-button>
    </div>`;
GroupButtons.storyName = 'vl-group - buttons';

export const GroupLinks = ({
    group,
    column,
    stretchChildren,
    noGap,
    noRowGap,
    noColumnGap,
    wrap,
    spaceBetween,
    justifyStart,
    justifyCenter,
    justifyEnd,
    alignStart,
    alignCenter,
    alignEnd,
    baseline,
    separatorRow,
    separatorColumn,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
}: typeof vlGroupArgs) =>
    html` <div
        class=${classMap({
            'vl-group': group,
            'vl-group--column': column,
            'vl-group--stretch-children': stretchChildren,
            'vl-group--no-gap': noGap,
            'vl-group--no-row-gap': noRowGap,
            'vl-group--no-column-gap': noColumnGap,
            'vl-group--wrap': wrap,
            'vl-group--space-between': spaceBetween,
            'vl-group--justify-start': justifyStart,
            'vl-group--justify-center': justifyCenter,
            'vl-group--justify-end': justifyEnd,
            'vl-group--align-start': alignStart,
            'vl-group--align-center': alignCenter,
            'vl-group--align-end': alignEnd,
            'vl-group--baseline': baseline,
            'vl-group--separator-row': separatorRow,
            'vl-group--separator-column': separatorColumn,
            'vl-group--collapse-l': collapseL,
            'vl-group--collapse-m': collapseM,
            'vl-group--collapse-s': collapseS,
            'vl-group--collapse-xs': collapseXS,
        })}
        style="height: 140px"
    >
        <vl-link href="#" icon="bell"> Notificaties</vl-link>
        <vl-link href="#" icon="graduate"> Opleidingen</vl-link>
        <vl-link href="#" icon="pin"> Locaties</vl-link>
    </div>`;
GroupLinks.storyName = 'vl-group - links';
GroupLinks.args = {
    separatorRow: true,
};

export const GroupAccordions = ({
    group,
    column,
    stretchChildren,
    noGap,
    noRowGap,
    noColumnGap,
    wrap,
    spaceBetween,
    justifyStart,
    justifyCenter,
    justifyEnd,
    alignStart,
    alignCenter,
    alignEnd,
    baseline,
    separatorRow,
    separatorColumn,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
}: typeof vlGroupArgs) =>
    html` <div
        class=${classMap({
            'vl-group': group,
            'vl-group--column': column,
            'vl-group--stretch-children': stretchChildren,
            'vl-group--no-gap': noGap,
            'vl-group--no-row-gap': noRowGap,
            'vl-group--no-column-gap': noColumnGap,
            'vl-group--wrap': wrap,
            'vl-group--space-between': spaceBetween,
            'vl-group--justify-start': justifyStart,
            'vl-group--justify-center': justifyCenter,
            'vl-group--justify-end': justifyEnd,
            'vl-group--align-start': alignStart,
            'vl-group--align-center': alignCenter,
            'vl-group--align-end': alignEnd,
            'vl-group--baseline': baseline,
            'vl-group--separator-row': separatorRow,
            'vl-group--separator-column': separatorColumn,
            'vl-group--collapse-l': collapseL,
            'vl-group--collapse-m': collapseM,
            'vl-group--collapse-s': collapseS,
            'vl-group--collapse-xs': collapseXS,
        })}
    >
        <vl-accordion toggle-text="Accordion 1" heading-level="2">
            <div class="vl-group vl-group--column vl-group--stretch-children">
                <vl-accordion toggle-text="Accordion 1.1" heading-level="3"> Inhoud accordion 1.1</vl-accordion>
                <vl-accordion toggle-text="Accordion 1.2" heading-level="3"> Inhoud accordion 1.2</vl-accordion>
            </div>
        </vl-accordion>
        <vl-accordion toggle-text="Accordion 2" heading-level="2">
            <div class="vl-group vl-group--column vl-group--stretch-children">
                <vl-accordion toggle-text="Accordion 2.1" heading-level="3"> Inhoud accordion 2.1</vl-accordion>
                <vl-accordion toggle-text="Accordion 2.2" heading-level="3"> Inhoud accordion 2.2</vl-accordion>
            </div>
        </vl-accordion>
        <vl-accordion toggle-text="Accordion 3" heading-level="2">
            <div class="vl-group vl-group--column vl-group--stretch-children">
                <vl-accordion toggle-text="Accordion 3.1" heading-level="3"> Inhoud accordion 3.1</vl-accordion>
                <vl-accordion toggle-text="Accordion 3.2" heading-level="3"> Inhoud accordion 3.2</vl-accordion>
            </div>
        </vl-accordion>
    </div>`;
GroupAccordions.storyName = 'vl-group - accordions';
GroupAccordions.args = {
    column: true,
    separatorColumn: true,
    stretchChildren: true,
};

export const GroupIcons = ({
    group,
    column,
    stretchChildren,
    noGap,
    noRowGap,
    noColumnGap,
    wrap,
    spaceBetween,
    justifyStart,
    justifyCenter,
    justifyEnd,
    alignStart,
    alignCenter,
    alignEnd,
    baseline,
    separatorRow,
    separatorColumn,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
}: typeof vlGroupArgs) =>
    html` <div
        class=${classMap({
            'vl-group': group,
            'vl-group--column': column,
            'vl-group--stretch-children': stretchChildren,
            'vl-group--no-gap': noGap,
            'vl-group--no-row-gap': noRowGap,
            'vl-group--no-column-gap': noColumnGap,
            'vl-group--wrap': wrap,
            'vl-group--space-between': spaceBetween,
            'vl-group--justify-start': justifyStart,
            'vl-group--justify-center': justifyCenter,
            'vl-group--justify-end': justifyEnd,
            'vl-group--align-start': alignStart,
            'vl-group--align-center': alignCenter,
            'vl-group--align-end': alignEnd,
            'vl-group--baseline': baseline,
            'vl-group--separator-row': separatorRow,
            'vl-group--separator-column': separatorColumn,
            'vl-group--collapse-l': collapseL,
            'vl-group--collapse-m': collapseM,
            'vl-group--collapse-s': collapseS,
            'vl-group--collapse-xs': collapseXS,
        })}
        style="height: 140px"
    >
        <vl-icon href="#" icon="bell"></vl-icon>
        <vl-icon href="#" icon="graduate"></vl-icon>
        <vl-icon href="#" icon="pin"></vl-icon>
    </div>`;
GroupIcons.storyName = 'vl-group - icons';
GroupIcons.args = {
    column: true,
};
