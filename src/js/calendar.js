

const daysTag = document.querySelector('.days'),
  currentDate = document.querySelector('.current-date'),
  prevNextIcon = document.querySelectorAll('.calendar-icons span');

// getting new date, current year and month
let date = new Date(),
  currDay = date.getDate(),
  currMonth = date.getMonth(),
  currYear = date.getFullYear();


//Активные кнопки и модульний календарь
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('body'),
    modal: document.querySelector('[data-modal]'),
    input: document.querySelector('.calendar-input'),
    arrow: document.querySelector('.calendar__button-arrow'),
    calendarBtn: document.querySelector('.calendar__button-calendar'),
  };

  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener('click', toggleModal);
  }

  document.addEventListener('click', hideModals);
 
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden-wrapper');
    refs.input.classList.toggle('isActive');
    refs.arrow.classList.toggle('switched');
    refs.calendarBtn.classList.toggle('switchedColor');
    // showCurrentDate();
  }

  function hideModals(evt) {
    let dataValue = document.getElementById('input-picker').value;
    if (evt.target.closest('.calendar-form')) {
      return;
    }
    if (refs.input.classList.contains('isActive')) {
      refs.modal.classList.add('is-hidden-wrapper');
      refs.input.classList.remove('isActive');
      refs.arrow.classList.remove('switched');
      refs.calendarBtn.classList.remove('switchedColor');
      document.getElementById('input-picker').value = '';
      localStorage.removeItem('VALUE');
      localStorage.removeItem('date');
    }
  }
})();

// storing full name of all months in array
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const renderCalendar = number => {

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = '';
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li style="color: silver" class="inactive">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();
    //   ? 'active'
    //   : '';
    liTag += `<li class="${isToday}">${i}</li>`;
    //console.log(isToday);
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li style="color: silver" class="inactive">${
      i - lastDayofMonth + 1
    }</li>`;
  }

  if (currentDate) {
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
  }
  if (daysTag) {
    daysTag.innerHTML = liTag;
  }
  // passing current mon and yr as currentDate text

  // console.log(liTag);
  const dayChange = document.querySelector('.days');
  // function addChangingDayListener() {

  if (dayChange) {
    dayChange.addEventListener('click', evt => {
    
      [...evt.currentTarget.children].forEach(item => {
        item.classList.remove('active');
        //console.log(item.textContent);
      });

      evt.target.classList.add('active');
      let newValueDay = evt.target.textContent;
      if (evt.target.textContent.length > 10) {
        return;
      }
      let month = (currMonth + 1).toString();
      document.getElementById('input-picker').value =
        currYear +
        '/' +
        month.padStart(2, '0') +
        '/' +
        newValueDay.padStart(2, '0');

      localStorage.setItem('VALUE', JSON.stringify(newValueDay));

      let inputDateValue = document.querySelector('.calendar-input').value;
      // console.log(inputDateValue);
      localStorage.setItem('date', JSON.stringify(inputDateValue));
      document.querySelector('[data-modal]').classList.add('is-hidden-wrapper');
      document.querySelector('.calendar-input').classList.remove('isActive');
      document
        .querySelector('.calendar__button-arrow')
        .classList.remove('switched');
      document
        .querySelector('.calendar__button-calendar')
        .classList.remove('switchedColor');
    });
  }
};

renderCalendar();

let findUl = document.querySelector('.days');
// inputDateValue = document.querySelector('.calendar-input').value;

prevNextIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); 
      currMonth = date.getMonth(); 
    } else {
      date = new Date(); 
    }
    renderCalendar(); 
    let test = JSON.parse(localStorage.getItem('VALUE'));
    let reachUl = daysTag.childNodes;
    //console.log(reachUl);
    reachUl.forEach(elem => {
      if (elem.textContent === test) {
        // console.log(elem.textContent);
        elem.classList.add('active');
      }
    });
  });
});

localStorage.removeItem('VALUE');
localStorage.removeItem('date');




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