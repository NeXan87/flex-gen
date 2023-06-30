import{flexBox,defaultValues}from"./flex-objects.js";import{updateTimeout,updateAll}from"./update-items.js";import{removeItem}from"./remove-item.js";import{getData}from"./get-data.js";import{renderElement,switchesButtonState}from"./utils.js";const elementName="Элемент",elementNameEn="item",primaryLoadItems=2,maxItems=15,nonRemovableItems=2;let countItems=1;const parentElement=document.querySelector(".parameters__fields--parent"),addItemButton=document.querySelector(".button--add-item"),flexContainer=document.querySelector(".parameters__items"),itemTemplate=document.querySelector("#item").content.querySelector(".parameters__fields--item"),removeButtonTemplate=document.querySelector("#remove-button").content.querySelector(".button--remove-item"),onFieldsInput=e=>{getData(e.target)},onRemoveButtonClick=e=>{removeItem(e),countItems--},setItemData=e=>{flexBox.items[e]={...defaultValues.items}},setAttributes=(e,t)=>{e.forEach((e=>{e.setAttribute(t,`${e.getAttribute(t)}-${countItems}`)}))},addItem=({parent:{width:e}},t)=>{const o=itemTemplate.cloneNode(!0),m=removeButtonTemplate.cloneNode(!0),n=o.querySelector(".parameters__title--item"),r=o.querySelector(".parameters__title-text--item"),l=o.querySelectorAll(".parameters__label"),a=o.querySelectorAll(".field");var i;setAttributes(l,"for"),setAttributes(a,"id"),o.id=`item-${countItems}`,r.textContent=`Элемент ${countItems}`,a.forEach((t=>{"flex-basis"===t.name&&(t.placeholder=`0-${e}px`),t.addEventListener("input",onFieldsInput)})),countItems>2&&(renderElement(n,m),m.addEventListener("click",onRemoveButtonClick)),renderElement(flexContainer,o),i=`item-${countItems}`,flexBox.items[i]={...defaultValues.items},t&&updateTimeout(flexBox),countItems++},onAddItemButtonClick=()=>{15===countItems&&switchesButtonState(addItemButton),addItem(flexBox,!0)},initParentActions=({parent:{width:e}})=>{parentElement.querySelectorAll(".field").forEach((t=>{"width"===t.name&&(t.placeholder=`240-${e}px`,t.value=e),t.addEventListener("input",onFieldsInput)}))},initAddItemActions=()=>{initParentActions(flexBox),addItemButton.addEventListener("click",onAddItemButtonClick);for(let e=1;e<=2;e++)addItem(flexBox),2===e&&updateAll(flexBox)};export{initAddItemActions,elementName,elementNameEn};