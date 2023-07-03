import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout } from './update-items.js';

const widthInput = document.querySelector('#width');

const setWidth = (width) => {
  flexBox.parent.width = width;
  widthInput.value = width;
  defaultValues.minmax['max-width'] = width;
  defaultValues.minmax['max-flex-basis'] = width;
};

const resizeWindow = (siteLoaded) => {
  const windowWidth = window.innerWidth;
  let boxWidth = 0;

  if (windowWidth > 1920) {
    boxWidth = 1190;
  } else if (windowWidth > 1240) {
    boxWidth = windowWidth - 738;
  } else if (windowWidth > 768) {
    boxWidth = windowWidth - 410;
  } else {
    boxWidth = windowWidth - 80;
  }

  setWidth(boxWidth);

  if (siteLoaded) {
    updateTimeout(flexBox);
  }
};

const onWindowResize = () => resizeWindow(true);

const initResizeWindowActions = () => {
  resizeWindow();
  window.addEventListener('resize', onWindowResize, false);
};

export { initResizeWindowActions, resizeWindow };
