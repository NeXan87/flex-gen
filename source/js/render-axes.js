const mainAxisText = 'главная ось';
const crossAxisText = 'поперечная ось';
const mainAxisClass = 'main-coord';
const crossAxisClass = 'cross-coord';
const rowReverseClass = 'row-reverse';
const columnReverseClass = 'column-reverse';

const axesElements = document.querySelectorAll('.arrow');

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

const addCssAxes = (cssHorizontal, cssVertical) => {
  axesElements.forEach((axis) => {
    if (axis.classList.contains('horizontal-arrow')) {
      axis.classList.add(...cssHorizontal);
    } else {
      axis.classList.add(...cssVertical);
    }
  });

  renameAxes();
};

const removeCssAxes = (cssHorizontal, cssVertical) => {
  axesElements.forEach((axis) => {
    if (axis.classList.contains('horizontal-arrow')) {
      axis.classList.remove(...cssHorizontal);
    } else {
      axis.classList.remove(...cssVertical);
    }
  });

  renameAxes();
};

const renderAxes = (value) => {
  switch (value) {
    case 'row':
      addCssAxes([mainAxisClass], [crossAxisClass]);
      removeCssAxes([rowReverseClass, crossAxisClass], [columnReverseClass, mainAxisClass]);
      break;
    case 'row-reverse':
      addCssAxes([rowReverseClass, mainAxisClass], [crossAxisClass]);
      removeCssAxes([crossAxisClass], [columnReverseClass, mainAxisClass]);
      break;
    case 'column':
      addCssAxes([crossAxisClass], [mainAxisClass]);
      removeCssAxes([rowReverseClass, mainAxisClass], [columnReverseClass, crossAxisClass]);
      break;
    case 'column-reverse':
      addCssAxes([crossAxisClass], [columnReverseClass, mainAxisClass]);
      removeCssAxes([columnReverseClass, mainAxisClass], [crossAxisClass]);
      break;
  }
};

export { renderAxes };
