import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent } from '@domg-wc/components/atom';
import { VlTooltipComponent } from '@domg-wc/components/block';
import { html, TemplateResult } from 'lit';
import type { ControlVisibility } from './control-visibility';

registerWebComponents([VlButtonComponent, VlLinkComponent, VlTooltipComponent]);

export type ControlButton = {
    icon: string;
    label: string;
    visibility: ControlVisibility;
    showsLabel: boolean;
    onClick: () => void;
};

/** Eén id per control zodat elke control heeft zijn eigen shadow root heeft. */
const BUTTON_ID = 'control-button';

export function renderControlButton({ icon, label, visibility, showsLabel, onClick }: ControlButton): TemplateResult {
    if (showsLabel) {
        return html`<vl-link
            class=${visibility}
            ?inert=${visibility !== 'visible'}
            button-as-link
            small
            icon=${icon}
            @vl-click=${onClick}
            >${label}</vl-link
        >`;
    }
    return html`<vl-button
            id=${BUTTON_ID}
            class=${visibility}
            ?inert=${visibility !== 'visible'}
            ghost
            icon=${icon}
            label=${label}
            @vl-click=${onClick}
        ></vl-button>
        <vl-tooltip for=${BUTTON_ID} placement="top" type="label">${label}</vl-tooltip>`;
}
