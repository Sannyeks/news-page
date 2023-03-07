
export default function normalizedNews (resp) {
    const arrayOfNews = [];
    resp.response.docs.map(({headline, web_url, pub_date, lead_paragraph, news_desk, multimedia, _id}) => {
  
      const urlOfDefaultImg = multimedia[0]?.url;
      const urlOfSmallSquareImg = multimedia.find(image => image.subtype === 'square320')?.url;
      const urlOfBigSquareImg = multimedia.find(image => image.subtype === 'square640')?.url;
      const urlOfSmallMobileImg = multimedia.find(image => image.subtype === 'watch268')?.url;
      const urlOfBigMobileImg = multimedia.find(image => image.subtype === 'verticalTwoByThree735')?.url;
      
        const article = {
        headline: headline.main,
        smallSquareImg: (urlOfSmallSquareImg || urlOfDefaultImg),
        bigSquareImg: (urlOfBigSquareImg || urlOfDefaultImg),
        smallMobileImg: (urlOfSmallMobileImg || urlOfSmallSquareImg || urlOfDefaultImg),
        bigMobileImg: (urlOfBigMobileImg || urlOfBigSquareImg || urlOfDefaultImg),
        web_url, 
        pub_date,
        lead_paragraph,
        news_desk, 
        id: _id,
      };
      arrayOfNews.push(article);
    }); 
    // arrayOfNews.length = quanityOfResults;
  return arrayOfNews;
  }

  


