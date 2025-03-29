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

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)


const itemData = new ItemData(events);
const itemTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')

const itemContainer = new ItemContainer(document.querySelector('.gallery'));

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
   // console.log(item)
    
   // return itemInsnant.render(item);
   return itemInsnant.render(item);
   
    
  });
  //console.log(itemArray)
  itemContainer.render({catalog: itemArray});
})






//const testSection = document.querySelector('.gallery');

/*
//const testItem = [{
  "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
  "description": "Если планируете решать задачи в тренажёре, берите два.",
  "image": "/5_Dots.svg",
  "title": "+1 час в сутках",
  "category": "софт-скил",
  "price": 750
},
{
  "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
  "image": "/Shell.svg",
  "title": "HEX-леденец",
  "category": "другое",
  "price": 1450
},
{
  "id": "b06cde61-912f-4663-9751-09956c0eed67",
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "image": "/Asterisk_2.svg",
  "title": "Мамка-таймер",
  "category": "софт-скил",
  "price": null
},
{
  "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
  "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
  "image": "/Soft_Flower.svg",
  "title": "Фреймворк куки судьбы",
  "category": "дополнительное",
  "price": 2500
},
{
  "id": "1c521d84-c48d-48fa-8cfb-9d911fa515fd",
  "description": "Если орёт кот, нажмите кнопку.",
  "image": "/mute-cat.svg",
  "title": "Кнопка «Замьютить кота»",
  "category": "кнопка",
  "price": 2000
},
{
  "id": "f3867296-45c7-4603-bd34-29cea3a061d5",
  "description": "Чтобы научиться правильно называть модификаторы, без этого не обойтись.",
  "image": "Pill.svg",
  "title": "БЭМ-пилюлька",
  "category": "другое",
  "price": 1500
},
{
  "id": "54df7dcb-1213-4b3c-ab61-92ed5f845535",
  "description": "Измените локацию для поиска работы.",
  "image": "/Polygon.svg",
  "title": "Портативный телепорт",
  "category": "другое",
  "price": 100000
},
{
  "id": "6a834fb8-350a-440c-ab55-d0e9b959b6e3",
  "description": "Даст время для изучения React, ООП и бэкенда",
  "image": "/Butterfly.svg",
  "title": "Микровселенная в кармане",
  "category": "другое",
  "price": 750
},
{
  "id": "48e86fc0-ca99-4e13-b164-b98d65928b53",
  "description": "Очень полезный навык для фронтендера. Без шуток.",
  "image": "Leaf.svg",
  "title": "UI/UX-карандаш",
  "category": "хард-скил",
  "price": 10000
},
{
  "id": "90973ae5-285c-4b6f-a6d0-65d1d760b102",
  "description": "Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.",
  "image": "/Mithosis.svg",
  "title": "Бэкенд-антистресс",
  "category": "другое",
  "price": 1000
}
//]
*/
//const testCard = new Item(itemTemplate, events);

//testCard.setData(testItem[0])


//testSection.append(testCard.render(testItem[0]))
//console.log(testCard._id)

/*
const item1 = new Item(cloneTemplate(itemTemplate), events);
const item2 = new Item(cloneTemplate(itemTemplate), events);
const itemsArray = [];
itemsArray.push(item1.render(testItem[0]));
itemsArray.push(item2.render(testItem[1]));
testItemContainer.render({catalog: itemsArray});

*/