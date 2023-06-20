import './prototypes.js';
import { initMenuButtonActions } from './mobile-menu.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { renderAxes } from './render-axes.js';
import { renderFlexBox } from './render-flex-box.js';
import { renderCss } from './render-css.js';
import { debounce } from './utils.js';

initMenuButtonActions();
const rerenderTime = 1000;
const renderElements = (data1, data2) => {
  renderAxes(data2);
  renderFlexBox(data1);
  renderCss(data1);
};
const rerenderTimeout = debounce((data1, data2) => renderElements(data1, data2), rerenderTime);
const calcTimeout = debounce((flexBox, calculations) => calcFinalSizeShrink(flexBox, calculations), 300);


const htmlElement = document.querySelector('html');
const elements = document.querySelector('.elements');
const buttonAdd = document.querySelector('.button-element.add');
let boxParameters = document.querySelectorAll('.oninput');
const addElementButton = document.querySelector('.add');
let primaryLoad,
  pageWidth,
  op,
  nks,
  dsm,
  irr,
  irs,
  idElement = 0;

const inputParameters = {
  parent: {
    display: 'flex',
    width: document.querySelector('#width').value,
    gap: document.querySelector('#gap').value,
    'flex-direction': document.querySelector('#flex-direction').value,
    'flex-wrap': document.querySelector('#flex-wrap').value,
    'justify-content': document.querySelector('#justify-content').value,
    'align-items': document.querySelector('#align-items').value,
    'align-content': document.querySelector('#align-content').value,
  },
  elements: {},
  calculations: {
    op: 0, // op (оставшееся пространство)
    gsfs: 0, // gsfs (cумма всех flex-shrink, деленная на gap)
    spbr: 0, // spbr (сумма произведений базовых размеров)
  },
};

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
  inputParameters.parent.width = pageWidth;
  rerenderTimeout(inputParameters);
}

resizeWindow();
window.addEventListener('resize', resizeWindow, false);

for (let i = 0; i < 4; i++) {
  addElement();
  if (idElement === 3) {
    primaryLoad = true;
  }
}

