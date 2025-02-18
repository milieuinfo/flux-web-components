import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import '../vl-tabs.component';
import { html } from 'lit-html';
import { tabsPaneNextArgs, tabsPaneNextArgTypes } from './vl-tabs-pane.stories-arg';

export default {
    id: 'components-next-tabs-tabs-pane',
    title: 'Components-next/tabs/tabs-pane',
    tags: ['autodocs'],
    args: tabsPaneNextArgs,
    argTypes: tabsPaneNextArgTypes,
} as Meta<typeof tabsPaneNextArgs>;

export const TabsPaneDefault = story(
    tabsPaneNextArgs,
    ({ id, title, observeTitle }) => html`
        <vl-tabs-next>
            <vl-tabs-pane-next id=${id} title=${title} observe-title=${observeTitle}>
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="metro" title="Metro, tram en bus">
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="fiets" title="Fiets">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane-next>
        </vl-tabs-next>
    `
);
TabsPaneDefault.storyName = 'vl-tabs-pane-next - default';
TabsPaneDefault.args = {
    id: 'trein',
    title: 'Trein',
    observeTitle: false,
};
