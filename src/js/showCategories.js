import { markupCategories, markupNameButton } from './markupCategoriesFilter.js';
// import { cardMarkup } from './cardMarkup.js';

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
  const currentButtonCategory = event.target.dataset.btn;
  console.log(currentButtonCategory);
  // cardMarkup(currentButtonCategory);
};

function onSearchNewsMenu(event) {
  const currentButtonCategory = event.target.dataset.btn;
  const currentButtonValue = event.target.innerText;
  console.log(currentButtonCategory);
  // cardMarkup(currentButtonCategory);
 

  markupNameButton(decodeURIComponent(currentButtonValue));
  categoriesMenu.classList.remove('is-open-categories');

  arrowBtnCategories.classList.add('open-categories');
  categoriesBtn.focus();
}
