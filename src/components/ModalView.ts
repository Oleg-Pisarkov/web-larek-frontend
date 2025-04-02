import { IItem } from '../types';
import { CDN_URL } from '../utils/constants';
import { IEvents } from './base/events';
import { Modal } from './common/Modal';

export interface IModalView {
  
    id: string;
    title: string;
    image: string;
    description: string;
    category: string;
    price: number;
  
  
}


export class ModalView extends Modal<IModalView> {
  protected content: HTMLElement;
  protected description: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLSpanElement;
  protected closeButtonElement: HTMLButtonElement;
  protected basketButton: HTMLButtonElement;
  
  

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    
    this.content = this.container.querySelector('.modal__content');
    this.description = this.content.querySelector('.card__text');
    this.image = this.content.querySelector('.card__image');
    this.title = this.content.querySelector('.card__title');
    this.category = this.content.querySelector('.card__category');
    this.price = this.content.querySelector('.card__price');
    this.closeButtonElement = this.container.querySelector('.modal__close');
    this.basketButton = this.content.querySelector('.button');
    

    /*
    this.content = this.container.querySelector('.modal_full');
    this.description = this.content.querySelector('.card__text');
    this.image = this.content.querySelector('.card__image');
    this.title = this.content.querySelector('.card__title');
    this.category = this.content.querySelector('.card__category');
    this.price = this.content.querySelector('.card__price');
    this.closeButtonElement = this.content.querySelector('.modal__close');
    this.basketButton = this.content.querySelector('.button');
    
    */
    

    
   
 
}

set modalItem({ id, description, image, title, category, price }: {id: string, description: string, image: string, title: string, category: string, price: number }) {
  this.content.querySelector('.card__text').textContent = description;
  this.content.querySelector('.card__title').textContent = title;
  this.content.querySelector('.card__category').textContent = category;
  //this.content.querySelector('.card__price').textContent = price.toString();
  this.content.querySelector('.card__image').setAttribute('src', `${CDN_URL}${image}`);
   if (price) { 
    this.content.querySelector('.card__price').textContent = price.toString();
  }
  else {
    this.content.querySelector('.card__price').textContent = 'Бесценно';
  }

  //this.content.querySelector('.card__image').textContent = `${CDN_URL}${image}`;
 
  //this.image.src = image;
  //this.title.textContent = title;
  //this.category.textContent = category;
  //this.price.textContent = price.toString();

  
  
}
  
}

