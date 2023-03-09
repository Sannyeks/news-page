import { markupCategories, markupNameButton } from './markupCategoriesFilter.js';
import cardMarkup from "./cardMarkup";
import {initWeather} from './weather';
import {headerRefs} from "./headerRefs";


const categoriesList = document.querySelector('.buttons-list');
const categoriesBtn = document.querySelector('#btn-open-category');
const categoriesMenu = document.querySelector('.category__menu');
const arrowBtnCategories = document.querySelector('.arrow-icon');

markupCategories(categoriesMenu);
markupNameButton();

categoriesList.addEventListener('click', onSearchNewsBtn);
categoriesBtn.addEventListener('click', onToggleCategoriesMenu);
categoriesMenu.addEventListener('click', onSearchNewsMenu);

function onToggleCategoriesMenu() {
    const isMenuOpen = 
        categoriesBtn.getAttribute('aria-expanded') === 'true' || false;
    categoriesBtn.setAttribute('aria-expanded', !isMenuOpen);
    categoriesMenu.classList.toggle('is-open-categories');
    if (categoriesMenu.classList.contains('is-open-categories')) {
        arrowBtnCategories.classList.add('open-categories');
    }
    if (!categoriesMenu.classList.contains('is-open-categories')) {
        arrowBtnCategories.classList.remove('open-categories');
        categoriesBtn.blur();
    }
};

window.onclick = event => {
    if (!event.target.matches('.category__btn')) {
    if (!event.target.matches('.btn-item')) {
      if (categoriesMenu.classList.contains('is-open-categories')) {
        categoriesMenu.classList.remove('is-open-categories');
      }
    }
  }
  if (!event.target.matches('.category__btn')) {
    
    if (arrowBtnCategories.classList.contains('open-categories')) {
      arrowBtnCategories.classList.remove('open-categories');
    }
  }
};

function onSearchNewsBtn(event) {
  headerRefs.paginator.innerHTML = '';
  const currentButtonCategory = event.target.dataset.btn;
  // console.log(currentButtonCategory);
  getNewsByFilter(currentButtonCategory).then(res => {
	const ulEl = document.querySelector('.popular-articles__list');
    ulEl.replaceChildren(cardMarkup(res));
    initWeather()
})
  // cardMarkup(currentButtonCategory);
};

function onSearchNewsMenu(event) {
  const currentButtonCategory = event.target.dataset.btn;
  const currentButtonValue = event.target.innerText;
  // console.log(currentButtonCategory);
  
  getNewsByFilter(currentButtonCategory).then(res => {
    const ulEl = document.querySelector('.popular-articles__list');
    ulEl.replaceChildren(cardMarkup(res));
    initWeather();
    
 
  });
  // cardMarkup(currentButtonCategory);
 

  markupNameButton(decodeURIComponent(currentButtonValue));
  categoriesMenu.classList.remove('is-open-categories');

  arrowBtnCategories.classList.add('open-categories');
  categoriesBtn.focus();
}
// =====================================

const apiKey = '3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';

async function getNewsByFilter(currentButtonCategory) {
  const category = currentButtonCategory;
  // console.log(category);
	const response = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=${apiKey}`);
	const data = await response.json();
	const { results } = data;
	const resultArticles = [];

	  results.map(({ title, url, published_date, abstract, section, id, multimedia
    }) => {
      const image = (multimedia)
      ? multimedia[3].url
      : 'https://as1.ftcdn.net/v2/jpg/00/77/50/78/500_F_77507884_B00iVspJkgxbh6o1JuKza9qYpioCZ9ja.jpg';
  

		const article = {
		headline: title,
		web_url: url, 
      pub_date: published_date,
      lead_paragraph: abstract,
      news_desk: section, 
      bigSquareImg: image,
      // smallMobileImg: image,
      // smallSquareImg: image,
      // bigSquareImg: image,
      id: id
		}

		resultArticles.push(article);
  } ); 
  resultArticles.length = upadatePerPage();
	// console.log(resultArticles);
	return resultArticles;
}

// getNewsByFilter().then(res => {
// 	const ulEl = document.querySelector('.popular-articles__list');
// 	ulEl.replaceChildren(cardMarkup(res));
// })

function upadatePerPage() {
	const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');
	const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
	const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
	
	if (mediaQueryDesktop.matches) {
	  return 9;
	} 
	if (mediaQueryTablet.matches) {
	  return 6;
	} 
	if (mediaQueryMobile.matches) {
	  return 3;
	} 

}