import { registerWebComponents } from '@domg-wc/common-utilities';
import { story } from 'libs/common/storybook/src/stories.helper';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlSideNavigationContentComponent } from '../vl-side-navigation-content.component';
import { VlSideNavigationGroupComponent } from '../vl-side-navigation-group.component';
import { VlSideNavigationItemComponent } from '../vl-side-navigation-item.component';
import { VlSideNavigationReferenceComponent } from '../vl-side-navigation-reference.component';
import { VlSideNavigationH5 } from '../vl-side-navigation-title.component';
import { VlSideNavigationToggleComponent } from '../vl-side-navigation-toggle.component';
import { VlSideNavigationComponent } from '../vl-side-navigation.component';
import { sideNavigationArgs, sideNavigationArgTypes } from './vl-side-navigation.stories-arg';
import sideNavigationDoc from './vl-side-navigation.stories-doc.mdx';
import { sideNavigationHTML } from './vl-side-navigation.stories-html';

export default {
    id: 'components-next-side-navigation',
    title: 'Components-next/side-navigation',
    tags: ['autodocs'],
    args: sideNavigationArgs,
    argTypes: sideNavigationArgTypes,
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

export const SideNavigationDefault = story(
    sideNavigationArgs,
    ({ hashSync }) => html`${unsafeHTML(sideNavigationHTML({ hashSync }))}`
);
SideNavigationDefault.storyName = 'vl-side-navigation-next - default';

export const SideNavigationMobile = story(
    sideNavigationArgs,
    ({ hashSync }) => html`${unsafeHTML(sideNavigationHTML({ hashSync }))}`
);
SideNavigationMobile.storyName = 'vl-side-navigation-next - mobile';
SideNavigationMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1',
    },
};
