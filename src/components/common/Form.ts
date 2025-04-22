import { IForm } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Modal } from './Modal';

export class Form<T> extends Modal<IForm> {
	protected _submitButton: HTMLButtonElement;
	protected _errors: HTMLElement;
	protected events: IEvents;
	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.events = events;
		this._submitButton = ensureElement<HTMLButtonElement>(
			'.submit__Button',
			this.container
		);

		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
	}

	set valid(value: boolean) {
		this._submitButton.disabled = !value;
	}

	set errors(value: string) {
		this._errors.textContent = value;
	}
}
