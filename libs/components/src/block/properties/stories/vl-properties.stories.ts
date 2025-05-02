import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlIconComponent } from '../../../atom/icon';
import { VlPropertiesComponent } from '../vl-properties.component';
import { dummyProps } from './vl-properties.stories-util';
import propertiesDoc from './vl-properties.stories-doc.mdx';
import { propertiesArgs, propertiesArgTypes } from './vl-properties.stories-arg';

registerWebComponents([VlPropertiesComponent, VlIconComponent]);

export default {
    id: 'components-block-properties',
    title: 'Components - Block/properties',
    tags: ['autodocs'],
    args: propertiesArgs,
    argTypes: propertiesArgTypes,
    parameters: {
        docs: {
            page: propertiesDoc,
        },
    },
} as Meta<typeof propertiesArgs>;

const PropertiesTemplate = story(
    propertiesArgs,
    ({ labelWidth, props }) => html`
        <vl-properties label-width=${labelWidth} .props=${props}>
            <label>Woonplaats</label>
            <data>Brussel</data>
            <label>Postcode</label>
            <data>1000</data>
        </vl-properties>
    `
);

export const PropertiesDefault = PropertiesTemplate.bind({});
PropertiesDefault.storyName = 'vl-properties - default';

export const PropertiesWithProps = PropertiesDefault.bind({});
PropertiesWithProps.storyName = 'vl-properties - with props';
PropertiesWithProps.args = {
    props: dummyProps,
};

export const PropertiesHtmlEnriched = story(
    propertiesArgs,
    ({ labelWidth, props }) => html`
        <vl-properties label-width=${labelWidth} .props=${props}>
            <label>
                <vl-icon icon="location" small right-margin=""></vl-icon>
                <span>Woonplaats</span></label
            >
            <data>
                <vl-icon icon="alert-triangle" small right-margin=""></vl-icon>
                <span>Brussel</span></data
            >
            <label>Postcode</label>
            <data>1000</data>
        </vl-properties>
    `
);
PropertiesHtmlEnriched.storyName = 'vl-properties - html enriched';

export const PropertiesCollapsed = story(
    propertiesArgs,
    ({ labelWidth, props }) => html`
        <vl-properties label-width=${labelWidth} .props=${props}>
            <div class="collapsed">
                <label>Woonplaats</label>
                <data>Brussel</data>
                <label>Postcode</label>
                <data>1000</data>
            </div>
        </vl-properties>
    `
);
PropertiesCollapsed.storyName = 'vl-properties - collapsed';

export const PropertiesColumns = story(
    propertiesArgs,
    ({ labelWidth, props }) => html`
        <vl-properties label-width=${labelWidth} .props=${props}>
            <div class="column">
                <label>Woonplaats</label>
                <data>Brussel</data>
            </div>
            <div class="column">
                <label>Postcode</label>
                <data>1000</data>
            </div>
            <div class="column column--full-width">
                <label>Gewest</label>
                <data>Brussel</data>
            </div>
        </vl-properties>
    `
);
PropertiesColumns.storyName = 'vl-properties - columns';
