// export { cardMarkupFavPage };
import cardMarkup from './cardMarkup';
const favoriteContainer = document.querySelector('.favorite-container');
const favoriteNotFound = document.querySelector('.favorite-not-found');

const FAVORITE_KEY = 'favorite-key';

const favoriteNews = localStorage.getItem(FAVORITE_KEY);
let parseFavoriteNews = JSON.parse(favoriteNews);

favoriteContainer.replaceChildren(cardMarkup(parseFavoriteNews));

favoriteContainer.addEventListener('click', removeFromFavorite);
function removeFromFavorite(event) {
  console.log(event.target.dataset.url);
  let currentFavorite = event.target.dataset.url;
  parseFavoriteNews.map(favoriteCard => {
    if (favoriteCard.web_url === currentFavorite) {
      const favoriteCardIndex = parseFavoriteNews.indexOf(favoriteCard);

      parseFavoriteNews.splice(favoriteCardIndex, 1);
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(parseFavoriteNews));
      favoriteContainer.replaceChildren(cardMarkup(parseFavoriteNews));
    }
  });
}

function favoriteNotFoundShow() {
  console.log(parseFavoriteNews === []);
  if (parseFavoriteNews.length === 0) {
    console.log(1111);
    favoriteContainer.style.display = 'none';
    favoriteNotFound.style.display = 'flex';
    favoriteNotFound
      .querySelector('.underfined')
      .classList.remove('underfined-hidden');
  }
}

favoriteNotFoundShow();

// export { cardMarkupFavPage };
