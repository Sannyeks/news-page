import { loadItems } from "./localstorage";
import cardMarkup from './cardMarkup';

const READ_KEY = 'read-key';

function init () {
  const list = document.querySelector('.read-news__container');
  const loadedItems = loadItems(READ_KEY)

  const loadedItemsByDate = groupBy(loadedItems, 'readDate');

  for (let groupedDatesKeys of Object.keys(loadedItemsByDate)) {
    const readNewsHeader = document.createElement('div');
    readNewsHeader.classList.add("read-news__header", "hidden");
    readNewsHeader.innerHTML = groupedDatesKeys

    readNewsHeader.addEventListener('click', toggleDropdown);

    list.appendChild(readNewsHeader )

    const readNewsItems = document.createElement('div');
    readNewsItems.classList.add("read-news__items", "hidden" );
    readNewsItems.appendChild( cardMarkup(loadedItemsByDate[groupedDatesKeys]))

    list.appendChild(readNewsItems)
  }
}

init()

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
}


function toggleDropdown(event) {
  event.target.nextElementSibling.classList.toggle('hidden')
  event.target.classList.toggle('hidden')
}