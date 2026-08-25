// Voorbeeldcomponent bij de documentatiepagina "Formulier - Samengesteld veld".
// Dit is geen bibliotheekcomponent: neem hem over in je eigen project, onder je eigen tag.
// Het gedrag komt uit CompositeFormControl, die wel uit de bibliotheek komt.
import { webComponent } from '@domg-wc/common';
import { CompositeFormControl } from '@domg-wc/components/form';
import { css, CSSResult, html, TemplateResult } from 'lit';

@webComponent('vl-composite-input')
export class CompositeInputComponent extends CompositeFormControl {
    static get styles(): CSSResult[] {
        return [
            css`
                fieldset {
                    border: 0;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .vl-u-visually-hidden {
                    position: absolute !important;
                    height: 1px;
                    width: 1px;
                    overflow: hidden;
                    clip: rect(1px, 1px, 1px, 1px);
                    margin: -1px;
                    padding: 0;
                    border: 0;
                    left: 0;
                    top: 0;
                }
            `,
        ];
    }

    render(): TemplateResult {
        return html`
            <fieldset part="fieldset">
                <legend class="vl-u-visually-hidden">${this.label || 'Samengesteld invoerveld'}</legend>
                <slot @slotchange=${this.onSlotChange}></slot>
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-composite-input': CompositeInputComponent;
    }
}
