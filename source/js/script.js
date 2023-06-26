import './prototypes.js';
import { initMenuButtonActions } from './mobile-menu.js';
import { flexBox } from './flex-objects.js';
import { initAddItemActions } from './add-item.js';
import { updateTimeout } from './update-items.js';

const htmlElement = document.querySelector('html');
const elements = document.querySelector('.elements');
// let boxParameters = document.querySelectorAll('.oninput');
let pageWidth;

function resizeWindow() {
  if (window.innerWidth > 1920) {
    pageWidth = 1210;
  } else if (window.innerWidth > 1240) {
    pageWidth = window.innerWidth - 718;
  } else if (window.innerWidth > 768) {
    pageWidth = window.innerWidth - 410;
    htmlElement.classList.remove('is-open');
  } else {
    pageWidth = window.innerWidth - 80;
  }

  flexBox.parent.width = pageWidth;
  updateTimeout(flexBox);
}

resizeWindow();
initMenuButtonActions();
initAddItemActions();

window.addEventListener('resize', resizeWindow, false);
