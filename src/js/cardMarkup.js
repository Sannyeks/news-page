// import { hasItem, addItem, removeItem } from './localstorage';
// const FAVORITE_KEY = 'favorite-key';
// const READ_KEY = 'read-key';

// function formatDate(dt) {
//   return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`
// }

// export default function cardMarkup(items) {
//   const markup = items.map(item => {
//     const {
//       headline,
//       web_url,
//       pub_date,
//       lead_paragraph,
//       news_desk,
//       bigMobileImg,
//       smallMobileImg,
//       smallSquareImg,
//       bigSquareImg,
//     } = item;
//     const lenght =
//       lead_paragraph.length > 80
//         ? lead_paragraph.slice(0, 80) + '...'
//         : lead_paragraph;
//         const img = !bigSquareImg ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eXq6h_EHL7Iu-tVrAWQPJ4ozAiL3y5NY2m5jmcw&s' : `https://www.nytimes.com/${bigSquareImg}`;

//     const isFav = hasItem(FAVORITE_KEY, item => item.web_url == web_url);
//     const isReaded = hasItem(READ_KEY, item => item.web_url == web_url);

//     const pub_date_fmt = formatDate(new Date(pub_date))
    
//     const cardItem = document.createElement('li');
//     cardItem.classList.add('card__item');
//     cardItem.innerHTML = `<div class="card__wrapper">

//       <div class="card-image__wrapper">
//         <img
//           class="card__image"
//           src=${img}
//           alt="news"
//           width="288"
//           height="395"
//           loading='lazy'
//         />
//         <span class="card-jobsearching"> ${news_desk} </span>
//         <span class="card-already__read ${
//           isReaded ? '' : 'is-hidden'
//         }">Already read</span>
//         <button class="card__btn btn-add ${
//           isFav ? 'is-hidden' : ''
//         }" type="button" 
//         data-url="${web_url}">Add to favorite</button>
//         <button class="card__btn btn-remove ${
//           isFav ? '' : 'is-hidden'
//         }" type="button" data-url="${web_url}">Remove from favorite</button>
//       </div>

//       <h2 class="card__title">${headline}</h2>
//       <p class="card__article">${lenght}</p>

//       <div class="card__info">
//         <span class="card__info--date">${pub_date_fmt}</span>
//         <a class="card__info--readmore" href="${web_url}" target="_blank">
//           Read more
//         </a>
//       </div>
//     </div>`;

//     const btnAddToFavorite = cardItem.querySelector('button.card__btn.btn-add');
//     const btnRemoveFromFavorite = cardItem.querySelector(
//       'button.card__btn.btn-remove'
//     );
//     const labelAlreadyRead = cardItem.querySelector('.card-already__read')
//     const lnkReadMore = cardItem.querySelector('a.card__info--readmore')

//     btnAddToFavorite.addEventListener('click', () => {
//       addItem(FAVORITE_KEY, item);
//       btnAddToFavorite.classList.add('is-hidden');
//       btnRemoveFromFavorite.classList.remove('is-hidden');
//     });

//     btnRemoveFromFavorite.addEventListener('click', () => {
//       removeItem(FAVORITE_KEY, ({ web_url:url }) => web_url === url);
//       btnRemoveFromFavorite.classList.add('is-hidden');
//       btnAddToFavorite.classList.remove('is-hidden');
//     });

//     lnkReadMore.addEventListener('click', () => {
//       removeItem(READ_KEY, ({web_url: url}) => web_url === url)
//       item.readDate=formatDate(new Date())
//       addItem(READ_KEY, item);
//       labelAlreadyRead.classList.remove('is-hidden')
//     })
    
//     return cardItem;
//   });

//   const weatherElement = document.createElement('li')
//   weatherElement.classList.add('card__item')
//   weatherElement.innerHTML = '<div class="card__item--weather"></div>'
//   let clientViewportWidth = window.innerWidth;
//   if (clientViewportWidth >= 768 && clientViewportWidth < 1280) {
//     markup.splice(1, 0, weatherElement);
//   } else if (clientViewportWidth >= 1280) {
//     markup.splice(2, 0, weatherElement);
//   } else {
//     markup.splice(0, 0, weatherElement);
//   }

//   // return markup.join('');
//   const cardItemsFragment = document.createDocumentFragment()
//   markup.forEach(card => cardItemsFragment.appendChild(card))
  

