class Breakpoint {
    constructor() {
        this.value = null;
    }

    // Private functions
    _getBreakpoint() {
        // transfer css breakpoints to JS
        return window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g, '');
    }

    // Public functions
    dress() {
        this.value = this._getBreakpoint();

        /**
         * Add eventlisteners to window
         */
        window.addEventListener(
            'resize',
            vl.util.debounce(() => {
                this.refreshValue();
            }),
            50
        );
    }

    refreshValue() {
        const breakpoint = this._getBreakpoint();
        const shouldDispatch = this.value !== breakpoint;
        this.value = breakpoint;

        // FLUX-92: dispatch event wanneer het breakpoint verandert
        // Dit werkt gedetailleerder dan te luisteren naar resize events
        if (shouldDispatch) {
            window.dispatchEvent(new CustomEvent('vl-breakpoint-changed', {
                detail: {
                    breakpoint
                }
            }))
        }
    }
}

if (!('breakpoint' in vl)) {
    vl.breakpoint = new Breakpoint();
    vl.breakpoint.dress();
}

export default Breakpoint;
