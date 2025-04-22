import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";
interface ISuccessProps {
  total: number;
}

export class Success extends Modal<ISuccessProps> {
  private _description: HTMLParagraphElement;
  protected  successButton: HTMLButtonElement
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._description = this.container.querySelector('.film__description');
    this.successButton = this.container.querySelector('.order-success__close');
    this.successButton.addEventListener('click', () => {
      events.emit('success:close');
    });
}

  set total(total: number) {
    this._description.textContent = `Списано ${total} синапсов`;

}
}