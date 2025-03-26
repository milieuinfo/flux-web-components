import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlAccordionComponent } from '@domg-wc/components';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlIconComponent } from '@domg-wc/components/next/icon';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { html } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { vlGroupArgs, vlGroupArgTypes } from './vl-group.stories-arg';
import vlGroupStoriesDoc from './vl-group.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-group',
    title: 'Styles-next/Layout (afnemers)/group',
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
        'vl-group-next': group,
        'vl-group-next--collapse-l': collapseL,
        'vl-group-next--collapse-m': collapseM,
        'vl-group-next--collapse-s': collapseS,
        'vl-group-next--collapse-xs': collapseXS,
        'vl-group-next--column': column,
        'vl-group-next--justify-center': justifyCenter,
        'vl-group-next--justify-end': justifyEnd,
        'vl-group-next--separator-column': separatorColumn,
        'vl-group-next--separator-row': separatorRow,
        'vl-group-next--space-between': spaceBetween,
    })}
>
    <vl-button-next>Aanvraag starten</vl-button-next>
    <vl-button-next secondary>Annuleren</vl-button-next>
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
        'vl-group-next': group,
        'vl-group-next--collapse-l': collapseL,
        'vl-group-next--collapse-m': collapseM,
        'vl-group-next--collapse-s': collapseS,
        'vl-group-next--collapse-xs': collapseXS,
        'vl-group-next--column': column,
        'vl-group-next--justify-center': justifyCenter,
        'vl-group-next--justify-end': justifyEnd,
        'vl-group-next--separator-column': separatorColumn,
        'vl-group-next--separator-row': separatorRow,
        'vl-group-next--space-between': spaceBetween,
    })}
    style="height: 140px"
>
    <vl-link-next href="#" icon="bell"> Notificaties</vl-link-next>
    <vl-link-next href="#" icon="graduate"> Opleidingen</vl-link-next>
    <vl-link-next href="#" icon="pin"> Locaties</vl-link-next>
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
        'vl-group-next': group,
        'vl-group-next--collapse-l': collapseL,
        'vl-group-next--collapse-m': collapseM,
        'vl-group-next--collapse-s': collapseS,
        'vl-group-next--collapse-xs': collapseXS,
        'vl-group-next--column': column,
        'vl-group-next--justify-center': justifyCenter,
        'vl-group-next--justify-end': justifyEnd,
        'vl-group-next--separator-column': separatorColumn,
        'vl-group-next--separator-row': separatorRow,
        'vl-group-next--space-between': spaceBetween,
        'vl-group-next--stretch-children': stretchChildren,
    })}
>
    <vl-accordion data-vl-toggle-text="Accordion 1">
        <div class="vl-group-next vl-group-next--column vl-group-next--stretch-children">
            <vl-accordion data-vl-toggle-text="Accordion 1.1"> Inhoud accordion 1.1</vl-accordion>
            <vl-accordion data-vl-toggle-text="Accordion 1.2"> Inhoud accordion 1.2</vl-accordion>
        </div>
    </vl-accordion>
    <vl-accordion data-vl-toggle-text="Accordion 2">
        <div class="vl-group-next vl-group-next--column vl-group-next--stretch-children">
            <vl-accordion data-vl-toggle-text="Accordion 2.1"> Inhoud accordion 2.1</vl-accordion>
            <vl-accordion data-vl-toggle-text="Accordion 2.2"> Inhoud accordion 2.2</vl-accordion>
        </div>
    </vl-accordion>
    <vl-accordion data-vl-toggle-text="Accordion 3">
        <div class="vl-group-next vl-group-next--column vl-group-next--stretch-children">
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
        'vl-group-next': group,
        'vl-group-next--collapse-l': collapseL,
        'vl-group-next--collapse-m': collapseM,
        'vl-group-next--collapse-s': collapseS,
        'vl-group-next--collapse-xs': collapseXS,
        'vl-group-next--column': column,
        'vl-group-next--justify-center': justifyCenter,
        'vl-group-next--justify-end': justifyEnd,
        'vl-group-next--separator-column': separatorColumn,
        'vl-group-next--separator-row': separatorRow,
        'vl-group-next--space-between': spaceBetween,
    })}
    style="height: 140px"
>
    <vl-icon-next href="#" icon="bell"></vl-icon-next>
    <vl-icon-next href="#" icon="graduate"></vl-icon-next>
    <vl-icon-next href="#" icon="pin"></vl-icon-next>
</div>`;
GroupIcons.storyName = 'vl-group - icons';
GroupIcons.args = {
    column: true,
};
