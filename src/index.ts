import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { IEvents } from './components/base/events';
import { IApi, IContactForm, IItem, IOrder, OrderForm } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Item } from './components/Item/Item';
import { ItemContainer } from './components/Item/ItemContainer';
import { cloneTemplate } from './utils/utils';
import { ItemModal } from './components/Item/ItemModal';
import { AppState } from './components/common/AppState';
import {  BasketModal } from './components/Basket/BasketModal';
import { BasketItem } from './components/Basket/BasketItem';
import { Modal } from './components/common/Modal';
import { Order } from './components/Order/Order';
import { Contacts, IContacts } from './components/Order/Contacts';
import { Success } from './components/Order/Success';
//import { Order } from './components/Order/Order';
//import { Contacts } from './components/Order/Contacts';



const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)
const appState = new AppState(events);
const itemTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')

const itemContainer = new ItemContainer(document.querySelector('.gallery'));
const viewModal = new ItemModal(document.querySelector('.modal_full'), events);
const itemPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');

const basket = new BasketModal(document.querySelector('.modal_basket'), events);
const basketTemplate: HTMLTemplateElement = document.querySelector('#card-basket')
const basketCounter = ensureElement<HTMLSpanElement>('.header__basket-counter');
const basketButton = ensureElement<HTMLButtonElement>('.header__basket');







basketButton.addEventListener('click', () => {
  events.emit('basket:open')
  //basket.open()
});

events.onAll((event) => {
  console.log(event.eventName, event.data)
}) 

// Получаем item с сервера


Promise.all([api.getItems()]).then(([items]) => {
  //2itemData.items = items;
  appState.catalogItems = items
  events.emit('items:loded');
})
.catch((err) => console.log(err));



events.on('items:loded', () => {
  const itemArray = appState.catalogItems.map((item) => {
    const itemInsnant = new Item(cloneTemplate(itemTemplate), { onClick: () => events.emit('item:open', item) });
   
   return itemInsnant.render(item);
  });
 
  itemContainer.render({catalog: itemArray});
})


  events.on('item:open', (item: IItem ) => {
    const itemPreview = new Item(cloneTemplate(itemPreviewTemplate), { onClick: () => events.emit('item:add', item) });
    //const { item } = data;
    const modalData = appState.getCatalogItemById(item.id);
    viewModal.render(modalData);
    viewModal.modalItem = modalData;
    viewModal.open();
    viewModal.ItemId = item.id
});

 
 
 



events.on('item:add', ( item: IItem ) => {
  appState.addBasketItem(item);
  
  basketCounter.textContent = `${appState.basketItems.length}`;
  viewModal.close();
})


events.on('basket:open', () => {
 const basketItem = appState.basketItems.map((item, index) => {
  const  storeItem = new BasketItem(cloneTemplate(basketTemplate), {
    onClick: () => events.emit('basket:remove', item)});
 
 
  return storeItem.render({
    index: `${index + 1}`,
    title: item.title,
    price: item.price 
  })
 })
 
 basket.basketItems = basketItem
 basket.total = appState.basketTotal
 basket.open();
 
})

  
events.on('basket:remove', (item: IItem) => {
  appState.removeBasketItem(item.id);
  basketCounter.textContent = `${appState.basketItems.length}`;
  basket.changeIndex();
  basket.total = appState.basketTotal

})

const orderModal = new Order(document.querySelector('.order-modal'), events);
events.on('order:open', () => {
   
   
   
    
 
  
  orderModal.render(appState.validateOrderForm());
  orderModal.open();
  console.log(appState.orderForm)
})


events.on('orderInput:change', (data: {field: keyof OrderForm, value: string}) => {
  const { field, value } = data;
  appState.orderForm[field] = value;
  orderModal.render(appState.validateOrderForm());
})

const contactModal = new Contacts(document.querySelector('.email-modal'), events);


events.on('order:submit', () => {
  contactModal.render(appState.validateContactForm());
  contactModal.open();
  
})


events.on('contactsInput:change', (data: {field: keyof IContacts, value: string}) => {
  const { field, value } = data;
  appState.contactForm[field] = value;
  contactModal.render(appState.validateContactForm());
})


events.on('contacts:submit', () => {
  //console.log(appState.contactForm, appState.orderForm)
  //const order : IOrder = {...appState.orderForm, ...appState.contactForm};
  const order : IOrder = { 
    payment: appState.orderForm.paymentType,
    address: appState.orderForm.address,
    phone: appState.contactForm.phone,
    email: appState.contactForm.email,
    total: appState.basketTotal,
    items: appState.basketItems.map((item) => item.id)
  };
  api.buyItems(order)
    .then((res) => {
      events.emit('order:success', res);
  })
})



const successModal = new Success(document.querySelector('.result-modal'), events);


 events.on('order:success', () => {
  successModal.total = appState.basketTotal
  successModal.open();
  
  
  /*
  appState.clearBasket();
  basketCounter.textContent = `${appState.basketItems.length}`;
  basket.close();
  orderModal.close();
  contactModal.close();
  */
})

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
})