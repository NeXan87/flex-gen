const textColor = '#CC0000';
const notText = 'NOT';
const maxText = 'MAX';
const minText = 'MIN';

const opElement = document.querySelector('.parameters__op'); // op (оставшееся пространство)
const dsmElement = document.querySelector('.parameters__dsm'); // dsm (доля свободного места)

const isErrorData = (htmlElement, { width }, number, unit = '') => {
  if (number <= 0 || number >= width) {
    htmlElement.style.color = textColor;

    if (number < 0) {
      return minText;
    } else if (number >= width) {
      return maxText;
    } else if (number === 0) {
      return notText;
    }

  } else {
    htmlElement.style.color = null;
  }

  return number + unit;
};

const insertCalc = ({ parent, items, calculations }) => {
  const fieldsetElements = document.querySelectorAll('.parameters__fields--item');

  opElement.textContent = isErrorData(opElement, parent, calculations.op, 'px');
  dsmElement.textContent = isErrorData(dsmElement, parent, calculations.dsm, 'px');

  fieldsetElements.forEach((element) => {
    const nksElement = element.querySelector('.parameters__nks');
    const irsElement = element.querySelector('.parameters__irs');
    const irrElement = element.querySelector('.parameters__irr');

    nksElement.textContent = isErrorData(nksElement, parent, items[element.id]['nks']);
    irsElement.textContent = isErrorData(irsElement, parent, items[element.id]['irs'], 'px');
    irrElement.textContent = isErrorData(irrElement, parent, items[element.id]['irr'], 'px');
  });
};

export { insertCalc };
