import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlIconComponent } from '../../../atom/icon';
import { VlPropertiesComponent } from '../vl-properties.component';
import { propertiesArgs, propertiesArgTypes } from './vl-properties.stories-arg';
import propertiesDoc from './vl-properties.stories-doc.mdx';
import { dummy2Props, dummyProps } from './vl-properties.stories-util';

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

const PropertiesEmptyTemplate = story(
    propertiesArgs,
    ({ labelWidth, props }) => html` <vl-properties label-width=${labelWidth} .props=${props}></vl-properties> `
);

export const PropertiesDefault = PropertiesTemplate.bind({});
PropertiesDefault.storyName = 'vl-properties - default';

export const PropertiesWithProps = PropertiesEmptyTemplate.bind({});
PropertiesWithProps.storyName = 'vl-properties - with props';
PropertiesWithProps.args = {
    props: [...dummyProps, ...dummy2Props],
};

export const PropertiesHtmlEnriched = story(
    propertiesArgs,
    ({ labelWidth, props }) => html`
        <vl-properties label-width=${labelWidth} .props=${props}>
            <label>
                <vl-icon icon="location" small right-margin=""></vl-icon>
                Woonplaats
            </label>
            <data>
                <vl-icon icon="alert-triangle" small right-margin=""></vl-icon>
                Brussel
            </data>
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
