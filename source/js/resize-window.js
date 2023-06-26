import { flexBox } from './flex-objects.js';
import { updateTimeout } from './update-items.js';

function resizeWindow() {
  const windowWidth = window.innerWidth;
  let boxWidth = 0;

  if (windowWidth > 1920) {
    boxWidth = 1210;
  } else if (windowWidth > 1240) {
    boxWidth = windowWidth - 718;
  } else if (windowWidth > 768) {
    boxWidth = windowWidth - 410;
  } else {
    boxWidth = windowWidth - 80;
  }

  // updateTimeout(flexBox);

  return boxWidth;
}

const onWindowResize = () => {
  resizeWindow(flexBox);
};

const initResizeWindowActions = () => {
  window.addEventListener('resize', onWindowResize, false);
};

export { initResizeWindowActions, resizeWindow };
