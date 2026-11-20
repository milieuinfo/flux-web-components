import type { ReactiveController, ReactiveElement } from 'lit';
import type { ChartReference } from '../layout/reference-lines';
import { readReferenceTags } from './vl-chart-reference.component';

export const REFERENCES_CHANGE = 'references';

/** Leest de `vl-chart-reference`-tags.
 * (https://lit.dev/docs/composition/controllers/). */
export class ReferenceTagsController implements ReactiveController {
    references: ChartReference[] = [];

    #host: ReactiveElement;
    #observer = new MutationObserver(() => this.#read());

    constructor(host: ReactiveElement) {
        this.#host = host;
        this.#host.addController(this);
    }

    hostConnected(): void {
        this.#read();
        this.#observer.observe(this.#host, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['value', 'label', 'in-view'],
        });
    }

    hostDisconnected(): void {
        this.#observer.disconnect();
    }

    /** Met de oude waarde erbij, zodat het element in `changedProperties` ziet dat de referenties veranderden. */
    #read(): void {
        const previous = this.references;
        this.references = readReferenceTags(this.#host);
        this.#host.requestUpdate(REFERENCES_CHANGE, previous);
    }
}
