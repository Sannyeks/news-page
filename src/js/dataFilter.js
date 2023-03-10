// import { getCategoryList } from './api/fetchApi.js';
// import cardMarkup from './cardMarkup'



// function filterObjectsByDateAndCallCardMarkup(objects, date) {
//   const filteredObjects = objects.filter((object) => {
//     // Перевіряємо, чи дата об'єкту співпадає з заданою датою
//     return object.date.getTime() === date.getTime();
//   });

//   // Для кожного об'єкту, який пройшов фільтрацію, викликаємо функцію "cardMarcup"
//   filteredObjects.forEach((object) => {
//     const cardMarkup = cardMarcup(object);
//     // Робимо щось зі згенерованим розміткою картки, наприклад, додаємо його до DOM
//     document.body.appendChild(cardMarkup);
//   });
// }

// // Приклад використання функцій
// const categories = ['Category 1', 'Category 2', 'Category 3'];
// const objects = generateObjectsByCategory(categories);

// // Фільтруємо об'єкти за датою і викликаємо "cardMarkup" для кожного об'єкту, який пройшов фільтрацію
// const dateToFilterBy = new Date();
// filterObjectsByDateAndCallCardMarkup(objects, dateToFilterBy);