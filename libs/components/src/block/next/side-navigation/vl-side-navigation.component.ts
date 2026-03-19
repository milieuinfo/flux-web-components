import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import {
    VlButtonComponent,
    vlIconStyles,
    VlLinkComponent,
    vlLinkStyles,
    VlTitleComponent,
} from '@domg-wc/components/atom';
import { vlMediaScreenSmall, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { vlSideNavigationStyles, vlSideNavigationLightDomStyles } from './vl-side-navigation.component.css';
import {
    resolveHeadingElementsFromCustomToc,
    applyActiveStateToCustomTocLinks,
    applyExpandCollapseToCustomToc,
    initializeCustomTocHiddenState,
    setupCustomTocLinkHandlers,
} from './vl-side-navigation-custom-toc.utils';
import { findHeadings, determineHeadingRootElement } from './vl-side-navigation-scanner.utils';
import {
    headingTableOfContentsTemplate,
    buildHeadingTree,
    findNodeById,
    isAnyChildActive,
} from './vl-side-navigation-renderer.utils';

registerWebComponents([VlButtonComponent, VlLinkComponent, VlTitleComponent]);

@webComponent('vl-side-navigation-next')
export class VlSideNavigationComponent extends BaseLitElement {
    @property({ type: Boolean, reflect: true })
    compact = false;
    @property({ type: String, reflect: true, attribute: 'child-spacing' })
    childSpacing = 'small';
    @property({ type: Array })
    headingElements: HTMLElement[] = [];
    @property({ attribute: false })
    headingRoot?: Element | ShadowRoot | Document | null;
    @property({ type: String, attribute: 'heading-root-selector' })
    headingRootSelector?: string;
    @property({ type: Number, attribute: 'min-level' })
    minLevel = 2;
    @property({ type: Number, attribute: 'max-level' })
    maxLevel = 3;
    @property({ type: Boolean, attribute: 'closed', reflect: true })
    isTableOfContentsHidden = false;
    /**
     * Optionele maximum diepte voor shadow DOM traversal. Gebruikt bij het scannen van headings
     * én bij het zoeken van het scroll-doel (fallback). 0 = enkel light DOM, 1 = light DOM +
     * eerste niveau shadow DOM, undefined = onbeperkt (standaard).
     */
    @property({ type: Number, attribute: 'max-depth' })
    maxDepth?: number;
    /**
     * Comma-separated CSS selectors van elementen om uit te sluiten tijdens het scannen van headings.
     * Elementen die matchen met deze selectors (en hun subtrees) worden overgeslagen.
     * Dit is nuttig voor performance optimalisatie bij grote DOM structuren zoals tabellen of iframes.
     * @example "iframe, table.large-data, .skip-headings"
     */
    @property({ type: String, attribute: 'exclude-selectors' })
    excludeSelectors?: string;
    /**
     * Tekst die getoond wordt als titel boven de inhoudstafel. Standaard: "Op deze pagina".
     */
    @property({ type: String, attribute: 'navigation-title' })
    navigationTitle = 'Op deze pagina';
    @state() private activeHeadingId: string = '';
    @state() private tocTemplate: TemplateResult = html``;
    @state() private hasCustomToc = false;
    @state() private expandedHeadingIds: Set<string> = new Set();
    @state() private isMobileView = false;

    private intersectionObserver?: IntersectionObserver;
    private headingObserverMap = new Map<string, HTMLElement>();
    private tableOfContentsStructure?: ReturnType<typeof findHeadings>;
    private static lightDomStyleSheet?: CSSStyleSheet;
    private isTableOfContentsInitialized = false;
    private mediaQueryList?: MediaQueryList;
    private mediaQueryHandler = (e: MediaQueryListEvent) => this.handleMediaQueryChange(e);
    private focusRecoveryMutationObserver?: MutationObserver;
    private previousTocEffectivelyHidden = false;

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlSideNavigationStyles, vlLinkStyles(), vlIconStyles];
    }

    override firstUpdated(): void {
        this.setupMediaQueryListener();

        const tocSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        const slottedElements = tocSlot?.assignedElements() ?? [];

        if (slottedElements.length > 0) {
            this.initializeCustomToc(slottedElements);
        } else {
            const insideLayout = this.closest?.('vl-side-navigation-layout-next');
            if (insideLayout) {
                this.buildTableOfContents();
                this.setupIntersectionObserver();
            } else {
                requestAnimationFrame(() => {
                    if (!this.isTableOfContentsInitialized) {
                        this.buildTableOfContents();
                        this.setupIntersectionObserver();
                    }
                });
            }
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        // Custom TOC: when headingRoot changes, only re-resolve heading elements by ID; no scan.
        if (changedProperties.has('headingRoot') && this.hasCustomToc) {
            const tocSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
            const slottedElements = tocSlot?.assignedElements() ?? [];
            if (slottedElements.length > 0 && this.headingRoot) {
                this.extractHeadingIdsFromManualToc(slottedElements);
            }
            return;
        }

        // Auto TOC: rebuild when headingRoot is set and TOC not built yet
        if (changedProperties.has('headingRoot') && !this.isTableOfContentsInitialized) {
            const tocSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
            if (tocSlot) {
                const slottedElements = tocSlot.assignedElements();
                if (slottedElements.length > 0 && this.headingRoot) {
                    this.extractHeadingIdsFromManualToc(slottedElements);
                } else {
                    this.refreshTableOfContents();
                }
            } else {
                this.refreshTableOfContents();
            }
        }

        // Auto TOC: rebuild when scan-related attributes change
        if (
            (changedProperties.has('minLevel') ||
                changedProperties.has('maxLevel') ||
                changedProperties.has('headingRootSelector') ||
                changedProperties.has('excludeSelectors')) &&
            this.isTableOfContentsInitialized
        ) {
            this.refreshTableOfContents();
        }

        // When the TOC panel becomes hidden (e.g. viewport resize to mobile), move focus to show button
        const nowHidden = this.isTocEffectivelyHidden;
        if (nowHidden && !this.previousTocEffectivelyHidden) {
            this.updateComplete.then(() => this.handleTocVisibilityFocusRecovery());
        }
        this.previousTocEffectivelyHidden = nowHidden;

        // When expand/collapse or active section changes, if the focused element is now hidden, move to logical neighbor
        if (
            (changedProperties.has('expandedHeadingIds') || changedProperties.has('activeHeadingId')) &&
            this.isFocusInsideNav()
        ) {
            const el = this.getDeepActiveElement() as HTMLElement;
            if (el) {
                const hidden = el.offsetParent === null || el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true';
                if (hidden) {
                    // save a reference to the lost element before we lose it completely or focus moves
                    const lostEl = el;
                    this.updateComplete.then(() => this.moveFocusToLogicalNeighbor(lostEl));
                }
            }
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();
        if (this.isTableOfContentsInitialized && !this.intersectionObserver) {
            this.setupIntersectionObserver();
        }
        this.setupMediaQueryListener();
        this.updateComplete.then(() => this.setupFocusRecoveryObserver());
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.cleanupIntersectionObserver();
        this.cleanupMediaQueryListener();
        this.cleanupFocusRecoveryObserver();
    }

    private setupMediaQueryListener(): void {
        if (this.mediaQueryList) return;
        this.mediaQueryList = window.matchMedia(`(min-width: ${vlMediaScreenSmall + 1}px)`);
        this.isMobileView = !this.mediaQueryList.matches;
        this.mediaQueryList.addEventListener('change', this.mediaQueryHandler);
    }

    private cleanupMediaQueryListener(): void {
        if (this.mediaQueryList) {
            this.mediaQueryList.removeEventListener('change', this.mediaQueryHandler);
            this.mediaQueryList = undefined;
        }
    }

    /**
     * When the TOC panel becomes hidden (e.g. viewport resize to mobile or compact),
     * move focus to the show button so the user does not lose context (focus on body).
     */
    private handleTocVisibilityFocusRecovery(): void {
        if (!this.isTocEffectivelyHidden) return;
        if (!this.isFocusInsideNav()) return;
        const showButton = this.shadowRoot?.querySelector('#show-toc-button') as HTMLElement | null;
        const button = showButton?.shadowRoot?.querySelector('button');
        button?.focus();
    }

    /**
     * Returns all focusable elements (a[href], button) inside the nav in tree order,
     * including slotted content and elements inside shadow roots (e.g. vl-link).
     */
    private getFocusableElementsInNav(): HTMLElement[] {
        const nav = this.shadowRoot?.querySelector('nav');
        if (!nav) return [];
        const focusables: HTMLElement[] = [];
        const slot = nav.querySelector('slot');
        if (slot && slot instanceof HTMLSlotElement) {
            const assigned = slot.assignedElements({ flatten: true });
            for (const el of assigned) {
                this.collectFocusablesInTreeOrder(el, focusables);
            }
        }
        const inNav = nav.querySelectorAll('a[href], button');
        inNav.forEach((el) => {
            if (el instanceof HTMLElement) focusables.push(el);
        });
        return focusables;
    }

    private collectFocusablesInTreeOrder(root: Element, out: HTMLElement[]): void {
        if (root instanceof HTMLElement && (root.matches?.('a[href]') || root.matches?.('button'))) {
            out.push(root);
        }
        const children: Element[] = [];
        if (root instanceof HTMLSlotElement) {
            children.push(...root.assignedElements({ flatten: true }));
        } else if (root.shadowRoot) {
            children.push(...Array.from(root.shadowRoot.children));
        }
        children.push(...Array.from(root.children));
        for (const child of children) {
            this.collectFocusablesInTreeOrder(child, out);
        }
    }

    private getDeepActiveElement(): Element | null {
        if (typeof document === 'undefined') return null;
        let active = document.activeElement;
        while (active && active.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active;
    }

    /**
     * Whether the current focus is inside the TOC nav (shadow content or slotted content).
     */
    private isFocusInsideNav(): boolean {
        const nav = this.shadowRoot?.querySelector('nav');
        if (!nav) return false;
        const active = this.getDeepActiveElement();
        if (!active) return false;
        if (nav.contains(active)) return true;
        const slot = nav.querySelector('slot');
        const assigned = slot instanceof HTMLSlotElement ? slot.assignedElements({ flatten: true }) : [];
        return assigned.some((el) => el === active || el.contains(active));
    }

    /**
     * When the focused element is removed or hidden, move focus to the next or previous
     * visible nav item so screen reader users keep context (WCAG 2.4.3).
     */
    private moveFocusToLogicalNeighbor(lostFocusElement?: HTMLElement): void {
        const focusables = this.getFocusableElementsInNav();
        const visible = focusables.filter(
            (el) =>
                el.offsetParent !== null &&
                !el.hasAttribute('hidden') &&
                el.getAttribute('aria-hidden') !== 'true'
        );
        if (visible.length === 0) {
            const showButton = this.shadowRoot?.querySelector('#show-toc-button') as HTMLElement | null;
            showButton?.shadowRoot?.querySelector('button')?.focus();
            return;
        }

        const focusTarget = (target: HTMLElement) => {
            if (target.tagName.toLowerCase() === 'vl-link') {
                target.shadowRoot?.querySelector('a')?.focus();
            } else {
                target.focus();
            }
        };

        // 1. Try to focus the currently active heading's link
        if (this.activeHeadingId) {
            const activeLink = visible.find((el) => {
                const href = el.getAttribute('href') || el.closest('vl-link')?.getAttribute('href');
                return href === `#${this.activeHeadingId}`;
            });
            if (activeLink) {
                focusTarget(activeLink);
                return;
            }
        }

        // 2. Fallback: find the nearest visible element before or after the lost element
        if (lostFocusElement) {
            const lostIndex = focusables.indexOf(lostFocusElement);
            if (lostIndex !== -1) {
                // Find nearest visible element looking backwards from the lost element
                const before = focusables.slice(0, lostIndex).reverse().find((el) => visible.includes(el));
                if (before) {
                    focusTarget(before);
                    return;
                }
                // If none backwards, look forwards from the lost element
                const after = focusables.slice(lostIndex + 1).find((el) => visible.includes(el));
                if (after) {
                    focusTarget(after);
                    return;
                }
            }
        }

        // 3. Ultimate fallback: first visible item
        focusTarget(visible[0]);
    }

    private setupFocusRecoveryObserver(): void {
        if (this.focusRecoveryMutationObserver) return;
        this.focusRecoveryMutationObserver = new MutationObserver((mutations) => {
            if (typeof document === 'undefined') return;
            const active = this.getDeepActiveElement();
            if (active !== document.body) return; // Only if focus was lost to body
            const nav = this.shadowRoot?.querySelector('nav');
            const removalInOurNav = mutations.some(
                (m) =>
                    m.removedNodes.length > 0 &&
                    (nav?.contains(m.target as Node) || m.target === this)
            );
            if (removalInOurNav) {
                this.moveFocusToLogicalNeighbor();
            }
        });
        const nav = this.shadowRoot?.querySelector('nav');
        if (nav) {
            this.focusRecoveryMutationObserver.observe(nav, { childList: true, subtree: true });
        }
        this.focusRecoveryMutationObserver.observe(this, { childList: true, subtree: true });
    }

    private cleanupFocusRecoveryObserver(): void {
        if (this.focusRecoveryMutationObserver) {
            this.focusRecoveryMutationObserver.disconnect();
            this.focusRecoveryMutationObserver = undefined;
        }
    }

    private handleMediaQueryChange(e: MediaQueryListEvent): void {
        this.isMobileView = !e.matches;
        if (e.matches && this.isTableOfContentsHidden && !this.compact) {
            this.isTableOfContentsHidden = false;
        }
    }

    /**
     * Closed only applies when compact is set or viewport is mobile (< 768px).
     * On desktop without compact, the TOC is always shown regardless of the closed attribute.
     */
    private get isTocEffectivelyHidden(): boolean {
        return (this.compact || this.isMobileView) && this.isTableOfContentsHidden;
    }

    /**
     * Scroll behavior for TOC link navigation. Uses 'auto' when user prefers reduced motion (WCAG 2.3.3).
     */
    private get effectiveScrollBehavior(): ScrollBehavior {
        if (typeof window === 'undefined') return 'smooth';
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    }

    private setupIntersectionObserver(): void {
        this.cleanupIntersectionObserver();

        const observerOptions: IntersectionObserverInit = {
            root: null, // use viewport as root
            rootMargin: '0px 0px -70% 0px',
            threshold: 0,
        };

        this.intersectionObserver = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            observerOptions
        );

        this.headingElements.forEach((element) => {
            const id = element.getAttribute('id');
            if (id) {
                this.headingObserverMap.set(id, element);
                this.intersectionObserver?.observe(element);
            }
        });
    }

    private handleIntersection(entries: IntersectionObserverEntry[]): void {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
            const topMostEntry = visibleEntries.reduce((topMost, current) => {
                return current.boundingClientRect.top < topMost.boundingClientRect.top ? current : topMost;
            });

            const newActiveId = topMostEntry.target.getAttribute('id');
            if (newActiveId && newActiveId !== this.activeHeadingId) {
                this.activeHeadingId = newActiveId;
                this.updateActiveLinks();
            }
        }
    }

    private updateActiveLinks(): void {
        if (this.hasCustomToc) {
            this.updateManualTocActiveStates();
        } else {
            this.updateTableOfContents();
        }

        this.dispatchEvent(
            new CustomEvent('active-heading-changed', {
                detail: { activeHeadingId: this.activeHeadingId },
                bubbles: true,
            })
        );
    }

    private cleanupIntersectionObserver(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = undefined;
        }
        this.headingObserverMap.clear();
    }

    public updateObservedElements(elements: HTMLElement[]): void {
        this.headingElements = elements;
        this.setupIntersectionObserver();
    }

    override render() {
        const isOverlay = this.compact || this.isMobileView;
        return html`
            <table-of-contents
                id="side-navigation-toc"
                part="toc"
                role=${isOverlay ? 'dialog' : 'region'}
                aria-modal=${isOverlay ? 'true' : nothing}
                aria-labelledby="side-navigation-title"
                ?hidden=${this.isTocEffectivelyHidden}
                tabindex="-1"
            >
                <span id="side-navigation-title" class="navigation-title">${this.navigationTitle}</span>
                <vl-button
                    icon="cross"
                    id="close-button"
                    label="sluit inhoudstafel navigatie"
                    aria-controls="side-navigation-toc"
                    @vl-click=${this.closeSideNavigation}
                ></vl-button>
                <nav aria-label="inhoudstafel navigatie">
                    <slot @slotchange=${this.handleTocSlotChange}></slot>
                    ${!this.hasCustomToc ? this.tocTemplate || nothing : nothing}
                </nav>
            </table-of-contents>
            <vl-button
                ?hidden=${!this.isTocEffectivelyHidden}
                icon="drawer-down"
                id="show-toc-button"
                label="toon inhoudstafel navigatie"
                aria-controls="side-navigation-toc"
                aria-expanded=${this.isTocEffectivelyHidden ? 'false' : 'true'}
                @vl-click=${this.showSideNavigation}
            ></vl-button>
        `;
    }

    private handleTocSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const slottedElements = slot.assignedElements();

        if (slottedElements.length > 0) {
            this.initializeCustomToc(slottedElements);
        } else {
            this.hasCustomToc = false;
            this.refreshTableOfContents();
        }
    }

    // ---------- Custom TOC (no heading scan) ----------

    /**
     * Initializes state when the user provides a custom TOC (slot has content).
     * Resolves headings by link IDs only; no DOM scan.
     */
    private initializeCustomToc(slottedElements: Element[]): void {
        this.hasCustomToc = true;
        this.extractHeadingIdsFromManualToc(slottedElements);
        this.adoptLightDomStyles();
        initializeCustomTocHiddenState(slottedElements);
        setupCustomTocLinkHandlers(slottedElements, this.effectiveScrollBehavior);
        this.setupIntersectionObserver();
    }

    private adoptLightDomStyles(): void {
        // create stylesheet once and reuse across all instances
        if (!VlSideNavigationComponent.lightDomStyleSheet) {
            VlSideNavigationComponent.lightDomStyleSheet = new CSSStyleSheet();
            VlSideNavigationComponent.lightDomStyleSheet.replaceSync(vlSideNavigationLightDomStyles.toString());
        }

        // add to document's adopted stylesheets if not already present
        if (!document.adoptedStyleSheets.includes(VlSideNavigationComponent.lightDomStyleSheet)) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                VlSideNavigationComponent.lightDomStyleSheet,
            ];
        }
    }

    private extractHeadingIdsFromManualToc(slottedElements: Element[]): void {
        const rootElement = this.headingRoot ?? (this.getRootNode() as Document | ShadowRoot);
        const headingElements = resolveHeadingElementsFromCustomToc(slottedElements, rootElement);

        if (headingElements.length > 0) {
            this.headingElements = headingElements;
            this.setupIntersectionObserver();
        }
    }

    private updateManualTocActiveStates(): void {
        const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        if (!slot) return;
        const slottedElements = slot.assignedElements();
        applyActiveStateToCustomTocLinks(slottedElements, this.activeHeadingId);
        applyExpandCollapseToCustomToc(slottedElements, this.activeHeadingId);
    }

    private get tableOfContents() {
        return this.shadowRoot?.querySelector('table-of-contents');
    }

    private closeSideNavigation = () => {
        this.isTableOfContentsHidden = true;
        this.updateComplete.then(() => {
            const showButton = this.shadowRoot?.querySelector('#show-toc-button') as HTMLElement;
            showButton?.shadowRoot?.querySelector('button')?.focus();
        });
    };

    private showSideNavigation = () => {
        this.isTableOfContentsHidden = false;
        this.updateComplete.then(() => {
            const toc = this.shadowRoot?.querySelector('#side-navigation-toc') as HTMLElement;
            toc?.focus();
        });
    };

    // ---------- Auto-generated TOC (heading scan) ----------

    private buildTableOfContents(): void {
        const rootElement = determineHeadingRootElement(
            this.headingRoot,
            this.headingRootSelector,
            this.getRootNode() as Document | ShadowRoot
        );

        this.tableOfContentsStructure = findHeadings(rootElement, {
            minLevel: this.minLevel,
            maxLevel: this.maxLevel,
            maxDepth: this.maxDepth,
            excludeSelectors: this.excludeSelectors,
        });

        this.headingElements = this.tableOfContentsStructure.elements;
        this.updateObservedElements(this.headingElements);
        this.updateTableOfContents();
        this.isTableOfContentsInitialized = true;
    }

    private updateTableOfContents(): void {
        if (!this.tableOfContentsStructure) return;

        const rootElement = this.headingRoot ?? (this.getRootNode() as Document | ShadowRoot);
        const tree = buildHeadingTree(this.tableOfContentsStructure.headings);

        // Clean up manual collapses for sections that are no longer active so they auto-expand on next scroll.
        // We only want to keep negative IDs (manual collapses) if their section or a child is still active.
        // If a user scrolls away from a manually collapsed section, we forget the manual collapse
        // so that it will auto-expand the next time the user scrolls back to it. Positive IDs (manual expands) are always kept.
        const stillManualCollapsed = Array.from(this.expandedHeadingIds).filter((id) => {
            if (!id.startsWith('-')) return true;
            const realId = id.substring(1);
            const node = findNodeById(tree, realId);
            const isActive = this.activeHeadingId === realId;
            const isChildActive = node ? isAnyChildActive(node.children, this.activeHeadingId) : false;
            return isActive || isChildActive;
        });
        if (stillManualCollapsed.length !== this.expandedHeadingIds.size) {
            this.expandedHeadingIds = new Set(stillManualCollapsed);
        }

        this.tocTemplate = headingTableOfContentsTemplate(tree, {
            scroll: {
                scrollRoot: rootElement,
                scrollBehavior: this.effectiveScrollBehavior,
                maxDepth: this.maxDepth,
            },
            state: {
                activeHeadingId: this.activeHeadingId,
                expandedHeadingIds: this.expandedHeadingIds,
            },
            callbacks: {
                onActiveHeadingChange: (headingId: string, isToggleOnly?: boolean) => {
                    // toggle children visibility using separate expanded state
                    // active state is managed by IntersectionObserver
                    if (isToggleOnly && this.tableOfContentsStructure) {
                        // determine current visibility state
                        const hasManualToggle = this.expandedHeadingIds.has(headingId);
                        const hasManualCollapse = this.expandedHeadingIds.has(`-${headingId}`);

                        // check if children would be auto-expanded (active or child-active)
                        const isActive = this.activeHeadingId === headingId;

                        // build tree and find the node to check if any children are active
                        const node = findNodeById(tree, headingId);
                        const isChildActive = node ? isAnyChildActive(node.children, this.activeHeadingId) : false;

                        const wouldBeAutoExpanded = isActive || isChildActive;

                        // toggle logic:
                        // - if manually expanded: remove manual expand (and add manual collapse if active so it closes immediately)
                        // - if manually collapsed: remove manual collapse and add manual expand
                        // - if auto-expanded: add manual collapse (negative ID)
                        // - if not showing: add manual expand (positive ID)
                        if (hasManualToggle) {
                            this.expandedHeadingIds.delete(headingId);
                            if (wouldBeAutoExpanded) {
                                this.expandedHeadingIds.add(`-${headingId}`);
                            }
                        } else if (hasManualCollapse) {
                            this.expandedHeadingIds.delete(`-${headingId}`);
                            this.expandedHeadingIds.add(headingId);
                        } else if (wouldBeAutoExpanded) {
                            this.expandedHeadingIds.add(`-${headingId}`);
                        } else {
                            this.expandedHeadingIds.add(headingId);
                        }

                        // create new Set to trigger reactivity
                        this.expandedHeadingIds = new Set(this.expandedHeadingIds);
                        this.updateTableOfContents();
                    }
                },
            },
        });
    }

    /**
     * refresht de table of contents de DOM opnieuw te scanning voor headings
     */
    public refreshTableOfContents(): void {
        this.tableOfContentsStructure = undefined; // clear cache
        this.isTableOfContentsInitialized = false; // reset flag to allow rebuild
        this.buildTableOfContents();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-next': VlSideNavigationComponent;
    }
}
