import cardMarkup from "./cardMarkup";
import {initWeather} from './weather';
import getNewsBySearch from "./getNewsBySearch";
import {headerRefs} from "./headerRefs";
import smoothScroll from "./smoothScroll";


const apiKey = '3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';
const URL = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${apiKey}`;
const smallPagBtns = document.getElementById('small-paginator-btns');

function upadatePerPage() {
	const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');
	const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
	const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
	
	if (mediaQueryDesktop.matches) {
		popularArticles.perPage = 8;
	  return;
	} 
	if (mediaQueryTablet.matches) {
		popularArticles.perPage = 7;
	  return;
	} 
	if (mediaQueryMobile.matches) {
		popularArticles.perPage  = 4;
	  return;
	} 

}



const popularArticles = {
	body:[],
	firstNews: 0,
	lastNews: 0,
	perPage: 0,
	page: 1,
	indexOfActivePage: 0,
	
	
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
		this.indexOfActivePage += 1;
	},
	decreasePage() {
		this.page -= 1;
		this.indexOfActivePage -= 1;
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
	},
	getIndexOfActivePage() {
		return this.indexOfActivePage;
	},
	
};
upadatePerPage();
popularArticles.initOrderNews();


getNewsBySearch(URL)
	.then((response) => {
		const allPopularArticles = response.results;
		popularArticles.addToBody(allPopularArticles);
	}).then(() => {
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		document.querySelectorAll('#small-pag-btn')[popularArticles.getIndexOfActivePage()].classList.add('isActivePage');
			initWeather();
	});
	headerRefs.nextArrow.addEventListener('click',onNextArrow);
	headerRefs.backArrow.addEventListener('click',onBackArrow);
	smallPagBtns.addEventListener('click',onPagBtn);

// getMostPopularArticles().then(res => {
// 	const ulEl = document.querySelector('.popular-articles__list');
// 	console.log(ulEl);
// 	ulEl.insertAdjacentHTML('beforeend', cardMarkup(res));
// })

function onPagBtn(event) {
	if(event.target.id === 'small-pag-btn') {
		popularArticles.page = event.target.value;
		popularArticles.indexOfActivePage = popularArticles.page - 1;
		popularArticles.firstNews = popularArticles.indexOfActivePage * popularArticles.perPage;
		popularArticles.lastNews = 	popularArticles.firstNews + popularArticles.perPage;
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		document.querySelectorAll('#small-pag-btn')[popularArticles.page - 1].classList.add('isActivePage');
		smoothScroll();
		initWeather();
	}
	if(Number(event.target.value) === 1) {
		headerRefs.backArrow.setAttribute('disabled',true);
		headerRefs.nextArrow.removeAttribute('disabled');
		return;
	} else {
			headerRefs.backArrow.removeAttribute('disabled');
	}
	if(Number(event.target.value) === popularArticles.getPages()) {
		headerRefs.nextArrow.setAttribute('disabled',true);
		headerRefs.backArrow.removeAttribute('disabled');
		return;
	} else {
		headerRefs.nextArrow.removeAttribute('disabled');
	}

}
function onNextArrow() {
	if(popularArticles.firstNews === 0) {
		popularArticles.resetLimitOrder();
	}
	if(popularArticles.page <= popularArticles.getPages()) {
		popularArticles.increaseStep();
		popularArticles.increasePage();
		headerRefs.backArrow.removeAttribute('disabled');
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		document.querySelectorAll('#small-pag-btn')[popularArticles.indexOfActivePage].classList.add('isActivePage');
		initWeather();
	
		} else if(popularArticles.page > popularArticles.getPages()) {
		popularArticles.cutToLimitOrder();
		headerRefs.nextArrow.setAttribute('disabled',true);
	}
	if(Number(document.querySelectorAll('#small-pag-btn')[popularArticles.indexOfActivePage].value) === popularArticles.getPages() ) {
		headerRefs.nextArrow.setAttribute('disabled',true);
	}
	smoothScroll();
}

function onBackArrow() {
	if(popularArticles.page > 0) {
		popularArticles.decreasePage();
		popularArticles.decreaseStep();
		headerRefs.nextArrow.removeAttribute('disabled');
		headerRefs.list.replaceChildren(cardMarkup(normalizedPopularNews(popularArticles.sliceBody())));
		document.querySelectorAll('#small-pag-btn')[popularArticles.indexOfActivePage].classList.add('isActivePage');
		initWeather();
		} 
	if(popularArticles.page === 0 || popularArticles.firstNews === 0 ) {
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
createBtnsForSmallPaginator();
return outputArticles;
}





function createMarkupBtnsForSmallPaginator() {
	let markupBtns = '';

	for ( let i = 1; i <= popularArticles.getPages(); i += 1) {
		markupBtns += `<li><button type="button" class="buttons" value="${i}" id="small-pag-btn">${i}</button><li>`;
	}
	return markupBtns;
	
}

function createBtnsForSmallPaginator() {
	smallPagBtns.innerHTML = createMarkupBtnsForSmallPaginator(); 
	
}




