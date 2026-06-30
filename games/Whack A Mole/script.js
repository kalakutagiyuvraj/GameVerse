let score = 0;
let time = 30;
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const moles = document.querySelectorAll(".mole");
let high = localStorage.getItem("moleHighScore") || 0;
let currentMole = null;

function randomMole() {
    moles.forEach(m => {
        m.classList.remove("show");
    });

    let index = Math.floor(Math.random() * moles.length);
    currentMole = moles[index];
    currentMole.classList.add("show");
}

moles.forEach(mole => {
    mole.addEventListener("click", () => {
        if (mole === currentMole) {
            score++;
            if (score > high) {
                    high = score;
                    localStorage.setItem("moleHighScore", high);
                    saveCurrentUserScores();
                }
            scoreText.innerText = score;
            
            mole.classList.remove("show");
            currentMole = null;
        }
    })
})
let moleInterval = setInterval(randomMole, 1500);
let timer = setInterval(() => {
    time--;
    timeText.innerText = time;
    if (time <= 0) {
        clearInterval(timer);
        clearInterval(moleInterval);
        alert("Game Over!\nYour Score: " + score);
    }
}, 1000);

function restartGame() {
    location.reload();
}