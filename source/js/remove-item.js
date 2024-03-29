import { flexBox } from './flex-objects.js';
import { elementNameRu, elementNameEn, decreaseCount } from './item-actions.js';
import { updateTimeout } from './update-items.js';
import { switchesButtonState, setNameItem, renderElement } from './utils.js';

const regExp = /-|[0-9]/g;

const addItemButton = document.querySelector('.button--add-item');
const removeButtonTemplate = document.querySelector('#remove-button').content.querySelector('.button--remove-item');

const renameAttributes = (elements, attr, index) => {
  elements.forEach((element) => element.setAttribute(attr, `${element.getAttribute(attr).replace(regExp, '')}-${index + 1}`));
};

const reCalcNumbersItems = () => {
  const fieldsetElements = document.querySelectorAll('.parameters__fields--item');
  const legendElements = document.querySelectorAll('.parameters__title-text--item');
  const flexItems = Object.keys(flexBox.items);
  const tempItems = {};

  fieldsetElements.forEach((element, index) => {
    element.id = setNameItem(elementNameEn, '-', index, 1);

    const labelElements = element.querySelectorAll('.parameters__label');
    const fieldElements = element.querySelectorAll('.field');

    renameAttributes(labelElements, 'for', index);
    renameAttributes(fieldElements, 'id', index);
  });

  legendElements.forEach((element, index) => {
    element.textContent = setNameItem(elementNameRu, ' ', index, 1);
  });

  flexItems.forEach((item, index) => {
    tempItems[setNameItem(elementNameEn, '-', index, 1)] = { ...flexBox.items[item] };
    delete flexBox.items[item];
  });

  flexBox.items = { ...tempItems };
};

const removeItem = (evt) => {
  const itemElement = evt.target.closest('.parameters__title--item').parentNode;
  const item = itemElement.id;

  delete flexBox.items[item];
  itemElement.remove();

  if (addItemButton.disabled) {
    switchesButtonState(addItemButton);
  }

  reCalcNumbersItems();
  updateTimeout(flexBox);
};

const onRemoveButtonClick = (evt) => {
  evt.stopPropagation();
  removeItem(evt);
  decreaseCount();
};

const addRemoveButton = (itemTitle) => {
  const removeButtonClone = removeButtonTemplate.cloneNode(true);

  renderElement(itemTitle, removeButtonClone);
  removeButtonClone.addEventListener('click', onRemoveButtonClick);
};

export { addRemoveButton };
