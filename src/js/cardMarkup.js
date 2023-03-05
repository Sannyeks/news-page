

export default function cardMarkup(items) {
  const markup = items.map(({headline, web_url, pub_date, lead_paragraph, news_desk, bigMobileImg,smallMobileImg,smallSquareImg,bigSquareImg})=> {
    const lenght = lead_paragraph.length > 80
      ? lead_paragraph.slice(0, 80) + '...'
      : lead_paragraph;
      

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
        <span class="card-already__read is-hidden">Already read</span>
        <button class="card__btn btn-add" type="button" >Add to favorite</button>
        <button class="card__btn btn-remove" type="button" data-url="${web_url}">Remove from favorite</button>
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
    for (let i = 1; i < markup.length; i += 6) {
      markup.splice(i, 0, weatherElement);
    }
  } else if (clientViewportWidth >= 1280) {
    for (let i = 2; i < markup.length; i += 9) {
      markup.splice(i, 0, weatherElement);
    }
  } else {
    for (let i = 0; i < markup.length; i += 3) {
      markup.splice(i, 0, weatherElement);
    }
  }
 

 
    

 

 




  return markup.join('');

 
}

// const ulEl = document.querySelector('.cards__list');

// ulEl.insertAdjacentHTML('beforeend', cardMarkup());

