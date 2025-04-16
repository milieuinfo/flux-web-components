import { BaseLitElement } from '@domg-wc/common';
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vl-map-click-action-pindrop')
export class VlMapClickActionPindrop extends BaseLitElement {
    // Overgenomen van: https://hungyi.net/posts/pure-css-map-marker/
    static styles = css`
        :host {
            /* Set the marker size here */
            width: 2rem;
            height: 2rem;
            border-radius: 2rem;
            /* Set the marker color here */
            background: #0039aaff;

            display: inline-block;
            border-bottom-right-radius: 0;
            position: relative;
            transform: rotate(45deg);

            /* optional fanciness */
            border: 1px solid #0039aaff;
        }

        :host::before {
            content: '';
            background: white;
            width: 50%;
            height: 50%;
            border-radius: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            /* optional fanciness */
            box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgba(0, 0, 0, 0.1);
        }

        /* shadow (optional if you don't need a shadow) */

        :host::after {
            content: '';
            background: rgba(128, 128, 128, 0.2);
            width: 75%;
            height: 75%;
            border-radius: 100%;
            position: absolute;
            top: 100%;
            left: 100%;
            transform: translate(-50%, -50%) rotate(45deg) scaleX(0.5);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-click-action-pindrop': VlMapClickActionPindrop;
    }
}
