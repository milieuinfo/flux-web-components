import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlPopoverActionListComponent } from '../vl-popover-action-list.component';
import { VlPopoverActionComponent } from '../vl-popover-action.component';
import { VlPopoverComponent } from '../vl-popover.component';
import { popoverActionArgs, popoverActionArgTypes } from './vl-popover-action.stories-arg';
import { popoverArgTypes, popoverDefaultArgs } from './vl-popover.stories-arg';
import popoverDoc from './vl-popover.stories-doc.mdx';
import { VlButtonComponent } from '../../../atom/button';

registerWebComponents([VlPopoverComponent, VlPopoverActionComponent, VlPopoverActionListComponent, VlButtonComponent]);

export default {
    id: 'components-block-popover',
    title: 'Components - Block/popover',
    tags: ['autodocs'],
    args: popoverDefaultArgs,
    argTypes: popoverArgTypes,
    parameters: {
        docs: {
            page: popoverDoc,
        },
    },
} as Meta<typeof popoverDefaultArgs>;

export const PopoverDefault = story(
    popoverDefaultArgs,
    ({ trigger, contentPadding, open, placement, hideArrow, hideOnClick, distance }) => {
        const actionListClickHandler = (event: CustomEvent) => {
            const actionElement = event.target as VlPopoverActionComponent;
            action('click')('vl-popover-action clicked > ' + actionElement.action);
            const allActions = Array.from(actionElement.parentElement?.querySelectorAll('vl-popover-action') || []);
            allActions.forEach((action) => {
                if (action !== actionElement) {
                    action.removeAttribute('selected');
                }
            });
            actionElement.setAttribute('selected', '');
        };
        return html`
            <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
            <vl-popover
                for="btn-acties"
                open="${open}"
                placement=${placement}
                trigger=${trigger}
                hide-arrow=${hideArrow}
                hide-on-click="${hideOnClick}"
                distance=${distance}
                content-padding=${contentPadding}
            >
                <vl-popover-action-list @click=${actionListClickHandler}>
                    <vl-popover-action icon="search" .action=${'search'}>Zoeken</vl-popover-action>
                    <vl-popover-action icon="bell" .action=${'report'}>Rapportenoverzicht</vl-popover-action>
                    <vl-popover-action icon="pin" .action=${'locate'}>Vind locatie</vl-popover-action>
                </vl-popover-action-list>
            </vl-popover>
        `;
    }
);
PopoverDefault.storyName = 'vl-popover - default';
PopoverDefault.args = {
    placement: 'bottom-start',
};

export const PopoverHover = story(
    popoverDefaultArgs,
    ({ trigger, open, contentPadding, placement, hideArrow, hideOnClick, distance }) => {
        return html`
            <vl-button id="btn-close" aria-describedby="tooltip">Hover over me</vl-button>
            <vl-popover
                for="btn-close"
                open=${open}
                placement=${placement}
                trigger=${trigger}
                hide-arrow=${hideArrow}
                hide-on-click=${hideOnClick}
                distance=${distance}
                content-padding=${contentPadding}
            >
                Een boodschap die context geeft.
            </vl-popover>
        `;
    }
);
PopoverHover.storyName = 'vl-popover - hover';
PopoverHover.args = {
    trigger: 'focus hover',
};
PopoverHover.parameters = {
    layout: 'centered',
    contentPadding: 'medium',
};

export const PopoverActions = story(popoverActionArgs, ({ selected }) => {
    const actionListClickHandler = (event: CustomEvent) => {
        const actionElement = event.target as VlPopoverActionComponent;
        action('click')('vl-popover-action clicked > ' + actionElement.action, actionElement);
        const allActions = Array.from(actionElement.parentElement?.querySelectorAll('vl-popover-action') || []);
        allActions.forEach((action) => {
            if (action !== actionElement) {
                action.removeAttribute('selected');
            }
        });
        actionElement.setAttribute('selected', '');
    };
    return html`
        <vl-popover-action-list @click=${actionListClickHandler}>
            <vl-popover-action selected=${selected} icon="search" action="zoeken">Zoeken</vl-popover-action>
            <vl-popover-action icon="bell" action="rapporten-tonen">Rapportenoverzicht</vl-popover-action>
            <vl-popover-action icon="pin" action="locatie-vinden">Vind locatie</vl-popover-action>
        </vl-popover-action-list>
    `;
});
PopoverActions.storyName = 'vl-popover - actions';
PopoverActions.args = popoverActionArgs;
PopoverActions.argTypes = popoverActionArgTypes;
PopoverActions.parameters = {
    controls: {
        include: ['selected'],
    },
};

export const PopoverActionsDivider = story(popoverActionArgs, ({ selected }) => {
    const actionListClickHandler = (event: CustomEvent) => {
        const actionElement = event.target as VlPopoverActionComponent;
        action('click')('vl-popover-action clicked > ' + actionElement.action);
        const allActions = Array.from(actionElement.parentElement?.querySelectorAll('vl-popover-action') || []);
        allActions.forEach((action) => {
            if (action !== actionElement) {
                action.removeAttribute('selected');
            }
        });
        actionElement.setAttribute('selected', '');
    };
    return html`
        <vl-popover-action-list @click=${actionListClickHandler}>
            <vl-popover-action selected=${selected} icon="search" action="zoeken">Zoeken</vl-popover-action>
            <vl-popover-action icon="bell" action="rapporten-tonen">Rapportenoverzicht</vl-popover-action>
            <vl-popover-action icon="pin" action="locatie-vinden">Vind locatie</vl-popover-action>
            <hr class="vl-separator" />
            <vl-popover-action icon="save" action="bewaren">Bewaren</vl-popover-action>
            <vl-popover-action icon="trash" action="verwijderen">Verwijderen</vl-popover-action>
        </vl-popover-action-list>
    `;
});
PopoverActionsDivider.storyName = 'vl-popover - actions divider';
PopoverActionsDivider.args = popoverActionArgs;
PopoverActionsDivider.argTypes = popoverActionArgTypes;
PopoverActionsDivider.parameters = {
    controls: {
        include: ['selected'],
    },
};
