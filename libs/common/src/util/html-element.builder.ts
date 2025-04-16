const buildHTMLElement = <H extends HTMLElement>(
    tagName: string,
    innerHtml: string | null,
    className: string | null = null
): H => {
    const element: H = document.createElement(tagName) as H;
    if (className) element.className = className;
    if (innerHtml) element.innerHTML = innerHtml;
    return element;
};

export const buildSpan = (innerHtml: string | null, className: string | null = null): HTMLSpanElement =>
    buildHTMLElement('span', innerHtml, className);

export const buildDiv = (innerHtml: string | null, className: string | null = null): HTMLDivElement =>
    buildHTMLElement('div', innerHtml, className);

export const buildLabel = (innerHtml: string | null, className: string | null = null): HTMLLabelElement =>
    buildHTMLElement('label', innerHtml, className);

export const buildData = (innerHtml: string | null, className: string | null = null): HTMLDataElement =>
    buildHTMLElement('data', innerHtml, className);
