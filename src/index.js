// import getPopularArticle from "./js/api/fetchApi";
// import cardMarkup from "./js/cardMarkup";
// import './js/showCategories.js';


// const ulEl = document.querySelector('.cards__list');

// ulEl.insertAdjacentHTML('beforeend', cardMarkup());

const switcher = document.getElementById('switch-style')

switcher.onclick = function(){
	document.body.classList.toggle("dark-theme")
}