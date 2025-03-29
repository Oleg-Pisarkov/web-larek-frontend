import { IItem, IItemData } from "../types/index";
import { IEvents } from "./base/events";

export class ItemData implements IItemData { 
 protected _items: IItem[];
 protected _preview: string | null; 
 protected events: IEvents;

constructor(events: IEvents) {
    this.events = events;
}

set items(items: IItem[]) {
    this._items = items;
    this.events.emit('items:changed')
}

get items() {
    return this._items
}
/*
renderItems(items: IItem[]) {
  this.items = items;
 // this.events.emit('items:changed')
}
 */

buyItem(item: IItem) {
  this._items = this._items.filter((card) => card.id !== item.id);
  this.events.emit('items:changed')
}

getItems(itemId: string) {
    return this._items.find((item) => item.id === itemId) 

}

set preview(itemId: string | null) {
    if (!itemId) {
        this._preview = null;
        return;
    }
    const selectedItem = this.getItems(itemId);
    if (selectedItem) {
        this._preview = itemId;
        this.events.emit('item:selected')
    }

}

get preview() {
    return this._preview;
}
}