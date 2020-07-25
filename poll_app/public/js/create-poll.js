const addBtn = document.querySelector('#addBtn');
const optionsContainer = document.querySelector('#options');

addBtn.addEventListener('click', ()=>{
    let newOption = createOption();
    optionsContainer.append(newOption);
})

function createOption(){
    let newOption = document.createElement('input');
    newOption.classList.add('option')
    newOption.type = 'text';
    newOption.placeholder = 'Option';
    newOption.name = 'options'
    return newOption;
}