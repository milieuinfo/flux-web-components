import { scrollIntoViewBelowSticky } from '@domg-wc/common';
import { html, nothing, TemplateResult } from 'lit';
import { findHeadingElementById } from './vl-side-navigation-scanner.utils';
import { HeadingItem, HeadingResult, HeadingTreeNode } from './vl-side-navigation.model';

/**
 * configuration for scroll behavior when navigating to headings
 */
export interface ScrollConfig {
    /** root element for scroll queries (document, shadow root, or specific element) */
    scrollRoot?: Document | ShadowRoot | Element;
    /** scroll animation behavior (smooth, auto, instant) */
    scrollBehavior?: ScrollBehavior;
    /**
     * Same as the component's max-depth attribute; used when resolving the scroll target
     * from document (fallback search). Limits shadow DOM traversal depth for performance.
     */
    maxDepth?: number;
}

/**
 * UI state and behavior configuration for navigation rendering
 */
export interface NavigationState {
    /** Set of heading IDs that are currently active (single entry in single-active mode). */
    activeHeadingIds?: Set<string>;
    /** Set of heading IDs that have their children expanded */
    expandedHeadingIds?: Set<string>;
}

/**
 * event handlers for navigation interactions
 */
export interface NavigationCallbacks {
    /** callback invoked when the active heading changes */
    onActiveHeadingChange?: (headingId: string, isToggleOnly?: boolean) => void;
}

/**
 * complete configuration for rendering the table of contents
 */
export interface RenderConfig {
    scroll: ScrollConfig;
    state: NavigationState;
    callbacks: NavigationCallbacks;
}

/**
 * Renders a table of contents from a heading result or a pre-built tree.
 * Accepts either a HeadingResult (builds the tree internally) or a pre-built HeadingTreeNode[]
 * so callers can build the tree once and reuse it for cleanup and rendering.
 *
 * @param tocOrTree - HeadingResult or pre-built HeadingTreeNode[]
 * @param config - configuration for rendering behavior (scroll, state, callbacks)
 * @returns template result for the table of contents
 */
export const headingTableOfContentsTemplate = (
    tocOrTree: HeadingResult | HeadingTreeNode[],
    config: RenderConfig = { scroll: {}, state: {}, callbacks: {} }
): TemplateResult => {
    const tree =
        'headings' in tocOrTree ? buildHeadingTree(tocOrTree.headings) : tocOrTree;
    return tree.length > 0 ? renderHeadingTree(tree, config) : html``;
};

/**
 * Constructs a hierarchical tree structure of heading nodes based on their levels.
 *
 * The function processes an array of heading items and organizes them into a nested
 * tree structure, where each node represents a heading and its children represent
 * subheadings. Headings with lower levels are considered parents of headings with
 * higher levels that immediately follow them.
 *
 * @param {HeadingItem[]} items - An array of heading items, with each item containing a level property that defines its hierarchical depth.
 * @returns {HeadingTreeNode[]} - A hierarchical array of tree nodes representing the structure of the headings.
 */
