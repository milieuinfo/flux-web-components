import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import {
    VlButtonComponent,
    VlIconComponent,
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
    pruneStaleManualCollapses,
    RenderConfig,
    toggleHeadingExpandState,
} from './vl-side-navigation-renderer.utils';
import { VlSideNavigationSectionComponent } from './vl-side-navigation-section.component';
import {
    AutoSectionScan,
    detectSideNavigationMode,
    ensureAutoSectionListContainer,
    ensureSectionTitleElement,
    isSectionElement,
    ParentScanConfig,
    renderAutoSection,
    resolveScanConfigForSection,
    scanAutoSection,
    SideNavigationMode,
    warnOnDuplicateAutoSectionHeadings,
    wireSectionLabel,
} from './vl-side-navigation-sections.utils';

registerWebComponents([
    VlButtonComponent,
    VlIconComponent,
    VlLinkComponent,
    VlTitleComponent,
    VlSideNavigationSectionComponent,
]);

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
    /**
     * Markeer alle items waarvan content zichtbaar is als actief, in plaats van enkel het bovenste.
     */
    @property({ type: Boolean, reflect: true, attribute: 'multi-active' })
    multiActive = false;
    @state() private activeHeadingId: string = '';
    @state() private activeHeadingIds: Set<string> = new Set();
    @state() private tocTemplate: TemplateResult = html``;
    @state() private hasCustomToc = false;
    @state() private expandedHeadingIds: Set<string> = new Set();
    @state() private isMobileView = false;
    @state() private mode: SideNavigationMode = 'auto';
    private autoSectionScans: AutoSectionScan[] = [];
    private sectionsRescanRafHandle?: number;

    private intersectionObserver?: IntersectionObserver;
    private headingObserverMap = new Map<string, HTMLElement>();
    private tableOfContentsStructure?: ReturnType<typeof findHeadings>;
    private static lightDomStyleSheet?: CSSStyleSheet;
    private isTableOfContentsInitialized = false;
    private mediaQueryList?: MediaQueryList;
    private mediaQueryHandler = (e: MediaQueryListEvent) => this.handleMediaQueryChange(e);
    private customTocAbortController?: AbortController;
    private focusRecoveryMutationObserver?: MutationObserver;
    private lastFocusedNavElement?: WeakRef<HTMLElement>;
    private previousTocEffectivelyHidden = false;
    private navResizeObserver?: ResizeObserver;

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlSideNavigationStyles, vlLinkStyles()];
    }

    override firstUpdated(): void {
        this.setupMediaQueryListener();
        this.setupNavResizeObserver();

        const tocSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        const slottedElements = tocSlot?.assignedElements() ?? [];

        this.mode = detectSideNavigationMode(slottedElements);

        if (this.mode === 'sections') {
            this.initializeSections(slottedElements);
            // Auto-secties kunnen pas correct scannen wanneer de heading-root in de DOM
            // beschikbaar is (siblings zijn er niet altijd op firstUpdated-tijd).
            const hasAutoSection = slottedElements.some(
                (el) => isSectionElement(el) && el.type === 'auto'
            );
            if (hasAutoSection) {
                this.sectionsRescanRafHandle = requestAnimationFrame(() => {
                    this.sectionsRescanRafHandle = undefined;
                    if (this.mode !== 'sections') return;
                    const currentSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
                    this.refreshSections(currentSlot?.assignedElements() ?? []);
                });
            }
        } else if (this.mode === 'custom') {
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
        // Sections-mode: bij een parent-config wijziging herscannen en alle auto-secties opnieuw renderen.
        if (
            this.mode === 'sections' &&
            (changedProperties.has('headingRoot') ||
                changedProperties.has('minLevel') ||
                changedProperties.has('maxLevel') ||
                changedProperties.has('headingRootSelector') ||
                changedProperties.has('maxDepth') ||
                changedProperties.has('excludeSelectors'))
        ) {
            const tocSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
            const slottedElements = tocSlot?.assignedElements() ?? [];
            this.refreshSections(slottedElements);
            return;
        }

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

        // Reposition the continuous multi-active line when anything that affects its span changes
        if (
            changedProperties.has('activeHeadingIds') ||
            changedProperties.has('expandedHeadingIds') ||
            changedProperties.has('multiActive') ||
            changedProperties.has('isMobileView') ||
            changedProperties.has('isTableOfContentsHidden') ||
            changedProperties.has('tocTemplate')
        ) {
            this.updateComplete.then(() => this.updateActiveIndicatorLine());
        }

        // When the TOC panel becomes hidden (e.g. viewport resize to mobile), move focus to show button
        const nowHidden = this.isTocEffectivelyHidden;
        if (nowHidden && !this.previousTocEffectivelyHidden) {
            this.updateComplete.then(() => this.handleTocVisibilityFocusRecovery());
        }
        this.previousTocEffectivelyHidden = nowHidden;

        // When expand/collapse or active section changes, if the focused element is now hidden, move to logical neighbor
        if (
            (changedProperties.has('expandedHeadingIds') ||
                changedProperties.has('activeHeadingId') ||
                changedProperties.has('activeHeadingIds')) &&
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
        this.updateComplete.then(() => {
            this.setupFocusRecoveryObserver();
            this.setupNavResizeObserver();
        });
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this.sectionsRescanRafHandle !== undefined) {
            cancelAnimationFrame(this.sectionsRescanRafHandle);
            this.sectionsRescanRafHandle = undefined;
        }
        this.cleanupIntersectionObserver();
        this.cleanupMediaQueryListener();
        this.cleanupFocusRecoveryObserver();
        this.cleanupCustomTocLinkHandlers();
        this.cleanupNavResizeObserver();
    }

    /**
     * Repositions the continuous multi-active line whenever the nav resizes (responsive wrapping,
     * font load, expand/collapse changing item heights). Cheap: it only runs when multi-active is on.
     */
    private setupNavResizeObserver(): void {
        if (this.navResizeObserver || typeof ResizeObserver === 'undefined') return;
        const nav = this.shadowRoot?.querySelector('nav');
        if (!nav) return;
        this.navResizeObserver = new ResizeObserver(() => this.updateActiveIndicatorLine());
        this.navResizeObserver.observe(nav);
    }

    private cleanupNavResizeObserver(): void {
        this.navResizeObserver?.disconnect();
        this.navResizeObserver = undefined;
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

    private cleanupCustomTocLinkHandlers(): void {
        this.customTocAbortController?.abort();
        this.customTocAbortController = undefined;
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

        // Track the last focused element inside the nav so we can detect when a removal causes focus loss
        const trackFocus = () => {
            if (this.isFocusInsideNav()) {
                const el = this.getDeepActiveElement() as HTMLElement | null;
                this.lastFocusedNavElement = el ? new WeakRef(el) : undefined;
            }
        };
        this.shadowRoot?.addEventListener('focusin', trackFocus);
        this.addEventListener('focusin', trackFocus);

        this.focusRecoveryMutationObserver = new MutationObserver((mutations) => {
            if (typeof document === 'undefined') return;
            const active = this.getDeepActiveElement();
            if (active !== document.body) return; // Only if focus was lost to body

            // Only recover if a previously focused nav element was removed
            const lastFocused = this.lastFocusedNavElement?.deref();
            if (!lastFocused) return;

            const removedFocusedElement = mutations.some((m) =>
                Array.from(m.removedNodes).some(
                    (node) => node === lastFocused || node.contains(lastFocused)
                )
            );
            if (removedFocusedElement) {
                this.lastFocusedNavElement = undefined;
                this.moveFocusToLogicalNeighbor(lastFocused);
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
            // Multi-active needs the full viewport so a section whose heading scrolled just above
            // the top (but whose content is still visible) keeps triggering recomputation; single-active
            // keeps the -70% detection line that highlights the top-most heading only.
            rootMargin: this.multiActive ? '0px' : '0px 0px -70% 0px',
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
        if (this.multiActive) {
            this.updateActiveSections();
            return;
        }

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
            const topMostEntry = visibleEntries.reduce((topMost, current) => {
                return current.boundingClientRect.top < topMost.boundingClientRect.top ? current : topMost;
            });

            const newActiveId = topMostEntry.target.getAttribute('id');
            if (newActiveId && newActiveId !== this.activeHeadingId) {
                this.activeHeadingId = newActiveId;
                this.activeHeadingIds = new Set([newActiveId]);
                this.updateActiveLinks();
            }
        }
    }

    /**
     * Multi-active: a section spans from its heading to the next heading. A section is active when that
     * range overlaps the viewport, so every section with visible content is marked active - including the
     * last one once the page is scrolled to the bottom. Recomputed from heading positions on each observer
     * callback (the set only changes when a heading crosses a viewport edge, which is what fires the observer).
     */
    private updateActiveSections(): void {
        if (typeof window === 'undefined') return;

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const orderedIds = this.headingElements
            .map((element) => ({ id: element.getAttribute('id') ?? '', top: element.getBoundingClientRect().top }))
            .filter((entry) => entry.id)
            .sort((a, b) => a.top - b.top);

        const visibleIds = new Set<string>();
        orderedIds.forEach((entry, index) => {
            const sectionTop = entry.top;
            const sectionBottom = index + 1 < orderedIds.length ? orderedIds[index + 1].top : Infinity;
            if (sectionTop < viewportHeight && sectionBottom > 0) {
                visibleIds.add(entry.id);
            }
        });

        if (this.areSameIds(visibleIds, this.activeHeadingIds)) return;

        this.activeHeadingId = orderedIds.find((entry) => visibleIds.has(entry.id))?.id ?? '';
        this.activeHeadingIds = visibleIds;
        this.updateActiveLinks();
    }

    private areSameIds(a: Set<string>, b: Set<string>): boolean {
        if (a.size !== b.size) return false;
        for (const id of a) {
            if (!b.has(id)) return false;
        }
        return true;
    }

    private updateActiveLinks(): void {
        if (this.mode === 'sections') {
            this.updateSectionsActiveStates();
        } else if (this.hasCustomToc) {
            this.updateManualTocActiveStates();
        } else {
            this.updateTableOfContents();
        }

        const orderedActiveIds = this.headingElements
            .map((element) => element.getAttribute('id'))
            .filter((id): id is string => !!id && this.activeHeadingIds.has(id));

        this.dispatchEvent(
            new CustomEvent('active-heading-changed', {
                detail: { activeHeadingId: this.activeHeadingId, activeHeadingIds: orderedActiveIds },
                bubbles: true,
            })
        );
        // The continuous multi-active line is repositioned from updated() when activeHeadingIds changes.
    }

    private updateActiveIndicatorLine(): void {
        const nav = this.shadowRoot?.querySelector('nav');
        const primary = nav?.querySelector('.active-indicator-line') as HTMLElement | null;
        const extras = nav?.querySelector('.active-indicator-line-extras') as HTMLElement | null;
        if (!nav || !primary || !extras) return;

        extras.replaceChildren();

        if (!this.multiActive || this.activeHeadingIds.size === 0 || this.isTocEffectivelyHidden) {
            primary.style.display = 'none';
            return;
        }

        const navRect = nav.getBoundingClientRect();
        const segments = this.getActiveLinkRuns()
            .map((run) => {
                const rects = run.map((el) => el.getBoundingClientRect()).filter((rect) => rect.height > 0);
                if (rects.length === 0) return null;
                const top = Math.min(...rects.map((rect) => rect.top));
                const bottom = Math.max(...rects.map((rect) => rect.bottom));
                return { top: top - navRect.top + nav.scrollTop, height: bottom - top };
            })
            .filter((segment): segment is { top: number; height: number } => segment !== null);

        if (segments.length === 0) {
            primary.style.display = 'none';
            return;
        }

        this.positionIndicatorSegment(primary, segments[0]);
        for (const segment of segments.slice(1)) {
            const extra = document.createElement('div');
            extra.className = 'active-indicator-line';
            extra.setAttribute('aria-hidden', 'true');
            this.positionIndicatorSegment(extra, segment);
            extras.appendChild(extra);
        }
    }

    private positionIndicatorSegment(el: HTMLElement, segment: { top: number; height: number }): void {
        el.style.top = `${segment.top}px`;
        el.style.height = `${segment.height}px`;
        el.style.display = 'block';
    }

    private getActiveLinkRuns(): HTMLElement[][] {
        return this.getNavSectionRoots()
            .map((root) => Array.from(root.querySelectorAll<HTMLElement>('a.active, vl-link.active')))
            .filter((links) => links.length > 0);
    }

    private getNavSectionRoots(): Element[] {
        if (this.hasCustomToc) {
            const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
            return slot?.assignedElements() ?? [];
        }
        const nav = this.shadowRoot?.querySelector('nav');
        return nav ? [nav] : [];
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
                    <div class="active-indicator-line" aria-hidden="true"></div>
                    <div class="active-indicator-line-extras" aria-hidden="true"></div>
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
        if (this.sectionsRescanRafHandle !== undefined) {
            cancelAnimationFrame(this.sectionsRescanRafHandle);
            this.sectionsRescanRafHandle = undefined;
        }

        const slot = event.target as HTMLSlotElement;
        const slottedElements = slot.assignedElements();

        const previousMode = this.mode;
        this.mode = detectSideNavigationMode(slottedElements);

        if (this.mode === 'sections') {
            this.initializeSections(slottedElements);
        } else {
            // Weg uit sections-mode (naar custom of auto): auto-sectie state opruimen vóór rebuild.
            if (previousMode === 'sections') {
                this.cleanupSectionsState();
            }
            if (this.mode === 'custom') {
                this.initializeCustomToc(slottedElements);
            } else {
                this.hasCustomToc = false;
                this.refreshTableOfContents();
            }
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
        const scrollRoot = this.headingRoot ?? (this.getRootNode() as Document | ShadowRoot);
        // abort any previously attached handlers (e.g. on slot mutation / re-init) before re-binding
        this.cleanupCustomTocLinkHandlers();
        this.customTocAbortController = new AbortController();
        setupCustomTocLinkHandlers(
            slottedElements,
            this.effectiveScrollBehavior,
            scrollRoot,
            this.maxDepth,
            this.customTocAbortController.signal
        );
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
        const headingElements = resolveHeadingElementsFromCustomToc(slottedElements, rootElement, this.maxDepth);

        if (headingElements.length > 0) {
            this.headingElements = headingElements;
            this.setupIntersectionObserver();
        }
    }

    private updateManualTocActiveStates(): void {
        const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        if (!slot) return;
        const slottedElements = slot.assignedElements();
        applyActiveStateToCustomTocLinks(slottedElements, this.activeHeadingIds);
        applyExpandCollapseToCustomToc(slottedElements, this.activeHeadingIds);
    }

    // ---------- Sections-mode (auto + custom interleaved) ----------

    // Hergebruikt `hasCustomToc=true` om de auto-TOC template te onderdrukken;
    // de visuele rendering komt uit de slotted secties (light DOM) + gegenereerde
    // lijsten per auto-sectie.
    private initializeSections(slottedElements: Element[]): void {
        this.hasCustomToc = true;
        this.adoptLightDomStyles();
        this.refreshSections(slottedElements);
    }

    private refreshSections(slottedElements: Element[]): void {
        this.autoSectionScans = [];

        const customContainers = slottedElements.filter(
            (el) => !isSectionElement(el) || el.type !== 'auto'
        );
        initializeCustomTocHiddenState(customContainers);

        const scrollRoot = this.headingRoot ?? (this.getRootNode() as Document | ShadowRoot);
        this.cleanupCustomTocLinkHandlers();
        this.customTocAbortController = new AbortController();
        setupCustomTocLinkHandlers(
            customContainers,
            this.effectiveScrollBehavior,
            scrollRoot,
            this.maxDepth,
            this.customTocAbortController.signal
        );

        for (const el of slottedElements) {
            if (isSectionElement(el)) {
                ensureSectionTitleElement(el);
                if (el.type === 'auto') this.scanAndRenderAutoSection(el);
                wireSectionLabel(el);
            }
        }

        warnOnDuplicateAutoSectionHeadings(this.autoSectionScans);

        this.headingElements = this.collectAllSectionHeadingElements(slottedElements);
        this.setupIntersectionObserver();
    }

    private scanAndRenderAutoSection(section: VlSideNavigationSectionComponent): void {
        const parentConfig = this.getParentScanConfig();
        const result = scanAutoSection(section, parentConfig);
        const renderConfig = this.buildSectionRenderConfig(section, parentConfig);
        renderAutoSection(section, result.headings, renderConfig);
        this.autoSectionScans.push({ section, result });
    }

    private buildSectionRenderConfig(
        section: VlSideNavigationSectionComponent,
        parentConfig: ReturnType<VlSideNavigationComponent['getParentScanConfig']>
    ): RenderConfig {
        const resolved = resolveScanConfigForSection(section, parentConfig);
        return {
            scroll: {
                scrollRoot: resolved.rootElement,
                scrollBehavior: this.effectiveScrollBehavior,
                maxDepth: resolved.maxDepth,
            },
            state: {
                activeHeadingIds: this.activeHeadingIds,
                expandedHeadingIds: this.expandedHeadingIds,
            },
            callbacks: {
                onActiveHeadingChange: (headingId: string, isToggleOnly?: boolean) =>
                    this.handleAutoSectionToggle(headingId, isToggleOnly),
            },
        };
    }

    private handleAutoSectionToggle(headingId: string, isToggleOnly?: boolean): void {
        if (!isToggleOnly) return;
        // Combineer trees van alle auto-secties om de actief-status van children te bepalen.
        const combinedHeadings = this.autoSectionScans.flatMap((scan) => scan.result.headings);
        const tree = buildHeadingTree(combinedHeadings);
        this.expandedHeadingIds = toggleHeadingExpandState(
            this.expandedHeadingIds,
            headingId,
            tree,
            this.activeHeadingIds
        );
        this.rerenderAutoSections();
    }

    private updateSectionsActiveStates(): void {
        const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        if (!slot) return;
        // Auto-secties beheren active/expand via hun Lit-render (rerenderAutoSections); de
        // custom-toc helpers gelden enkel voor custom-secties en losse content.
        const customContainers = slot
            .assignedElements()
            .filter((el) => !isSectionElement(el) || el.type !== 'auto');
        applyActiveStateToCustomTocLinks(customContainers, this.activeHeadingIds);
        applyExpandCollapseToCustomToc(customContainers, this.activeHeadingIds);
        this.rerenderAutoSections();
    }

    /** Re-render zonder herscan; voor herscan: `refreshSections`. */
    private rerenderAutoSections(): void {
        const combinedTree = buildHeadingTree(this.autoSectionScans.flatMap((scan) => scan.result.headings));
        this.expandedHeadingIds = pruneStaleManualCollapses(this.expandedHeadingIds, combinedTree, this.activeHeadingIds);

        const parentConfig = this.getParentScanConfig();
        for (const scan of this.autoSectionScans) {
            const renderConfig = this.buildSectionRenderConfig(scan.section, parentConfig);
            renderAutoSection(scan.section, scan.result.headings, renderConfig);
        }
    }

    /**
     * Aggregeert de elementen die door de IntersectionObserver gevolgd worden:
     * gescande headings uit auto-secties + via link-href IDs geresolved headings
     * uit custom-secties en losse content.
     */
    private collectAllSectionHeadingElements(slottedElements: Element[]): HTMLElement[] {
        const seen = new Set<HTMLElement>();
        const ordered: HTMLElement[] = [];

        for (const scan of this.autoSectionScans) {
            for (const el of scan.result.elements) {
                if (!seen.has(el)) {
                    seen.add(el);
                    ordered.push(el);
                }
            }
        }

        const rootElement = this.headingRoot ?? (this.getRootNode() as Document | ShadowRoot);
        const customContainers: Element[] = slottedElements.filter(
            (el) => !isSectionElement(el) || (el as VlSideNavigationSectionComponent).type !== 'auto'
        );
        const fromCustom = resolveHeadingElementsFromCustomToc(customContainers, rootElement, this.maxDepth);
        for (const el of fromCustom) {
            if (!seen.has(el)) {
                seen.add(el);
                ordered.push(el);
            }
        }
        return ordered;
    }

    private getParentScanConfig(): ParentScanConfig {
        return {
            minLevel: this.minLevel,
            maxLevel: this.maxLevel,
            headingRoot: this.headingRoot,
            headingRootSelector: this.headingRootSelector,
            maxDepth: this.maxDepth,
            excludeSelectors: this.excludeSelectors,
            fallbackRoot: this.getRootNode() as Document | ShadowRoot,
        };
    }

    /** Bij mode-switch weg uit sections-mode: leeg de auto-sectie containers. */
    private cleanupSectionsState(): void {
        for (const scan of this.autoSectionScans) {
            const container = ensureAutoSectionListContainer(scan.section);
            container.replaceChildren();
        }
        this.autoSectionScans = [];
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

        this.expandedHeadingIds = pruneStaleManualCollapses(this.expandedHeadingIds, tree, this.activeHeadingIds);

        this.tocTemplate = headingTableOfContentsTemplate(tree, {
            scroll: {
                scrollRoot: rootElement,
                scrollBehavior: this.effectiveScrollBehavior,
                maxDepth: this.maxDepth,
            },
            state: {
                activeHeadingIds: this.activeHeadingIds,
                expandedHeadingIds: this.expandedHeadingIds,
            },
            callbacks: {
                onActiveHeadingChange: (headingId: string, isToggleOnly?: boolean) => {
                    // active state wordt gestuurd door de IntersectionObserver; deze callback
                    // is enkel voor de manuele toggle-knop.
                    if (isToggleOnly && this.tableOfContentsStructure) {
                        this.expandedHeadingIds = toggleHeadingExpandState(
                            this.expandedHeadingIds,
                            headingId,
                            tree,
                            this.activeHeadingIds
                        );
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
