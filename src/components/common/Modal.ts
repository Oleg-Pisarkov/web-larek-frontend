import { Component } from "../base/Component";
import { IEvents } from "../base/events";



export class Modal <T>  extends Component<T> {
  protected modal: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    
    this.events = events;
    const closeButtonElement = this.container.querySelector('.modal__close');
    closeButtonElement.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('mousedown', (evt)=> {
      if (evt.target === evt.currentTarget) {
        this.close();
      } 
    });

    //const addBasketButton = this.container.querySelector('.button');
    //addBasketButton.addEventListener('click', () => this.events.emit('modal:addBasket'));

    this.handleEscUp = this.handleEscUp.bind(this);
    //this.modal = this.container.querySelector('.modal__container1');
}

    open() {
      this.container.classList.add('modal_active');
      document.addEventListener('keyup', this.handleEscUp);
}

    close() {
      this.container.classList.remove('modal_active');
      document.removeEventListener('keyup', this.handleEscUp);
    }     
    
    handleEscUp(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
} 