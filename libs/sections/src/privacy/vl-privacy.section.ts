import { BaseLitElement, registerWebComponents } from '@domg-wc/common-utilities';
import { VlContactCardComponent, VlDocumentComponent, VlInfoblockComponent, VlTypography } from '@domg-wc/components';
import {
    VlColumnElement,
    vlElementsStyle,
    VlGridElement,
    VlH1Element,
    VlH2Element,
    VlH3Element,
    VlH4Element,
    VlIconElement,
    VlIntroductionElement,
    VlLayoutElement,
    VlLinkElement,
    VlPropertiesComponent,
    VlPropertiesListElement,
    VlPropertyTermElement,
    VlPropertyValueElement,
    VlRegionElement,
    VlSideNavigation,
    VlSideNavigationContentElement,
    VlSideNavigationGroupElement,
    VlSideNavigationH1,
    VlSideNavigationItemElement,
    VlSideNavigationReferenceElement,
    VlSideNavigationToggleElement,
} from '@domg-wc/elements';
import { CSSResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { header, privacyHeaderElements } from './child/header.section';
import { privacyContentSection } from './child/content.section';
import { privacyBottomSection } from './child/bottom.section';
import { privacyVersionSection } from './child/version.section';
import { privacyDefaults } from './vl-privacy.defaults';

@customElement('vl-privacy')
export class VlPrivacy extends BaseLitElement {
    private date = privacyDefaults.date;
    private version = privacyDefaults.version;
    private disableBackLink = privacyDefaults.disableBackLink;
    private hideBackLink = privacyDefaults.hideBackLink;

    static {
        registerWebComponents([
            // elements
            VlColumnElement,
            VlGridElement,
            VlH1Element,
            VlH2Element,
            VlH3Element,
            VlH4Element,
            VlIconElement,
            VlIntroductionElement,
            VlLayoutElement,
            VlLinkElement,
            VlPropertiesComponent,
            VlPropertiesListElement,
            VlPropertyTermElement,
            VlPropertyValueElement,
            VlRegionElement,
            VlSideNavigation,
            VlSideNavigationContentElement,
            VlSideNavigationGroupElement,
            VlSideNavigationH1,
            VlSideNavigationItemElement,
            VlSideNavigationReferenceElement,
            VlSideNavigationToggleElement,
            // components
            VlContactCardComponent,
            VlDocumentComponent,
            VlInfoblockComponent,
            VlTypography,

            // child components
            ...privacyHeaderElements(),
        ]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle];
    }

    static get properties() {
        return {
            date: { type: String, attribute: 'data-vl-date' },
            disableBackLink: { type: Boolean, attribute: 'data-vl-disable-back-link' },
            hideBackLink: { type: Boolean, attribute: 'data-vl-hide-back-link' },
            version: { type: String, attribute: 'data-vl-version' },
        };
    }

    constructor() {
        super();
        this.allowCustomCSS = false;
    }

    render() {
        return html`
            <slot name="header"
                >${header({ disableBackLink: this.disableBackLink, hideBackLink: this.hideBackLink })}
            </slot>
            <section is="vl-region">
                <slot name="version"> ${privacyVersionSection(this.version, this.date)}</slot>
            </section>
            <section id="content" is="vl-region">
                <slot name="content" @slotchange=${this.handleContentSlotChanged}> ${privacyContentSection()}</slot>
            </section>
            <section is="vl-region" data-vl-overlap>
                <slot name="bottom"> ${privacyBottomSection()}</slot>
            </section>
        `;
    }

    handleContentSlotChanged(event: Event) {
        // wanneer de inhoud van het content slot verandert
        // verplaatsen we de inhoud ervan naar de shadow DOM van deze component
        // we verwachten dat er in dit slot een side-navigation element zit en die vormt een uitdaging als het in de light DOM zit
        const contentSlot = this.shadowRoot.querySelector('#content');
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
