import SearchInputParams from "./headerSearchParams";
import getNewsBySearch from "./getNewsBySearch";
import cardMarkup from "./cardMarkup";

import { addItem, removeItem } from "./localstorage";

const FAVORITE_KEY = "favorite-key";
const READ_KEY = "read-key";

import normalizedNews from "./headerNormalizedNews"; 
import paginationRender from "./paginationRender";
import countQntOfPages from "./counterQntPage";

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

// const gallery = document.querySelector('.gallery');


formRef.addEventListener('submit', onHeaderSearchSubmit);
inputRef.addEventListener('input', onHeaderInput);



async function onRefBtn(event){
    if (event.target.nodeName === "BUTTON") {
    const activeClass = 'isActivePage';
    const refsChangedBtn = document.querySelectorAll("button[data-changedBtn]");
    const refsBtns = document.querySelectorAll('#ref-btn');

    const firstCnangedBtn = {
        isActive(){ return refsChangedBtn[0].classList.contains(activeClass);},
        noActive() { return refsChangedBtn[0].classList.remove(activeClass);},
        active() { return refsChangedBtn[0].classList.add(activeClass);},
        getValue() { return refsChangedBtn[0].value;},
    };
    const lastCnangedBtn = {
        isActive(){ return refsChangedBtn[refsChangedBtn.length - 1].classList.contains(activeClass);},
        noActive() { return refsChangedBtn[refsChangedBtn.length - 1].classList.remove(activeClass);},
        active() { return refsChangedBtn[refsChangedBtn.length - 1].classList.add(activeClass);},
        getValue() { return refsChangedBtn[refsChangedBtn.length - 1].value;},
    };
    const firstBtn = {
        isActive(){ return document.querySelector('.first-btn').classList.contains(activeClass);},
        noActive(){ return document.querySelector('.first-btn').classList.remove(activeClass);},
        active(){ return document.querySelector('.first-btn').classList.add(activeClass);},
    };
    const lastBtn = {
        isActive(){ return document.querySelector('.last-btn').classList.contains(activeClass);},
        noActive(){ return document.querySelector('.last-btn').classList.remove(activeClass);},
        active(){ return document.querySelector('.last-btn').classList.add(activeClass);},
    };
    const backBtn = {
        disable() { document.getElementById('header-btn-back-js').setAttribute('disabled',true);},
        enable() { document.getElementById('header-btn-back-js').removeAttribute('disabled');}
    };
    const nextBtn = {
        disable() { document.getElementById('header-btn-next-js').setAttribute('disabled',true);},
        enable() { document.getElementById('header-btn-next-js').removeAttribute('disabled');}
    };

    if(event.target.id === 'ref-btn') {
        searchParams.reset();
        searchParams.resetOrderOfRequests();
        searchParams.setPage(event.target.value);
        await renderCards(ENDPOINT,searchParams).then((res) => {
            list.innerHTML = cardMarkup(res);
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

        // if(Number(refsChangedBtn[0].value) !== 2 && Number(refsChangedBtn[0].value) !== Number(countQntOfPages()) - 3){
        //     decreaseChangedBtn(refsChangedBtn);
        // } else {
        //     refsChangedBtn[0].classList.remove('isActivePage');
        //     // document.querySelector('.first-btn').classList.add('isActivePage');
        // }
        // if(document.querySelector('.last-btn').classList.contains('isActivePage')) {
        //     document.querySelector('.last-btn').classList.remove('isActivePage');
        //     refsChangedBtn[refsChangedBtn.length - 1].classList.add('isActivePage');
        //     document.getElementById('header-btn-next-js').removeAttribute('disabled');

        // }
        // if(document.querySelector('.first-btn').classList.contains('isActivePage')) {
        //     event.target.setAttribute('disabled',true);
        // }
        //     await onBack();
            
        //     if (Number(refsChangedBtn[refsChangedBtn.length - 1].value) === Number(countQntOfPages()) - 1) {
        //         event.target.removeAttribute('disabled');
        //     } else {
        //         document.getElementById('header-btn-next-js').removeAttribute('disabled');
        //     }
        //     return;
        // }
        // if(refsChangedBtn[0].classList.contains('isActivePage')) {
        //     refsChangedBtn[0].classList.remove('isActivePage');
        //     document.querySelector('.first-btn').classList.add('isActivePage');
        // }

        }
    }

}

    function increaseChangedBtn(arrayOfButtons) {
        for ( let i = 0; i < arrayOfButtons.length; i +=1){
            arrayOfButtons[i].value = Number(arrayOfButtons[i].value) + 1;
            arrayOfButtons[i].textContent = arrayOfButtons[i].value;
        }
    }
    
    function decreaseChangedBtn(arrayOfButtons) {
        for ( let i = 0; i < arrayOfButtons.length; i +=1){
            arrayOfButtons[i].value = Number(arrayOfButtons[i].value) - 1;
            arrayOfButtons[i].textContent = arrayOfButtons[i].value;
        }
    }
    // const nextBtnRef = document.getElementById('header-btn-next-js');
    // const backBtnRef = document.getElementById('header-btn-back-js');
    // nextBtnRef.addEventListener('click', onNext);
    // backBtnRef.addEventListener('click', onBack);

    // if(event.target.id === 'header-btn-next-js' 
    // || event.target.id === 'header-btn-back-js') {
    //     console.log('arrow');
    //     searchParams.reset();
    //     searchParams.resetOrderOfRequests();
    //     // searchParams.setPage(event.target.value);
    //     await renderCards(ENDPOINT,searchParams);
        // .then(res => {
        //     try{
        //         const paginationMarkup = paginationRender(res);
        //         pagination.innerHTML = paginationMarkup;
        //         const nextBtnRef = document.getElementById('header-btn-next-js');
        //         const backBtnRef = document.getElementById('header-btn-back-js');
        //         nextBtnRef.addEventListener('click', onNext);
        //         backBtnRef.addEventListener('click', onBack);
        //         } catch(err) {
        //             console.log(err);
        //         }
        // }
        // ).catch(console.log);
    // } else if (event.target.id === 'ref-btn') {
    //     searchParams.reset();
    //     searchParams.resetOrderOfRequests();
    //     searchParams.setPage(event.target.value);
    //     await renderCards(ENDPOINT,searchParams);
        // .then(res => {
        //     try{
        //         const paginationMarkup = paginationRender(res);
        //         pagination.innerHTML = paginationMarkup;
        //         const nextBtnRef = document.getElementById('header-btn-next-js');
        //         const backBtnRef = document.getElementById('header-btn-back-js');
        //         nextBtnRef.addEventListener('click', onNext);
        //         backBtnRef.addEventListener('click', onBack);
        //         } catch(err) {
        //             console.log(err);
        //         }
        // }
        // ).catch(console.log);

    // }






function onHeaderSearchSubmit (event) {
    event.preventDefault();
    searchParams.q = event.currentTarget.elements.searchQuery.value.trim();    
    if(searchParams.q) {

			getNewsBySearch(ENDPOINT,searchParams).then((res) => {
                list.replaceChildren(cardMarkup(normalizedNews(res)));

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
                    const pagination = document.querySelector('.thumb');
                    pagination.addEventListener('click', onRefBtn);
                    const paginationMarkup = paginationRender(res);
                    pagination.innerHTML = paginationMarkup;

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
            document.querySelector('.thumb').innerHTML = '';

            list.innerHTML = '<div class="default-img"></div>';
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



