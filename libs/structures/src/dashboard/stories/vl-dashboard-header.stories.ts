import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlDashboardHeader } from '../vl-dashboard-header.component';
import { dashboardHeaderArgs, dashboardHeaderArgTypes } from './vl-dashboard-header.stories-arg';
import dashboardHeaderDoc from './vl-dashboard-header.stories-doc.mdx';

registerWebComponents([VlDashboardHeader, VlButtonComponent]);

export default {
    id: 'structures-dashboard-dashboard-header',
    title: 'Structures/dashboard/dashboard-header',
    tags: ['autodocs'],
    args: dashboardHeaderArgs,
    argTypes: dashboardHeaderArgTypes,
    parameters: {
        docs: {
            page: dashboardHeaderDoc,
        },
    },
} as Meta<typeof dashboardHeaderArgs>;

const DashboardHeaderTemplate = story(
    dashboardHeaderArgs,
    ({ pageIcon, pageSubtitle, pageTitle, customCSS, headerActionsSlot }) => html`
        <vl-dashboard-header
            page-icon=${pageIcon}
            page-subtitle=${pageSubtitle}
            page-title=${pageTitle}
            custom-css=${customCSS}
            >${unsafeHTML(headerActionsSlot)}</vl-dashboard-header
        >
    `,
);

export const DashboardHeaderDefault = DashboardHeaderTemplate.bind({});
DashboardHeaderDefault.storyName = 'vl-dashboard-header - default';
DashboardHeaderDefault.args = {
    pageIcon: 'list',
    pageSubtitle: 'Subtitel',
    pageTitle: 'Beheer items',
    headerActionsSlot: '<vl-button slot="header-actions" icon="add">Nieuw item</vl-button>',
};

export const DashboardHeaderWithoutActions = DashboardHeaderTemplate.bind({});
DashboardHeaderWithoutActions.storyName = 'vl-dashboard-header - zonder header-actions';
DashboardHeaderWithoutActions.args = {
    pageIcon: 'places-home',
    pageTitle: 'Overzicht',
};
