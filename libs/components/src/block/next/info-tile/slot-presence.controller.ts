import { ReactiveController, ReactiveControllerHost } from 'lit';

export class SlotPresenceController implements ReactiveController {
    private host: ReactiveControllerHost & HTMLElement;
    private observer: MutationObserver;

    constructor(host: ReactiveControllerHost & HTMLElement) {
        this.host = host;
        this.observer = new MutationObserver((mutations) => {
            if (mutations.some((mutation) => this.affectsSlots(mutation))) {
                this.host.requestUpdate();
            }
        });
        this.host.addController(this);
    }

    hostConnected(): void {
        this.observer.observe(this.host, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['slot'],
        });
    }

    hostDisconnected(): void {
        this.observer.disconnect();
    }

    private affectsSlots(mutation: MutationRecord): boolean {
        if (mutation.type === 'childList') {
            return mutation.target === this.host;
        }
        return mutation.target.parentNode === this.host;
    }
}
