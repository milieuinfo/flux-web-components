import { ReactiveController, ReactiveControllerHost } from 'lit';

export type AccordionHost = ReactiveControllerHost & HTMLElement & { open: boolean };

export type AccordionControllerOptions = {
    isToggleable?: () => boolean;
    isDisabled?: () => boolean;
};

export type AccordionToggleEventDetail = { expanded: boolean };

export class AccordionController implements ReactiveController {
    private host: AccordionHost;
    private options: AccordionControllerOptions;
    private renderedOpen: boolean | null = null;

    constructor(host: AccordionHost, options: AccordionControllerOptions = {}) {
        this.host = host;
        this.options = options;
        this.host.addController(this);
    }

    get isExpanded(): boolean {
        if (!this.isToggleable()) {
            return true;
        }
        return this.host.open && !this.isDisabled();
    }

    get contentHidden(): 'until-found' | '' | undefined {
        if (this.isExpanded) {
            return undefined;
        }
        return this.isDisabled() ? '' : 'until-found';
    }

    show(): void {
        this.setOpen(true);
    }

    hide(): void {
        this.setOpen(false);
    }

    toggle(): void {
        this.setOpen(!this.host.open);
    }

    handleBeforeMatch = (): void => {
        this.show();
    };

    hostUpdated(): void {
        const expanded = this.isExpanded;
        if (this.renderedOpen === null) {
            this.renderedOpen = expanded;
            return;
        }
        if (expanded === this.renderedOpen || !this.isToggleable()) {
            this.renderedOpen = expanded;
            return;
        }
        this.renderedOpen = expanded;
        this.dispatch('vl-toggle', { expanded });
        this.dispatch(expanded ? 'vl-open' : 'vl-close');
    }

    private setOpen(open: boolean): void {
        if (!this.isToggleable() || this.isDisabled()) {
            return;
        }
        this.host.open = open;
    }

    private isToggleable(): boolean {
        return this.options.isToggleable?.() ?? true;
    }

    private isDisabled(): boolean {
        return this.options.isDisabled?.() ?? false;
    }

    private dispatch(name: string, detail?: AccordionToggleEventDetail): void {
        this.host.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
    }
}
