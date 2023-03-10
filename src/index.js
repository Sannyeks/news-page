const switcher = document.getElementById('switch-style');
const mobileSwitcher = document.getElementById('switch-style2');
const mobContainer = document.querySelector('.modal-menu__conteiner');

// Функція для збереження обраної теми в local storage
function saveThemeToLocalStorage() {
  const selectedTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'default-theme';
  localStorage.setItem('selectedTheme', selectedTheme);
}

// Функція для завантаження теми з local storage
function loadThemeFromLocalStorage() {
  const selectedTheme = localStorage.getItem('selectedTheme');
  if (selectedTheme === 'dark-theme') {
    document.body.classList.add('dark-theme');
    switcher.checked = true;
  } else {
    switcher.checked = false;
  }

  if (selectedTheme === 'dark-theme') {
    mobContainer.classList.add('dark-theme');
    mobileSwitcher.checked = true;
  } else {
    mobileSwitcher.checked = false;
  }
}

// Завантаження теми з local storage при першому запуску сторінки
window.addEventListener('load', loadThemeFromLocalStorage);

// Збереження теми в local storage при зміні теми
switcher.addEventListener('change', function() {
	document.body.classList.toggle('dark-theme');
	mobContainer.classList.toggle('dark-theme');
  saveThemeToLocalStorage();
});

mobileSwitcher.addEventListener('change', function() {
	mobContainer.classList.toggle('dark-theme');
	 document.body.classList.toggle('dark-theme');
  saveThemeToLocalStorage();
});
