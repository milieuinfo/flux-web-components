import { html } from 'lit';
import { VlButtonElementType } from './vl-button-style.css';

export const buttonVariants = ['primary', 'secondary', 'tertiary', 'ghost', 'error', 'toggle'] as const;
export const buttonSizes = ['default', 'large', 'wide', 'narrow', 'block'] as const;
export const buttonIcons = ['none', 'before', 'after', 'only'] as const;
export const buttonStates = ['idle', 'loading', 'disabled'] as const;

const buttonClasses = (buttonVariant: string, buttonSize: string, buttonIcon: string, buttonState: string) =>
    `${buttonVariant} ${buttonSize} icon-${buttonIcon} ${buttonState}`;

const buttonTitle = (
    element: string,
    buttonVariant: string,
    buttonSize: string,
    buttonIcon: string,
    buttonState: string
) =>
    html`<dl style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <dt><strong>Element</strong></dt>
        <dd>${element}</dd>
        <dt><strong>Variant</strong></dt>
        <dd>${buttonVariant}</dd>
        <dt><strong>Size</strong></dt>
        <dd>${buttonSize}</dd>
        <dt><strong>Icon</strong></dt>
        <dd>${buttonIcon}</dd>
        <dt><strong>State</strong></dt>
        <dd>${buttonState}</dd>
    </dl>`;

const buttonContent = (buttonIcon: string) => html`${buttonIcon === 'before'
    ? html`<span class="vl-icon vl-icon--before vl-icon--add"></span>`
    : ''}
${buttonIcon === 'only' ? html`<span class="vl-icon vl-icon--add"></span>` : 'Klik hier'}
${buttonIcon === 'after' ? html`<span class="vl-icon vl-icon--after vl-icon--add"></span>` : ''} `;

export const renderAllButtonVariants = (element: VlButtonElementType, selector: string) => html`<div
    style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;"
>
    ${buttonVariants.map((buttonVariant) =>
        buttonSizes.map((buttonSize) =>
            buttonIcons.map((buttonIcon) =>
                buttonStates.map(
                    (buttonState) =>
                        html`
                            <div>
                                ${element === 'button'
                                    ? html`<button
                                          id="${[buttonVariant, buttonSize, buttonIcon, buttonState].join('_')}"
                                          class="${selector} ${buttonClasses(
                                              buttonVariant,
                                              buttonSize,
                                              buttonIcon,
                                              buttonState
                                          )}"
                                      >
                                          ${buttonContent(buttonIcon)}
                                      </button>`
                                    : html`<a
                                          id="${[buttonVariant, buttonSize, buttonIcon, buttonState].join('_')}"
                                          href="#"
                                          class="${selector} ${buttonClasses(
                                              buttonVariant,
                                              buttonSize,
                                              buttonIcon,
                                              buttonState
                                          )}"
                                      >
                                          ${buttonContent(buttonIcon)}
                                      </a>`}
                                <vl-popover
                                    for="${[buttonVariant, buttonSize, buttonIcon, buttonState].join('_')}"
                                    trigger="hover"
                                >
                                    ${buttonTitle(element, buttonVariant, buttonSize, buttonIcon, buttonState)}
                                </vl-popover>
                            </div>
                        `
                )
            )
        )
    )}
</div>`;
