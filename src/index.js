// import getPopularArticle from "./js/api/fetchApi";
// import cardMarkup from "./js/cardMarkup";
// import './js/showCategories.js';


// const ulEl = document.querySelector('.cards__list');

// ulEl.insertAdjacentHTML('beforeend', cardMarkup());

const switcher = document.getElementById('switch-style')
const mobileSwitcher = document.getElementById('switch-style2')
const mobContainer = document.querySelector('.modal-menu__conteiner')

switcher.onclick = function(){
	document.body.classList.toggle("dark-theme")
}
mobileSwitcher.onclick = function(){
	mobContainer = document.querySelector('.modal-menu__conteiner')
.classList.toggle("dark-theme")
}

