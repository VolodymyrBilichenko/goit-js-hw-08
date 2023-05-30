import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
}

document.addEventListener('DOMContentLoaded', formDataLocaleStorage);
refs.form.addEventListener('submit', onFormSubmit);

const formData = {};

const OBJECT_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(function (evt) {
  formData[evt.target.name] = evt.target.value;
  
  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(OBJECT_KEY, formDataJSON);
}, 3500));

function formDataLocaleStorage() {
  const savedData = localStorage.getItem(OBJECT_KEY);

  if (savedData) {
    const parseData = JSON.parse(savedData);
    const { email, message } = parseData;
    refs.input.value = email;
    refs.textarea.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);

  localStorage.removeItem(OBJECT_KEY);

  evt.currentTarget.reset();
}