 /*/
 // interface IBasketItemModel {
   items: Map<string, number>;
   add(id: string): void;  
   remove(id: string): void;
 }



interface IEventEmitter {
  emit(event: string, data: unknown): void;
}

class BasketModal implements IBasketItemModel {
  items: Map<string, number> = new Map<string, number>();
  constructor(protected events: IEventEmitter) {} 

  add(id: string): void {
    this._changed();

  }

  remove(id: string): void {
    this._changed();
  }

  protected _changed() {
    this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
  }
}



















export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProductsList {
  products: IProductItem[];
}

export interface IAppState {
  catalog: IProductItem[];
  preview: string | null;
  basket: string[];
  order: IOrder | null;
  loading: boolean;
}

export interface IOrderForm {
  payment: string;
  address: string;
  phone: string;
  email: string;
  total: string | number;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
  id: string;
  total: number;
}
*/



export interface IOrderResult {
  id: string;
  price: number;
}


export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
  selected: boolean;
}

export interface IContactForm  {
  email: string;
  phone: string;
}

export interface IItemData {
  items: IItem[];
  preview: string | null;
  //renderItems(items: IItem[]): void;
  buyItem(item: IItem): void;
}

export interface IBasketItemModel {
  items: Map<string, number>;
  add(id: string): void;  
  remove(id: string): void;
}

export interface IAppState {
  items: IItem[];
  basket: string[];
  order: IOrder | null;
  loading: boolean;
  render(items: IItem[]): void;
}

export interface IOrder extends IContactForm {
  items: string[];
}

export type CardModal = Pick<IItem, 'id' | 'description' | 'image' | 'title' | 'category' | 'price'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type FormProps = {
valid: boolean;
errors: string[];

}

export type OrderForm = {
  paymentType: string;
  address: string;
  
}

export type BasketItemProps = {
  title: string;
  price: number | null;
  index: number | string;
}


export type BasketItemViewProps = {
  id: string;
}& BasketItemProps
  
