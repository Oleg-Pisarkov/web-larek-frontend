import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ItemData } from './components/ItemData';
import { IEvents } from './components/base/events';
import { IApi, IItem, IOrderResult } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Item } from './components/Item';
import { ItemContainer } from './components/ItemContainer';
import { cloneTemplate } from './utils/utils';
import { ItemModal } from './components/ItemModal';
import { AppState } from './components/common/AppState';
import { BasketModal } from './components/Basket/BasketModal';
import { BasketItem } from './components/Basket/BasketItem';
import { BasketItemView } from './components/BasketView/BasketItemView';
import { BasketView } from './components/BasketView/BasketView';
//import { BasketView } from './components/BasketView/BasketView';
//import { BasketItemView } from './components/BasketView/BasketItemView';
const events = new EventEmitter();




const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);

//const basket = new BasketView(events);







const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)
const appState = new AppState(events);

// 1 const itemData = new ItemData(events);

const itemTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')

const itemContainer = new ItemContainer(document.querySelector('.gallery'));
const viewModal = new ItemModal(document.querySelector('.modal_full'), events);
const basketontainer = new BasketModal(document.querySelector('.modal_basket'), events);
 

const basketButtom = document.querySelector('.header__basket');
basketButtom.addEventListener('click', () => basketontainer.open());
 
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

/*3
events.on('items:loded', () => {
  const itemArray = itemData.items.map((item) => {
    const itemInsnant = new Item(cloneTemplate(itemTemplate), events);
   
   return itemInsnant.render(item);
  });
 
  itemContainer.render({catalog: itemArray});
})
*/

events.on('items:loded', () => {
  const itemArray = appState.catalogItems.map((item) => {
    const itemInsnant = new Item(cloneTemplate(itemTemplate), events);
   
   return itemInsnant.render(item);
  });
 
  itemContainer.render({catalog: itemArray});
})

/*
4
 events.on('item:open', (data: { item: Item }) => {
  const { item } = data;
  const { id, description, image, title, category, price } = itemData.getItems(item._id);
  const modal = { id, description, image, title, category, price } 
  viewModal.render(modal);
  viewModal.modalItem = modal;
  viewModal.open();
  viewModal.ItemId = item._id
  
 })   
  */
  events.on('item:open', (data: { item: IItem }) => {
    const { item } = data;
    const modalData = appState.getCatalogItemById(item.id);
    viewModal.render(modalData);
    viewModal.modalItem = modalData;
    viewModal.open();
    viewModal.ItemId = item.id
  })



 
 /*
events.on('item:add', (data: { item: Item }) => {
 
 /* 
 otpravka na server
 const id = data.item.id;
  const total = data.item.price;
  console.log(id, total)
  
  Promise.all([api.buy(id, total)]).then(([items]) => {
    console.log(items)
    
    events.emit('items:123');
  })
 otpravka na server
 
  const { item } = data;
  const { id, description, image, title, category, price } = itemData.getItems(item._id);
  const modal = { id, description, image, title, category, price } 
  basket.Basket = modal;
  basket.open();

*/
/*


events.on('item:add', (data: { item: Item }) => {
 newbaskertest.items.push();
  
})
 */
/*
events.on('basketItems:add', () => {
  basketCounter.textContent = `${appState.basketItems.length}`;
  basket.render({
    //tems: appState.basketItems,
    total: appState.basketTotal
  })
}) BasketItemView
  */
const basketLi = new BasketView(events);
events.on('item:add', (data: { item: ItemModal}) => {
  const basketItem = new BasketItem(basketLi , events);
  //appState.addBasketItem(data.item.modalItem);
 // basketontainer.render({items: appState.basketItems, total: appState.basketTotal});
})