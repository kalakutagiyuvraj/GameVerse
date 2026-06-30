const game = document.getElementById("game");
const player = document.getElementById("player");
const info = document.getElementById("info");
const over = document.getElementById("over");

let x = 225, keys = {}, bullets = [], enemies = [], enemyBullets = [];
let score = 0, lives = 3, gameOver = false;
let high = localStorage.getItem("SpaceShooterHighScore") || 0;

document.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (e.code === "Space" && !gameOver) {
        let b = document.createElement("div");
        b.className = "bullet";
        b.style.left = (x + 22) + "px";
        b.style.top = "610px";
        game.appendChild(b);
        bullets.push(b);
    }
});

document.addEventListener("keyup", e => keys[e.key] = false);

function spawnEnemy() {
    if (gameOver) return;
    let e = document.createElement("div");
    let eImg = document.createElement("img");
    eImg.setAttribute("src", "images/enemyCraft.png");
    e.className = "enemy";
    eImg.style.width = "100%";
    eImg.style.height = "100%";
    e.style.left = Math.random() * 450 + "px";
    e.style.top = "-50px";
    e.appendChild(eImg);
    game.appendChild(e);
    enemies.push(e);
}

setInterval(spawnEnemy, 1300);

setInterval(() => {
    enemies.forEach(e => {
        let b = document.createElement("div");
        b.className = "enemyBullet";
        b.style.left = (e.offsetLeft + 27) + "px";
        b.style.top = (e.offsetTop + 59) + "px";
        game.appendChild(b);
        enemyBullets.push(b);
    });
}, 1000);

function hit(a, b) {
    return a.offsetLeft < b.offsetLeft + b.offsetWidth &&
        a.offsetLeft + a.offsetWidth > b.offsetLeft &&
        a.offsetTop < b.offsetTop + b.offsetHeight &&
        a.offsetTop + a.offsetHeight > b.offsetTop;
}

function update() {
    if (gameOver) return;
    if (keys["ArrowLeft"]) x -= 8;
    if (keys["ArrowRight"]) x += 8;
    if (x < 0) x = 0;
    if (x > 450) x = 450;
    player.style.left = x + "px";
    bullets.forEach((b, i) => {
        b.style.top = (b.offsetTop - 10) + "px";
        if (b.offsetTop < 0) {
            b.remove();
            bullets.splice(i, 1);
        }
    });

    enemyBullets.forEach((b, i) => {
        b.style.top = (b.offsetTop + 6) + "px";
        if (hit(b, player)) {
            lives--;
            b.remove();
            enemyBullets.splice(i, 1);
        }
        if (b.offsetTop > 700) {
            b.remove();
            enemyBullets.splice(i, 1);
        }
    });
    enemies.forEach((e, ei) => {
        e.style.top = (e.offsetTop + 3) + "px";
        if (hit(e, player)) {
            lives--;
            e.remove();
            enemies.splice(ei, 1);
        }
        bullets.forEach((b, bi) => {
            if (hit(b, e)) {
                score += 30;
                if (score > high) {
                    high = score;
                    localStorage.setItem("SpaceShooterHighScore", high);
                    saveCurrentUserScores();
                }
                b.remove();
                e.remove();
                bullets.splice(bi, 1);
                enemies.splice(ei, 1);
            }
        });
        if (e.offsetTop > 700) {
            e.remove();
            enemies.splice(ei, 1);
        }
    });

    info.innerHTML = "Score: " + score + " | High: " + high + " | Lives: " + lives;
    if (lives <= 0) {
        gameOver = true;
        over.style.display = "block";
    }
    requestAnimationFrame(update);
}
update();