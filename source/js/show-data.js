const opElement = document.querySelector('.op'); // op (оставшееся пространство)
const dsmElement = document.querySelector('.dsm'); // dsm (доля свободного места)
const elementsCollection = document.querySelector('.flex-items').children;

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

const showNks = (nksElement, items, item) => {
  if (items[item].nks < 0) {
    nksElement.style.color = '#CC0000';

    if (items[item].nks < 0) {
      nksElement.textContent = 'MIN';
    } else {
      nksElement.textContent = 'NOT';
    }

  } else {
    nksElement.style.color = null;
    nksElement.textContent = items[item].nks;
  }
};

const showIrs = (irsElement, items, item) => {
  if (items[item].irs < 0) {
    irsElement.style.color = '#CC0000';
  } else {
    irsElement.style.color = null;
  }
  irsElement.textContent = `${items[item].irs}px`;
};

const showIrr = (irrElement, items, item) => {
  if (items[item].irr < 0) {
    irrElement.style.color = '#CC0000';
  } else {
    irrElement.style.color = null;
  }
  irrElement.textContent = `${items[item].irr}px`;
};


const showData = ({ parent, elements, calculations }) => {
  showOp(parent, calculations);
  showDsm(parent, calculations);

  for (const element of elementsCollection) {
    const item = element.getAttribute('id');
    const nksElement = element.querySelector('.nks');
    const irsElement = element.querySelector('.irs');
    const irrElement = element.querySelector('.irr');

    showNks(nksElement, elements, item);
    showIrs(irsElement, elements, item);
    showIrr(irrElement, elements, item);
  }
};

export { showData };
