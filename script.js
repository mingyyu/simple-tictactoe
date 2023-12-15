const board = document.getElementById('board');
const result = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle a player's move
function handleMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWin() || checkDraw()) {
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a winner
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            result.innerHTML = `Player ${gameBoard[a]} wins!`;
            return true;
        }
    }

    return false;
}

// Function to check for a draw
function checkDraw() {
    if (gameBoard.every(cell => cell !== '')) {
        result.innerHTML = 'It\'s a draw!';
        return true;
    }
    return false;
}

// Function to end the game
function endGame() {
    gameActive = false;
    resetButton.style.display = 'block';
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    result.innerHTML = '';
    resetButton.style.display = 'none';
    renderBoard();
}

// Function to render the game board
function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = gameBoard[i];
        cell.addEventListener('click', () => handleMove(i));
        board.appendChild(cell);
    }
}

// Initial render
renderBoard();
