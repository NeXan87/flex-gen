import { inputParameters } from './script.js';
import { sumFlexValues } from './utils.js';

// dsm (доля свободного места) = op (оставшееся пространство) / sum(flex-grow-n)
const calcDsm = ({ op }, sumFlexGrow) => op / sumFlexGrow;

// gsfg (cумма всех flex-grow, деленная на gap) = gap / sum(flex-grow-n)
const calcGsfg = ({ gap }, length, sumFlexGrow) => gap * (length - 1) / sumFlexGrow;

// irr (итоговый размер расширения элемента) = (flex-basis - gsfg * flex-grow) + dsm (доля свободного места) * flex-grow
const calcIrr = (item, { gsfg, dsm }) => item['flex-basis'] - gsfg * item['flex-grow'] + dsm * item['flex-grow'];

const calcFinalSizeGrow = ({ parent, elements, calculations }) => {
  const sumFlexGrow = sumFlexValues(elements, 'flex-grow');

  inputParameters.calculations.dsm = parseFloat(calcDsm(calculations, sumFlexGrow).toFixed(1));
  inputParameters.calculations.gsfg = calcGsfg(parent, elements.length, sumFlexGrow);

  for (const item in elements) {
    inputParameters.elements[item].irr = parseFloat(calcIrr(elements[item], calculations).toFixed(1));
  }
};

export { calcFinalSizeGrow };
