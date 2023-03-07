import axios from "axios";

const apiKey = "73bd6bca6bd522830119f0c6decba840";
const KELVIN = 273;
console.log(1111);
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const iconElement = document.querySelector(".weather-icon");
const dayElement = document.querySelector(".day p");
const dateElement = document.querySelector(".date p");
const button = document.querySelector(".weather-button");
const weatherWeek = document.querySelector(".weather-week__container");
const weatherCurrent = document.querySelector(".weather-current__container");
const closeBtn = document.querySelector(".weather-week-close-button")
const weatherWeekDayForecast = document.querySelector(".weather-week__forecast")

button.addEventListener('click', onClick)
closeBtn.addEventListener('click', onClose)

const date = new Date()
let currentdate = date.toLocaleDateString('en-gb', { day: "numeric", month: "short", year: "numeric" })
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let day = weekday[date.getDay()];

const weather = {
	temperature: {
		value: "",
		unit: "celsius"
	},
	description: "",
	iconId: "",
	city: "",
	country: "",
	day: `${date}`,
	data: `${day}`
};

dayElement.insertAdjacentHTML('beforeend', `${day}`); 
dateElement.insertAdjacentHTML('beforeend', `${currentdate}`); 

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    console.log(error);
}

function setPosition(position) {
	if (position && position.coords) {
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;

		getWeather(latitude, longitude);
		forecast(latitude, longitude);
	} else {
		console.log("Position data not available.");
	}

}

function showError(error) {
	console.log(`nothing`);
   //  notificationElement.style.display = "block";
   //  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
   let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
			  return data;
        })
		 .then(function (data) {
			// console.log(data);
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.city = data.name;
			weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather() {
   iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@4x.png" height= "155"
	width= "165"/>`;
   tempElement.insertAdjacentHTML('beforeend', `${weather.temperature.value}°`);
   descElement.innerHTML = `${weather.description}`;
	locationElement.innerHTML = `${weather.city}`;
}



function forecast(latitude, longitude) {
	const newKey = 'ba7fddf449339701f9df702aeb87be1d'
	const API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${newKey}`;
    
	fetch(API_URL)
  .then(response => response.json())
  .then(data => {
	  const dataArray = data.list;
	  const groupedData = {};
	  for (let i = 0; i < dataArray.length; i++) {
      const date = dataArray[i].dt_txt.slice(0, 10);
      if (!groupedData[date]) {
			groupedData[date] = {
			date: date,
          minTemp: dataArray[i].main.temp,
          maxTemp: dataArray[i].main.temp,
          weather: dataArray[i].weather[0].description
        };
      } else {
        if (dataArray[i].main.temp < groupedData[date].minTemp) {
          groupedData[date].minTemp = dataArray[i].main.temp;
        }
        if (dataArray[i].main.temp > groupedData[date].maxTemp) {
          groupedData[date].maxTemp = dataArray[i].main.temp;
        }
      }
    }
	  console.log(groupedData);

	  const groupedDataPerDay = {
  "2022-03-05": {
    date: "2022-03-05",
    minTemp: 5,
    maxTemp: 10,
    weather: "Cloudy"
	 
  },
  "2022-03-06": {
    date: "2022-03-06",
    minTemp: 8,
    maxTemp: 12,
    weather: "Rainy"
  }
};
weatherWeekDayForecast.innerHTML = '';
// перебираємо ключі в об'єкті
	  Object.keys(groupedData).forEach(date => {
		  const data = groupedData[date];
		  const dateValue = data.date;
		  
			const datePotoch = new Date(dateValue);
			const formattedDate = datePotoch.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  			const minTempValue = Math.floor(data.minTemp - KELVIN);
  			const maxTempValue = Math.floor(data.maxTemp - KELVIN);
		  	const weatherValue = data.weather;
  
		  
		//   console.log(`Дата: ${formattedDate}, Мінімальна температура: ${minTempValue}, Максимальна температура: ${maxTempValue}, Опис погоди: ${weatherValue}`);
		  
		  const listItem = document.createElement('li');
		  listItem.classList.add('weather-week__item')
        listItem.innerHTML = `<span class="weather-week__value">${formattedDate}</span>:<br> Min. temp: <span class="weather-week__value">${minTempValue}</span>, Max. temp: <span class="weather-week__value">${maxTempValue}</span><br> Descr.: <span class="weather-week__value">${weatherValue}</span>`;
        weatherWeekDayForecast.appendChild(listItem);

});

	  
	  
	  
  })  
  .catch(error => console.log(error));
	}

	weatherWeek.classList.add('is-hidden');

function onClick(e) {
	e.preventDefault();
	weatherCurrent.classList.add('is-hidden');
	if (weatherWeek.classList.contains('is-hidden')) {
		weatherWeek.classList.remove('is-hidden')
	}
}

function onClose(e) {
	e.preventDefault();
	weatherWeek.classList.add('is-hidden');
	if (weatherCurrent.classList.contains('is-hidden')) {
		weatherCurrent.classList.remove('is-hidden')
	}
}