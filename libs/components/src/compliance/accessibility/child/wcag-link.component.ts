import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from '../../../atom/link';

registerWebComponents([VlLinkComponent]);

export const wcagLink = () => html`
    <vl-link
        href="https://www.w3.org/TR/WCAG21"
        external
        icon-placement="after"
        label="Ga naar Web Content Accessibility Guidelines versie 2.1 niveau AA (opent in een nieuw venster)"
    >
        Web Content Accessibility Guidelines versie 2.1 niveau AA
    </vl-link>
`;
