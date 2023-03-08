import cardMarkup from "./cardMarkup";
import {initWeather} from './weather'

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

	console.log(results)
	const image = results[0].media[0]['media-metadata'][2].url;
	console.log(image);
	// let metadata = 'media-metadata';
	// console.log(results[0].media[0]['media-metadata'][2].url);

	const articles = results.map(({ title, url, published_date, abstract, section, id }) => {
		// const image = media[0]['media-metadata'][2].url;
		// console.log(image);
		const article = {
		headline: title,
		web_url: url, 
      pub_date: published_date,
      lead_paragraph: abstract,
      news_desk: section, 
      bigMobileImg: 'https://static01.nyt.com/images/2023/03/07/multimedia/-01WELL-AGING-EXERCISES21-bzjq/-01WELL-AGING-EXERCISES21-bzjq-mediumThreeByTwo440.jpg',
      // smallMobileImg: image,
      // smallSquareImg: image,
      // bigSquareImg: image,
      id: id
		}

		resultArticles.push(article);
  } ); 
	console.log(resultArticles);
	return resultArticles;

}

getMostPopularArticles().then(res => {
	const ulEl = document.querySelector('.popular-articles__list');
	ulEl.replaceChildren(cardMarkup(res));
	initWeather()
})

// getMostPopularArticles().then(res => {
// 	const ulEl = document.querySelector('.popular-articles__list');
// 	console.log(ulEl);
// 	ulEl.insertAdjacentHTML('beforeend', cardMarkup(res));
// })
