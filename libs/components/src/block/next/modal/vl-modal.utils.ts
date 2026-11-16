type MaybeLitElement = HTMLElement & { updateComplete?: Promise<unknown> };

const AUTOFOCUS_SLOTS = ['content', 'button'];
const AUTOFOCUS_SELECTOR = '[autofocus]:not(:disabled, [disabled])';

export const deepActiveElement = (): HTMLElement | null => {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
    }
    return active instanceof HTMLElement && active !== document.body ? active : null;
};

const flatTreeParent = (node: Node): Node | null =>
    (node instanceof Element && node.assignedSlot) || (node instanceof ShadowRoot ? node.host : node.parentNode);

// Een autofocus-element in een geneste modal of dialog hoort bij die dialog, niet bij de buitenste.
const isInNestedDialog = (element: Element, slottedRoot: Element): boolean => {
    let node: Node | null = element;
    while (node && node !== slottedRoot) {
        node = flatTreeParent(node);
        if (node instanceof HTMLDialogElement) {
            return true;
        }
    }
    return false;
};

const findAutofocusTarget = (dialog: HTMLDialogElement): MaybeLitElement | null => {
    for (const name of AUTOFOCUS_SLOTS) {
        const slot = dialog.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);
        for (const slotted of slot?.assignedElements({ flatten: true }) ?? []) {
            const target = [slotted, ...slotted.querySelectorAll(AUTOFOCUS_SELECTOR)].find(
                (candidate) => candidate.matches(AUTOFOCUS_SELECTOR) && !isInNestedDialog(candidate, slotted),
            );
            if (target instanceof HTMLElement) {
                return target;
            }
        }
    }
    return null;
};

const whenRendered = async (element: MaybeLitElement) => {
    if (element.matches(':not(:defined)')) {
        await customElements.whenDefined(element.localName);
    }
    await element.updateComplete;
};

const focusWhenRendered = (target: MaybeLitElement, dialog: HTMLDialogElement) => {
    target.focus();
    if (target.matches(':focus-within')) {
        return;
    }
    // Een component met delegatesFocus kan de focus pas doorgeven na zijn eerste render, bv. in een modal die al open
    // is bij het laden van de pagina. Heeft de gebruiker de focus intussen zelf verplaatst, dan blijft die staan.
    const activeElement = deepActiveElement();
    // Bewust geen catch: Lit meldt een mislukte render alleen via updateComplete. Een catch hier zou die fout verbergen.
    whenRendered(target).then(() => {
        if (dialog.open && deepActiveElement() === activeElement) {
            target.focus();
        }
    });
};

// Met inerte inhoud focust showModal() de dialog zelf. Zo krijgt het eerste focusbare element, bv. een destructieve
// actie, niet eerst kort de focus. Het autofocus-attribuut op de dialog doet volgens de HTML-spec hetzelfde, maar
// Chrome negeert het daar.
const showModalWithoutFocusingContent = (dialog: HTMLDialogElement) => {
    const content = Array.from(dialog.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && !child.inert,
    );
    content.forEach((child) => (child.inert = true));
    try {
        dialog.showModal();
    } finally {
        content.forEach((child) => (child.inert = false));
    }
};

/**
 * Opent de dialog als modal en zet de focus op het eerste slotted element met `autofocus`. Zonder zo'n element krijgt
 * het eerste focusbare element de focus, met `focusOnDialog` de dialog zelf.
 */
export const showModalWithInitialFocus = (dialog: HTMLDialogElement, focusOnDialog: boolean) => {
    const autofocusTarget = focusOnDialog ? null : findAutofocusTarget(dialog);
    if (autofocusTarget) {
        showModalWithoutFocusingContent(dialog);
        focusWhenRendered(autofocusTarget, dialog);
        return;
    }
    dialog.showModal();
    if (focusOnDialog) {
        dialog.focus();
    }
};
