import { defaultValues } from './flex-objects.js';
import { getData } from './get-data.js';
import { setDataInput } from './utils.js';

const parentElement = document.querySelector('.parameters__fields--parent');
const parentFields = parentElement.querySelectorAll('.field');

const getMinMaxValues = (input) => {
  const { minmax: {
    'min-width': minWidth,
    'max-width': maxWidth,
    'min-gap': minGap,
    'max-gap': maxGap, } } = defaultValues;

  if (input.name === 'width') {
    setDataInput(input, minWidth, maxWidth);
  } else if (input.name === 'gap') {
    setDataInput(input, minGap, maxGap);
  }
};

const onParentFieldsInput = (evt) => getData(evt.target);

const initParentActions = () => {
  parentFields.forEach((input) => {
    getMinMaxValues(input);
    input.addEventListener('input', onParentFieldsInput);
  });
};

export { initParentActions };
