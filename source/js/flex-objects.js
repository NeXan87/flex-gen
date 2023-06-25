const flexBox = {
  parent: {
    'display': 'flex',
    'width': document.querySelector('#width').value,
    'gap': document.querySelector('#gap').value,
    'flex-direction': document.querySelector('#flex-direction').value,
    'flex-wrap': document.querySelector('#flex-wrap').value,
    'justify-content': document.querySelector('#justify-content').value,
    'align-items': document.querySelector('#align-items').value,
    'align-content': document.querySelector('#align-content').value,
  },
  items: {},
  calculations: {
    op: 0, // op (оставшееся пространство)
    gsfs: 0, // gsfs (cумма всех flex-shrink, деленная на gap)
    spbr: 0, // spbr (сумма произведений базовых размеров)
  },
};

const flexItem = {
  'flex-grow': 0,
  'flex-shrink': 1,
  'flex-basis': 0,
  'order': 0,
  'align-self': 'auto',
};

export { flexBox, flexItem };
