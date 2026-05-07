import { BaseLitElement, webComponent } from '@domg-wc/common';
import { doormatDefaults } from './vl-doormat.defaults';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { vlLinkStyles } from '../../atom/link-style/vl-link-style.css';
import doormatStyle from './vl-doormat.css';

@webComponent('vl-doormat')
export class VlDoormatComponent extends BaseLitElement {
    private href = doormatDefaults.href;
    private linkLabel = doormatDefaults.linkLabel;
    private external = doormatDefaults.external;
    private alt = doormatDefaults.alt;
    private imageSrc = doormatDefaults.imageSrc;
    private imageAlt = doormatDefaults.imageAlt;
    private imageWidth = doormatDefaults.imageWidth;
    private imageHeight = doormatDefaults.imageHeight;
    private graphic = doormatDefaults.graphic;
    private fullHeight = doormatDefaults.fullHeight;
    @state() private hasText = false;

    static get styles(): CSSResult[] {
        return [vlIconStyles, vlLinkStyles(), doormatStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            href: { type: String },
            linkLabel: { type: String, attribute: 'link-label' },
            external: { type: Boolean },
            alt: { type: Boolean },
            imageSrc: { type: String, attribute: 'image-src' },
            imageAlt: { type: String, attribute: 'image-alt' },
            imageWidth: { type: Number, attribute: 'image-width' },
            imageHeight: { type: Number, attribute: 'image-height' },
            graphic: { type: Boolean },
            fullHeight: { type: Boolean, attribute: 'full-height' },
        };
    }

    render(): TemplateResult {
        const classes = {
            'vl-doormat': true,
            'vl-doormat--alt': this.alt,
            'vl-doormat--graphic': this.graphic,
            'vl-doormat--full-height': this.fullHeight,
            'vl-doormat--no-text': !this.hasText,
        };
        const target = this.external ? '_blank' : nothing;
        const rel = this.external ? 'noopener noreferrer nofollow' : nothing;

        return html`
            <a
                class=${classMap(classes)}
                href=${this.href}
                target=${target}
                rel=${rel}
                aria-label=${this.linkLabel || nothing}
            >
                ${this.imageSrc ? this.renderImage() : nothing}
                <div class="vl-doormat__content">
                    <h2 class="vl-doormat__title">
                        <slot name="title"></slot>
                        ${this.external ? this.renderExternalIcon() : nothing}
                    </h2>
                    <div class="vl-doormat__text">
                        <slot name="text" @slotchange=${this.onTextSlotChange}></slot>
                    </div>
                </div>
            </a>
        `;
    }

    private onTextSlotChange(e: Event): void {
        const slot = e.target as HTMLSlotElement;
        this.hasText = slot.assignedNodes({ flatten: true }).length > 0;
    }

    private renderExternalIcon(): TemplateResult {
        return html`<span class="vl-icon vl-icon--external vl-icon--after vl-doormat__external-icon" aria-hidden="true"></span>`;
    }

    renderImage(): TemplateResult {
        if (this.graphic) {
            return html`
                <div class="vl-doormat__graphic-wrapper">
                    <img
                        class="vl-doormat__graphic"
                        src=${this.imageSrc}
                        alt=${this.imageAlt || nothing}
                        width=${this.imageWidth || nothing}
                        height=${this.imageHeight || nothing}
                    />
                </div>
            `;
        }

        return html`
            <img
                class="vl-doormat__image"
                src=${this.imageSrc}
                alt=${this.imageAlt || nothing}
                width=${this.imageWidth || nothing}
                height=${this.imageHeight || nothing}
            />
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-doormat': VlDoormatComponent;
    }
}
