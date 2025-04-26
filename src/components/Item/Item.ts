import { IItem, itemCategory } from '../../types/index';
import { CDN_URL } from '../../utils/constants';
import { Component } from '../base/Component';

export interface IItemActions {
	onClick: (event: MouseEvent) => void;
}

export class Item extends Component<IItem> {
	protected element: HTMLElement;
	protected _id: string;
	protected description: HTMLElement;
	protected image: HTMLImageElement;
	protected title: HTMLElement;
	protected category: HTMLElement;
	protected price: HTMLSpanElement;

	constructor(protected container: HTMLElement, actions: IItemActions) {
		super(container);

		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.title = this.container.querySelector('.card__title');
		this.category = this.container.querySelector('.card__category');
		this.price = this.container.querySelector('.card__price');
		this.container.addEventListener('click', (evt) => {
			actions.onClick(evt);
		});
	}

	set _idd(id: string) {
		this._id = id;
	}

	get _idd() {
		return this._id;
	}

	set itemCategory(value: keyof typeof itemCategory) {
		const category = itemCategory[value];
		this.category.textContent = category.title;
		this.category.className = `card__category card__category_${category.value}`;
	}

	render(data?: Partial<IItem>): HTMLElement;
	render(itemData: Partial<IItem>, id: string): HTMLElement;

	render(itemData: Partial<IItem> | undefined) {
		if (!itemData) return this.container;
		if (itemData) {
			this._id = itemData.id;
			this.title.textContent = itemData.title;
			this.price.textContent = itemData?.price?.toString()
				? `${itemData.price}  синапсов`
				: 'Бесценно';
			this.image.src = `${CDN_URL}${itemData.image}`;
			this.itemCategory = itemData.category;
			return super.render(itemData);
		}
	}
}