//   return cardItemsFragment;
// }
import { hasItem, addItem, removeItem } from './localstorage';
const FAVORITE_KEY = 'favorite-key';
const READ_KEY = 'read-key';

function formatDate(dt) {
 

  return (dt.toLocaleDateString("en-GB"))
}

export default function cardMarkup(items) {
  if ('response' in items && 'docs' in items.response) {
    items = items.response.docs
  }

  items = items || []

  const markup = items.map(item => {
    const {
      headline,
      web_url,
      pub_date,
      lead_paragraph,
      news_desk,
      bigMobileImg,
      smallMobileImg,
      smallSquareImg,
      bigSquareImg,
    } = item;
    const lenght =
      lead_paragraph.length > 80
        ? lead_paragraph.slice(0, 80) + '...'
        : lead_paragraph;

    const isFav = hasItem(FAVORITE_KEY, item => item.web_url == web_url);
    const isReaded = hasItem(READ_KEY, item => item.web_url == web_url);

    const pub_date_fmt = formatDate(new Date(pub_date));
    const img = !bigSquareImg ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eXq6h_EHL7Iu-tVrAWQPJ4ozAiL3y5NY2m5jmcw&s' : `https://www.nytimes.com/${bigSquareImg}`;
    
    const cardItem = document.createElement('li');
    cardItem.classList.add('card__item');
    cardItem.innerHTML = `<div class="card__wrapper">
      <div class="card-image__wrapper">
        <img
          class="card__image"
          src=${img}
          alt="news"
          width="288"
          height="395"
          loading='lazy'
        />
        <span class="card-jobsearching"> ${news_desk} </span>
        <span class="card-already__read ${
          isReaded ? '' : 'is-hidden'
        }">Already read</span>
        <button class="card__btn btn-add ${
          isFav ? 'is-hidden' : ''
        }" type="button" 
        data-url="${web_url}">Add to favorite</button>
        <button class="card__btn btn-remove ${
          isFav ? '' : 'is-hidden'
        }" type="button" data-url="${web_url}">Remove from favorite</button>
      </div>

      <h2 class="card__title">${headline}</h2>
      <p class="card__article">${lenght}</p>

      <div class="card__info">
        <span class="card__info--date">${pub_date_fmt}</span>
        <a class="card__info--readmore" href="${web_url}" target="_blank">
          Read more
        </a>
      </div>
    </div>`;

    const btnAddToFavorite = cardItem.querySelector('button.card__btn.btn-add');
    const btnRemoveFromFavorite = cardItem.querySelector(
      'button.card__btn.btn-remove'
    );
    const labelAlreadyRead = cardItem.querySelector('.card-already__read')
    const lnkReadMore = cardItem.querySelector('a.card__info--readmore')

    btnAddToFavorite.addEventListener('click', () => {
      addItem(FAVORITE_KEY, item);
      btnAddToFavorite.classList.add('is-hidden');
      btnRemoveFromFavorite.classList.remove('is-hidden');
    });

    btnRemoveFromFavorite.addEventListener('click', () => {
      removeItem(FAVORITE_KEY, ({ web_url:url }) => web_url === url);
      btnRemoveFromFavorite.classList.add('is-hidden');
      btnAddToFavorite.classList.remove('is-hidden');
    });

    lnkReadMore.addEventListener('click', () => {
      removeItem(READ_KEY, ({web_url: url}) => web_url === url)
      item.readDate=formatDate(new Date())
      addItem(READ_KEY, item);
      labelAlreadyRead.classList.remove('is-hidden')
    })
    
    return cardItem;
  });

  const weatherElement = document.createElement('li')
  weatherElement.classList.add('card__item')
  weatherElement.innerHTML = '<div class="card__item--weather"></div>'
  let clientViewportWidth = window.innerWidth;
  if (clientViewportWidth >= 768 && clientViewportWidth < 1280) {
    markup.splice(1, 0, weatherElement);
  } else if (clientViewportWidth >= 1280) {
    markup.splice(2, 0, weatherElement);
  } else {
    markup.splice(0, 0, weatherElement);
  }

  // return markup.join('');
  const cardItemsFragment = document.createDocumentFragment()
  markup.forEach(card => cardItemsFragment.appendChild(card))
  

  return cardItemsFragment;
}