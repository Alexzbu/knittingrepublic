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
	if (targetElement.closest('.rating__input')) {
		const currentElement = targetElement.closest('.rating__input');
		const rating = currentElement.closest('.rating');
		if (rating.classList.contains('rating--set')) {
			starRatingGet(rating, currentElement);
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

// Rating
const ratings = document.querySelectorAll('[data-rating]')
if (ratings) {
	ratings.forEach(rating => {
		const currentValue = +rating.dataset.rating;
		currentValue ? starRatingSet(rating, currentValue) : null;
	});
}
function starRatingGet(rating, currentElement) {
	const ratingValue = +currentElement.value;
	// Тут відправка оцінки (ratingValue) на бекенд...
	// Уявімо, що ми отримали середню оцінку 3.2
	const resultRating = 3.2;
	starRatingSet(rating, resultRating);
}
function starRatingSet(rating, value) {
	const ratingItems = rating.querySelectorAll('.rating__item');
	const resultFullItems = parseInt(value);
	const resultPartItem = value - resultFullItems;

	ratingItems.forEach((ratingItem, index) => {
		ratingItem.classList.remove('active');
		ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

		if (index <= (resultFullItems - 1)) {
			ratingItem.classList.add('active');
		}
		if (index === resultFullItems && resultPartItem) {
			ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
		}
	});
}

function setNewItem(currentElement) {
	const buttons = Array.from(document.querySelectorAll('[addButton]'));
	const currentButtonIndex = buttons.indexOf(currentElement);
	const elements = Array.from(document.querySelectorAll('[addField]'));
	elements[currentButtonIndex].classList.toggle('hidden')
}