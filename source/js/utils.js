import { minWidth } from './render-css.js';

const hasMinWidth = (property, value) => property === 'width' && value < minWidth ? minWidth : value;

const hasPx = (property1) => {
  const properties = ['width', 'height', 'gap', 'flex-basis'];
  return properties.some((property2) => property1 === property2) ? 'px' : '';
};

const renderElement = (parent, child) => parent.append(child);

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

export { hasMinWidth, hasPx, renderElement, sumFlexValues, debounce };
