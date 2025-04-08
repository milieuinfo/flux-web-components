import { VlTypography } from '@domg-wc/components';
import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type TitleProps = Pick<AccessibilityProperties, 'version' | 'date'>;

export const titleElements = () => [VlTypography];

export const title = ({ version, date }: TitleProps) => html`
    <section class="vl-section-next">
        <div class="vl-content-block-next">
            <div class="vl-grid-next vl-stacked-next-medium">
                <div class="vl-column-next vl-column-next--10">
                    <vl-title-next type="h1" no-space-bottom>Toegankelijkheidsverklaring</vl-title-next>
                </div>
                <div class="vl-column-next vl-column-next--10">
                    <vl-paragraph-next introduction>
                        <span>Versie ${version} - ${date}</span>
                    </vl-paragraph-next>
                </div>
                <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                    <vl-typography>
                        <hr />
                    </vl-typography>
                </div>
            </div>
        </div>
    </section>
`;
