import { render, TemplateResult } from 'lit';
import { VlSideNavigationSectionComponent } from './vl-side-navigation-section.component';
import {
    determineHeadingRootElement,
    findHeadings,
} from './vl-side-navigation-scanner.utils';
import {
    buildHeadingTree,
    headingTableOfContentsTemplate,
    RenderConfig,
} from './vl-side-navigation-renderer.utils';
import { HeadingItem, HeadingResult } from './vl-side-navigation.model';

/**
 * Parent-scan-config die per auto-sectie als fallback dient (sectie-attributen overriden).
 */
export interface ParentScanConfig {
    minLevel: number;
    maxLevel: number;
    headingRoot?: Element | ShadowRoot | Document | null;
    headingRootSelector?: string;
    maxDepth?: number;
    excludeSelectors?: string;
    fallbackRoot: Document | ShadowRoot;
}

export interface AutoSectionScan {
    section: VlSideNavigationSectionComponent;
    result: HeadingResult;
}

export type SideNavigationMode = 'auto' | 'custom' | 'sections';

export function detectSideNavigationMode(slottedElements: Element[]): SideNavigationMode {
    if (slottedElements.length === 0) return 'auto';
    return slottedElements.some(isSectionElement) ? 'sections' : 'custom';
}

export function isSectionElement(el: Element): el is VlSideNavigationSectionComponent {
    return el.tagName.toLowerCase() === 'vl-side-navigation-section-next';
}

let sectionTitleIdCounter = 0;

const SECTION_TITLE_CLASS = 'vl-side-navigation-section-next__title';

export function getSectionTitleElement(section: Element): HTMLElement | null {
    return section.querySelector<HTMLElement>(`:scope > .${SECTION_TITLE_CLASS}`);
}

export function ensureSectionTitleElement(section: VlSideNavigationSectionComponent): HTMLElement | null {
    const title = section.sectionTitle?.trim();
    let label = getSectionTitleElement(section);
    if (!title) {
        label?.remove();
        return null;
    }
    if (!label) {
        label = document.createElement('span');
        label.classList.add(SECTION_TITLE_CLASS);
        section.prepend(label);
    }
    if (label.textContent !== title) {
        label.textContent = title;
    }
    return label;
}

export function ensureElementId(el: HTMLElement, prefix = 'vl-side-nav-section-title'): string {
    let id = el.getAttribute('id');
    if (!id) {
        sectionTitleIdCounter += 1;
        id = `${prefix}-${sectionTitleIdCounter}`;
        el.setAttribute('id', id);
    }
    return id;
}

/**
 * Koppelt `aria-labelledby` van de eerste `<ul>` in de sectie aan het titel-label.
 * Geen titel of geen ul = no-op.
 */
export function wireSectionLabel(section: VlSideNavigationSectionComponent): void {
    const titleEl = ensureSectionTitleElement(section);
    if (!titleEl) return;
    const ul = section.querySelector('ul');
    if (!ul) return;
    ul.setAttribute('aria-labelledby', ensureElementId(titleEl));
}

export function resolveScanConfigForSection(
    section: VlSideNavigationSectionComponent,
    parent: ParentScanConfig
): {
    rootElement: Element | ShadowRoot | Document;
    minLevel: number;
    maxLevel: number;
    maxDepth?: number;
    excludeSelectors?: string;
} {
    const sectionRootSelector = section.headingRootSelector || parent.headingRootSelector;
    const rootElement = determineHeadingRootElement(
        parent.headingRoot,
        sectionRootSelector,
        parent.fallbackRoot
    );
    return {
        rootElement,
        minLevel: section.minLevel ?? parent.minLevel,
        maxLevel: section.maxLevel ?? parent.maxLevel,
        maxDepth: section.maxDepth ?? parent.maxDepth,
        excludeSelectors: section.excludeSelectors ?? parent.excludeSelectors,
    };
}

/**
 * Container `<div>` voor de gegenereerde lijst van een auto-sectie. Wordt na het
 * titel-element ingevoegd; bij ontbrekend titel-element als laatste child.
 */
export function ensureAutoSectionListContainer(section: VlSideNavigationSectionComponent): HTMLElement {
    let container = section.querySelector<HTMLElement>(
        ':scope > .vl-side-navigation-section-next__list'
    );
    if (container) return container;

    container = document.createElement('div');
    container.classList.add('vl-side-navigation-section-next__list');

    const titleEl = getSectionTitleElement(section);
    if (titleEl && titleEl.parentElement === section) {
        titleEl.after(container);
    } else {
        section.appendChild(container);
    }
    return container;
}

export function scanAutoSection(
    section: VlSideNavigationSectionComponent,
    parent: ParentScanConfig
): HeadingResult {
    const config = resolveScanConfigForSection(section, parent);
    return findHeadings(config.rootElement, {
        minLevel: config.minLevel,
        maxLevel: config.maxLevel,
        maxDepth: config.maxDepth,
        excludeSelectors: config.excludeSelectors,
    });
}

/**
 * Hergebruikt de bestaande `headingTableOfContentsTemplate` (scroll, active-state,
 * expand/collapse, shadow-DOM scroll-target identiek aan de auto-TOC). Wiret
 * post-render `aria-labelledby` op de root-`<ul>` naar het sectie-titel-element.
 */
export function renderAutoSection(
    section: VlSideNavigationSectionComponent,
    headings: HeadingItem[],
    renderConfig: RenderConfig
): void {
    const container = ensureAutoSectionListContainer(section);
    const tree = buildHeadingTree(headings);
    const template: TemplateResult = headingTableOfContentsTemplate(tree, renderConfig);
    render(template, container);

    const titleEl = getSectionTitleElement(section);
    const rootUl = container.querySelector<HTMLUListElement>(':scope > ul');
    if (titleEl && rootUl) {
        rootUl.setAttribute('aria-labelledby', ensureElementId(titleEl));
    }
}

/**
 * Dev-warn bij overlappende `heading-root-selector`-scopes. Geen runtime dedup:
 * stel per auto-sectie een eigen selector in.
 */
export function warnOnDuplicateAutoSectionHeadings(scans: AutoSectionScan[]): void {
    if (scans.length < 2) return;
    const seen = new Map<string, VlSideNavigationSectionComponent>();
    for (const scan of scans) {
        for (const heading of scan.result.headings) {
            const previous = seen.get(heading.id);
            if (previous && previous !== scan.section) {
                console.warn(
                    `[vl-side-navigation-next] heading id "${heading.id}" wordt geobserveerd door ` +
                        `meerdere auto-secties. Stel per auto-sectie een eigen heading-root-selector in ` +
                        `om overlap te vermijden.`
                );
                return;
            }
            seen.set(heading.id, scan.section);
        }
    }
}
