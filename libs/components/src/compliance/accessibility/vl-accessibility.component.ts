import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles, vlLayoutStyles, vlLegacyStyles, vlMarginStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, type PropertyDeclarations } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlTitleComponent } from '../../atom';
import { VlLinkComponent } from '../../atom/link';
import { VlFunctionalHeaderComponent } from '../../block/functional-header';
import { VlSideNavigationLayoutComponent } from '../../block/next/side-navigation';
import { content, contentElements } from './child/content.component';
import { header, headerElements } from './child/header.component';
import { sideNavigation } from './child/side-navigation.component';
import { title, titleElements } from './child/title.component';
import { AccessibilityProperties, COMPLIANCE_STATUS, EVALUATION_STATUS, Limitations } from './vl-accessibility.model';

@customElement('vl-accessibility')
export class VlAccessibility extends BaseLitElement {
    static {
        registerWebComponents([
            ...new Set([
                VlFunctionalHeaderComponent,
                VlSideNavigationLayoutComponent,
                ...contentElements(),
                ...headerElements(),
                ...titleElements(),
            ]),
            VlTitleComponent,
            VlLinkComponent,
        ]);
    }

    private application: string;
    private compliance: COMPLIANCE_STATUS;
    private date: string;
    private dateModified: string;
    private disableBackLink: boolean;
    private hideBackLink: boolean;
    private evaluation: EVALUATION_STATUS;
    private version: string;
    private limitations?: Limitations;

    constructor() {
        super();

        this.allowCustomCSS = false;
        this.application = 'deze applicatie';
        this.compliance = 'PARTIALLY_COMPLIANT';
        this.date = '20 juli 2021';
        this.dateModified = '20 juli 2021';
        this.disableBackLink = false;
        this.hideBackLink = false;
        this.evaluation = 'NOT_EVALUATED';
        this.version = '1.0.0';
    }

    static get styles(): CSSResult[] {
        return [vlResetStyles, ...vlLegacyStyles, ...vlLayoutStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            application: {
                type: String,
                attribute: 'application',
                reflect: true,
            },
            compliance: {
                type: String,
                attribute: 'compliance',
                reflect: true,
            },
            date: {
                type: String,
                attribute: 'date',
                reflect: true,
            },
            dateModified: {
                type: String,
                attribute: 'date-modified',
                reflect: true,
            },
            disableBackLink: {
                type: Boolean,
                attribute: 'disable-back-link',
                reflect: true,
            },
            hideBackLink: {
                type: Boolean,
                attribute: 'hide-back-link',
                reflect: true,
            },
            evaluation: {
                type: String,
                attribute: 'evaluation',
                reflect: true,
            },
            version: {
                type: String,
                attribute: 'version',
                reflect: true,
            },
            limitations: {
                type: Object,
            },
        };
    }

    render() {
        const props: AccessibilityProperties = {
            application: this.application,
            compliance: this.compliance,
            date: this.date,
            dateModified: this.dateModified,
            disableBackLink: this.disableBackLink,
            hideBackLink: this.hideBackLink,
            evaluation: this.evaluation,
            version: this.version,
            limitations: this.limitations,
        };

        return html`
            <div>
                <slot name="header">${header(props)}</slot> ${title(props)}
                <vl-side-navigation-layout-next
                    content-block
                    heading-root-selector="#content"
                    min-level="2"
                    max-level="2"
                    max-depth="0"
                >
                    ${content(props)}
                </vl-side-navigation-layout-next>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accessibility': VlAccessibility;
    }
}
