import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlButtonComponent } from '../../button';
import searchFilterDoc from './vl-search-filter.stories-doc.mdx';
import { VlTitleComponent } from '../../title';
import { VlSearchFilterComponent } from '../vl-search-filter.component';
import { searchFilterArgs, searchFilterArgTypes } from './vl-search-filter.stories-arg';

export default {
    id: 'components-next-search-filter',
    title: 'Components-next/search-filter',
    tags: ['autodocs'],
    args: searchFilterArgs,
    argTypes: searchFilterArgTypes,
    parameters: {
        docs: {
            page: searchFilterDoc,
        },
    },
} as Meta<typeof searchFilterArgs>;

registerWebComponents([
    VlInputFieldComponent,
    VlFormLabelComponent,
    VlSelectComponent,
    VlButtonComponent,
    VlSearchFilterComponent,
    VlTitleComponent,
]);

const searchFilterTemplate = story(
    searchFilterArgs,
    ({ filterTitle, alt, mobileModal, mobileModalTitle }) => html`
        <vl-search-filter-next
            filter-title=${filterTitle}
            ?alt=${alt}
            ?mobile-modal=${mobileModal}
            mobile-modal-title=${mobileModalTitle}
        >
            <form>
                <div>
                    <section>
                        <vl-title-next type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title-next>
                        <div>
                            <vl-form-label-next
                                for="filterOpId"
                                label="Project id"
                                light
                            ></vl-form-label-next>
                            <vl-input-field-next
                                id="filterOpId"
                                type="text"
                                name="id"
                                block
                            ></vl-input-field-next>
                        </div>
                        <div>
                            <vl-form-label-next for="filterOpNaamProject" label="Project naam" light></vl-form-label-next>
                            <vl-input-field-next
                                type="text"
                                id="filterOpNaamProject"
                                name="name"
                                block
                                autocomplete="given-name"
                            ></vl-input-field-next>
                        </div><div>
                            <vl-form-label-next for="filterOpNaamManager" label="Manager familienaam" light></vl-form-label-next>
                            <vl-input-field-next
                                type="text"
                                id="filterOpNaamManager"
                                name="name"
                                block
                                autocomplete="family-name"
                            ></vl-input-field-next>
                        </div>
                    </section>
                    <section>
                        <vl-title-next type="h2" alt no-space-bottom="">Locatie</vl-title-next>
                        <div>
                            <vl-form-label-next for="vl-select-city" label="Stad" light></vl-form-label-next>
                            <vl-select-next
                                name="vl-select-city"
                                deletable
                                block
                                autocomplete="address-level2"
                                placeholder="Kies een stad"
                                .options=${[
                                    { label: 'Kies een stad', value: '' },
                                    { label: 'Brussel', value: 'brussel' },
                                    { label: 'Gent', value: 'gent' },
                                ]}
                            >
                            </vl-select-next>
                        </div>
                        <div>
                            <vl-form-label-next for="vl-select-country" label="Land" light></vl-form-label-next>
                            <vl-select-next
                                name="vl-select-country"
                                deletable
                                block
                                autocomplete="address-level2"
                                placeholder="Kies een land"
                                .options=${[
                                    { label: 'Kies een land', value: '' },
                                    { label: 'België', value: 'België' },
                                    { label: 'Frankrijk', value: 'Frankrijk' },
                                    { label: 'Nederland', value: 'Nederland' },
                                ]}
                            >
                            </vl-select-next>
                        </div>
                    </section>
                </div>
                <footer>
                    <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                    <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button-next-->
                </footer>
            </form>
        </vl-search-filter-next>
    `
);

// TODO kspeltin: 'as any' is een vuile fix
export const SearchFilterDefault = searchFilterTemplate.bind({}) as any;
SearchFilterDefault.storyName = 'vl-search-filter - default';

export const SearchFilterMobile = searchFilterTemplate.bind({}) as any;
SearchFilterMobile.storyName = 'vl-search-filter - mobile';
SearchFilterMobile.args = {
    mobileModal: true,
    mobileModalTitle: 'Mobile title',
};
SearchFilterMobile.parameters = {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'mobile1',
    },
};
