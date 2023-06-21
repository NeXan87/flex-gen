import { inputParameters } from './script.js';
import { sumFlexValues } from './utils.js';

// dsm (доля свободного места) = op (оставшееся пространство) / sum(flex-grow-n)
const calcDsm = ({ op }, sumFlexGrow) => Math.abs(op / sumFlexGrow);

// gsfg (cумма всех flex-grow, деленная на gap) = gap / sum(flex-grow-n)
const calcGsfg = ({ gap }, length, sumFlexGrow) => gap * (length - 1) / sumFlexGrow;

// irr (итоговый размер расширения элемента) = (flex-basis - gsfg * flex-grow) + dsm (доля свободного места) * flex-grow
const calcIrr = (items, item, { gsfg, dsm }) => items[item]['flex-basis'] - gsfg * items[item]['flex-grow'] + dsm * items[item]['flex-grow'];

const calcFinalSizeGrow = ({ parent, elements, calculations }) => {
  const sumFlexGrow = sumFlexValues(elements, 'flex-grow');

  inputParameters.calculations.dsm = calcDsm(calculations, sumFlexGrow);
  inputParameters.calculations.gsfg = calcGsfg(parent, elements.length, sumFlexGrow);

  for (const item in elements) {
    inputParameters.elements[item].irr = calcIrr(elements, item, calculations);
  }
};

export { calcFinalSizeGrow };
