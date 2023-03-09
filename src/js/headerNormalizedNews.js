
export default function normalizedNews (resp) {
    const arrayOfNews = [];
    const urlOfDefaultImg = 'https://as1.ftcdn.net/v2/jpg/00/77/50/78/500_F_77507884_B00iVspJkgxbh6o1JuKza9qYpioCZ9ja.jpg';

    resp.response.docs.map(({headline, web_url, pub_date, lead_paragraph, news_desk, multimedia, _id}) => {

      const img = multimedia.length > 0 
         ? `https://www.nytimes.com/${(multimedia.find(image => image.subtype === 'square640')?.url) ? multimedia.find(image => image.subtype === 'square640')?.url:multimedia[0]?.url}`
         : urlOfDefaultImg;
  
          
        const article = {
          headline: headline.main,
          web_url, 
          pub_date,
          lead_paragraph,
          news_desk,
          bigSquareImg: img,
          id: _id,
      };
      arrayOfNews.push(article);
    }); 
  return arrayOfNews;
  }

  


