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

function CellPlayed(clickedBox, clickedBoxIndex) {
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;

}

function turnChange() {

}
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

function onBoxClick(clickedBoxEvent) {
    const clickedBox = clickedBoxEvent.target;
    /* Grab data-cell-index; a string is returned but a number is reuqired
        so it is parsed Int */
    const clickedBoxIndex = parseInt(
        clickedBox.getAttribute('data-cell-index')
    );
    /* Checjk if box has been played before*/
    if (gameState[clickedBoxIndex] !== "" || !gameActive) {
        return;
    }

    handleBoxPlayed(clickedBox, clickedBoxIndex);
    resultValidation();
}

function gameReset() {

}


/* Event Listeners for button and boxes*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onBoxClick));
document.querySelector('.resetGame').addEventListener('click', gameReset);