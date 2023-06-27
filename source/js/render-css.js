import { hasPx } from './utils.js';
import { defaultValues } from './flex-objects.js';

const stylesElement = document.querySelector('.css-styles');

const isDefaultAllItems = (flexItem) => {
  for (const item in defaultValues.items) {
    if (flexItem[item] !== defaultValues.items[item]) {
      return true;
    }
  }
};

const isDefaultValues = (term, property, value) => {
  for (const key in defaultValues[term]) {
    if (property === key && defaultValues[term][key] === (isNaN(value) ? value : +value)) {
      return true;
    }
  }
};

const renderCssParent = (parent) => {
  const propertiesParent = Object.keys(parent);

  stylesElement.innerHTML = '.parent {<br/>';

  propertiesParent.forEach((property) => {
    const value = parent[property];

    if (!isDefaultValues('parent', property, value)) {
      stylesElement.innerHTML += `  ${property}: ${value}${hasPx(property)};<br/>`;
    }
  });

  stylesElement.innerHTML += '}<br/><br/>';
};

const renderCssItems = (items) => {

  const flexItems = Object.keys(items);

  flexItems.forEach((item) => {
    const propertiesElements = Object.keys(items[item]);
    const flexItem = { ...items[item] };

    if (isDefaultAllItems(flexItem)) {
      stylesElement.innerHTML += `.${item} {<br/>`;

      propertiesElements.forEach((property) => {
        const value = items[item][property];

        if (!isDefaultValues('items', property, value) && property !== 'nks' && property !== 'irs' && property !== 'irr') {
          stylesElement.innerHTML += `  ${property}: ${value}${hasPx(property)};<br/>`;
        }
      });

      stylesElement.innerHTML += '}<br/><br/>';
    }
  });
};

const renderCss = ({ parent, items }) => {
  renderCssParent(parent);
  renderCssItems(items);
};

export { renderCss };
