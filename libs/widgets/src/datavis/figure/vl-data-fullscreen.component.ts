import { BaseLitElement, webComponent } from '@domg-wc/common';
import { ContextConsumer } from '@lit/context';
import { CSSResult, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { figureContext } from './figure-context';
import { renderControlButton } from './control-button';
import { controlStyles, findControlVisibility } from './control-visibility';
import { dataFullscreenDefaults } from './vl-data-fullscreen.defaults';

const ENTER_LABEL = 'Grafiek vergroten';
const EXIT_LABEL = 'Grafiek verkleinen';

/** Toont de hele figuur schermvullend. */
@webComponent('vl-data-fullscreen')
export class VlDataFullscreen extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [controlStyles];
    }

    // --- attributes
    @property({ type: Boolean, attribute: 'show-label' }) showLabel = dataFullscreenDefaults.showLabel;

    // --- states and fields
    #figure = new ContextConsumer(this, { context: figureContext, subscribe: true });

    render(): TemplateResult | typeof nothing {
        const figure = this.#figure.value;
        if (!figure) return nothing;
        const visibility = findControlVisibility(figure.dataState);
        return renderControlButton({
            icon: figure.isFullscreen ? 'shrink' : 'expand',
            label: figure.isFullscreen ? EXIT_LABEL : ENTER_LABEL,
            visibility,
            showsLabel: this.showLabel,
            onClick: () => this.#onToggle(),
        });
    }

    #onToggle(): void {
        const figure = this.#figure.value;
        if (!figure) return;
        if (figure.isFullscreen) document.exitFullscreen();
        else figure.element.requestFullscreen();
    }
}
