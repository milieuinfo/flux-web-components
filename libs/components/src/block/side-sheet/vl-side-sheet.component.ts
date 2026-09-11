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
    // _openChangedCallback draait ook bij de initiele attribuutverwerking, dus zonder deze vlag zou een gesloten
    // side-sheet bij page load de focus naar de toggle button trekken.
    private wasOpen = false;
    private elementFocusedBeforeOpen: HTMLElement | null = null;

    static {
        registerWebComponents([VlButtonComponent]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(style = '') {
        const html = `
            <div id="vl-side-sheet-container">
                <span id="vl-side-sheet-focus-guard-start" class="vl-side-sheet__focus-guard" tabindex="0"></span>
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
                <span id="vl-side-sheet-focus-guard-end" class="vl-side-sheet__focus-guard" tabindex="0"></span>
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

    get _focusGuardStart() {
        return this._shadow?.querySelector<HTMLElement>('#vl-side-sheet-focus-guard-start');
    }

    get _focusGuardEnd() {
        return this._shadow?.querySelector<HTMLElement>('#vl-side-sheet-focus-guard-end');
    }

    _focusToggleButton() {
        this._toggleButton?.shadowRoot?.querySelector('button')?.focus();
    }

    // Een toggle button is onbruikbaar als hij verborgen is, of als hij bij een open side-sheet volledig naast het scherm
    // valt (bv. bij --vl-side-sheet-width-mobile: 100%). Enkel horizontaal: een fixed toggle button scrollt niet in beeld.
    _isToggleButtonUsable(): boolean {
        if (this.hideToggleButton !== null) {
            return false;
        }
        if (!this.isOpen || !this.isConnected) {
            return true;
        }
        const { left, right } = this._toggleButton!.getBoundingClientRect();
        return right > 0 && left < window.innerWidth;
    }

    // Een shadow host met negatieve tabindex haalt zijn volledige shadow tree uit de tabvolgorde, waardoor een
    // onbruikbare toggle button geen onzichtbare tab-stop wordt.
    _updateToggleButtonTabindex = () => {
        if (this._isToggleButtonUsable()) {
            this._toggleButton?.removeAttribute('tabindex');
        } else {
            this._toggleButton?.setAttribute('tabindex', '-1');
        }
    };

    // De focus guards zijn enkel focusbaar op een mobiel scherm bij een open side-sheet (zie flux-css).
    // Tab na het laatste element van de inhoud landt op de eind-guard en gaat door naar de toggle button, of bij een
    // onbruikbare toggle button terug naar het eerste element van de inhoud.
    _handleFocusGuardEnd = () => {
        if (this._isToggleButtonUsable()) {
            this._focusToggleButton();
        } else {
            this._focusFirstFocusable(this._getTabbableCandidates(this._sheetElement!), this._focusGuardEnd!);
        }
    };

    // Shift+Tab vanaf de toggle button (of bij een onbruikbare toggle button vanaf het eerste element) landt op de
    // start-guard en gaat door naar het laatste element van de inhoud.
    _handleFocusGuardStart = () => {
        this._focusFirstFocusable(this._getTabbableCandidates(this._sheetElement!).reverse(), this._focusGuardStart!);
    };

    // focus() faalt stil op elementen die niet focusbaar zijn (verborgen, disabled, ...), dus we proberen de
    // kandidaten in volgorde tot er één de focus effectief overneemt van de guard.
    _focusFirstFocusable(candidates: HTMLElement[], guard: HTMLElement) {
        const focused = candidates.some((candidate) => {
            candidate.focus();
            return !guard.matches(':focus');
        });
        if (focused) {
            return;
        }
        if (this._isToggleButtonUsable()) {
            this._focusToggleButton();
        } else {
            this._sheetElement?.focus();
        }
    }

    // document.activeElement stopt aan de eerste shadow host; focus() op zo'n host doet niets.
    _getDeepActiveElement(): HTMLElement | null {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active instanceof HTMLElement ? active : null;
    }

    // Doorloopt de flattened tree: slots via hun toegewezen elementen, shadow hosts via hun shadow root.
    _getTabbableCandidates(root: Element): HTMLElement[] {
        const children =
            root instanceof HTMLSlotElement
                ? root.assignedElements({ flatten: true })
                : Array.from((root.shadowRoot ?? root).children);
        return children.flatMap((child) => [
            ...(child instanceof HTMLElement && child.tabIndex >= 0 ? [child] : []),
            ...this._getTabbableCandidates(child),
        ]);
    }

    // Gebonden op focusin en niet op focusout: enkel focusin kent het element dat de focus krijgt, waardoor
    // composedPath() effectief uitsluitsel geeft over "binnen of buiten de side-sheet".
    _focusTrap = (event: FocusEvent) => {
        if (window.innerWidth > vlMediaScreenSmall) {
            return;
        }

        const path = event.composedPath();
        if (path.includes(this._container)) {
            return;
        }

        // Meerdere side-sheets tegelijk is een anti-pattern (zie de documentatie), maar de traps mogen de focus niet
        // van elkaar blijven wegtrekken: een andere open side-sheet mag ze houden. vl-map-side-sheet erft van deze
        // klasse en valt dus onder dezelfde controle.
        if (path.some((target) => target instanceof VlSideSheet && target !== this && target.isOpen)) {
            return;
        }

        this._sheetElement?.focus();
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

        this._focusGuardStart?.addEventListener('focus', this._handleFocusGuardStart);
        this._focusGuardEnd?.addEventListener('focus', this._handleFocusGuardEnd);
        // Een side-sheet die al open is vóór hij in de DOM hangt, kon zijn toggle button nog niet opmeten.
        this._updateToggleButtonTabindex();
    }

    disconnectedCallback() {
        this._toggleButton?.removeEventListener('click', this._toggle!);
        if (this._handleEsc) {
            this.removeEventListener('keydown', this._handleEsc);
        }

        this._focusGuardStart?.removeEventListener('focus', this._handleFocusGuardStart);
        this._focusGuardEnd?.removeEventListener('focus', this._handleFocusGuardEnd);
        document.removeEventListener('focusin', this._focusTrap);
        window.removeEventListener('resize', this._updateToggleButtonTabindex);
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
        if (!this.wasOpen) {
            this.elementFocusedBeforeOpen = this._getDeepActiveElement();
        }
        this.wasOpen = true;
        this._toggleButton?.setAttribute('aria-expanded', 'true');
        let openIcon: string;
        if (!this.customIcon) {
            openIcon = this.isLeft ? 'nav-left' : 'nav-right';
        } else {
            openIcon = this.customIcon;
        }
        this._sheetElement?.focus();
        document.addEventListener('focusin', this._focusTrap);
        this._updateToggleButtonTabindex();
        window.addEventListener('resize', this._updateToggleButtonTabindex);
        this._toggleButton?.setAttribute('icon', openIcon);
    }

    /**
     * Handmatig sluiten van de side-sheet
     *
     * @Return {void}
     */
    close() {
        this.removeAttribute('open');
    }

    _handleOnClose() {
        const wasOpen = this.wasOpen;
        this.wasOpen = false;
        this._toggleButton?.setAttribute('aria-expanded', 'false');
        let closeIcon: string;
        if (!this.customIcon) {
            closeIcon = this.isLeft ? 'nav-right' : 'nav-left';
        } else {
            closeIcon = this.customIcon;
        }
        this._toggleButton?.setAttribute('icon', closeIcon);
        document.removeEventListener('focusin', this._focusTrap);
        window.removeEventListener('resize', this._updateToggleButtonTabindex);
        this._updateToggleButtonTabindex();
        if (wasOpen && this.hideToggleButton === null) {
            this._focusToggleButton();
        } else if (wasOpen) {
            // Een verborgen toggle button krijgt geen focus; die gaat terug naar waar ze vóór het openen stond.
            this.elementFocusedBeforeOpen?.focus();
        }
        this.elementFocusedBeforeOpen = null;
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
        this._updateToggleButtonTabindex();
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
