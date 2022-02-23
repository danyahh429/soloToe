/* Game status */
const statusDisplay = document.querySelector('.gameStatus')

let gameActive = true;

/* player status */
let currentPlayer = "X";

/*store our current game state empty strings represent boxes]
 */
let gameState = ["", "", "", "", "", "", "", "", ""];

/* Game results */
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/* Game management messages and functions */
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function turnChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


/* Values in arrays for our winningConditions are indexes for cells that need 
   to be populated by the same player for them to be considered a victor.*/

function resultValidation() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const winConditon = winningConditions[i];
        let a = gameState[winConditon[0]];
        let b = gameState[winConditon[1]];
        let c = gameState[winConditon[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }
    if (gameWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    /*draw */
    let gameDraw = !gameState.includes("");
    if (gameDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    /*
if no one ghas one continue if possible.
*/
    turnChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    /* Grab data-cell-index; a string is returned but a number is reuqired
        so it is parsed Int */
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    /* Checjk if box has been played before*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    CellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function gameReset() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}


/* Event Listeners for button and boxes*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#resetGame').addEventListener('click', gameReset);