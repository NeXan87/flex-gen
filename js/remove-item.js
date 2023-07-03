import{flexBox}from"./flex-objects.js";import{elementNameRu,elementNameEn,decreaseCount}from"./item-actions.js";import{updateTimeout}from"./update-items.js";import{switchesButtonState,setNameItem,renderElement}from"./utils.js";const regExp=/-|[0-9]/g,addItemButton=document.querySelector(".button--add-item"),removeButtonTemplate=document.querySelector("#remove-button").content.querySelector(".button--remove-item"),renameAttributes=(e,t,o)=>{e.forEach((e=>e.setAttribute(t,`${e.getAttribute(t).replace(regExp,"")}-${o+1}`)))},reCalcNumbersItems=()=>{const e=document.querySelectorAll(".parameters__fields--item"),t=document.querySelectorAll(".parameters__title-text--item"),o=Object.keys(flexBox.items),m={};e.forEach(((e,t)=>{e.id=setNameItem(elementNameEn,"-",t,1);const o=e.querySelectorAll(".parameters__label"),m=e.querySelectorAll(".field");renameAttributes(o,"for",t),renameAttributes(m,"id",t)})),t.forEach(((e,t)=>{e.textContent=setNameItem(elementNameRu," ",t,1)})),o.forEach(((e,t)=>{m[setNameItem(elementNameEn,"-",t,1)]={...flexBox.items[e]},delete flexBox.items[e]})),flexBox.items={...m}},removeItem=e=>{const t=e.target.closest(".parameters__title--item").parentNode,o=t.id;delete flexBox.items[o],t.remove(),addItemButton.disabled&&switchesButtonState(addItemButton),reCalcNumbersItems(),updateTimeout(flexBox)},onRemoveButtonClick=e=>{e.stopPropagation(),removeItem(e),decreaseCount()},addRemoveButton=e=>{const t=removeButtonTemplate.cloneNode(!0);renderElement(e,t),t.addEventListener("click",onRemoveButtonClick)};export{addRemoveButton};