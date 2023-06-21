const mainAxisText = 'главная ось';
const crossAxisText = 'поперечная ось';
const mainAxisClass = 'main-coord';
const crossAxisClass = 'cross-coord';
const rowReverseClass = 'row-reverse';
const columnReverseClass = 'column-reverse';

const axesElements = document.querySelectorAll('.arrow');
const horizontalAxis = document.querySelectorAll('.horizontal-arrow');
const verticalAxis = document.querySelectorAll('.vertical-arrow');

const renameAxes = () => {
  axesElements.forEach((axis) => {
    const axisText = axis.querySelector('.arrow-title');

    if (axis.classList.contains(mainAxisClass)) {
      axisText.textContent = mainAxisText;
    }
    if (axis.classList.contains(crossAxisClass)) {
      axisText.textContent = crossAxisText;
    }
  });
};

const axesCssAdd = (axes, classNames) => {
  classNames.forEach((className) => axes.forEach((axis) => axis.classList.add(className)));
  renameAxes();
};

const axesCssRemove = (axes, classNames) => {
  classNames.forEach((className) => axes.forEach((axis) => axis.classList.remove(className)));
  renameAxes();
};

const renderAxes = (value) => {
  switch (value) {
    case 'row':
      axesCssAdd(horizontalAxis, [mainAxisClass]);
      axesCssRemove(horizontalAxis, [rowReverseClass, crossAxisClass]);
      axesCssAdd(verticalAxis, [crossAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, mainAxisClass]);
      break;
    case 'row-reverse':
      axesCssAdd(horizontalAxis, [rowReverseClass, mainAxisClass]);
      axesCssRemove(horizontalAxis, [crossAxisClass]);
      axesCssAdd(verticalAxis, [crossAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, mainAxisClass]);
      break;
    case 'column':
      axesCssAdd(horizontalAxis, [crossAxisClass]);
      axesCssRemove(horizontalAxis, [rowReverseClass, mainAxisClass]);
      axesCssAdd(verticalAxis, [mainAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, crossAxisClass]);
      break;
    case 'column-reverse':
      axesCssAdd(horizontalAxis, [crossAxisClass]);
      axesCssRemove(horizontalAxis, [columnReverseClass, mainAxisClass]);
      axesCssAdd(verticalAxis, [columnReverseClass, mainAxisClass]);
      axesCssRemove(verticalAxis, [crossAxisClass]);
      break;
  }
};

export { renderAxes };
