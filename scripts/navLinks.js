window.addEventListener("load", () => {
	selectEls(".nav-btn").forEach(btn => {
		btn.addEventListener("click", () => {
			btn.firstElementChild.click();
		});
	});
});