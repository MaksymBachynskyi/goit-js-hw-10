import { getSelectOption, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
const loaderTextEl = document.querySelector('.loader');
const errorTextEl = document.querySelector('.error');
const selectEl = document.querySelector('.breed-select');
const divForCatsEl = document.querySelector('.cat-info');
getSelectOption
  .then(response => {
    selectEl.hidden = false;
    loaderTextEl.hidden = true;
    selectEl.insertAdjacentHTML('beforeend', response);
  })
  .catch(err => {
    loaderTextEl.hidden = true;
    errorTextEl.hidden = false;
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function createMarkup(name, temperament, description, url) {
  return `<div class="thumb"><img src="${url}" alt="${name}" ></div>
<div class="wrapperText"<h2 class="title-text">${name}</h2>
<p class="description-text">${description}</p>
<p class="description-text"><span class="title-text">Temperament:</span>${temperament}</p></div>`;
}
selectEl.addEventListener('change', onChangeSelect);
function onChangeSelect(evnt) {
  loaderTextEl.hidden = false;
  divForCatsEl.innerHTML = '';
  fetchCatByBreed(evnt.currentTarget.value)
    .then(r => {
      loaderTextEl.hidden = true;
      r.map(item => {
        const {
          url,
          breeds: [{ name, temperament, description }],
        } = item;
        divForCatsEl.innerHTML = createMarkup(
          name,
          temperament,
          description,
          url
        );
      });
    })
    .catch(err => {
      loaderTextEl.hidden = true;
      errorTextEl.hidden = false;
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
