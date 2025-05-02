import { VlAccordionComponent, VlCascaderComponent, VlInfoTile } from '@domg-wc/components/block';
import { registerWebComponents } from '@domg-wc/common';
import './app.element.scss';
import { getItemList } from './vl-cascader.utils';
import { cascaderItemTemplates } from './vl-cascader.templates';
import { nodeData } from './vl-cascader.data';

export class AppElement extends HTMLElement {
    static {
        registerWebComponents([VlCascaderComponent, VlInfoTile, VlAccordionComponent]);
    }

    constructor() {
        super();
        this.innerHTML = `
                        <main>
                            <vl-side-sheet
                            left custom-css=""
                            open custom-css=".vl-layout {padding:0} .vl-region{padding:0} .vl-region:first-child{padding:0} :host #vl-side-sheet {padding:0} :host {--vl-side-sheet-width: 600px;}"
                            >
                                <vl-title type="h4" underline>Kies uit kantoren</vl-title>
                                <vl-cascader id="cascader" ></vl-cascader>
                            </vl-side-sheet>
                        </main>
        `;
    }

    connectedCallback(): void {
        const cascader: VlCascaderComponent = this.querySelector('#cascader');
        if (cascader) {
            //                     <vl-cascader .items=${nodeData} .itemListFn=${getItemList} .templates=${cascaderItemTemplates}>
            cascader.items = nodeData;
            cascader.itemListFn = getItemList;
            cascader.templates = cascaderItemTemplates;
        } else {
            console.error('cascader not found');
        }
    }
}
customElements.define('app-element', AppElement);
