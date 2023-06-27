import { flexBox } from './flex-objects.js';
import { sumFlexValues } from './utils.js';

// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
const calcOp = ({ width }, sumFlexBasis) => width - sumFlexBasis;

// gsfs (cумма всех flex-shrink, деленная на gap) = (gap * (кол-во элементов - 1)) / (flex-shrink-1 + ... flex-shrink-n)
const calcGsfs = ({ gap }, length, sumFlexShrink) => gap * (length - 1) / sumFlexShrink;

// spbr (сумма произведений базовых размеров) = ((flex-basis-1 + gsfs) * flex-shrink-1) + ... + ((flex-basis-n + gsfs) * flex-shrink-n)
const calcSpbr = (items, { gsfs, spbr }) => {
  for (const item in items) {
    spbr += ((items[item]['flex-basis'] + gsfs) * (items[item]['flex-shrink']));
  }

  return spbr;
};

// nks (нормированный коэффициент сжатия элемента) = (flex-basis + gsfs * flex-shrink) * flex-shrink / spbr (сумма произведений базовых размеров)
const calcNks = (item, { gsfs, spbr }) => (((item['flex-basis'] || 0) + gsfs * (item['flex-shrink'])) * (item['flex-shrink'])) / (spbr ? spbr : 1);

// irs (итоговый размер после сжатия элемента) = (flex-basis - gsfs * flex-shrink) / кол-во элементов) - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство)
const calcIrs = (item, { gsfs, op }) => (item['flex-basis']) - gsfs * (item['flex-shrink']) - Math.abs(item.nks * op);

const calcFinalSizeShrink = ({ parent, items, calculations }) => {
  const sumFlexShrink = sumFlexValues(items, 'flex-shrink');
  const sumFlexBasis = sumFlexValues(items, 'flex-basis');

  flexBox.calculations.op = calcOp(parent, sumFlexBasis);
  flexBox.calculations.gsfs = calcGsfs(parent, items.length, sumFlexShrink);
  flexBox.calculations.spbr = calcSpbr(items, calculations);

  for (const item in items) {
    flexBox.items[item].nks = parseFloat(calcNks(items[item], calculations).toFixed(3));
    flexBox.items[item].irs = parseFloat(calcIrs(items[item], calculations).toFixed(1));
  }
};

export { calcFinalSizeShrink };
