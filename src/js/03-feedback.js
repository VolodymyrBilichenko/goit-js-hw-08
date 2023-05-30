import throttle from 'lodash.throttle';

// code for test  
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export default {
  save,
  load,
};
// code for test

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
  
  // const formDataJSON = JSON.stringify(formData);

  // localStorage.setItem(OBJECT_KEY, formDataJSON);
  save(OBJECT_KEY, formData);
}, 500));

function formDataLocaleStorage() {
  // const savedData = localStorage.getItem(OBJECT_KEY);
  const savedData = load(OBJECT_KEY);

  if (savedData) {
    // const parseData = JSON.parse(savedData);

    // const { email, message } = parseData;
    const { email, message } = savedData;

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

  formData.email = '';
  formData.message = '';

  evt.currentTarget.reset();
}