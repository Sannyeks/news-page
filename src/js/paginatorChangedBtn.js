function increaseChangedBtn(arrayOfButtons) {
    for ( let i = 0; i < arrayOfButtons.length; i +=1){
        arrayOfButtons[i].value = Number(arrayOfButtons[i].value) + 1;
        arrayOfButtons[i].textContent = arrayOfButtons[i].value;
    }
}

function decreaseChangedBtn(arrayOfButtons) {
    for ( let i = 0; i < arrayOfButtons.length; i +=1){
        arrayOfButtons[i].value = Number(arrayOfButtons[i].value) - 1;
        arrayOfButtons[i].textContent = arrayOfButtons[i].value;
    }
}

export {increaseChangedBtn , decreaseChangedBtn };