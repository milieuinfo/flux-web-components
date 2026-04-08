import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
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
export class VlCookie extends BaseHTMLElement {
    static {
        registerWebComponents([VlPropertiesComponent, VlTitleComponent]);
    }

    constructor({ title, name, purpose, domain, processor, validity }: VlCookieProps = {}) {
        const html = `<div></div>`;
        const styleSheets = [
            ...vlLegacyStyles.map((style) => style.styleSheet!),
            vlCookieStatementFluxStyles.styleSheet!,
        ];
        super(html, styleSheets);

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
                <vl-title type="h3" id="${title || this.getAttribute('title')}">${
                title || this.getAttribute('title')
            }</vl-title>
                <vl-properties slot="properties">
                    <vl-property>Naam</vl-property>
                    <vl-property-data>${nameTemplate()}</vl-property-data>
                    <vl-property>Doel</vl-property>
                    <vl-property-data>${purpose || this.getAttribute('purpose')}</vl-property-data>
                    <vl-property>Type</vl-property>
                    <vl-property-data>Cookie</vl-property-data>
                    <vl-property>Domein</vl-property>
                    <vl-property-data>${domain || this.getAttribute('domain')}</vl-property-data>
                    <vl-property>Verwerker</vl-property>
                    <vl-property-data>${processor || this.getAttribute('processor')}</vl-property-data>
                    <vl-property>Geldigheid</vl-property>
                    <vl-property-data>${validity || this.getAttribute('validity')}</vl-property-data>
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
