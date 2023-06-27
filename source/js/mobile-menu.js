import { isEscapeKey } from './utils.js';

const htmlElement = document.querySelector('html');
const menuButton = document.querySelector('.header__button');
const overlayElement = document.querySelector('.overlay');

const toggleMenuClass = () => {
  htmlElement.classList.toggle('is-open');

  if (htmlElement.classList.contains('is-open')) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onMenuButtonClick = () => {
  toggleMenuClass();
};

const onOverlayElementClick = () => {
  toggleMenuClass();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    toggleMenuClass();
  }
}

const initMenuButtonActions = () => {
  menuButton.addEventListener('click', onMenuButtonClick);
  overlayElement.addEventListener('click', onOverlayElementClick);
};

export { initMenuButtonActions };
