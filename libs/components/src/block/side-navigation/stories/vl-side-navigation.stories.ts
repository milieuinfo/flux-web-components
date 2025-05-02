import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlSideNavigationContentComponent } from '../vl-side-navigation-content.component';
import { VlSideNavigationGroupComponent } from '../vl-side-navigation-group.component';
import { VlSideNavigationItemComponent } from '../vl-side-navigation-item.component';
import { VlSideNavigationReferenceComponent } from '../vl-side-navigation-reference.component';
import { VlSideNavigationH5 } from '../vl-side-navigation-title.component';
import { VlSideNavigationToggleComponent } from '../vl-side-navigation-toggle.component';
import { VlSideNavigationComponent } from '../vl-side-navigation.component';
import sideNavigationDoc from './vl-side-navigation.stories-doc.mdx';
import { sideNavigationHTML } from './vl-side-navigation.stories-html';

export default {
    id: 'components-block-side-navigation',
    title: 'Components - Block/side-navigation',
    tags: ['autodocs'],
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: { page: sideNavigationDoc },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
};

registerWebComponents([
    VlSideNavigationComponent,
    VlSideNavigationReferenceComponent,
    VlSideNavigationContentComponent,
    VlSideNavigationGroupComponent,
    VlSideNavigationItemComponent,
    VlSideNavigationToggleComponent,
    VlSideNavigationH5,
]);

export const SideNavigationDefault = () => html`${unsafeHTML(sideNavigationHTML)}`;
SideNavigationDefault.storyName = 'vl-side-navigation - default';

export const SideNavigationMobile = () => html`${unsafeHTML(sideNavigationHTML)}`;
SideNavigationMobile.storyName = 'vl-side-navigation - mobile';
SideNavigationMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1',
    },
};
