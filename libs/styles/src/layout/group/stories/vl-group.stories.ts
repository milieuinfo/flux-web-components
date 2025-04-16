import { registerWebComponents } from '@domg-wc/common';
import { VlAccordionComponent, VlButtonComponent, VlIconComponent, VlLinkComponent } from '@domg-wc/components';
import { html } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { vlGroupArgs, vlGroupArgTypes } from './vl-group.stories-arg';
import vlGroupStoriesDoc from './vl-group.stories-doc.mdx';

export default {
    id: 'styles-layout-afnemers-group',
    title: 'Styles/Layout (afnemers)/group',
    tags: ['autodocs'],
    args: vlGroupArgs,
    argTypes: vlGroupArgTypes,
    parameters: {
        docs: {
            page: vlGroupStoriesDoc,
        },
    },
};

registerWebComponents([VlAccordionComponent, VlButtonComponent, VlLinkComponent, VlIconComponent]);

export const GroupButtons = ({
    group,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
    column,
    justifyCenter,
    justifyEnd,
    separatorColumn,
    separatorRow,
    spaceBetween,
}: typeof vlGroupArgs) => html` <div
    class=${classMap({
        'vl-group': group,
        'vl-group--collapse-l': collapseL,
        'vl-group--collapse-m': collapseM,
        'vl-group--collapse-s': collapseS,
        'vl-group--collapse-xs': collapseXS,
        'vl-group--column': column,
        'vl-group--justify-center': justifyCenter,
        'vl-group--justify-end': justifyEnd,
        'vl-group--separator-column': separatorColumn,
        'vl-group--separator-row': separatorRow,
        'vl-group--space-between': spaceBetween,
    })}
>
    <vl-button>Aanvraag starten</vl-button>
    <vl-button secondary>Annuleren</vl-button>
</div>`;
GroupButtons.storyName = 'vl-group - buttons';

export const GroupLinks = ({
    group,
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
    column,
    justifyCenter,
    justifyEnd,
    separatorColumn,
    separatorRow,
    spaceBetween,
}: typeof vlGroupArgs) => html` <div
    class=${classMap({
        'vl-group': group,
        'vl-group--collapse-l': collapseL,
        'vl-group--collapse-m': collapseM,
        'vl-group--collapse-s': collapseS,
        'vl-group--collapse-xs': collapseXS,
        'vl-group--column': column,
        'vl-group--justify-center': justifyCenter,
        'vl-group--justify-end': justifyEnd,
        'vl-group--separator-column': separatorColumn,
        'vl-group--separator-row': separatorRow,
        'vl-group--space-between': spaceBetween,
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
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
    column,
    justifyCenter,
    justifyEnd,
    separatorColumn,
    separatorRow,
    spaceBetween,
    stretchChildren,
}: typeof vlGroupArgs) => html` <div
    class=${classMap({
        'vl-group': group,
        'vl-group--collapse-l': collapseL,
        'vl-group--collapse-m': collapseM,
        'vl-group--collapse-s': collapseS,
        'vl-group--collapse-xs': collapseXS,
        'vl-group--column': column,
        'vl-group--justify-center': justifyCenter,
        'vl-group--justify-end': justifyEnd,
        'vl-group--separator-column': separatorColumn,
        'vl-group--separator-row': separatorRow,
        'vl-group--space-between': spaceBetween,
        'vl-group--stretch-children': stretchChildren,
    })}
>
    <vl-accordion data-vl-toggle-text="Accordion 1">
        <div class="vl-group vl-group--column vl-group--stretch-children">
            <vl-accordion data-vl-toggle-text="Accordion 1.1"> Inhoud accordion 1.1</vl-accordion>
            <vl-accordion data-vl-toggle-text="Accordion 1.2"> Inhoud accordion 1.2</vl-accordion>
        </div>
    </vl-accordion>
    <vl-accordion data-vl-toggle-text="Accordion 2">
        <div class="vl-group vl-group--column vl-group--stretch-children">
            <vl-accordion data-vl-toggle-text="Accordion 2.1"> Inhoud accordion 2.1</vl-accordion>
            <vl-accordion data-vl-toggle-text="Accordion 2.2"> Inhoud accordion 2.2</vl-accordion>
        </div>
    </vl-accordion>
    <vl-accordion data-vl-toggle-text="Accordion 3">
        <div class="vl-group vl-group--column vl-group--stretch-children">
            <vl-accordion data-vl-toggle-text="Accordion 3.1"> Inhoud accordion 3.1</vl-accordion>
            <vl-accordion data-vl-toggle-text="Accordion 3.2"> Inhoud accordion 3.2</vl-accordion>
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
    collapseL,
    collapseM,
    collapseS,
    collapseXS,
    column,
    justifyCenter,
    justifyEnd,
    separatorColumn,
    separatorRow,
    spaceBetween,
}: typeof vlGroupArgs) => html` <div
    class=${classMap({
        'vl-group': group,
        'vl-group--collapse-l': collapseL,
        'vl-group--collapse-m': collapseM,
        'vl-group--collapse-s': collapseS,
        'vl-group--collapse-xs': collapseXS,
        'vl-group--column': column,
        'vl-group--justify-center': justifyCenter,
        'vl-group--justify-end': justifyEnd,
        'vl-group--separator-column': separatorColumn,
        'vl-group--separator-row': separatorRow,
        'vl-group--space-between': spaceBetween,
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
