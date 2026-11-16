import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';

export const cookieStatementHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = () => html`
    <vl-functional-header sub-title="Cookieverklaring" skip-to-content-id="main-content">
        <a slot="heading" href="https://omgeving.vlaanderen.be">Departement Omgeving</a>
    </vl-functional-header>
`;
