import { findElementsThroughShadowRoot } from '@domg-wc/common';
import { HeadingItem, HeadingResult } from './vl-side-navigation.model';

export const findHeadings = (
    rootElement: Element | ShadowRoot | Document | null,
    {
        selector = 'vl-title, h1, h2, h3, h4, h5, h6',
        minLevel = 1,
        maxLevel = 6,
        maxDepth,
        excludeSelectors,
    }: {
        selector?: string;
        minLevel?: number;
        maxLevel?: number;
        maxDepth?: number;
        excludeSelectors?: string;
    }
): HeadingResult => {
    if (!rootElement) {
        return { elements: [], headings: [] };
    }

    // normalize to numbers so attribute/string values are handled (e.g. max-level="2")
    const minLevelNum = Math.max(1, Math.min(6, Number(minLevel) || 1));
    const maxLevelNum = Math.max(1, Math.min(6, Number(maxLevel) || 6));

    const headings = findElementsThroughShadowRoot(rootElement, selector, maxDepth, 0, excludeSelectors);

    // filter out elements that are inside shadow DOM of vl-title
    // (vl-title renders h1-h6 in its shadow DOM, but the ID is on vl-title itself)
    const filteredHeadings = headings.filter((el): el is HTMLElement => {
        if (!(el instanceof HTMLElement)) return false;

        // check if element is inside a shadow root
        const root = el.getRootNode();
        if (root instanceof ShadowRoot && root.host) {
            // always skip elements inside vl-title's shadow DOM
            if (root.host.tagName.toLowerCase() === 'vl-title') {
                return false;
            }
        }

        return true;
    });

    const headingLevels = filteredHeadings
        .map((element) => ({ element, level: getHeadingLevel(element) }))
        .filter(({ level }) => level !== null && level >= minLevelNum && level <= maxLevelNum) as {
        element: HTMLElement;
        level: number;
    }[];

    const seenIds = new Map<string, HeadingItem>();

    headingLevels.forEach(({ element, level }) => {
        const text = getHeadingText(element);
        const id = element.getAttribute('id')?.trim() ?? '';

        if (!id) {
            return;
        }
        if (!seenIds.has(id)) {
            seenIds.set(id, {
                element,
                level,
                text,
                id,
            });
        }
    });

    const headingItems = Array.from(seenIds.values());
    sortHeadingItemsByDocumentOrder(headingItems);

    return {
        elements: headingItems.map(({ element }) => element),
        headings: headingItems,
    };
};

const getHeadingText = (element: HTMLElement): string => collectNodeText(element);

const normalizeText = (text?: string | null): string => (text ?? '').replace(/\s+/g, ' ').trim();

const collectNodeText = (node: Node, visited = new Set<Node>()): string => {
    if (visited.has(node)) {
        return '';
    }
    visited.add(node);

    if (node.nodeType === Node.TEXT_NODE) {
        return normalizeText(node.textContent);
    }

    if (!(node instanceof Element || node instanceof ShadowRoot)) {
        return '';
    }

    const fragments: string[] = [];
    // If an element has a shadow root, only read its rendered (shadow) tree.
    // Do NOT also traverse light DOM children: some components (e.g. vl-typography) copy their
    // light DOM content into the shadow DOM without using a <slot>, so reading both would
    // produce duplicate text (e.g. "Ontwerpprincipes Ontwerpprincipes").
    if (node instanceof Element && node.shadowRoot) {
        const text = collectNodeText(node.shadowRoot, visited);
        return normalizeText(text);
    }

    const children = node instanceof HTMLSlotElement ? node.assignedNodes({ flatten: true }) : Array.from(node.childNodes);

    children.forEach((child) => {
        const text = collectNodeText(child, visited);
        if (text) {
            fragments.push(text);
        }
    });

    return normalizeText(fragments.join(' '));
};

/**
 * Sorts heading items by their position in the document.
 * findElementsThroughShadowRoot can return elements in traversal order (e.g. light-DOM
 * matches first, then shadow-DOM), which may not match visual/document order.
 *
 * Uses getBoundingClientRect().top as a fallback when compareDocumentPosition returns
 * DOCUMENT_POSITION_DISCONNECTED (which happens when elements are in different DOM trees,
 * e.g., slotted content vs main document).
 */
function sortHeadingItemsByDocumentOrder(items: HeadingItem[]): void {
    items.sort((a, b) => {
        const pos = a.element.compareDocumentPosition(b.element);

        // If elements are disconnected (in different DOM trees like slotted content),
        // fall back to visual position using getBoundingClientRect
        if (pos & Node.DOCUMENT_POSITION_DISCONNECTED) {
            const rectA = a.element.getBoundingClientRect();
            const rectB = b.element.getBoundingClientRect();
            return rectA.top - rectB.top;
        }

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
    });
}

