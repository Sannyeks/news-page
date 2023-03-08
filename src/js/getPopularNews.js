// import axios from "axios";
import cardMarkup from "./cardMarkup";
// import getNewsBySearch from "./getNewsBySearch"

// import normalizedNews from "./headerNormalizedNews"; 
// import paginationRender from "./paginationRender";


const apiKey = '3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';
const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`

async function fetchNYTData() {
  const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`);
  const data = await response.json();
  if (data.status === 'OK') {
	  const articles = data.results;
	  return articles;
  } else {
    throw new Error(error.message);
  }
}

async function getMostPopularArticles() {
	const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`);
	const data = await response.json();
	const { results } = data;
	const resultArticles = []

	// console.log(results)

	const articles = results.map(({ title, url, published_date, abstract, section, id }) => {

		const article = {
		headline: title,
      web_url: url, 
      pub_date: published_date,
      lead_paragraph: abstract,
      news_desk: section, 
      // bigMobileImg: url,
      // smallMobileImg: url,
      // smallSquareImg: url,
      // bigSquareImg: url,
      id: id
		}

		resultArticles.push(article);
  } ); 
  	console.log(resultArticles);
	return resultArticles;

}

// getMostPopularArticles()

// getMostPopularArticles().then(res => {
// 	const ulEl = document.querySelector('.popular-articles__list');
// 	console.log(ulEl);
// 	ulEl.insertAdjacentHTML('beforeend', cardMarkup(res));
// })



// export const weatherMarkup = `<div class="weather-container__all">
//       	<div class="weather-container">
// 	        <div class="weather-current__container">
// 	          <div class="weather-top-card">
// 	            <div class="temperature-value animate__animated animate__fadeInUp">
// 	              <p></p>
// 	            </div>
// 	            <div class="description-wrapper">
// 	              <div
// 	                class="temperature-description animate__animated animate__fadeInUp"
// 	              >
// 	                <p>weather description</p>
// 	              </div>
// 	              <div class="location animate__animated animate__fadeInUp">
// 						<p>Location</p>
// 	              </div>
// 	            </div>
// 	          </div>
// 	          <div class="weather-icon">
// 					<img src="./images/icons/unknown.png" alt="" height= "155" width= "165">
// 				 </div>
// 	          <div class="day animate__animated animate__fadeInUp">
// 	            <p></p>
// 	          </div>
// 	          <div class="date animate__animated animate__fadeInUp">
// 	            <p></p>
// 	          </div>
// 	          <div class="week-weather animate__animated animate__fadeInUp">
// 	            <button class="weather-button" type="button">
// 	              weather for week
// 	            </button>
// 	          </div>
// 	        </div>
// 	      </div>
// 	      <div class="weather-week__container">
// 			  <div class="weather-week__list">
// 				<p>Weather for week</p>
// 				<ul class="weather-week__forecast">
// 					<li></li>
// 					<li></li>
// 					<li></li>
// 					<li></li>
// 					<li></li>
// 				</ul>
// 			  </div>
// 			  <div class="date animate__animated animate__fadeInUp"><button class="weather-week-close-button" type="button">back</button></div >
// 	      </div>
//       </div >`;



// console.log(getMostPopularArticles());
// fetchNYTData()

// cardMarkup(getMostPopularArticles())