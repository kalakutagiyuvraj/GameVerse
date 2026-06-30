const road = document.getElementById("road");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const speedEl = document.getElementById("speed");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const controls = document.querySelector(".controls");

let score = 0;
let speed = 5;
let gameRunning = false;
let playerX = 175;
let animation;

let highScore = localStorage.getItem("racingHighScore") || 0;

player.style.left = playerX + "px";

document.addEventListener("keydown", movePlayer);

startBtn.onclick = startGame;

restartBtn.onclick = restartGame;
startBtn.addEventListener("click", ()=>{
    startBtn.remove();
    restartBtn.remove();
});
function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    score = 0;
    speed = 5;
    scoreEl.textContent = 0;
    speedEl.textContent = "1";
    removeEnemies();
    spawnEnemy();
    gameLoop();
}

function restartGame() {
    cancelAnimationFrame(animation);
    gameRunning = false;
    startBtn.remove();
    restartBtn.remove();
    removeEnemies();
    startGame();
}

function gameLoop() {
    if (!gameRunning) return;

    score++;
    scoreEl.textContent = score;

    if (score % 300 === 0) {
        speed++;
        speedEl.textContent = speed - 4;
    }
    moveEnemies();
    animation = requestAnimationFrame(gameLoop);
}

function movePlayer(e) {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && playerX > 55) {
        playerX -= 20;
    }
    if (e.key === "ArrowRight" && playerX < 295) {
        playerX += 20;
    }
    player.style.left = playerX + "px";
}

function spawnEnemy() {
    const enemy = document.createElement("div");
    const img = document.createElement("img");
    img.style.height = "200px";
    img.setAttribute("src", "images/enemyCar.png");
    enemy.className = "enemy";

    enemy.style.left = (60 + Math.random() * 240) + "px";
    enemy.style.top = "-120px";
    enemy.appendChild(img);
    road.appendChild(enemy);
}

function moveEnemies() {
    const enemies = document.querySelectorAll(".enemy");
    enemies.forEach(enemy => {
        let y = parseInt(enemy.style.top);
        y += speed;
        enemy.style.top = y + "px";
        if (checkCollision(player, enemy)) {
            gameOver();
        }
        if (y > 900) {
            enemy.remove();
            spawnEnemy();
        }
    });
}

function checkCollision(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();
    return !(r1.bottom < r2.top ||
        r1.top > r2.bottom ||
        r1.right < r2.left ||
        r1.left > r2.right);
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animation);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("racingHighScore", highScore);
        saveCurrentUserScores();
    }
    alert(
        "Game Over\n\nScore : " + score +
        "\nHigh Score : " + highScore
    );
    
    controls.appendChild(startBtn);
    controls.appendChild(restartBtn);
}

function removeEnemies() {
    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());
}