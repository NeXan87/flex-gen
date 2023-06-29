const textColor = '#CC0000';
const notText = 'NOT';
const maxText = 'MAX';
const minText = 'MIN';

const opElement = document.querySelector('.parameters__op'); // op (оставшееся пространство)
const dsmElement = document.querySelector('.parameters__dsm'); // dsm (доля свободного места)

const showItemsData = (htmlElement, { width }, number, unit = '') => {
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

const showData = ({ parent, items, calculations }) => {
  const fieldsetElements = document.querySelectorAll('.parameters__fields--item');

  opElement.textContent = showItemsData(opElement, parent, calculations.op, 'px');
  dsmElement.textContent = showItemsData(dsmElement, parent, calculations.dsm, 'px');

  fieldsetElements.forEach((element) => {
    const nksElement = element.querySelector('.parameters__nks');
    const irsElement = element.querySelector('.parameters__irs');
    const irrElement = element.querySelector('.parameters__irr');

    nksElement.textContent = showItemsData(nksElement, parent, items[element.id]['nks']);
    irsElement.textContent = showItemsData(irsElement, parent, items[element.id]['irs'], 'px');
    irrElement.textContent = showItemsData(irrElement, parent, items[element.id]['irr'], 'px');
  });
};

export { showData };
