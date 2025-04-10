import { IItem } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";



export interface IBasket {
  list: HTMLElement[];
  price: number;
}

export class Basket extends Modal<IBasket> {
  protected _list: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents
  ) 
  {
    super(container, events);

    this._button = container.querySelector('.button');
    this._price = container.querySelector('.card__price');
    this._list = container.querySelector('.card__list');

    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('basket:order'))
    }
  }
   // Сеттер для общей цены
   set price(price: number) {
    this._price.textContent = price + ' синапсов';
   
    
  }


  
  // Сеттер для списка товаров 
  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this._button.disabled = items.length ? false : true;
  }

  // Метод отключающий кнопку "Оформить"
  disableButton() {
    this._button.disabled = true
  }

  // Метод для обновления индексов таблички при удалении товара из корзины
  refreshIndices() {
    Array.from(this._list.children).forEach(
      (item, index) =>
      (item.querySelector(`.basket__item-index`)!.textContent = (
        index + 1
      ).toString())
    );
  }
}




export interface IItemBasket extends IItem{
id: string;
index: number;

}

export class BasketContainer extends Modal<IItemBasket> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
      super(container, events);

      this._title = container.querySelector('card__title');
      this._index = container.querySelector('basket__item-index');
      this._price = container.querySelector('card__price');
      this._button = container.querySelector('basket__item-delete');
  
      if (this._button) {
        this._button.addEventListener('click', () => {
          this.container.remove();
          this.events.emit('basket:remove', {item: this});
        });
      }
    }
    set title(value: string) {
      this._title.textContent = value;
    }

    set index(value: number) {
      this._index.textContent = value.toString();
    }

    set price(price: number) {
      this._price.textContent = price + ' синапсов';
     
      
    }
    
}

