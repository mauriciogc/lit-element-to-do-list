import { LitElement, html, css } from "lit-element";

import "./myComponent";

const tagName = "my-index";
class ReflectingAttributes extends LitElement {
	static get styles() {
		return css`
			:host {
				--color-x: 10px solid brown;
				--color-y: 5px solid yellow;
			}
			li {
				border: 1px solid blue;
			}
		`;
	}
	static get properties() {
		return {
			name: { type: String },
			loading: { type: Boolean },
		};
	}
	constructor() {
		super();
		this.loading = true;
	}
	render() {
		return html` <my-component .name=${"MAuricio"}></my-component> `;
	}
}

customElements.define(tagName, ReflectingAttributes);
