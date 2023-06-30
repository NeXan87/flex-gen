import { hasPx } from './utils.js';
import { defaultValues } from './flex-objects.js';

const stylesElement = document.querySelector('.css__wrapper');
const cssSelector = 'css__selector';
const cssName = 'css__class';
const cssDeclaration = 'css__declaration';
const cssProperty = 'css__property';
const cssBracket = 'css__bracket';
const cssUnion = 'css__union';

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

const renderSelector = (element, selector) => {
  element.innerHTML += `<span class=${cssSelector}>.<span class=${cssName}>${selector}</span> {</span>`;
};

const renderDeclaration = (element, property, value) => {
  element.innerHTML += `<span class=${cssDeclaration}><span class=${cssProperty}>${property}</span>: ${value}<span class=${cssUnion}>${hasPx(property)}</span>;</span>`;
};

const renderBracket = (element) => {
  element.innerHTML += `<span class=${cssBracket}>}</span>`;
};

const getCssParent = (parent) => {
  const propertiesParent = Object.keys(parent);

  stylesElement.innerHTML = '';
  renderSelector(stylesElement, 'parent');

  propertiesParent.forEach((property) => {
    const value = parent[property];

    if (!isDefaultValues('parent', property, value)) {
      renderDeclaration(stylesElement, property, value);
    }
  });

  renderBracket(stylesElement);
};

const getCssItems = (items) => {

  const flexItems = Object.keys(items);

  flexItems.forEach((item) => {
    const propertiesElements = Object.keys(items[item]);
    const flexItem = items[item];

    if (isDefaultAllItems(flexItem)) {
      renderSelector(stylesElement, item);

      propertiesElements.forEach((property) => {
        const value = items[item][property];

        if (!isDefaultValues('items', property, value) && property !== 'nks' && property !== 'irs' && property !== 'irr') {
          renderDeclaration(stylesElement, property, value);
        }
      });

      renderBracket(stylesElement);
    }
  });
};

const insertCss = ({ parent, items }) => {
  getCssParent(parent);
  getCssItems(items);
};

export { insertCss };
