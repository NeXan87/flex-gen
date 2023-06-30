import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout, updateAll } from './update-items.js';
import { removeItem } from './remove-item.js';
import { getData } from './get-data.js';
import { renderElement, switchesButtonState } from './utils.js';

const elementName = 'Элемент';
const elementNameEn = 'item';
const primaryLoadItems = 2;
const maxItems = 15;
const nonRemovableItems = 2;
let countItems = 1;

const parentElement = document.querySelector('.parameters__fields--parent');
const addItemButton = document.querySelector('.button--add-item');
const flexContainer = document.querySelector('.parameters__items');
const itemTemplate = document.querySelector('#item').content.querySelector('.parameters__fields--item');
const removeButtonTemplate = document.querySelector('#remove-button').content.querySelector('.button--remove-item');

const onFieldsInput = (evt) => {
  getData(evt.target);
};

const onRemoveButtonClick = (evt) => {
  removeItem(evt);
  countItems--;
};

const setItemData = (item) => {
  flexBox.items[item] = { ...defaultValues.items };
};

const setAttributes = (elements, attr) => {
  elements.forEach((element) => {
    element.setAttribute(attr, `${element.getAttribute(attr)}-${countItems}`);
  });
};

const addItem = ({ parent: { width } }, siteLoaded) => {
  const itemClone = itemTemplate.cloneNode(true);
  const removeButtonClone = removeButtonTemplate.cloneNode(true);
  const itemTitle = itemClone.querySelector('.parameters__title--item');
  const itemTitleText = itemClone.querySelector('.parameters__title-text--item');
  const itemLabels = itemClone.querySelectorAll('.parameters__label');
  const itemFields = itemClone.querySelectorAll('.field');

  setAttributes(itemLabels, 'for');
  setAttributes(itemFields, 'id');

  itemClone.id = `${elementNameEn}-${countItems}`;
  itemTitleText.textContent = `${elementName} ${countItems}`;

  itemFields.forEach((input) => {
    if (input.name === 'flex-basis') {
      input.placeholder = `0-${width}px`;
    }

    input.addEventListener('input', onFieldsInput);
  });

  if (countItems > nonRemovableItems) {
    renderElement(itemTitle, removeButtonClone);
    removeButtonClone.addEventListener('click', onRemoveButtonClick);
  }

  renderElement(flexContainer, itemClone);
  setItemData(`${elementNameEn}-${countItems}`);

  if (siteLoaded) {
    updateTimeout(flexBox);
  }

  countItems++;
};

const onAddItemButtonClick = () => {
  if (countItems === maxItems) {
    switchesButtonState(addItemButton);
  }

  addItem(flexBox, true);
};

const initParentActions = ({ parent: { width } }) => {
  const parentFields = parentElement.querySelectorAll('.field');

  parentFields.forEach((input) => {
    if (input.name === 'width') {
      input.placeholder = `240-${width}px`;
      input.value = width;
    }

    input.addEventListener('input', onFieldsInput);
  });
};

const initAddItemActions = () => {
  initParentActions(flexBox);

  addItemButton.addEventListener('click', onAddItemButtonClick);

  for (let i = 1; i <= primaryLoadItems; i++) {
    addItem(flexBox);

    if (primaryLoadItems === i) {
      updateAll(flexBox);
    }
  }
};

export { initAddItemActions, elementName, elementNameEn };
