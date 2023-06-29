import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout, updateItems } from './update-items.js';
import { removeItem } from './remove-item.js';
import { getData } from './get-data.js';
import { renderElement, switchesButtonState } from './utils.js';

const elementName = 'Элемент ';
const elementNameEn = 'item-';
const primaryLoadItems = 2;
const maxItems = 15;
const nonRemovableItems = 2;
let countItems = 1;

const parentElement = document.querySelector('.parameters__fieldset--parent');
const addItemButton = document.querySelector('.button-element.add');
const flexContainer = document.querySelector('.flex-items');
const itemTemplate = document.querySelector('#item').content.querySelector('.item');
const removeButtonTemplate = document.querySelector('#remove-button').content.querySelector('.button--remove');

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

const addItem = ({ parent: { width } }, siteLoaded) => {
  const itemClone = itemTemplate.cloneNode(true);
  const removeButtonClone = removeButtonTemplate.cloneNode(true);
  const itemLegend = itemClone.querySelector('.elements-title');
  const itemFields = itemClone.querySelectorAll('.oninput');
  const item = elementNameEn + countItems;

  itemClone.id = item;
  itemLegend.textContent = elementName + countItems;

  itemFields.forEach((input) => {
    if (input.name === 'flex-basis') {
      input.placeholder = `0-${width}px`;
    }

    input.addEventListener('input', onFieldsInput);
  });

  if (countItems > nonRemovableItems) {
    renderElement(itemClone, removeButtonClone);
    removeButtonClone.addEventListener('click', onRemoveButtonClick);
  }

  renderElement(flexContainer, itemClone);
  setItemData(item);

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
  const parentFields = parentElement.querySelectorAll('.oninput');

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
      updateItems(flexBox);
    }
  }
};

export { initAddItemActions, elementName, elementNameEn };
