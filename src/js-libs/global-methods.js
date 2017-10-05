/**
 * Add methods to global object
 */
(()=>{
  'use strict';

  const $window = window;
  const $document = document;

  const UTILS = (() => {

    /**
     * Create element with specific tag name
     * @param {string} tagName - name of needed tag
     *
     * @return {Element} created tag
     */
    const createElement = tagName => $document.createElement(tagName);

    /**
     * Select one element from document by selector
     * @param {string} selector - Element selector
     *
     * @return {Element} found element
     */
    const querySelector = selector => $document.querySelector(selector);

    /**
     * Select all elements from document by selector
     * @param {string} selector - Elements selector
     *
     * @return {HTMLCollection} found elements
     */
    const querySelectorAll = selector => $document.querySelectorAll(selector);

    /**
     * Universal method to get scroll position
     * @param {*} offset - param used to define temporary property
     * @return {number} scroll position
     */
    const getScrollOffset = offset => (offset = ($window.pageYOffset || $document.scrollTop)  - ($document.clientTop || 0)) ? offset : 0;

    /**
     * Fetch dependency script and do callback which needed this script when script was loaded
     * @param {string}   source   - URI to script
     * @param {Function} callback - function which was called when script successfully loaded
     * @param {boolean}  loadType - is script async (true) of defer (false)
     *
     * @return {void}
     */
    const requireJS = (source, callback, loadType) => {
      let script = createElement('script');

      script.defer = !(script.async = loadType);

      script.src = source;

      script.onload = () => {
        script.onload = null;

        script.remove();

        script = null;

        callback();
      };

      $document.body.appendChild(script);
    }

    return {
      createElement: createElement,
      querySelector: querySelector,
      querySelectorAll: querySelectorAll,
      getScrollOffset: getScrollOffset,
      requireJS: requireJS
    }
  })();

  // Add utils module to $window

  Object.defineProperty($window, 'getUtils', {
    value: UTILS
  })
})();