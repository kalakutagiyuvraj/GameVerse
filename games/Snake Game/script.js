// ==================
// VARIABLES
// ==================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const highText = document.getElementById("highScore");

const grid = 20;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };

let dx = 0;
let dy = 0;

let score = 0;
let highScore = localStorage.getItem("snakeHigh") || 0;

highText.innerText = highScore;

let gameLoop;
let paused = false;

// ==================
// DRAW SNAKE
// ==================
function drawSnake() {
    ctx.fillStyle = "lime";

    snake.forEach(part => {
        ctx.fillRect(part.x * grid, part.y * grid, grid - 2, grid - 2);
    });
}

// ==================
// DRAW FOOD
// ==================
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);
}

// ==================
// UPDATE GAME
// ==================
function update() {

    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    if (head.x == food.x && head.y == food.y) {

        score++;
        scoreText.innerText = score;

        food = {
            x: Math.floor(Math.random() * 25),
            y: Math.floor(Math.random() * 25)
        };

    } else {
        snake.pop();
    }
}

// ==================
// COLLISION
// ==================
function collision() {

    let head = snake[0];

    if (
        head.x < 0 || head.x >= 25 ||
        head.y < 0 || head.y >= 25
    ) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {

        if (
            head.x == snake[i].x &&
            head.y == snake[i].y
        ) {
            gameOver();
        }

    }
}

// ==================
// DRAW GAME
// ==================
function draw() {

    ctx.clearRect(0, 0, 500, 500);

    update();
    collision();

    drawFood();
    drawSnake();
}

// ==================
// KEYBOARD
// ==================
document.addEventListener("keydown", e => {

    if (e.key == "ArrowUp" && dy != 1) {
        dx = 0;
        dy = -1;
    }

    if (e.key == "ArrowDown" && dy != -1) {
        dx = 0;
        dy = 1;
    }

    if (e.key == "ArrowLeft" && dx != 1) {
        dx = -1;
        dy = 0;
    }

    if (e.key == "ArrowRight" && dx != -1) {
        dx = 1;
        dy = 0;
    }

});

// ==================
// BUTTONS
// ==================
gameLoop = setInterval(draw, 150);

document.getElementById("pause").onclick = () => {
    clearInterval(gameLoop);
    paused = true;
};

document.getElementById("continue").onclick = () => {
    if (paused) {
        gameLoop = setInterval(draw, 150);
        paused = false;
    }

};

document.getElementById("restart").onclick = () => location.reload();
document.getElementById("exit").onclick = () => {
    clearInterval(gameLoop);
    location.href = "../../dashboard.html";

};

// ==================
// GAME OVER
// ==================
function gameOver() {

    clearInterval(gameLoop);

    if (score > highScore) {

        highScore = score;
        localStorage.setItem("snakeHigh", highScore);
        saveCurrentUserScores();
    }
    alert("Game Over");
}

// CONCEPT THAT I HAVE USED IN THIS PROJECT
/*
✅ Variables
✅ Constants
✅ Arrays
✅ Objects
✅ Functions
✅ Loops
✅ Conditional Statements
✅ DOM Manipulation
✅ Events
✅ Canvas API
✅ Local Storage
✅ Timers (setInterval)
✅ Arrow Functions
✅ Random Number Generation
✅ Browser APIs (alert, location.reload)
*/