"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.colors-product__item')) {
		const currentElement = targetElement.closest('.colors-product__item');
		document.querySelectorAll('.colors-product__item').forEach(i => i.classList.remove('active'));
		currentElement.classList.add('active');

		const newImage = currentElement.dataset.image;
		document.getElementById('mainProductImage').src = newImage;

		const productStock = currentElement.dataset.stock;
		document.getElementById('mainProductStock').innerText = productStock;

		const productColor = currentElement.dataset.name;
		document.getElementById('colorName').innerText = productColor;

		const productQuantity = currentElement.dataset.quantity;
		const quantityElement = document.querySelector('[data-quantity-value]');
		quantityElement.dataset.quantityMax = productQuantity;
		quantityElement.value = Math.min(Number(quantityElement.value), Number(productQuantity));
		quantityElement.style.color = "";

		const variationInput = document.getElementById('variation_id');
		const variationId = currentElement.dataset.variation_id
		variationInput.value = variationId;
		const addToCartBtn = document.querySelector('.main-product__button');
		addToCartBtn
		addToCartBtn.disabled = false;
	}


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
			document.querySelector('.g-recaptcha').classList.add('visible');
		}
	}
	if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
		const valueElement = targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]');
		const updateButton = document.querySelector('button[name="update_cart"]')
		updateButton && (updateButton.disabled = false);
		let value = parseInt(valueElement.value);
		if (targetElement.hasAttribute('data-quantity-plus')) {
			value++;
			if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) {
				value = valueElement.dataset.quantityMax;
				valueElement.style.color = "red"
			}
		} else {
			--value;
			valueElement.style.color = ""
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
	starRatingSet(rating, ratingValue);
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

const oldQuantities = document.querySelectorAll('.input-text.qty.text');
if (oldQuantities.length > 0) {
	removeIconHandler()
	quantityHandler(oldQuantities)

	const observer = new MutationObserver((mutations, obs) => {
		const target = document.querySelector('.input-text.qty.text');

		if (target) {
			const newQuantities = document.querySelectorAll('.input-text.qty.text');
			removeIconHandler()
			quantityHandler(newQuantities)
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
}
function removeIconHandler() {
	const removeLinks = document.querySelectorAll('.remove');

	removeLinks.forEach(link => {
		link.innerText = '';
		link.classList.add('_icon-trash');
	});
}

function quantityHandler(data) {
	document.querySelector('.woocommerce-shipping-calculator').innerHTML = '';

	const quantities = document.querySelectorAll('td.product-quantity');

	quantities.forEach((td, index) => {
		const oldInput = data[index];
		if (!oldInput) return;

		td.innerHTML = `
			<div data-quantity class="quantity">
				<button data-quantity-minus type="button" class="quantity__button quantity__button--minus"></button>
				<div class="quantity__input">
					<input
						id="${oldInput.id}"
						data-quantity-value
						data-quantity-max="${oldInput.max}" 
						autocomplete="off" type="text" 
						name="${oldInput.name}" 
						value="${oldInput.value}">
				</div>
				<button data-quantity-plus type="button" class="quantity__button quantity__button--plus"></button>
			</div>`;
	});
}
const raitingButton = document.querySelector('.rating__button')
if (raitingButton) {
	raitingButton.disabled = true
	formValidation();
}
const telInput = document.getElementById('billing_phone');
if (telInput && !telInput.value) {
	telInput.value = '+380';
}

let checkoutButton = document.getElementById('place_order');
if (checkoutButton) {
	setTimeout(() => {
		checkoutButton = document.getElementById('place_order')
		checkoutButton.disabled = true;
	}, 3000);

	formValidation();
}

function formValidation() {
	const inputs = document.querySelectorAll('input');

	inputs.forEach((input) => {
		input.addEventListener('blur', checkInputs);
		input.addEventListener('input', validateForm);
	});
}

function checkInputs(e) {
	const targetElement = e.target;
	let isValid = true;

	if (targetElement.type === 'tel') {
		const phonePattern = /^\+380\d{9}$/;
		isValid = phonePattern.test(targetElement.value);
	}

	if (targetElement.type === 'email') {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		isValid = emailPattern.test(targetElement.value);
	}

	if (targetElement.type === 'text') {
		isValid = !!targetElement.value.trim();
	}

	targetElement.classList.toggle('invalid', !isValid);

	validateForm();
}

function validateForm() {
	const inputs = document.querySelectorAll('input');
	const allValid = Array.from(inputs).every((input) => {
		if (input.type === 'tel') {
			return /^\+380\d{9}$/.test(input.value);
		}
		if (input.type === 'email') {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
		}
		if (input.name === 'billing_first_name') {
			return !!input.value.trim();
		}
		if (input.name === 'billing_last_name' || input.name === 'author') {
			return !!input.value.trim();
		}
		if (input.type === 'radio') {
			const group = document.getElementsByName(input.name);
			return Array.from(group).some((radio) => radio.checked);
		}
		return true;
	});
	if (checkoutButton) {
		checkoutButton.disabled = !allValid;
	}
	if (raitingButton) {
		raitingButton.disabled = !allValid;
	}
}
