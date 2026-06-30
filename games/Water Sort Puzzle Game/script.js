const board = document.getElementById("gameBoard");
const message = document.getElementById("message");
const difficulty = document.getElementById("difficulty");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let tubes = [];
let selectedTube = null;
let currentLevel = [];

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "pink"];

const LEVELS = {
    easy: {
        tubeCount: 5,
        colors: 3
    },
    medium: {
        tubeCount: 7,
        colors: 5
    },
    hard: {
        tubeCount: 9,
        colors: 7
    }
};

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
    if (currentLevel.length) renderBoard();
});

function startGame() {
    const level = LEVELS[difficulty.value];
    generateLevel(level.colors, level.tubeCount);
    renderBoard();
}

function generateLevel(colorCount, tubeCount) {
    let water = [];
    for (let i = 0; i < colorCount; i++) {
        for (let j = 0; j < 4; j++) {
            water.push(COLORS[i]);
        }
    }
    shuffle(water);
    tubes = [];
    let index = 0;
    for (let i = 0; i < tubeCount - 2; i++) {
        let tube = [];
        for (let j = 0; j < 4; j++) {
            tube.push(water[index++]);
        }
        tubes.push(tube);
    }
    tubes.push([]);
    tubes.push([]);
    currentLevel = JSON.parse(JSON.stringify(tubes));
    selectedTube = null;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function renderBoard() {
    board.innerHTML = "";
    tubes.forEach((tube, index) => {
        const tubeDiv = document.createElement("div");
        tubeDiv.className = "tube";
        tubeDiv.dataset.index = index;
        if (selectedTube === index) {
            tubeDiv.classList.add("selected");
        }
        tube.forEach(color => {
            const water = document.createElement("div");
            water.className = "water";
            water.style.background = color;
            tubeDiv.appendChild(water);
        });
        tubeDiv.addEventListener("click", () => selectTube(index));
        board.appendChild(tubeDiv);
    });
    checkWin();
}

function selectTube(index) {
    if (selectedTube === null) {
        if (tubes[index].length === 0) return;
        selectedTube = index;
        message.textContent = "Select destination tube";
        renderBoard();
        return;
    }
    if (selectedTube === index) {
        selectedTube = null;
        message.textContent = "Selection cancelled";
        renderBoard();
        return;
    }
    pour(selectedTube, index);
    selectedTube = null;
    renderBoard();
}

function pour(from, to) {
    const source = tubes[from];
    const dest = tubes[to];
    if (source.length === 0) return;
    if (dest.length === 4) return;
    const color = source[source.length - 1];
    if (dest.length !== 0 && dest[dest.length - 1] !== color) return;
    while (source.length > 0 && source[source.length - 1] === color && dest.length < 4) {
        dest.push(source.pop());
    }
}

function checkWin() {
    let win = true;
    for (let tube of tubes) {
        if (tube.length === 0) continue;
        if (tube.length !== 4) {
            win = false;
            break;
        }
        const first = tube[0];
        for (let color of tube) {
            if (color !== first) {
                win = false;
                break;
            }
        }
        if (!win) break;
    }
    if (win) {
        message.textContent = "🎉 You Won!";
    } else {
        message.textContent = "Select a tube";
    }
}

startGame();