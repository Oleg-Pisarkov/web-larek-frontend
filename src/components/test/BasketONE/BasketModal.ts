
import { createElement, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/events";
import { Modal } from "../../common/Modal";


export interface IBasketModal {
 items: HTMLElement[];
 total: number;
 selected: string[];
}

export class BasketModal extends Modal< IBasketModal> {
  protected _list: HTMLUListElement;
  protected _total: HTMLSpanElement;
  protected _button: HTMLButtonElement;
  //items: HTMLElement[];

  constructor(container: HTMLElement, events: IEvents) {
      super(container, events);

      this._list = ensureElement<HTMLUListElement>('.basket__list', this.container);
      this._total = ensureElement<HTMLSpanElement>('.basket__price', this.container);
      this._button = ensureElement<HTMLButtonElement>('.button', this.container);
      
      if(this._button) {
        this._button.addEventListener('click', () => {
          this.events.emit('order:open', { item: this });
        });
  }
 // this.items = [];
}

  set basketItems(items: HTMLElement[]) {
    if(items.length) {
      this._list.replaceChildren(...items);
    }else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p',{textContent: 'Корзина пуста'}));
    }
  }

  set selected(items: string[]) {
    if(items.length) {
      this._button.classList.add('button_alt-active');
    }else {
      this._button.classList.remove('button_alt-active');
    }
    
  }

  set total(total: number) {
    this._total.textContent = total.toString();
  }
/*
  open() {
    this.container.classList.add('modal_active');
  }

  add({title, price, id}: {title: string, price: number, id: string}) {
    this.title.textContent = title;
    this.price.textContent = price.toString();
    this._id = id;
    
  }
    */
}
  