const board = document.getElementById("board");
const status = document.getElementById("status");

let size = 3;
let currentPlayer = "X";
let gameOver = false;
let game = [];

document.getElementById("create").onclick = () => {
    size = parseInt(document.getElementById("size").value);
    if (size < 3) {
        alert("Minimum size is 3.");
        return;
    }else if(size > 5){
        alert("Maximum size is 5.");
        return;
    }
    createBoard(size);
};

document.getElementById("restart").onclick = () => {
    createBoard(size);
};

function createBoard(n) {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${n},1fr)`;
    board.style.gridTemplateRows = `repeat(${n},1fr)`;

    currentPlayer = "X";
    gameOver = false;
    status.textContent = "Current Player : X";
    game = Array.from({ length: n }, () => Array(n).fill(""));
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const cell = document.createElement("button");
            cell.className = "cell";
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", play);
            board.appendChild(cell);
        }
    }
}

function play() {

    if (gameOver) return;
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    if (game[row][col] != "") return;
    game[row][col] = currentPlayer;
    this.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
        status.textContent = currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    if (isDraw()) {
        status.textContent = "Draw!";
        gameOver = true;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = "Current Player : " + currentPlayer;
}
function checkWinner(player) {
    // Rows
    for (let r = 0; r < size; r++) {
        let win = true;
        for (let c = 0; c < size; c++) {
            if (game[r][c] != player) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    // Columns
    for (let c = 0; c < size; c++) {
        let win = true;
        for (let r = 0; r < size; r++) {
            if (game[r][c] != player) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    // Main diagonal
    let win = true;
    for (let i = 0; i < size; i++) {
        if (game[i][i] != player) {
            win = false;
            break;
        }
    }
    if (win) return true;
    // Anti diagonal
    win = true;
    for (let i = 0; i < size; i++) {
        if (game[i][size - 1 - i] != player) {
            win = false;
            break;
        }
    }
    return win;
}

function isDraw() {
    return game.flat().every(cell => cell != "");
}
createBoard(size);