import { Component } from "./base/Component";
import { IEvents } from "./base/events";



export class Modal <T>  extends Component<T> {
  protected modal: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    const closeButtonElement = this.container.querySelector('.modal__close');
    closeButtonElement.addEventListener('click', () => this.events.emit('modal:close'));
    
  
}
}