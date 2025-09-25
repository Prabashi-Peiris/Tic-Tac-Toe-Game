const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning Conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    
    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
