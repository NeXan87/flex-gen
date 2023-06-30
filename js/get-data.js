import{flexBox,defaultValues}from"./flex-objects.js";import{updateTimeout}from"./update-items.js";import{debounce}from"./utils.js";const validateTime=500,regEx=/^0+(0$|[1-9])/gm,validateTimeout=debounce(((e,t)=>сhangeValuesInputs(e,t)),500),setData=(e,t,a)=>{"parent"===e?flexBox[e][t]=a:flexBox.items[e][t]=a,updateTimeout(flexBox)},сhangeValueInput=(e,t)=>{e.value=t},validate=(e,t,a)=>{const u=document.querySelector(`#${e}`).querySelector(`[name='${t}']`),o=defaultValues.minmax[`min-${t}`],l=defaultValues.minmax[`max-${t}`];a=a.length?a:"0","number"==typeof(a=isNaN(a)?a:parseInt(a.replace(regEx,"$1"),10))&&(a<o?(validateTimeout(u,o),a=o):a>l?(validateTimeout(u,l),a=l):validateTimeout(u,a)),setData(e,t,a)};function сhangeValuesInputs(e,t){сhangeValueInput(e,t)}const getData=e=>{const t=e.parentNode.id,{name:a,value:u}=e;validate(t,a,u)};export{getData};