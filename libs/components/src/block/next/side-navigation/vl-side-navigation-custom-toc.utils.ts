import { extractHeadingIdsFromLinks, findHeadingElementById } from './vl-side-navigation-scanner.utils';

type ScrollRoot = Element | ShadowRoot | Document;

/**
 * Resolves heading elements to observe when using a custom table of contents.
 * Extracts anchor IDs from links in the slotted TOC (a[href^="#"], vl-link[href^="#"])
 * and finds the corresponding heading elements within the given root.
 *
 * @param slottedElements - Elements assigned to the TOC slot (e.g. <ul>, fragment children)
 * @param root - Root to search for heading elements (document, shadow root, or container element)
 * @returns Array of heading elements that exist in the DOM, in link order
 */
export function resolveHeadingElementsFromCustomToc(
    slottedElements: Element[],
    root: Element | ShadowRoot | Document
): HTMLElement[] {
    const headingIds = extractHeadingIdsFromLinks(slottedElements);
    if (headingIds.length === 0) return [];

    return headingIds
        .map((id) => findHeadingElementById(id, root))
        .filter((el): el is HTMLElement => el !== null);
}

/**
 * Toggles the visibility of a nested `<ul>` element in a custom TOC.
 * This function is designed to be used as a click handler for toggle buttons.
 *
 * @param event - The click event from the toggle button
 */
export function toggleCustomTocChildren(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    const li = button.closest('li');
    const nestedUl = li?.querySelector(':scope > ul');

    if (!nestedUl) return;

    const isHidden = nestedUl.hasAttribute('hidden');

    if (isHidden) {
        nestedUl.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-label', 'Inklappen');
        // Rotate icon if using vl-button with icon
        button.classList.add('showing-children');
    } else {
        nestedUl.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Uitklappen');
        button.classList.remove('showing-children');
    }
}

/**
 * Handles click events on anchor links in the custom TOC.
 * Prevents the default browser anchor navigation (which moves focus to the target)
 * and instead manually scrolls to the target while keeping focus on the link.
 * This preserves keyboard navigation context for accessibility.
 *
 * @param event - The click event from the anchor link
 * @param scrollBehavior - The scroll behavior to use ('smooth' or 'auto')
 * @param scrollRoot - Root to resolve the heading element from (pierces shadow DOM / slotted content)
 */
function handleCustomTocLinkClick(
    event: Event,
    scrollBehavior: ScrollBehavior = 'smooth',
    scrollRoot: ScrollRoot = document
): void {
    const link = event.currentTarget as HTMLElement;
    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#')) return;

    const targetId = href.substring(1);
    if (!targetId) return;

    // Resolve through shadow DOM so headings rendered inside web components are reachable.
    const targetElement = findHeadingElementById(targetId, scrollRoot);
    if (!targetElement) return;

    // Prevent default anchor navigation which moves focus to target
    event.preventDefault();

    // Update the URL hash without triggering navigation
    history.pushState(null, '', href);

    // Scroll to the target element
    targetElement.scrollIntoView({ behavior: scrollBehavior, block: 'start' });

    // Focus remains on the link (no explicit action needed since we prevented default)
}

/**
 * Sets up click handlers on anchor links in the custom TOC to preserve focus
 * when navigating to anchors. This is important for keyboard accessibility -
 * without this, pressing Enter on a link would move focus to the target heading,
 * potentially causing the link's parent section to collapse and lose keyboard context.
 *
 * @param slottedElements - Elements assigned to the TOC slot (e.g. <ul>, fragment children)
 * @param scrollBehavior - The scroll behavior to use ('smooth' or 'auto')
 * @param scrollRoot - Root to resolve heading elements from (pierces shadow DOM / slotted content)
 */
export function setupCustomTocLinkHandlers(
    slottedElements: Element[],
    scrollBehavior: ScrollBehavior = 'smooth',
    scrollRoot: ScrollRoot = document
): void {
    slottedElements.forEach((element) => {
        const links = element.querySelectorAll('a[href^="#"], vl-link[href^="#"]');
        links.forEach((link) => {
            // For vl-link, we need to handle clicks on the shadow DOM anchor
            if (link.tagName.toLowerCase() === 'vl-link') {
                const shadowAnchor = link.shadowRoot?.querySelector('a');
                if (shadowAnchor) {
                    shadowAnchor.addEventListener('click', (e) =>
                        handleCustomTocLinkClick(e, scrollBehavior, scrollRoot)
                    );
                }
            } else {
                // For regular anchor elements
                link.addEventListener('click', (e) => handleCustomTocLinkClick(e, scrollBehavior, scrollRoot));
            }
        });
    });
}

/**
 * Initializes all nested `<ul>` elements in a custom TOC as hidden.
 * This should be called once when the custom TOC is first rendered.
 * The `applyExpandCollapseToCustomToc` function will then show/hide
 * sections based on scroll position.
 *
 * @param slottedElements - Elements assigned to the TOC slot (e.g. <ul>, fragment children)
 */
