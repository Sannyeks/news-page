import SearchInputParams from "./headerSearchParams";
import getNewsBySearch from "./getNewsBySearch";
import countQntOfPages from "./counterQntPage";
import normalizedNews from "./headerNormalizedNews";

import RefBtnClass from "./refBtnClass";
import paginationRender from "./paginationRender";
import {decreaseChangedBtn, increaseChangedBtn} from "./paginatorChangedBtn";
import cardMarkup from "./cardMarkup";
import {headerRefs} from "./headerRefs";
import {initWeather} from './weather';
import { addItem, removeItem } from "./localstorage";
import smoothScroll from "./smoothScroll";

const FAVORITE_KEY = "favorite-key";
const READ_KEY = "read-key";

const ENDPOINT = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
const searchParams = new SearchInputParams({
    q: '',
    key: 'QE0K0hsL0yvSvq56EKI26tVNaYAi7WOy',
    page: 1,
    filters: 'headline, web_url, pub_date, lead_paragraph, news_desk, multimedia, _id',
    });

headerRefs.formRef.addEventListener('submit', onHeaderSearchSubmit);
headerRefs.inputRef.addEventListener('input', onHeaderInput);
headerRefs.arrowToTop.addEventListener('click', onArrowToTop);


function onArrowToTop(event) {
    smoothScroll();
}


async function onRefBtn(event){
    if (event.target.nodeName === "BUTTON") {
        const activeClass = 'isActivePage';
        const refsChangedBtn = document.querySelectorAll("button[data-changedBtn]");
        const refsBtns = document.querySelectorAll('#ref-btn');

        const firstCnangedBtn = new RefBtnClass(refsChangedBtn[0]);
        const lastCnangedBtn = new RefBtnClass(refsChangedBtn[refsChangedBtn.length - 1]);
        const firstBtn = new RefBtnClass(document.querySelector('.first-btn'));
        const lastBtn = new RefBtnClass(document.querySelector('.last-btn'));
        const backBtn = new RefBtnClass(document.getElementById('header-btn-back-js')); 
        const nextBtn = new RefBtnClass(document.getElementById('header-btn-next-js'));
        smoothScroll();
        if(event.target.id === 'ref-btn') {
            searchParams.reset();
            searchParams.resetOrderOfRequests();
            searchParams.setPage(event.target.value);
            await renderCards(ENDPOINT,searchParams).then((res) => {
                headerRefs.list.replaceChildren(cardMarkup(res));
                initWeather();
            });

            for (let i = 0; i < refsBtns.length; i += 1) {
                if (refsBtns[i].classList.contains(activeClass)){
                    refsBtns[i].classList.remove(activeClass);
                }
            }
            event.target.classList.add(activeClass);

            if(Number(event.target.value) !== 1) {
                backBtn.enable();
            } 
            if(Number(event.target.value) !== Number(countQntOfPages())) {
                nextBtn.enable();
            } 
            if(Number(event.target.value) === Number(countQntOfPages())) {
                nextBtn.disable();
            }
            if(Number(event.target.value) === 1) {
                backBtn.disable();
            }
        }  
        if(event.target.id === 'header-btn-next-js') {
            backBtn.enable();
            await onNext();

            // Якщо активна перша кнопка
        if(firstBtn.isActive()) {
            firstBtn.noActive();
            firstCnangedBtn.active();
            return;
        }
            // Якщо активні кнопкa 2 і є статті
        if (firstCnangedBtn.isActive() && Number(lastCnangedBtn.getValue()) !== Number(countQntOfPages() - 1)) {
            increaseChangedBtn(refsChangedBtn);
            return;
        } 
            // Якщо активні кнопкa 2-3 
        for (let i = 0; i < refsChangedBtn.length - 1; i += 1) {
            if (refsChangedBtn[i].classList.contains(activeClass)) {
                    refsChangedBtn[i].classList.remove(activeClass);
                    refsChangedBtn[(i + 1)].classList.add(activeClass);
                    return;
                }
            continue;
        }
        // Якщо активні кнопкa 4 і немає статтей
        if (lastCnangedBtn.isActive() && Number(lastCnangedBtn.getValue()) === Number(countQntOfPages() - 1)) {
                lastCnangedBtn.noActive();
                lastBtn.active();
                nextBtn.disable();
                return;
        }   
        
                //  Якщо активні кнопкa 4 і є статті
        if (lastCnangedBtn.isActive() && Number(lastCnangedBtn.getValue()) !== Number(countQntOfPages() - 1)){
            increaseChangedBtn(refsChangedBtn);
            return;
        }
            return;
        } 
        if(event.target.id === 'header-btn-back-js') {
            // Якщо активна перша кнопка
            if(!firstBtn.isActive()) {
                await onBack();
            }
            // Якщо остання кнопка активна
            if (lastBtn.isActive()) {
                nextBtn.enable();
                lastBtn.noActive();
                lastCnangedBtn.active();
                return;
            }

            // Якщо 3-4 кнопки активні
            for (let i = refsChangedBtn.length - 1; i > 0; i -= 1) {
                if (refsChangedBtn[i].classList.contains(activeClass)) {
                        refsChangedBtn[i].classList.remove(activeClass);
                        refsChangedBtn[(i - 1)].classList.add(activeClass);
                        return;
                    }
            continue;
            }
            // Якщо 2 кнопкa активнa i cтатті вгорі є
            if (firstCnangedBtn.isActive() && Number(firstCnangedBtn.getValue()) !== 2) {
                decreaseChangedBtn(refsChangedBtn);
                return;
            } else {
                firstCnangedBtn.noActive();
                firstBtn.active();
                backBtn.disable();
            }
        }
    }
}

