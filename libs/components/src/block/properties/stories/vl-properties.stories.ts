import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
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
    ({ labelWidth, props, noPaddingBottom }) => html`
        <vl-properties label-width=${labelWidth} .props=${props} ?no-padding-bottom=${noPaddingBottom}>
            <vl-property>Woonplaats</vl-property>
            <vl-property-data>Brussel</vl-property-data>
            <vl-property>Postcode</vl-property>
            <vl-property-data>1000</vl-property-data>
        </vl-properties>
    `,
);

const PropertiesEmptyTemplate = story(
    propertiesArgs,
    ({ labelWidth, props, noPaddingBottom }) => html`
        <vl-properties label-width=${labelWidth} .props=${props} ?no-padding-bottom=${noPaddingBottom}></vl-properties>
    `,
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
    ({ labelWidth, props, noPaddingBottom }) => html`
        <vl-properties label-width=${labelWidth} .props=${props} ?no-padding-bottom=${noPaddingBottom}>
            <vl-property>
                <vl-icon icon="location" small right-margin=""></vl-icon>
                Woonplaats
            </vl-property>
            <vl-property-data>
                <vl-icon icon="alert-triangle" small right-margin=""></vl-icon>
                Brussel
            </vl-property-data>
            <vl-property>Postcode</vl-property>
            <vl-property-data>1000</vl-property-data>
        </vl-properties>
    `,
);
PropertiesHtmlEnriched.storyName = 'vl-properties - html enriched';

export const PropertiesStacked = story(
    propertiesArgs,
    ({ labelWidth, props, noPaddingBottom }) => html`
        <vl-properties label-width=${labelWidth} .props=${props} ?no-padding-bottom=${noPaddingBottom}>
            <div class="stacked">
                <vl-property>Woonplaats</vl-property>
                <vl-property-data>Brussel</vl-property-data>
                <vl-property>Postcode</vl-property>
                <vl-property-data>1000</vl-property-data>
            </div>
        </vl-properties>
    `,
);
PropertiesStacked.storyName = 'vl-properties - stacked';

export const PropertiesColumns = story(
    propertiesArgs,
    ({ labelWidth, props, noPaddingBottom }) => html`
        <vl-properties label-width=${labelWidth} .props=${props} ?no-padding-bottom=${noPaddingBottom}>
            <div class="column">
                <vl-property>Woonplaats</vl-property>
                <vl-property-data>Brussel</vl-property-data>
            </div>
            <div class="column">
                <vl-property>Postcode</vl-property>
                <vl-property-data>1000</vl-property-data>
            </div>
            <div class="column column--full-width">
                <vl-property>Gewest</vl-property>
                <vl-property-data>Brussel</vl-property-data>
            </div>
        </vl-properties>
    `,
);
PropertiesColumns.storyName = 'vl-properties - columns';
