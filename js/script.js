"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
	if (targetElement.closest('.menu__link')) {
		if (document.querySelector('.menu-open')) {
			document.body.classList.toggle('menu-open');
		}
	}
}

// Sliders
const heroSlider = document.querySelector('.hero');
if (heroSlider) {
	new Swiper('.hero', {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
		autoHeight: true,
		speed: 800,
		parallax: true,
		pagination: {
			el: '.hero__pagination',
			clickable: true
		},
		navigation: {
			nextEl: '.hero__arrow--next',
			prevEl: '.hero__arrow--prev',
		},
	});
}
const newSlider = document.querySelector('.new');
if (newSlider) {
	new Swiper('.new__slider', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		spaceBetween: 38,
		slidesPerView: 4,
		// Navigation arrows
		navigation: {
			nextEl: '.new__arrow--right',
			prevEl: '.new__arrow--left',
		},

		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.5,
				spaceBetween: 15
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			// when window width is >= 480px
			650: {
				slidesPerView: 3,
				spaceBetween: 25
			},
			// when window width is >= 640px
			991: {
				slidesPerView: 4,
				spaceBetween: 38
			}
		}
	});
}
const reviewsSlider = document.querySelector('.reviews');
if (reviewsSlider) {
	new Swiper('.reviews__slider', {
		// Optional parameters
		loop: true,
		// autoHeight: true,
		speed: 800,
		spaceBetween: 23,
		slidesPerView: 2,
		// If we need pagination
		pagination: {
			el: '.reviews__pages',
			clickable: true
		},
		// Responsive breakpoints
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 15
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 23,
			}
		}
	});
}
const mainProduct = document.querySelector('.main-product');
if (mainProduct) {
	const mainProductSliderImages = document.querySelectorAll('.main-product__slider img');
	let mainProductThumbSlider;

	if (mainProductSliderImages.length) {
		const productImagesBlock = document.querySelector('.main-product__images');
		let mainProductThumbSliderTemplate = `<div class="main-product__thumb-slider thumb-slider">`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__slider swiper">`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__wrapper swiper-wrapper">`
		mainProductSliderImages.forEach(mainProductSliderImage => {
			const srcImage = mainProductSliderImage.getAttribute('src').replace('/slider/', '/slider/thumbs/');
			mainProductThumbSliderTemplate += `<div class="thumb-slider__slide swiper-slide">
				<img src="${srcImage}" class="thumb-slider__image" alt="Image">
			</div>`
		});
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__arrows">`
		mainProductThumbSliderTemplate += `
			<button type="button" class="thumb-slider__arrow thumb-slider__arrow--up _icon-ch-up"></button>
			<button type="button" class="thumb-slider__arrow thumb-slider__arrow--down _icon-ch-down"></button>
		`
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `</div>`

		productImagesBlock.insertAdjacentHTML("afterbegin", mainProductThumbSliderTemplate)

		mainProductThumbSlider = new Swiper('.thumb-slider__slider', {
			// Optional parameters
			loop: true,
			direction: "vertical",
			spaceBetween: 20,
			// autoHeight: true,
			speed: 800,
			slidesPerView: 3,
		});
	}

	const mainProductSlider = new Swiper('.main-product__slider', {
		// Optional parameters
		loop: true,
		// direction: "vertical",
		// autoHeight: true,
		// Navigation arrows
		navigation: {
			nextEl: '.thumb-slider__arrow--down',
			prevEl: '.thumb-slider__arrow--up',
		},
		keyboard: {
			enabled: true,
		},
		speed: 800,
		spaceBetween: 0,
		slidesPerView: 1,
		thumbs: {
			swiper: mainProductThumbSlider
		},
	});

}