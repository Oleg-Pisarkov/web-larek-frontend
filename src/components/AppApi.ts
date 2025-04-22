import { IApi, IItem, IOrder, IOrderResult } from '../types';
import { ApiListResponse } from './base/api';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<IItem[]> {
		return this._baseApi
			.get('/product')
			.then((items: ApiListResponse<IItem>) => {
				return items.items.map((item) => ({ ...item }));
			});
	}

	buyItems(items: IOrder): Promise<IOrderResult> {
		return this._baseApi
			.post<IOrderResult>('/order', items)
			.then((item: IOrderResult) => item);
	}
}
