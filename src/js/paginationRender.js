import isMobile from "./isMobile";
import countQntOfPages from "./counterQntPage";

export default function paginationRender (arrayOfRequests) {

    if(isMobile()){
        if(countQntOfPages() <= 3) {
            const buttons = '';
            const markup = `<ul class="pagination-list">${buttons}</ul>`;
            for (let i = 1; i <= arrayOfRequests.length; i +=1) {
                buttons + `<li><button class="buttons" id="ref-btn" value="${i}">${i}</button></li>`;
            }
            return markup;
        } else {
            return `<ul class="pagination-list"><li><button class="prew-btn buttons" id="header-btn-back-js" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="15 18 9 12 15 6"></polyline></svg>Prew</button></li><li><button class="first-btn buttons" value="1">1</button></li><li><p class="ellipsis">...</p></li><li><button class="buttons " value="2" id="ref-btn-1">2</button><li><p class="ellipsis">...</p></li><li><button class="last-btn buttons" value="${countQntOfPages()}" id="ref-btn">${countQntOfPages()}</button></li><li><button class="next-btn buttons" id="header-btn-next-js">Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="9 18 15 12 9 6"></polyline></svg></button></li></ul>`;
        }
    }
    else {
        if(countQntOfPages() <= 5) {
            const buttons = '';
            const markup = `<ul class="pagination-list">${buttons}</ul>`;
            for (let i = 1; i <= arrayOfRequests.length; i +=1) {
                buttons + `<li><button class="paginator-btn buttons" value="${i}" id="ref-btn">${i}</button></li>`;
            }
            return markup;
        } else {
            return `<ul class="pagination-list"><li><button class="prew-btn buttons" id="header-btn-back-js" disabled ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="15 18 9 12 15 6"></polyline></svg>Prew</button></li><li><button class="first-btn buttons" value="1" >1</button></li><li><p class="ellipsis">...</p></li><li><button class="buttons" value="2" id="ref-btn-1">2</button></li><li><button class="buttons" value="3" id="ref-btn-2">3</button></li><li><button class="buttons" value="4" id="ref-btn-3">4</button></li><li><p class="ellipsis">...</p></li><li><button class="last-btn buttons" value="${countQntOfPages()}" id="ref-btn">${countQntOfPages()}</button></li><li><button class="next-btn buttons" id="header-btn-next-js" >Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="9 18 15 12 9 6"></polyline></svg></button></li></ul>`;
        }
    }
}
