import { minWidth } from './render-css.js';

const hasMinWidth = (property, value) => property === 'width' && value < minWidth ? minWidth : value;

const hasPx = (property) => property === 'width' || property === 'height' || property === 'gap' || property === 'flex-basis' ? 'px' : '';

const sumFlexValues = (items, property) => {
  let sum = 0;

  for (const item in items) {
    sum += items[item][property];
  }

  if (property === 'flex-basis') {
    return sum;
  }
  return sum ? sum : 1;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { hasMinWidth, hasPx, sumFlexValues, debounce };
