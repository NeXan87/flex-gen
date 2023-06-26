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

const switchesButtonState = (button) => {
  button.disabled = !button.disabled;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { hasPx, renderElement, sumFlexValues, switchesButtonState, debounce };
