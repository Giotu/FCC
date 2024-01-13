const board = document.querySelector(".board");

const sizeBoard = 20;
let snake = [{ x: 10, y: 10 }];
let snakeSpeed = 175;
let gameStarted = false;
let direction = "right";
let food = generateFood();

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
	let x = Math.floor(Math.random() * sizeBoard + 1);
	let y = Math.floor(Math.random() * sizeBoard + 1);
	let foodInSnake = snake.find((elem) => {
		return elem.x === x && elem.y === y;
	});
	while (foodInSnake) {
		x = Math.floor(Math.random() * sizeBoard + 1);
		y = Math.floor(Math.random() * sizeBoard + 1);
		foodInSnake = snake.find((elem) => {
			return elem.x === x && elem.y === y;
		});
	}
	return { x, y };
}

function move() {
	let head = { ...snake[0] };
	switch (direction) {
		case "right":
			head.x++;
			break;
		case "left":
			head.x--;
			break;
		case "up":
			head.y--;
			break;
		case "down":
			head.y++;
			break;
	}
	snake.unshift(head);
	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		// setInterval(() => {
		// 	move();
		// 	draw();
		// }, snakeSpeed);
	} else {
		snake.pop();
	}
}

function startGame() {
	gameStarted = true;
	setInterval(() => {
		move();
		draw();
	}, snakeSpeed);
}

function handler(event) {
	if (!gameStarted && event.code === "Space") {
		startGame();
	} else {
		switch (event.code) {
			case "ArrowUp":
				if (direction !== "down") {
					direction = "up";
				}
				break;
			case "ArrowDown":
				if (direction !== "up") {
					direction = "down";
				}
				break;
			case "ArrowRight":
				if (direction !== "left") {
					direction = "right";
				}
				break;
			case "ArrowLeft":
				if (direction !== "right") {
					direction = "left";
				}
				break;
		}
	}
}

document.addEventListener("keydown", handler);
