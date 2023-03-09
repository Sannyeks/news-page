import cardMarkup from "./cardMarkup";
import {initWeather} from './weather';
import getNewsBySearch from "./getNewsBySearch";
import {headerRefs} from "./headerRefs";
import smoothScroll from "./smoothScroll";


const apiKey = '3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';
const URL = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`

function upadatePerPage() {
	const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');
	const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
	const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
	
	if (mediaQueryDesktop.matches) {
		popularArticles.perPage = 9;
	  return;
	} 
	if (mediaQueryTablet.matches) {
		popularArticles.perPage = 6;
	  return;
	} 
	if (mediaQueryMobile.matches) {
		popularArticles.perPage  = 3;
	  return;
	} 

}



const popularArticles = {
	body:[],
	firstNews: 0,
	lastNews: 0,
	perPage: 0,
	page: 1,
	
	getPages() {
		return Math.ceil(this.body.length / this.perPage);
	},
	initOrderNews() {
		this.lastNews = this.perPage;
		this.firstNews = 0;
	},
	cutToLimitOrder() {
		this.page = this.getPages();
		this.lastNews = this.body.length;
		this.firstNews = this.body.length - this.perPage;
	},
	resetLimitOrder() {
		this.page = 1;
		this.lastNews = this.perPage;
		this.firstNews = 0;

	},
	increasePage() {
		this.page += 1;
	},
	decreasePage() {
		this.page -= 1;
	},
	increaseStep(){
		this.firstNews += this.perPage;
		this.lastNews += this.perPage;
	},
	decreaseStep(){
		this.firstNews -= this.perPage;
		this.lastNews -= this.perPage;
	},
	addToBody(value) {
		this.body = [...value];
	},
	sliceBody() {
		return this.body.slice(this.firstNews,this.lastNews);
	}
};
upadatePerPage();
popularArticles.initOrderNews();

getNewsBySearch(URL)
	.then((response) => {
		const allPopularArticles = response.results;
		popularArticles.addToBody(allPopularArticles);
	}).then(() => {
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		initWeather();
	});
	headerRefs.nextArrow.addEventListener('click',onNextArrow);
	headerRefs.backArrow.addEventListener('click',onBackArrow);

// getMostPopularArticles().then(res => {
// 	const ulEl = document.querySelector('.popular-articles__list');
// 	console.log(ulEl);
// 	ulEl.insertAdjacentHTML('beforeend', cardMarkup(res));
// })
function onNextArrow() {

	if(popularArticles.firstNews === 0) {
		popularArticles.resetLimitOrder();
	}
	if(popularArticles.page <= popularArticles.getPages()) {
		
		popularArticles.increasePage();
		headerRefs.backArrow.removeAttribute('disabled');
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		initWeather();
		popularArticles.increaseStep();
		
		} 
	if(popularArticles.page > popularArticles.getPages()) {
		popularArticles.cutToLimitOrder();
		headerRefs.nextArrow.setAttribute('disabled',true);
	}
	smoothScroll();
}

function onBackArrow() {
	
	if(popularArticles.page > 0) {
		popularArticles.decreasePage();

		headerRefs.nextArrow.removeAttribute('disabled');
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		popularArticles.decreaseStep();
		initWeather();
		} 
	if(popularArticles.page === 0) {
		headerRefs.backArrow.setAttribute('disabled',true);
	}
	if(popularArticles.firstNews < 0) {
		popularArticles.firstNews = 0;
	}

	smoothScroll();
}

function normalizedPopularNews(articles) {
const outputArticles = [];
articles.map(({ title, url, published_date, abstract, section, id, media }) => { 

	
	const img = media.length > 0 
	? media[0]['media-metadata'][2].url
	: 'https://as1.ftcdn.net/v2/jpg/00/77/50/78/500_F_77507884_B00iVspJkgxbh6o1JuKza9qYpioCZ9ja.jpg';

	const article = {
	headline: title,
	web_url: url, 
	  pub_date: published_date,
	  lead_paragraph: abstract,
	  news_desk: section, 
	  bigSquareImg: img,
	  id: id
	};
	outputArticles.push(article);
} ); 
return outputArticles;
}
