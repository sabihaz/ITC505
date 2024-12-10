// Constants
const BOARD_SIZE = 6; // 6x6 grid
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
let board = [];

// Initialize the game board
function initializeBoard() {
    board = [];
    gameBoard.innerHTML = '';

    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowArray = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const tile = createTile(row, col);
            gameBoard.appendChild(tile);
            rowArray.push(tile);
        }
        board.push(rowArray);
    }

    randomizeBoard();
}

// Create a single tile
function createTile(row, col) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.row = row;
    tile.dataset.col = col;

    tile.addEventListener('click', () => {
        toggleTile(row, col);
        checkWin();
    });

    return tile;
}

// Toggle a tile and its neighbors
function toggleTile(row, col) {
    const toggle = (r, c) => {
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            board[r][c].classList.toggle('off');
        }
    };

    toggle(row, col);        // Center
    toggle(row - 1, col);    // Above
    toggle(row + 1, col);    // Below
    toggle(row, col - 1);    // Left
    toggle(row, col + 1);    // Right
}

// Randomize the board (guaranteed solvable)
function randomizeBoard() {
    const moves = BOARD_SIZE * 3; // Adjustable complexity
    for (let i = 0; i < moves; i++) {
        const randomRow = Math.floor(Math.random() * BOARD_SIZE);
        const randomCol = Math.floor(Math.random() * BOARD_SIZE);
        toggleTile(randomRow, randomCol); // Simulate random clicks
    }
}

// Check if the player has won
function checkWin() {
    const allOff = board.flat().every(tile => tile.classList.contains('off'));
    if (allOff) {
        setTimeout(() => alert('You win! 🎉'), 200);
    }
}

// Restart the game
restartButton.addEventListener('click', initializeBoard);

// Start the game
initializeBoard();
