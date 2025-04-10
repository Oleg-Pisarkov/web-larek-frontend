import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
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
//import { Basket, BasketContainer } from './components/newBasket/Basket';
//import { Modal } from './components/common/Modal';


const events = new EventEmitter();






const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)
const appState = new AppState(events);
const itemTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')

const itemContainer = new ItemContainer(document.querySelector('.gallery'));
const viewModal = new ItemModal(document.querySelector('.modal_full'), events);

 


 
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
    const itemInsnant = new Item(cloneTemplate(itemTemplate), events);
   
   return itemInsnant.render(item);
  });
 
  itemContainer.render({catalog: itemArray});
})


  events.on('item:open', (data: { item: IItem }) => {
    const { item } = data;
    const modalData = appState.getCatalogItemById(item.id);
    viewModal.render(modalData);
    viewModal.modalItem = modalData;
    viewModal.open();
    //viewModal.ItemId = item.id
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

BASKET




import { BasketModal } from './components/Basket/BasketModal';
import { BasketItem } from './components/Basket/BasketItem';
import { BasketItemView } from './components/BasketView/BasketItemView';
import { BasketView } from './components/BasketView/BasketView';
const basketTemplate: HTMLTemplateElement = document.querySelector('#card-basket')
const basketContainer = new BasketModal(document.querySelector('.modal_basket'), events);

const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);



const basketButtom = document.querySelector('.header__basket');
basketButtom.addEventListener('click', () => {
  basketContainer.open();
  events.emit('basket:open')
});




events.on('item:add', (data: { item: IItem }) => {
 appState.addBasketItem(data.item);
 basketCounter.textContent = `${appState.basketItems.length}`;
 viewModal.close();
})

events.on('basketItems:add', () => {
  basketCounter.textContent = `${appState.basketItems.length}`;
basketContainer.render({
  total: appState.basketTotal,
  items: appState.basketItems.map((item, index) => new BasketItemView( cloneTemplate(basketTemplate), events).render({...item, index: index + 1}))
  

})
const basketItems = appState.basketItems.map((item) => {
 
  
})
  
})
*/
/*

//NEW BASKET
const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);

basketButton.addEventListener('click', () => {
  events.emit('basket:open')
});

//const modalBasket = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const basket = new Basket('basket', cloneTemplate(basketTemplate), events);

events.on('item:add', ( item: IItem ) => {
appState.addBasketItem(item);
basketCounter.textContent = `${appState.basketItems.length}`;
viewModal.close();
})

events.on('basket:open', () => {
 
 });

 
 */

 //BASKET V2

 /*
const basketItemTemplate: HTMLTemplateElement = document.querySelector('#card-basket')
const basketContainer = new Basket(document.querySelector('.modal_basket'), events);
const viewBasket = new BasketContainer(document.querySelector('.basket'), events);

const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);

basketButton.addEventListener('click', () => {
  events.emit('basket:open')
});

events.on('item:add', ( item: IItem ) => {
  appState.addBasketItem(item);
  basketCounter.textContent = `${appState.basketItems.length}`;
  viewModal.close();
  const basketArray = appState.basketItems.map((item) => {
    const basketInsnant = new BasketContainer(cloneTemplate(basketItemTemplate), events);
    return basketInsnant.render(item);
  })
basketContainer.render({
  list: basketArray,
  price: appState.basketTotal,
  
})
  })


events.on('basket:open', () => {
  

})
*/

import {  BasketModal } from './components/BasketverSSS/BasketModal';
import { BasketItem } from './components/BasketverSSS/BasketItem';

const basket = new BasketModal(document.querySelector('.modal_basket'), events);
//const basketItem = new BasketItem(document.querySelector('basket__item'), events)
const basketTemplate: HTMLTemplateElement = document.querySelector('#card-basket')
/*
const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);

basketButton.addEventListener('click', () => {
  events.emit('basket:open')
  //basket.open()
});
*/

const basketCounter = ensureElement<HTMLSpanElement>('.header__basket-counter');

events.on('item:add', ( item: IItem ) => {
  appState.addBasketItem(item);
  
  basketCounter.textContent = `${appState.basketItems.length}`;
  viewModal.close();
})

/*
events.on('basket:open', (item: {item: IItem}) => {
  
  const basketArray = appState.basketItems.map((item) => {
    console.log(item.title)
    const basketInsnant = new BasketItem(cloneTemplate(basketTemplate), events);
    basketInsnant.index = `${appState.basketItems.indexOf(item) + 1}`;
    //basketInsnant.price = item.price.toString();
   // basketInsnant.title = item.title;
    console.log(item)
    return basketInsnant.render(item);
  })
  basket.render({
    items: basketArray,
    total: appState.basketTotal,
    
  })
  basket.open()
  //console.log(basketArray)
})







/*
 events.on('item:open', (data: { item: IItem }) => {
    const { item } = data;
    const modalData = appState.getCatalogItemById(item.id);
    viewModal.render(modalData);
    viewModal.modalItem = modalData;
    viewModal.open();
    //viewModal.ItemId = item.id
  })
*/

const basketButton = ensureElement<HTMLButtonElement>('.header__basket');


basketButton.addEventListener('click', () => {
  events.emit('basket:open')
  //basket.open()
});

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

  

//'basket:remove'

events.on('basket:remove', (item: IItem) => {
  appState.removeBasketItem(item.id);
  basketCounter.textContent = `${appState.basketItems.length}`;
  basket.changeIndex();
  basket.total = appState.basketTotal

})