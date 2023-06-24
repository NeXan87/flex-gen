const opElement = document.querySelector('.op'); // op (оставшееся пространство)
const dsmElement = document.querySelector('.dsm'); // dsm (доля свободного места)
const elementsCollection = document.querySelector('.flex-items').children;

const removeZeros = (number) => String(number).replace(/[,.]?0+$/, '');

const showOp = ({ width }, { op }) => {
  if (op === width) {
    opElement.style.color = '#CC0000';
    opElement.textContent = 'W=OP';
  } else {
    opElement.style.color = null;
    opElement.textContent = `${op}px`;
  }
};

const showDsm = ({ width }, { dsm }) => {
  if (dsm < 0 || dsm === width) {
    dsmElement.style.color = '#CC0000';

    if (dsm < 0) {
      dsmElement.textContent = 'MIN';
    } else if (dsm === width) {
      dsmElement.textContent = 'NOT';
    }

  } else {
    dsmElement.style.color = null;
    dsmElement.textContent = `${Math.round(dsm)}px`;
  }
};

const showNks = (element, idElement, elements) => {
  const nksElement = element.querySelector('.nks');

  if (elements[idElement].nks < 0) {
    nksElement.style.color = '#CC0000';

    if (elements[idElement].nks < 0) {
      nksElement.textContent = 'MIN';
    } else {
      nksElement.textContent = 'NOT';
    }

  } else {
    nksElement.style.color = null;
    nksElement.textContent = removeZeros(elements[idElement].nks);
  }
};

const showIrs = ({ width }, element, idElement, elements) => {
  const irsElement = element.querySelector('.irs');

  if (elements[idElement].irs > width || elements[idElement].irs < 0) {
    irsElement.style.color = '#CC0000';

    if (elements[idElement].irs > width) {
      irsElement.textContent = 'MAX';
    } else if (elements[idElement].irs < 0) {
      irsElement.textContent = 'MIN';
    } else {
      irsElement.textContent = 'NOT';
    }

  } else {
    irsElement.style.color = null;
    irsElement.textContent = `${removeZeros(elements[idElement].irs)}px`;
  }
};

const showIrr = ({ width }, element, idElement, elements) => {
  const irrElement = element.querySelector('.irr');

  if (elements[idElement].irr > width || elements[idElement].irr < 0) {
    irrElement.style.color = '#CC0000';

    if (elements[idElement].irr > width) {
      irrElement.textContent = 'MAX';
    } else if (elements[idElement].irr < 0) {
      irrElement.textContent = 'MIN';
    } else {
      irrElement.textContent = 'NOT';
    }

  } else {
    irrElement.style.color = null;
    irrElement.textContent = `${removeZeros(elements[idElement].irr)}px`;
  }
};


const showData = ({ parent, elements, calculations }) => {
  showOp(parent, calculations);
  showDsm(parent, calculations);

  for (const element of elementsCollection) {
    const idElement = element.getAttribute('id');

    showNks(element, idElement, elements);
    showIrs(parent, element, idElement, elements);
    showIrr(parent, element, idElement, elements);
  }
};

export { showData };
