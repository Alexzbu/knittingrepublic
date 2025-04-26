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
	if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
		const valueElement = targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]');
		let value = parseInt(valueElement.value);
		if (targetElement.hasAttribute('data-quantity-plus')) {
			value++;
			if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) {
				value = valueElement.dataset.quantityMax;
			}
		} else {
			--value;
			if (+valueElement.dataset.quantityMin) {
				if (+valueElement.dataset.quantityMin > value) {
					value = valueElement.dataset.quantityMin;
				}
			} else if (value < 1) {
				value = 1;
			}
		}
		targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]').value = value;
	}
	if (targetElement.closest('[data-tabs-button]')) {
		const currentElement = targetElement.closest('[data-tabs-button]');
		setTab(currentElement);
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

// Tabs
function setTab(tabElement) {
	const tabsParent = tabElement.closest('[data-tabs]');

	const tabsButtons = Array.from(tabsParent.querySelectorAll('[data-tabs-button]'));
	const tabsActiveButton = tabsParent.querySelector('[data-tabs-button].active');
	tabsActiveButton.classList.remove('active');
	tabElement.classList.add('active');

	const currentButtonIndex = tabsButtons.indexOf(tabElement);
	const tabsElements = tabsParent.querySelectorAll('[data-tabs-element]');

	tabsElements.forEach(tabsElement => {
		tabsElement.hidden = true;
	});

	tabsElements[currentButtonIndex].hidden = false;

}

function setNewItem(currentElement) {
	const buttons = Array.from(document.querySelectorAll('[addButton]'));
	const currentButtonIndex = buttons.indexOf(currentElement);
	const elements = Array.from(document.querySelectorAll('[addField]'));
	elements[currentButtonIndex].classList.toggle('hidden')
}