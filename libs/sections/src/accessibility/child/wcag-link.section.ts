import { registerWebComponents } from '@domg-wc/common';
import { VlLinkComponent } from '@domg-wc/components';
import { html } from 'lit';

registerWebComponents([VlLinkComponent]);

export const wcagLink = () => html`
    <vl-link href="https://www.w3.org/TR/WCAG21" external icon="external" icon-placement="after">
        Web Content Accessibility Guidelines versie 2.1 niveau AA
    </vl-link>
`;
