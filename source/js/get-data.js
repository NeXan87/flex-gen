import { flexBox, defaultValues } from './flex-objects.js';
import { updateItems } from './update-items.js';
import { debounce } from './utils.js';

const validateTime = 500;
const regEx = /^0+(0$|[1-9])/mg;

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
  const input = fieldset.querySelector(`#${key}`);
  const min = defaultValues.minmax[`min-${key}`];
  const max = defaultValues.minmax[`max-${key}`];

  value = value.length ? value : '0';
  value = isNaN(value) ? value : parseInt(value.replace(regEx, '$1'), 10);

  if (typeof value === 'number') {
    if (value < min) {
      input.value = min;
      value = min;
    } else if (value > max) {
      input.value = max;
      value = max;
    } else {
      input.value = value;
    }
  }

  setData(property, key, value);
};

function validateData(property, key, value) {
  validate(property, key, value);
  updateItems(flexBox);
}

const getData = (target) => {
  const key = target.parentNode.id;
  const { name, value } = target;

  validateTimeout(key, name, value);
};

export { getData };
