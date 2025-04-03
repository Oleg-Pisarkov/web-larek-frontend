import { IItem } from "../../types";
import { IContactForm } from "../../types";
import { FormProps } from "../../types";
import { IEvents } from "../base/events";
import { OrderForm } from "../../types";


export class AppState {
  private _basketItems: IItem[] = [];
  private _catalogItems: IItem[] = [];
  private _orderForm: OrderForm ={address: '', paymentType: ''};
  private _contactForm: IContactForm = {email: '', phone: ''};

  constructor(private events: IEvents) {

  }

  set catalogItems(items: IItem[]) {
    this._catalogItems = items;
    this.events.emit('catalogItems:set');
  }

  get catalogItems(): IItem[] {
    return this._catalogItems;
  }

  set orderForm(form: OrderForm) {
    this._orderForm = form;
}

  set contactForm(form: IContactForm) {
    this._contactForm = form;
}

  get contactForm(): IContactForm { 
    return this._contactForm;
  }

  get basketItems(): IItem[] {
    return this._basketItems;
  }

  get basketTotal(): number {
    return this._basketItems.reduce((acc, item) => acc + item.price, 0);
  }

  getCatalogItemById(id: string): IItem | undefined {
    return this._catalogItems.find((item) => item.id === id);
  }

  addBasketItem(catalogItem: IItem): void {
    if(this.basketItems.some((item) => item.id === catalogItem.id)) return;
    this._basketItems.push(catalogItem);
    this.events.emit('basketItems:add');
  }
  
  removeBasketItem(id: string): void {
    const itemIndex = this._basketItems.findIndex((item) => item.id === id);
    if(itemIndex !== 1){
      this._basketItems.splice(itemIndex, 1);
    }
    this.events.emit('basketItems:remove');
  }

  clearBasket(): void {
    this._basketItems = [];
    this.events.emit('basketItems:changed');
  }

  resetForms(): void {
    this._orderForm = {address: '', paymentType: ''};
    this._contactForm = {email: '', phone: ''};
  }

  validateOrderForm(): FormProps {
    const errors: string[] = [];
    let valid = true;

    if (!this.orderForm.address.length) {
      errors.push('Заполните адрес доставки');
      valid = false;
    }

    if (!this.orderForm.paymentType.length) {
      errors.push('Выберите способ оплаты');
      valid = false;
    }

    return { errors, valid };
  }

  validateContactForm(): FormProps {
    const errors: string[] = [];
    let valid = true;

    if (!this.contactForm.email.length) {
      errors.push('Заполните email');
      valid = false;
    }

    if (!this.contactForm.phone.length) {
      errors.push('Заполните телефон');
      valid = false;
    }

    return { errors, valid };
  }
}