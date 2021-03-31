window.min = window.min || Math.min;
window.max = window.max || Math.max;
var keys = [];
var virtualMouseX = 0, virtualMouseY = 0;
var virtualMouseSpeed = 1;
var currentEl;
var can, ctx;
var mouseImg;
/*window.addEventListener("load", () => {*/
	window.addEventListener("keydown", e => {
		let key = e.key.toLowerCase();
		if(keys.indexOf(key) == -1) {
			keys.push(key);
		}
		if(key == "enter") {
			getEl().click();
		}
		e.preventDefault();
	});
	window.addEventListener("keyup", e => {
		let key = e.key.toLowerCase();
		keys.splice(keys.indexOf(key), 1);
	});
	currentEl = document.body;
	can = document.createElement("canvas");
	can.width = window.innerWidth;
	can.height = window.innerHeight;
	can.style = `
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 88888888;
	`;
	document.body.appendChild(can);
	ctx = can.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	mouseImg = new Image();
	mouseImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAADxvPoOAAAAfUlEQVQoFZXSAQ7AEAwF0Fp2M+d2NlNRqbb4ayKxrc8nRkRU24DrGZ0w6qCUwg5CkkAomoAjELQABDlwQyE4oS3YoSOI0BVYBAGNXn7YVc7ZfXIJQVNqao4FjOYkKLr5CaTZ7cG84Cj5S3muq44E0ovxoW2jRr/nnC476PgD1xgwaKHZr9UAAAAASUVORK5CYII=";
	mouseImg.onload = () => {
		virtualMouseLoop();
	};
/*});*/
function getEl() {
	can.style.display = "none";
	let el = document.elementFromPoint(max(virtualMouseX, 0), max(virtualMouseY+90, 0));
	can.style.display = "block";
	return el;
}
function virtualMouseLoop() {
	try {
		if(keys.includes("arrowleft") || keys.includes("a")) {
			virtualMouseX -= virtualMouseSpeed;
		}
		if(keys.includes("arrowright") || keys.includes("d")) {
			virtualMouseX += virtualMouseSpeed;
		}
		if(keys.includes("arrowup") || keys.includes("w")) {
			virtualMouseY -= virtualMouseSpeed;
		}
		if(keys.includes("arrowdown") || keys.includes("s")) {
			virtualMouseY += virtualMouseSpeed;
		}
		virtualMouseX = min(max(virtualMouseX, 0), window.innerWidth - 1);
		virtualMouseY = min(max(virtualMouseY, 0), window.innerHeight - 1);
		if(keys.includes("q")) {
			virtualMouseSpeed--;
		}
		if(keys.includes("e")) {
			virtualMouseSpeed++;
		}
		virtualMouseSpeed = min(max(virtualMouseSpeed, 1), 8);
		
		ctx.clearRect(0, 0, can.width, can.height);
		ctx.fillStyle = "green";
		ctx.fillRect(virtualMouseX, virtualMouseY, 20, 20);
		ctx.drawImage(mouseImg, virtualMouseX, virtualMouseY, mouseImg.naturalWidth * 2, mouseImg.naturalHeight * 2);
		
		let newEl = getEl();
		if(currentEl != newEl) {
			console.log("Changed element!", newEl.outerHTML.replace(newEl.innerHTML, ""));
			let mouseExitEv = new Event("mouseout");
			currentEl.dispatchEvent(mouseExitEv);
			let mouseEnterEv = new Event("mouseover");
			newEl.dispatchEvent(mouseEnterEv);
			currentEl = newEl;
		}/* else {
			let mouseOverEv = new Event("mouseover");
			currentEl.dispatchEvent(mouseOverEv);
		}*/
		
		/*window.requestAnimationFrame(virtualMouseLoop);*/
		setTimeout(virtualMouseLoop, 1000/30);
	} catch(e) {
		alert(e);
	}
}