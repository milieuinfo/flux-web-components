import { VlTypography } from '../../../block';
import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type TitleProps = Pick<AccessibilityProperties, 'version' | 'date'>;

export const titleElements = () => [VlTypography];

export const title = ({ version, date }: TitleProps) => html`
    <section class="vl-section">
        <div class="vl-content-block">
            <div class="vl-grid vl-stacked-medium">
                <div class="vl-column vl-column--10">
                    <vl-title type="h1" no-space-bottom>Toegankelijkheidsverklaring</vl-title>
                </div>
                <div class="vl-column vl-column--10">
                    <vl-paragraph introduction>
                        <span>Versie ${version} - ${date}</span>
                    </vl-paragraph>
                </div>
                <div class="vl-column vl-column--12 vl-column--m-12">
                    <vl-typography>
                        <hr />
                    </vl-typography>
                </div>
            </div>
        </div>
    </section>
`;
