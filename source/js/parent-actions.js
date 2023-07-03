import { defaultValues } from './flex-objects.js';
import { getData } from './get-data.js';
import { getMinMaxValues } from './utils.js';

const parentElement = document.querySelector('.parameters__fields--parent');
const parentFields = parentElement.querySelectorAll('.field');

const onParentFieldsInput = (evt) => getData(evt.target);

const initParentActions = () => {
  parentFields.forEach((input) => {
    getMinMaxValues(defaultValues, input);
    input.addEventListener('input', onParentFieldsInput);
  });
};

export { initParentActions };
