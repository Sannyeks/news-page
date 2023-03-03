import SearchInputParams from "./headerSearchParams";
import getNewsBySearch from "./getNewsBySearch";
import cardMarkup from "./cardMarkup";

const ENDPOINT = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
const searchParams = new SearchInputParams({
    q: '',
    key: 'QE0K0hsL0yvSvq56EKI26tVNaYAi7WOy',
    page: '1',
    filters: 'headline, web_url, pub_date, lead_paragraph, news_desk, multimedia',
    });
const formRef = document.getElementById('header-form-js');
const inputRef = document.getElementById('header-input-js');
const btnRef = document.getElementById('header-btn-js');
const list = document.querySelector('.cards__list');

formRef.addEventListener('submit', onHeaderSearchSubmit);
inputRef.addEventListener('input', onHeaderInput);

function onHeaderSearchSubmit (event) {
    event.preventDefault();
    searchParams.q = event.currentTarget.elements.searchQuery.value.trim();
    if(searchParams.q) {
			getNewsBySearch(ENDPOINT,searchParams).then((res) => {
                list.innerHTML = cardMarkup(res);
            });
    } else {
        console.log('Field can\`t be empty.');
    }
        event.currentTarget.reset();
}

function onHeaderInput(event) {
    if(event.target.value.trim()) {
        btnRef.removeAttribute('disabled');
    } else {
        btnRef.setAttribute('disabled', true);
    }
}

