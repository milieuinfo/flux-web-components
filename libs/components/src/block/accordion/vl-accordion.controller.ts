import { ReactiveController, ReactiveControllerHost } from 'lit';

export type AccordionControllerOptions = {
    isDisabled?: () => boolean;
    onToggle?: (open: boolean) => void;
};

export class AccordionController implements ReactiveController {
    private host: ReactiveControllerHost;
    private options: AccordionControllerOptions;
    private _isOpen = false;

    constructor(host: ReactiveControllerHost, options: AccordionControllerOptions = {}) {
        this.host = host;
        this.options = options;
        this.host.addController(this);
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    hostConnected(): void {}

    open(): void {
        this.setOpen(true);
    }

    close(): void {
        this.setOpen(false);
    }

    toggle(): void {
        this.setOpen(!this._isOpen);
    }

    setOpen(open: boolean, notify = true): void {
        if (open === this._isOpen || this.options.isDisabled?.()) {
            return;
        }

        this._isOpen = open;
        this.host.requestUpdate();

        if (notify) {
            this.options.onToggle?.(open);
        }
    }
}
