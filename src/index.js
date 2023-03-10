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

// document.body.classList.toggle('light-theme')

// const switcher = document.getElementById('switch-style')
// const mobileSwitcher = document.getElementById('switch-style2')
// const mobContainer = document.querySelector('.modal-menu__conteiner')

// function saveThemeToLocalStorage(theme) {
//   localStorage.setItem('selectedTheme', theme);
// }

// switcher.onclick = function(){
// 	const selectedTheme = document.body.classList.toggle("dark-theme")
// 	document.body.classList.toggle("dark-theme")

// 	saveThemeToLocalStorage(selectedTheme);
// }
// mobileSwitcher.onclick = function(){
// 	const selectedTheme = mobContainer.classList.contains('dark-theme') ? 'light' : 'dark';
// 	classList.toggle("dark-theme")

// 	saveThemeToLocalStorage(selectedTheme);
// }

// window.addEventListener('load', function() {
//   const selectedTheme = localStorage.getItem('selectedTheme');
//   if (selectedTheme) {
//     document.body.classList.add(selectedTheme + '-theme');
//   }
// });