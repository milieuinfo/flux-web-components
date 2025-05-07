import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { VlIconComponent } from '../../atom/icon';
import { vlRichDataTableFluxStyles } from './vl-rich-data-table.flux-css';

@webComponent('vl-rich-data-sorter')
export class VlRichDataSorter extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlIconComponent]);
    }

    constructor() {
        super(`
          <style>
            ${vlLegacyStyles.join('')}
            ${vlRichDataTableFluxStyles}

            div {
              display: inline;
            }

            #direction {
              vertical-align: middle;
            }

            #priority {
              font-size: x-small;
              vertical-align: super;
            }
          </style>
          <div id="container" class="vl-u-visually-hidden">
            <vl-icon id="direction"></vl-icon>
            <label id="priority"></label>
          </div>
        `);
    }

    static get DIRECTIONS() {
        return {
            descending: 'desc',
            ascending: 'asc',
        };
    }

    static get _observedAttributes(): string[] {
        return ['direction', 'priority'];
    }

    static get is(): string {
        return 'vl-rich-data-sorter';
    }

    static get PRIORITY_COMPARATOR(): (firstSorter: VlRichDataSorter, secondSorter: VlRichDataSorter) => number {
        return ({ priority: firstPriority }: VlRichDataSorter, { priority: secondPriority }: VlRichDataSorter) => {
            if (secondPriority === undefined || (firstPriority ? firstPriority : 0) < secondPriority) {
                return -1;
            } else if (firstPriority === undefined || firstPriority > secondPriority) {
                return 1;
            } else {
                return 0;
            }
        };
    }

    get for(): string {
        return this.getAttribute('for');
    }

    get direction(): string | undefined {
        return this.__direction;
    }

    set direction(direction) {
        if (this.__direction !== direction) {
            this.__direction = direction;

            const directionIcon = this._directionIcon;
            if (directionIcon) {
                this.__directionElement.setAttribute('icon', directionIcon);
                this.__containerElement.classList.remove('vl-u-visually-hidden');
            } else {
                this.__containerElement.classList.add('vl-u-visually-hidden');
            }

            if (direction === undefined) {
                this.priority = undefined;
            }
        }
    }

    get _directionIcon(): string | null {
        switch (this.direction) {
            case VlRichDataSorter.DIRECTIONS.ascending:
                return 'arrow-down';
            case VlRichDataSorter.DIRECTIONS.descending:
                return 'arrow-up';
            default:
                return null;
        }
    }

    get priority(): number | undefined {
        return this.__priority;
    }

    set priority(priority) {
        if (this.__priority !== priority) {
            this.__priority = Number(priority) || undefined;
            this.__priorityElement.textContent = String(this.priority);
        }
    }

    get __directionElement(): HTMLElement {
        return this.shadowRoot.querySelector('#direction');
    }

    get __containerElement(): HTMLElement {
        return this.shadowRoot.querySelector('#container');
    }

    get __priorityElement(): HTMLElement {
        return this.shadowRoot.querySelector('#priority');
    }

    _setDirectionAndPublishEvent(direction: string | undefined): void {
        if (this.direction !== direction) {
            this.direction = direction;
            this._changed();
        }
    }

    nextDirection() {
        switch (this.direction) {
            case VlRichDataSorter.DIRECTIONS.descending:
                this._setDirectionAndPublishEvent(undefined);
                break;
            case VlRichDataSorter.DIRECTIONS.ascending:
                this._setDirectionAndPublishEvent(VlRichDataSorter.DIRECTIONS.descending);
                break;
            default:
                this._setDirectionAndPublishEvent(VlRichDataSorter.DIRECTIONS.ascending);
        }
    }

    _directionChangedCallback(oldValue: string, newValue: string) {
        this.direction = newValue;
    }

    _priorityChangedCallback(oldValue: number, newValue: number) {
        this.priority = newValue;
    }

    _changed() {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    direction: this.direction,
                    priority: this.priority,
                },
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-rich-data-sorter': VlRichDataSorter;
    }
}
