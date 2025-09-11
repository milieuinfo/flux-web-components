import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { VlAccordionComponent, VlCascaderComponent, VlInfoTile } from '@domg-wc/components/block';
import { VlSideNavigationComponent, VlSideNavigationLayoutComponent } from '@domg-wc/components/block/next';
import { createComponent } from '@lit/react';
import React, { DOMAttributes } from 'react';
import './app.module.css';
import { nodeData } from './vl-cascader.data';
import { cascaderItemTemplates } from './vl-cascader.templates';
import { getItemList } from './vl-cascader.utils';

registerWebComponents([
    VlCascaderComponent,
    VlTitleComponent,
    VlInfoTile,
    VlAccordionComponent,
    VlSideNavigationLayoutComponent,
    VlSideNavigationComponent,
]);

export const VlCascader = createComponent({
    tagName: 'vl-cascader',
    elementClass: VlCascaderComponent,
    react: React,
});

// @ts-expect-error: type is private in VlTitleComponent
export class VlTitleExtended extends VlTitleComponent {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const VlTitle = createComponent({
    tagName: 'vl-title',
    elementClass: VlTitleExtended,
    react: React,
});

const sideNavContent = (
    <div slot="content">
        <div id="side-nav-example-content">
            <section>
                <VlTitle type="h2" id="section-intro">
                    Introduction
                </VlTitle>
                <p>
                    This playground demonstrates the <strong>vl-side-navigation-next</strong> component. The table of
                    contents on the right is generated automatically from the headings in this content. Scroll the page
                    to see the active section highlight.
                </p>
            </section>
            <section>
                <VlTitle type="h3" id="section-usage">
                    Usage
                </VlTitle>
                <p>
                    Use <code>vl-side-navigation-layout</code> to combine the grid layout with an automatic side
                    navigation. Put your main content in a div with <code>slot="content"</code> and give the content
                    root an id that you pass as <code>heading-root-selector</code>. Use <code>vl-title</code> or native
                    h2/h3 with <code>id</code> attributes for each section.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula
                    lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis massa. Pellentesque
                    porta et ligula at feugiat. Nulla sit amet erat fringilla, dapibus sapien quis, efficitur neque.
                    Fusce vulputate eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus,
                    id tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis,
                    leo nisl sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti. Phasellus
                    non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla vitae mattis massa. Donec
                    pulvinar, ipsum eget luctus molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam
                    gravida, turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed augue.
                    Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur.{' '}
                </p>
            </section>
            <section>
                <VlTitle type="h3" id="section-options">
                    Options
                </VlTitle>
                <p>
                    You can set <code>compact</code> for a collapsible TOC on small screens, and{' '}
                    <code>navigation-title</code> to change the title above the table of contents (e.g. &quot;On this
                    page&quot;).
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula
                    lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis massa. Pellentesque
                    porta et ligula at feugiat. Nulla sit amet erat fringilla, dapibus sapien quis, efficitur neque.
                    Fusce vulputate eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus,
                    id tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis,
                    leo nisl sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti. Phasellus
                    non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla vitae mattis massa. Donec
                    pulvinar, ipsum eget luctus molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam
                    gravida, turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed augue.
                    Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur.{' '}
                </p>
            </section>
            <section>
                <VlTitle type="h2" id="section-example">
                    Example section
                </VlTitle>
                <p>
                    This is a second-level section. The side navigation shows both h2 and h3 headings by default. You
                    can limit levels with <code>min-level</code> and <code>max-level</code>.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula
                    lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis massa. Pellentesque
                    porta et ligula at feugiat. Nulla sit amet erat fringilla, dapibus sapien quis, efficitur neque.
                    Fusce vulputate eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus,
                    id tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis,
                    leo nisl sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti. Phasellus
                    non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla vitae mattis massa. Donec
                    pulvinar, ipsum eget luctus molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam
                    gravida, turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed augue.
                    Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur.{' '}
                </p>
            </section>
            <section>
                <VlTitle type="h3" id="section-more">
                    More info
                </VlTitle>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula
                    lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis massa. Pellentesque
                    porta et ligula at feugiat. Nulla sit amet erat fringilla, dapibus sapien quis, efficitur neque.
                    Fusce vulputate eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus,
                    id tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis,
                    leo nisl sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti. Phasellus
                    non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla vitae mattis massa. Donec
                    pulvinar, ipsum eget luctus molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam
                    gravida, turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed augue.
                    Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur.{' '}
                </p>
            </section>
        </div>
    </div>
);

export function App() {
    return (
        <main style={{ padding: 0 }}>
            <vl-side-navigation-layout
                content-block
                heading-root-selector="#side-nav-example-content"
                navigation-title="On this page"
            >
                {sideNavContent}
            </vl-side-navigation-layout>
        </main>
    );
}

export default App;

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        for?: string;
        placement?: string;
        icon?: string;
        action?: string;
        onClick?: (event) => void;
    }
}

declare global {
    // eslint-disable-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'vl-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-popover-action-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-popover-action': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-cascader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-title': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-side-sheet': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                left: boolean;
                open: boolean;
                'custom-css': string;
            };
            'vl-side-navigation-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'content-block'?: boolean;
                'heading-root-selector'?: string;
                'navigation-title'?: string;
                compact?: boolean;
            };
            'vl-side-navigation-next': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
