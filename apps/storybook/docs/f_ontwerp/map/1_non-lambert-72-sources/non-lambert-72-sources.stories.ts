import { registerWebComponents } from '@domg-wc/common';
import { VlMapNonLambert72Sources } from '@domg-wc/integrations/map';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';

registerWebComponents([VlMapNonLambert72Sources]);

export default {
    title: 'Ontwerp/Map/Niet-Lambert-72-lagen',
} as Meta;

export const Demo = () => html`<vl-map-non-lambert-72-sources></vl-map-non-lambert-72-sources>`;
