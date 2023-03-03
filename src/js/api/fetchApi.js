import axios from "axios";
const KEY = 'api-key=3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';
const BASE_URL = 'https://api.nytimes.com/svc';
const MOST_POPULAR_NEWS = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${KEY}`;

// Пошук популярних новин
async function getPopularArticle() {
    const articleFetch = await fetch(MOST_POPULAR_NEWS);
    const articles = await articleFetch.json();
    let { results } = articles;
    // console.log(results);
    return results;
}

// Пошук категорій
async function getCategoryList() {
    const categoryList = await fetch(
        `${BASE_URL}/news/v3/content/section-list.json?${KEY}`
    );
    const categories = await categoryList.json();
    let { results } = categories;

    // console.log(results);

    return results;
}


// Пошук за запитом по Search
let sumPage;
async function getSearchArticle(value, page) {
    let dateForUrl = '';
    try {
        let date = JSON.parse(localStorage.getItem('date'))
            .replace('/', '')
            .replace('/', '');
        // console.log(date);
        dateForUrl = `&begin_date=${date}&end_date=${date}`;
    } catch (error) {
        // dateForUrl = '';
    }
    const articleFetch = await fetch(
        `${BASE_URL}/search/v2/articlesearch.json?q=${value}&${KEY}&page=${page}${dateForUrl}`
    );
    const articles = await articleFetch.json();

    let { response, errors } = articles;

    if (errors) {
        alert(JSON.parse(errors));
        return;
    }

    if (response.meta.hits > 1000) {
        sumPage = 1000;
    } else {
        sumPage = response.meta.hits;
    }
    // console.log(response.meta.hits);
    let { docs } = response;
    // console.log(docs);

    return docs;
}

async function getArticleByCategory(value) {
    try {
        let newValue = encodeURIComponent(value);

        const articleFetch = await fetch(
            `${BASE_URL}/news/v3/content/all/${newValue}.json?${KEY}&limit=30`
        );

        const articles = await articleFetch.json();

        let { results } = articles;

        console.log(results);
        return results;
    } catch (error) {
        console.log('Ooops we have a problem');
    }
}



export {
    getCategoryList,
    getPopularArticle,
    getArticleByCategory,
    getSearchArticle,
    sumPage,
};

// !!!Виклики функцій працюють
// getPopularArticle();
// getCategoryList();
// для getArticleByCategory вввести значення з масиву getCategoryList() "name";
// getArticleByCategory("books");
// getSearchArticle("chatgpt", 1);
