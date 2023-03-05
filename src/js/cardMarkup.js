import {hasItem} from "./localstorage";
const FAVORITE_KEY = "favorite-key";
const READ_KEY = "read-key";



export default function cardMarkup(items) {

  

  const markup = items.map(({headline, web_url, pub_date, lead_paragraph, news_desk, bigMobileImg,smallMobileImg,smallSquareImg,bigSquareImg})=> {
    const lenght = lead_paragraph.length > 80
      ? lead_paragraph.slice(0, 80) + '...'
      : lead_paragraph;
      
    const isFav = hasItem(FAVORITE_KEY, (item) => item.web_url == web_url);
    const isReaded = hasItem(READ_KEY, (item) => item.web_url == web_url);
 
    return `<li class="card__item">
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
        <span class="card-jobsearching"> ${news_desk} </span>
        <span class="card-already__read ${isReaded ? "" : "is-hidden" }">Already read</span>
        <button class="card__btn btn-add ${isFav ? "is-hidden" : ""}" type="button" 
        data-url="${web_url}">Add to favorite</button>
        <button class="card__btn btn-remove ${isFav ? "" : "is-hidden"}" type="button" data-url="${web_url}">Remove from favorite</button>
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
  </li>`;
    });

    let clientViewportWidth = window.innerWidth;
    const weatherElement = '<li class="card__item"><div class="card__item--weather"></div></li>';

 
  if (clientViewportWidth >= 768 && clientViewportWidth < 1280) {
    markup.splice(1, 0, weatherElement);
  } else if (clientViewportWidth >= 1280) {
    markup.splice(2, 0, weatherElement);
  } else {
    markup.splice(0, 0, weatherElement);
  }

  return markup.join('');

 
}

// const ulEl = document.querySelector('.cards__list');

// ulEl.insertAdjacentHTML('beforeend', cardMarkup());

