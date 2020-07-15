document.addEventListener('DOMContentLoaded', app);

const elements = {
    signupBtn: document.querySelector('.signup-btn'),
    signinBtn: document.querySelector('.signin-btn'),
    box: document.querySelector('.box'),
}

function app(){
    signFunc();
}

function signFunc(){
    const {signupBtn, signinBtn, box} = elements;
    signupBtn.addEventListener('click', ()=>{
        box.classList.add('signup-show')
    })
    signinBtn.addEventListener('click', ()=>{
        box.classList.remove('signup-show')
    })
}