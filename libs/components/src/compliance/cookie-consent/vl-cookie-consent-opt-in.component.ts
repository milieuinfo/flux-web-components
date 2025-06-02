import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { VlCheckboxComponent } from '../../form';
import { VlTextComponent } from '../../atom';

@webComponent('vl-cookie-consent-opt-in')
export class VlCookieConsentOptIn extends BaseHTMLElement {
    static {
        registerWebComponents([VlCheckboxComponent, VlTextComponent]);
    }

    static get _observedAttributes() {
        return ['label', 'description', 'checked', 'mandatory'];
    }

    constructor() {
        super(`
      <style>
        ${vlLegacyStyles.join('')}
      </style>
      <div>
          <vl-checkbox></vl-checkbox>
      </div>
    `);
    }

    get checked() {
        return this._checkboxElement.checked;
    }

    get _checkboxElement() {
        return this._element.querySelector('vl-checkbox');
    }

    get _descriptionElement() {
        return this._element.querySelector('#description');
    }

    _getDescriptionTemplate(description: string) {
        return this._template(`<p><vl-text id="description" small>${description}</vl-text></p>`);
    }

    _labelChangedCallback(oldValue: string, newValue: string) {
        this._checkboxElement.setAttribute('label', newValue);
        this._checkboxElement.innerText = newValue;
    }

    _descriptionChangedCallback(oldValue: string, newValue: string) {
        if (newValue) {
            if (this._descriptionElement) {
                this._descriptionElement.textContent = newValue;
            } else {
                this._element.appendChild(this._getDescriptionTemplate(newValue));
            }
        } else {
            this._descriptionElement.remove();
        }
    }

    _checkedChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._checkboxElement.setAttribute('checked', '');
        }
    }

    _mandatoryChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._checkboxElement.setAttribute('checked', '');
            this._checkboxElement.setAttribute('disabled', '');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cookie-consent-opt-in': VlCookieConsentOptIn;
    }
}
