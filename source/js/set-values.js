import { flexBox } from './flex-objects.js';
import { updateTimeout } from './update-items.js';

const setValues = (evt) => {
  const property = evt.target.parentNode.id;
  const key = evt.target.name;
  const value = evt.target.value;

  if (property === 'parent') {
    flexBox[property][key] = value;
  } else {
    flexBox.items[property][key] = value;
  }

  updateTimeout(flexBox);
};

export { setValues };
