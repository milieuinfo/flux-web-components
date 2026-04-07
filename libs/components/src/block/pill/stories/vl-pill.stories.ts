import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../vl-pill.component';
import { pillArgs, pillArgTypes } from './vl-pill.stories-arg';
import pillDoc from './vl-pill.stories-doc.mdx';

export default {
    id: 'components-block-pill',
    title: 'Components - Block/pill',
    tags: ['autodocs'],
    args: pillArgs,
    argTypes: pillArgTypes,
    parameters: {
        docs: {
            page: pillDoc,
        },
    },
} as Meta<typeof pillArgs>;

export const PillDefault = ({
    closable,
    checkable,
    clickable,
    click,
    checked,
    type,
    disabled,
    close,
    check,
}: typeof pillArgs) => html`
    <vl-pill
        ?closable=${closable}
        ?checkable=${checkable}
        ?clickable=${clickable}
        type=${type}
        ?disabled=${disabled}
        .checked=${checked}
        @close=${(event: any) => close(event)}
        @check=${(event: any) => check(event.detail)}
        @click=${(event: any) => click(event)}
        data-cy="pill"
    >
        ${type || 'Optie 1'}${disabled ? ' (disabled)' : ''}
    </vl-pill>
`;
PillDefault.storyName = 'vl-pill - default';

export const PillAllVariants = () =>
    html`<div class="vl-stacked vl-stacked-medium">
        ${['default', 'success', 'warning', 'error', 'disabled'].map(
            (type) =>
                html`<div>
                    <vl-title type="h2">${type}</vl-title>
                    ${['default', 'closable', 'checkable', 'clickable'].map(
                        (variant) =>
                            html`<div style="display: grid; grid-template-columns: 100px 80px auto;">
                                ${variant}
                                ${['unchecked', 'checked'].map((checked) =>
                                    variant !== 'checkable' && checked === 'checked'
                                        ? html``
                                        : html`
                                              <vl-pill
                                                  ?closable=${variant === 'closable'}
                                                  ?checkable=${variant === 'checkable'}
                                                  ?clickable=${variant === 'clickable'}
                                                  type=${ifDefined(type !== 'default' ? type : undefined)}
                                                  ?disabled=${type === 'disabled'}
                                                  .checked=${checked === 'checked'}
                                                  >pill</vl-pill
                                              >
                                          `,
                                )}
                            </div>`,
                    )}
                </div> `,
        )}
    </div> `;
PillAllVariants.storyName = 'vl-pill - alle varianten';
PillAllVariants.parameters = {
    controls: { disable: true },
};


