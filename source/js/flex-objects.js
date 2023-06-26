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

const defaultValues = {
  parent: {
    'gap': 0,
    'flex-direction': 'row',
    'flex-wrap': 'nowrap',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'align-content': 'stretch',
  },
  items: {
    'flex-grow': 0,
    'flex-shrink': 1,
    'flex-basis': 0,
    'order': 0,
    'align-self': 'auto',
  },
  minmax: {
    'min-width': 240,
    'max-width': 768, // присваивается после resizeWindow()
    'min-gap': 0,
    'max-gap': 100,
    'min-flex-grow': 0,
    'max-flex-grow': 10,
    'min-flex-shrink': 0,
    'max-flex-shrink': 10,
    'min-flex-basis': 0,
    'max-flex-basis': 768, // присваивается после resizeWindow()
    'min-order': -20,
    'max-order': 20,
  }
};

export { flexBox, defaultValues };
