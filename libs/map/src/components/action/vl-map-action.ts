import { webComponent } from '@domg-wc/common';
import { BaseHTMLElement } from '@domg-wc/common';
import { VlMap } from '../../vl-map';
import { VlMapLayer } from '../layer/vl-map-layer';
import { OlVectorLayerType } from '../../vl-map.model';
import { VlBaseMapAction } from '../../actions/mapaction';

@webComponent('vl-map-action')
export class VlMapAction extends BaseHTMLElement {
    protected __callback: (...args: any[]) => void;
    protected _active: boolean;
    protected _controlledActive: boolean;
    protected _layer: OlVectorLayerType;
    // Gebruikt protected naamgeving maar moet public zijn omdat het in een Cypress test gebruikt wordt.
    public _action: VlBaseMapAction;
    public identifier: string;

    constructor() {
        super();
        this._active = false;
        this._controlledActive = false;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.__defineLayer();
    }

    static isVlMapAction(): boolean {
        return true;
    }

    get action() {
        return this._action;
    }

    get _mapElement(): VlMap {
        return this.closest('vl-map');
    }

    get _defaultActive(): boolean {
        return this.hasAttribute('data-vl-default-active');
    }

    get _callback(): (...args: any[]) => void {
        return (...args) => (this.__callback ? this.__callback(...args) : null);
    }

    get _layerElement(): VlMapLayer | null {
        console.warn('_layerElement implementation is missing');
        return null;
    }

    get active(): boolean {
        return this._controlledActive;
    }

    set active(value: boolean) {
        this._controlledActive = value;
        if (value) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    get layer(): OlVectorLayerType {
        return this._layer;
    }

    set layer(layer: OlVectorLayerType) {
        this._layer = layer;
    }

    activate(): void {
        // Do not activate action if its layer is invisible
        if (this.action && this.action.layer.get('visible')) {
            this._mapElement.changeActiveAction(this.action);
        }
    }

    deactivate(): void {
        // Only deactivate if this action is currently active
        if (this.action && this.action === this._mapElement.activeAction) {
            const actionIsNotDefault = this.action !== this._mapElement.defaultAction;
            const layerIsVisible =
                this._mapElement.defaultAction && this._mapElement.defaultAction.layer.get('visible');
            this._mapElement.changeActiveAction(actionIsNotDefault && layerIsVisible && this._mapElement.defaultAction);
        }
    }

    _createAction(layer?: OlVectorLayerType | OlVectorLayerType[]): VlBaseMapAction {
        console.warn('_createAction implementation is missing');
        return null;
    }

    _processAction(): void {
        if (this.action) {
            this.action.element = this;
            this._mapElement.addAction(this.action);

            // Activate the action when
            // - the action is the default active action and no other action has yet been activated
            // - the controlled active state of the action is true
            if ((this._defaultActive && !this._mapElement.activeAction) || this.active) {
                this.activate();
            }
        }
    }

    __defineLayer(): void {
        if (this._layerElement) {
            this.layer = this._layerElement.layer;
        }
    }

    reset(): void {
        this._active = false;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-action': VlMapAction;
    }
}
