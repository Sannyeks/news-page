import { loadItems } from "./localstorage";
import cardMarkupFavPage from './cardMarkupFavPage';

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
    readNewsItems.appendChild( cardMarkupFavPage(loadedItemsByDate[groupedDatesKeys]))

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

const readNotFound = document.querySelector('.read-not-found');
const readNewContainer = document.querySelector('.read-news__container');
function readNotFoundShow() {
  console.log(loadItems(READ_KEY) === []);
  if (loadItems(READ_KEY).length === 0) {
    console.log(1111);
    readNewContainer.style.display = 'none';
    readNotFound.style.display = 'flex';
    readNotFound
      .querySelector('.underfined')
      .classList.remove('underfined-hidden');
  }
}

readNotFoundShow();

