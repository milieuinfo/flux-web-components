const accordionClass = 'js-vl-accordion';
const openClass = `${accordionClass}--open`;
const toggleTextSelector = `.${accordionClass}__toggle__text`;
const disabledClass = 'vl-step--disabled';
const iconPlusClass = 'vl-vi-plus';
const iconMinClass = 'vl-vi-minus';
const contentSelector = '.vl-accordion__content';
const dressedAttribute = 'data-accordion-dressed';
const accordionSelector = `.${accordionClass}, [accordion],[data-accordion]`;
const toggleSelector = '[accordion-toggle],[data-accordion-toggle]';
const openTextAttribute = 'accordion-open-text';
const closeTextAttribute = 'accordion-close-text';

const getDualAttribute = (element: Element, name: string): string =>
    element.getAttribute(`data-${name}`) || element.getAttribute(name) || '';

const uniqueId = (): string => `vl-accordion-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

const openOnMatchingHash = (element: HTMLElement) => {
    if (window.location.hash && element.id && `#${element.id}` === window.location.hash) {
        openAccordion(element);
    }
};

export const openAccordion = (element: Element) => {
    const toggle = element.querySelector<HTMLElement>(toggleSelector);
    if (toggle && !element.classList.contains(openClass)) {
        toggle.click();
    }
};

export const toggleAccordion = (element: Element) => {
    element.querySelector<HTMLElement>(toggleSelector)?.click();
};

export const dressAccordion = (element: HTMLElement) => {
    const accordionId = element.getAttribute('id') || uniqueId();
    const toggleText = element.querySelector<HTMLElement>(toggleTextSelector);
    const accordion = element.closest(accordionSelector);
    const accordionContent = accordion?.querySelector(contentSelector);
    let hidden = true;

    element.setAttribute(dressedAttribute, 'true');
    accordionContent?.setAttribute('aria-hidden', String(hidden));

    if (toggleText) {
        toggleText.innerHTML = element.classList.contains(openClass)
            ? getDualAttribute(toggleText, closeTextAttribute)
            : getDualAttribute(toggleText, openTextAttribute);
        toggleText.setAttribute('id', accordionId);
    } else {
        element.setAttribute('aria-expanded', 'false');
    }

    element.addEventListener('click', (event: Event) => {
        const clickedAccordion = (event.target as Element).closest(accordionSelector);
        if (!clickedAccordion || element.classList.contains(disabledClass)) {
            return;
        }

        event.preventDefault();
        hidden = !hidden;
        clickedAccordion.classList.toggle(openClass);

        if (!toggleText) {
            element.setAttribute('aria-expanded', String(!hidden));
        }

        clickedAccordion.dispatchEvent(new CustomEvent('vl.accordion.hook.onChange', { detail: !hidden }));

        const icon = element.querySelector('.vl-vi');
        if (icon?.classList.contains(iconPlusClass)) {
            icon.classList.replace(iconPlusClass, iconMinClass);
        } else if (icon?.classList.contains(iconMinClass)) {
            icon.classList.replace(iconMinClass, iconPlusClass);
        }

        accordionContent?.setAttribute('aria-hidden', String(hidden));

        if (toggleText) {
            toggleText.innerHTML = clickedAccordion.classList.contains(openClass)
                ? getDualAttribute(toggleText, closeTextAttribute)
                : getDualAttribute(toggleText, openTextAttribute);
        }
    });

    openOnMatchingHash(element);
    window.addEventListener('hashchange', () => openOnMatchingHash(element));
};
