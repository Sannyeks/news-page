import SearchInputParams from "./headerSearchParams";
import getNewsBySearch from "./getNewsBySearch";
import cardMarkup from "./cardMarkup";

import { addItem, removeItem } from "./localstorage";

const FAVORITE_KEY = "favorite-key";
const READ_KEY = "read-key";

import normalizedNews from "./headerNormalizedNews"; 
import paginationRender from "./paginationRender";

const ENDPOINT = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
const searchParams = new SearchInputParams({
    q: '',
    key: 'QE0K0hsL0yvSvq56EKI26tVNaYAi7WOy',
    page: 1,
    filters: 'headline, web_url, pub_date, lead_paragraph, news_desk, multimedia, _id',
    });
const formRef = document.getElementById('header-form-js');
const inputRef = document.getElementById('header-input-js');
const btnRef = document.getElementById('header-btn-js');
const list = document.querySelector('.cards__list');
const pagination = document.querySelector('.thumb');
// const gallery = document.querySelector('.gallery');


formRef.addEventListener('submit', onHeaderSearchSubmit);
inputRef.addEventListener('input', onHeaderInput);
pagination.addEventListener('click', onRefBtn);


async function onRefBtn(event){

    console.log(event.target);
    if(event.target.id === 'ref-btn') {
        
        searchParams.reset();
        searchParams.resetOrderOfRequests();
        // searchParams.resetRequests();
        searchParams.setPage(event.target.value);
        await renderCards(ENDPOINT,searchParams)
        .then(res => {
            try{
                const paginationMarkup = paginationRender(res);
                pagination.innerHTML = paginationMarkup;
                const nextBtnRef = document.getElementById('header-btn-next-js');
                const backBtnRef = document.getElementById('header-btn-back-js');
                nextBtnRef.addEventListener('click', onNext);
                backBtnRef.addEventListener('click', onBack);
                } catch(err) {
                    console.log(err);
                }
        }
        
    ).catch(console.log);

        
    }

    

}


function onHeaderSearchSubmit (event) {
    event.preventDefault();
    searchParams.q = event.currentTarget.elements.searchQuery.value.trim();    
    if(searchParams.q) {

			getNewsBySearch(ENDPOINT,searchParams).then((res) => {
                list.replaceChildren(cardMarkup(res));

                list.querySelectorAll('.card__btn').forEach(
                    el => el.addEventListener("click", function(evt){
                        const btn = evt.currentTarget;
                        if (btn && btn.classList.contains("btn-add")) {
                            const item = res.filter(({web_url}) => web_url === btn.dataset.url)
                            if (item && item.length) {
                                addItem(FAVORITE_KEY, item[0]);
                            }
                        } else if (btn && btn.classList.contains("btn-remove")) {
                            const url = btn.dataset.url
                            removeItem(FAVORITE_KEY, ({web_url}) => web_url === url)
                           
                        }
                    }))
                list.querySelectorAll('.card__info--readmore').forEach(
                    el => el.addEventListener("click", function(evt){
                        lnk = evt.currentTarget
                        const item = res.filter(({web_url}) => web_url === lnk.href)
                            if (item && item.length) {
                                removeItem(READ_KEY, ({web_url}) => web_url === item[0].web_url)
                                const now = new Date()
                                item[0].readDate=`${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
                                addItem(READ_KEY, item[0]);
                            }
                    })
                )
            // console.log(res);
            //     const cardWrapper= document.querySelector('.card__item');
            //     cardWrapper.addEventListener('click', onClickCardWrapper);
            //     function onClickCardWrapper(event) {
            //         console.log(event.target);
            //     }
                // localStorage.setItem("favorite-key", JSON.stringify(res))
               
            });
        searchParams.reset();
        renderCards(ENDPOINT,searchParams)
        .then(res => {
                try{
                    const paginationMarkup = paginationRender(res);
                    pagination.innerHTML = paginationMarkup;
                    const nextBtnRef = document.getElementById('header-btn-next-js');
                    const backBtnRef = document.getElementById('header-btn-back-js');
                    nextBtnRef.addEventListener('click', onNext);
                    backBtnRef.addEventListener('click', onBack);
                    } catch(err) {
                        console.log(err);
                    }
        });

        
    } else {
        console.log('Field can\`t be empty.');
    }
        event.currentTarget.reset();
        btnRef.setAttribute('disabled', true);
}
function onHeaderInput(event) {
    if(event.target.value.trim()) {
        btnRef.removeAttribute('disabled');
    } else {
        btnRef.setAttribute('disabled', true);
    }
}
async function renderCards(url,params) {
   
    await getNewsBySearch(url,params)
    .then((res) => {
        SearchInputParams.hits = res.response.meta.hits;
        return normalizedNews(res);
    })
    .then((res) => {
        res.map((request) => params.addRequest(request));
    })
    .catch(console.log);
    try{
        if(getCuttedArticle(params).length === 0) {
            list.innerHTML = '<div class="default-img"></div>';
            pagination.innerHTML = '';
            return;
        } else {
            list.replaceChildren(cardMarkup(getCuttedArticle(params)));
        }
        
    } catch(err) {
        console.error(err);
    }
    return getCuttedArticle(params);
}




function getCuttedArticle (params) {
    params.updateQntOfCards();
    if(SearchInputParams.lastRequest === 0) {
        params.initLastRequest();
    }
    const firstRequest = SearchInputParams.firstRequest;
    const lastRequest = SearchInputParams.lastRequest; 
    console.log(firstRequest);
    console.log(lastRequest);
    console.log(params.getRequests());
    return params.getNeededRequests(firstRequest,lastRequest);
}
async function onBack() {
    searchParams.decreasePageByOne();
 
    if(searchParams.getFirstRequest() === 0) {
        searchParams. resetRequests();
        searchParams.resetOrderOfRequests();
        console.log('назад не мотай');
    await getNewsBySearch(ENDPOINT,searchParams)
    .then(res => normalizedNews(res))
    .then(res => res.map((request) => searchParams.addRequest(request)));
    } else {
        searchParams.decreaseOrderOfRequests();
    }

    list.replaceChildren( cardMarkup(getCuttedArticle(searchParams)));
}
async function onNext() {
    searchParams.increasePageByOne();
    searchParams.increaseOrderOfRequests();
    await getNewsBySearch(ENDPOINT,searchParams)
    .then(res => normalizedNews(res))
    .then(res => res.map((request) => searchParams.addRequest(request)));
    list.replaceChildren(cardMarkup(getCuttedArticle(searchParams)));
}



     
// const img = !bigMobileImg
// ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eXq6h_EHL7Iu-tVrAWQPJ4ozAiL3y5NY2m5jmcw&s'
// : `https://www.nytimes.com/${bigMobileImg}`;


