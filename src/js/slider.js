(()=>{
	const createElement = element => document.createElement(element);

	let script = createElement('script');

	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.js';

	script.onload = () => $('.slider').slick({
		autoplay: true,
		autoplaySpeed: 15000,
		prevArrow: "<div class='slider__arrow slider__arrow--left glyphicon glyphicon-arrow-left'></div>",
		nextArrow:"<div class='slider__arrow slider__arrow--right glyphicon glyphicon-arrow-right'></div>"
	});

	document.body.appendChild(script);
})();