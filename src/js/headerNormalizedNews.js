const debounce = require('lodash.debounce');
let quanityOfResults = 10;
const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');
const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

function handleDesktopChange(){
  if (mediaQueryDesktop.matches) {
    quanityOfResults = 9;
    return;
  } 
  if (mediaQueryTablet.matches) {
    quanityOfResults = 8;
    return;
  } 
  if (mediaQueryMobile.matches) {
    quanityOfResults = 5;
    return;
  } 
}
window.addEventListener('resize', debounce(handleDesktopChange,300));
handleDesktopChange();


export default function normalizedNews (resp) {
    const arrayOfNews = [];
    resp.response.docs.map(({headline, web_url, pub_date, lead_paragraph, news_desk, multimedia}) => {
  
      const urlOfDefaultImg = multimedia[0].url;
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
      };
      arrayOfNews.push(article);
    }); 
    arrayOfNews.length = quanityOfResults;
  return arrayOfNews;
  }

  


