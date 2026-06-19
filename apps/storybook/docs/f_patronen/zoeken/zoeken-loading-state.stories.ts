import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

export default {
    title: 'Patronen/Zoeken/loading state',
} as Meta;

const RESULT_DELAY_MS = 1500;

// Simuleert een trage backend (bv. een MAGDA-call): de vl-button blokkeert klikken zolang `loading`
// aanstaat en de aria-live-regio kondigt het resultaat aan zodra het binnen is. De guard voorkomt dat
// een herhaalde submit (bv. Enter in het zoekveld) een tweede zoekopdracht start.
const handleSearch = (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const button = form.querySelector('vl-button')!;
    if (button.hasAttribute('loading')) {
        return;
    }

    const status = form.querySelector('[data-search-status]')!;
    button.toggleAttribute('loading', true);
    status.textContent = 'Bezig met zoeken…';

    window.setTimeout(() => {
        button.toggleAttribute('loading', false);
        status.textContent = '8 resultaten geladen.';
    }, RESULT_DELAY_MS);
};

export const ZoekenLoadingState = () => html`
    <style>
        ${vlGroupStyles}
    </style>
    <form role="search" aria-label="Zoeken op deze site" @submit=${handleSearch}>
        <div class="vl-group vl-group--input-group">
            <vl-input-field input-group block type="search" name="zoekterm" label="Zoekterm"></vl-input-field>
            <vl-button input-group icon="search" type="submit" label="Zoeken" tertiary></vl-button>
        </div>
        <p data-search-status role="status" aria-live="polite"></p>
    </form>
`;
ZoekenLoadingState.storyName = 'zoeken - loading state';