export const buildHeadingTree = (items: HeadingItem[]): HeadingTreeNode[] => {
    const roots: HeadingTreeNode[] = [];
    const stack: HeadingTreeNode[] = [];

    items.forEach((item) => {
        const node: HeadingTreeNode = { item, children: [] };

        while (stack.length > 0 && item.level <= stack[stack.length - 1].item.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            roots.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return roots;
};

/**
 * renders a tree of heading nodes as a nested unordered list
 * @param ulId - optional id for the root ul (used for aria-controls on parent toggle)
 * @param isHidden - optional flag to hide the ul (used when collapsed)
 */
const renderHeadingTree = (
    nodes: HeadingTreeNode[],
    config: RenderConfig,
    ulId?: string,
    isHidden?: boolean
): TemplateResult => {
    if (!nodes.length) {
        return html``;
    }

    return html`
        <ul id=${ulId ?? nothing} ?hidden=${isHidden ?? false}>
            ${nodes.map((node) => renderHeadingNode(node, config))}
        </ul>
    `;
};

/**
 * renders a single heading node with hybrid behavior:
 * - all items are links that scroll to headings
 * - parent items have a separate toggle button for expanding/collapsing children
 */
const renderHeadingNode = (node: HeadingTreeNode, config: RenderConfig): TemplateResult => {
    // destructure config for clearer dependencies
    const { activeHeadingIds, expandedHeadingIds } = config.state;
    const { onActiveHeadingChange } = config.callbacks;
    const { scrollRoot, scrollBehavior } = config.scroll;

    // calculate node state
    const isActive = activeHeadingIds?.has(node.item.id) ?? false;
    const hasChildren = node.children.length > 0;
    const isChildActive = hasChildren && isAnyChildActive(node.children, activeHeadingIds);

    // check if user has manually toggled this item
    const hasManualToggle = expandedHeadingIds?.has(node.item.id) ?? false;
    const hasManualCollapse = expandedHeadingIds?.has(`-${node.item.id}`) ?? false;

    // show children if: manually expanded, OR (active or child-active) AND not manually collapsed
    const shouldShowChildren = hasManualToggle || ((isActive || isChildActive) && !hasManualCollapse);

    const displayText = node.item.text || node.item.id;

    // event handler for link clicks - always scrolls to heading
    // use the heading element we already have from the TOC scan so scroll works across shadow DOM
    const handleLinkClick = (event: Event) => {
        event.preventDefault();

        const target =
            node.item.element ?? findHeadingElementById(node.item.id, scrollRoot ?? document, config.scroll.maxDepth);
        if (target) {
            // scrollIntoViewBelowSticky houdt de heading vrij van een sticky/fixed header bovenaan
            scrollIntoViewBelowSticky(target, { behavior: scrollBehavior ?? 'smooth', block: 'start' });
        }
    };

    // event handler for toggle button clicks - only toggles visibility
    const handleToggleClick = (event: Event) => {
        event.preventDefault();
        event.stopPropagation(); // prevent link click
        onActiveHeadingChange?.(node.item.id, true);
    };

    const linkElement = html`<a
        href=${`#${node.item.id}`}
        class=${isActive ? 'active' : ''}
        aria-current=${isActive ? 'location' : nothing}
        @click=${handleLinkClick}
    >
        ${displayText}
    </a>`;

    const childrenListId = hasChildren ? `toc-section-${node.item.id}` : undefined;

    // render toggle button for parent items
    const toggleButton = hasChildren
            ? html`<button
              type="button"
              class="toggle-button"
              aria-expanded=${shouldShowChildren ? 'true' : 'false'}
              aria-controls=${childrenListId || nothing}
              aria-label=${shouldShowChildren ? 'Inklappen' : 'Uitklappen'}
              @click=${handleToggleClick}
          >
              <vl-icon
                  icon="arrow-right-fat"
                  class=${shouldShowChildren ? 'showing-children' : ''}
              ></vl-icon>
          </button>`
            : nothing;

    return html`
        <li>
            <div class="nav-item-wrapper">${linkElement}${toggleButton}</div>
            ${hasChildren ? renderHeadingTree(node.children, config, childrenListId, !shouldShowChildren) : nothing}
        </li>
    `;
};

/**
 * recursively checks if any child node in the tree is active
 */
export const isAnyChildActive = (nodes: HeadingTreeNode[], activeHeadingIds?: Set<string>): boolean => {
    if (!activeHeadingIds || activeHeadingIds.size === 0) return false;

    for (const node of nodes) {
        if (activeHeadingIds.has(node.item.id)) {
            return true;
        }
        if (node.children.length > 0 && isAnyChildActive(node.children, activeHeadingIds)) {
            return true;
        }
    }
    return false;
};

/**
 * Toggles the manual expand/collapse state for a heading. Returns a new Set so the
 * caller can assign it back to a reactive property to trigger re-render.
 *
 * The 4-case rule (delete-manual-expand, swap-collapse-to-expand, add-manual-collapse,
 * add-manual-expand) is shared between the auto-TOC and sections-mode auto-secties.
 */
export const toggleHeadingExpandState = (
    current: Set<string>,
    headingId: string,
    tree: HeadingTreeNode[],
    activeHeadingIds: Set<string>
): Set<string> => {
    const next = new Set(current);
    const hasManualToggle = next.has(headingId);
    const hasManualCollapse = next.has(`-${headingId}`);
    const node = findNodeById(tree, headingId);
    const isActive = activeHeadingIds.has(headingId);
    const isChildActive = node ? isAnyChildActive(node.children, activeHeadingIds) : false;
    const wouldBeAutoExpanded = isActive || isChildActive;

    if (hasManualToggle) {
        next.delete(headingId);
        if (wouldBeAutoExpanded) next.add(`-${headingId}`);
    } else if (hasManualCollapse) {
        next.delete(`-${headingId}`);
        next.add(headingId);
    } else if (wouldBeAutoExpanded) {
        next.add(`-${headingId}`);
    } else {
        next.add(headingId);
    }
    return next;
};

/**
 * Drops manual collapses (negative IDs) whose section is no longer active or child-active,
 * so a section the user scrolled away from auto-expands again next time. Manual expands
 * (positive IDs) are always kept. Returns the same Set if nothing changed, else a new Set.
 */
export const pruneStaleManualCollapses = (
    current: Set<string>,
    tree: HeadingTreeNode[],
    activeHeadingIds: Set<string>
): Set<string> => {
    const kept = Array.from(current).filter((id) => {
        if (!id.startsWith('-')) return true;
        const realId = id.substring(1);
        const node = findNodeById(tree, realId);
        const isActive = activeHeadingIds.has(realId);
        const isChildActive = node ? isAnyChildActive(node.children, activeHeadingIds) : false;
        return isActive || isChildActive;
    });
    return kept.length === current.size ? current : new Set(kept);
};

/**
 * finds a node in the tree by its ID
 */
export const findNodeById = (nodes: HeadingTreeNode[], id: string): HeadingTreeNode | null => {
    for (const node of nodes) {
        if (node.item.id === id) {
            return node;
        }
        if (node.children.length > 0) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

