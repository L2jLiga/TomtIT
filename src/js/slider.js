(()=>{
  'use strict';

  const scriptFns = [
    // Slider in top section
    {
      selector: '.slider',
      options: {
        autoplay: true,
        autoplaySpeed: 15000,
        prevArrow: "<div class='slider__arrow slider__arrow--left glyphicon glyphicon-arrow-left'></div>",
        nextArrow:"<div class='slider__arrow slider__arrow--right glyphicon glyphicon-arrow-right'></div>"
      }
    },

    // Slider for actions
    {
      selector: '.main-actions__container',
      options: {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    }
  ];

  getUtils.requireJS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.js',
                     () => scriptFns.forEach(slider => {$(slider.selector).slick(slider.options)}));
})();