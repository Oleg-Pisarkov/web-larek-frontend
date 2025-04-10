
import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";
import { BasketModal  } from "../BasketONE/BasketModal"

export class BasketView extends BasketModal {
	constructor(protected events: IEvents) {
		super(cloneTemplate<HTMLDivElement>('#basket'), events);
    events.emit('basket:buy', {});
    
  }
}

