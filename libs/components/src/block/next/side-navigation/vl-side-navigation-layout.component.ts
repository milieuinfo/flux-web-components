import { BaseLitElement, findNodesForSlot, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlContentBlockStyles, vlGridStyles, vlMediaScreenSmall, vlSectionStyles } from '@domg-wc/styles';
import { css, CSSResult, html, TemplateResult } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { ClassInfo } from 'lit/directives/class-map.js';
import { VlSideNavigationComponent } from './vl-side-navigation.component';

registerWebComponents([VlSideNavigationComponent]);

/**
 * VlSideNavigationLayoutComponent
 *
 * A higher-level layout component that wraps side navigation components
 * with the necessary VL grid layout styling, providing an out-of-the-box solution.
 *
 * Uses light DOM rendering to ensure VL grid classes work properly.
 */
@webComponent('vl-side-navigation-layout')
export class VlSideNavigationLayoutComponent extends BaseLitElement {
    @property({ type: Boolean, attribute: 'compact' })
    compact = false;
    @property({ type: String, attribute: 'heading-root-selector' })
    headingRootSelector?: string;
    @property({ type: Boolean, attribute: 'content-block' })
    contentBlock = false;
    /**
     * Minimum heading level (1–6) to include in the TOC. E.g. 2 = h2 and below. Wordt doorgegeven aan vl-side-navigation-next.
     */
    @property({ type: Number, attribute: 'min-level' })
    minLevel?: number;
    /**
     * Maximum heading level (1–6) to include in the TOC. E.g. 2 = only h1 and h2. Wordt doorgegeven aan vl-side-navigation-next.
     */
    @property({ type: Number, attribute: 'max-level' })
    maxLevel?: number;
    /**
     * Optionele maximum diepte voor shadow DOM traversal (wordt doorgegeven aan vl-side-navigation-next).
     * Gebruikt bij het scannen van headings én bij het zoeken van het scroll-target (fallback).
     * 0 = enkel light DOM, 1 = light DOM + eerste niveau shadow DOM, undefined = onbeperkt (standaard).
     */
    @property({ type: Number, attribute: 'max-depth' })
    maxDepth?: number;
    /**
     * Tekst die getoond wordt als titel boven de inhoudstafel in de side navigation. Wordt doorgegeven aan vl-side-navigation-next.
     */
    @property({ type: String, attribute: 'navigation-title' })
    navigationTitle?: string;
    /**
     * Comma-separated CSS selectors van elementen om uit te sluiten tijdens het scannen van headings.
     * Wordt doorgegeven aan vl-side-navigation-next.
     * @example "iframe, table.large-data, .skip-headings"
     */
    @property({ type: String, attribute: 'exclude-selectors' })
    excludeSelectors?: string;

    static get styles(): CSSResult[] {
        return [
            vlGridStyles,
            vlSectionStyles,
            vlContentBlockStyles,
            css`
                @media screen and (width > ${vlMediaScreenSmall}px) {
                    navigation-part {
                        order: 1;
                    }
                }
                :host([compact]) {
                    navigation-part {
                        order: 0;
                    }
                }
            `,
        ];
    }

    render(): TemplateResult {
        const navigationSlot = html`
            <navigation-part class="${classMap(this.getNavigationClasses())}">
                <slot name="navigation" @slotchange=${this.handleNavigationSlotChange}></slot>
            </navigation-part>
        `;

        const contentSlot = html`
            <content-part class="${classMap(this.getContentClasses())}">
                <slot name="content" @slotchange=${this.handleContentSlotChange}></slot>
            </content-part>
        `;

        return html`
            <layout-container class="${classMap(this.getLayoutContainerClasses())}">
                ${html`${navigationSlot}${contentSlot}`}
            </layout-container>
        `;
    }

    override firstUpdated(): void {
        this.initializeNavigation();
        // Single deferred TOC scan so slotted/nested content (e.g. light-DOM Lit components) has rendered.
        // handleContentSlotChange also defers when content is (re)assigned; this covers the case where
        // the nav was just created and content was already slotted before the nav existed.
        requestAnimationFrame(() => {
            this.refreshNavigationTableOfContents();
        });
    }

    updated(changedProperties: Map<string, unknown>) {
        if (
            changedProperties.has('compact') ||
            changedProperties.has('headingRootSelector') ||
            changedProperties.has('maxDepth') ||
            changedProperties.has('maxLevel') ||
            changedProperties.has('minLevel') ||
            changedProperties.has('navigationTitle') ||
            changedProperties.has('excludeSelectors')
        ) {
            this.updateNavigationComponents();
        }
    }

