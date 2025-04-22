import { IContactForm } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from '../common/Form';

export class Contacts extends Form<IContactForm> {
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._phone = ensureElement<HTMLInputElement>('.phone', this.container);
		this._email = ensureElement<HTMLInputElement>('.email', this.container);

		if (this._phone) {
			this._phone.addEventListener('input', (e: Event) => {
				const target = e.target as HTMLInputElement;
				const value = target.value;
				this.onInputChangeContacts('phone', value);
			});
		}

		if (this._email) {
			this._email.addEventListener('input', (e: Event) => {
				const target = e.target as HTMLInputElement;
				const value = target.value;
				this.onInputChangeContacts('email', value);
			});
		}

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit('contacts:submit', this.container);
		});
	}

	reset() {
		this._phone.value = '';
		this._email.value = '';
	}

	protected onInputChangeContacts(field: keyof IContactForm, value: string) {
		this.events.emit('contactsInput:change', {
			field,
			value,
		});
	}
}
