import { inputParameters } from './script.js';

const resetCalc = () => {
  inputParameters.calculations.op = 0; // op (оставшееся пространство)
  inputParameters.calculations.gsfs = 0; // gsfs (cумма всех flex-shrink, деленная на gap)
  inputParameters.calculations.spbr = 0; // spbr (сумма произведений базовых размеров)
};

// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
const calcOp = ({ width }, items) => {
  let sumFlexBasis = 0;

  for (const item in items) {
    sumFlexBasis += items[item]['flex-basis'];
  }

  return width - sumFlexBasis;
};

// gsfs (cумма всех flex-shrink, деленная на gap) = (gap * (кол-во элементов - 1)) / (flex-shrink-1 + ... flex-shrink-n)
const calcGsfs = ({ gap }, items) => {
  let sumFlexShrink = 0;

  for (const item in items) {
    sumFlexShrink += items[item]['flex-shrink'];
  }

  const gsfs = gap * (items.length - 1) / sumFlexShrink;

  return isFinite(gsfs) ? gsfs : 0;
};

// spbr (сумма произведений базовых размеров) = ((flex-basis-1 + gsfs) * flex-shrink-1) + ... + ((flex-basis-n + gsfs) * flex-shrink-n)
const calcSpbr = (items, { gsfs, spbr }) => {
  for (const item in items) {
    spbr += ((items[item]['flex-basis'] + gsfs) * (items[item]['flex-shrink']));
  }

  return spbr;
};

// nks (нормированный коэффициент сжатия элемента) = (flex-basis + gsfs * flex-shrink) * flex-shrink / spbr (сумма произведений базовых размеров)
const calcNks = (items, item, { gsfs, spbr }) => (((items[item]['flex-basis'] || 0) + gsfs * (items[item]['flex-shrink'])) * (items[item]['flex-shrink'])) / spbr;

// irs (итоговый размер после сжатия элемента) = (flex-basis - gsfs * flex-shrink) / кол-во элементов) - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство)
const calcIrs = (items, item, { gsfs, op }) => (items[item]['flex-basis']) - gsfs * (items[item]['flex-shrink']) - Math.abs(items[item].nks * op);

const calcFinalSizeShrink = ({ parent, elements, calculations }) => {
  resetCalc();
  inputParameters.calculations.op = calcOp(parent, elements);
  inputParameters.calculations.gsfs = calcGsfs(parent, elements);
  inputParameters.calculations.spbr = calcSpbr(elements, calculations);

  for (const item in elements) {
    inputParameters.elements[item].nks = calcNks(elements, item, calculations);
    inputParameters.elements[item].irs = calcIrs(elements, item, calculations);
  }
};

export { calcFinalSizeShrink };