    private handleNavigationSlotChange() {
        this.updateNavigationComponents();
    }

    private handleContentSlotChange() {
        this.updateNavigationComponents();
        // Content slot was (re)assigned; (re)scan for headings so TOC includes slotted content.
        // Defer by one frame so nested components (e.g. light-DOM-only Lit components) have
        // rendered their children before we scan.
        requestAnimationFrame(() => {
            this.refreshNavigationTableOfContents();
        });
    }

    private initializeNavigation() {
        const navigationSlot = this.shadowRoot?.querySelector('slot[name="navigation"]') as HTMLSlotElement;
        if (!navigationSlot) return;

        const assignedElements = navigationSlot.assignedElements();

        // if no navigation is provided, create one
        if (assignedElements.length === 0) {
            const nav = document.createElement('vl-side-navigation-next');
            nav.setAttribute('slot', 'navigation');
            if (this.compact) {
                nav.setAttribute('compact', '');
            }

            const contentPart = this.shadowRoot?.querySelector('content-part');
            if (contentPart && nav instanceof VlSideNavigationComponent) {
                nav.headingRoot = contentPart;
            }

            if (this.headingRootSelector) {
                nav.setAttribute('heading-root-selector', this.headingRootSelector);
            }

            if (this.maxDepth !== undefined) {
                nav.setAttribute('max-depth', String(this.maxDepth));
            }

            if (this.minLevel !== undefined) {
                nav.setAttribute('min-level', String(this.minLevel));
            }

            if (this.maxLevel !== undefined) {
                nav.setAttribute('max-level', String(this.maxLevel));
            }

            if (this.navigationTitle !== undefined && this.navigationTitle !== '') {
                nav.setAttribute('navigation-title', this.navigationTitle);
            }

            if (this.excludeSelectors !== undefined && this.excludeSelectors !== '') {
                nav.setAttribute('exclude-selectors', this.excludeSelectors);
            }

            this.appendChild(nav);
        } else {
            this.updateNavigationComponents();
        }
    }

    private updateNavigationComponents() {
        const contentPart = this.shadowRoot?.querySelector('content-part');

        findNodesForSlot(this, 'navigation').forEach((item) => {
            if (item instanceof VlSideNavigationComponent) {
                if (this.compact) {
                    item.setAttribute('compact', '');
                } else {
                    item.removeAttribute('compact');
                }

                if (contentPart) {
                    item.headingRoot = contentPart;
                }

                if (this.headingRootSelector) {
                    item.setAttribute('heading-root-selector', this.headingRootSelector);
                } else {
                    item.removeAttribute('heading-root-selector');
                }

                if (this.maxDepth !== undefined) {
                    item.setAttribute('max-depth', String(this.maxDepth));
                } else {
                    item.removeAttribute('max-depth');
                }

                if (this.minLevel !== undefined) {
                    item.setAttribute('min-level', String(this.minLevel));
                } else {
                    item.removeAttribute('min-level');
                }

                if (this.maxLevel !== undefined) {
                    item.setAttribute('max-level', String(this.maxLevel));
                } else {
                    item.removeAttribute('max-level');
                }

                if (this.navigationTitle !== undefined && this.navigationTitle !== '') {
                    item.setAttribute('navigation-title', this.navigationTitle);
                } else {
                    item.removeAttribute('navigation-title');
                }

                if (this.excludeSelectors !== undefined && this.excludeSelectors !== '') {
                    item.setAttribute('exclude-selectors', this.excludeSelectors);
                } else {
                    item.removeAttribute('exclude-selectors');
                }
            }
        });
    }

    private refreshNavigationTableOfContents(): void {
        findNodesForSlot(this, 'navigation').forEach((item) => {
            if (item instanceof VlSideNavigationComponent) {
                item.refreshTableOfContents();
            }
        });
    }

    private getNavigationClasses(): ClassInfo {
        return {
            'vl-column': true,
            'vl-column--3': !this.compact,
            'vl-column--12': this.compact,
            'vl-column--start-10': !this.compact,
            'vl-column--m-3': !this.compact,
            'vl-column--s-12': true,
        };
    }

    private getContentClasses(): ClassInfo {
        return {
            'vl-column': true,
            'vl-column--8': !this.compact,
            'vl-column--12': this.compact,
            'vl-column--m-9': !this.compact,
            'vl-column--s-12': true,
        };
    }

    private getLayoutContainerClasses(): ClassInfo {
        return {
            'vl-grid': true,
            'vl-content-block': this.contentBlock,
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-layout': VlSideNavigationLayoutComponent;
    }
}
