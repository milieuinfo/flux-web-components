export const assignUnslotted = (host: HTMLElement, slot: string): void => {
    [...host.childNodes].forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && !(node as Element).hasAttribute('slot')) {
            (node as Element).setAttribute('slot', slot);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const span = document.createElement('span');
            span.setAttribute('slot', slot);
            node.replaceWith(span);
            span.append(node);
        }
    });
};

export const renameSlot = (host: HTMLElement, from: string, to: string): void => {
    host.querySelectorAll(`:scope > [slot="${from}"]`).forEach((el) => el.setAttribute('slot', to));
};

export const syncOwnedSlot = (host: HTMLElement, slot: string, text: string | null | undefined): void => {
    let owned = host.querySelector<HTMLElement>(`:scope > [data-flux-owned="${slot}"]`);
    if (!text) {
        owned?.remove();
        return;
    }
    if (!owned) {
        owned = document.createElement('span');
        owned.setAttribute('slot', slot);
        owned.dataset.fluxOwned = slot;
        host.prepend(owned);
    }
    if (owned.textContent !== text) {
        owned.textContent = text;
    }
};

export const observeChildren = (host: HTMLElement, onChange: () => void): MutationObserver => {
    const observer = new MutationObserver(onChange);
    observer.observe(host, { childList: true });
    return observer;
};
