import axios from "axios";
import normalizedNews from "./headerNormalizedNews"; 

  export default async function getNewsBySearch (url,objectOfParams) {
    try {
        const searchedNews = await axios.get(`${url}`,{params: objectOfParams});
                  if (searchedNews.data.status === 'OK') {
                      console.log(normalizedNews(searchedNews.data));
                      return normalizedNews(searchedNews.data);
                  } else {
                      throw new Error(error.message);
                  }
    } catch(error) {
        console.log(error);
    }
}