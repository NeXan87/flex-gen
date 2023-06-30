import{flexBox,defaultValues}from"./flex-objects.js";import{updateTimeout}from"./update-items.js";import{debounce}from"./utils.js";const widthInput=document.querySelector("#width"),updateTime=500,updateWidth=e=>{widthInput.value=e},widthTimeout=debounce((e=>updateWidth(e)),500),resizeWindow=e=>{const i=window.innerWidth;let t=0;t=i>1920?1190:i>1240?i-738:i>768?i-410:i-80,widthTimeout(t),flexBox.parent.width=t,defaultValues.minmax["max-width"]=t,defaultValues.minmax["max-flex-basis"]=t,e&&updateTimeout(flexBox)},onWindowResize=()=>resizeWindow(!0),initResizeWindowActions=()=>{resizeWindow(),window.addEventListener("resize",onWindowResize,!1)};export{initResizeWindowActions,resizeWindow};