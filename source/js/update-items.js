import { flexBox } from './flex-objects.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { calcFinalSizeGrow } from './calc-final-size-grow.js';
import { showData } from './show-data.js';
import { renderAxes } from './render-axes.js';
import { renderFlexBox } from './render-flex-box.js';
import { renderCss } from './render-css.js';
import { debounce } from './utils.js';

const updateTime = 500;

const resetCalc = () => {
  flexBox.calculations.op = 0; // op (оставшееся пространство)
  flexBox.calculations.gsfs = 0; // gsfs (cумма всех flex-shrink, деленная на gap)
  flexBox.calculations.spbr = 0; // spbr (сумма произведений базовых размеров)
  flexBox.calculations.dsm = 0; // dsm (доля свободного места)
  flexBox.calculations.gsfg = 0; // gsfg (cумма всех flex-grow, деленная на gap)
};

const updateItems = (object) => {
  resetCalc();
  calcFinalSizeShrink(object);
  calcFinalSizeGrow(object);
  renderAxes(object);
  renderFlexBox(object);
  renderCss(object);
  showData(object);
};

const updateTimeout = debounce((object) => updateItems(object), updateTime);

export { updateItems, updateTimeout };
