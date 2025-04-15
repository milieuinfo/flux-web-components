import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components';
import { PropertyDeclarations } from 'lit';
import { VlMapAction } from '../../action/vl-map-action';
import { VlMapControl } from '../vl-map-control.mixin';

@webComponent('vl-map-action-control')
export class VlMapActionControl extends VlMapControl(BaseLitElement) {
    private actionId = '';
    private icon = '';
    private label = '';
    private defaultActive = false;
    private controlElement: VlButtonComponent = null;

    static {
        registerWebComponents([VlButtonComponent]);
    }

    static get properties(): PropertyDeclarations {
        return {
            actionId: {
                type: String,
                attribute: 'data-vl-action-id',
            },
            icon: {
                type: String,
                attribute: 'data-vl-icon',
            },
            label: {
                type: String,
                attribute: 'data-vl-label',
            },
            defaultActive: {
                type: Boolean,
                attribute: 'data-vl-default-active',
                state: false,
            },
        };
    }

    connectedCallback(): void {
        this.controlElement = document.createElement('vl-button');
        this.controlElement.on = false;
        this.controlElement.setAttribute('tertiary', '');
        this.controlElement.setAttribute('toggle', ''); // maak er een toggle knop van
        this.controlElement.addEventListener('click', () => this.handleClickToggle());

        if (this.defaultActive) {
            this.activate();
        } else {
            this.deactivate();
        }

        if (this.icon) {
            this.controlElement.setAttribute('icon', this.icon);
        }

        if (this.label) {
            this.controlElement.innerText = this.label;
        } else {
            this.controlElement.setAttribute('text-hidden', '');
        }

        super.connectedCallback();
    }

    public get active(): boolean {
        return this.controlElement.on;
    }

    public activate(): void {
        this.controlElement.on = true;
        this.controlElement.removeAttribute('tertiary');
        if (this.action) {
            this.action.active = true;
        }
    }

    public deactivate(): void {
        this.controlElement.on = false;
        this.controlElement.setAttribute('tertiary', '');
        if (this.action) {
            this.action.active = false;
        }
    }

    private get action(): VlMapAction | null | undefined {
        return this.closest('vl-map')?.querySelector(`#${this.actionId}`);
    }

    private handleClickToggle(): void {
        if (this.controlElement.on) {
            this.activate();
        } else {
            this.deactivate();
        }

        this.dispatchEvent(
            new CustomEvent('change-control', {
                detail: {
                    isActive: this.controlElement.on,
                },
            })
        );
    }
}
