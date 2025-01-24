import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { unByKey } from 'ol/Observable';
import { CONTROL_TYPE, IDENTIFIER } from '../../../vl-map.model';
import { VlMapControl } from '../vl-map-control.mixin';

@webComponent('vl-map-measure-control')
export class VlMapMeasureControl extends VlMapControl(BaseLitElement) {
    controlElement: VlButtonComponent = null;

    static {
        registerWebComponents([VlButtonComponent]);
    }

    constructor() {
        super();
        this.controlElement = document.createElement('vl-button-next');
        this.controlElement.setAttribute('tertiary', '');
        this.controlElement.setAttribute('toggle', ''); // maak er een toggle knop van
        this.controlElement.innerText = 'Meten';
        this.identifier = IDENTIFIER.MEASURE;
        this.type = CONTROL_TYPE.ACTION;
    }

    connectedCallback() {
        super.connectedCallback();
        this.clickListener = this.controlElement.addEventListener('click', () => this.handleMeasureControlClick());
    }

    getAction() {
        return this.map.getActionWithIdentifier(this.identifier);
    }

    handleMeasureControlClick() {
        // de default click handler van de button zorgt (omdat hij in toggle mode staat) al voor de 'on' wissel
        const measureAction = this.getAction();
        if (measureAction) {
            if (this.controlElement.on) {
                measureAction.element.activate();
                this.controlElement.removeAttribute('tertiary');
            } else {
                measureAction.element.deactivate();
                this.controlElement.setAttribute('tertiary', '');
            }
        }
    }

    setActive(set) {
        // niet meer nodig, maar je krijgt een console fout als deze methode verwijderd wordt
    }

    setDisabled(set) {
        this.controlElement.disabled = set;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unByKey(this.clickListener);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-measure-control': VlMapMeasureControl;
    }
}
