import { LitElement, html, css } from "lit-element";

const tagName = "my-checkbox";
class MyCheckbox extends LitElement {
	static get styles() {
		return css`
			.inputGroup {
				margin: 10px 0;
				box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.1);
			}
			.inputGroup label {
				box-sizing: border-box;
				padding: 10px 10px 10px 60px;
				width: 100%;
				display: block;
				background-color: #fff;
				cursor: pointer;
				position: relative;
				z-index: 2;
				transition: color 200ms ease-in;
				overflow: hidden;
			}
			.inputGroup label:before {
				border: 10px solid #54e0c7;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				content: "";
				background-color: #5562eb;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%) scale3d(1, 1, 1);
				transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
				opacity: 0;
				z-index: -1;
			}
			.inputGroup label:after {
				width: 22px;
				height: 22px;
				content: "";
				border: 2px solid #b3bcf3;
				background-color: #fff;
				background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
				background-repeat: no-repeat;
				border-radius: 50%;
				z-index: 2;
				position: absolute;
				left: 15px;
				top: 50%;
				-webkit-transform: translateY(-50%);
				transform: translateY(-50%);
				cursor: pointer;
				-webkit-transition: all 200ms ease-in;
				transition: all 200ms ease-in;
			}
			.inputGroup input:checked ~ label {
				color: #fff;
			}
			.inputGroup input:checked ~ label:before {
				transform: translate(-50%, -50%) scale3d(56, 56, 1);
				opacity: 1;
			}
			.inputGroup input:checked ~ label:after {
				background-color: #54e0c7;
				border-color: #54e0c7;
			}
			.inputGroup input {
				width: 32px;
				height: 32px;
				-webkit-box-ordinal-group: 2;
				order: 1;
				z-index: 2;
				position: absolute;
				right: 30px;
				top: 50%;
				-webkit-transform: translateY(-50%);
				transform: translateY(-50%);
				cursor: pointer;
				visibility: hidden;
			}
		`;
	}
	static get properties() {
		return {
			checked: {
				type: Boolean,
				reflect: true,
			},
			id: { type: String, reflect: true },
		};
	}

	constructor() {
		super();
		this.text = "";
		this.checked = false;
	}
	render() {
		return html`
			<div class="inputGroup">
				<input
					id=${this.id}
					type="checkbox"
					?checked=${this.checked}
					@change=${() => this._fire("on-change")}
				/>
				<label for=${this.id}><slot></slot></label>
			</div>
		`;
	}
	_fire(eventType) {
		this.dispatchEvent(new CustomEvent(eventType, { detail: this.id }));
	}
}

window.customElements.define(tagName, MyCheckbox);
