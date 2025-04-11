import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";
import { Modal } from "../common/Modal";



// import form
export interface IOrder {
  paymentType: string;
  address: string;
}

export class Order extends Modal<IOrder> {
  // Сссылки на внутренние элементы
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;

  // Конструктор принимает имя блока, родительский элемент и обработчик событий
  constructor(container: HTMLFormElement, protected events: IEvents){
    super(container, events);

    this._card = ensureElement<HTMLButtonElement>('.card', this.container);
    this._cash = ensureElement<HTMLButtonElement>('.cash', this.container);

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        this._cash.classList.add('button_alt-active')
        this._card.classList.remove('button_alt-active')
        //this.onInputChange('paymentType', 'cash')
      })
    }
    if (this._card) {
      this._card.addEventListener('click', () => {
        this._card.classList.add('button_alt-active')
        this._cash.classList.remove('button_alt-active')
        //this.onInputChange('paymentType', 'card')
      })
    }
  }

  // Метод, отключающий подсвечивание кнопок
  disableButtons() {
    this._cash.classList.remove('button_alt-active')
    this._card.classList.remove('button_alt-active')
  }
  
}