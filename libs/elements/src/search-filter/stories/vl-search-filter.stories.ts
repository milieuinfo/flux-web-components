import { html } from 'lit-html';
import '../../form/vl-form.element';
import '../../button/vl-button.element';
import '../../select/vl-select.element';
import '../../input-field/vl-input-field.element';
import '../vl-search-filter.element';
import '../../link/vl-link.element';
import { searchFilterArgs, searchFilterArgTypes } from './vl-search-filter.stories-arg';

export default {
    id: 'elements-search-filter',
    title: 'Elements/search-filter',
    tags: ['autodocs'],
    args: searchFilterArgs,
    argTypes: searchFilterArgTypes,
};

const searchFilterTemplate = ({ title, alt, mobileModal, mobileModalTitle, maxWidth }: typeof searchFilterArgs) => html`
    <div style="max-width: ${maxWidth}">
        <div
            is="vl-search-filter"
            data-vl-title=${title}
            ?data-vl-alt=${alt}
            ?data-vl-mobile-modal=${mobileModal}
            data-vl-mobile-modal-title=${mobileModalTitle}
            data-cy="search-filter"
        >
            <form is="vl-form">
                <section>
                    <h2>Gegevens</h2>
                    <div>
                        <label is="vl-form-label" for="firstname">Voornaam</label>
                        <input
                            is="vl-input-field"
                            type="text"
                            name="firstname"
                            data-vl-block
                            autocomplete="given-name"
                        />
                    </div>
                    <div>
                        <label is="vl-form-label" for="name">Naam</label>
                        <input is="vl-input-field" type="text" name="name" data-vl-block autocomplete="family-name" />
                    </div>
                </section>
                <section>
                    <h2>Locatie</h2>
                    <div>
                        <label is="vl-form-label" for="vl-select-city">Stad</label>
                        <select
                            is="vl-select"
                            name="vl-select-default"
                            data-vl-select-deletable
                            data-vl-block
                            autocomplete="address-level2"
                        >
                            <option placeholder="">Kies een stad</option>
                            <option value="brussel">Brussel</option>
                            <option value="gent">Gent</option>
                        </select>
                    </div>
                    <div>
                        <label is="vl-form-label" for="vl-select-country">Land</label>
                        <select
                            is="vl-select"
                            name="vl-select-default"
                            data-vl-select-deletable
                            data-vl-block
                            autocomplete="country"
                        >
                            <option placeholder="">Kies een land</option>
                            <option value="belgië">België</option>
                        </select>
                    </div>
                </section>
                <div>
                    <button is="vl-button" type="submit">Zoeken</button>
                </div>
            </form>
            <div>
                <a href="#" is="vl-link">Zoekopdracht verwijderen</a>
            </div>
        </div>
    </div>
`;

// TODO kspeltin: 'as any' is een vuile fix
export const searchFilterDefault = searchFilterTemplate.bind({}) as any;
searchFilterDefault.storyName = 'vl-search-filter - default';
searchFilterDefault.args = {
    title: 'Lorem ipsum',
};
searchFilterDefault.argTypes = {
    mobileModal: {
        control: {
            disable: true,
        },
    },
    mobileModalTitle: {
        control: {
            disable: true,
        },
    },
};

export const searchFilterMobile = searchFilterTemplate.bind({}) as any;
searchFilterMobile.storyName = 'vl-search-filter - mobile';
searchFilterMobile.args = {
    mobileModal: true,
    mobileModalTitle: 'Mobile title',
};
searchFilterMobile.argTypes = {
    title: {
        control: {
            disable: true,
        },
    },
    mobileModal: {
        control: {
            disable: true,
        },
    },
};
searchFilterMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1',
    },
};
