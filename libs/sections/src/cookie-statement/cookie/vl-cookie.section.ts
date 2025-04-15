import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlPropertiesComponent, VlTitleComponent } from '@domg-wc/components';
import styles from '../vl-cookie-statement.uig-css';

export interface VlCookieProps {
    title?: string;
    name?: string | string[];
    purpose?: string;
    domain?: string;
    processor?: string;
    validity?: string;
}

@webComponent('vl-cookie')
export class VlCookie extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlPropertiesComponent, VlTitleComponent]);
    }

    constructor({ title, name, purpose, domain, processor, validity }: VlCookieProps = {}) {
        super(`
            <style>
              ${styles}
            </style>
    `);

        const nameTemplate = () => {
            const _name = name || this.dataset.vlName;
            if (Array.isArray(_name)) {
                return `
                    <vl-typography>
                        <ul>
                            ${_name.map((name) => `<li>${name}</li>`).join('')}
                        </ul>
                    </vl-typography>
                `;
            } else {
                return _name;
            }
        };

        this._element.insertAdjacentHTML(
            'afterend',
            `
                <vl-title type="h3">${title || this.dataset.vlTitle}</vl-title>
                <vl-properties slot="properties">
                    <label>Naam</label>
                    <data>${nameTemplate()}</data>
                    <label>Doel</label>
                    <data>${purpose || this.dataset.vlPurpose}</data>
                    <label>Type</label>
                    <data>Cookie</data>
                    <label>Domein</label>
                    <data>${domain || this.dataset.vlDomain}</data>
                    <label>Verwerker</label>
                    <data>${processor || this.dataset.vlProcessor}</data>
                    <label>Geldigheid</label>
                    <data>${validity || this.dataset.vlValidity}</data>
                </vl-properties>
            `
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cookie': VlCookie;
    }
}
