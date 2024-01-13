const board = document.querySelector(".board");
const title = document.querySelector(".title");
const score = document.querySelector(".current-score");
const highScore = document.querySelector(".high-score");

const sizeBoard = 20;
let snake = [{ x: 10, y: 10 }];
let snakeSpeed = 140;
let gameStarted = false;
let gameInterval;
let direction = "right";
let food = generateFood();
let highScoreValue = 0;

function draw() {
	board.innerHTML = "";
	drawSnake();
	drawFood();
	updateScore();
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
	title.style.opacity = 0;
	gameInterval = setInterval(() => {
		move();
		checkEndGame();
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

function checkEndGame() {
	const head = snake[0];
	if (head.x < 1 || head.x > sizeBoard || head.y < 1 || head.y > sizeBoard) {
		resetGame();
	}
	snake.forEach((elem, index) => {
		if (snake.length > 4) {
			if (index > 0) {
				if (elem.x === head.x && elem.y === head.y) {
					resetGame();
				}
			}
		}
	});
}

function resetGame() {
	updateHighScore();
	stopGame();
	snake = [{ x: 10, y: 10 }];
	snakeSpeed = 175;
	direction = "right";
	food = generateFood();
}

function stopGame() {
	gameStarted = false;
	clearInterval(gameInterval);
	title.style.opacity = 1;
}

function updateScore() {
	score.textContent = (snake.length - 1).toString().padStart(3, "0");
}

function updateHighScore() {
	const currentScore = snake.length - 1;
	if (highScoreValue < currentScore) {
		highScoreValue = currentScore;
	}
	highScore.textContent = highScoreValue.toString().padStart(3, "0");
}

document.addEventListener("keydown", handler);
