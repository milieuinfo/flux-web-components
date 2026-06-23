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
    /** ID of the currently active heading */
    activeHeadingId?: string;
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
    const { activeHeadingId, expandedHeadingIds } = config.state;
    const { onActiveHeadingChange } = config.callbacks;
    const { scrollRoot, scrollBehavior } = config.scroll;

    // calculate node state
    const isActive = activeHeadingId === node.item.id;
    const hasChildren = node.children.length > 0;
    const isChildActive = hasChildren && isAnyChildActive(node.children, activeHeadingId);

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
            target.scrollIntoView({ behavior: scrollBehavior ?? 'smooth', block: 'start' });
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
              <i class="vl-icon vl-icon--arrow-right-fat ${shouldShowChildren ? 'showing-children' : ''}"></i>
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
export const isAnyChildActive = (nodes: HeadingTreeNode[], activeHeadingId?: string): boolean => {
    if (!activeHeadingId) return false;

    for (const node of nodes) {
        if (node.item.id === activeHeadingId) {
            return true;
        }
        if (node.children.length > 0 && isAnyChildActive(node.children, activeHeadingId)) {
            return true;
        }
    }
    return false;
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

