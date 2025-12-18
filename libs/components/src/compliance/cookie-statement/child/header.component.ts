import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';

export const cookieStatementHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = () => html`
    <vl-functional-header
        title="Departement Omgeving"
        sub-title="Cookieverklaring"
        link="https://omgeving.vlaanderen.be"
        skip-to-content-id="main-content"
    ></vl-functional-header>
`;
