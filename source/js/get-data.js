import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout } from './update-items.js';
import { debounce } from './utils.js';

const validateTime = 500;
const regEx = /^0+(0$|[1-9])/mg;

const validateTimeout = debounce((input, value) => сhangeValuesInputs(input, value), validateTime);

const setData = (property, key, value) => {
  if (property === 'parent') {
    flexBox[property][key] = value;
  } else {
    flexBox.items[property][key] = value;
  }

  updateTimeout(flexBox);
};

const сhangeValueInput = (input, value) => {
  input.value = value;
};

const validate = ({ minmax }, property, key, value) => {
  const fieldset = document.querySelector(`#${property}`);
  const input = fieldset.querySelector(`[name='${key}']`);
  const min = minmax[`min-${key}`];
  const max = minmax[`max-${key}`];

  value = value.length ? value : '0';
  value = isNaN(value) ? value : parseInt(value.replace(regEx, '$1'), 10);

  if (typeof value === 'number') {
    if (value < min) {
      validateTimeout(input, min);
      value = min;
    } else if (value > max) {
      validateTimeout(input, max);
      value = max;
    } else {
      validateTimeout(input, value);
    }
  }

  setData(property, key, value);
};

function сhangeValuesInputs(input, value) {
  сhangeValueInput(input, value);
}

const getData = (target) => {
  const key = target.parentNode.id;
  const { name, value } = target;
  validate(defaultValues, key, name, value);
};

export { getData };
