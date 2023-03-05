import axios from 'axios';
import { cardItems } from './cardMarkup';

const undefinedReadeMore = document.querySelector('.underfined');
const block = document.querySelector('.cards__list');
console.log(localStorage.setItem(' block', "cards__list"));
const newList = document.querySelector('.cards__list');


newList.addEventListener('click', removeToFavorite);
const dataInLocal = JSON.parse(localStorage.getItem('favorite'));

if (dataInLocal === null) {
  undefinedReadeMore.classList.remove('underfined-hidden');
}
function removeToFavorite(e) {
  const btn = e.target.closest(`.item-news__remove-to-favorite-btn`);
  if (!btn) return;
  if (!dataInLocal) {
    return;
  }
  console.log(btn.parentNode.parentNode.parentNode.parentNode);
  let uri =
    btn.parentNode.parentNode.nextElementSibling.nextElementSibling
      .lastElementChild.textContent;

  for (let i = 0; i < dataInLocal.length; i += 1) {
    if (dataInLocal[i].uri === uri) {
      dataInLocal.splice(i, 1);
    }
  }
  localStorage.setItem(`favorite`, JSON.stringify(dataInLocal));
  btn.parentNode.parentNode.parentNode.parentNode.remove();
  // location.reload();
}

function getLocalData() {
  if (localStorage.getItem('favorite') === null) return;
  if (JSON.parse(localStorage.getItem('favorite')).length === 0) {
    console.log('error');
    undefinedReadeMore.classList.remove('underfined-hidden');
    return;
  }
  const data = JSON.parse(localStorage.getItem('favorite'));
  const markup = createMarkup(data);
  block.insertAdjacentHTML('beforeend', markup);
}

getLocalData();


const galleryContainer = document.querySelector('.gallery container');
const itemsMarkup = document.querySelector('.cardItems');

function createGallery(items) {
    return items.map({ headline, web_url, pub_date, lead_paragraph, news_desk, bigMobileImg, smallMobileImg, smallSquareImg, bigSquareImg } => {
        const lenght = lead_paragraph.length > 80
      ? lead_paragraph.slice(0, 80) + '...'
      : lead_paragraph;
        return `
         <li class="card__item">
        <div class="card__wrapper">
        <div class="card-image__wrapper">
         <img
          class="card__image"
          src="https://www.nytimes.com/${bigSquareImg}"
          alt="news"
          width="288"
          height="395"
          loading='lazy'
        />
        <p class="card-jobsearching"> ${news_desk} </p>
        <button class="card__btn-add hidden-span" type="button">Add to favorite 
        <span class="card__btn-add">Add to favorite<svg class=""></svg></span>
         <svg class=""></svg>
        <span class="card__btn-remove">Add to favorite<svg class=""></svg></span>
         ::after
        </button>
        <span class="card-already__read is-hidden">Already read</span>
         <span class="card-already__read is-hidden">Already read</span>
        <button class="card__btn" type="button">Add to favorite</button>
      </div>

      <h2 class="card__title">${headline}</h2>
      <p class="card__article">${lenght}</p>

      <div class="card__info">
        <span class="card__info--date">${pub_date}</span>
        <a class="card__info--readmore" href="${web_url}" target="_blank">
          Read more
        </a>
      </div>
    </div>
  </li>`
    }).join(''); 
}

galleryContainer.innerHTML = itemsMarkup;

document.querySelector('.news-loader__container ').classList.add('is-hidden');

export { createGallery, block };
