import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlAccordionComponent, VlCascaderComponent, VlInfoTile } from '@domg-wc/components';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { createComponent } from '@lit/react';
import React, { DOMAttributes } from 'react';
import './app.module.css';
import { nodeData } from './vl-cascader.data';
import { cascaderItemTemplates } from './vl-cascader.templates';
import { getItemList } from './vl-cascader.utils';

registerWebComponents([VlCascaderComponent, VlTitleComponent, VlInfoTile, VlAccordionComponent]);

export const VlCascader = createComponent({
    tagName: 'vl-cascader',
    elementClass: VlCascaderComponent,
    react: React,
});

export const VlTitle = createComponent({
    tagName: 'vl-title-next',
    elementClass: VlTitleComponent,
    react: React,
});

export function App() {
    return (
        <main>
            <vl-side-sheet
                data-vl-left
                data-vl-open
                data-vl-custom-css=".vl-layout {padding:0} .vl-region{padding:0} .vl-region:first-child{padding:0} :host #vl-side-sheet {padding:0} :host {--vl-side-sheet-width: 600px;}"
            >
                <VlCascader items={nodeData} itemListFn={getItemList} templates={cascaderItemTemplates}></VlCascader>
            </vl-side-sheet>
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
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'vl-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-popover-action-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-popover-action': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-cascader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-title-next': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'vl-side-sheet': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
