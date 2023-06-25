const textColor = '#CC0000';
const notText = 'NOT';
const maxText = 'MAX';
const minText = 'MIN';
const wopText = 'W=OP';

const opElement = document.querySelector('.op'); // op (оставшееся пространство)
const dsmElement = document.querySelector('.dsm'); // dsm (доля свободного места)
const elementsCollection = document.querySelector('.flex-items').children;

const showItemsData = (htmlElement, { width }, number, unit = '') => {
  if (number <= 0 || number >= width) {
    htmlElement.style.color = textColor;

    if (number < 0) {
      return minText;
    } else if (number > width) {
      return maxText;
    } else if (number === 0) {
      return notText;
    } else if (number === width) {
      return wopText;
    }

  } else {
    htmlElement.style.color = null;
  }

  return number + unit;
};

const showData = ({ parent, elements, calculations }) => {
  opElement.textContent = showItemsData(opElement, parent, calculations.op, 'px');
  dsmElement.textContent = showItemsData(dsmElement, parent, calculations.dsm, 'px');

  for (const element of elementsCollection) {
    const nksElement = element.querySelector('.nks');
    const irsElement = element.querySelector('.irs');
    const irrElement = element.querySelector('.irr');

    nksElement.textContent = showItemsData(nksElement, parent, elements[element.id]['nks']);
    irsElement.textContent = showItemsData(irsElement, parent, elements[element.id]['irs'], 'px');
    irrElement.textContent = showItemsData(irrElement, parent, elements[element.id]['irr'], 'px');
  }
};

export { showData };
