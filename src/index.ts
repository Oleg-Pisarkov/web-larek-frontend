import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { ItemData } from './components/ItemData';
import { IEvents } from './components/base/events';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Item } from './components/Item';
import { ItemContainer } from './components/ItemContainer';
import { cloneTemplate } from './utils/utils';
import { ModalView } from './components/ModalView';

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)


const itemData = new ItemData(events);
const itemTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')

const itemContainer = new ItemContainer(document.querySelector('.gallery'));
const viewModal = new ModalView(document.querySelector('.modal_full'), events);


events.onAll((event) => {
  console.log(event.eventName, event.data)
})

// Получаем item с сервера


Promise.all([api.getItems()]).then(([items]) => {
  itemData.items = items;
  events.emit('items:loded');
})
.catch((err) => console.log(err));


events.on('items:loded', () => {
  const itemArray = itemData.items.map((item) => {
    const itemInsnant = new Item(cloneTemplate(itemTemplate), events);
   
   return itemInsnant.render(item);
  });
 
  itemContainer.render({catalog: itemArray});
})

/*
events.on('item:open', () => {
  viewModal.open();
  
 })
  */

 events.on('item:open', (data: { item: Item }) => {
  const { item } = data;
  const { id, description, image, title, category, price } = itemData.getItems(item._id);
  const modal = { id, description, image, title, category, price } 
  viewModal.render(modal);
  console.log(modal)
  viewModal.modalItem = modal;
  viewModal.open();
 })   
 
  