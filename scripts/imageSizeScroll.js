let img;
window.addEventListener("load", () => {
	img = selectEl(".first-image-large img");
	window.addEventListener("scroll", () => {
		let size = (1 - clamp(window.scrollY / 300, 0, 1));
		resizeImg(size);
	});
});
function resizeImg(percent) {
	img.style.width = 90 * percent + "vw";
	img.parentNode.style.left = (100 - 90 * percent) / 2 + "vw";
}