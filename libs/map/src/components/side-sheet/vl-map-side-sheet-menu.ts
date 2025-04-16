import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';

@webComponent('vl-map-side-sheet-menu')
export class VlMapSideSheetMenu extends BaseElementOfType(HTMLElement) {
    constructor() {
        super(`
      <style>
        ${vlLegacyStyles.join('')}
        :host {
          margin: -1.5rem;
          display: block;
        }
      </style>
      <slot></slot>
    `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-side-sheet-menu': VlMapSideSheetMenu;
    }
}
