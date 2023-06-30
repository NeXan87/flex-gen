import { defaultValues } from './flex-objects.js';
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

const addStylesFlexBox = (parent) => {
  previewElement.style.cssText = `display: flex; ${addStyles(parent)}`;
};

const addStylesFlexItems = (items) => {
  const flexItems = Object.keys(items);
  const flexProperties = Object.keys(defaultValues.items);

  previewElement.innerHTML = '';

  flexItems.forEach((item) => {
    const flexItem = items[item];
    const li = document.createElement('li');

    li.classList.add('preview__item');

    flexProperties.forEach((property) => {
      li.style.cssText += `${property}: ${flexItem[property]}${hasPx(property)}; `;
    });

    renderElement(previewElement, li);
  });
};

const renderFlexBox = ({ parent, items }) => {
  addStylesFlexBox(parent);
  addStylesFlexItems(items);
};

export { renderFlexBox };
