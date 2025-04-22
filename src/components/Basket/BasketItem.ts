
import { BasketItemProps, IItem } from "../../types/index";   
import { Modal } from "../common/Modal";
import { IEvents } from "../base/events";
import {  ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface IBasketActions {
  onClick: (event: MouseEvent) => void
}
export interface IItemBasket extends IItem {
  id: string;
  index: string;
}

export class BasketItem extends Component< IItemBasket > {
  private _index: HTMLSpanElement;
  private _title: HTMLSpanElement;
  private _price: HTMLSpanElement;
  private _removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IBasketActions) {
      super(container);
      
      this._index = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
      this._title = ensureElement<HTMLSpanElement>('.card__title', this.container);
      this._price = ensureElement<HTMLSpanElement>('.card__price', this.container);
      
      this._removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
  
      this._removeButton.addEventListener('click', (evt) => {
        this.container.remove();
        actions.onClick(evt);
      });
  

  }

  set title (title: string) {
    this.container.querySelector('.card__title').textContent = title;
    //this._title.textContent = title;
  }

  set price (price: string) {
   
   if (price) {
    this.container.querySelector('.card__price').textContent = price + ' синапсов';
   }
   else {
    this.container.querySelector('.card__price').textContent = 'Бесценно';
   }

    
}

  set index(index: string) {
    this._index.textContent = index;
  }

}

