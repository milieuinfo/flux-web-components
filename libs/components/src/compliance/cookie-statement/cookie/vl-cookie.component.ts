import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { VlTitleComponent } from '../../../atom';
import { VlPropertiesComponent } from '../../../block/properties';
import { vlCookieStatementFluxStyles } from '../vl-cookie-statement.flux-css';

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
                ${vlLegacyStyles.join('')}
                ${vlCookieStatementFluxStyles}
            </style>
    `);

        const nameTemplate = () => {
            const _name = name || this.getAttribute('name');
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
                <vl-title type="h3">${title || this.getAttribute('title')}</vl-title>
                <vl-properties slot="properties">
                    <label>Naam</label>
                    <data>${nameTemplate()}</data>
                    <label>Doel</label>
                    <data>${purpose || this.getAttribute('purpose')}</data>
                    <label>Type</label>
                    <data>Cookie</data>
                    <label>Domein</label>
                    <data>${domain || this.getAttribute('domain')}</data>
                    <label>Verwerker</label>
                    <data>${processor || this.getAttribute('processor')}</data>
                    <label>Geldigheid</label>
                    <data>${validity || this.getAttribute('validity')}</data>
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
