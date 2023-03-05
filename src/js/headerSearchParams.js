const debounce = require('lodash.debounce');
import handleViewportChange from './handleViewportChange';
export default class SearchInputParams {

    static requests = [];
    static qntOfCards = 10;
    static hits = 0;
    static paginationMarkup = '';
    static firstRequest = 0;
    static lastRequest = 0;


    
    constructor({q,key,page,filters,}){
        this.q = q;
        this['api-key'] = key;
        this.page = page;
        this.fl = filters;
    }
    reset(){
        this.page = 1;
        this.resetRequests();
    }
    resetRequests() {
        SearchInputParams.requests = [];
    }
    increasePageByOne() {
        this.page = Number(this.page) + 1;
    }
    decreasePageByOne() {
        this.page = Number(this.page) - 1;
    }
    setPage(newPage){
        this.page = newPage;
    }
    addRequest(request) {
        SearchInputParams.requests.push(request);
    }
    getRequests() {
        return SearchInputParams.requests;
    }
    getNeededRequests(start,end) {
        return SearchInputParams.requests.slice(start,end);
    }
    updateQntOfCards(){
        window.addEventListener('resize', debounce(handleViewportChange,300));
        handleViewportChange();
        }
    
    initLastRequest() {
        SearchInputParams.lastRequest = SearchInputParams.qntOfCards;
    }
    getFirstRequest(){
        return SearchInputParams.firstRequest;
    }
    getLastRequest(){
        return SearchInputParams.lastRequest;
    }
    increaseOrderOfRequests(){
        SearchInputParams.firstRequest = Number(SearchInputParams.firstRequest) + SearchInputParams.qntOfCards;
        SearchInputParams.lastRequest = Number(SearchInputParams.lastRequest) + SearchInputParams.qntOfCards;
    }
    decreaseOrderOfRequests(){
        SearchInputParams.firstRequest = Number(SearchInputParams.firstRequest)- SearchInputParams.qntOfCards;
        SearchInputParams.lastRequest = Number(SearchInputParams.lastRequest) - SearchInputParams.qntOfCards;
    }
    resetOrderOfRequests(){
        SearchInputParams.firstRequest = 0;
        this.initLastRequest();
    }


};

