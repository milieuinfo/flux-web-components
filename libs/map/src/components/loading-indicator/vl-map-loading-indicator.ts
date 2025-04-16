import { BaseLitElement } from '@domg-wc/common';
import { VlMap } from '../../vl-map';
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { EventsKey } from 'ol/events';
import { unByKey } from 'ol/Observable';

@customElement('vl-map-loading-indicator')
export class VlMapLoadingIndicator extends BaseLitElement {
    static styles = css`
        @keyframes progress {
            0% {
                left: 0;
                width: 0;
            }
            50% {
                width: 100%;
            }
            100% {
                right: 0;
                width: 0;
            }
        }

        :host(.loading) {
            position: absolute;
            height: 3px;
            background: rgba(0, 85, 204, 0.6); /*komt overeen met blauw van de vl-button.*/
            animation: progress 2s infinite ease-in-out;
            animation-delay: 250ms;
            z-index: 2;
        }
    `;
    private eventKeyLoadStart: EventsKey;
    private eventKeyLoadEnd: EventsKey;

    connectedCallback() {
        super.connectedCallback();
        this.eventKeyLoadStart = this.map.on('loadstart', () => {
            this.toggleLoadingClass(true);
        });
        this.eventKeyLoadEnd = this.map.on('loadend', () => {
            this.toggleLoadingClass(false);
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unByKey(this.eventKeyLoadStart);
        unByKey(this.eventKeyLoadEnd);
    }

    private toggleLoadingClass(loading: boolean) {
        if (loading) {
            this.classList.add('loading');
        } else {
            this.classList.remove('loading');
        }
    }
    get map(): VlMap {
        return this.closest('vl-map');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-loading-indicator': VlMapLoadingIndicator;
    }
}
