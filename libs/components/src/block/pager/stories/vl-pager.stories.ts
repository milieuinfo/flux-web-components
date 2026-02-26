import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-pager.component';
import { pagerArgs, pagerArgTypes } from './vl-pager.stories-arg';

export default {
    id: 'components-block-pager',
    title: 'Components - Block/pager',
    tags: ['autodocs'],
    args: pagerArgs,
    argTypes: pagerArgTypes,
} as Meta<typeof pagerArgs>;

const pagerTemplate = ({
    totalItems,
    itemsPerPage,
    currentPage,
    paginationDisabled,
    alignCenter,
    alignRight,
    change,
}: typeof pagerArgs) => html`
    <vl-pager
        total-items=${totalItems}
        items-per-page=${itemsPerPage}
        current-page=${currentPage}
        ?pagination-disabled=${paginationDisabled}
        ?align-center=${alignCenter}
        ?align-right=${alignRight}
        @change=${(event: any) => change(event.detail)}
        data-cy="pager"
    ></vl-pager>
`;

export const pagerDefault = pagerTemplate.bind({}) as any;
pagerDefault.storyName = 'vl-pager - default';

export const pagerSinglePage = pagerTemplate.bind({}) as any;
pagerSinglePage.storyName = 'vl-pager - single page';
pagerSinglePage.args = {
    totalItems: 10,
    itemsPerPage: 10,
    currentPage: 1,
    paginationDisabled: false,
};

export const pagerWithoutPageItems = pagerTemplate.bind({}) as any;
pagerWithoutPageItems.storyName = 'vl-pager - without page items';
pagerWithoutPageItems.args = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    paginationDisabled: true,
};
