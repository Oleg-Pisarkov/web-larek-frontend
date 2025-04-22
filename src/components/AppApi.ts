import { IApi, IItem, IOrder, IOrderResult } from "../types";
import { IItemData } from "../types";
import { ApiListResponse } from './base/api';


export class AppApi {
  private _baseApi: IApi;
  
  constructor(baseApi: IApi){
    this._baseApi = baseApi;
  }
/*
getItems():Promise<IItem[]>{
  return this._baseApi.get<IItem[]>('/product').then((items: IItem[]) => items);
}
*/

getItems():Promise<IItem[]>{
  return this._baseApi.get('/product').then((items: ApiListResponse<IItem>) => {
    return items.items.map((item) => ({ ...item}));
  })
   
}

buyItems(items: IOrder): Promise<IOrderResult> {
  return this._baseApi.post<IOrderResult>('/order', items).then((item: IOrderResult) => item);
}

/*
buyItem(item: IItem): Promise<IItem> {
  return this._baseApi.post<IItem>(`/product/${item.id}`, item) .then((item: IItem) => item);

}

buy(id: string, total: number): Promise<IOrderResult> {
  return this._baseApi.post<IOrderResult>(`/order`, {id, total}).then((item: IOrderResult) => {
    return item
  })
  }
  */
}








