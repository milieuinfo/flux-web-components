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
        this.value = this._getBreakpoint();
    }
}

if (!('breakpoint' in vl)) {
    vl.breakpoint = new Breakpoint();
    vl.breakpoint.dress();
}

export default Breakpoint;
