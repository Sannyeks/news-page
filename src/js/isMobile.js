const debounce = require('lodash.debounce');

export default function isMobile(){
    const mediaMobile = window.matchMedia('(max-width: 767px)');
    if (mediaMobile.matches) {
        return true;
    } 
}
window.addEventListener('resize', debounce(isMobile,300));