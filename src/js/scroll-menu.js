(() => {
  'use strict';

  const $window = window;
  const $document = $window.document;

  const querySelector = getUtils.querySelector;

  $document.addEventListener('DOMContentLoaded', () => {
    let header = querySelector('.header');
    let headerTop = querySelector('.header__top');

    let headerHeight = header.offsetHeight;

    const calculateHeaderTopParams = () => {
      let scrollTop = getUtils.getScrollOffset();

      let headerTopHeigh = headerTop.offsetHeight;

      let heightDiff = headerHeight - headerTopHeigh;

      if(scrollTop > heightDiff) {
        headerTop.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 2px 2px 3px';

        scrollTop = heightDiff;
      } else {
        headerTop.style.boxShadow = 'none';
      };

      let tmp;

      headerTop.style.fontSize = ((heightDiff - scrollTop) / heightDiff * 0.25 + 0.75) + 'rem';

      headerTop.style.backgroundColor = 'rgba(255,255,255,' + ((scrollTop - heightDiff) / heightDiff * 0.3 + 1) + ')';
    }

    calculateHeaderTopParams();
    $window.addEventListener('scroll', calculateHeaderTopParams);

    $window.addEventListener('resize', () => {
      headerHeight = header.offsetHeight;
    });
  });
})();