// De VL interface bevat typing voor verschillende JavaScript componenten die gebruik maken van het `vl`-object
// Voor JavaScript componenten, gebruikt Digitaal Vlaanderen een `vl`-object dat ze creëren op Window
// typisch worden de sub-objecten van `vl` gebruikt binnen die JavaScript componenten

interface Accordion {
    dress(element: any): void;

    dressAll(): void;

    open(): void;

    toggle(): void;
}

interface Breakpoint {
    value: string;
} // 'small'

interface CodePreview {
    dress(element: any): void;

    dressAll(): void;
}

interface Datepicker {
    dress(element: any): void;

    dressAll(): void;
}

interface FormValidation {
    dress(form: any, escapeFieldNames: boolean): void;

    undress(form: any): void;

    dressAll(): void;

    reset(form: any): void;

    resetInput(el: HTMLElement): void;
}

interface Translation {
    i18n: any;
}

interface Infotext {
    dress(element: any): void;

    dressAll(): void;
}

interface Modal {
    lastClickedToggle: any;
}

interface Pattern {
    patterns: any;
    patternInstances: any[];
}

interface Select {
    selectInstances: any[];
    globalConfig: any;

    dress(element: unknown, params?: object, config?: { position: string }): void;

    undress(element: unknown): void;

    enable(element: HTMLElement): void;

    disable(element: HTMLElement): void;

    removeActive(element: HTMLElement): void;

    showDropdown(element: HTMLElement): void;

    hideDropdown(element: HTMLElement): void;

    setValueByChoice(element: HTMLElement, value: string): void;
}

interface SideNavigation {
    dress(sideNav: any): void;

    undress(): void;

    dressAll(): void;
}

interface Tabs {
    currentTabIndexForCurrentTabsContainer: number;

    dress(element: HTMLElement | null): void;
}

interface Toaster {
    dress(toaster: any): void;

    dressAll(): void;
}

interface Tooltip$$1 {
    tooltips: HTMLElement[];

    undress(tooltip: HTMLElement): void;

    createTooltip(parentNode: HTMLElement): void;
}

interface Upload {
    dress(element: any): void;

    dressAll(): void;

    undress(): void;

    enable(element: HTMLElement | undefined): void;

    disable(element: HTMLElement | undefined): void;

    dropzoneInstances: any[];
    disabledMutationObserver: MutationObserver;
}

interface Util {
    accurateNumber(number: any): any;

    addClass(el: HTMLElement, classes: string): void;

    addClassFor(el: HTMLElement, classes: string, duration: number): void;

    asArray(a: unknown): any[];

    bytesToSize(bytes: number, addUnits: boolean, base: number): number;

    closest(value: any, to: any): any;

    countDecimals(numStr: unknown): any;

    debounce(func: (...args: any[]) => any, wait: number, immediate?: boolean): any;

    each(arr: any[], fn: (el: any) => any): any;

    exists(value: unknown): any;

    getJson(url: string, callback: () => any): any;

    getParents(elem: HTMLElement, selector: string): any;

    getParentsUntil(elem: HTMLElement, parent: HTMLElement, selector: string): any;

    hasClass(el: HTMLElement, classes: any): any;

    insertAfter(newElement: HTMLElement, targetElement: HTMLElement): void;

    isNumeric(number: unknown): boolean;

    limit(a: any): any;

    offset(el: HTMLElement): any;

    parseTemplate(str: string, data: any): any;

    randomIntFromInterval(min: number, max: number): number;

    removeClass(el: HTMLElement, classes: any): void;

    removeElement(targetElement: HTMLElement): void;

    scrollTo(el: HTMLElement, to: any, duration: number): void;

    stripTags(html: string): any;

    throttle(func: () => any): void;

    toggleClass(el: HTMLElement, classes: string, force?: boolean): any;

    triggerEvent(obj: HTMLElement, evt: string): void;

    unique(array: any[]): any;

    uniqueId(): any;

    uniqueName(): any;

    wrap(el: HTMLElement, wrapper: HTMLElement): any;
}

interface VideoPlayer {
    playerOptions: any;
    playerInstances: any[];
    amountOfPlayersEnhanced: number;
    playersActive: any[];
    players: NodeList;
}

interface Widget {
    client: any;
}

export interface VL {
    accordion: Accordion;
    breakpoint: Breakpoint;
    codePreview: CodePreview;
    datepicker: Datepicker;
    formValidation: FormValidation;
    i18n: Translation;
    infotext: Infotext;
    modal: Modal;
    ns: 'vl-';
    pattern: Pattern;
    select: Select;
    scrollspy: any;
    sticky: any;
    sideNavigation: SideNavigation;
    tabs: Tabs;
    toaster: Toaster;
    tooltip: Tooltip$$1;
    upload: Upload;
    util: Util;
    videoPlayer: VideoPlayer;
    widget: Widget;
}
