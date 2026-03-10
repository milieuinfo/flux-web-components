import { registerWebComponents } from '@domg-wc/common';
import { VlMapNonLambert72Sources } from '@domg-wc/integrations/map';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlMapNonLambert72Sources]);

export default {
    title: 'Patronen/Kaart/niet Lambert-72 lagen',
} as Meta;

export const KaartNietLambert72Lagen = () => html`<vl-map-non-lambert-72-sources></vl-map-non-lambert-72-sources>`;
KaartNietLambert72Lagen.storyName = 'kaart - niet Lambert-72 lagen';