export function initializeCustomTocHiddenState(slottedElements: Element[]): void {
    slottedElements.forEach((element) => {
        // Find all nested ul elements (not the root ul)
        const nestedUls = element.querySelectorAll('li > ul');
        nestedUls.forEach((ul) => {
            ul.setAttribute('hidden', '');
        });

        // Find all toggle buttons and set their initial state
        const toggleButtons = element.querySelectorAll('.toggle-button');
        toggleButtons.forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Uitklappen');
            button.classList.remove('showing-children');
        });
    });
}

/**
 * Applies active state (class and aria-current) to links in a custom TOC based on the
 * current active heading ID. Used so scroll position is reflected in the custom TOC.
 *
 * @param slottedElements - Elements assigned to the TOC slot
 * @param activeHeadingId - ID of the heading currently considered active (e.g. from IntersectionObserver)
 */
export function applyActiveStateToCustomTocLinks(
    slottedElements: Element[],
    activeHeadingId: string
): void {
    slottedElements.forEach((element) => {
        const links = element.querySelectorAll('a[href^="#"], vl-link[href^="#"]');
        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href) {
                const id = href.substring(1);
                if (id === activeHeadingId) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
            }
        });
    });
}

/**
 * Finds the link element (a or vl-link) with the given href in the slotted subtree.
 */
function findLinkByHeadingId(containers: Element[], headingId: string): Element | null {
    for (const container of containers) {
        const links = container.querySelectorAll('a[href^="#"], vl-link[href^="#"]');
        for (const link of Array.from(links)) {
            const href = link.getAttribute('href');
            if (href && href.substring(1) === headingId) {
                return link;
            }
        }
    }
    return null;
}

/**
 * Collects the set of ancestor <ul> elements from a link up to the TOC root.
 * Used to determine which sections to expand when the given link is active.
 */
function getAncestorUlsForLink(link: Element): Set<HTMLUListElement> {
    const pathUls = new Set<HTMLUListElement>();
    let li: Element | null = link.closest('li');
    while (li) {
        const ul = li.parentElement;
        if (ul && ul.tagName === 'UL') {
            pathUls.add(ul as HTMLUListElement);
            li = ul.parentElement?.closest('li') ?? null;
        } else {
            break;
        }
    }
    return pathUls;
}

/**
 * Returns the section link for a nested <ul> (the link in the parent <li> that heads this section).
 */
function getSectionLinkForUl(ul: Element): Element | null {
    const li = ul.parentElement;
    if (!li || li.tagName !== 'LI') return null;
    const nestedUl = li.querySelector(':scope > ul');
    const links = li.querySelectorAll('a[href^="#"], vl-link[href^="#"]');
    return Array.from(links).find((l) => !nestedUl?.contains(l)) ?? null;
}

/**
 * Applies expand/collapse state to nested `<ul>` elements in a custom TOC based on the
 * current active heading. The TOC markup is the source of truth: ancestor branches of
 * the active link are expanded, plus the active link's own section (so its children
 * stay visible and in tab order); all other nested sections stay collapsed.
 *
 * @param slottedElements - Elements assigned to the TOC slot (e.g. <ul>, fragment children)
 * @param activeHeadingId - ID of the heading currently considered active (e.g. from IntersectionObserver)
 */
export function applyExpandCollapseToCustomToc(slottedElements: Element[], activeHeadingId: string): void {
    const activeLink = findLinkByHeadingId(slottedElements, activeHeadingId);
    const pathUls = activeLink ? getAncestorUlsForLink(activeLink) : new Set<HTMLUListElement>();

    // Also expand the active link's own section (its li's direct child ul) so nested links stay visible and in tab order
    if (activeLink) {
        const activeLi = activeLink.closest('li');
        const activeSectionUl = activeLi?.querySelector(':scope > ul');
        if (activeSectionUl) {
            pathUls.add(activeSectionUl as HTMLUListElement);
        }
    }

    for (const root of slottedElements) {
        const nestedUls = root.querySelectorAll('li > ul');
        nestedUls.forEach((ul) => {
            // keep sections visible if on the active path or currently contain focus
            const isOnActivePath = pathUls.has(ul as HTMLUListElement);
            const containsFocusedElement =
                typeof document !== 'undefined' && document.activeElement
                    ? ul.contains(document.activeElement)
                    : false;
            const shouldShow = isOnActivePath || containsFocusedElement;
            if (shouldShow) {
                ul.removeAttribute('hidden');
            } else {
                ul.setAttribute('hidden', '');
            }

            const li = ul.parentElement;
            const toggleButton = li?.querySelector(':scope > .nav-item-wrapper > .toggle-button');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', String(shouldShow));
                toggleButton.setAttribute('aria-label', shouldShow ? 'Inklappen' : 'Uitklappen');
                if (shouldShow) {
                    toggleButton.classList.add('showing-children');
                } else {
                    toggleButton.classList.remove('showing-children');
                }
            }
        });
    }
}
