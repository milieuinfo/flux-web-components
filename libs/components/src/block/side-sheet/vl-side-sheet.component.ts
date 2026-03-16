import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import {
    vlAccessibilityStyles,
    vlContentBlockStyles,
    vlLegacyStyles,
    vlMediaScreenSmall,
    vlSectionStyles,
} from '@domg-wc/styles';
import swipeDetect from 'swipe-detect/dist/';
import { VlButtonComponent } from '../../atom/button';
import { VlTooltipComponent } from '../tooltip';
import { vlSideSheetFluxStyles } from './vl-side-sheet.flux-css';

@webComponent('vl-side-sheet')
export class VlSideSheet extends BaseHTMLElement {
    protected _toggle: (() => void) | undefined;
    protected _onClose: (() => void) | undefined;
    protected _handleEsc: ((event: KeyboardEvent) => void) | undefined;
    private swipeDetect: typeof swipeDetect;

    static {
        registerWebComponents([VlButtonComponent]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(style = '') {
        const html = `
            <div id="vl-side-sheet-container">
                <vl-button aria-expanded="false"
                           aria-controls="vl-side-sheet"
                           icon="nav-left"
                           tertiary
                           part="toggle-button"
                           class="vl-side-sheet__toggle"
                           label="toggle side-sheet"
                           id="toggle-button"
                ></vl-button>
                <div id="vl-side-sheet-backdrop"></div>
                <div id="vl-side-sheet" tabindex="-1">
                    <section class="vl-section">
                        <div class="vl-content-block">
                            <slot></slot>
                        </div>
                    </section>
                </div>
            </div>
        `;
        const styleSheets = [
            ...vlLegacyStyles.map((style) => style.styleSheet!),
            vlSideSheetFluxStyles.styleSheet!,
            vlAccessibilityStyles.styleSheet!,
            vlSectionStyles.styleSheet!,
            vlContentBlockStyles.styleSheet!,
        ];
        super(html, styleSheets);
    }

    static get _observedAttributes() {
        return [
            'enable-swipe',
            'toggle-text',
            'tooltip-text',
            'custom-icon',
            'hide-toggle-button',
            'icon-position',
            'custom-size',
            'top',
            'open',
            'shadow',
        ];
    }

    static get _observedClassAttributes() {
        return ['left', 'right', 'absolute'];
    }

    get isOpen() {
        return this.hasAttribute('open');
    }

    get isLeft() {
        return this.hasAttribute('left');
    }

    get shadowStyle(): 'default' | 'large' {
        if (['default', 'large'].includes(this.getAttribute('shadow') || '')) {
            return this.getAttribute('shadow') as 'default' | 'large';
        }
        return 'default';
    }

    get toggleText() {
        return this.getAttribute('toggle-text');
    }

    get hideToggleButton() {
        return this.getAttribute('hide-toggle-button');
    }

    get customIcon() {
        return this.getAttribute('custom-icon');
    }

    get iconPlacement() {
        return this.getAttribute('icon-placement');
    }

    get _classPrefix() {
        return 'vl-side-sheet--';
    }

    get _toggleButton() {
        return this._shadow?.querySelector<VlButtonComponent>('#toggle-button');
    }

    get _toggleButtonTextElement() {
        return this._shadow?.querySelector<HTMLElement>('#vl-side-sheet-toggle-text');
    }

    get _sheetElement() {
        return this._shadow?.querySelector<HTMLElement>('#vl-side-sheet');
    }

    get _container(): HTMLElement {
        return this.shadowRoot!.querySelector<HTMLElement>('#vl-side-sheet-container')!;
    }

    get _regionElement() {
        return this._sheetElement?.querySelector<HTMLElement>('section.vl-section');
    }

    get _backdropElement() {
        return this._shadow?.querySelector<HTMLElement>('#vl-side-sheet-backdrop');
    }

    get _slotElement() {
        return this._shadow?.querySelector<HTMLElement>('slot');
    }

    get _tooltip(): VlTooltipComponent | undefined | null {
        return this._shadow?.querySelector<VlTooltipComponent>('vl-tooltip[for="toggle-button"]');
    }

    _focusToggleButton() {
        this._toggleButton?.shadowRoot?.querySelector('button')?.focus();
    }

    _focusTrap = (event: FocusEvent) => {
        if (window.innerWidth > vlMediaScreenSmall) {
            return;
        }

        const next = event.relatedTarget;
        const path = event.composedPath();
        const stillInside = path.includes(this._container);

        if (!next || !stillInside) {
            requestAnimationFrame(() => {
                this._toggleButton?.shadowRoot?.querySelector('button')?.focus();
            });
        }
    };

    connectedCallback() {
        super.connectedCallback();

        this._toggle = () => this.toggle();
        this._toggleButton?.addEventListener('click', this._toggle);
        this._toggleButton!.on = false;
        if (this.iconPlacement !== 'after') {
            this._toggleButton?.setAttribute('icon-placement', 'before');
        } else {
            this._toggleButton?.setAttribute('icon-placement', 'after');
        }

        this._handleEsc = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'escape' && this.isOpen) {
                this.close();
            }
        };
        this.addEventListener('keydown', this._handleEsc);

        this._sheetElement?.addEventListener('focusout', this._focusToggleButton);
    }

