import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../vl-pill.component';
import { pillArgs, pillArgTypes } from './vl-pill.stories-arg';

export default {
    id: 'components-block-pill',
    title: 'Components - Block/pill',
    tags: ['autodocs'],
    args: pillArgs,
    argTypes: pillArgTypes,
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
        ${type || 'Optie 1'}
    </vl-pill>
`;
PillDefault.storyName = 'vl-pill - default';
