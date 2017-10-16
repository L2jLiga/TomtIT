(() => {
  'use strict';

  const $window = window;

  const querySelector = getUtils.querySelector;

  $window.document.addEventListener('DOMContentLoaded', scrollableMenu);

  /**
   * Handle page scroll and calculate header params
   * such as background-color and height
   * @return {void}
   */
  function scrollableMenu() {
    const [ header, headerTop ] = [
      querySelector('.header'),

      querySelector('.header__top')
    ];

    let headerHeight = header.offsetHeight;

    /**
     * Calculate background opacity and height of headerTop element based on current scroll position
     * Also add or remove boxShadow in case if current scroll greater than headerHeight
     */

    const recalcStyles = () => {
      let currentScrollTop = getUtils.getScrollOffset();

      let currentHeightDiff = headerHeight - headerTop.offsetHeight;

      if (currentScrollTop > currentHeightDiff) {
        headerTop.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 2px 2px 3px';

        currentScrollTop = currentHeightDiff;
      } else {
        headerTop.style.boxShadow = 'none';
      }

      let koeff = (currentHeightDiff - currentScrollTop) / currentHeightDiff

      headerTop.style.fontSize = (koeff * 0.25 + 0.75) + 'rem';

      headerTop.style.backgroundColor = 'rgba(255,255,255,' + (1 - koeff * 0.25) + ')';
    };

    /**
     * When window was resized we must to recalculate new header height
     */

    const recalcHeaderHeight = () => {
      headerHeight = header.offsetHeight;
    }

    /**
     * Initialize scrollable menu
     */

    recalcStyles();

    /**
     * Enable handlers
     */

    $window.addEventListener('scroll', recalcStyles);

    $window.addEventListener('resize', recalcHeaderHeight);
  }
})();