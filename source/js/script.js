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
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('flex', 'item', 'wrapper-parameters');
    fieldset.setAttribute('id', `item-${idElement}`);
    fieldset.innerHTML = `
  <div class="button-background" onclick="removeElement(this)">
  <button type="button" class="button-element remove"></button>
  </div>
  <legend class="elements-title">Элемент ${idElement}</legend>
  <label for="flex-grow-${idElement}" class="element label-title">flex-grow</label>
  <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" placeholder="0-10">
  <label for="flex-shrink-${idElement}" class="label-title element">flex-shrink</label>
  <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" placeholder="0-10">
  <label for="flex-basis-${idElement}" class="label-title element">flex-basis</label>
  <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}" placeholder="0-${pageWidth}px">
  <label for="order-${idElement}" class="label-title element">order</label>
  <input type="number" class="number order element order-${idElement} oninput input-child" id="order-${idElement}" placeholder="+-100">
  <label for="align-self-${idElement}" class="label-title element">align-self</label>
  <select name="align-self" id="align-self-${idElement}" class="select element element-${idElement} oninput input-child">
  <option value="auto" selected>auto</option>
  <option value="flex-start">flex-start</option>
  <option value="flex-end">flex-end</option>
  <option value="center">center</option>
  <option value="baseline">baseline</option>
  <option value="stretch">stretch</option>
  </select>
  <div class="result-box">
  <div class="result-item">НКС<output name="result" class="nks"></output></div>
  <div class="result-item">ИРС<output name="result" class="irs"></output></div>
  <div class="result-item">ИРР<output name="result" class="irr"></output></div>
  </div>`;
    flexContainer.appendChild(fieldset);
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
      for (let i = 1; i <= idElement; i++) {
        if (+boxPatameter.getAttribute('id').slice(-1) === i) {
          if (
            boxPatameter.value > pageWidth ||
            ((boxPatameter.getAttribute('id').slice(0, -2) === 'flex-grow' ||
              boxPatameter.getAttribute('id').slice(0, -2) === 'flex-shrink') &&
              boxPatameter.value > 10)
          ) {
            boxPatameter.value = boxPatameter.value.slice(0, -1);
          } else if (
            boxPatameter.value < 0 &&
            boxPatameter.getAttribute('id').slice(0, -2) !== 'order'
          ) {
            boxPatameter.value = 0;
          } else {
            flexBox.items[`item-${i}`][
              boxPatameter.getAttribute('id').slice(0, -2)
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
