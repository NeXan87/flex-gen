import { flexBox } from './flex-objects.js';
import { calcFinalSizeShrink } from './calc-final-size-shrink.js';
import { calcFinalSizeGrow } from './calc-final-size-grow.js';
import { insertCalc } from './insert-calc.js';
import { changeAxes } from './change-axes.js';
import { addStylesPreview } from './add-styles-preview.js';
import { insertCss } from './insert-css.js';
import { debounce } from './utils.js';

const updateTime = 500;

const resetCalc = () => {
  flexBox.calculations.op = 0; // op (оставшееся пространство)
  flexBox.calculations.gsfs = 0; // gsfs (cумма всех flex-shrink, деленная на gap)
  flexBox.calculations.spbr = 0; // spbr (сумма произведений базовых размеров)
  flexBox.calculations.dsm = 0; // dsm (доля свободного места)
  flexBox.calculations.gsfg = 0; // gsfg (cумма всех flex-grow, деленная на gap)
};

const updateAll = (object) => {
  resetCalc();
  calcFinalSizeShrink(object);
  calcFinalSizeGrow(object);
  changeAxes(object);
  addStylesPreview(object);
  insertCss(object);
  insertCalc(object);
};

const updateTimeout = debounce((object) => updateAll(object), updateTime);

export { updateAll, updateTimeout };
