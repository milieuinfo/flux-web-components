import { VlSideSheet } from '@domg-wc/components';

export const sideSheetToggleImplementation = () => {
    let sideSheet: VlSideSheet;
    let listenerButton: HTMLElement;
    customElements.whenDefined('vl-side-sheet').then(() => {
        sideSheet = document.querySelector('#side-sheet-toggle') as unknown as VlSideSheet;
        listenerButton = document.querySelector(
            '#vl-side-sheet-open-button-with-close-listener'
        ) as unknown as HTMLElement;
    });
    const toggleSideSheet = () => sideSheet?.toggle();

    const openSideSheet = () => sideSheet?.open();
    const closeSideSheet = () => sideSheet?.close();

    return { toggleSideSheet, openSideSheet, closeSideSheet };
};

export default sideSheetToggleImplementation;
