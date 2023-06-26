import { flexBox, defaultValues } from './flex-objects.js';
import { updateItems } from './update-items.js';
import { debounce } from './utils.js';

const validateTime = 500;

const validateTimeout = debounce((property, key, value) => validateData(property, key, value), validateTime);

const setData = (property, key, value) => {
  if (property === 'parent') {
    flexBox[property][key] = value;
  } else {
    flexBox.items[property][key] = value;
  }
};

const validate = (property, key, value) => {
  const fieldset = document.querySelector(`#${property}`);
  const input = fieldset.querySelector(`.${key}`);
  const min = defaultValues.minmax[`min-${key}`];
  const max = defaultValues.minmax[`max-${key}`];
  value = isNaN(value) ? value : +value;

  if (value < min) {
    input.value = min;
    value = min;
  } else if (value > max) {
    input.value = max;
    value = max;
  } else if (+value) {
    value = parseInt(value, 10);
    input.value = value;
  }

  setData(property, key, value);
};

function validateData(property, key, value) {
  validate(property, key, value);
  updateItems(flexBox);
}

const getData = (target) => {
  const { id } = target.parentNode;
  const { name } = target;
  const { value } = target;

  validateTimeout(id, name, value);
};

export { getData };
