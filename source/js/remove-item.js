import { flexBox } from './flex-objects.js';
import { elementName, elementNameEn } from './add-item.js';
import { updateTimeout } from './update-items.js';
import { switchesButtonState } from './utils.js';

const addItemButton = document.querySelector('.button-element.add');

const reCalcNumbersItems = () => {
  const fieldsetElements = document.querySelectorAll('.parameters__fields--item');
  const legendElements = document.querySelectorAll('.subtitle--item');
  const flexItems = Object.keys(flexBox.items);
  const tempItems = {};

  fieldsetElements.forEach((element, index) => {
    element.id = elementNameEn + (index + 1);
  });

  legendElements.forEach((element, index) => {
    element.textContent = elementName + (index + 1);
  });

  flexItems.forEach((item, index) => {
    tempItems[elementNameEn + (index + 1)] = { ...flexBox.items[item] };
    delete flexBox.items[item];
  });

  flexBox.items = { ...tempItems };
};

const removeItem = (evt) => {
  const itemElement = evt.target.parentNode;
  const item = itemElement.id;

  delete flexBox.items[item];
  itemElement.remove();

  if (addItemButton.disabled) {
    switchesButtonState(addItemButton);
  }

  reCalcNumbersItems();
  updateTimeout(flexBox);
};

export { removeItem };
