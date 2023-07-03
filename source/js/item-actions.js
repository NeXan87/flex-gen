import { flexBox, defaultValues } from './flex-objects.js';
import { updateTimeout, updateAll } from './update-items.js';
import { addRemoveButton } from './remove-item.js';
import { getData } from './get-data.js';
import { renderElement, switchesButtonState, getMinMaxValues, setNameItem } from './utils.js';

const elementNameRu = 'Элемент';
const elementNameEn = 'item';
const primaryLoadItems = 2;
const maxItems = 15;
const nonRemovableItems = 2;
let countItems = 1;

const addItemButton = document.querySelector('.button--add-item');
const flexContainer = document.querySelector('.parameters__items');
const itemTemplate = document.querySelector('#item').content.querySelector('.parameters__fields--item');

const decreaseCount = () => countItems--;

const setItemData = (item) => {
  flexBox.items[item] = { ...defaultValues.items };
};

const setAttributes = (elements, attr) => {
  elements.forEach((element) => {
    element.setAttribute(attr, setNameItem(element.getAttribute(attr), '-', countItems));
  });
};

const onItemFieldsInput = (evt) => getData(evt.target);

const addItem = (siteLoaded) => {
  const itemClone = itemTemplate.cloneNode(true);
  const itemTitle = itemClone.querySelector('.parameters__title--item');
  const itemTitleText = itemClone.querySelector('.parameters__title-text--item');
  const itemLabels = itemClone.querySelectorAll('.parameters__label');
  const itemFields = itemClone.querySelectorAll('.field');
  const titleItemEn = setNameItem(elementNameEn, '-', countItems);
  const titleItemRu = setNameItem(elementNameRu, ' ', countItems);

  setAttributes(itemLabels, 'for');
  setAttributes(itemFields, 'id');

  itemClone.id = titleItemEn;
  itemTitleText.textContent = titleItemRu;

  itemFields.forEach((input) => {
    getMinMaxValues(defaultValues, input);
    input.addEventListener('input', onItemFieldsInput);
  });

  renderElement(flexContainer, itemClone);
  setItemData(titleItemEn);

  if (countItems > nonRemovableItems) {
    addRemoveButton(itemTitle);
  }

  if (siteLoaded) {
    updateTimeout(flexBox);
  }

  countItems++;
};

const onAddItemButtonClick = (evt) => {
  evt.stopPropagation();

  if (countItems === maxItems) {
    switchesButtonState(addItemButton);
  }

  addItem(true);
};

const initItemActions = () => {
  addItemButton.addEventListener('click', onAddItemButtonClick);

  for (let i = 1; i <= primaryLoadItems; i++) {
    addItem();

    if (primaryLoadItems === i) {
      updateAll(flexBox);
    }
  }
};

export { initItemActions, decreaseCount, elementNameRu, elementNameEn };
