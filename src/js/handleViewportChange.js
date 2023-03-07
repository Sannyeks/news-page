import SearchInputParams from "./headerSearchParams";

const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');
const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

export default function handleViewportChange(){

  if (mediaQueryDesktop.matches) {
      SearchInputParams.qntOfCards = 9;
    return;
  } 
  if (mediaQueryTablet.matches) {
      SearchInputParams.qntOfCards = 6;
    return;
  } 
  if (mediaQueryMobile.matches) {
      SearchInputParams.qntOfCards = 3;
    return;
  } 
}