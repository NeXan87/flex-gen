const loadedTimeout = 500;

const preloaderElement = document.querySelector('.preloader');

const toggleClasses = () => {
  preloaderElement.classList.add('preloader--hiding');

  window.setTimeout(() => {
    preloaderElement.classList.add('preloader--loaded');
    preloaderElement.classList.remove('preloader--hiding');
  }, loadedTimeout);
};

const onWindowLoad = () => toggleClasses();

const initPreloaderActions = () => window.addEventListener('load', onWindowLoad);

export { initPreloaderActions };
