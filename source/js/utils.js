const hasPx = (property1) => {
  const properties = ['width', 'height', 'gap', 'flex-basis'];
  return properties.some((property2) => property1 === property2) ? 'px' : '';
};

const isEscapeKey = (key) => key === 'Escape';

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

const setDataInput = (input, min, max) => {
  input.placeholder = `${min}-${max}${hasPx(input.name)}`;
  input.min = min;
  input.max = max;
};

const getMinMaxValues = ({ minmax }, input) => {
  const keys = ['width', 'gap', 'flex-grow', 'flex-shrink', 'flex-basis', 'order'];

  keys.forEach((key) => {
    const min = minmax[`min-${key}`];
    const max = minmax[`max-${key}`];

    if (key === input.name) {
      setDataInput(input, min, max);
    }
  });
};

const setNameItem = (name, sign, count, num = 0) => name + sign + (count + num);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { hasPx, isEscapeKey, renderElement, sumFlexValues, switchesButtonState, getMinMaxValues, setNameItem, debounce };
