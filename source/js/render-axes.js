const mainAxisText = 'главная ось';
const crossAxisText = 'поперечная ось';
const mainAxisClass = 'main-coord';
const crossAxisClass = 'cross-coord';
const rowReverseClass = 'row-reverse';
const columnReverseClass = 'column-reverse';

const horizontalAxis = document.querySelectorAll('.horizontal-arrow');
const verticalAxis = document.querySelectorAll('.vertical-arrow');

const axesCssAdd = (axes, classNames) => {
  classNames.forEach((className) => axes.forEach((axis) => axis.classList.add(className)));
};

const axesCssRemove = (axes, classNames) => {
  classNames.forEach((className) => axes.forEach((axis) => axis.classList.remove(className)));
};

const renameAxes = (axes, text) => {
  axes.forEach((axis) => {
    const axisText = axis.querySelector('.arrow-title');
    axisText.textContent = text;
  });
};

const renderAxes = (value) => {
  switch (value) {
    case 'row':
      axesCssAdd(horizontalAxis, [mainAxisClass]);
      axesCssRemove(horizontalAxis, [rowReverseClass, crossAxisClass]);
      axesCssAdd(verticalAxis, [crossAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, mainAxisClass]);
      renameAxes(horizontalAxis, mainAxisText);
      renameAxes(verticalAxis, crossAxisText);
      break;
    case 'row-reverse':
      axesCssAdd(horizontalAxis, [rowReverseClass, mainAxisClass]);
      axesCssRemove(horizontalAxis, [crossAxisClass]);
      axesCssAdd(verticalAxis, [crossAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, mainAxisClass]);
      renameAxes(horizontalAxis, mainAxisText);
      renameAxes(verticalAxis, crossAxisText);
      break;
    case 'column':
      axesCssAdd(horizontalAxis, [crossAxisClass]);
      axesCssRemove(horizontalAxis, [rowReverseClass, mainAxisClass]);
      axesCssAdd(verticalAxis, [mainAxisClass]);
      axesCssRemove(verticalAxis, [columnReverseClass, crossAxisClass]);
      renameAxes(horizontalAxis, crossAxisText);
      renameAxes(verticalAxis, mainAxisText);
      break;
    case 'column-reverse':
      axesCssAdd(horizontalAxis, [crossAxisClass]);
      axesCssRemove(horizontalAxis, [columnReverseClass, mainAxisClass]);
      axesCssAdd(verticalAxis, [columnReverseClass, mainAxisClass]);
      axesCssRemove(verticalAxis, [crossAxisClass]);
      renameAxes(horizontalAxis, crossAxisText);
      renameAxes(verticalAxis, mainAxisText);
      break;
  }
};

export { renderAxes };
