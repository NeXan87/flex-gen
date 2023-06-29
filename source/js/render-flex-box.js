import { hasPx, renderElement } from './utils.js';

const previewElement = document.querySelector('.preview__list');

const addStyles = (parent, css = '') => {
  const properties = Object.keys(parent);

  properties.forEach((property) => {
    const value = parent[property];
    css += `${property}: ${value}${hasPx(property)}; `;
  });

  return css;
};

const hasFlexBasis = (value) => value !== 0 ? `flex-basis: ${value}px;` : false;

const addStylesFlexBox = (parent) => {
  previewElement.style.cssText = `display: flex; ${addStyles(parent)}`;
};

const renderFlexItems = (items) => {
  const flexItems = Object.keys(items);

  previewElement.innerHTML = '';

  flexItems.forEach((item) => {
    const flexItem = items[item];
    const li = document.createElement('li');

    li.classList.add('preview__item');
    li.style.cssText = `align-self: ${flexItem['align-self']};
											  flex-grow: ${flexItem['flex-grow']};
											  flex-shrink: ${flexItem['flex-shrink']};
											  order: ${flexItem['order']};
											  ${hasFlexBasis(flexItem['flex-basis'])}`;

    renderElement(previewElement, li);
  });
};

const renderFlexBox = ({ parent, items }) => {
  addStylesFlexBox(parent);
  renderFlexItems(items);
};

export { renderFlexBox };
