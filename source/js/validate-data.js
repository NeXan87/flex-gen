import { defaultValues } from './flex-objects.js';

const validate = (input, key, value) => {
  const min = defaultValues.minmax[`min-${key}`];
  const max = defaultValues.minmax[`max-${key}`];
  let temp = value;

  if (value < min) {
    input.value = min;
    temp = min;
  } else if (value > max) {
    input.value = max;
    temp = max;
  }

  return temp;
};

const validateParentData = (key, value) => {
  const input = document.querySelector(`.${key}`);
  return validate(input, key, value);
};

const validateItemData = (key, value, property) => {
  const fieldset = document.querySelector(`#${property}`);
  const input = fieldset.querySelector(`.${key}`);
  return validate(input, key, value);
};

export { validateParentData, validateItemData };
