export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: keyof typeof itemCategory;
	price: number | null;
}

export interface IAppState {
	basketItems: IItem[];
	catalogItems: IItem[];
	orderForm: OrderForm;
	contactForm: IContactForm;
}

export interface ISuccess {
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IOrderForm {
	paymentType: string;
	address: string;
}

export interface IContactForm {
	phone: string;
	email: string;
}

export interface IOrder {
	payment: string;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IForm {
	errors: string[];
	valid: boolean;
}

export type OrderForm = {
	paymentType: string;
	address: string;
};

export interface IItemBasket extends IItem {
	id: string;
	index: string;
}

export interface IBasketModal {
	list: HTMLElement[];
	total: number;
}

export interface IItemContainer {
	catalog: HTMLElement[];
}

export const itemCategory = {
	'софт-скил': { title: 'софт-скил', value: 'soft' },
	'хард-скил': { title: 'хард-скил', value: 'hard' },
	другое: { title: 'другое', value: 'other' },
	дополнительное: { title: 'дополнительное', value: 'additional' },
	кнопка: { title: 'кнопка', value: 'button' },
};
