import axios from "axios";

  export default async function getNewsBySearch (url,objectOfParams) {
    try {
        const searchedNews = await axios.get(`${url}`,{params: objectOfParams});
                  if (searchedNews.data.status === 'OK') {
                      return searchedNews.data;
                  } else {
                      throw new Error(error.message);
                  }
    } catch(error) {
        console.log(error);
    }
}