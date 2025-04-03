/*

import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";


export interface IBasketModal {
  title: string;
  price: number;
  add(id: string): void;  
  remove(id: string): void;
}

export class BasketModal extends Modal< IBasketModal> {
  protected title: HTMLSpanElement;
  protected price: HTMLSpanElement;
  protected _id: string
  protected closeButtonElement: HTMLButtonElement;
  protected basketButton: HTMLButtonElement;
  protected content: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
      super(container, events);

      this.content = this.container.querySelector('.basket__list');
      this.title = this.content.querySelector('.card__title');
      this.price = this.content.querySelector('.card__price');
      this.closeButtonElement = this.container.querySelector('.modal__close');
      this.basketButton = this.content.querySelector('.button');
      
  }

  set Basket ({title, price, id}: {title: string, price: number, id: string}) {
    this.title.textContent = title;
    this.price.textContent = price.toString();
    this._id = id;
  }

  open() {
    this.container.classList.add('modal_active');
  }

  add({title, price, id}: {title: string, price: number, id: string}) {
    this.title.textContent = title;
    this.price.textContent = price.toString();
    this._id = id;
    
  }
}

*/