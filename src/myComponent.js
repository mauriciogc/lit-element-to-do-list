import { LitElement, html, css } from "lit-element";
import uniqid from "uniqid";
import { repeat } from "lit-html/directives/repeat";

import "./myCheckox";
import "./myButton";

class TodoApp extends LitElement {
	static get styles() {
		return css`
			:host {
				display: block;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.container-form {
				display: inline-block;
				width: 360px;
				background: #fff;
				box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
			}
			.form-field {
				padding: 22px 18px;
				width: 240px;
				color: #a3a3a3;
				border: 0;
				outline: 0;
			}
			.list {
				padding: 0 16px;
				width: 400px;
				margin: 50px auto;
				font-size: 18px;
				font-weight: 400;
				line-height: 36px;
			}
		`;
	}

	static get properties() {
		return {
			_todos: { type: Array },
			disabled: { type: Boolean },
		};
	}
	get todos() {
		return this._todos;
	}
	set todos(data) {
		sessionStorage.setItem("dataToDo", JSON.stringify(data));
		this._todos = data;
	}
	constructor() {
		super();
		this.disabled = true;
	}

	connectedCallback() {
		super.connectedCallback();

		const dataLocal = sessionStorage.getItem("dataToDo");
		this.todos = (dataLocal && JSON.parse(dataLocal)) || [];
	}

	firstUpdated() {
		this.$input = this.shadowRoot.querySelector("input");
	}
	updated() {
		const removeBtn = this.shadowRoot.querySelector("#remove");

		if (removeBtn) {
			removeBtn.disabled = true;
			const hasChecked = this.todos.find((todo) => todo.checked);

			if (hasChecked) {
				removeBtn.disabled = false;
			}
		}
	}
	render() {
		return html`
			<h1>To do</h1>
			<form id="todo-input">
				<div class="container-form ">
					<input 
						type="text"
						class="form-field"
						placeholder="Add a new to do"
						@input=${this._onInput}>
					</input>
				</div>
				<my-button>
					<button 
						class="btn-inside btn-primary"
						@click=${this._onAddTodo}
						?disabled=${this.disabled}>
						Add
					</button>
				</my-button>
			</form>
			<div class="list">
				${repeat(
					this.todos,
					(todo) => todo.id,
					(todo) => html`${this._createCheckBox(todo)}`
				)}
			</div>
			${this.todos.length ? html`${this._createRemoveButton()}` : "There is no task"}
		`;
	}
	_createCheckBox(todo) {
		return html`<my-checkbox
			id=${todo.id}
			type="checkbox"
			?checked=${todo.checked}
			@on-change="${this._onToggleTodo}"
		>
			${todo.text}
		</my-checkbox>`;
	}
	_createRemoveButton() {
		return html` <my-button>
			<button id="remove" class="btn-secondary" @click=${this._onRemoveTodo}>
				Delete all finished
			</button>
		</my-button>`;
	}
	_onInput() {
		let value = this.$input.value.trim();
		this.disabled = !value;
	}
	_onAddTodo(e) {
		e.preventDefault();
		if (!this.disabled) {
			this.todos = [
				...this.todos,
				{ text: this.$input.value, checked: false, id: uniqid() },
			];
			this.$input.value = "";
			this.disabled = !this.disabled;
		}
	}
	_onToggleTodo(e) {
		this.todos = this.todos.map((todo) => {
			return todo.id === e.detail ? { ...todo, checked: !todo.checked } : todo;
		});
	}
	_onRemoveTodo(e) {
		this.todos = this.todos = this.todos.filter((todo) => !todo.checked);
	}
}

window.customElements.define("my-component", TodoApp);
