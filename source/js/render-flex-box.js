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

function renderFlexElements(elements) {
  const flexElements = Object.keys(elements);

  preview.innerHTML = '';

  flexElements.forEach((element) => {
    const flexElement = elements[element];
    const li = document.createElement('li');
    li.classList.add('flexbox-item');
    li.style.cssText = `align-self: ${flexElement['align-self']};
											  flex-grow: ${flexElement['flex-grow']};
											  flex-shrink: ${flexElement['flex-shrink']};
											  order: ${flexElement['order']};
											  ${hasFlexBasis(flexElement['flex-basis'])}`;
    preview.append(li);
  });
}

const renderFlexBox = ({ parent, elements }) => {
  renderFlexContainer(parent);
  renderFlexElements(elements);
};

export { renderFlexBox };