function onHeaderSearchSubmit (event) {
    event.preventDefault();
    headerRefs.backArrow.classList.add('is-hidden-btn');
    headerRefs.nextArrow.classList.add('is-hidden-btn');
    searchParams.q = event.currentTarget.elements.searchQuery.value.trim();    
    if(searchParams.q) {

			getNewsBySearch(ENDPOINT,searchParams).then((res) => {
                
                headerRefs.list.replaceChildren(cardMarkup(normalizedNews(res)));
                initWeather();

                headerRefs.list.querySelectorAll('.card__btn').forEach(
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
                    }));
                    headerRefs.list.querySelectorAll('.card__info--readmore').forEach(
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
                );
            // console.log(res);
            //     const cardWrapper= document.querySelector('.card__item');
            //     cardWrapper.addEventListener('click', onClickCardWrapper);
            //     function onClickCardWrapper(event) {
            //         console.log(event.target);
            //     }
                // localStorage.setItem("favorite-key", JSON.stringify(res))
                return res;
            })
            .then((res) => {
                searchParams.reset();
                SearchInputParams.hits = res.response.meta.hits;
                return normalizedNews(res);
            })
            .then((res) => {
                res.map((request) => searchParams.addRequest(request));
                return res;
            })
            .then(() => {
                try{
                    if(getCuttedArticle(searchParams).length === 0) {
                        document.querySelector('.thumb').innerHTML = '';
                        headerRefs.list.innerHTML = '<div class="default-img"></div>';
                            return;
                    } else {
                        headerRefs.list.replaceChildren(cardMarkup(getCuttedArticle(searchParams)));
                        initWeather();
                    }
                } catch(err) {
                    console.error(err);
                }
                return getCuttedArticle(searchParams);
            }) 
            .then(res => {
                try{
                    const pagination = document.querySelector('.thumb');
                    pagination.addEventListener('click', onRefBtn);
                    const paginationMarkup = paginationRender(res);
                    pagination.innerHTML = paginationMarkup;

                    } catch(err) {
                        console.log(err);
                    }
            })
            .catch(console.log);
        
    } else {
        console.log('Field can\`t be empty.');
    }
        event.currentTarget.reset();
        headerRefs.btnRef.setAttribute('disabled', true);
}
function onHeaderInput(event) {
    if(event.target.value.trim()) {
        headerRefs.btnRef.removeAttribute('disabled');
    } else {
        headerRefs.btnRef.setAttribute('disabled', true);
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
            document.querySelector('.thumb').innerHTML = '';
            headerRefs.list.innerHTML = '<div class="default-img"></div>';
                return;
        } else {
            headerRefs.list.replaceChildren(cardMarkup(getCuttedArticle(params)));
            initWeather();
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
    return params.getNeededRequests(firstRequest,lastRequest);
}
async function onBack() {
    searchParams.decreasePageByOne();

    if(searchParams.getFirstRequest() === 0) {
        searchParams. resetRequests();
        searchParams.resetOrderOfRequests();
    await getNewsBySearch(ENDPOINT,searchParams)
    .then(res => normalizedNews(res))
    .then(res => res.map((request) => searchParams.addRequest(request)));
    } else {
        searchParams.decreaseOrderOfRequests();
    }
    headerRefs.list.replaceChildren( cardMarkup(getCuttedArticle(searchParams)));
    initWeather();
}
async function onNext() {
    searchParams.increasePageByOne();
    searchParams.increaseOrderOfRequests();
    await getNewsBySearch(ENDPOINT,searchParams)
    .then(res => normalizedNews(res))
    .then(res => res.map((request) => searchParams.addRequest(request)));
    headerRefs.list.replaceChildren(cardMarkup(getCuttedArticle(searchParams)));
    initWeather();
}




