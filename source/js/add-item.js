import { flexBox } from './flex-objects.js';
import { renderFlexBox } from './render-flex-box.js';
import { renderCss } from './render-css.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { calcFinalSizeGrow } from './calc-final-size-grow.js';
import { showData } from './show-data.js';

const primaryLoadItems = 2;
const maxItems = 5;
let countItems = 1;

const addItemButton = document.querySelector('.button-element.add');
const flexContainer = document.querySelector('.flex-items');
const itemTemplate = document.querySelector('#item').content.querySelector('.item');

const onItemInputsInput = (evt) => {
  console.log(evt.target.name);
};

const createObject = (itemId) => {
  flexBox.items[itemId] = {
    'flex-grow': 0,
    'flex-shrink': 1,
    'flex-basis': 0,
    'order': 0,
    'align-self': 'auto',
  };
};

const addItem = ({ parent: { width } }) => {
  const itemClone = itemTemplate.cloneNode(true);
  const itemLegend = itemClone.querySelector('.elements-title');
  const itemInputs = itemClone.querySelectorAll('.oninput');
  const itemId = `item-${countItems}`;

  itemClone.id = itemId;
  itemLegend.textContent = `Элемент ${countItems}`;

  flexContainer.append(itemClone);

  itemInputs.forEach((input) => {
    if (input.name === 'flex-basis') {
      input.placeholder = `0-${width}px`;
    }

    input.addEventListener('input', onItemInputsInput);
    input.id = `${input.name}-${countItems}`;
  });

  createObject(itemId);

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
      renderFlexBox(flexBox);
      renderCss(flexBox);
      calcFinalSizeShrink(flexBox);
      calcFinalSizeGrow(flexBox);
      showData(flexBox);
    }
  }
};

export { initAddItemActions };
