import './legacy-core.js';
import './legacy-breakpoint.js';

declare global {
    interface Window {
        vl: any;
        util: any;
        breakpoint: any;
    }
}

export const legacyCore = window.vl;
export const legacyBreakpoint = window.breakpoint;
