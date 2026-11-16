import {
    BaseHTMLElement,
    createSkipToContentLink,
    findDeepestElementThroughShadowRoot,
    GlobalStyles,
    MARGINS,
    registerWebComponents,
    SKIP_TO_CONTENT_MISSING_ID_WARNING,
    webComponent,
} from '@domg-wc/common';
import { VlLinkComponent } from '@domg-wc/components/atom';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlHeader as VlHeaderNext } from '@domg-wc/components/compliance/next';
import {
    vlAccessibilityStyles,
    vlContentBlockStyles,
    vlGridStyles,
    vlLegacyStyles,
    vlResetStyles,
    vlSectionStyles,
} from '@domg-wc/styles';
import { functionalHeaderStyle } from '@domg/govflanders-style/component';
import { VlIconComponent } from '../../atom/icon';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { vlLinkIconStyles } from '../../atom/link-style/vl-link-icon-style.css';
import { vlLinkStyles } from '../../atom/link-style/vl-link-style.css';
import { vlTitleStyles } from '../../atom/title/vl-title.css';
import { vlFunctionalHeaderFluxStyles } from './vl-functional-header.flux-css';

GlobalStyles.getInstance().register();

@webComponent('vl-functional-header')
export class VlFunctionalHeaderComponent extends BaseHTMLElement {
    private _backLinkEventListener: EventListener | null = null;
    private _subTitleListElement: HTMLLIElement | null = null;

    static {
        registerWebComponents([VlIconComponent, VlLinkComponent]);
    }

    constructor() {
        super(`
          <header class="vl-functional-header">
            <div class="vl-content-block">
              <div class="vl-functional-header__row flux-functional-header__row">
                <div class="flux-functional-header__content">
                    <div class="vl-functional-header__content">
                        <slot name="top-left"></slot>
                    </div>
                    <div class="vl-functional-header__content">
                        <div class="vl-functional-header__heading">
                            <slot name="heading">
                                <h1 class="vl-functional-header__title no-space-bottom">
                                    <a id="title" class="vl-link neutral" tabindex="-1">
                                        <slot name="title"></slot>
                                    </a>
                                </h1>
                            </slot>
                        </div>
                    </div>
                </div>
                <div class="flux-functional-header__top-right">
                    <slot name="top-right"></slot>
                </div>
                <div id="actions" class="vl-functional-header__actions">
                    <ul></ul>
                </div>
              </div>
              <div class="vl-functional-header__sub" id="sub-header">
                <slot name="sub-header">
                  <ul class="vl-functional-header__sub-row vl-functional-header__sub-actions">
                      <li id="back-link-container" class="vl-functional-header__sub__action">
                          <slot name="back-link">
                              <vl-link id="back-link" href="${document.referrer}">
                                  <span class="vl-icon vl-icon--arrow-left-fat vl-link__icon vl-link__icon--before"></span><slot id="back-link-text" name="back"><span>Terug</span></slot>
                              </vl-link>
                          </slot>
                      </li>
                      <li id="sub-title" class="vl-functional-header__sub__action">
                          <slot name="sub-title"></slot>
                      </li>
                  </ul>
                </slot>
              </div>
            </div>
          </header>
        `);
    }

    static get _observedAttributes() {
        return [
            'back',
            'back-link',
            'disable-back-link',
            'hide-back-link',
            'hide-sub-header',
            'link',
            'margin-bottom',
            'sub-title',
            'title',
            'title-label',
            'skip-to-content-id',
        ];
    }

    static get _observedClassAttributes() {
        return ['full-width', 'sticky'];
    }

    get _classPrefix() {
        return 'vl-functional-header--';
    }

    get _headerElement(): HTMLElement | undefined {
        return this._shadow?.querySelector<HTMLElement>('header')!;
    }

    // Niet op #title: die id verhuist naar het kopblok zodra er een eigen kop in de heading-slot staat.
    get _titleElement() {
        return this._shadow?.querySelector<HTMLAnchorElement>('.vl-functional-header__title > a');
    }

    get _headingElement() {
        return this._shadow?.querySelector<HTMLElement>('.vl-functional-header__heading');
    }

    get _headingSlotElement() {
        return this._shadow?.querySelector<HTMLSlotElement>('slot[name="heading"]');
    }

    get _subTitleElement() {
        return this._shadow?.querySelector<HTMLElement>('#sub-title');
    }

    get _backLinkContainer() {
        return this._shadow?.querySelector<HTMLElement>('#back-link-container');
    }

    get _backLinkElement() {
        return this._shadow?.querySelector<HTMLAnchorElement>('#back-link');
    }

    get _backLinkTextElement() {
        return this._backLinkElement?.querySelector<HTMLElement>('#back-link-text');
    }

    get _actionsElement() {
        return this._shadow?.querySelector<HTMLElement>('#actions');
    }

    get _subHeaderElement() {
        return this._shadow?.querySelector<HTMLElement>('#sub-header');
    }

    get _defaultSubHeaderElement() {
        return this._shadow?.querySelector<HTMLElement>('#default-sub-header');
    }

