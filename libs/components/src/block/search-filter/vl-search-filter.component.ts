import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { VlButtonComponent } from '../../atom/button';
import { searchFilterStyles } from './vl-search-filter.css';
import { searchFilterDefaults } from './vl-search-filter.defaults';
import { searchFilterGlobalStyles } from './vl-search-filter.global.css';

@webComponent('vl-search-filter')
export class VlSearchFilterComponent extends BaseLitElement {
    private filterTitle: string | undefined = searchFilterDefaults.filterTitle;
    private alt: string | undefined;
    private mobileModal = searchFilterDefaults.mobileModal;
    private mobileModalTitle: string | undefined;
    private mobileModalClosable = searchFilterDefaults.mobileModalClosable;
    private resizeObserver: ResizeObserver | null = null;

    static {
        registerWebComponents([VlButtonComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [searchFilterStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            filterTitle: { type: String, attribute: 'filter-title' },
            alt: { type: Boolean },
            mobileModal: { type: Boolean, attribute: 'mobile-modal', reflect: true },
            mobileModalTitle: { type: String, attribute: 'mobile-modal-title' },
            mobileModalClosable: { type: Boolean, attribute: 'mobile-modal-closable' },
        };
    }

    get form(): HTMLFormElement | null {
        return this.querySelector('form');
    }

    get submitButton(): HTMLButtonElement | null | undefined {
        return this.form?.querySelector<HTMLButtonElement>('vl-button[type="submit"]');
    }

    get buttonContainer(): HTMLElement | null | undefined {
        return this.form?.querySelector<HTMLElement>('*:has(vl-button[type="submit"],button[type="submit"])');
    }

    /** De titel van de mobiele weergave, ook de naam van de dialoog die vl-rich-data ervan maakt. */
    get mobileModalHeading(): string {
        return this.mobileModalTitle || this.filterTitle || 'Filter';
    }

    get formData(): FormData | undefined {
        return this.form ? new FormData(this.form) : undefined;
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);

        this.form?.classList.add('vl-search-filter--form');
        this.form?.addEventListener('submit', this.handleSubmitModal);
        const buttonContainer = this.form?.querySelector<HTMLElement>(
            'div:has(vl-button[type="submit"],button[type="submit"])'
        );
        buttonContainer?.classList.add('vl-search-filter--submit');

        // Deze stylesheet moet toegevoegd worden aan de adoptedStyleSheets van het document
        // omdat deze styles betrekking hebben op de slotted content en dus niet op de shadow dom
        document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            searchFilterGlobalStyles.styleSheet as CSSStyleSheet,
        ];
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        if (changedProperties.has('alt')) {
            if (this.alt) {
                this.form?.classList.add('vl-search-filter--form__alt');
            } else {
                this.form?.classList.remove('vl-search-filter--form__alt');
            }
        }
        if (changedProperties.has('mobileModal')) {
            if (this.mobileModal) {
                this.buttonContainer?.classList.add('vl-search-filter--footer-modal');
                this.form?.classList.add('vl-search-filter--form__mobile-modal');
            } else {
                this.buttonContainer?.classList.remove('vl-search-filter--footer-modal');
                this.form?.classList.remove('vl-search-filter--form__mobile-modal');
            }
        }
    }

    render() {
        const classes = {
            'vl-search-filter': true,
            'vl-search-filter--mobile-modal': this.mobileModal,
        };
        return html`
            <div class=${classMap(classes)}>
                ${!this.mobileModal ? this.renderTitle() : this.renderMobileModal()}
                <div class="form-container">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.mobileModal = entry.contentRect.width < 767;
            }
        });
        this.resizeObserver.observe(document.body);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.form?.removeEventListener('submit', this.handleSubmitModal);
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    private renderTitle() {
        return this.filterTitle ? html`<p class="vl-search-filter--intro">${this.filterTitle}</p>` : nothing;
    }

    private renderMobileModal() {
        return html`
            <div class="vl-search-filter--header-modal">
                <h2>${this.mobileModalHeading}</h2>
                ${this.mobileModalClosable
                    ? html`<vl-button
                          id="close-mobile-modal-button"
                          icon="close"
                          ghost
                          label="Filter sluiten"
                          @vl-click=${this.handleCloseModal}
                      ></vl-button>`
                    : nothing}
            </div>
        `;
    }

    // Sluit de volledig-scherm weergave zoals een submit dat doet; wie de filter opende (bv. vl-rich-data) hoort het
    // via vl-close en zet de focus terug.
    private handleCloseModal = () => {
        this.setAttribute('hidden', 'true');
        this.dispatchEvent(new CustomEvent('vl-close', { bubbles: true, composed: true }));
    };

    private handleSubmitModal = (event: Event) => {
        event.preventDefault();
        if (this.mobileModal) {
            this.setAttribute('hidden', 'true');
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-filter': VlSearchFilterComponent;
    }
}
