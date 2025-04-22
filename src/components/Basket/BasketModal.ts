import { IBasketModal } from '../../types';
import { createElement, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Modal } from '../common/Modal';


export class BasketModal extends Modal<IBasketModal> {
	protected _list: HTMLUListElement;
	protected _total: HTMLSpanElement;
	protected basketButtonBuy: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._list = ensureElement<HTMLUListElement>(
			'.basket__list',
			this.container
		);
		this._total = ensureElement<HTMLSpanElement>(
			'.basket__price',
			this.container
		);
		this.basketButtonBuy = ensureElement<HTMLButtonElement>(
			'.button_basket',
			this.container
		);
		this.basketButtonBuy.addEventListener('click', () => {
			this.events.emit('order:open', {});
		});
	}

	set basketItems(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this._total.textContent = total.toString() + ' синапсов';
	}
	changeIndex() {
		Array.from(this._list.children).forEach(
			(item, index) =>
				(item.querySelector(`.basket__item-index`)!.textContent = (
					index + 1
				).toString())
		);
	}
}
