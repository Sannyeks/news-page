import axios from "axios";
const KEY = 'api-key=3HHtrx1v9QZUfdmskYGXIqIWRgxdBdcv';

const BASE_URL = 'https://api.nytimes.com/svc';
const MOST_POPULAR_NEWS = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${KEY}`;

export default async function getPopularArticle() {
    const articleFetch = await fetch(MOST_POPULAR_NEWS);
    const articles = await articleFetch.json();
    let { results } = articles;
    // console.log(results);
    return results;
}

// export {
    // працює
//     getPopularArticle,
    // не працює допилюю
    // getCategoryList,
    // getSearchArticle,
    // getArticleByCategory,
//     sumPage,
// };
// getPopularArticle();