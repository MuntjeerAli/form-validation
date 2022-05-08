'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const inputArr = [username, email, password, confirmPassword];


const showError = function (input, message) {
    let formControl = input.parentElement;
    formControl.classList = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const showSuccess = function(input) {
    let formControl = input.parentElement;
    formControl.classList = 'form-control success';
}

const checkRequired = function(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${input.name} is required.`);
            return;
        } else{
            showSuccess(input);
        }
    });
}

const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', function(e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    return;
})


const checkPassword = function(input1, input2){
    if(input1.value.trim() !== '' && input2.value.trim() !== ''){
        if (input1.value.trim() !== input2.value.trim()) {
            showError(input2, 'Passwords not matched');
        } else{
            showSuccess(input1);
            showSuccess(input2);
        }
    }
}

const checkLength = function(input, min, max) {
    if (input.value.trim().length < min) {
        showError(input, `${input.name} must contain ${min} characters`);
    } else if (input.value.trim().length > max) {
        showError(inout, `${input.name} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired(inputArr);
    checkLength(username, 5, 12);
    checkLength(password, 5, 8);
    checkPassword(password, confirmPassword)
})
// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     if (username.value.trim() === '') {
//         showError(username, 'Username is required');
//     } else{
//         showSuccess(input);
//     }
// });