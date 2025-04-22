import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Modal<T> extends Component<T> {
	protected events: IEvents;
	protected _closeButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this.events = events;

		this._closeButton = this.container.querySelector('.modal__close');
		this._closeButton.addEventListener('click', this.close.bind(this));

		this.container.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.close();
			}
		});

		this.handleEscUp = this.handleEscUp.bind(this);
	}

	open() {
		this.container.classList.add('modal_active');
		document.addEventListener('keyup', this.handleEscUp);
	}

	close() {
		this.container.classList.remove('modal_active');
		document.removeEventListener('keyup', this.handleEscUp);
	}

	handleEscUp(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.close();
		}
	}
}
