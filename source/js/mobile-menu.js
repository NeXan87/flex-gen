const htmlElement = document.querySelector('html');
const menuButton = document.querySelector('.top-menu');
const overlayElement = document.querySelector('.overlay');

const toggleMenuClass = () => {
  htmlElement.classList.toggle('is-open');
};

const onMenuButtonClick = () => {
  toggleMenuClass();
};

const onOverlayElementClick = () => {
  toggleMenuClass();
};

const initMenuButtonActions = () => {
  menuButton.addEventListener('click', onMenuButtonClick);
  overlayElement.addEventListener('click', onOverlayElementClick);
};

export { initMenuButtonActions };
