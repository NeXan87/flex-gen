import { flexBox } from './flex-objects.js';
import { switchesButtonState } from './utils.js';

const addItemButton = document.querySelector('.button-element.add');

const removeItem = (evt) => {
  const itemElement = evt.target.parentNode;
  const item = itemElement.id;

  delete flexBox.items[item];
  itemElement.remove();

  switchesButtonState(addItemButton);
};

export { removeItem };
