import { inputParameters } from './script.js';

const resetCalc = () => {
  inputParameters.calculations.op = 0;
  inputParameters.calculations.gsfs = 0;
  inputParameters.calculations.spbr = 0;
};

const calcOp = (parent, items) => {
  // op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
  const boxWidth = parent.width;
  let sumFlexBasis = 0;

  for (const item in items) {
    sumFlexBasis += items[item]['flex-basis'];
  }

  return boxWidth - sumFlexBasis;
};

const calcGsfs = (parent, items) => {
  // gsfs (cумма всех flex-shrink, деленная на gap) = (gap * (кол-во элементов - 1)) / (flex-shrink-1 + ... flex-shrink-n)
  const sumGap = parent.gap * (items.length - 1);
  let sumFlexShrink = 0;

  for (const item in items) {
    sumFlexShrink += items[item]['flex-shrink'];
  }

  const gsfs = sumGap / sumFlexShrink;

  return isFinite(gsfs) ? gsfs : 0;
};

const calcSpbr = (items, calculations) => {
  // spbr (сумма произведений базовых размеров) = ((flex-basis-1 + gsfs) * flex-shrink-1) + ... + ((flex-basis-n + gsfs) * flex-shrink-n)
  const gsfs = calculations.gsfs;
  let spbr = calculations.spbr;

  for (const item in items) {
    spbr += ((items[item]['flex-basis'] + gsfs) * (items[item]['flex-basis']));
  }

  return spbr;
};

const calcNks = (items, item, calculations) =>
  // nks (нормированный коэффициент сжатия элемента) = (flex-basis + gsfs * flex-shrink) * flex-shrink / spbr (сумма произведений базовых размеров)
  (((items[item]['flex-basis'] || 0) + calculations.gsfs * (items[item]['flex-shrink'])) * (items[item]['flex-shrink'])) / calculations.spbr;

const calcIrs = (items, item, calculations) =>
  // irs (итоговый размер после сжатия элемента) = (flex-basis - gsfs * flex-shrink) / кол-во элементов) - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство)
  (items[item]['flex-basis']) - calculations.gsfs * (items[item]['flex-shrink']) - Math.abs(items[item].nks * calculations.op);

const calcFinalSizeShrink = ({ parent, elements, calculations }) => {
  resetCalc();
  inputParameters.calculations.op = calcOp(parent, elements);
  inputParameters.calculations.gsfs = calcGsfs(parent, elements);
  inputParameters.calculations.spbr = calcSpbr(elements, calculations);

  for (const item in inputParameters.elements) {
    inputParameters.elements[item].nks = calcNks(elements, item, calculations);
    inputParameters.elements[item].irs = calcIrs(elements, item, calculations);
  }
  console.log(inputParameters.elements);
};

export { calcFinalSizeShrink };