    get _actionsListElement() {
        return this._actionsElement?.querySelector<HTMLUListElement>('ul');
    }

    get _subHeaderListElement() {
        return this._subHeaderElement?.querySelector<HTMLUListElement>('ul');
    }

    get _subTitleListElements() {
        return this._subTitleListElement?.querySelectorAll<HTMLLIElement>('li');
    }

    /**
     * Zet de click event listener voor de 'Terug' knop. Default: ```document.referrer```
     *
     * @param {Function} eventListener - Functie met de uit te voeren handeling als op de terug knop wordt geklikt.
     * @deprecated Gebruik in plaats hiervan de `@vl-click-back` event listener op het component zelf.
     */
    set backLinkEventListener(eventListener: EventListener) {
        if (this._backLinkEventListener) {
            this._backLinkElement?.removeEventListener('click', this._backLinkEventListener);
        }
        this._backLinkEventListener = eventListener;
        this._backLinkElement?.addEventListener('click', this._backLinkEventListener);
    }

    connectedCallback() {
        super.connectedCallback();

        this._observer = this.__observeSlotElements(() => this.__processSlotElements());
        this.__processSlotElements();

        this._headingSlotElement?.addEventListener('slotchange', this.__moveTitleId);
        this.__moveTitleId();
        this._headingElement?.addEventListener('focus', this.__focusHeadingLink);

        if (this._backLinkElement) {
            if (this.hasAttribute('disable-back-link')) {
                this._backLinkElement.removeAttribute('href');
                this._backLinkElement.setAttribute('button-as-link', '');
            }

            this._backLinkElement.onclick = (event: Event) => this._handleClickBackLink(event);
        }

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                vlResetStyles.styleSheet!,
                ...this.shadowRoot.adoptedStyleSheets!,
                ...vlLegacyStyles.map((style) => style.styleSheet!),
                vlGridStyles.styleSheet!,
                vlSectionStyles.styleSheet!,
                vlContentBlockStyles.styleSheet!,
                ...vlTitleStyles.map((style) => style.styleSheet!),
                functionalHeaderStyle.styleSheet!,
                vlFunctionalHeaderFluxStyles.styleSheet!,
                vlLinkStyles('.vl-link').styleSheet!,
                vlLinkIconStyles.styleSheet!,
                vlIconStyles.styleSheet!,
                vlAccessibilityStyles.styleSheet!,
            ];
        }

        if (this.hasAttribute('full-width')) {
            this.shadowRoot?.querySelector('.vl-content-block')?.classList.add('vl-content-block--full-width');
        }

        if (this.hasAttribute('skip-to-content-id')) {
            const skipLink = createSkipToContentLink(this.getAttribute('skip-to-content-id')!);
            this._headingElement?.parentElement?.after(skipLink);
        } else {
            console.warn('vl-functional-header -', ...SKIP_TO_CONTENT_MISSING_ID_WARNING);
        }

        this.__warnWhenHeadingSlotOverridesTitle();

        this._updateStickyOffsetTop();
    }

    disconnectedCallback() {
        this._observer?.disconnect();
        this._headingSlotElement?.removeEventListener('slotchange', this.__moveTitleId);
        this._headingElement?.removeEventListener('focus', this.__focusHeadingLink);

        this._headerElement?.querySelector('.vl-skip-link')?.remove();
    }

    _getActionTemplate(element: Element) {
        return this._template(`
      <li class="vl-functional-header__action">
        <p>${element.outerHTML}</p>
      </li>
    `);
    }

    _getSubHeaderTemplate(element: Element) {
        return this._getSubHeaderTemplateWithValue(element.outerHTML);
    }

    _getSubHeaderTemplateWithValue(text: string) {
        return this._template(`<li class="vl-functional-header__sub__action">${text}</li>`);
    }

    /** @deprecated Gebruik het `title-label` attribuut om de paginatitel te zetten. */
    _titleChangedCallback(oldValue: string, newValue: string) {
        if (newValue == null) {
            return;
        }
        this._titleElement!.innerText = newValue;
        this.removeAttribute('title');
    }

    _titleLabelChangedCallback(oldValue: string, newValue: string) {
        this._titleElement!.innerText = newValue;
    }

    _subTitleChangedCallback(oldValue: string, newValue: string) {
        this._subTitleElement!.innerText = newValue;
    }

    _linkChangedCallback(oldValue: string, newValue: string) {
        // Zonder link is de titel geen link en geen tabstop, maar een skip link naar #title moet hem wel focus kunnen
        // geven. Chrome meldt voor een a zonder href tabIndex 0, dus navigateToAnchor zet die -1 niet zelf.
        // De href gaat dan ook weg: `href = null` zou de string "null" zetten, een link die Tab niet bereikt.
        if (newValue) {
            this._titleElement!.setAttribute('href', newValue);
            this._titleElement!.removeAttribute('tabindex');
        } else {
            this._titleElement!.removeAttribute('href');
            this._titleElement!.setAttribute('tabindex', '-1');
        }
    }

    _backChangedCallback(oldValue: string, newValue: string) {
        this._backLinkTextElement!.innerText = newValue;
    }

    _backLinkChangedCallback(oldValue: string, newValue: string) {
        this._backLinkElement!.setAttribute('href', newValue || document.referrer);
    }

    _marginBottomChangedCallback(oldValue: keyof typeof MARGINS, newValue: keyof typeof MARGINS) {
        const margin = MARGINS[newValue];
        const header = this._shadow?.querySelector<HTMLElement>('.vl-functional-header');
        if (!header) {
            return;
        }
        if (margin) {
            header.style.marginBottom = margin;
        } else {
            header.style.removeProperty('margin-bottom');
        }
    }

    _hideBackLinkChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._backLinkContainer?.remove();
        }
    }

    _hideSubHeaderChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._subHeaderElement?.classList.add('sub-header-hidden');
        } else {
            this._subHeaderElement?.classList.remove('sub-header-hidden');
        }
    }

    _stickyChangedCallback() {
        this._updateStickyOffsetTop();
    }

    _updateStickyOffsetTop() {
        const vlHeader: VlHeader | VlHeaderNext | null =
            (findDeepestElementThroughShadowRoot(document.documentElement, 'vl-header') as VlHeader) ||
            (findDeepestElementThroughShadowRoot(document.documentElement, 'vl-header-next') as VlHeaderNext);
        this.style.setProperty('--vl-functional-header--sticky-offset-top', `${vlHeader?.height || 0}px`);

        vlHeader?.addEventListener('ready', () => {
            this.style.setProperty('--vl-functional-header--sticky-offset-top', `${vlHeader.height}px`);
        });
    }

    _handleClickBackLink(event: Event) {
        if (this.hasAttribute('disable-back-link')) {
            event.preventDefault();
        }

        this.dispatchEvent(
            new CustomEvent('vl-click-back', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Afnemers springen met `skip-to-content-id="title"` van `vl-header-next` naar de titel. Met een eigen kop in de
     * heading-slot wordt de standaardtitel niet getoond en kan hij geen focus krijgen, dus verhuist de id dan naar
     * het kopblok rond de slot. Zonder eigen kop blijft alles zoals voorheen: de id staat op de titel-link.
     */
    __moveTitleId = () => {
        const hasHeading = !!this._headingSlotElement?.assignedElements().length;
        const [withId, withoutId] = hasHeading
            ? [this._headingElement, this._titleElement]
            : [this._titleElement, this._headingElement];

        withoutId?.removeAttribute('id');
        withId?.setAttribute('id', 'title');
    };

    /**
     * Een skip link naar `#title` geeft met een eigen kop de focus aan het kopblok. Staat er een link of knop in de
     * heading-slot, dan krijgt die de focus, zodat de volgende Tab naar de skip link van de component gaat, zoals
     * zonder eigen kop. Ook een link binnen een eigen kop, bv. `<h2 slot="heading"><a ...>`, telt mee.
     */
    __focusHeadingLink = () => {
        const focusable = 'a[href], button';
        const [heading] = this._headingSlotElement?.assignedElements() ?? [];
        const target = heading?.matches(focusable) ? heading : heading?.querySelector(focusable);

        if (target instanceof HTMLElement) {
            target.focus({ preventScroll: true });
        }
    };

    __warnWhenHeadingSlotOverridesTitle() {
        if (!this.querySelector('[slot="heading"]')) {
            return;
        }

        // Het deprecated `title`-attribuut wist zichzelf van de host, dus de titel is enkel nog af te lezen van
        // het fallback-element waar `title`, `title-label` en `link` naartoe schrijven.
        const fallbackTitle = this._titleElement;
        const titleIsSet =
            !!fallbackTitle?.textContent?.trim() ||
            !!fallbackTitle?.getAttribute('href') ||
            !!this.querySelector('[slot="title"]');

        if (titleIsSet) {
            console.warn(
                'vl-functional-header -',
                'de heading-slot vervangt de volledige titel, dus title-label, link en de title-slot worden genegeerd.'
            );
        }
    }

    __processSlotElements() {
        this.__processSlotActions();
    }

    __processSlotSubHeader() {
        this._subHeaderListElement!.innerHTML = '';
        const subHeader = this.querySelector('[slot="sub-header"]');
        if (subHeader) {
            [...subHeader.children]
                .map((action) => this._getSubHeaderTemplate(action))
                .forEach((action) => this._subHeaderListElement?.append(action));
            this._defaultSubHeaderElement!.hidden = true;
        } else {
            this._subHeaderElement!.hidden = true;
        }
    }

    __processSlotActions() {
        this._actionsListElement!.innerHTML = '';
        const actions = this.querySelector('[slot="actions"]');
        if (actions) {
            [...actions.children]
                .map((action) => this._getActionTemplate(action))
                .forEach((action) => this._actionsListElement?.append(action));
        } else {
            this._actionsElement!.hidden = true;
        }
    }

    __observeSlotElements(callback: MutationCallback) {
        const node = this as unknown as Node;
        const observer = new MutationObserver(callback);
        observer.observe(node, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        });
        return observer;
    }

    public get height(): number {
        return this.getBoundingClientRect().height;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-functional-header': VlFunctionalHeaderComponent;
    }
}
