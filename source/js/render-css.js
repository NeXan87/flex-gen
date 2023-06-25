import { hasMinWidth, hasPx } from './utils.js';

const minWidth = 240;

const stylesElement = document.querySelector('.css-styles');

const renderCssParent = (parent) => {
  const propertiesParent = Object.keys(parent);

  stylesElement.innerHTML = '.parent {<br/>';

  propertiesParent.forEach((property) => {
    const value = parent[property];

    if (
      (property === 'display' || property === 'width') ||
      (property === 'gap' && value !== 0) ||
      (property === 'flex-direction' && value !== 'row') ||
      (property === 'flex-wrap' && value !== 'nowrap') ||
      (property === 'justify-content' && value !== 'flex-start') ||
      (property === 'align-items' && value !== 'stretch') ||
      (property === 'align-content' && value !== 'stretch')
    ) {
      stylesElement.innerHTML += `  ${property}: ${hasMinWidth(property, value)}${hasPx(property)};<br/>`;
    }
  });

  stylesElement.innerHTML += '}<br/><br/>';
};


const renderCssElements = (items) => {

  const flexElements = Object.keys(items);

  flexElements.forEach((item) => {
    const propertiesElements = Object.keys(items[item]);
    const flexElement = items[item];

    if (
      flexElement['flex-grow'] !== 0 ||
      flexElement['flex-shrink'] !== 1 ||
      flexElement['flex-basis'] !== 0 ||
      flexElement['order'] !== 0 ||
      flexElement['align-self'] !== 'auto'
    ) {
      stylesElement.innerHTML += `.${item} {<br/>`;

      propertiesElements.forEach((property) => {

        if (
          property !== 'nks' &&
          property !== 'irs' &&
          property !== 'irr' &&
          flexElement[property] !== 0 &&
          flexElement[property] !== 'auto'
        ) {

          stylesElement.innerHTML += `  ${property}: ${flexElement[property]}${hasPx(property)};<br/>`;

        }
      });

      stylesElement.innerHTML += '}<br/><br/>';
    }
  });
};

const renderCss = ({ parent, items }) => {
  renderCssParent(parent);
  renderCssElements(items);
};

export { renderCss, minWidth };
