
import { BasketItemProps } from "../../types/index";   
import { Modal } from "../common/Modal";
import { IEvents } from "../base/events";
import {  ensureElement } from "../../utils/utils";
//import { BaskerItemActions } from "../types/index";

export class BasketItem<T> extends Modal< BasketItemProps & T > {
  private _index: HTMLSpanElement;
  private _title: HTMLSpanElement;
  private _price: HTMLSpanElement;
  private _removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
      super(container, events);
      this._index = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
      this._title = ensureElement<HTMLSpanElement>('.card__title', this.container);
      this._price = ensureElement<HTMLSpanElement>('.card__price', this.container);
      this._removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
      
     
    if(events) {
      this._removeButton.addEventListener('click', () => {
        events.emit('basket:remove', {});
      });
  }

  }

  set title (title: string) {
    this._title.textContent = title;
  }

  set price (price: string) {
    this._price.textContent = price;
}

  set index(index: string) {
    this._index.textContent = index;
  }

}

