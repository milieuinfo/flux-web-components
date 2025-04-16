import { BaseElementOfType, webComponent } from '@domg-wc/common';

@webComponent('vl-button-pill', { extends: 'button' })
export class VlButtonPillComponent extends BaseElementOfType(HTMLButtonElement) {
    static get _observedAttributes() {
        return ['type'];
    }

    static get _observedChildClassAttributes() {
        return ['disabled'];
    }

    get _classPrefix() {
        return 'vl-pill--';
    }

    _typeChangedCallback(oldValue: string, newValue: string) {
        if (['success', 'warning', 'error'].indexOf(newValue) >= 0) {
            this._changeClass(this._element, oldValue, newValue);
        } else {
            this._element.classList.remove(this._classPrefix + oldValue);
        }
    }

    constructor() {
        super();
        this.classList.add('vl-pill');
        this.classList.add(`${this._classPrefix}clickable`);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-button-pill': VlButtonPillComponent;
    }
}
