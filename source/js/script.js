import './prototypes.js';
import { initMenuButtonActions } from './mobile-menu.js';
import { flexBox, flexItem } from './flex-objects.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { calcFinalSizeGrow } from './calc-final-size-grow.js';
import { showData } from './show-data.js';
import { renderAxes } from './render-axes.js';
import { renderFlexBox } from './render-flex-box.js';
import { renderCss } from './render-css.js';
import { debounce } from './utils.js';

const itemTemplate = document.querySelector('#item').content.querySelector('.item');

initMenuButtonActions();
const resetCalc = () => {
  flexBox.calculations.op = 0; // op (оставшееся пространство)
  flexBox.calculations.gsfs = 0; // gsfs (cумма всех flex-shrink, деленная на gap)
  flexBox.calculations.spbr = 0; // spbr (сумма произведений базовых размеров)
  flexBox.calculations.dsm = 0; // dsm (доля свободного места)
  flexBox.calculations.gsfg = 0; // gsfg (cумма всех flex-grow, деленная на gap)
};
const calcTime = 300;
const rerenderTime = 500;
const calcFinalSize = (object) => {
  resetCalc();
  calcFinalSizeShrink(object);
  calcFinalSizeGrow(object);
};
const renderElements = (data1, data2) => {
  renderAxes(data2);
  renderFlexBox(data1);
  renderCss(data1);
  showData(data1);
};

const calcTimeout = debounce((object) => calcFinalSize(object), calcTime);
const rerenderTimeout = debounce((data1, data2) => renderElements(data1, data2), rerenderTime);

const htmlElement = document.querySelector('html');
const elements = document.querySelector('.elements');
const flexContainer = document.querySelector('.flex-items');
const buttonAdd = document.querySelector('.button-element.add');
let boxParameters = document.querySelectorAll('.oninput');
const addElementButton = document.querySelector('.add');
let primaryLoad,
  pageWidth,
  idElement = 1;

function resizeWindow() {
  if (window.innerWidth > 1920) {
    pageWidth = 1210;
  } else if (window.innerWidth > 1240) {
    pageWidth = window.innerWidth - 718;
  } else if (window.innerWidth > 768) {
    pageWidth = window.innerWidth - 410;
    htmlElement.classList.remove('is-open');
  } else {
    pageWidth = window.innerWidth - 80;
  }

  boxParameters[0].value = pageWidth;
  boxParameters[0].setAttribute('placeholder', `240-${pageWidth}px`);
  flexBox.parent.width = pageWidth;
  rerenderTimeout(flexBox);
}

resizeWindow();
window.addEventListener('resize', resizeWindow, false);

for (let i = 0; i < 2; i++) {
  addElement();
  if (idElement === 2) {
    primaryLoad = true;
  }
}


function addElement() {
  if (idElement < 11) {
    const itemClone = itemTemplate.cloneNode(true);
    const itemLegend = itemClone.querySelector('.elements-title');
    const flexBasis = itemClone.querySelector('.flex-basis');

    itemClone.id = `item-${idElement}`;
    itemLegend.textContent = `Элемент ${idElement}`;
    flexBasis.placeholder = `0-${pageWidth}px`;

    flexContainer.appendChild(itemClone);

    flexBox.items[`item-${idElement}`] = {
      'flex-grow': 0,
      'flex-shrink': 1,
      'flex-basis': 0,
      'order': 0,
      'align-self': 'auto',
    };
    idElement++;

    if (primaryLoad) {
      updateItems();
      renderFlexBox(flexBox);
      renderCss(flexBox);
      calcFinalSizeShrink(flexBox);
      calcFinalSizeGrow(flexBox);
      showData(flexBox);
    }
  }
  if (idElement === 10) {
    buttonAdd.setAttribute('disabled', '');
  }
}

function onAddElementButtonClick() {
  addElement();
}

addElementButton.addEventListener('click', onAddElementButtonClick);

function removeElement(input) {
  delete flexBox.items[`item-${idElement - 1}`];
  elements.removeChild(input.parentNode);
  buttonAdd.removeAttribute('disabled', '');
  idElement--;
  calcTimeout(flexBox);
  rerenderTimeout(flexBox);
  updateItems();
}

function updateItems() {
  boxParameters = document.querySelectorAll('.oninput');
  addToFlexBox();
}

function addToFlexBox() {
  for (const boxPatameter of boxParameters) {
    boxPatameter.oninput = function () {
      for (let i = 1; i < idElement; i++) {
        if (+boxPatameter.getAttribute('id').slice(-1) === i) {

          if (
            boxPatameter.value > pageWidth ||
            ((boxPatameter.name === 'flex-grow' ||
              boxPatameter.name === 'flex-shrink') &&
              boxPatameter.value > 10)
          ) {
            boxPatameter.value = boxPatameter.value.slice(0, -1);
          } else if (
            boxPatameter.value < 0 &&
            boxPatameter.name !== 'order'
          ) {
            boxPatameter.value = 0;
          } else {
            flexBox.items[`item-${i}`][
              boxPatameter.name
            ] = isNaN(+boxPatameter.value) ? boxPatameter.value : +boxPatameter.value;
          }
          break;
        }
      }

      if (boxPatameter.classList.contains('input-parent')) {
        if (
          boxPatameter.value > pageWidth ||
          (boxPatameter.getAttribute('id') === 'gap' && boxPatameter.value > 100)
        ) {
          boxPatameter.value = boxPatameter.value.slice(0, -1);
        } else if (boxPatameter.value < 0) {
          boxPatameter.value = 0;
        } else {
          flexBox.parent[boxPatameter.getAttribute('id')] = isNaN(
            +boxPatameter.value
          )
            ? boxPatameter.value
            : +boxPatameter.value;
        }
      }

      calcTimeout(flexBox);
      rerenderTimeout(flexBox, boxPatameter.value);
    };
  }
}

export { flexBox };
