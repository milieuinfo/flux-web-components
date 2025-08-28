import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlButtonComponent } from '../../../atom/button';
import searchFilterDoc from './vl-search-filter.stories-doc.mdx';
import { VlTitleComponent } from '../../../atom/title';
import { VlSearchFilterComponent } from '../vl-search-filter.component';
import { searchFilterArgs, searchFilterArgTypes } from './vl-search-filter.stories-arg';
import { VlInputFieldComponent } from '../../../form/input-field';
import { VlFormLabelComponent } from '../../../form/form-label';
import { VlSelectComponent } from '../../../form/select';

export default {
    id: 'components-block-search-filter',
    title: 'Components - Block/search-filter',
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
        <vl-search-filter
            filter-title=${filterTitle}
            ?alt=${alt}
            ?mobile-modal=${mobileModal}
            mobile-modal-title=${mobileModalTitle}
        >
            <form>
                <div>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title>
                        <div>
                            <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                            <vl-input-field id="filterOpId" type="text" name="id" block></vl-input-field>
                        </div>
                        <div>
                            <vl-form-label for="filterOpNaamProject" label="Project naam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamProject"
                                name="name"
                                block
                                autocomplete="given-name"
                            ></vl-input-field>
                        </div>
                        <div>
                            <vl-form-label for="filterOpNaamManager" label="Manager familienaam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamManager"
                                name="name"
                                block
                                autocomplete="family-name"
                            ></vl-input-field>
                        </div>
                    </section>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Locatie</vl-title>
                        <div>
                            <vl-form-label for="vl-select-city" label="Stad" light></vl-form-label>
                            <vl-select
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
                            </vl-select>
                        </div>
                        <div>
                            <vl-form-label for="vl-select-country" label="Land" light></vl-form-label>
                            <vl-select
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
                            </vl-select>
                        </div>
                    </section>
                </div>
                <footer>
                    <vl-button type="submit">Zoeken</vl-button>
                    <vl-button type="reset" secondary>Reset</vl-button>
                </footer>
            </form>
        </vl-search-filter>
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
