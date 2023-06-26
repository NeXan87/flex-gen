import { flexBox, defaultValues } from './flex-objects.js';
import { updateItems } from './update-items.js';
import { renderElement } from './utils.js';

const primaryLoadItems = 2;
const maxItems = 5;
const nonRemovableItems = 2;
let countItems = 1;

const addItemButton = document.querySelector('.button-element.add');
const flexContainer = document.querySelector('.flex-items');
const itemTemplate = document.querySelector('#item').content.querySelector('.item');
const removeButtonTemplate = document.querySelector('#remove-button').content.querySelector('.button-background');

const onItemInputsInput = (evt) => {
  console.log(evt.target.name);
};

const onRemoveButtonClick = () => {
  console.log('d');
};

const setItemData = (item) => {
  flexBox.items[item] = { ...defaultValues.items };
};

const addItem = ({ parent: { width } }) => {
  const itemClone = itemTemplate.cloneNode(true);
  const removeButtonClone = removeButtonTemplate.cloneNode(true);
  const removeButton = removeButtonClone.querySelector('.button-element.remove');
  const itemLegend = itemClone.querySelector('.elements-title');
  const itemInputs = itemClone.querySelectorAll('.oninput');
  const item = `item-${countItems}`;

  itemClone.id = item;
  itemLegend.textContent = `Элемент ${countItems}`;

  itemInputs.forEach((input) => {
    if (input.name === 'flex-basis') {
      input.placeholder = `0-${width}px`;
    }

    input.addEventListener('input', onItemInputsInput);
    input.id = `${input.name}-${countItems}`;
  });

  if (countItems > nonRemovableItems) {
    renderElement(itemClone, removeButtonClone);
    removeButton.addEventListener('click', onRemoveButtonClick);
  }

  renderElement(flexContainer, itemClone);
  setItemData(item);

  countItems++;
};

const onAddItemButtonClick = () => {
  if (countItems === maxItems) {
    addItemButton.disabled = true;
  }

  addItem(flexBox);
};

const initAddItemActions = () => {
  addItemButton.addEventListener('click', onAddItemButtonClick);

  for (let i = 1; i <= primaryLoadItems; i++) {
    addItem(flexBox);

    if (flexBox.items.length === i) {
      updateItems(flexBox);
    }
  }
};

export { initAddItemActions };
