const loadedTimeout=500,preloaderElement=document.querySelector(".preloader"),toggleClasses=()=>{preloaderElement.classList.add("preloader--hiding"),window.setTimeout((()=>{preloaderElement.classList.add("preloader--loaded"),preloaderElement.classList.remove("preloader--hiding")}),500)},onWindowLoad=()=>(preloaderElement.classList.add("preloader--hiding"),void window.setTimeout((()=>{preloaderElement.classList.add("preloader--loaded"),preloaderElement.classList.remove("preloader--hiding")}),500)),initPreloaderActions=()=>window.addEventListener("load",onWindowLoad);export{initPreloaderActions};