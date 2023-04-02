//------------State Below------------//

const state = {
        board: [
            "", "", "",
            "", "", "",
            "", "", "",            
        ],
    };

//Combo of state.board iterating a copy of state.baord
let stoard = [...state.board];

let currentPlayer = "X";

let gameOver = false;

//------------Helper Functions------------//

const winningCombos = [
    // Horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
            if (stoard[a] && stoard[a] === stoard[b] && stoard[a] === stoard[c]) {
                //Compares the winningCombo index with the a,b,c const and state.baord
                setTimeout(function() {
                    alert(currentPlayer + " " + "is the winner!");
                }, 10);
                    return  true;
            }        
    }
    return false;
}

function resetBoard() {
    state.board = ["", "", "", "", "", "", "", "", ""]; // clear the board array
    stoard = state.board;
    currentPlayer = "X"; // reset the current player
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = ""; // reset the text content of each cell
    }
    gameOver = false; // reset the game over flag
}

//------------DOM Selectors/Creators------------//

const body = document.querySelector("body");
const titleH1 = document.createElement("h1");
const mainBoard = document.createElement("main");
const playerBoard = document.createElement("p");
const startButton = document.createElement("p");

//------------titleH1" Below------------//

titleH1.id = "title";
titleH1.innerText = "Tic-Tac-Toe";
body.appendChild(titleH1);

//------------"mainBoard" Below------------//

mainBoard.id = "board";
for (let i = 0; i < stoard.length; i++) {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.index = i; //Gives each cell on state.board a specific index to refer

    mainBoard.appendChild(div);
    }

body.appendChild(mainBoard);

//------------"playerBoard" Below------------//

playerBoard.id = "players";
let playerBoardHTML = `<input placeholder="Player 1" />
<input placeholder="Player 2" />`;
playerBoard.innerHTML = playerBoardHTML;

body.appendChild(playerBoard);

//------------"startButton" Below------------//

startButton.id = "button";
let startButtonHTML = `<button>Start</button/>`;
startButton.innerHTML = startButtonHTML;

body.appendChild(startButton);

//------------Event Listeners Below------------//

mainBoard.addEventListener("click", (event) => {
    if (!event.target.classList.contains("cell")) return;
    let cellIndex = event.target.dataset.index;
    const box = stoard[cellIndex];
        if (box === "" && !gameOver) {
            stoard[cellIndex] = currentPlayer;
                event.target.innerText = currentPlayer;
                //Check if there is a win. If so then gameOver = true!
                if (checkWinner()) {
                    gameOver = true;
                }

                else {
                    //If there is not a win then change players
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
    console.dir(event.target);
});

//Start button resets board to the "copy" of the original.
startButton.addEventListener("click", resetBoard);