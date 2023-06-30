import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout } from './update-items.js';
import { debounce } from './utils.js';

const widthInput = document.querySelector('#width');

const updateTime = 500;

const updateWidth = (width) => {
  widthInput.value = width;
};

const widthTimeout = debounce((width) => updateWidth(width), updateTime);

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

  widthTimeout(boxWidth);
  flexBox.parent.width = boxWidth;
  defaultValues.minmax['max-width'] = boxWidth;
  defaultValues.minmax['max-flex-basis'] = boxWidth;

  if (siteLoaded) {
    updateTimeout(flexBox);
  }
};

const onWindowResize = () => {
  resizeWindow(true);
};

const initResizeWindowActions = () => {
  resizeWindow();
  window.addEventListener('resize', onWindowResize, false);
};

export { initResizeWindowActions, resizeWindow };
