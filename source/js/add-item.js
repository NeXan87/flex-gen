import { flexBox } from './flex-objects.js';
import { updateItems } from './script.js';
import { renderFlexBox } from './render-flex-box.js';
import { renderCss } from './render-css.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { calcFinalSizeGrow } from './calc-final-size-grow.js';
import { showData } from './show-data.js';

let primaryLoad = false;
let countItems = 1;

const addItemButton = document.querySelector('.add');
const flexContainer = document.querySelector('.flex-items');
const itemTemplate = document.querySelector('#item').content.querySelector('.item');

const onItemInputsInput = (evt) => {
  console.log(evt.target);
};

const addItem = () => {
  if (countItems < 11) {
    const itemClone = itemTemplate.cloneNode(true);
    const itemLegend = itemClone.querySelector('.elements-title');
    const itemInputs = itemClone.querySelectorAll('.oninput');

    itemClone.id = `item-${countItems}`;
    itemLegend.textContent = `Элемент ${countItems}`;

    flexContainer.appendChild(itemClone);

    itemInputs.forEach((input) => {
      input.addEventListener('input', onItemInputsInput);

      input.name = `${input.name}-${countItems}`;
      if (input.name === 'flex-basis') {
        input.placeholder = `0-${flexBox.parent.width}px`;
      }
    });

    flexBox.items[`item-${countItems}`] = {
      'flex-grow': 0,
      'flex-shrink': 1,
      'flex-basis': 0,
      'order': 0,
      'align-self': 'auto',
    };

    if (primaryLoad) {
      updateItems();
      renderFlexBox(flexBox);
      renderCss(flexBox);
      calcFinalSizeShrink(flexBox);
      calcFinalSizeGrow(flexBox);
      showData(flexBox);
    }

    countItems++;
  }

  if (countItems === 10) {
    addItemButton.disabled = true;
  }
};

const onAddItemButtonClick = () => {
  addItem();
};

const initAddItemActions = () => {
  addItemButton.addEventListener('click', onAddItemButtonClick);

  for (let i = 0; i < 1; i++) {
    addItem();
    if (flexBox.items.length === i) {
      primaryLoad = true;
    }
  }
};

export { initAddItemActions };
