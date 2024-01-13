const board = document.querySelector(".board");

const snake = [{ x: 10, y: 10 }];

function draw() {
	board.innerHTML = "";
	drawSnake();
}

function drawSnake() {
	snake.forEach((elem) => {
		const elementSnake = createElementGame("div", "snake");
		setPosition(elementSnake, elem);
		board.append(elementSnake);
	});
}

function createElementGame(elementName, className) {
	const elementGame = document.createElement(elementName);
	elementGame.className = className;
	return elementGame;
}

function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

draw();
