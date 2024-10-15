import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css/global-styles-decorator';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { searchFilterStyles } from './vl-search-filter.css';
import { searchFilterDefaults } from './vl-search-filter.defaults';
import { searchFilterGlobalStyles } from './vl-search-filter.global.css';

@globalStylesNext()
@webComponent('vl-search-filter-next')
export class VlSearchFilterComponent extends BaseLitElement {
    private filterTitle: string | undefined = searchFilterDefaults.filterTitle;
    private alt: string | undefined;
    private mobileModal = searchFilterDefaults.mobileModal;
    private mobileModalTitle: string | undefined;
    private resizeObserver: ResizeObserver | null = null;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [searchFilterStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            filterTitle: { type: String, attribute: 'filter-title' },
            alt: { type: Boolean },
            mobileModal: { type: Boolean, attribute: 'mobile-modal', reflect: true },
            mobileModalTitle: { type: String, attribute: 'mobile-modal-title' },
        };
    }

    get form(): HTMLFormElement | null {
        return this.querySelector('form');
    }

    get submitButton(): HTMLButtonElement | null | undefined {
        return this.form?.querySelector<HTMLButtonElement>('vl-button-next[type="submit"]');
    }

    get buttonContainer(): HTMLElement | null | undefined {
        return this.form?.querySelector<HTMLElement>('*:has(vl-button-next[type="submit"],button[type="submit"])');
    }

    get formData(): FormData | undefined {
        return this.form ? new FormData(this.form) : undefined;
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);

        this.form?.classList.add('vl-search-filter-next--form');
        this.form?.addEventListener('submit', this.handleSubmitModal);
        this.form?.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.setAttribute('hidden', 'true');
            }
        });
        const buttonContainer = this.form?.querySelector<HTMLElement>(
            'div:has(vl-button-next[type="submit"],button[type="submit"])'
        );
        buttonContainer?.classList.add('vl-search-filter-next--submit');

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
                this.form?.classList.add('vl-search-filter-next--form__alt');
            } else {
                this.form?.classList.remove('vl-search-filter-next--form__alt');
            }
        }
        if (changedProperties.has('mobileModal')) {
            if (this.mobileModal) {
                this.buttonContainer?.classList.add('vl-search-filter-next--footer-modal');
                this.form?.classList.add('vl-search-filter-next--form__mobile-modal');
            } else {
                this.buttonContainer?.classList.remove('vl-search-filter-next--footer-modal');
                this.form?.classList.remove('vl-search-filter-next--form__mobile-modal');
            }
        }
    }

    render() {
        const classes = {
            'vl-search-filter-next': true,
            'vl-search-filter-next--mobile-modal': this.mobileModal,
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
        return this.filterTitle ? html`<p class="vl-search-filter-next--intro">${this.filterTitle}</p>` : nothing;
    }

    private renderMobileModal() {
        return html`
            <div class="vl-search-filter-next--header-modal">
                <h2>${this.mobileModalTitle || this.filterTitle || 'Filter'}</h2>
            </div>
        `;
    }

    private handleSubmitModal = (event: Event) => {
        event.preventDefault();
        if (this.mobileModal) {
            this.setAttribute('hidden', 'true');
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-filter-next': VlSearchFilterComponent;
    }
}
