import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { IApi, IContactForm, IItem, IOrder, OrderForm } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Item } from './components/Item/Item';
import { ItemContainer } from './components/Item/ItemContainer';
import { cloneTemplate } from './utils/utils';
import { ItemModal } from './components/Item/ItemModal';
import { AppState } from './components/common/AppState';
import { BasketModal } from './components/Basket/BasketModal';
import { BasketItem } from './components/Basket/BasketItem';
import { Order } from './components/Order/Order';
import { Contacts } from './components/Order/Contacts';
import { Success } from './components/Order/Success';

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);
const appState = new AppState(events);
const itemTemplate: HTMLTemplateElement =
	document.querySelector('#card-catalog');
const itemContainer = new ItemContainer(document.querySelector('.gallery'));
const viewModal = new ItemModal(document.querySelector('.modal_full'), events);
const itemPreviewTemplate: HTMLTemplateElement =
	document.querySelector('#card-preview');
const basket = new BasketModal(document.querySelector('.modal_basket'), events);
const basketTemplate: HTMLTemplateElement =
	document.querySelector('#card-basket');
const basketCounter = ensureElement<HTMLSpanElement>('.header__basket-counter');
const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const orderModal = new Order(document.querySelector('.order-modal'), events);
const contactModal = new Contacts(
	document.querySelector('.email-modal'),
	events
);
const successModal = new Success(
	document.querySelector('.result-modal'),
	events
);

basketButton.addEventListener('click', () => {
	events.emit('basket:open');
});

Promise.all([api.getItems()])
	.then(([items]) => {
		appState.catalogItems = items;
		events.emit('items:loded');
	})
	.catch((err) => console.log(err));

events.on('items:loded', () => {
	const itemArray = appState.catalogItems.map((item) => {
		const itemInsnant = new Item(cloneTemplate(itemTemplate), {
			onClick: () => events.emit('item:open', item),
		});

		return itemInsnant.render(item);
	});
	itemContainer.render({ catalog: itemArray });
});

events.on('item:open', (item: IItem) => {
	const itemPreview = new Item(cloneTemplate(itemPreviewTemplate), {
		onClick: () => events.emit('item:add', item),
	});

	const modalData = appState.getCatalogItemById(item.id);
	viewModal.render(modalData);
	viewModal.modalItem = modalData;
	viewModal.open();
	viewModal.ItemId = item.id;

	if (appState.basketItems.find((i) => i.id === item.id)) {
		viewModal.disabledButton();
	}
});

events.on('item:add', (item: IItem) => {
	appState.addBasketItem(item);
	basketCounter.textContent = `${appState.basketItems.length}`;
	viewModal.close();
	viewModal.disabledButton();
});

events.on('basket:open', () => {
	const basketItem = appState.basketItems.map((item, index) => {
		const storeItem = new BasketItem(cloneTemplate(basketTemplate), {
			onClick: () => events.emit('basket:remove', item),
		});

		return storeItem.render({
			index: `${index + 1}`,
			title: item.title,
			price: item.price,
		});
	});
	basket.basketItems = basketItem;
	basket.total = appState.basketTotal;
	basket.disabledButton();
	basket.open();
});

events.on('basket:remove', (item: IItem) => {
	appState.removeBasketItem(item.id);
	basketCounter.textContent = `${appState.basketItems.length}`;
	basket.changeIndex();
	basket.total = appState.basketTotal;
	basket.disabledButton();
});

events.on('order:open', () => {
	orderModal.render(appState.validateOrderForm());
	orderModal.open();
});

events.on(
	'orderInput:change',
	(data: { field: keyof OrderForm; value: string }) => {
		const { field, value } = data;
		appState.orderForm[field] = value;
		orderModal.render(appState.validateOrderForm());
	}
);

events.on('order:submit', () => {
	contactModal.render(appState.validateContactForm());
	contactModal.open();
});

events.on(
	'contactsInput:change',
	(data: { field: keyof IContactForm; value: string }) => {
		const { field, value } = data;
		appState.contactForm[field] = value;
		contactModal.render(appState.validateContactForm());
	}
);

events.on('contacts:submit', () => {
	const order: IOrder = {
		payment: appState.orderForm.paymentType,
		address: appState.orderForm.address,
		phone: appState.contactForm.phone,
		email: appState.contactForm.email,
		total: appState.basketTotal,
		items: appState.basketItems.map((item) => item.id),
	};
	api.buyItems(order).then((res) => {
		events.emit('order:success', res);
	});
});

events.on('order:success', () => {
	successModal.total = appState.basketTotal;
	successModal.open();
});

events.on('success:close', () => {
	basket.close();
	orderModal.close();
	contactModal.close();
	successModal.close();
	appState.clearBasket();
	appState.resetForms();
	basketCounter.textContent = `${appState.basketItems.length}`;
	orderModal.reset();
	contactModal.reset();
});
