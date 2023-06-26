import { flexBox } from './flex-objects.js';
import { updateTimeout } from './update-items.js';
import { validateParentData, validateItemData } from './validate-data.js';

const setValues = (evt) => {
  const property = evt.target.parentNode.id;
  const key = evt.target.name;
  const value = evt.target.value;

  if (property === 'parent') {
    flexBox[property][key] = validateParentData(key, value);
  } else {
    flexBox.items[property][key] = validateItemData(key, value, property);
  }

  updateTimeout(flexBox);
};

export { setValues };
