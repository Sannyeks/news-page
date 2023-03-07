export default class RefBtnClass {
    static activeClass = 'isActivePage';
    constructor(button){
        this.button = button;
        }
    isActive(){
        return this.button.classList.contains(RefBtnClass.activeClass);
    }
    noActive(){
        return this.button.classList.remove(RefBtnClass.activeClass);
    }
    active(){
        return this.button.classList.add(RefBtnClass.activeClass);
    }
    getValue(){
        return this.button.value;
    }
    disable(){
        this.button.setAttribute('disabled',true);
    }
    enable(){
        this.button.removeAttribute('disabled');
    }
}