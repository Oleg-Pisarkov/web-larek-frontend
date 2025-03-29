import { IApi, IItem } from "../types";
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

}