function addElement() {
  if (idElement < 11) {
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('flex', 'item', 'wrapper-parameters');
    fieldset.innerHTML = `
  <div class="button-background" onclick="removeElement(this)">
  <button type="button" class="button-element remove"></button>
  </div>
  <legend class="elements-title">Элемент ${idElement + 1}</legend>
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
  <div class="result-item">НКС<output name="result" class="nks result-${idElement}"></output></div>
  <div class="result-item">ИРС<output name="result" class="irs result-${idElement}"></output></div>
  <div class="result-item">ИРР<output name="result" class="irr result-${idElement}"></output></div>
  </div>`;
    elements.appendChild(fieldset);
    inputParameters.elements[`element-${idElement}`] = {
      'flex-grow': 0,
      'flex-shrink': 1,
      'flex-basis': 0,
      order: 0,
      'align-self': 'auto',
    };
    idElement++;

    if (primaryLoad) {
      updateItems();
      renderFlexBox(inputParameters);
      renderCss(inputParameters);
      calcTimeout(inputParameters, inputParameters.calculations);
      // calcFinalSizeGrow();
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
  delete inputParameters.elements[`element-${idElement - 1}`];
  elements.removeChild(input.parentNode);
  buttonAdd.removeAttribute('disabled', '');
  idElement--;
  rerenderTimeout(inputParameters);
  calcTimeout(inputParameters, inputParameters.calculations);
  // calcFinalSizeGrow();
  updateItems();
}

function updateItems() {
  boxParameters = document.querySelectorAll('.oninput');
  op = document.querySelector('.op'); // op (оставшееся пространство)
  nks = document.querySelectorAll('.nks'); // nks (нормированный коэффициент сжатия элемента)
  dsm = document.querySelector('.dsm'); // dsm (доля свободного места)
  irr = document.querySelectorAll('.irr'); // irr (итоговый размер расширения элемента)
  irs = document.querySelectorAll('.irs'); // irs (итоговый размер после сжатия элемента)
  addToInputParameters();
}

function addToInputParameters() {
  for (const boxPatameter of boxParameters) {
    boxPatameter.oninput = function () {
      for (let i = 0; i <= idElement; i++) {
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
            inputParameters.elements[`element-${i}`][
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
          inputParameters.parent[boxPatameter.getAttribute('id')] = isNaN(
            +boxPatameter.value
          )
            ? boxPatameter.value
            : +boxPatameter.value;
        }
      }

      calcTimeout(inputParameters, inputParameters.calculations);
      // calcFinalSizeGrow();
      rerenderTimeout(inputParameters, boxPatameter.value);
    };
  }
}

function calcFinalSizeGrow() {
  inputParameters.calculations.dsm = 0; // dsm (доля свободного места)
  inputParameters.calculations.gsfg = 0; // gsfg (cумма всех flex-grow, деленная на gap)

  for (let index = 0; index < idElement; index++) {
    // dsm (доля свободного места) = op (оставшееся пространство) / (flex-grow-1 + flex-grow-2 + ... + flex-grow-n)
    inputParameters.calculations.dsm +=
      inputParameters.elements[`element-${index}`]['flex-grow'] || 0;
  }

  // gsfg (cумма всех flex-grow, деленная на gap) = gap / sum(flex-grow-n)
  inputParameters.calculations.gsfg =
    inputParameters.calculations.dsm === 0
      ? NaN
      : (+inputParameters.parent.gap * (idElement - 1)) /
      inputParameters.calculations.dsm;

  inputParameters.calculations.dsm =
    inputParameters.calculations.dsm === 0
      ? NaN
      : Math.abs(inputParameters.calculations.op) / inputParameters.calculations.dsm;

  for (let k = 0; k < idElement; k++) {
    // irr (итоговый размер расширения элемента) = (flex-basis - gsfs * flex-grow) + dsm (доля свободного места) * flex-grow
    inputParameters.elements[`element-${k}`].irr =
      (inputParameters.elements[`element-${k}`]['flex-basis'] || 0) -
      inputParameters.calculations.gsfg *
      (inputParameters.elements[`element-${k}`]['flex-grow'] || 0) +
      inputParameters.calculations.dsm *
      (inputParameters.elements[`element-${k}`]['flex-grow'] || 0);
  }

  showIrsIrr();
}

function showIrsIrr() {
  if (
    isNaN(inputParameters.calculations.op) ||
    inputParameters.calculations.op > pageWidth ||
    inputParameters.calculations.op < -pageWidth ||
    inputParameters.calculations.op === +inputParameters.parent.width
  ) {
    op.style.color = '#CC0000';
    if (inputParameters.calculations.op > pageWidth) {
      op.textContent = 'MAX';
    } else if (inputParameters.calculations.op < -pageWidth) {
      op.textContent = 'MIN';
    } else if (inputParameters.calculations.op === +inputParameters.parent.width) {
      op.textContent = 'W=OP';
    } else {
      op.textContent = 'NOT';
    }
  } else {
    op.style.color = null;
    op.textContent = `${inputParameters.calculations.op}px`;
  }

  if (
    isNaN(inputParameters.calculations.dsm) ||
    inputParameters.calculations.dsm > pageWidth ||
    inputParameters.calculations.dsm < 0
  ) {
    dsm.style.color = '#CC0000';
    if (inputParameters.calculations.dsm > pageWidth) {
      dsm.textContent = 'MAX';
    } else if (inputParameters.calculations.dsm < 0) {
      dsm.textContent = 'MIN';
    } else {
      dsm.textContent = 'NOT';
    }
  } else {
    dsm.style.color = null;
    dsm.textContent = `${Math.round(inputParameters.calculations.dsm)}px`;
  }

  for (let index = 0; index < idElement; index++) {
    if (
      isNaN(inputParameters.elements[`element-${index}`]?.nks) ||
      inputParameters.elements[`element-${index}`]?.nks < 0
    ) {
      nks[index].style.color = '#CC0000';
      if (inputParameters.elements[`element-${index}`]?.nks < 0) {
        nks[index].textContent = 'MIN';
      } else {
        nks[index].textContent = 'NOT';
      }
    } else {
      nks[index].style.color = null;
      nks[index].textContent =
        Math.floor(inputParameters.elements[`element-${index}`]?.nks * 10) / 10;
    }

    if (
      isNaN(inputParameters.elements[`element-${index}`]?.irs) ||
      inputParameters.elements[`element-${index}`]?.irs > pageWidth ||
      inputParameters.elements[`element-${index}`]?.irs < 0
    ) {
      irs[index].style.color = '#CC0000';
      if (inputParameters.elements[`element-${index}`]?.irs > pageWidth) {
        irs[index].textContent = 'MAX';
      } else if (inputParameters.elements[`element-${index}`]?.irs < 0) {
        irs[index].textContent = 'MIN';
      } else {
        irs[index].textContent = 'NOT';
      }
    } else {
      irs[index].style.color = null;
      irs[index].textContent = `${Math.round(
        inputParameters.elements[`element-${index}`]?.irs
      )}px`;
    }

    if (
      isNaN(inputParameters.elements[`element-${index}`]?.irr) ||
      inputParameters.elements[`element-${index}`]?.irr > pageWidth ||
      inputParameters.elements[`element-${index}`]?.irr < 0
    ) {
      irr[index].style.color = '#CC0000';
      if (inputParameters.elements[`element-${index}`]?.irr > pageWidth) {
        irr[index].textContent = 'MAX';
      } else if (inputParameters.elements[`element-${index}`]?.irr < 0) {
        irr[index].textContent = 'MIN';
      } else {
        irr[index].textContent = 'NOT';
      }
    } else {
      irr[index].style.color = null;
      irr[index].textContent = `${Math.round(
        inputParameters.elements[`element-${index}`]?.irr
      )}px`;
    }
  }
}

export { inputParameters };
