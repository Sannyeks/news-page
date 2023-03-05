import SearchInputParams from "./headerSearchParams";
import getNewsBySearch from "./getNewsBySearch";
import cardMarkup from "./cardMarkup";
import { addItem, removeItem } from "./localstorage";

const FAVORITE_KEY = "favorite-key";
const READ_KEY = "read-key";

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

