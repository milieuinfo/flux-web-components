import {
    BaseHTMLElement,
    findDeepestElementThroughShadowRoot,
    GlobalStyles,
    MARGINS,
    registerWebComponents,
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
                        <h1 class="vl-functional-header__title no-space-bottom">
                            <a id="title" class="vl-link neutral" tabindex="0">
                                <slot name="title"></slot>
                            </a>
                        </h1>
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

    get _titleElement() {
        return this._shadow?.querySelector<HTMLAnchorElement>('#title');
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
            const skipToContentId = this.getAttribute('skip-to-content-id')!;
            const targetId = `${skipToContentId.startsWith('#') ? '' : '#'}${skipToContentId}`;

            const skipLink = document.createElement('a');
            skipLink.setAttribute('href', targetId);
            skipLink.classList.add('vl-skip-link');
            skipLink.textContent = 'Ga meteen naar de inhoud';

            skipLink.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                const target =
                    document.querySelector<HTMLElement>(targetId) ||
                    (findDeepestElementThroughShadowRoot(document.body, targetId) as HTMLElement);
                const hasTabIndex = target.hasAttribute('tabindex');
                if (!hasTabIndex) {
                    target.setAttribute('tabindex', '-1');
                }
                target.focus();
                target.scrollIntoView();
            });

            this._headerElement?.prepend(skipLink);
        } else {
            console.warn(
                'vl-functional-header -',
                'Denk eraan om een skip-to-content-id mee te geven zodat er een skip-link kan gerenderd worden.',
                'Gebruik hiervoor de ID van de eerste heading van de content.',
                '(WCAG 2.4.1: https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)'
            );
        }

        this._updateStickyOffsetTop();
    }

    disconnectedCallback() {
        this._observer?.disconnect();

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
        this._titleElement!.href = newValue;
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
