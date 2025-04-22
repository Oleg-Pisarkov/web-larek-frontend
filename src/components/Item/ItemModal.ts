import { itemCategory } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { IEvents } from '../base/events';
import { Modal } from '../common/Modal';

export interface IItemModal {
	id: string;
	title: string;
	image: string;
	description: string;
	category: keyof typeof itemCategory;
	price: number;
}

export class ItemModal extends Modal<IItemModal> {
	protected content: HTMLElement;
	protected description: HTMLElement;
	protected image: HTMLImageElement;
	protected title: HTMLElement;
	protected category: HTMLElement;
	protected price: HTMLSpanElement;
	protected closeButtonElement: HTMLButtonElement;
	protected basketButton: HTMLButtonElement;
	protected _id: string;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this.content = this.container.querySelector('.modal__content');
		this.description = this.content.querySelector('.card__text');
		this.image = this.content.querySelector('.card__image');
		this.title = this.content.querySelector('.card__title');
		this.category = this.content.querySelector('.card__category');
		this.price = this.content.querySelector('.card__price');
		this.closeButtonElement = this.container.querySelector('.modal__close');
		this.basketButton = this.content.querySelector('.button');
		this.basketButton.addEventListener('click', () => {
			this.events.emit('item:add', {
				id: this._id,
				description: this.description,
				image: this.image,
				title: this.title,
				category: this.category,
				price: this.price,
			});
		});
	}

	set modalItem({
		id,
		description,
		image,
		title,
		category,
		price,
	}: {
		id: string;
		description: string;
		image: string;
		title: string;
		category: keyof typeof itemCategory;
		price: number;
	}) {
		this.content.querySelector('.card__text').textContent = description;
		this.content.querySelector('.card__title').textContent = title;
		//this.content.querySelector('.card__category').textContent = category;
		this.itemCategory = category;
		this.content
			.querySelector('.card__image')
			.setAttribute('src', `${CDN_URL}${image}`);
		if (price) {
			this.content.querySelector('.card__price').textContent =
				price.toString() + ' синапсов';
			this.basketButton.removeAttribute('disabled');
		} else {
			this.content.querySelector('.card__price').textContent = 'Бесценно';
			this.basketButton.setAttribute('disabled', 'true');
		}
		this._id = id
	}
	set ItemId(id: string) {
		this._id = id;
		console.log(this._id);
	}

	set itemCategory(value: keyof typeof itemCategory) {
			const categoryItem = itemCategory[value];
			this.content.querySelector('.card__category').textContent = categoryItem.title;
			this.content.querySelector('.card__category').setAttribute('class', `card__category card__category_${categoryItem.value}`);
			//this.category.className = `card__category card__category_${categoryItem.value}`;
	}
}
