import { IItem } from "../types";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";




export class Item extends Component<IItem>{
  protected element: HTMLElement;
  protected events: IEvents;
  protected itemId: string;
  protected description: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLSpanElement;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    

    this.description = this.container.querySelector('.card__text');
    this.image = this.container.querySelector('.card__image');
    this.title = this.container.querySelector('.card__title');
    this.category = this.container.querySelector('.card__category');
    this.price = this.container.querySelector('.card__price');
    
    
    this.container.addEventListener('click', () => {
      this.events.emit('item1:click', {element: this});
    });

    //this.container.addEventListener('click', () => {
     // this.events.emit('item:click', {element: this});
   // });

  
}

  set _id(id: string) {
    this.itemId = id;
  }

  get _id() {
    return this.itemId
  }
  
  render(data?: Partial<IItem>): HTMLElement 
  render(itemData: Partial<IItem>, id: string): HTMLElement 
    
  render(itemData: Partial<IItem> | undefined) {
  /*
  this.itemId = itemData.id;
  this.title.textContent = itemData.title;
  this.category.textContent = itemData.category;
  this.price.textContent = itemData?.price?.toString() ?? 'Бесценно';
  if (this.image) {
    this.image.src = itemData.image ?? '';
  }
*/


    if (!itemData) return this.container;
    if (itemData){
      this.itemId = itemData.id;
      this.title.textContent = itemData.title;
      this.category.textContent = itemData.category;
      this.price.textContent = itemData?.price?.toString() ?? 'Бесценно';
      this.image.src = `${CDN_URL}${itemData.image}`;

     return super.render(itemData);
    }
  

  

  /*
  render(itemData: Partial<IItem> ){
    this.itemId = itemData.id;
    this.title.textContent = itemData.title;
    //this.description.textContent = itemData.description;
    this.category.textContent = itemData.category;
    this.price.textContent = itemData.price.toString();
    return this.element
    
  }
    */
}
}
