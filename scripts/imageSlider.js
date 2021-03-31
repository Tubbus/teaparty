var slider, buttonLeft, buttonRight, caption, dotsContainer;
var sliderMax = 0;
var images = [], dots = [];
window.addEventListener("load", () => {
	slider = selectEl(".image-slider");
	slider.dataset.sliderIndex = 0;
	dotsContainer = selectEl("#dots-container");
	[...slider.children].forEach(el => {
		if(el.tagName == "IMG") {
			images.push(el);
			el.dataset.imageId = sliderMax;
			let dot = document.createElement("span");
			dot.dataset.dotId = sliderMax++;
			dot.setAttribute("title", el.alt);
			dot.addEventListener("click", (e) => {
				slider.dataset.sliderIndex = e.target.dataset.dotId;
				updateSlider();
			});
			dotsContainer.appendChild(dot);
			dots.push(dot);
		}
	});
	caption = selectEl("#slider-caption span");
	updateSlider();
	
	buttonLeft = selectEl("#slider-button-left");
	buttonRight = selectEl("#slider-button-right");
	buttonLeft.addEventListener("click", () => {
		let sliderIndex = slider.dataset.sliderIndex - 1;
		if(sliderIndex < 0) {
			sliderIndex = sliderMax + sliderIndex;
		}
		slider.dataset.sliderIndex = sliderIndex;
		updateSlider();
	});
	buttonRight.addEventListener("click", () => {
		let sliderIndex = (+slider.dataset.sliderIndex + 1) % sliderMax;
		slider.dataset.sliderIndex = sliderIndex;
		updateSlider();
	});
});
function updateSlider() {
	images.forEach(el => {
		if(el.dataset.imageId == slider.dataset.sliderIndex) {
			el.setAttribute("data-showing", "");
			caption.innerText = el.alt;
		} else {
			el.removeAttribute("data-showing");
		}
	});
	dots.forEach(el => {
		if(el.dataset.dotId == slider.dataset.sliderIndex) {
			el.setAttribute("data-showing", "");
		} else {
			el.removeAttribute("data-showing");
		}
	});
}