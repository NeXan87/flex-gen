const mainAxisText = 'главная ось';
const crossAxisText = 'поперечная ось';
const mainAxisClass = 'axis--main';
const crossAxisClass = 'axis--cross';
const rowReverseClass = 'axis--row-reverse';
const columnReverseClass = 'axis--column-reverse';

const axesElements = document.querySelectorAll('.axis');

const renameAxes = () => {
  axesElements.forEach((axis) => {
    const axisText = axis.querySelector('.axis__text');

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
    if (axis.classList.contains('axis--horizontal')) {
      axis.classList.add(...cssHorizontal);
    } else {
      axis.classList.add(...cssVertical);
    }
  });

  renameAxes();
};

const removeCssAxes = (cssHorizontal, cssVertical) => {
  axesElements.forEach((axis) => {
    if (axis.classList.contains('axis--horizontal')) {
      axis.classList.remove(...cssHorizontal);
    } else {
      axis.classList.remove(...cssVertical);
    }
  });

  renameAxes();
};

const renderAxes = ({ parent: { 'flex-direction': flexDirection } }) => {
  switch (flexDirection) {
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