export const PillCustomColors = () =>
    html` <style>
            .my-pill-primary {
                --vl-pill--border-color: var(--vl-color--primary-800);
                --vl-pill--text-color: var(--vl-color--text-primary);
                --vl-pill--background-color: var(--vl-color--primary-600);
                --vl-pill--border-color-action: var(--vl-color--primary-1000);
                --vl-pill--text-color-action: var(--vl-color--text-primary);
                --vl-pill--background-color-action: var(--vl-color--primary-600);
            }
            .my-pill-primary-light {
                --vl-pill--border-color: var(--vl-color--border-primary);
                --vl-pill--text-color: var(--vl-color--text-primary);
                --vl-pill--background-color: var(--vl-color--background-primary-subtle);
                --vl-pill--border-color-action: var(--vl-color--grey-1000);
                --vl-pill--text-color-action: var(--vl-color--text-primary);
                --vl-pill--background-color-action: var(--vl-color--background-primary);
            }
            .my-pill-primary-niveau2 {
                --vl-pill--border-color: var(--vl-color--primary-niveau2-900);
                --vl-pill--text-color: var(--vl-color--primary-niveau2-100);
                --vl-pill--background-color: var(--vl-color--primary-niveau2-900);
                --vl-pill--border-color-action: var(--vl-color--primary-niveau2-1000);
                --vl-pill--text-color-action: var(--vl-color--primary-niveau2-100);
                --vl-pill--background-color-action: var(--vl-color--primary-niveau2-1000);
            }
            .my-pill-primary-niveau2-light {
                --vl-pill--border-color: var(--vl-color--primary-niveau2-800);
                --vl-pill--text-color: var(--vl-color--primary-niveau2-1000);
                --vl-pill--background-color: var(--vl-color--primary-niveau2-200);
                --vl-pill--border-color-action: var(--vl-color--primary-niveau2-900);
                --vl-pill--text-color-action: var(--vl-color--primary-niveau2-100);
                --vl-pill--background-color-action: var(--vl-color--primary-niveau2-900);
            }
            .my-pill-action {
                --vl-pill--border-color: var(--vl-color--border-action);
                --vl-pill--text-color: #fff;
                --vl-pill--background-color: var(--vl-color--background-action);
                --vl-pill--border-color-action: var(--vl-color--action-800);
                --vl-pill--text-color-action: #fff;
                --vl-pill--background-color-action: var(--vl-color--action-800);
            }
            .my-pill-action-light {
                --vl-pill--border-color: var(--vl-color--border-action);
                --vl-pill--text-color: var(--vl-color--active-text-action);
                --vl-pill--background-color: var(--vl-color--background-action-subtle);
                --vl-pill--border-color-action: var(--vl-color--action-800);
                --vl-pill--text-color-action: #fff;
                --vl-pill--background-color-action: var(--vl-color--action-800);
            }
            .my-pill-omg-hoofdkleur {
                --vl-pill--text-color: #fff;
                --vl-pill--text-color-action: #fff;
                --vl-pill--border-color: var(--vl-color--domg-hoofdkleur);
                --vl-pill--border-color-action: var(--vl-color--domg-hoofdkleur-light);
                --vl-pill--background-color: var(--vl-color--domg-hoofdkleur);
                --vl-pill--background-color-action: var(--vl-color--domg-hoofdkleur-light);
            }
            .my-pill-omg-steunkleur {
                --vl-pill--text-color: #fff;
                --vl-pill--text-color-action: #fff;
                --vl-pill--border-color: var(--vl-color--domg-steunkleur);
                --vl-pill--border-color-action: var(--vl-color--domg-steunkleur-light);
                --vl-pill--background-color: var(--vl-color--domg-steunkleur);
                --vl-pill--background-color-action: var(--vl-color--domg-steunkleur-light);
            }
        </style>
        <div class="vl-stacked vl-stacked-medium">
            <vl-title type="h2">Aangepaste kleuren</vl-title>
            <div>
                <vl-pill class="my-pill-primary"> primary </vl-pill>
                <vl-pill checkable class="my-pill-primary"> primary </vl-pill>
                <vl-pill closable class="my-pill-primary"> primary </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-primary-light"> primary (light) </vl-pill>
                <vl-pill checkable class="my-pill-primary-light"> primary (light) </vl-pill>
                <vl-pill closable class="my-pill-primary-light"> primary (light) </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-primary-niveau2"> primary niveau 2 </vl-pill>
                <vl-pill checkable class="my-pill-primary-niveau2"> primary niveau 2 </vl-pill>
                <vl-pill closable class="my-pill-primary-niveau2"> primary niveau 2 </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-primary-niveau2-light"> primary niveau 2 (light) </vl-pill>
                <vl-pill checkable class="my-pill-primary-niveau2-light"> primary niveau 2 (light) </vl-pill>
                <vl-pill closable class="my-pill-primary-niveau2-light"> primary niveau 2 (light) </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-action"> action </vl-pill>
                <vl-pill checkable class="my-pill-action"> action </vl-pill>
                <vl-pill closable class="my-pill-action"> action </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-action-light"> action (light) </vl-pill>
                <vl-pill checkable class="my-pill-action-light"> action (light) </vl-pill>
                <vl-pill closable class="my-pill-action-light"> action (light) </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-omg-hoofdkleur"> Omgeving hoofdkleur </vl-pill>
                <vl-pill checkable class="my-pill-omg-hoofdkleur"> Omgeving hoofdkleur </vl-pill>
                <vl-pill closable class="my-pill-omg-hoofdkleur"> Omgeving hoofdkleur </vl-pill>
            </div>
            <div>
                <vl-pill class="my-pill-omg-steunkleur"> Omgeving steunkleur </vl-pill>
                <vl-pill checkable class="my-pill-omg-steunkleur"> Omgeving steunkleur </vl-pill>
                <vl-pill closable class="my-pill-omg-steunkleur"> Omgeving steunkleur </vl-pill>
            </div>
            <vl-link href="/?path=/docs/styles-kleurenpalet--documentatie"
                >Zie kleurenpalet (met WCAG getestte kleuren)</vl-link
            >
        </div>`;
PillCustomColors.storyName = 'vl-pill - aangepaste kleuren';
PillCustomColors.parameters = {
    controls: { disable: true },
};