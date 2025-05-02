import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block';

export const cookieStatementHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = () => html`
    <vl-functional-header
        title="Departement Omgeving"
        sub-title="Cookieverklaring"
        link="https://omgeving.vlaanderen.be"
    ></vl-functional-header>
`;
