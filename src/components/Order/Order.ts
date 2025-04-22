

import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";
import { Modal } from "../common/Modal";



// import form
export interface IOrder {
  paymentType: string;
  address: string;
}

export class Order extends Form<IOrder> {
  // Сссылки на внутренние элементы
  
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;
  protected _address: HTMLInputElement;

  // Конструктор принимает имя блока, родительский элемент и обработчик событий
  constructor(container: HTMLFormElement, protected events: IEvents){
    super(container, events);
    


    this._card = ensureElement<HTMLButtonElement>('.cardBtn', this.container);
    this._cash = ensureElement<HTMLButtonElement>('.cashBtn', this.container);
    this._address = ensureElement<HTMLInputElement>('.form__input', this.container);

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        this._cash.classList.add('button_alt-active')
        this._card.classList.remove('button_alt-active')
        this.onInputChange('paymentType', 'cash')
      })
    }
    if (this._card) {
      this._card.addEventListener('click', () => {
        this._card.classList.add('button_alt-active')
        this._cash.classList.remove('button_alt-active')
        this.onInputChange('paymentType', 'card')
      })
    }

    if (this._address) {
      this._address.addEventListener('input', () => {
        this.onInputChange('address', this._address.value)
      })
    }

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit( 'order:submit', this.container);
    });
  }


  protected onInputChange(field: keyof IOrder, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    })
  }

  // Метод, отключающий подсвечивание кнопок
  disableButtons() {
    this._cash.classList.remove('button_alt-active')
    this._card.classList.remove('button_alt-active')
  }
  set address(value: string) {
    this._address.value = value;
  }

  reset() {
      this.address = '';
      this._cash.classList.remove('button_alt-active')
      this._card.classList.remove('button_alt-active')
    
  }
}

