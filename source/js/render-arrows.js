const horizontalArrows = document.querySelectorAll('.horizontal-arrow');
const verticalArrows = document.querySelectorAll('.vertical-arrow');

const arrowsCssAdd = (arrows, classNames) => {
  classNames.forEach((className) => arrows.forEach((arrow) => arrow.classList.add(className)));
};

const arrowsCssRemove = (arrows, classNames) => {
  classNames.forEach((className) => arrows.forEach((arrow) => arrow.classList.remove(className)));
};

const renameArrows = (arrows, text) => {
  arrows.forEach((arrow) => {
    const arrowText = arrow.querySelector('.arrow-title');
    arrowText.textContent = text;
  });
};

const renderArrows = (value) => {
  switch (value) {
    case 'row':
      arrowsCssAdd(horizontalArrows, ['main-coord']);
      arrowsCssRemove(horizontalArrows, ['row-reverse', 'cross-coord']);
      arrowsCssAdd(verticalArrows, ['cross-coord']);
      arrowsCssRemove(verticalArrows, ['column-reverse', 'main-coord']);
      renameArrows(horizontalArrows, 'главная ось');
      renameArrows(verticalArrows, 'поперечная ось');
      break;
    case 'row-reverse':
      arrowsCssAdd(horizontalArrows, ['row-reverse', 'main-coord']);
      arrowsCssRemove(horizontalArrows, ['cross-coord']);
      arrowsCssAdd(verticalArrows, ['cross-coord']);
      arrowsCssRemove(verticalArrows, ['column-reverse', 'main-coord']);
      renameArrows(horizontalArrows, 'главная ось');
      renameArrows(verticalArrows, 'поперечная ось');
      break;
    case 'column':
      arrowsCssAdd(horizontalArrows, ['cross-coord']);
      arrowsCssRemove(horizontalArrows, ['row-reverse', 'main-coord']);
      arrowsCssAdd(verticalArrows, ['main-coord']);
      arrowsCssRemove(verticalArrows, ['column-reverse', 'cross-coord']);
      renameArrows(horizontalArrows, 'поперечная ось');
      renameArrows(verticalArrows, 'главная ось');
      break;
    case 'column-reverse':
      arrowsCssAdd(horizontalArrows, ['cross-coord']);
      arrowsCssRemove(horizontalArrows, ['column-reverse', 'main-coord']);
      arrowsCssAdd(verticalArrows, ['column-reverse', 'main-coord']);
      arrowsCssRemove(verticalArrows, ['cross-coord']);
      renameArrows(horizontalArrows, 'поперечная ось');
      renameArrows(verticalArrows, 'главная ось');
      break;
  }
};

export { renderArrows };