const getHeadingLevel = (element: Element): number | null => {
    const tagName = element.tagName.toLowerCase();
    const headingMatch = tagName.match(/^h([1-6])$/);
    if (headingMatch) {
        return parseInt(headingMatch[1], 10);
    }

    if (tagName === 'vl-title') {
        // Check both attribute and property for 'type'
        // React with @lit/react sets properties directly, not attributes
        // TODO: A more robust approach would be to read the actual h1-h6 element inside
        // vl-title's shadow DOM (element.shadowRoot?.querySelector('h1,h2,h3,h4,h5,h6'))
        // which would be resilient to how the type is set and any future implementation changes.
        const typeAttr = element.getAttribute('type');
        const typeProp = (element as HTMLElement & { type?: string }).type;
        const type = typeAttr || typeProp || 'h1';

        const typeMatch = type.toLowerCase().match(/^h([1-6])$/);
        if (typeMatch) {
            return parseInt(typeMatch[1], 10);
        }
    }

    const ariaLevel = element.getAttribute('aria-level');
    if (ariaLevel) {
        const parsedLevel = parseInt(ariaLevel, 10);
        if (!Number.isNaN(parsedLevel)) {
            return parsedLevel;
        }
    }

    return null;
};

export const findElementInSlottedContent = (root: Element | ShadowRoot, selector: string): Element | null => {
    const slots = root.querySelectorAll('slot');
    for (const slot of Array.from(slots)) {
        if (slot instanceof HTMLSlotElement) {
            const assigned = slot.assignedElements({ flatten: true });
            for (const element of assigned) {
                if ('querySelector' in element) {
                    const result = element.querySelector(selector);
                    if (result) return result;
                }
                if (element.matches && element.matches(selector)) {
                    return element;
                }
            }
        }
    }
    return null;
};

export const determineHeadingRootElement = (
    headingRoot: Element | ShadowRoot | Document | null | undefined,
    headingRootSelector: string | undefined,
    fallbackRoot: Document | ShadowRoot
): Element | ShadowRoot | Document => {
    // case 1: both provided - selector refines headingRoot
    if (headingRoot && headingRootSelector) {
        const directResult = headingRoot.querySelector?.(headingRootSelector);
        if (directResult) return directResult;

        if (headingRoot !== document) {
            const slottedResult = findElementInSlottedContent(headingRoot as Element | ShadowRoot, headingRootSelector);
            if (slottedResult) return slottedResult;
        }

        console.warn(
            `[vl-side-navigation-next] selector "${headingRootSelector}" not found within headingRoot. ` +
                `Using headingRoot as-is. Headings will be scanned from the entire headingRoot scope.`
        );
        return headingRoot;
    }

    // case 2: only headingRoot - use it directly
    if (headingRoot) {
        return headingRoot;
    }

    // case 3: only selector - search in fallbackRoot
    if (headingRootSelector) {
        const result = fallbackRoot.querySelector(headingRootSelector);
        if (result) return result;

        console.warn(
            `[vl-side-navigation-next] selector "${headingRootSelector}" not found in fallbackRoot. ` +
                `Using fallbackRoot as-is.`
        );
        return fallbackRoot;
    }

    // case 4: nothing provided - use fallbackRoot
    return fallbackRoot;
};

export const extractHeadingIdsFromLinks = (elements: Element[]): string[] => {
    const headingIds: string[] = [];

    elements.forEach((element) => {
        const links = [...element.querySelectorAll<HTMLElement>('a[href^="#"], vl-link[href^="#"]')];
        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href) {
                const id = href.substring(1);
                if (id && !headingIds.includes(id)) {
                    headingIds.push(id);
                }
            }
        });
    });

    return headingIds;
};

export const findHeadingElementById = (
    id: string,
    root: Element | ShadowRoot | Document,
    maxDepth?: number
): HTMLElement | null => {
    const selector = `#${id}`;

    const element = root.querySelector<HTMLElement>(selector);
    if (element) return element;

    // headings may live inside slotted content of the given root
    if (root instanceof Element || root instanceof ShadowRoot) {
        const slottedResult = findElementInSlottedContent(root, selector);
        if (slottedResult instanceof HTMLElement) return slottedResult;
    }

    // headings may live inside (nested) shadow DOM (e.g. vl-cookie-statement, vl-title)
    const searchDocument = (searchRoot: Document | ShadowRoot) => {
        const elements = findElementsThroughShadowRoot(searchRoot, selector, maxDepth);
        return elements.length > 0 && elements[0] instanceof HTMLElement ? elements[0] : null;
    };

    if (root === document) {
        return searchDocument(document);
    }

    // fallback to a full document scan so the heading is found even when the
    // provided root is a shadow/slot container that doesn't directly contain it
    return searchDocument(document);
};
