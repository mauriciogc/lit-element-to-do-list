import { LitElement, html, css } from "lit-element";

const tagName = "my-button";
class MyButton extends LitElement {
	static get styles() {
		return css`
			:host {
				--color-neutral: #fff;
				--color-hover: #8f9097;
				--color-primary: #7f8ff4;
				--color-secondary: #f47f7f;
				--shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
				--shadow-inset: inset var(--shadow);
			}
			::slotted(button) {
				display: inline-block;
				background: transparent;
				color: inherit;
				font: inherit;
				border: 0;
				outline: 0;
				padding: 0;
				transition: all 200ms ease-in;
				cursor: pointer;
				color: var(--color-neutral);
				box-shadow: var(--shadow);
				border-radius: 2px;
				padding: 12px 36px;
			}
			::slotted(button[disabled]) {
				opacity: 0.5;
			}
			::slotted(.btn-primary) {
				background: var(--color-primary);
			}

			::slotted(.btn-primary:enabled:hover),
			::slotted(.btn-secondary:enabled:hover) {
				background: var(--color-hover);
			}
			::slotted(.btn-primary:active) {
				background: var(--color-primary);
				box-shadow: var(--shadow-inset);
			}
			::slotted(.btn-secondary) {
				background: var(--color-secondary);
			}

			::slotted(.btn-secondary:active) {
				background: var(--color-secondary);
				box-shadow: var(--shadow-inset);
			}
			::slotted(.btn-inside) {
				margin-left: -96px;
			}
		`;
	}

	render() {
		return html`<slot></slot>`;
	}
}

window.customElements.define(tagName, MyButton);
