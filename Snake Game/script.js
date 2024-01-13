const board = document.querySelector(".board");

const sizeBoard = 20;
const snake = [{ x: 10, y: 10 }];
const food = generateFood();

function draw() {
	board.innerHTML = "";
	drawSnake();
	drawFood();
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

function drawFood() {
	const elementFood = createElementGame("div", "food");
	setPosition(elementFood, food);
	board.append(elementFood);
}

function generateFood() {
	const x = Math.floor(Math.random() * sizeBoard + 1);
	const y = Math.floor(Math.random() * sizeBoard + 1);
	return { x, y };
}
draw();
