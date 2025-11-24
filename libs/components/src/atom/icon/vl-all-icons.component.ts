import { registerWebComponents, webComponent } from '@domg-wc/common';
import { css, CSSResult, html, LitElement } from 'lit';
import { vlIconStyles } from '../icon-style/vl-icon-style.css';
import { VlIconComponent } from './index';
import { vlIconList } from './vl-icon-list';

@webComponent('vl-all-icons')
export class VlAllIconsComponent extends LitElement {
    static {
        registerWebComponents([VlIconComponent]);
    }

    static override get styles(): CSSResult[] {
        return [
            vlIconStyles,
            css`
                .container {
                    display: flex;
                    flex-wrap: wrap;
                }

                .icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 12rem;
                    margin-bottom: 3rem;
                    text-align: center;
                    font-size: 2.4rem;
                    cursor: copy;
                }

                .name {
                    font-size: 1.4rem;
                    display: block;
                    margin-top: 1rem;
                }
            `,
        ];
    }

    override render() {
        return html`
            <div class="container">
                ${vlIconList.map(
                    (icon) => html`
                        <div class="icon" @click=${() => this.handleClickIcon(icon)}>
                            <vl-icon icon=${icon}></vl-icon>
                            <span class="name">${icon}</span>
                        </div>
                    `
                )}
            </div>
        `;
    }

    private handleClickIcon(icon: string) {
        navigator.clipboard.writeText(icon);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-all-icons': VlAllIconsComponent;
    }
}
