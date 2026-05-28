import { isSafari } from '@domg-wc/common';
import {
    arrow,
    computePosition,
    flip,
    Middleware,
    offset,
    platform,
    shift,
    size,
    Strategy,
    type Placement,
} from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { LitElement, ReactiveController } from 'lit';
import { POPOVER_ARIA_TYPE, POPOVER_TYPE } from './vl-popover.model';

export type FloatingControllerOptions = {
    reference: string;
    trigger: string;
    placement: Placement;
    distance: number;
    showDelay: number;
    hideDelay: number;
    hideOnClick: boolean;
    strategy: Strategy;
    type: POPOVER_TYPE;
    // Een tooltip kan dienst doen als "label" van de trigger knop of als extra "description" voor de trigger
    ariaType?: POPOVER_ARIA_TYPE;
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
    private hostHover = false;
    private ignoreNextClick = false;

    constructor(host: FloatingElement, options: FloatingControllerOptions) {
        this.setOptions(options);
        this.host = host;
        this.host.addController(this);
    }

    get isTooltip() {
        return this.options.type === POPOVER_TYPE.TOOLTIP;
    }

    hostConnected(): void {
        this.addEventListeners();
        if (!this.host.id) {
            this.host.id = `popover-${Math.random().toString().substring(2, 10)}`;
        }
        if (this.isTooltip) {
            this.host.shadowRoot?.querySelector('.popover-content')?.setAttribute('role', 'tooltip');
            if (this.options.ariaType === POPOVER_ARIA_TYPE.DESCRIPTION) {
                this.addAttributeToTrigger('aria-describedby', this.host.id);
            } else if (
                this.options.ariaType === POPOVER_ARIA_TYPE.LABEL &&
                !this.getReferenceElement()?.hasAttribute('aria-label')
            ) {
                this.addAttributeToTrigger('aria-labelledby', this.host.id);
            }
        } else {
            this.addAttributeToTrigger('aria-controls', this.host.id);
            this.addAttributeToTrigger('aria-haspopup', 'true');
        }
    }

    hostDisconnected(): void {
        this.removeEventListeners();
    }

    // For popovers that are not tooltips, we need to distinguish between the reference element itself and the trigger button
    // The trigger button:
    // - captures the events
    // - is the button on which we need to set the aria attributes and the event listeners
    // The reference element:
    // - is the element that is used to position the popover
    // - captures the keydown event to close the popover on 'Escape'
    // They are the same element if the reference element is a button
    get triggerButton(): HTMLElement {
        if (this.isTooltip) {
            // For tooltips, if the reference element is not a button, we can use the reference element itself as the trigger
            return this.referenceElement;
        }

        if (this.referenceElement instanceof HTMLButtonElement) {
            return this.referenceElement;
        }

        if (this.referenceElement instanceof HTMLElement && this.referenceElement.getAttribute('role') === 'button') {
            return this.referenceElement;
        }

        // If the reference element is not a button, then find the first button within the reference element.
        // This is necessary to place the aria attributes. These must be on the button itself.
        const firstButton: HTMLElement | null =
            this.referenceElement.querySelector<HTMLButtonElement>('button') ||
            this.referenceElement.shadowRoot?.querySelector<HTMLButtonElement>('button') ||
            this.referenceElement.querySelector<HTMLElement>('[role="button"]') ||
            this.referenceElement.shadowRoot?.querySelector<HTMLElement>('[role="button"]') ||
            null;

        if (!firstButton) {
            const message = `Het referentie element (#${this.options.reference}) bevat geen button. Gebruik een button of pas \`role="button"\` correct toe (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role).`;
            console.warn(this.host.tagName, message);
            return this.referenceElement;
        }

        return firstButton;
    }

    get referenceElement(): HTMLElement {
        return this.getReferenceElement();
    }

    getReferenceElement(): HTMLElement {
        const referenceId = `#${this.options.reference}`;
        const hostRootNode = this.host.getRootNode() as Element;
        const referenceElement =
            document.querySelector<HTMLElement>(referenceId) || hostRootNode.querySelector<HTMLElement>(referenceId);

        if (!referenceElement) {
            const message = `Het referentie element (#${this.options.reference}) kon niet gevonden worden.`;
            console.warn(this.host.tagName, message);
            // Fallback to the parent element of the host if the reference element is not found
            return this.host.parentElement as HTMLElement;
        }

        return referenceElement;
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
            // https://floating-ui.com/docs/size
            // size() runs after flip() so it measures available height on the final chosen side.
            // padding: 10 leaves room for the drop-shadow on .popover-content without viewport clipping.
            size({
                padding: 10,
                apply({ availableHeight, elements }) {
                    elements.floating.style.setProperty('--available-height', `${availableHeight}px`);
                },
            }),
            // https://floating-ui.com/docs/shift
            shift(),
            // https://floating-ui.com/docs/arrow
            // arrow() should generally be placed toward the end of your middleware array, after shift().
            arrow({ element: this.getArrowElement(), padding: 8 }),
        ];
    }

    async updatePosition(): Promise<void> {
        const { x, y, placement, middlewareData } = await computePosition(this.referenceElement, this.host, {
            placement: this.options.placement,
            middleware: this.buildMiddlewares(),
            platform: {
                ...platform,
                getOffsetParent: (element) => platform.getOffsetParent(element, offsetParent),
            },
        });

        Object.assign(this.host.style, {
            position: this.options.strategy,
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

    show(): void {
        this.host.show();
        document.addEventListener('click', this.handleClickOutside, true);
    }

    hide(): void {
        this.host.hide();
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    toggle(): void {
        if (this.host.open) {
            this.hide();
        } else {
            this.show();
        }
    }

    private addEventListeners(): void {
        this.referenceElement.addEventListener('keydown', this.handleKeyDown);

        if (this.hasTrigger('click')) {
            this.triggerButton.addEventListener('click', this.handleClick);
            document.addEventListener('click', this.handleClickOutside, true);
        }
        if (this.options.hideOnClick) {
            this.host.addEventListener('click', this.handleHideOnClick);
        }

        if (this.hasTrigger('hover')) {
            this.triggerButton.addEventListener('mouseover', this.handleMouseOver);
            this.triggerButton.addEventListener('mouseout', this.handleMouseOut);
        }

        this.host.addEventListener('mouseover', this.handleHostMouseOver);
        this.host.addEventListener('mouseout', this.handleHostMouseOut);

        if (this.hasTrigger('focus')) {
            // Show the popover/tooltip on focus
            this.triggerButton.addEventListener('focusin', this.handleFocusIn, true);
        }
        // Hide the popover/tooltip on focusout (also without the "focus" trigger)
        // This makes sure the popover doesn't stay open when opening another popover
        this.triggerButton.addEventListener('focusout', this.handleFocusOut, true);

        this.host.addEventListener('focusout', this.handleHostFocusOut);
        this.host.addEventListener('keydown', this.handleKeyDown);

        window.addEventListener('resize', this.handleResize);
    }

    private removeEventListeners(): void {
        this.referenceElement.removeEventListener('keydown', this.handleKeyDown);

        if (this.hasTrigger('click')) {
            this.triggerButton.removeEventListener('click', this.handleClick);
            document.removeEventListener('click', this.handleClickOutside, true);
        }
        this.host.removeEventListener('click', this.handleHideOnClick);

        if (this.hasTrigger('hover')) {
            this.triggerButton.removeEventListener('mouseover', this.handleMouseOver);
            this.triggerButton.removeEventListener('mouseout', this.handleMouseOut);
        }

        this.host.removeEventListener('mouseover', this.handleHostMouseOver);
        this.host.removeEventListener('mouseout', this.handleHostMouseOut);

        if (this.hasTrigger('focus')) {
            this.triggerButton.removeEventListener('focusin', this.handleFocusIn, true);
        }
        this.triggerButton.removeEventListener('focusout', this.handleFocusOut, true);
        
        this.host.removeEventListener('focusout', this.handleHostFocusOut);
        this.host.removeEventListener('keydown', this.handleKeyDown);

        window.removeEventListener('resize', this.handleResize);
    }

    private hasTrigger(trigger: string): boolean {
        return this.options.trigger.includes(trigger);
    }

    private handleClick = (): void => {
        if (this.ignoreNextClick) {
            this.ignoreNextClick = false;
            return;
        }

        this.host.toggle();
    };

    private handleHideOnClick = (): void => {
        this.hide();
    };

    private handleMouseOver = (): void => {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.show(), this.options.showDelay);
    };

    private handleMouseOut = (): void => {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(
            () => {
                if (!this.hostHover) this.hide();
                else this.handleMouseOut();
            },
            // A minimum delay of 100ms is added to prevent the popover from hiding too quickly when moving the mouse from the reference to the popover.
            this.options.hideDelay > 100 ? this.options.hideDelay : 100
        );
    };

    private handleHostMouseOver = (): void => {
        this.hostHover = true;
    };

    private handleHostMouseOut = (): void => {
        this.hostHover = false;
    };

    private handleFocusIn = (): void => {
        this.show();
        // Ignore the next click coming from the same event
        this.ignoreNextClick = true;
    };

    private handleFocusOut = (): void => {
        setTimeout(() => {
            if (!this.host.matches(':focus') && !this.host.matches(':focus-within')) {
                this.hide();
            }
        }, 100);
    };

    private handleHostFocusOut = ({ relatedTarget }: FocusEvent): void => {
        if (isSafari && relatedTarget instanceof HTMLElement && this.host.contains(relatedTarget)) {
            // In Safari, tabbing from one popover-action to another triggers the focusout event.
            // As a result the popover closes when you tab from one action to another, which would make any action but
            // the first one unreachable using the keyboard. If the focus stays within the popover, we don't hide it.
            return;
        }
        if (!this.host.matches(':focus-within')) {
            this.hide();
        }
    };

    private handleClickOutside = (e: MouseEvent): void => {
        const path = e.composedPath();
        if (path.includes(this.referenceElement)) return;
        if (path.includes(this.triggerButton)) return;
        if (path.includes(this.host)) return;

        this.host.blur();
        this.hide();
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this.host.open && event.key === 'Escape') {
            event.stopPropagation();
            this.hide();
        }
    };

    private handleResize = (): void => {
        if (this.host.open) {
            this.updatePosition();
        }
    };

    private addAttributeToTrigger(attribute: string, value: string): void {
        if (!this.triggerButton.hasAttribute(attribute)) {
            this.triggerButton.setAttribute(attribute, value);
        }
    }

    public setExpanded = (expanded: boolean): void => {
        if (!this.isTooltip) {
            this.triggerButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
    };
}
