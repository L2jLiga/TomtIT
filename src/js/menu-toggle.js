(()=>{
  'use strict';

  const utils = getUtils;

  utils.querySelectorAll('[data-toggle-for]').forEach(link => {
    let selector = link.getAttribute('data-toggle-for');
    let modifier = link.getAttribute('data-toggle-modifier');

    let toggledMenu = utils.querySelector('.' + selector);
    let openModifier = `${selector}--${modifier}`;

    link.addEventListener('click', toggle);

    toggledMenu.querySelectorAll('.dropdown-item').forEach(item => item.addEventListener('click', toggle))

    function toggle() {
      toggledMenu.classList[toggledMenu.classList.contains(openModifier) ? 'remove' : 'add'](openModifier);
    }
  })
})();