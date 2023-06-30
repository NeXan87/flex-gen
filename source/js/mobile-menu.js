import { isEscapeKey } from './utils.js';

const htmlElement = document.querySelector('html');
const menuButton = document.querySelector('.header__button');

const toggleMenuClass = () => {
  htmlElement.classList.toggle('is-open');

  if (htmlElement.classList.contains('is-open')) {
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
};

const onMenuButtonClick = () => {
  toggleMenuClass();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    toggleMenuClass();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest('.header__button') &&
    !evt.target.closest('.parameters') &&
    !evt.target.closest('.button--remove-item')) {
    toggleMenuClass();
  }
}

const initMenuButtonActions = () => {
  menuButton.addEventListener('click', onMenuButtonClick);
};

export { initMenuButtonActions };
