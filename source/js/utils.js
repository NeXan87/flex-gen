
import { minWidth } from './renderCss.js';

const hasMinWidth = (property, value) => property === 'width' && value < minWidth ? minWidth : value;

const hasPx = (property) => property === 'width' || property === 'height' || property === 'gap' || property === 'flex-basis' ? 'px' : '';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { hasMinWidth, hasPx, debounce };
