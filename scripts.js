'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const inputArr = [username, email, mobile, password, confirmPassword];


const checkEmail = function(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase().trim())){
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid');
    }
}

const checkMobile = function(input){
    let no = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if(no.test(String(input.value).trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Enter valid mobile number');
    }
}

const message = function(input) {
    const errorMessage = input.name.replace(/-p/, ' P');
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
}

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
            showError(input, `${message(input)} is required.`);
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
        showError(input, `${message(input)} must contain ${min} characters`);
    } else if (input.value.trim().length > max) {
        showError(input, `${message(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}


function textCounter(field,field2,maxlimit)
{
 var countfield = document.getElementById(field2);
 if ( field.value.length > maxlimit ) {
  field.value = field.value.substring( 0, maxlimit );
  return false;
 } else {
  countfield.value = maxlimit - field.value.length;
 }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired(inputArr);
    checkLength(username, 5, 12);
    checkLength(password, 5, 8);
    checkEmail(email);
    checkMobile(mobile);
    checkPassword(password, confirmPassword)
})

//RegEx ; Regular Expression
//pattern, flags
//add mobile number, validate, indian pattern, length
//text area limit of 300 character - should be showing live character count