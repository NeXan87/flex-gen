import { hasPx } from './utils.js';

const preview = document.querySelector('.preview-box');

const addStyles = (parent) => {
  const properties = Object.keys(parent);
  let css = '';

  properties.forEach((property) => {
    const value = parent[property];
    css += `${property}: ${value}${hasPx(property)}; `;
  });

  return css;
};

const hasFlexBasis = (value) => value !== 0 ? `flex-basis: ${value}px;` : false;

const renderFlexContainer = (parent) => {
  preview.style.cssText = `display: flex; ${addStyles(parent)}`;
};

const renderFlexItems = (items) => {
  const flexItems = Object.keys(items);

  preview.innerHTML = '';

  flexItems.forEach((item) => {
    const flexItem = items[item];
    const li = document.createElement('li');

    li.classList.add('flexbox-item');
    li.style.cssText = `align-self: ${flexItem['align-self']};
											  flex-grow: ${flexItem['flex-grow']};
											  flex-shrink: ${flexItem['flex-shrink']};
											  order: ${flexItem['order']};
											  ${hasFlexBasis(flexItem['flex-basis'])}`;
    preview.append(li);
  });
};

const renderFlexBox = ({ parent, items }) => {
  renderFlexContainer(parent);
  renderFlexItems(items);
};

export { renderFlexBox };
