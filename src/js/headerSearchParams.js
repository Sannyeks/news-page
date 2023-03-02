export default class SearchInputParams {
    constructor({q,key,page,filters}){
        this.q = q;
        this['api-key'] = key;
        this.page = page;
        this.fl = filters;
    }
    resetPages(){
        this.page = 1;
    }
    increasePageByOne() {
        this.page += 1;
    }
  };