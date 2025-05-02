import { LitElement, ReactiveController } from 'lit';
import { offsetParent } from 'composed-offset-position';
import { computePosition, arrow, flip, shift, offset, type Placement, Middleware, platform } from '@floating-ui/dom';

type FloatingControllerOptions = {
    reference: string;
    trigger: string;
    placement: Placement;
    distance: number;
    showDelay: number;
    hideDelay: number;
    hideOnClick: boolean;
};

interface FloatingElement extends LitElement {
    open: boolean;
    hide: () => void;
    show: () => void;
    toggle: () => void;
}

export default class FloatingController implements ReactiveController {
    private host: FloatingElement;
    private hoverTimeout = 0;
    private options!: FloatingControllerOptions;

    constructor(host: FloatingElement, options: FloatingControllerOptions) {
        this.setOptions(options);
        this.host = host;
        this.host.addController(this);
    }

    hostConnected(): void {
        this.addEventListeners();
    }

    hostDisconnected(): void {
        this.removeEventListeners();
    }

    getReferenceElement(): HTMLElement | null {
        const referenceId = `#${this.options.reference}`;
        const hostRootNode = this.host.getRootNode() as Element;
        const referenceElement = document.querySelector(referenceId) || hostRootNode.querySelector(referenceId);
        return referenceElement ? (referenceElement as HTMLElement) : null;
    }

    private getArrowElement(): HTMLElement {
        return this.host.shadowRoot!.querySelector('i#popover-arrow')!;
    }

    private buildMiddlewares(): Middleware[] {
        return [
            // https://floating-ui.com/docs/offset
            // offset() should generally be placed at the beginning of your middleware array.
            offset(this.options.distance),
            // https://floating-ui.com/docs/flip
            flip(),
            // https://floating-ui.com/docs/shift
            shift(),
            // https://floating-ui.com/docs/arrow
            // arrow() should generally be placed toward the end of your middleware array, after shift().
            arrow({ element: this.getArrowElement(), padding: 8 }),
        ];
    }

    async updatePosition(): Promise<void> {
        if (!this.getReferenceElement) {
            console.warn(this.host.tagName, ' could not find reference element with id: #', this.options?.reference);
            return;
        }

        const { x, y, strategy, placement, middlewareData } = await computePosition(
            this.getReferenceElement()!,
            this.host,
            {
                placement: this.options.placement,
                middleware: this.buildMiddlewares(),
                platform: {
                    ...platform,
                    getOffsetParent: (element) => platform.getOffsetParent(element, offsetParent),
                },
            }
        );

        Object.assign(this.host.style, {
            position: strategy,
            left: `${x}px`,
            top: `${y}px`,
        });

        const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]];

        if (middlewareData.arrow && this.getArrowElement()) {
            const { x, y } = middlewareData.arrow;
            Object.assign(this.getArrowElement().style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
                [staticSide!]: `${-this.getArrowElement().offsetWidth / 2}px`,
            });
        }
    }

    setOptions(options: FloatingControllerOptions): void {
        this.options = options;
    }

    private addEventListeners(): void {
        const referenceElement = this.getReferenceElement();
        referenceElement?.addEventListener('keydown', this.handleKeyDown);

        if (this.hasTrigger('click')) {
            referenceElement?.addEventListener('click', this.handleClick);
            document.addEventListener('click', this.handleClickOutside, true);
            if (this.options.hideOnClick) this.host.addEventListener('click', this.host.hide);
        }

        if (this.hasTrigger('hover')) {
            referenceElement?.addEventListener('mouseover', this.handleMouseOver);
            referenceElement?.addEventListener('mouseout', this.handleMouseOut);
        }

        if (this.hasTrigger('focus')) {
            referenceElement?.addEventListener('focusin', this.handleFocusIn, true);
            referenceElement?.addEventListener('focusout', this.handleFocusOut, true);
        }

        window.addEventListener('resize', this.handleResize);
    }

    private removeEventListeners(): void {
        const referenceElement = this.getReferenceElement();

        if (!referenceElement) {
            console.warn(this.host.tagName, ' could not find reference element with id: #', this.options?.reference);
            return;
        }

        referenceElement.removeEventListener('keydown', this.handleKeyDown);

        if (this.hasTrigger('click')) {
            referenceElement.removeEventListener('click', this.handleClick);
            document.removeEventListener('click', this.handleClickOutside, true);
            this.host.removeEventListener('click', this.host.hide);
        }

        if (this.hasTrigger('hover')) {
            referenceElement.removeEventListener('mouseover', this.handleMouseOver);
            referenceElement.removeEventListener('mouseout', this.handleMouseOut);
        }

        if (this.hasTrigger('focus')) {
            referenceElement.removeEventListener('focusin', this.handleFocusIn, true);
            referenceElement.removeEventListener('focusout', this.handleFocusOut, true);
        }

        window.removeEventListener('resize', this.handleResize);
    }

    private hasTrigger(trigger: string): boolean {
        return this.options.trigger.split(' ').includes(trigger);
    }

    private handleClick = (): void => {
        this.host.toggle();
    };

    private handleMouseOver = (): void => {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.host.show(), this.options.showDelay);
    };

    private handleMouseOut = (): void => {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.host.hide(), this.options.hideDelay);
    };

    private handleFocusIn = (): void => {
        this.host.show();
    };

    private handleFocusOut = (): void => {
        this.host.hide();
    };

    private handleClickOutside = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        if (!this.host.contains(target) && !this.getReferenceElement()?.contains(target) && event.button === 0) {
            this.host.hide();
        }
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this.host.open && event.key === 'Escape') {
            event.stopPropagation();
            this.host.hide();
        }
    };

    private handleResize = (): void => {
        if (this.host.open) {
            this.host.hide();
        }
    };
}
