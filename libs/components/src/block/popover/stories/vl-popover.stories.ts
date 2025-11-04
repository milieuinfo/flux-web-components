import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { action } from 'storybook/actions';
import { VlButtonComponent } from '../../../atom/button';
import { VlPopoverActionListComponent } from '../vl-popover-action-list.component';
import { VlPopoverActionComponent } from '../vl-popover-action.component';
import { VlPopoverComponent } from '../vl-popover.component';
import { popoverActionArgs } from './vl-popover-action.stories-arg';
import { popoverArgTypes, popoverDefaultArgs } from './vl-popover.stories-arg';
import popoverDoc from './vl-popover.stories-doc.mdx';

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

const relativePositionDecorator = (story: () => unknown) =>
    html` <div style="position: relative;min-height: 150px;">${story()}</div>`;

export const PopoverDefault = story(
    popoverDefaultArgs,
    ({ trigger, contentPadding, open, placement, hideArrow, hideOnClick, distance, strategy }) => {
        const actionListClickHandler = (event: CustomEvent) => {
            const actionElement = event.target as VlPopoverActionComponent;
            action('click')('vl-popover-action clicked > ' + actionElement.action);
            const allActions = Array.from(actionElement.parentElement?.querySelectorAll('vl-popover-action') || []);
            allActions.forEach((item) => {
                if (item !== actionElement) {
                    item.removeAttribute('selected');
                }
            });
            actionElement.setAttribute('selected', '');
        };
        return html`
            <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
            <vl-popover
                for="btn-acties"
                ?open="${open}"
                placement=${placement}
                trigger=${trigger}
                hide-arrow=${hideArrow}
                hide-on-click="${hideOnClick}"
                distance=${distance}
                strategy=${strategy}
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
PopoverDefault.decorators = [relativePositionDecorator];
PopoverDefault.args = {
    placement: 'bottom-start',
};

export const PopoverTooltip = story(
    popoverDefaultArgs,
    ({ trigger, open, contentPadding, placement, hideArrow, hideOnClick, distance, strategy, tooltip }) => {
        return html`
            <vl-button id="btn-close">Hover over me</vl-button>
            <vl-popover
                for="btn-close"
                ?open=${open}
                placement=${placement}
                trigger=${trigger}
                hide-arrow=${hideArrow}
                hide-on-click=${hideOnClick}
                distance=${distance}
                strategy=${strategy}
                content-padding=${contentPadding}
                ?tooltip=${tooltip}
            >
                Een boodschap die context geeft.
            </vl-popover>
        `;
    }
);
PopoverTooltip.storyName = 'vl-popover - tooltip';
PopoverTooltip.decorators = [relativePositionDecorator];
PopoverTooltip.args = {
    tooltip: true,
};
PopoverTooltip.parameters = {
    layout: 'centered',
};

export const PopoverActions = story(popoverActionArgs, ({ selected }) => {
    const actionListClickHandler = (event: CustomEvent) => {
        const actionElement = event.target as VlPopoverActionComponent;
        action('click')('vl-popover-action clicked > ' + actionElement.action, actionElement);
        const allActions = Array.from(actionElement.parentElement?.querySelectorAll('vl-popover-action') || []);
        allActions.forEach((item) => {
            if (item !== actionElement) {
                item.removeAttribute('selected');
            }
        });
        actionElement.setAttribute('selected', '');
    };
    return html`
        <vl-popover-action-list @click=${actionListClickHandler}>
            <vl-popover-action ?selected=${selected} icon="search" .action="${'zoeken'}">Zoeken</vl-popover-action>
            <vl-popover-action icon="bell" .action="${'rapporten-tonen'}">Rapportenoverzicht</vl-popover-action>
            <vl-popover-action icon="pin" .action="${'locatie-vinden'}">Vind locatie</vl-popover-action>
        </vl-popover-action-list>
    `;
});
PopoverActions.storyName = 'vl-popover - actions';
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
        allActions.forEach((item) => {
            if (item !== actionElement) {
                item.removeAttribute('selected');
            }
        });
        actionElement.setAttribute('selected', '');
    };
    return html`
        <vl-popover-action-list @click=${actionListClickHandler}>
            <vl-popover-action ?selected=${selected} icon="search" action="zoeken">Zoeken</vl-popover-action>
            <vl-popover-action icon="bell" action="rapporten-tonen">Rapportenoverzicht</vl-popover-action>
            <vl-popover-action icon="pin" action="locatie-vinden">Vind locatie</vl-popover-action>
            <hr class="vl-separator" />
            <vl-popover-action icon="save" action="bewaren">Bewaren</vl-popover-action>
            <vl-popover-action icon="trash" action="verwijderen">Verwijderen</vl-popover-action>
        </vl-popover-action-list>
    `;
});
PopoverActionsDivider.storyName = 'vl-popover - actions divider';
PopoverActionsDivider.parameters = {
    controls: {
        include: ['selected'],
    },
};

export const PopoverActionsLinks = story(popoverActionArgs, ({ selected }) => {
    return html`
        <vl-popover-action-list>
            <vl-popover-action
                ?selected=${selected}
                icon="search"
                href="#zoeken"
                target="_blank"
                rel="nofollow noopener noreferrer"
            >
                Zoeken</vl-popover-action
            >
            <vl-popover-action icon="bell" href="#rapporten-tonen" target="_blank" rel="nofollow noopener noreferrer">
                Rapportenoverzicht</vl-popover-action
            >
            <vl-popover-action icon="pin" href="#locatie-vinden" target="_blank" rel="nofollow noopener noreferrer">
                Vind locatie</vl-popover-action
            >
        </vl-popover-action-list>
    `;
});
PopoverActionsLinks.storyName = 'vl-popover - actions - links';
PopoverActionsLinks.parameters = {
    controls: {
        include: ['selected'],
    },
};
