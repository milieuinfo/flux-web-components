import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlContentBlockStyles, vlGridStyles, vlLegacyStyles, vlSectionStyles, vlStackedStyles } from '@domg-wc/styles';
import { CSSResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlTitleComponent } from '../../atom';
import { VlParagraphComponent } from '../../atom/paragraph';
import {
    VlContactCardComponent,
    VlDocumentComponent,
    VlInfoblockComponent,
    VlPropertiesComponent,
    VlSideNavigationComponent,
    VlTypography,
} from '../../block';
import { privacyBottomSection } from './child/bottom.component';
import { privacyContentSection } from './child/content.component';
import { header, privacyHeaderElements } from './child/header.component';
import { privacyVersionSection } from './child/version.component';
import { privacyDefaults } from './vl-privacy.defaults';

@customElement('vl-privacy')
export class VlPrivacy extends BaseLitElement {
    private date = privacyDefaults.date;
    private version = privacyDefaults.version;
    private disableBackLink = privacyDefaults.disableBackLink;
    private hideBackLink = privacyDefaults.hideBackLink;

    static {
        registerWebComponents([
            // components
            VlContactCardComponent,
            VlDocumentComponent,
            VlInfoblockComponent,
            VlTypography,
            VlTitleComponent,
            VlSideNavigationComponent,
            VlPropertiesComponent,
            VlParagraphComponent,
            // child components
            ...privacyHeaderElements(),
        ]);
    }

    constructor() {
        super();
        this.allowCustomCSS = false;
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlLegacyStyles, vlGridStyles, vlContentBlockStyles, vlSectionStyles, vlStackedStyles];
    }

    static get properties() {
        return {
            date: { type: String, attribute: 'date' },
            disableBackLink: { type: Boolean, attribute: 'disable-back-link' },
            hideBackLink: { type: Boolean, attribute: 'hide-back-link' },
            version: { type: String, attribute: 'version' },
        };
    }

    render() {
        return html`
            <slot name="header"
                >${header({ disableBackLink: this.disableBackLink, hideBackLink: this.hideBackLink })}
            </slot>
            <section class="vl-section">
                <slot name="version"> ${privacyVersionSection(this.version, this.date)}</slot>
            </section>
            <section id="content" class="vl-section">
                <slot name="content" @slotchange=${this.handleContentSlotChanged}> ${privacyContentSection()}</slot>
            </section>
            <section class="vl-section vl-section--overlap">
                <slot name="bottom"> ${privacyBottomSection()}</slot>
            </section>
        `;
    }

    handleContentSlotChanged(event: Event) {
        // wanneer de inhoud van het content slot verandert
        // verplaatsen we de inhoud ervan naar de shadow DOM van deze component
        // we verwachten dat er in dit slot een side-navigation element zit en die vormt een uitdaging als het in de light DOM zit
        const contentSlot = this.shadowRoot?.querySelector('#content');
        const content = this.querySelector('[slot="content"]');
        if (contentSlot && content) {
            contentSlot.textContent = '';
            contentSlot.appendChild(content);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-privacy': VlPrivacy;
    }
}
