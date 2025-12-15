import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dropTargetStyles } from './drop-target.css';

@customElement('drop-target')
export class DropTargetComponent extends LitElement {
    private onDragOver(e: DragEvent) {
        e.preventDefault();
        const area = e.currentTarget as HTMLDivElement;
        area.classList.add('drop-target--drag-over');
    }

    private onDragLeave(e: DragEvent) {
        e.preventDefault();
        const area = e.currentTarget as HTMLDivElement;
        area.classList.remove('drop-target--drag-over');
    }

    private onDrop(e: DragEvent) {
        e.preventDefault();
        const area = e.currentTarget as HTMLDivElement;
        area.classList.remove('drop-target--drag-over');

        const dt = e.dataTransfer;
        if (!dt?.files?.length) {
            return;
        }

        const files = Array.from(dt.files);

        this.dispatchEvent(
            new CustomEvent('drop-target-files-dropped', {
                detail: { files },
                bubbles: true,
                composed: true,
            })
        );
    }

    static get styles(): CSSResult[] {
        return [dropTargetStyles];
    }


    render() {
        return html` <div
            class="drop-target"
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
            @drop=${this.onDrop}
        >
            <div class="drop-target__message" aria-hidden="true">
                <vl-icon icon="paperclip" margin-right></vl-icon> Zet je bestanden hier neer om ze te uploaden.
            </div>
            <div class="drop-target__backdrop" aria-hidden="true"></div>
            <slot></slot>
        </div>`;
    }
}
