
import { BasketItemViewProps } from "../../types/index";
import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { BasketItem } from "../Basket/BasketItem";

export class BasketItemView extends  BasketItem<BasketItemViewProps> {
  constructor( events: IEvents) {
    super(cloneTemplate<HTMLElement>('#card-basket'), events);
    events.emit('basketItems:delete', {id: this.id});
    
  }

  set id(id: string) {
    this.container.dataset.id = id || '';
  }

  get id() {
    return this.container.dataset.id || '';
  }
}