    disconnectedCallback() {
        this._toggleButton?.removeEventListener('click', this._toggle!);
        if (this._handleEsc) {
            this.removeEventListener('keydown', this._handleEsc);
        }

        this._sheetElement?.removeEventListener('focusout', this._focusToggleButton);
        this._container.removeEventListener('focusout', this._focusTrap);
    }

    /**
     * Triggert een toggle van de side-sheet zonder te klikken op de side-sheet.
     *
     * @Return {void}
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Handmatig openen van de side-sheet
     *
     * @Return {void}
     */
    open() {
        this.setAttribute('open', '');
    }

    _handleOnOpen() {
        this._toggleButton?.setAttribute('aria-expanded', 'true');
        let openIcon: string;
        if (!this.customIcon) {
            openIcon = this.isLeft ? 'nav-left' : 'nav-right';
        } else {
            openIcon = this.customIcon;
        }
        this._sheetElement?.focus();
        this._container.addEventListener('focusout', this._focusTrap);
        this._toggleButton?.setAttribute('icon', openIcon);
    }

    /**
     * Handmatig sluiten van de side-sheet
     *
     * @Return {void}
     */
    close() {
        this.removeAttribute('open');
        this._handleOnClose();
    }

    _handleOnClose() {
        this._toggleButton?.setAttribute('aria-expanded', 'false');
        let closeIcon: string;
        if (!this.customIcon) {
            closeIcon = this.isLeft ? 'nav-right' : 'nav-left';
        } else {
            closeIcon = this.customIcon;
        }
        this._toggleButton?.setAttribute('icon', closeIcon);
        this._container.removeEventListener('focusout', this._focusTrap);
        this._toggleButton?.shadowRoot?.querySelector('button')?.focus();
        if (this._onClose) {
            this._onClose();
        }
    }

    // TODO storybook documentatie
    /**
     * De callback wordt uitgevoerd direct na de afsluiten van een side sheet.
     *
     * @param {function} callback
     */
    onClose(callback: any) {
        this._onClose = callback;
    }

    _enableSwipeChangedCallback(oldValue: any, newValue: any) {
        if (newValue !== null) {
            swipeDetect(
                this._sheetElement,
                (direction: 'left' | 'right') => {
                    if ((this.isLeft && direction === 'left') || (!this.isLeft && direction === 'right')) {
                        this.close();
                    }
                },
                50,
            );
        } else {
            //TODO: disable does not work, needs to be refactored: https://github.com/mhfen/swipe-detect/issues/11
            this.swipeDetect.disable();
        }
    }

    _absoluteChangedCallback(oldValue: any, newValue: any) {
        if (newValue != undefined && this._regionElement) {
            this._sheetElement?.append(this._slotElement!);
            this._regionElement.remove();
        }
    }

    _leftChangedCallback() {
        if (!this.customIcon) {
            this._openChangedCallback();
        }
    }

    _openChangedCallback() {
        if (this.isOpen) {
            this._handleOnOpen();
        } else {
            this._handleOnClose();
        }
    }

    _toggleTextChangedCallback(oldValue: any, newValue: any) {
        this._toggleButton!.innerHTML = newValue;
    }

    _tooltipTextChangedCallback(oldValue: any, newValue: any) {
        if (newValue ?? false) {
            if (!this._tooltip) {
                const tooltip = document.createElement('vl-tooltip');
                tooltip.setAttribute('for', 'toggle-button');
                this._toggleButton?.after(tooltip);
            }
            this._tooltip!.innerText = newValue;
        } else {
            if (this._tooltip) {
                this._tooltip.remove();
            }
        }
    }

    _hideToggleButtonChangedCallback(oldValue: any, newValue: any) {
        const hideToggleButton = Boolean(newValue === null);
        if (!hideToggleButton) {
            this._toggleButton?.classList.add('vl-visually-hidden');
        } else {
            this._toggleButton?.classList.remove('vl-visually-hidden');
        }
    }

    _customIconChangedCallback(oldValue: string, newValue: string) {
        if (newValue) {
            this._toggleButton?.setAttribute('icon', newValue);
        }
    }

    _topChangedCallback(oldValue: string | null, newValue: string | null) {
        if (newValue !== null) {
            this.style.setProperty('--vl-side-sheet-top', newValue);
        } else {
            this.style.removeProperty('--vl-side-sheet-top');
        }
    }

    _shadowChangedCallback(oldValue: string | null, newValue: string | null) {
        if (newValue === 'large') {
            this._sheetElement?.classList.add('vl-side-sheet--large-shadow');
        } else {
            this._sheetElement?.classList.remove('vl-side-sheet--large-shadow');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-sheet': VlSideSheet;
    }
}
