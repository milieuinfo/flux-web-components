import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent, VlTextComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { vlDashboardHeaderStyles } from './vl-dashboard-header.css';
import { dashboardHeaderDefaults } from './vl-dashboard-header.defaults';

registerWebComponents([VlTitleComponent, VlTextComponent, VlIconComponent]);

/**
 * Het vaste id van de h1. Publiek contract: de skip links van vl-dashboard en vl-header-next springen ernaartoe, daarom
 * staat er maar één vl-dashboard-header tegelijk in de DOM.
 */
export const DASHBOARD_PAGE_TITLE_ID = 'vl-dashboard-page-title';

/**
 * Intern event: de header meldt zich na het renderen van een `page-title`, zodat vl-dashboard na het activeren van een
 * navigatielink de focus op de h1 van de nieuwe pagina kan zetten, ook als die pagina pas later rendert.
 */
export const DASHBOARD_HEADER_UPDATE_EVENT = 'vl-dashboard-header-update';

/**
 * De header van een pagina in vl-dashboard: titel, ondertitel, icoon en acties. Zet hem bovenaan de inhoud van de
 * pagina, in het slot `content` van vl-dashboard.
 *
 * @slot header-actions - Acties bij de pagina, zoals knoppen en een zoekveld.
 */
@webComponent('vl-dashboard-header')
export class VlDashboardHeader extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlResetStyles, vlDashboardHeaderStyles];
    }

    @property({ type: String, attribute: 'page-title' })
    pageTitle = dashboardHeaderDefaults.pageTitle;

    @property({ type: String, attribute: 'page-subtitle' })
    pageSubtitle = dashboardHeaderDefaults.pageSubtitle;

    @property({ type: String, attribute: 'page-icon' })
    pageIcon = dashboardHeaderDefaults.pageIcon;

    @state() private hasActions = false;

    connectedCallback(): void {
        super.connectedCallback();
        // een header die opnieuw in de pagina komt, rendert niet opnieuw: meld hem dan hier
        if (this.hasUpdated) {
            this.notifyUpdate();
        }
    }

    protected updated(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('pageTitle')) {
            this.notifyUpdate();
        }
    }

    private notifyUpdate(): void {
        if (!this.pageTitle) return;
        this.dispatchEvent(new CustomEvent(DASHBOARD_HEADER_UPDATE_EVENT, { bubbles: true, composed: true }));
    }

    private readonly onActionsSlotChange = (e: Event) => {
        const slot = e.currentTarget as HTMLSlotElement;
        this.hasActions = slot.assignedElements({ flatten: true }).length > 0;
    };

    protected render(): TemplateResult {
        const headerClasses = {
            'vl-dashboard-header': true,
            'vl-dashboard-header--has-actions': this.hasActions,
        };
        const titleClasses = {
            'vl-dashboard-header__title': true,
            'vl-dashboard-header__title--untitled': !this.pageTitle,
        };

        return html`
            <div class=${classMap(headerClasses)}>
                <div class=${classMap(titleClasses)}>
                    ${when(this.pageIcon, () => html`<vl-icon icon=${this.pageIcon!} large></vl-icon>`)}
                    ${when(
                        this.pageTitle,
                        () =>
                            html`<vl-title id=${DASHBOARD_PAGE_TITLE_ID} tabindex="-1" type="h1" no-space-bottom
                                >${this.pageTitle}</vl-title
                            >`,
                    )}
                    ${when(this.pageSubtitle, () => html`<vl-text annotation>${this.pageSubtitle}</vl-text>`)}
                </div>
                <div class="vl-dashboard-header__actions">
                    <slot name="header-actions" @slotchange=${this.onActionsSlotChange}></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-dashboard-header': VlDashboardHeader;
    }
}
